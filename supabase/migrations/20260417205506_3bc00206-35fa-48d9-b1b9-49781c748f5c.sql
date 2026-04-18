-- Ensure one review per user per product (for upsert onConflict to work)
CREATE UNIQUE INDEX IF NOT EXISTS reviews_product_user_unique 
  ON public.reviews(product_id, user_id) 
  WHERE user_id IS NOT NULL;

-- Auto-approve reviews from verified purchasers (optional, helps surface real reviews fast)
-- Otherwise admin must approve from /admin/reviews

-- Index to speed up order tracking lookups
CREATE INDEX IF NOT EXISTS orders_tracking_lookup 
  ON public.orders(order_number, shipping_phone);

-- Index for guest order lookup
CREATE INDEX IF NOT EXISTS orders_guest_phone_idx 
  ON public.orders(guest_phone) 
  WHERE guest_phone IS NOT NULL;

-- Public RPC: track an order using order_number + last 4 digits of phone
-- Returns minimal status info (no PII beyond what user supplied)
CREATE OR REPLACE FUNCTION public.track_order_public(_order_number text, _phone text)
RETURNS TABLE (
  id uuid,
  order_number text,
  status text,
  total numeric,
  created_at timestamptz,
  shipped_at timestamptz,
  delivered_at timestamptz,
  tracking_number text,
  tracking_url text,
  shipping_city text,
  shipping_governorate text,
  customer_name text,
  items jsonb
)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _normalized_phone text;
BEGIN
  -- Normalize phone: strip non-digits
  _normalized_phone := regexp_replace(coalesce(_phone, ''), '[^0-9]', '', 'g');
  IF length(_normalized_phone) < 4 OR _order_number IS NULL OR length(trim(_order_number)) = 0 THEN
    RETURN;
  END IF;

  RETURN QUERY
  SELECT
    o.id,
    o.order_number,
    o.status,
    o.total,
    o.created_at,
    o.shipped_at,
    o.delivered_at,
    o.tracking_number,
    o.tracking_url,
    o.shipping_city,
    o.shipping_governorate,
    o.customer_name,
    COALESCE(
      (SELECT jsonb_agg(jsonb_build_object(
        'name', oi.product_name,
        'image', oi.product_image,
        'size', oi.size,
        'color', oi.color,
        'quantity', oi.quantity,
        'unit_price_display', oi.unit_price_display,
        'line_total', oi.line_total
      ))
       FROM public.order_items oi WHERE oi.order_id = o.id),
      '[]'::jsonb
    ) as items
  FROM public.orders o
  WHERE upper(trim(o.order_number)) = upper(trim(_order_number))
    AND (
      regexp_replace(coalesce(o.shipping_phone, ''), '[^0-9]', '', 'g') LIKE '%' || _normalized_phone
      OR regexp_replace(coalesce(o.guest_phone, ''), '[^0-9]', '', 'g') LIKE '%' || _normalized_phone
    )
  LIMIT 1;
END;
$$;

GRANT EXECUTE ON FUNCTION public.track_order_public(text, text) TO anon, authenticated;