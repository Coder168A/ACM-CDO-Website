# ACM USTP Website

Modular static site (vanilla HTML/CSS/ES modules, no build step).

```
index.html            mount points only
css/tokens.css        brand colors, spacing (edit theme here)
css/base.css          reset, layout, buttons
css/components.css    per-section styles
js/main.js            registers components to mount points
js/components/*.js    one module per section (starfield.js = animated canvas background)
assets/               images/icons exported from the Figma concept
js/data/content.js    all text/events/officers (edit content here)
```

Theme: dark space/interstellar, from Figma file ACM-WEBSITE-CONCEPT-DESIGN.

Run (ES modules do not load from file://):

    cd /home/work/SAMPLE && python serve.py

Open http://localhost:8000

Add a section: create `js/components/x.js` exporting `X(el)`, add `<section id="x">` to index.html, register in `js/main.js`.
