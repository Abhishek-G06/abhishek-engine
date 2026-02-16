

## Fix: GitHub Import Dialog Not Scrollable in Safari

### Root Cause
The GitHub Import dialog's repo list in `GitHubImport.tsx` uses `max-h-72 overflow-y-auto` (only 288px tall). Safari hides scrollbar indicators by default and sometimes fails to register trackpad/touch scroll on small nested scrollable containers inside fixed-position dialogs.

### Solution

**File: `src/components/admin/GitHubImport.tsx`**

1. Increase the scrollable area height from `max-h-72` to `max-h-[50vh]` so there's more visible content and a more natural scroll region.
2. Add Safari-specific CSS to force scrollbar visibility: add `[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-muted-foreground/30 [&::-webkit-scrollbar-thumb]:rounded-full` to ensure the scrollbar is always visible in WebKit browsers (Safari/Chrome).
3. Add `-webkit-overflow-scrolling: touch` via the class `webkit-overflow-scrolling-touch` or inline style to enable momentum scrolling on Safari.

**File: `src/pages/Admin.tsx`**

4. Wrap the `GitHubImport` component inside the same `overflow-y-auto max-h-[calc(85vh-8rem)]` div pattern used for the other two dialogs, ensuring the entire dialog content is scrollable if it exceeds viewport height.

### Technical Details

Change in `GitHubImport.tsx` (line 105):
```tsx
// Before
<div className="max-h-72 overflow-y-auto space-y-2 pr-1">

// After
<div className="max-h-[50vh] overflow-y-auto space-y-2 pr-1 overscroll-contain"
     style={{ WebkitOverflowScrolling: 'touch' }}>
```

Change in `Admin.tsx` (GitHub Import Dialog):
```tsx
// Before
<GitHubImport
  onImport={handleGitHubImport}
  isImporting={createProject.isPending}
/>

// After
<div className="overflow-y-auto max-h-[calc(85vh-8rem)] pr-4">
  <GitHubImport
    onImport={handleGitHubImport}
    isImporting={createProject.isPending}
  />
</div>
```

This ensures momentum scrolling works on Safari, the scrollbar is visible, and the dialog content can scroll properly on all devices.

