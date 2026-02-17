

# Auto-Capture Project Screenshots

## Overview
Replace the client-side thum.io fallback with a backend function that captures screenshots of project URLs and permanently stores them in file storage. Screenshots will be auto-captured when saving a project and can also be manually re-captured via an admin button.

## How It Works
When you add or update a project with a live URL, a backend function fetches a screenshot using a free screenshot service, stores the image permanently in your file storage, and saves the URL to the project's `image_url` field. This means previews load instantly every time -- no more waiting for on-demand generation.

---

## Technical Details

### 1. New Backend Function: `capture-screenshot`

Create `supabase/functions/capture-screenshot/index.ts`:
- Accepts `{ projectId, url }` in the request body
- Requires admin authentication (uses `getClaims()`)
- Fetches a screenshot from `https://image.thum.io/get/width/1280/noanimate/{url}` server-side
- Uploads the resulting image to the `project-images` storage bucket
- Updates the project's `image_url` column in the database
- Returns the new public URL

### 2. Update `supabase/config.toml`
- Add `[functions.capture-screenshot]` with `verify_jwt = false`

### 3. New Hook: `src/hooks/use-capture-screenshot.ts`
- A simple mutation hook that calls the edge function via `supabase.functions.invoke('capture-screenshot', ...)`
- Returns loading state and trigger function

### 4. Update Admin: Auto-capture on project create/update
- In the admin panel's project save handler, after a successful create/update, if `image_url` is empty and `live_url` is present, automatically call the capture function

### 5. Update Admin: Manual "Re-capture" button
- Add a camera/refresh icon button on each `SortableProjectCard` that triggers the screenshot capture for that project
- Shows a loading spinner while capturing

### 6. Update `ProjectsSection.tsx`
- Remove the thum.io fallback entirely -- if `image_url` is empty, just show the folder icon
- Since screenshots are now stored, `image_url` will always be populated for projects with live URLs

### File Changes Summary
| File | Change |
|------|--------|
| `supabase/functions/capture-screenshot/index.ts` | New -- backend screenshot capture |
| `supabase/config.toml` | Add function config (verify_jwt = false) |
| `src/hooks/use-capture-screenshot.ts` | New -- mutation hook for triggering capture |
| `src/components/admin/SortableProjectCard.tsx` | Add "Re-capture screenshot" button |
| `src/pages/Admin.tsx` | Auto-trigger capture after project save |
| `src/components/ProjectsSection.tsx` | Remove thum.io fallback |

