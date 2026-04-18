-- Tighten newsletter_subscribers INSERT (validate email format)
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.newsletter_subscribers;
CREATE POLICY "Anyone can subscribe with valid email"
ON public.newsletter_subscribers
FOR INSERT
TO public
WITH CHECK (
  email IS NOT NULL
  AND length(email) BETWEEN 5 AND 254
  AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
);

-- Add unique constraint to prevent duplicate emails
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'newsletter_subscribers_email_key'
  ) THEN
    ALTER TABLE public.newsletter_subscribers
      ADD CONSTRAINT newsletter_subscribers_email_key UNIQUE (email);
  END IF;
END$$;

-- Tighten coupon_redemptions INSERT (must reference a real order owned by caller)
DROP POLICY IF EXISTS "Anyone can insert redemption" ON public.coupon_redemptions;
CREATE POLICY "Insert redemption tied to own order"
ON public.coupon_redemptions
FOR INSERT
TO public
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.orders o
    WHERE o.id = coupon_redemptions.order_id
      AND (
        (auth.uid() IS NULL AND o.user_id IS NULL)
        OR o.user_id = auth.uid()
        OR has_role(auth.uid(), 'admin'::app_role)
      )
  )
);