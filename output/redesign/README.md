# Subul Technology — Website redesign

Implemented the approved Pathways identity in the existing Python/Jinja static site.

Scope: company pages in EN/AR; eight product sites and their legal/login/changelog pages; FrostUIkit documentation; Blogger template source.

Design: shared `static/css/brand.css`, approved vector mark, live bilingual navigation wordmark, editorial service grid, new homepage brand composition, consistent product parent branding, responsive layout, accessible light/dark teal variants. Existing product logos remain product identifiers.

Content: added hosting, local servers, LAN and NAS services; refreshed homepage headline and normalized company Arabic spelling; canonical domain now uses subultech.top.

Repairs: project hero reveal elements now show immediately; reveal observer includes all explicit reveal elements and honors reduced motion; project and company share theme persistence; missing local product screenshots are omitted at build time while remote/existing sources are retained.

Validation:
- Main, product and package generators pass; 49 branded HTML pages generated.
- Local image/script/style/favicon references checked: zero missing assets.
- `node --check` passes for main.js and project.js.
- Blogger XML passes xmllint; git diff --check passes.
- Screenshot normalization checked for missing, existing and remote paths.
- Browser review: EN/AR home, light/dark themes, 390 px mobile and desktop; no horizontal overflow in observed home/product layouts. Mobile navigation and solar product filter work. Product, team and investment page templates reviewed.
- External form delivery was not submitted during visual QA.

Publication: local implementation only. Deploy the generated repository via the existing GitHub Pages workflow. Blogger is a separate service: upload blogger_template.xml after main-site brand assets are deployed. No remote publication or Blogger upload was performed.
