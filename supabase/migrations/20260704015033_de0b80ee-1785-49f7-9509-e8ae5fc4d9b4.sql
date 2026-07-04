
-- 1. Projects: respect the visible flag for public reads; admins see all
DROP POLICY IF EXISTS "Anyone can view projects" ON public.projects;

CREATE POLICY "Public can view visible projects"
ON public.projects
FOR SELECT
TO anon, authenticated
USING (visible = true);

CREATE POLICY "Admins can view all projects"
ON public.projects
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

-- 2. Storage: stop broad listing of project-images bucket contents.
--    Bucket stays public so direct file URLs still work, but list/enumerate is blocked.
DROP POLICY IF EXISTS "Project images are publicly accessible" ON storage.objects;

CREATE POLICY "Admins can list project images"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'project-images'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- 3. SECURITY DEFINER functions: revoke execute from public API roles.
--    update_updated_at_column is only used by triggers and doesn't need to be callable.
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

--    has_role is required by RLS policies for authenticated users, so keep authenticated EXECUTE
--    but drop the anon and public grants that aren't needed.
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
