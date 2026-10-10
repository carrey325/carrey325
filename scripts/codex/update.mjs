import { mkdir, writeFile, rename } from 'node:fs/promises';
import { readAccountUsage } from 'codex-usage-analyzer';
import { renderBanner } from './banner.mjs';

// The analyzer delegates authentication to the installed Codex app-server.
// Only aggregate statistics enter the SVG. No credentials or conversations are saved.
const usage = await readAccountUsage({ timeoutMs: 120000 });
const svg = renderBanner(usage);
const assets = new URL('../../assets/', import.meta.url);
await mkdir(assets, { recursive: true });
const destination = new URL('codex-activity.svg', assets);
const temporary = new URL('codex-activity.svg.tmp', assets);
await writeFile(temporary, svg, 'utf8');
await rename(temporary, destination);
console.log(JSON.stringify({ capturedAt: usage.capturedAt, summary: usage.summary,
  dailyBuckets: usage.dailyUsageBuckets?.length ?? null, output: 'assets/codex-activity.svg' }, null, 2));
