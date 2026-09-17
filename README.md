# MyBreakeven Day 1 Blog Package

This package contains eight Day 1 pricing articles with one feature image per article.

## Included

- Eight Markdown articles with SEO metadata and JSON-LD
- Eight 16:9 feature images in `assets/blog/`
- Root-relative image paths such as `/assets/blog/cleaning-pricing.png`
- Image alt text in every article
- Article schema image property in every article

## Deployment note

Copy the article files into the same content directory used by the existing blog routes, and copy `assets/blog/` into the site's public/static assets directory so `/assets/blog/<filename>.png` resolves publicly. The Markdown files are prepared for the existing MyBreakeven blog structure. This package does not change calculator logic, routing, or site configuration.

Before publishing, confirm that your repository serves root-relative static assets from `/assets/` and that each article's Markdown renderer allows image Markdown and JSON-LD blocks.
