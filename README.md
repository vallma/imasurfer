# I'm a Surfer

Landing page for board racks that hold **both** a surfboard and a snowboard.
One button switches the whole site between two seasons:

| | SURF | SNOW |
|---|---|---|
| Ground | warm dusk, dark | whiteout, light |
| Accent | `#ff9c42` amber | `#1f5fe0` glacier blue |
| Scene | wave ridges, drifting spray | mountain ridgelines, falling snow |
| Wordmark | I'm a Surfer | I'm a Snowboarder |
| Copy | *chase swell* | *chase powder* |

Bilingual EN / ES throughout, with a second switch in the navbar.

## Stack

No build step, no dependencies. Static HTML, CSS and vanilla JS — open
`index.html` or serve the folder and it runs.

```
index.html    markup: nav, hero, categories, shop, reviews, story, footer,
              cart drawer, product modal
styles.css    design tokens per season + every component
catalog.js    the 3 products and their inline SVG artwork -> window.IAS
app.js        season switch, EN/ES copy, filters, modal, cart, scroll rider
favicon.svg
```

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Paths are relative, so the site also works from a subfolder — which is
what GitHub Pages serves it from.

## Editing the catalogue

Everything lives in `catalog.js`. A product looks like this:

```js
{ id:'ala-01', cat:'wall', art:'wallSingle', price:39, was:49, rev:214,
  best:true, fin:['oak','black'],
  n:'Ala 01',
  fit:{ en:"Surf 5'0–9'6 · Snow 138–168cm", es:"Surf 5'0–9'6 · Snow 138–168 cm" },
  t:{ en:'One board. Six inches of wall.', es:'Una tabla. Quince centímetros de pared.' },
  d:{ en:'…', es:'…' },
  s:{ en:['spec','spec'], es:['spec','spec'] } }
```

- `cat` is `wall`, `stand` or `travel` — the three filter chips.
- `art` keys into the `A` map at the top of the file (inline SVG drawn with
  the theme's `--art-a` / `--art-b` tokens, so it recolours with the season).
- `was` renders a strikethrough price and a discount badge; `low` renders a
  low-stock badge; `best` renders a best-seller badge.
- `fin` lists the finishes offered in the product modal.

## Copy and translations

Text lives in the markup on data attributes, read by `applyCopy()` in `app.js`:

- `data-en` / `data-es` — same in both seasons.
- `data-surf-en` / `data-surf-es` / `data-snow-en` / `data-snow-es` — season
  specific, and they win over the plain pair when present.
- `data-ph-en` / `data-ph-es` — input placeholders.

## Status

Demo content. Products, prices, reviews and the workshop address are
placeholders; checkout is a toast, not a payment flow.
