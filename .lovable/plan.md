
# Fix Choppy Scrolling

## Problem
The site uses Lenis for smooth scrolling, but navigation clicks use `element.scrollIntoView({ behavior: "smooth" })` and `window.scrollTo()` — the browser's native smooth scroll. Two competing scroll systems cause the choppy/stuck feel.

## Fix
Expose the Lenis instance via React context, then replace all native scroll calls with `lenis.scrollTo()`.

---

## Changes

### 1. SmoothScrollProvider.tsx
- Create a React context that holds the Lenis instance
- Export a `useLenis` hook so other components can access it

### 2. Navbar.tsx
- Replace `element.scrollIntoView({ behavior: "smooth" })` with `lenis.scrollTo("#sectionId")`

### 3. HeroSection.tsx
- Same replacement for the CTA buttons and scroll indicator

### 4. Footer.tsx
- Same replacement for footer navigation links

### 5. BackToTop.tsx
- Replace `window.scrollTo({ top: 0, behavior: "smooth" })` with `lenis.scrollTo(0)`

---

## Technical Summary

| File | Change |
|------|--------|
| `SmoothScrollProvider.tsx` | Add context + `useLenis` hook |
| `Navbar.tsx` | Use `lenis.scrollTo("#id")` |
| `HeroSection.tsx` | Use `lenis.scrollTo("#id")` |
| `Footer.tsx` | Use `lenis.scrollTo("#id")` |
| `BackToTop.tsx` | Use `lenis.scrollTo(0)` |

No dependencies added, no major refactors. Just routing all scroll calls through Lenis.
