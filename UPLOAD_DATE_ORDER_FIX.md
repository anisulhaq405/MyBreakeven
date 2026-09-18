# MyBreakeven date and blog order fix

Upload these files to the repository root, preserving the exact folder paths. Replace existing files when GitHub asks; do not delete the rest of the project.

- `src/day1Posts.js`
- `src/day2Posts.js`
- `src/Day1Article.jsx`
- `src/BlogArticle.jsx`
- `src/BlogSection.jsx`
- `scripts/create-pages.mjs`
- `public/sitemap.xml`
- `public/images/blog/day2-*.webp`

The blog collection is sorted by each article's `published` field, newest first. Article cards and article pages now format the date from that field instead of using a hardcoded September 10 date. The static generator also writes `datePublished` and `dateModified` from each article record.

After uploading, commit with:

`Fix blog dates and sort newest posts first`

Then wait for the Hostinger production workflow to finish. If the old date remains immediately after deployment, use a hard refresh or clear the CDN/cache; the generated HTML has been verified locally with September 18, September 17, and September 10 dates.
