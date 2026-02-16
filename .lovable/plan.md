

## Fix: Safari Scroll Issues in Admin Dialogs

### Problem
Radix UI's `ScrollArea` component uses a custom scrollbar implementation that conflicts with Safari's scroll event handling. This causes:
- No trackpad/touchpad scrolling
- No arrow key scrolling
- No visible scrollbar

### Solution
Replace `ScrollArea` with a simple native-scrolling `div` using `overflow-y-auto` in the admin dialog forms. Native scrolling works reliably across all browsers including Safari.

### Changes

**File: `src/pages/Admin.tsx`**

1. Remove the `ScrollArea` import
2. Replace all three `<ScrollArea className="max-h-[...]">` wrappers with a plain `<div>` using `overflow-y-auto` and the same max-height constraint

Before:
```tsx
<ScrollArea className="max-h-[calc(85vh-8rem)]">
  <div className="pr-4">
    <ProjectForm ... />
  </div>
</ScrollArea>
```

After:
```tsx
<div className="overflow-y-auto max-h-[calc(85vh-8rem)] pr-4">
  <ProjectForm ... />
</div>
```

This applies to all three dialogs: Create, Edit, and GitHub Import (if it uses ScrollArea).

### Why This Works
- Native browser scrolling (`overflow-y-auto`) is universally supported in Safari, Chrome, Firefox, and all modern browsers
- Trackpad gestures, arrow keys, and scrollbar visibility all work natively without any JavaScript abstraction
- The visual scrollbar will appear automatically when content overflows

### Technical Details
- The `ScrollArea` import from `@/components/ui/scroll-area` will be removed from this file
- No changes to the `ScrollArea` component itself (it may be used elsewhere without issues)
- The `pr-4` padding is preserved to maintain spacing for the scrollbar area

