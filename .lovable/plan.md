

## Fix: Touchpad Scrolling in Dialog Boxes

### Problem
The current `DialogContent` component nests the `Content` element inside the `DialogOverlay`. This is non-standard for Radix UI dialogs. The overlay has `overflow-hidden` and Radix applies `pointer-events` manipulation on it, which blocks touchpad/wheel scroll events from reaching the inner scrollable `div`.

### Solution
Restructure `dialog.tsx` to use the standard Radix pattern where `DialogOverlay` and `DialogPrimitive.Content` are **siblings** inside the `DialogPortal` (not parent-child). The content will be independently positioned and centered using `fixed inset-0 flex items-center justify-center`, with the inner scrollable wrapper preserved.

### Changes

**File: `src/components/ui/dialog.tsx`**

Update the `DialogContent` component:

```text
Before (broken - content nested inside overlay):
  <DialogPortal>
    <DialogOverlay className="... overflow-hidden">
      <DialogPrimitive.Content className="... max-h-[80vh]">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {children}
        </div>
      </DialogPrimitive.Content>
    </DialogOverlay>
  </DialogPortal>

After (fixed - siblings pattern):
  <DialogPortal>
    <DialogOverlay />
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <DialogPrimitive.Content className="... max-h-[80vh]">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {children}
        </div>
      </DialogPrimitive.Content>
    </div>
  </DialogPortal>
```

Key details:
- `DialogOverlay` reverts to its default (no extra classes) -- just the backdrop
- A new plain `div` handles centering with `fixed inset-0 z-50 flex items-center justify-center p-4`
- `DialogPrimitive.Content` keeps `max-h-[80vh]`, `flex flex-col`, and `overflow-hidden`
- The inner `div` keeps `flex-1 overflow-y-auto p-6 space-y-4` for scrollable content
- No changes needed in `Admin.tsx` or `ProjectForm.tsx`

### Why This Fixes Touchpad Scrolling
Radix's `DialogOverlay` applies `pointer-events: none` during certain states and the `overflow-hidden` on it creates a scroll boundary that swallows wheel/touchpad events. By separating the overlay (visual backdrop) from the centering container (a plain `div`), scroll events pass through to the inner `overflow-y-auto` container normally.

