# Fix Lighthouse Performance & Accessibility Findings

Two failing Lighthouse findings from the last published scan:

1. **Performance** — hero LCP paints slowly
2. **Accessibility** — low-contrast text

## 1. Performance: speed up hero LCP

**File:** `src/components/HeroSection.tsx`

The hero `<img>` already has `width/height` and `fetchPriority="high"`. Add:
- `loading="eager"` (explicitly opt out of lazy)
- `decoding="async"`

The second `<img>` (animated avatar on hover) should stay `loading="lazy"` — it's not the LCP element and only shows on hover. Also gate its dynamic import behind the first hover instead of a mount-time `useEffect` so it doesn't compete for bandwidth during initial paint.

**File:** `index.html`

The Google Fonts stylesheet is render-blocking. Change the `<link rel="stylesheet">` to a non-blocking pattern:

```html
<link
  rel="preload"
  as="style"
  href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700&family=Lora:wght@400;500;600;700&family=Inconsolata:wght@400;700&display=swap"
  onload="this.rel='stylesheet'"
/>
<noscript><link rel="stylesheet" href="…same url…" /></noscript>
```

The URL already has `display=swap`, so text paints in the fallback immediately.

## 2. Accessibility: fix low-contrast text

**File:** `src/components/Footer.tsx` (line 57)

The admin link uses `text-muted-foreground/50`, which fails 4.5:1 contrast on the footer background. Replace with `text-muted-foreground` (still muted, but passes AA).

I'll also scan the rendered footer/hero for any other arbitrary muted opacity classes on visible text and bump them to full-strength tokens.

## Out of scope

- The other two failing findings (Google Search Console setup, Semrush blog suggestion) — user asked only for Lighthouse fixes.
- No refactors, no dependency changes.

## After the fix

Republish so Lighthouse re-scans the live URL — source changes don't affect the published scan until deploy.
