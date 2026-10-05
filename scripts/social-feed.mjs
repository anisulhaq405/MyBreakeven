import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const origin = 'https://mybreakeven.com';
const xml = value => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
export const revisionFor = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');

export async function generateSocialFeed({ articles, calculators, pages, directory }) {
  const items = [];
  async function add({ route, title, description, image, kind, content, published = null, modified = null }) {
    let imageUrl = image ? new URL(image, origin).href : null;
    let imageRevision = null;
    if (imageUrl?.startsWith(`${origin}/`)) {
      const bytes = await readFile(new URL(`.${new URL(imageUrl).pathname}`, directory));
      imageRevision = createHash('sha256').update(bytes).digest('hex');
      await mkdir(new URL('images/social/', directory), { recursive: true });
      const name = `${imageRevision}.jpg`;
      await sharp(bytes).rotate().resize(1200, 630, { fit: 'contain', background: '#ffffff' }).flatten({ background: '#ffffff' }).jpeg({ quality: 88 }).toFile(new URL(`images/social/${name}`, directory).pathname);
      imageUrl = `${origin}/images/social/${name}`;
    }
    const url = `${origin}/${route}${route ? '/' : ''}`;
    const revision = revisionFor({ title, description, image: imageUrl, imageRevision, content });
    items.push({ id: `${url}#${revision}`, url, revision, kind, title, description, image: imageUrl,
      published, modified, caption: `${title}\n\n${description}\n\n${url}` });
  }
  for (const article of articles) {
    // Hash authored content, excluding generated related-link lists and build timestamps.
    await add({ route: `blogs/${article.slug}`, title: article.title,
      description: article.description || article.metaDescription, image: article.image, kind: 'article',
      published: article.published, modified: article.modified, content: article });
  }
  const routes = [['', 'homepage'], ...Object.entries(pages).filter(([, meta]) => !meta[3]).map(([route]) => [route, 'page']),
    ...Object.keys(calculators).map(slug => [`calculators/${slug}`, 'calculator'])];
  for (const [route, kind] of routes) {
    const html = await readFile(new URL(`${route ? `${route}/` : ''}index.html`, directory), 'utf8');
    const getMeta = name => html.match(new RegExp(`<meta (?:name|property)="${name}" content="([^"]*)"`))?.[1] || '';
    const decode = text => text.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'").replaceAll('&lt;', '<').replaceAll('&gt;', '>');
    const body = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
    if (!body) throw new Error(`Missing public content for social feed: ${route || '/'}`);
    await add({ route, kind, title: decode(html.match(/<title>(.*?)<\/title>/)?.[1] || ''),
      description: decode(getMeta('description')), image: decode(getMeta('og:image')) || null,
      content: body.replace(/\s+/g, ' ').trim() });
  }
  items.sort((a, b) => a.url.localeCompare(b.url));
  const feed = { version: 1, site: origin, revision: revisionFor(items), items };
  await writeFile(new URL('social-feed.json', directory), `${JSON.stringify(feed, null, 2)}\n`);
  const rss = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/"><channel><title>MyBreakeven content and updates</title><link>${origin}</link><description>New articles and public page revisions</description>${items.map(item => `<item><title>${xml(item.title)}</title><link>${xml(item.url)}</link><guid isPermaLink="false">${xml(item.id)}</guid><description>${xml(item.description)}</description>${item.image ? `<media:content url="${xml(item.image)}" medium="image"/>` : ''}</item>`).join('')}</channel></rss>\n`;
  await writeFile(new URL('social-feed.xml', directory), rss);
  return feed;
}
