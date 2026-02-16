

## Fix: Touchpad/Scroll Not Working in Dialog

### Root Cause

The current `DialogContent` wraps `DialogPrimitive.Content` inside a plain `<div className="fixed inset-0 z-50 flex items-center justify-center p-4">`. This full-screen div intercepts touchpad and wheel scroll events before they can reach the inner scrollable container. Radix UI's built-in scroll-lock mechanism also conflicts with this non-standard wrapper.

### Solution

Remove the centering wrapper `div` and use the standard Radix/shadcn positioning pattern: apply `fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]` directly on `DialogPrimitive.Content`. Keep the `max-h-[80vh]` constraint and the inner `overflow-y-auto` wrapper so long forms still scroll.

### Changes

**File: `src/components/ui/dialog.tsx`**

Replace the `DialogContent` component render with:

```text
<DialogPortal>
  <DialogOverlay />
  <DialogPrimitive.Content
    ref={ref}
    className={cn(
      "fixed left-[50%] top-[50%] z-50 flex flex-col w-full max-w-lg max-h-[80vh]
       translate-x-[-50%] translate-y-[-50%]
       border bg-background shadow-lg duration-200 sm:rounded-lg overflow-hidden
       data-[state=open]:animate-in data-[state=closed]:animate-out
       data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
       data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
       data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]
       data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
      className,
    )}
    {...props}
  >
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {children}
    </div>
    <DialogPrimitive.Close className="absolute right-4 top-4 ...">
      <X className="h-4 w-4" />
      <span className="sr-only">Close</span>
    </DialogPrimitive.Close>
  </DialogPrimitive.Content>
</DialogPortal>
```

### What Changes

- The centering wrapper `<div>` is removed entirely
- `DialogPrimitive.Content` is now a direct sibling of `DialogOverlay` inside the portal
- Centering is handled by `fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]` on the Content itself
- Slide animations are added back (matching the standard shadcn pattern)
- The inner `overflow-y-auto` scrollable wrapper is preserved
- No changes needed to `Admin.tsx`, `ProjectForm.tsx`, or `GitHubImport.tsx`

### Why This Fixes Scrolling

Radix UI's `DialogPrimitive.Content` integrates with `react-remove-scroll` to lock body scrolling while allowing scrolling inside the dialog. When a plain `div` wraps the Content, it breaks this integration -- the scroll-lock applies to the wrapper, preventing touchpad/wheel events from reaching the inner scrollable area. By placing Content directly as a sibling of the overlay (the standard pattern), Radix's scroll management works correctly and touchpad scrolling flows naturally to the `overflow-y-auto` container.

