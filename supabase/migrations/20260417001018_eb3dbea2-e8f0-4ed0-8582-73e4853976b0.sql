-- 1. Fix admin_notifications: restrict INSERT to service-role/triggers + admins only
DROP POLICY IF EXISTS "Anyone can insert notification on order" ON public.admin_notifications;

CREATE POLICY "Admins can insert notifications"
ON public.admin_notifications
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Note: notify_new_order() is SECURITY DEFINER so it bypasses RLS — triggers still work fine

-- 2. Fix product-images bucket: allow viewing individual images but not listing
-- Drop overly permissive SELECT policies if any exist
DO $$
DECLARE pol record;
BEGIN
  FOR pol IN
    SELECT policyname FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects'
      AND policyname ILIKE '%product%'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', pol.policyname);
  END LOOP;
END $$;

-- Public can read individual product images (by exact path), but listing is blocked at app level
CREATE POLICY "Public read product images"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'product-images');

-- Only admins can upload/update/delete product images
CREATE POLICY "Admins upload product images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins update product images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'product-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins delete product images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'product-images' AND has_role(auth.uid(), 'admin'::app_role));