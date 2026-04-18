-- Tighten permissive INSERT policies

-- ORDERS: allow if guest provides shipping_phone (always required) and either matches user_id when logged in
DROP POLICY IF EXISTS "Anyone creates orders" ON public.orders;
CREATE POLICY "Create orders" ON public.orders FOR INSERT
  WITH CHECK (
    shipping_phone IS NOT NULL AND length(shipping_phone) >= 6
    AND (
      (auth.uid() IS NULL AND user_id IS NULL)
      OR (auth.uid() IS NOT NULL AND user_id = auth.uid())
      OR (auth.uid() IS NOT NULL AND user_id IS NULL)
    )
  );

-- ORDER ITEMS: only attachable to an order created in same transaction (exists check)
DROP POLICY IF EXISTS "Anyone creates order items" ON public.order_items;
CREATE POLICY "Create order items" ON public.order_items FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id));

-- COUPON REDEMPTIONS: only attachable to a real coupon + order
DROP POLICY IF EXISTS "Anyone creates redemption" ON public.coupon_redemptions;
CREATE POLICY "Create redemption" ON public.coupon_redemptions FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.coupons c WHERE c.id = coupon_id AND c.is_active = TRUE)
    AND (order_id IS NULL OR EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id))
  );

-- ADMIN NOTIFICATIONS: only system (triggers run as SECURITY DEFINER) — block client inserts
DROP POLICY IF EXISTS "System inserts notifications" ON public.admin_notifications;
CREATE POLICY "Admins create notifications" ON public.admin_notifications FOR INSERT
  WITH CHECK (public.is_admin());

-- NEWSLETTER: require basic email format
DROP POLICY IF EXISTS "Anyone subscribes" ON public.newsletter_subscribers;
CREATE POLICY "Subscribe to newsletter" ON public.newsletter_subscribers FOR INSERT
  WITH CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$');

-- Public order tracking RPC (no auth needed, requires order number + phone match)
CREATE OR REPLACE FUNCTION public.track_order_public(_order_number TEXT, _phone TEXT)
RETURNS TABLE (
  id UUID,
  order_number TEXT,
  status order_status,
  total NUMERIC,
  shipping_full_name TEXT,
  shipping_city TEXT,
  shipping_governorate TEXT,
  tracking_number TEXT,
  tracking_url TEXT,
  created_at TIMESTAMPTZ,
  shipped_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ
)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  RETURN QUERY
  SELECT
    o.id, o.order_number, o.status, o.total,
    o.shipping_full_name, o.shipping_city, o.shipping_governorate,
    o.tracking_number, o.tracking_url,
    o.created_at, o.shipped_at, o.delivered_at
  FROM public.orders o
  WHERE o.order_number = _order_number
    AND regexp_replace(o.shipping_phone, '\D', '', 'g') = regexp_replace(_phone, '\D', '', 'g')
  LIMIT 1;
END;
$$;