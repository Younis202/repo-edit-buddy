
DROP POLICY IF EXISTS "Anyone can insert redemption" ON public.coupon_redemptions;

CREATE POLICY "Insert own redemption" ON public.coupon_redemptions
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    (auth.uid() IS NOT NULL AND user_id = auth.uid())
    OR (auth.uid() IS NULL AND user_id IS NULL)
  );
