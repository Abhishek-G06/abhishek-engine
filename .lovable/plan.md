

## Fix: Lenis Blocks Scrolling Even When Stopped

### Root Cause (Confirmed from Lenis Source Code)

The MutationObserver approach (calling `lenis.stop()`) does NOT fix the problem because of a bug in Lenis's design:

When `lenis.stop()` is called, it sets an internal `_isStopped` flag. However, the wheel event listeners remain active with `{ passive: false }`. When a wheel event fires, Lenis's `onVirtualScroll` handler checks `this.isStopped` and **still calls `event.preventDefault()`** on the wheel event (line 632-636 in lenis.mjs). This means even when "stopped", Lenis actively blocks native scrolling.

This is why the MutationObserver fix we already added has no effect.

### Solution

Use Lenis's built-in `data-lenis-prevent` attribute. When Lenis encounters this attribute on any element in the event's composed path, it returns early from `onVirtualScroll` WITHOUT calling `preventDefault()` (line 628-631). This allows native scrolling to work.

Two changes:

**1. Add `data-lenis-prevent` to DialogContent** (`src/components/ui/dialog.tsx`)

Add the `data-lenis-prevent` attribute directly on `DialogPrimitive.Content`. When Lenis sees this attribute on any ancestor of the wheel event target, it skips its scroll handling entirely, allowing native `overflow-y-auto` scrolling to work.

**2. Keep the MutationObserver as a secondary safeguard** (`src/components/SmoothScrollProvider.tsx`)

The existing MutationObserver code can stay -- it prevents Lenis from scrolling the background page while a dialog is open. But the primary fix is `data-lenis-prevent`.

### Files Changed

**`src/components/ui/dialog.tsx`** -- Add `data-lenis-prevent` attribute to `DialogPrimitive.Content`:

```text
<DialogPrimitive.Content
  ref={ref}
  data-lenis-prevent          // <-- ADD THIS
  className={cn(
    "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 ...",
    "max-h-[85vh] overflow-y-auto",
    className
  )}
  style={{
    touchAction: 'auto',
    overscrollBehaviorY: 'contain',
    WebkitOverflowScrolling: 'touch',
  }}
  {...props}
>
```

**`src/components/SmoothScrollProvider.tsx`** -- No changes needed. The existing MutationObserver code stays as-is for background scroll prevention.

### Why This Works

Lenis checks `event.composedPath()` for any element with the `data-lenis-prevent` attribute. When found, it immediately returns from `onVirtualScroll` without calling `event.preventDefault()`. This means:

- The browser's native wheel/touchpad event handling takes over
- The dialog's `overflow-y-auto` works as expected
- Vertical AND horizontal scrolling both work
- No Lenis code runs at all for events inside the dialog

### Why Previous Fixes Failed

- `lenis.stop()` -- Lenis still calls `preventDefault()` even when stopped
- CSS changes (`touch-action`, `overflow-y-auto`) -- The issue was never CSS; it was JavaScript event interception
- Wrapper div changes -- Same reason; Lenis intercepts at the event level before CSS can help

