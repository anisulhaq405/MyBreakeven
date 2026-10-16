import { readFile, writeFile } from 'node:fs/promises';

// These local stylesheets use ordinary rules and nested media queries. Copy the
// navigation rules verbatim, preserving media guards and source order, so an
// article need not load the complete hub layouts. No third-party CSS is parsed.
function navigationRules(css) {
  let result = '', cursor = 0;
  while (cursor < css.length) {
    const open = css.indexOf('{', cursor);
    if (open < 0) break;
    let depth = 1, close = open + 1;
    while (depth && close < css.length) {
      if (css[close] === '{') depth++;
      if (css[close] === '}') depth--;
      close++;
    }
    if (depth) throw new Error('Unbalanced cluster stylesheet');
    const selector = css.slice(cursor,open).trim(), body = css.slice(open+1,close-1);
    if (selector.startsWith('@media') || selector.startsWith('@supports')) {
      const children = navigationRules(body);
      if (children) result += selector+'{'+children+'}';
    } else if (selector.includes('-cluster-link')) result += selector+'{'+body+'}';
    cursor = close;
  }
  return result;
}

export async function generateClusterLinkStyles() {
  const files = ['agency','ecommerce','photography','restaurant','salon','mobile-detailing','landscaping','cleaning'];
  let css = '/* Generated navigation-only rules from the existing hub styles. */\n';
  for (const name of files) css += navigationRules(await readFile(new URL(`../src/${name}-cluster.css`,import.meta.url),'utf8'))+'\n';
  await writeFile(new URL('../src/cluster-links.css',import.meta.url),css);
}
