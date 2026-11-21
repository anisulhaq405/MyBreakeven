# Mybreakeven.com project publishing rules

## Cluster assignment is part of every page task

When adding or substantially updating a guide, assess its reader intent and assign the relevant existing topic in the same change. Do not leave clustering for a later batch.

- Give each guide exactly one primary topic in src/novemberTopics.js. Industry-tagged guides join their sector topic automatically, but must also be assigned to one meaningful subgroup in the corresponding src/*Cluster.js registry.
- Add the guide to its existing hub and provide relevant contextual links to supporting guides/calculators. Verify the hub links back to the guide. Preserve a distinct intent and canonical URL; do not create another page for a keyword already owned by an existing guide.
- Supporting cross-topic links are allowed when useful. They do not create a second primary owner. Do not force an unrelated subject into a cluster just to satisfy a check; create an editorially justified topic when necessary.
- General-business topics use explicit membership. Do not infer a business-topic owner by keyword matching alone.
- Calculators retain their appropriate directory category and related-guide links; resources use their relevant guide/hub. Do not label a calculator, case study or legal/account page as a blog merely to fit the guide registry.
- Build fails if guide ownership or industry subgroup coverage is missing, ambiguous or references an unpublished guide. Run the production build and existing cluster QA before publication.
- Preserve existing page assets, publication history, calculator engines and unrelated records unless the requested work requires changing them.
- Keep [skip social] in commit, PR and squash titles for website-only work. Do not publish social posts or send outreach without explicit user instructions.
