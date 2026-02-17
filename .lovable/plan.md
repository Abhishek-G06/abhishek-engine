
# Smooth Language Transition Animation

## Overview
Add a fade-out/fade-in transition effect when switching languages, so text doesn't just snap to the new language but smoothly crossfades.

## Approach
Use a CSS-based transition on the main content area. When the language changes, the `LanguageProvider` will briefly set a `isTransitioning` state to true, which adds a CSS class that fades content out. After a short delay, the language updates and content fades back in.

## Changes

### 1. Update `src/i18n/LanguageContext.tsx`
- Add an `isTransitioning` boolean to context
- When `setLanguage` is called, set `isTransitioning = true`, wait ~150ms, update the language, then set `isTransitioning = false` after another ~150ms

### 2. Update `src/App.tsx`
- Wrap the main app content in a div that reads `isTransitioning` from context and applies an opacity/transition CSS class

### 3. Update `src/index.css`
- Add a utility class for the language transition (e.g., `.lang-transitioning` with `opacity: 0` and a CSS transition on opacity ~150ms)

## Technical Details

**LanguageContext changes:**
```typescript
// New state
const [isTransitioning, setIsTransitioning] = useState(false);

// Updated setLanguage
const setLanguage = useCallback((lang: Language) => {
  if (lang === language) return;
  setIsTransitioning(true);
  setTimeout(() => {
    setLanguageState(lang);
    localStorage.setItem("portfolio-language", lang);
    setTimeout(() => setIsTransitioning(false), 150);
  }, 150);
}, [language]);
```

**App.tsx wrapper:**
```tsx
// A small wrapper component inside LanguageProvider that reads context
<div className={`transition-opacity duration-150 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
  {children}
</div>
```

This creates a quick 150ms fade-out, language swap, then 150ms fade-in -- a subtle 300ms total transition that feels polished without being slow.
