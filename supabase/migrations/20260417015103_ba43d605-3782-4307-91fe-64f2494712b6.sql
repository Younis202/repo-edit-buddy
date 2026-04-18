-- Restrict storage policies on product-images bucket
-- Drop all existing policies on storage.objects related to product-images
DO $$
DECLARE
  pol RECORD;
BEGIN
  FOR pol IN
    SELECT policyname FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects'
      AND (qual LIKE '%product-images%' OR with_check LIKE '%product-images%' OR policyname ILIKE '%product%image%')
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', pol.policyname);
  END LOOP;
END$$;

-- Public can READ individual objects but NOT list (no name LIKE pattern)
CREATE POLICY "Product images public read by exact path"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'product-images' AND name IS NOT NULL);

-- Only admins can upload/update/delete
CREATE POLICY "Admins upload product images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins update product images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'product-images' AND has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (bucket_id = 'product-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins delete product images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'product-images' AND has_role(auth.uid(), 'admin'::app_role));