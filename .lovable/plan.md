

## Fix: All Admin Dialogs Not Scrollable (Root Cause)

### Problem
The `DialogContent` component in `src/components/ui/dialog.tsx` has `grid` hardcoded in its base CSS. When Admin.tsx passes `flex flex-col`, both `grid` and `flex` end up in the final class list. CSS `grid` takes precedence, causing the dialog to expand to fit its content rather than constraining height and enabling scroll. This is why trackpad/mousewheel scrolling doesn't work -- there's nothing to scroll because the container grows instead of overflowing.

### Solution (One-time fix, affects all three dialogs)

**File: `src/components/ui/dialog.tsx`** (line 39)

Replace `grid` with `flex flex-col` in the base DialogContent class so it natively supports constrained height and overflow scrolling:

```tsx
// Before
"fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 ..."

// After
"fixed left-[50%] top-[50%] z-50 flex flex-col w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 ..."
```

**File: `src/pages/Admin.tsx`**

Remove the redundant `flex flex-col` from all three DialogContent className props since it's now in the base component. The `max-h-[85vh]` stays to cap the dialog height. The inner `overflow-y-auto flex-1 min-h-0` divs remain unchanged -- they will now work correctly because the parent is actually a flex container.

```tsx
// All three dialogs simplified to:
<DialogContent className="max-w-lg w-[calc(100%-2rem)] max-h-[85vh]">
```

No other files need changes. This is the single root cause behind all three dialogs failing to scroll.

### Why This Works
- `flex flex-col` on the dialog container means children stack vertically
- `max-h-[85vh]` caps the total dialog height
- The inner `div` with `overflow-y-auto flex-1 min-h-0` fills remaining space and scrolls when content overflows
- Trackpad, mousewheel, arrow keys, and touch all work natively because the browser handles a standard overflowing div

### Impact
This changes the base Dialog component. All dialogs across the app will use flex layout instead of grid. Since dialogs typically stack content vertically, this is the correct default. Any dialog that needs grid can override it via className.

