import { readFile, writeFile, mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
const webhook = process.env.MAKE_SOCIAL_WEBHOOK_URL;
if (!webhook) { console.log('Social publishing disabled: configure MAKE_SOCIAL_WEBHOOK_URL.'); process.exit(0); }
const feed = JSON.parse(await readFile('dist/social-feed.json', 'utf8'));
// Only announce after Hostinger serves this exact build.
let live = false;
for (let i = 0; i < 60; i++) {
  try {
    const response = await fetch(`https://mybreakeven.com/social-feed.json?build=${feed.revision}`, { signal: AbortSignal.timeout(15000), cache: 'no-store' });
    live = response.ok && (await response.json()).revision === feed.revision;
  } catch {}
  if (live) break;
  await new Promise(resolve => setTimeout(resolve, 30000));
}
if (!live) throw new Error('Hostinger has not served this build within 30 minutes; no social posts sent.');
const directory = await mkdtemp(join(tmpdir(), 'mybreakeven-social-'));
const git = (...args) => execFileSync('git', args, { cwd: directory, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
git('init');
git('remote', 'add', 'origin', process.env.SOCIAL_REPOSITORY_URL);
// Reuse checkout's credential helper; never expose the webhook or GitHub token.
const extraHeader = execFileSync('git', ['config', '--get', 'http.https://github.com/.extraheader'], { encoding: 'utf8' }).trim();
if (extraHeader) git('config', 'http.https://github.com/.extraheader', extraHeader);
git('config', 'user.name', 'MyBreakEven Automation');
git('config', 'user.email', 'automation@mybreakeven.com');
const remote = git('ls-remote', '--heads', 'origin', 'social-publish-state');
let state;
if (remote) {
  git('fetch', '--depth=1', 'origin', 'social-publish-state');
  git('checkout', '-B', 'social-publish-state', 'FETCH_HEAD');
  state = JSON.parse(await readFile(join(directory, 'state.json'), 'utf8'));
} else {
  git('checkout', '--orphan', 'social-publish-state');
  state = { version: 1, records: {} };
}
async function save(message) {
  await writeFile(join(directory, 'state.json'), JSON.stringify(state, null, 2) + '\n');
  git('add', 'state.json');
  if (git('status', '--porcelain')) {
    git('commit', '-m', message);
    git('push', 'origin', 'HEAD:refs/heads/social-publish-state');
  }
}
const destinations = ['facebook', 'instagram', 'pinterest'];
if (!remote) {
  for (const item of feed.items) for (const destination of destinations) {
    if (item.url === process.env.SOCIAL_FIRST_TEST_URL) continue;
    state.records[`${item.url}|${destination}`] = { revision: item.revision, status: 'baseline' };
  }
  await save('Seed existing content without posting archive');
  console.log(`Initialized baseline for ${feed.items.length} public pages. No archive posts sent.`);
}
let failures = 0;
for (const item of feed.items) for (const destination of destinations) {
  const key = `${item.url}|${destination}`;
  const previous = state.records[key];
  if (previous?.status === 'needs_review' || previous?.status === 'attempting') { failures++; continue; }
  if (previous?.revision === item.revision) continue;
  if (!item.image?.endsWith('.jpg')) { failures++; console.error(`Missing publishable JPEG: ${item.url}`); continue; }
  state.records[key] = { revision: item.revision, status: 'attempting', attemptedAt: new Date().toISOString() };
  await save(`Reserve ${destination} publication`);
  try {
    const response = await fetch(webhook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...item, kind: destination, title: item.title.slice(0, 100), description: (item.description || '').slice(0, 700) }), signal: AbortSignal.timeout(120000) });
    const result = await response.json();
    if (!response.ok || !result.postId || result.revision !== item.revision) throw new Error('Publication not confirmed');
    state.records[key] = { revision: item.revision, status: 'published', postId: result.postId, publishedAt: new Date().toISOString() };
    await save(`Record ${destination} publication`);
    console.log(`Published ${destination}: ${item.url} (${result.postId})`);
  } catch {
    // A timeout may happen AFTER publication. Never automatically duplicate a post.
    state.records[key].status = 'needs_review';
    await save(`Flag uncertain ${destination} publication for review`);
    failures++;
    console.error(`Reconcile Make history before retrying ${destination}: ${item.url}`);
  }
}
if (failures) throw new Error(`${failures} destination publications need review; see social-publish-state and Make execution history.`);
