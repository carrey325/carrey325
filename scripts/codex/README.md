# Full-width Codex activity banner

This is a personal layout adaptation of [Codex Usage Profile](https://github.com/postmelee/codex-usage-profile), based on upstream commit `6d3e600d2d33bb7a50147075d013ddd9b945d0b1`.

The calendar placement and heat-level algorithm in `banner.mjs` derive from upstream `src/profile-card/heatmap.js`. The MIT copyright and license are retained in `LICENSE.upstream`.

The custom SVG displays a complete rolling calendar year (365 or 366 days), aligned into Sunday-to-Saturday columns. It uses a light canvas and a separate five-metric bar. The width is 100% of the GitHub README. Daily bucket dates remain source dates; they are not rebucketed into another timezone. The displayed end date follows America/New_York at capture time. Missing metrics appear as an em dash; unavailable daily data is labeled.

## Refresh

On a trusted machine signed into Codex, with Node.js 20+ and Codex on PATH:

```powershell
npm ci
npm run update:codex
git add assets/codex-activity.svg
git commit -m "Refresh Codex usage"
git push
```

The analyzer is pinned to `codex-usage-analyzer@0.4.1`, the same release used by the upstream profile CLI. It reads aggregate usage through Codex app-server. Credentials, prompts, responses and session files are not placed in this repository.

The README now uses the SVG stored in this repository, rather than the upstream hosted PNG. Running the upstream `codex-usage-profile submit` command alone does **not** refresh this SVG. There is no scheduled refresh configured by this change.

Run `npm test` to verify rolling-year boundaries, leap years and unavailable values.
