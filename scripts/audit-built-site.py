"""Audit generated routes and optionally their live HTTP responses.
Run after npm run build. Uses only Python's standard library.
"""
import argparse, collections, concurrent.futures, csv, datetime, json
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import urllib.request, urllib.error
import xml.etree.ElementTree as ET

class Page(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.links, self.assets, self.canonicals, self.robots = [], [], [], []
        self.ids, self.title, self.h1, self.in_title = set(), '', 0, False
        self.schemas, self.in_schema, self.schema_text = [], False, ''
        self.feed(html)
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a: self.ids.add(a['id'])
        if tag == 'a' and a.get('href'): self.links.append(a['href'])
        if tag in ('img', 'script') and a.get('src'): self.assets.append(a['src'])
        if tag == 'link' and a.get('rel') in ('stylesheet', 'modulepreload', 'preload'): self.assets.append(a.get('href', ''))
        if tag == 'link' and a.get('rel') == 'canonical': self.canonicals.append(a.get('href'))
        if tag == 'meta' and a.get('name') == 'robots': self.robots.append(a.get('content', ''))
        if tag == 'h1': self.h1 += 1
        if tag == 'title': self.in_title = True
        if tag == 'script' and a.get('type') == 'application/ld+json': self.in_schema, self.schema_text = True, ''
    def handle_endtag(self, tag):
        if tag == 'title': self.in_title = False
        if tag == 'script' and self.in_schema:
            try: self.schemas.append(json.loads(self.schema_text))
            except ValueError: self.schemas.append(None)
            self.in_schema = False
    def handle_data(self, text):
        if self.in_title: self.title += text
        if self.in_schema: self.schema_text += text

args = argparse.ArgumentParser()
args.add_argument('--output', default='docs/seo/technical-inventory.json')
args.add_argument('--live', action='store_true')
options = args.parse_args()
root, host = Path('dist'), 'https://mybreakeven.com'
urls = [loc.text for loc in ET.parse(root / 'sitemap.xml').iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
pages = {}
for file in root.rglob('index.html'):
    relative = file.parent.relative_to(root).as_posix()
    path = '/' if relative == '.' else '/' + relative + '/'
    pages[path] = Page(file.read_text())
issues, deferred, inbound = [], [], collections.defaultdict(set)
for path, page in pages.items():
    if page.canonicals != [host + path]: issues.append(['canonical', path, page.canonicals])
    if page.h1 != 1: issues.append(['h1', path, page.h1])
    if not page.title: issues.append(['title', path])
    if not page.robots: issues.append(['robots', path])
    if not page.schemas or None in page.schemas: issues.append(['schema-json', path])
    for href in page.links:
        link = urlsplit(href)
        if link.scheme and link.scheme not in ('http', 'https'): continue
        if link.netloc and link.netloc not in ('mybreakeven.com', 'www.mybreakeven.com'): continue
        target = unquote(link.path) or path
        if target in pages:
            if target != path: inbound[target].add(path)
            if link.fragment and link.fragment not in pages[target].ids:
                # Pro analysis is a conditional interactive section, not an HTML route.
                (deferred if target == '/' and link.fragment == 'pro-analysis' else issues).append(['fragment', path, href])
        elif not target.startswith('/') or not (root / target.lstrip('/')).exists(): issues.append(['broken-link', path, href])
    for asset in page.assets:
        link = urlsplit(asset)
        if not link.netloc and not (root / link.path.lstrip('/')).is_file(): issues.append(['missing-asset', path, asset])
for url in urls:
    path = urlsplit(url).path
    if path not in pages: issues.append(['sitemap-missing', path]); continue
    if pages[path].canonicals != [url] or any('noindex' in value for value in pages[path].robots): issues.append(['sitemap-signals', path])
    if path != '/' and not inbound[path]: issues.append(['orphan', path])
if len(urls) != len(set(urls)): issues.append(['duplicate-sitemap-url'])
rows = [dict(path=path, title=p.title, canonical=p.canonicals[0] if p.canonicals else '', robots=';'.join(p.robots), h1=p.h1, inbound=len(inbound[path]), sitemap=host + path in urls) for path, p in sorted(pages.items())]

def live(row):
    url = host + row['path']
    try:
        with urllib.request.urlopen(url, timeout=25) as response:
            html = response.read().decode('utf-8')
            page = Page(html)
            row.update(http_status=response.status, final_url=response.url, live_canonical=page.canonicals, live_robots=page.robots, live_h1=page.h1)
            if response.status != 200 or response.url != url or page.canonicals != [url]: row['live_issue'] = 'status/redirect/canonical'
            if row['sitemap'] and any('noindex' in value for value in page.robots): row['live_issue'] = 'unexpected noindex'
    except urllib.error.HTTPError as error: row.update(http_status=error.code, live_issue='HTTP error')
    except Exception as error: row.update(live_issue=type(error).__name__)
    return row
if options.live:
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor: rows = list(executor.map(live, rows))
    issues.extend(['live', row['path'], row['live_issue']] for row in rows if row.get('live_issue'))
result = dict(captured_utc=datetime.datetime.now(datetime.timezone.utc).isoformat(), route_count=len(rows), sitemap_count=len(urls), live=options.live, issues=issues, deferred_interactive_anchors=deferred, routes=rows)
output = Path(options.output)
output.parent.mkdir(parents=True, exist_ok=True)
output.write_text(json.dumps(result, indent=2) + '\n')
with output.with_suffix('.csv').open('w', newline='') as file:
    fields = list(dict.fromkeys(key for row in rows for key in row))
    writer = csv.DictWriter(file, fieldnames=fields)
    writer.writeheader(); writer.writerows(rows)
print(json.dumps({key:result[key] for key in ('route_count','sitemap_count','live','issues','deferred_interactive_anchors')}, indent=2))
raise SystemExit(bool(issues))
