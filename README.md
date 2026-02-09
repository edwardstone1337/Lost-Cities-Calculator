# Lost Cities Score Calculator

A static web app for calculating scores for **The Lost Cities** card game. Tap cards to mark them as played, then get per-expedition and total scores with correct wager and bonus rules.

**Live:** https://lostcitiesscorecalculator.com

---

## Tech stack

- **HTML, CSS, JavaScript** (vanilla; no build step)
- **Fonts:** [Google Fonts](https://fonts.googleapis.com) — Inter (variable), Acme
- **Analytics / behaviour:** Microsoft Clarity, Google Analytics (gtag), Hotjar (see [External dependencies](#external-dependencies))

---

## Project structure

```
Lost-Cities-Calculator/
├── index.html          # Single-page app markup
├── script.js           # Card interactions, scoring, modal
├── styles.css          # Layout, theming, card styles
├── CNAME               # Custom domain for hosting
├── robots.txt
├── sitemap.xml
├── update-sitemap.sh   # Updates lastmod in sitemap.xml
├── og-image.png        # Social share image
└── Images/             # Card backs, expedition icons, favicon, background, logo
```

*(Old/, modal test/, and config dirs like .cursor/ and .vscode/ are not part of the shipped app.)*

---

## Local development

The site is static. Serve the project root with any local server, for example:

```bash
# From project root
npx serve
# or
python3 -m http.server 8000
```

Then open the URL shown (e.g. `http://localhost:3000` or `http://localhost:8000`).

---

## Key features

- **Six expeditions** (purple, red, green, blue, grey, gold), each with 3 wager cards and expedition cards 2–10.
- **Tap cards** to toggle “played” state; cards flip to show selection. “Reset Cards” clears all; keyboard **R** = reset, **Enter** = calculate and show results.
- **Rotate** button reorders the six expeditions (swap left/right order).
- **Calculate Scores** opens a modal with:
  - Total score.
  - Per-expedition breakdown: sum of played card values, −20 expedition cost, × (1 + number of wagers), +20 bonus if 8+ cards in that expedition.
- **Score modal** includes a “Buy Me a Coffee” link and a close button; clicking outside the modal also closes it.
- **Loading** state (“Preparing Expedition…”) hides when the page is ready.
- **Disclaimer** and shared footer at the bottom (see below).

---

## External dependencies

| Purpose        | Source |
|----------------|--------|
| Fonts          | Google Fonts (Inter, Acme) — `fonts.googleapis.com`, `fonts.gstatic.com` |
| Analytics      | Google Tag Manager / gtag — `googletagmanager.com` |
| Behaviour      | Microsoft Clarity — `clarity.ms` |
| Behaviour      | Hotjar — `static.hotjar.com` |
| Shared footer  | `https://footer.edwardstone.design/src/footer.js` (see [Shared footer](#shared-footer)) |

---

## Shared footer

The “Edward Stone” footer is loaded from an external script. In `index.html`:

- A placeholder `<div id="es-footer" data-project="lostcities"></div>` is where the footer is injected.
- The script is loaded with `<script type="module" src="https://footer.edwardstone.design/src/footer.js"></script>`.
- The `data-project="lostcities"` value is used so this project is highlighted as the active project in the footer. The footer implementation lives in a separate repo (not referenced in this codebase).

---

## Deployment

- **CNAME** contains `lostcitiesscorecalculator.com`, which is the standard way to use a custom domain with **GitHub Pages**. The site is static and can be deployed by pushing to the branch GitHub Pages uses (e.g. `main` or `gh-pages`) or via any static host that respects the CNAME for DNS.

---

## Legal

**Lost Cities** is a game by **Reiner Knizia**, published by **KOSMOS**. This calculator is an **unofficial fan-made tool** and is not affiliated with or endorsed by the publisher. The in-page disclaimer reflects this.

---

*README is based only on the current codebase; no assumptions beyond what’s in the repo.*
