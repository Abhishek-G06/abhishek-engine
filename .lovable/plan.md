

## Fix: Dialog Touchpad Scrolling Blocked by Lenis Smooth Scroll

### Root Cause

The issue is NOT in the dialog CSS. It's caused by **Lenis smooth scroll** (`src/components/SmoothScrollProvider.tsx`). Lenis intercepts all `wheel` and `touchpad` events globally when `smoothWheel: true` is set, consuming them before they can reach the dialog's `overflow-y-auto` container. This explains why:

- Horizontal scroll works (Lenis only captures vertical wheel events)
- Scrollbar dragging works (drag events bypass Lenis)
- Vertical touchpad/mousewheel does NOT work (Lenis swallows these)

### Solution

Two changes are needed:

**1. Stop Lenis from scrolling when a dialog is open** (`src/components/SmoothScrollProvider.tsx`)

Add a MutationObserver that watches for the `data-scroll-locked` attribute on `<body>` (set by Radix's `react-remove-scroll` when a dialog opens). When detected, call `lenis.stop()` to pause Lenis event interception. When removed, call `lenis.start()` to resume.

```text
useEffect(() => {
  const lenis = new Lenis({ ... });
  lenisRef.current = lenis;

  // Pause Lenis when Radix dialog opens (body gets data-scroll-locked)
  const observer = new MutationObserver(() => {
    if (document.body.hasAttribute('data-scroll-locked')) {
      lenis.stop();
    } else {
      lenis.start();
    }
  });
  observer.observe(document.body, { attributes: true, attributeFilter: ['data-scroll-locked'] });

  // ... rest of existing setup (scroll listener, raf loop) ...

  return () => {
    observer.disconnect();
    cancelAnimationFrame(rafId);
    lenis.destroy();
  };
}, []);
```

**2. Add touch-action safety to dialog** (`src/components/ui/dialog.tsx`)

Add inline `style` with `touchAction: 'auto'` and `overscrollBehaviorY: 'contain'` on `DialogPrimitive.Content` as a defensive measure for mobile/Safari.

### Why This Works

Lenis hooks into the global `wheel` event listener with `{ passive: false }` and calls `preventDefault()` on it, which stops the browser from scrolling any element -- including the dialog. By calling `lenis.stop()` when a dialog is open, Lenis removes its event listeners, allowing native browser scrolling to work inside the dialog's `overflow-y-auto` container.

### Files Changed

- `src/components/SmoothScrollProvider.tsx` -- Add MutationObserver to stop/start Lenis
- `src/components/ui/dialog.tsx` -- Add defensive inline styles for touch-action
