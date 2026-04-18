-- ========== ORDERS: extra columns ==========
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS guest_email TEXT,
  ADD COLUMN IF NOT EXISTS guest_phone TEXT,
  ADD COLUMN IF NOT EXISTS shipping_full_name TEXT,
  ADD COLUMN IF NOT EXISTS shipping_street TEXT,
  ADD COLUMN IF NOT EXISTS shipping_country TEXT DEFAULT 'مصر',
  ADD COLUMN IF NOT EXISTS shipping_postal_code TEXT,
  ADD COLUMN IF NOT EXISTS shipping_phone TEXT,
  ADD COLUMN IF NOT EXISTS gift_wrap BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS gift_message TEXT,
  ADD COLUMN IF NOT EXISTS notes TEXT,
  ADD COLUMN IF NOT EXISTS tracking_number TEXT,
  ADD COLUMN IF NOT EXISTS tracking_url TEXT,
  ADD COLUMN IF NOT EXISTS shipped_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS delivered_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS cancelled_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS cancellation_reason TEXT,
  ADD COLUMN IF NOT EXISTS coupon_discount NUMERIC(10,2) NOT NULL DEFAULT 0;

-- Make legacy required cols optional so checkout payload works as-is
ALTER TABLE public.orders ALTER COLUMN customer_name DROP NOT NULL;
ALTER TABLE public.orders ALTER COLUMN customer_phone DROP NOT NULL;
ALTER TABLE public.orders ALTER COLUMN shipping_address DROP NOT NULL;
ALTER TABLE public.orders ALTER COLUMN shipping_city DROP NOT NULL;

-- ========== ORDER ITEMS extras ==========
ALTER TABLE public.order_items
  ADD COLUMN IF NOT EXISTS unit_price_display TEXT,
  ADD COLUMN IF NOT EXISTS line_total NUMERIC(10,2);

-- ========== PRODUCTS extras ==========
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS in_stock BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS stock_count INT NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS low_stock_threshold INT NOT NULL DEFAULT 5,
  ADD COLUMN IF NOT EXISTS display_order INT NOT NULL DEFAULT 0;

-- ========== COUPON REDEMPTIONS ==========
CREATE TABLE IF NOT EXISTS public.coupon_redemptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coupon_id UUID NOT NULL REFERENCES public.coupons(id) ON DELETE CASCADE,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  user_id UUID,
  discount_applied NUMERIC(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.coupon_redemptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Redemptions insert any" ON public.coupon_redemptions FOR INSERT
  WITH CHECK (user_id IS NULL OR auth.uid() = user_id);
CREATE POLICY "Redemptions select own or admin" ON public.coupon_redemptions FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR has_role(auth.uid(),'admin'));
CREATE POLICY "Redemptions admin manage" ON public.coupon_redemptions FOR ALL TO authenticated
  USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));

-- ========== TIGHTEN PERMISSIVE POLICIES ==========
-- Orders: only allow insert if guest (no user_id) OR matches auth user
DROP POLICY IF EXISTS "Orders insert any" ON public.orders;
CREATE POLICY "Orders insert guest or self" ON public.orders FOR INSERT
  WITH CHECK (user_id IS NULL OR user_id = auth.uid());

-- Order items: only insert if parent order is insertable (guest or owner)
DROP POLICY IF EXISTS "Order items insert any" ON public.order_items;
CREATE POLICY "Order items insert with order" ON public.order_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders o
      WHERE o.id = order_id
        AND (o.user_id IS NULL OR o.user_id = auth.uid())
    )
  );

-- Settings: only admins can read (was public)
DROP POLICY IF EXISTS "Settings public read" ON public.site_settings;
CREATE POLICY "Settings admin read" ON public.site_settings FOR SELECT TO authenticated
  USING (has_role(auth.uid(),'admin'));
-- But some are needed publicly (e.g. shipping cost). Re-allow read for keys starting with 'public_'
CREATE POLICY "Settings public_ read" ON public.site_settings FOR SELECT
  USING (key LIKE 'public_%');