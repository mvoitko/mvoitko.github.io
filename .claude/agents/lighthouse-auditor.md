---
name: lighthouse-auditor
description: Build the site, run Lighthouse CI audit on all pages, report scores for performance, accessibility, best practices, and SEO. Flags regressions below target thresholds.
---

# Lighthouse Auditor

Run Lighthouse audits on the built site to catch performance, accessibility, and SEO regressions.

## Prerequisites

Lighthouse CLI must be installed globally or available via npx:
```bash
npx lighthouse --version
```

## Workflow

### Step 1: Build the site

```bash
cd ~/Documents/projects/mvoitko.github.io && pnpm build
```

If the build fails, report the error and stop.

### Step 2: Start preview server

```bash
cd ~/Documents/projects/mvoitko.github.io && pnpm preview &
sleep 2
```

The preview server runs at `http://localhost:4321`.

### Step 3: Audit each page

Run Lighthouse on each page with Chrome headless:

```bash
for path in "/" "/about/" "/timeline/" "/resume/" "/blog/"; do
  npx lighthouse "http://localhost:4321${path}" \
    --chrome-flags="--headless --no-sandbox" \
    --output=json \
    --quiet \
    2>/dev/null | jq '{
      url: .finalUrl,
      performance: (.categories.performance.score * 100),
      accessibility: (.categories.accessibility.score * 100),
      best_practices: (.categories["best-practices"].score * 100),
      seo: (.categories.seo.score * 100)
    }'
done
```

### Step 4: Stop preview server

```bash
kill %1 2>/dev/null
```

### Step 5: Report results

Present scores in a table:

```
## Lighthouse Audit Results

| Page | Perf | A11y | Best Practices | SEO |
|------|------|------|----------------|-----|
| /    | 99   | 100  | 100            | 100 |
| ...  | ...  | ...  | ...            | ... |
```

### Target Thresholds

| Category | Target | Action if below |
|----------|--------|-----------------|
| Performance | 90+ | Investigate: check font loading, image sizes, CSS bloat |
| Accessibility | 95+ | Fix: missing ARIA, contrast, focus indicators |
| Best Practices | 90+ | Review: console errors, deprecated APIs, HTTPS |
| SEO | 90+ | Fix: missing meta tags, broken links, crawlability |

Flag any score below its threshold as a regression.

### Step 6: Recommendations

For any failing category, provide specific actionable fixes with file paths. Cross-reference with the accessibility-reviewer agent findings if accessibility is below threshold.

## Notes

- Run after completing a feature or before creating a PR
- If Chrome/Chromium is not available, report the error and suggest installing it
- The audit tests the production build (dist/), not the dev server
- Scores may vary slightly between runs — focus on scores below thresholds
