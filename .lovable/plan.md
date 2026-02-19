

# SEO Improvements for Portfolio

## Overview
Six targeted improvements to boost search engine visibility, accessibility, and page performance.

---

## 1. Fix Hidden Content for Crawlers
Replace `visibility: hidden` with a CSS class that GSAP removes on animation. Use `opacity: 0` instead so crawlers still see the text in the DOM.

**Files:** `src/components/HeroSection.tsx`

---

## 2. Add JSON-LD Structured Data
Add a `Person` schema to the Index page so Google understands who you are:
- Name, job title, URL, social profiles (GitHub, LinkedIn)
- This enables rich search results

**File:** `src/pages/Index.tsx` (inside `<Helmet>`)

---

## 3. Dynamic `lang` Attribute
Update `document.documentElement.lang` when the language changes so the HTML tag matches the active language.

**File:** `src/i18n/LanguageContext.tsx`

---

## 4. Optimize Font Loading
Replace CSS `@import` with `<link rel="preconnect">` and `<link rel="stylesheet">` in `index.html` for faster font loading and better Core Web Vitals.

**Files:** `index.html`, `src/index.css`

---

## 5. Add Accessible Labels to Social Links
Add `aria-label` attributes to the GitHub, LinkedIn, and Mail icon links in the hero section.

**File:** `src/components/HeroSection.tsx`

---

## 6. Add `<noscript>` Fallback
Add a `<noscript>` tag in `index.html` so search engines that don't run JS still see a basic message, improving crawlability.

**File:** `index.html`

---

## Technical Summary

| File | Changes |
|------|---------|
| `src/components/HeroSection.tsx` | Replace `visibility: hidden` with `opacity: 0`; add `aria-label` to social links |
| `src/pages/Index.tsx` | Add JSON-LD `Person` structured data in Helmet |
| `src/i18n/LanguageContext.tsx` | Sync `document.documentElement.lang` on language change |
| `index.html` | Move font loading to `<link>` tags; add `<noscript>` fallback |
| `src/index.css` | Remove `@import` font lines (moved to HTML) |

