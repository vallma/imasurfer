# I'm a Surfer

Shop window for **Coffiesurf** — handmade plywood board racks, made in
Barcelona and sold on [Etsy](https://www.etsy.com/es/shop/Coffiesurf).

One button switches the whole site between two seasons, because the same
rack holds a surfboard, a snowboard, a wakeboard or a kite board:

| | SURF | SNOW |
|---|---|---|
| Ground | warm dusk, dark | whiteout, light |
| Accent | `#ff9c42` amber | `#1f5fe0` glacier blue |
| Scene | wave ridges, drifting spray | mountain ridgelines, falling snow |
| Wordmark | I'm a Surfer | I'm a Snowboarder |
| Copy | *chase swell* | *chase powder* |

Bilingual EN / ES throughout, with a second switch in the navbar.

**The cart is a demo.** It adds up, it remembers what you put in it, and
then it tells you the real orders go through Etsy. Nothing is charged.

## Stack

No build step, no dependencies. Static HTML, CSS and vanilla JS — serve
the folder and it runs.

```
index.html    markup: nav, hero, categories, shop, reviews, story, footer,
              cart drawer, product modal
styles.css    design tokens per season + every component
catalog.js    the 7 live listings and their line drawings -> window.IAS
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

## The catalogue

`catalog.js` mirrors the Etsy shop. A product looks like this:

```js
{ id:'vertical-natural', cat:'vertical', art:'vertical', price:39, rev:5, best:true,
  etsy:'4484059794', photo:'65092907/r/il/f142b3/7931927335/il_340x270.7931927335_5kqu.jpg',
  n:{ en:'Vertical Wall Rack', es:'Soporte vertical de pared' },
  fit:{ en:'Surf · snow · wake · kite', es:'Surf · snow · wake · kite' },
  t:{ en:'Your board upright, on show.', es:'La tabla de pie, a la vista.' },
  d:{ en:'…', es:'…' },
  s:COMMON_SPECS }
```

- `cat` is `vertical`, `hooks` or `home` — the three filter chips.
- `etsy` is the listing id; `listing(id)` builds the URL.
- `photo` is the path after `i.etsystatic.com/`. The page swaps the size
  segment (`il_340x270` → `il_794xN` on cards, `il_1140xN` in the modal).
- `art` keys into the `A` map of line drawings at the top of the file.
  **The drawing is the fallback**: the photo is layered over it and removes
  itself if Etsy's CDN doesn't answer, so a card is never empty.
- `best` renders a best-seller badge; `was` a strikethrough price and a
  discount badge; `low` a low-stock badge.

Shop-wide figures (shipping, exchange window, sales, rating) live in
`SHIP` at the bottom of `catalog.js`, so the page can't drift from Etsy.
Update them when the shop changes.

## Copy and translations

Text lives in the markup on data attributes, read by `applyCopy()` in `app.js`:

- `data-en` / `data-es` — same in both seasons.
- `data-surf-en` / `data-surf-es` / `data-snow-en` / `data-snow-es` — season
  specific, and they win over the plain pair when present.
- `data-ph-en` / `data-ph-es` — input placeholders.
