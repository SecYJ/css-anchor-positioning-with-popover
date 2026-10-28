# CSS Anchor Positioning

A small playground for learning the [CSS Anchor Positioning API](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning). It lets you tether one element (a tooltip, menu, or popover) to another element using only CSS, with no JavaScript positioning library.

The core idea takes two steps:

```css
.button  { anchor-name: --my-anchor; }      /* 1. name an element */

.tooltip {
  position: absolute;                       /* required: absolute or fixed */
  position-anchor: --my-anchor;             /* 2. tether another element to it */
  position-area: top;
}
```

## Running it

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

There is also **`anchor.html`**, a standalone dark-theme cheat sheet with the same four demos. It's plain HTML + CSS with no build step, so just open it in a browser.

## Files

| File | What's in it |
| --- | --- |
| `src/anchor.css` | **All the positioning**, in plain, commented CSS. Start here. |
| `src/routes/index.tsx` | The demo markup. Tailwind classes handle the *look* only (colors, spacing, fonts). |
| `anchor.html` | Standalone cheat sheet: the demos, the CSS, and the gotchas on one page. |
| `src/styles.css` | Tailwind import and base styles. |
| `src/routes/__root.tsx`, `src/router.tsx`, `src/main.tsx` | TanStack Router app shell. |

Keeping positioning out of Tailwind keeps the anchor CSS in one readable place. Tailwind (4.3.3) has no anchor utilities anyway (see [Tailwind](#tailwind)).

## The demos

### 1. `position-area`: hover tooltip

The easiest way to place something. Picture a 3×3 grid around the anchor, then pick a cell.

```css
.tooltip-anchor { anchor-name: --tooltip-anchor; }

.tooltip {
  position: absolute;
  position-anchor: --tooltip-anchor;
  position-area: top;            /* bottom, right, top right, left… */
  margin-bottom: 0.5rem;
}

.tooltip-anchor:hover + .tooltip { display: block; }
```

### 2. `anchor()` + `anchor-size()`: popover menu

For precise control, use the anchor's edges in the inset properties and its size in sizing properties. The menu is a native popover (`<button popovertarget="menu">` + `<ul id="menu" popover>`).

```css
.menu-button { anchor-name: --menu-button; }

.menu {                          /* popovers are already position: fixed */
  position-anchor: --menu-button;
  inset: auto;                   /* reset the UA styles that center popovers */
  margin: 0;
  top: anchor(bottom);           /* menu top = button bottom */
  left: anchor(left);            /* left edges line up */
  min-width: anchor-size(width); /* at least as wide as the button */
}
```

### 3. `position-try-fallbacks`: flip inside a scroll box

When the preferred position would overflow, the browser tries the fallbacks in order. Scroll the box until the anchor reaches its top edge, and the tooltip flips below the anchor.

```css
.scroll-area { position: relative; }   /* non-scrolling wrapper */

.flip-tip {                            /* a sibling of the scroller, not inside it */
  position: absolute;
  position-anchor: --flip-anchor;
  position-area: top;
  margin-bottom: 0.5rem;
  position-try-fallbacks: flip-block;  /* try also: flip-block, flip-inline */
}
```

### 4. `@position-try`: a custom fallback

When `flip-*` isn't enough, define a named fallback. The tooltip starts on the right and moves below the anchor when you drag the resizable box narrower.

```css
.try-tip {
  position: absolute;
  position-anchor: --try-anchor;
  position-area: right;
  margin-left: 0.5rem;
  position-try-fallbacks: --below;
}

@position-try --below {
  position-area: bottom;
  margin: 0.5rem 0 0;            /* reset margin-left too */
}
```

## Gotchas

These were verified in headless Chrome 156.

- **Anchored elements must be `position: absolute` or `position: fixed`.** Otherwise every anchor property is silently ignored.
- **Scroll containers (Demo 3):** if the tooltip sits *inside* the scroll container, overflow is checked against the whole scrollable content. The tooltip gets clipped and never flips. Put the tooltip outside the scroller, as a sibling, inside a non-scrolling `position: relative` wrapper (`.scroll-area`).
- **`resize` makes a scroll container (Demo 4):** `resize` needs `overflow: auto`, so the resizable box hits the same problem as Demo 3. Use a non-scrolling inner `position: relative` div (`.try-area`) as the containing block, and give it a height (`h-24`). Otherwise `--below` overflows too, and the browser falls back to the original position.
- **`flip-block` mirrors margins too:** `margin-bottom` becomes `margin-top`. A plain `position-try-fallbacks: bottom` does not.
- **`flip-inline` and centered positions:** `flip-inline` does nothing for `position-area: top`, because a centered position mirrors to itself.
- **Commas matter:** `flip-block, flip-inline` (comma) means two separate fallback options. `flip-block flip-inline` (no comma) means one combined diagonal flip.
- **`@position-try` only replaces the properties it declares.** Anything it doesn't mention keeps the element's own value, so reset `margin-left` explicitly.
- **Popovers: behavior vs. layout.** `popovertarget` handles behavior (toggle, light dismiss, accessibility). `anchor-name` / `position-anchor` handle layout.
- **`position-anchor: auto`** uses the popover's implicit anchor (the button that opened it). Leaving `position-anchor` unset does **not** (verified in Chrome 156).

## Tailwind

Tailwind 4.3.3 (the latest) has no anchor utilities. Arbitrary properties and values compile fine if you want to stay in class names:

```html
<button class="[anchor-name:--x]">…</button>
<div class="absolute [position-anchor:--x] top-[anchor(bottom)]">…</div>
```

## Browser support

Chromium-based browsers support everything used here. Check [caniuse](https://caniuse.com/css-anchor-positioning) for current Safari and Firefox status. If a browser lacks support, the page shows a warning banner, driven by:

```css
@supports not (anchor-name: --x) {
  .no-support { display: block; }
}
```
