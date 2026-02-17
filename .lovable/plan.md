# Multi-Language Support

## Overview

Add a language switcher to the navbar supporting 4 languages: English, Japanese, Spanish, and German. All static text across the site will be translatable via a lightweight custom i18n system (no heavy library needed for a portfolio site).

## Languages

- English (EN) -- default
- Japanese (JA)
- Spanish (ES)
- German (DE)

## How It Works

1. A new `LanguageContext` provider will store the current language and expose a `t()` translation function.
2. A translations file will map every piece of UI text to all 4 languages.
3. A `LanguageSwitcher` dropdown component (using the existing dropdown-menu UI) will sit in the navbar next to the theme toggle, showing a globe icon with a compact language code.
4. The selected language persists in `localStorage`.

## What Changes

### New Files

- `**src/i18n/translations.ts**` -- All translatable strings keyed by section (hero, about, skills, contact, navbar, footer).
- `**src/i18n/LanguageContext.tsx**` -- React context providing `language`, `setLanguage`, and `t(key)`.
- `**src/components/LanguageSwitcher.tsx**` -- Globe icon dropdown with 4 language options.

### Modified Files

- `**src/App.tsx**` -- Wrap app with `LanguageProvider`.
- `**src/components/Navbar.tsx**` -- Add `LanguageSwitcher` next to `ThemeToggle`.
- `**src/components/HeroSection.tsx**` -- Replace hardcoded strings with `t()` calls.
- `**src/components/AboutSection.tsx**` -- Same.
- `**src/components/SkillsSection.tsx**` -- Same.
- `**src/components/ContactSection.tsx**` -- Same (labels, placeholders, headings).
- `**src/components/Footer.tsx**` -- Same.

## Technical Details

### Translation keys structure (example)

```typescript
const translations = {
  en: {
    "hero.greeting": "Hello, I'm",
    "hero.title": "Full Stack Developer & Designer",
    "hero.description": "I craft beautiful, functional digital experiences...",
    "hero.viewWork": "View My Work",
    "hero.contactMe": "Contact Me",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.getInTouch": "Get in Touch",
    // ... all other strings
  },
  ja: { /* Japanese translations */ },
  es: { /* Spanish translations */ },
  de: { /* German translations */ },
};
```

### LanguageSwitcher component

- Uses the existing `DropdownMenu` component
- Shows a `Globe` icon (from lucide-react) with the current language code
- Lists all 4 languages with their native names (e.g., "日本語", "Español", "हिन्दी")
- Saves selection to `localStorage`

### Context usage

```typescript
const { t } = useLanguage();
// In JSX:
<p>{t("hero.greeting")}</p>
```

## Notes

- Skill names (React, TypeScript, etc.) and the portfolio owner's name will NOT be translated -- they stay in English.
- Contact info (email, phone, address) stays as-is.
- The language switcher will be responsive and work on both desktop and mobile nav.