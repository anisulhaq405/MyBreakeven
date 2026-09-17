# Upload only these files

Do not delete any existing repository files.

Upload/replace the files inside this ZIP at the same repository paths:

- `src/day1Posts.js`
- `src/Day1Article.jsx`
- `src/BlogArticle.jsx`
- `src/BlogSection.jsx`
- `scripts/create-pages.mjs`
- all files under `public/images/blog/`

The ZIP keeps the repository-relative paths. Upload the extracted contents into the existing repository root. Do not upload the ZIP itself into the repository and do not create an extra nested folder.

Commit message:

`Add Day 1 SEO blog posts and feature images`

After committing to `main`, open GitHub Actions and wait for `Build Hostinger production` to finish successfully. It publishes the built site to the `hostinger-deploy` branch.
