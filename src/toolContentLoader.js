const loaders = import.meta.glob('./content/generated-tools/*.json', { import: 'default' });
const loaded = new Map(), pending = new Map();
export function getLoadedTool(slug) { return loaded.get(slug); }
export async function loadTool(slug) {
  if (loaded.has(slug)) return loaded.get(slug);
  if (pending.has(slug)) return pending.get(slug);
  const loader = loaders[`./content/generated-tools/${slug}.json`];
  if (!loader) return null;
  const request = loader().then(tool => { loaded.set(slug,tool); return tool; }).finally(() => pending.delete(slug));
  pending.set(slug,request);
  return request;
}
