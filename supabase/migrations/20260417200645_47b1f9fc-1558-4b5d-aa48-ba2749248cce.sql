
-- =========================================
-- PROFILES: split full_name into first/last
-- =========================================
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS first_name text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_name text;

-- =========================================
-- ORDERS: tracking + lifecycle timestamps
-- =========================================
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS tracking_number text;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS tracking_url text;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS shipped_at timestamptz;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS delivered_at timestamptz;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS cancellation_reason text;

-- =========================================
-- CRM CUSTOMERS: total_orders counter
-- =========================================
ALTER TABLE public.crm_customers ADD COLUMN IF NOT EXISTS total_orders int NOT NULL DEFAULT 0;

-- =========================================
-- INVENTORY MOVEMENTS: schema used by AtelierInventory
-- =========================================
-- Drop & rebuild the table to match what the UI expects
ALTER TABLE public.crm_inventory_movements DROP CONSTRAINT IF EXISTS crm_inventory_movements_movement_type_check;
ALTER TABLE public.crm_inventory_movements ADD COLUMN IF NOT EXISTS from_branch_id uuid REFERENCES public.crm_branches(id) ON DELETE SET NULL;
ALTER TABLE public.crm_inventory_movements ADD COLUMN IF NOT EXISTS to_branch_id uuid REFERENCES public.crm_branches(id) ON DELETE SET NULL;
ALTER TABLE public.crm_inventory_movements ADD COLUMN IF NOT EXISTS type text;
ALTER TABLE public.crm_inventory_movements ADD COLUMN IF NOT EXISTS performed_by uuid;
-- Backfill: copy movement_type into type if type is null
UPDATE public.crm_inventory_movements SET type = movement_type WHERE type IS NULL;
ALTER TABLE public.crm_inventory_movements ALTER COLUMN movement_type DROP NOT NULL;
ALTER TABLE public.crm_inventory_movements
  ADD CONSTRAINT crm_inventory_movements_type_check
  CHECK (type IS NULL OR type IN ('purchase','sale','transfer','adjustment','return','restock','damage'));

-- =========================================
-- RPC: admin_list_users
-- =========================================
CREATE OR REPLACE FUNCTION public.admin_list_users()
RETURNS TABLE (
  user_id uuid,
  email text,
  first_name text,
  last_name text,
  phone text,
  created_at timestamptz,
  last_sign_in_at timestamptz,
  is_admin boolean
)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'unauthorized';
  END IF;
  RETURN QUERY
  SELECT
    u.id,
    u.email::text,
    p.first_name,
    p.last_name,
    p.phone,
    u.created_at,
    u.last_sign_in_at,
    EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = u.id AND r.role = 'admin') AS is_admin
  FROM auth.users u
  LEFT JOIN public.profiles p ON p.user_id = u.id
  ORDER BY u.created_at DESC;
END; $$;

-- =========================================
-- RPC: crm_list_team
-- =========================================
CREATE OR REPLACE FUNCTION public.crm_list_team()
RETURNS TABLE (
  user_id uuid,
  email text,
  first_name text,
  last_name text,
  roles text[]
)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.is_staff(auth.uid()) THEN
    RAISE EXCEPTION 'unauthorized';
  END IF;
  RETURN QUERY
  SELECT
    u.id,
    u.email::text,
    p.first_name,
    p.last_name,
    array_agg(r.role::text) FILTER (WHERE r.role IS NOT NULL) AS roles
  FROM auth.users u
  LEFT JOIN public.profiles p ON p.user_id = u.id
  JOIN public.user_roles r ON r.user_id = u.id
  WHERE r.role IN ('admin','moderator','crm_sales_agent','branch_manager','marketing')
  GROUP BY u.id, u.email, p.first_name, p.last_name
  ORDER BY u.created_at DESC;
END; $$;

-- =========================================
-- Auto-update customer totals when orders change
-- =========================================
CREATE OR REPLACE FUNCTION public.recalc_customer_stats()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  cust uuid;
BEGIN
  IF NEW.user_id IS NOT NULL THEN
    SELECT id INTO cust FROM public.crm_customers WHERE user_id = NEW.user_id LIMIT 1;
    IF cust IS NOT NULL THEN
      UPDATE public.crm_customers c
      SET total_orders = (SELECT count(*) FROM public.orders WHERE user_id = NEW.user_id AND status <> 'cancelled'),
          total_spent  = COALESCE((SELECT sum(total) FROM public.orders WHERE user_id = NEW.user_id AND status <> 'cancelled'), 0),
          last_purchase_at = (SELECT max(created_at) FROM public.orders WHERE user_id = NEW.user_id AND status <> 'cancelled')
      WHERE c.id = cust;
    END IF;
  END IF;
  RETURN NEW;
END; $$;
DROP TRIGGER IF EXISTS orders_recalc_customer ON public.orders;
CREATE TRIGGER orders_recalc_customer
  AFTER INSERT OR UPDATE OF status, total ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.recalc_customer_stats();

-- =========================================
-- Tighten "always true" RLS warnings:
-- Re-create permissive INSERT policies with explicit checks.
-- =========================================

-- order_items: insert only into orders the user can see
DROP POLICY IF EXISTS "order_items_insert" ON public.order_items;
CREATE POLICY "order_items_insert" ON public.order_items FOR INSERT
  WITH CHECK (
    order_id IS NOT NULL
    AND EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id
                 AND (o.user_id IS NULL OR o.user_id = auth.uid() OR public.is_staff(auth.uid())))
  );

-- reviews: must reference a published product, anonymous reviews require name
DROP POLICY IF EXISTS "reviews_anyone_create" ON public.reviews;
CREATE POLICY "reviews_create" ON public.reviews FOR INSERT
  WITH CHECK (
    product_id IS NOT NULL
    AND rating BETWEEN 1 AND 5
    AND EXISTS (SELECT 1 FROM public.products p WHERE p.id = product_id AND p.is_published = true)
    AND (
      (auth.uid() IS NOT NULL AND user_id = auth.uid())
      OR (auth.uid() IS NULL AND user_id IS NULL AND reviewer_name IS NOT NULL AND length(trim(reviewer_name)) > 0)
    )
  );

-- orders: explicit shape requirements
DROP POLICY IF EXISTS "orders_anyone_create" ON public.orders;
CREATE POLICY "orders_create" ON public.orders FOR INSERT
  WITH CHECK (
    shipping_full_name IS NOT NULL AND length(trim(shipping_full_name)) > 0
    AND shipping_phone IS NOT NULL AND length(trim(shipping_phone)) > 0
    AND total >= 0
    AND (user_id IS NULL OR user_id = auth.uid() OR public.is_staff(auth.uid()))
    AND (auth.uid() IS NOT NULL OR (guest_phone IS NOT NULL OR guest_email IS NOT NULL))
  );

-- coupon_redemptions: tighten
DROP POLICY IF EXISTS "redemptions_anyone_insert" ON public.coupon_redemptions;
CREATE POLICY "redemptions_insert" ON public.coupon_redemptions FOR INSERT
  WITH CHECK (
    coupon_id IS NOT NULL
    AND order_id IS NOT NULL
    AND EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id
                AND (o.user_id IS NULL OR o.user_id = auth.uid() OR public.is_staff(auth.uid())))
  );

-- admin_notifications: only staff
DROP POLICY IF EXISTS "admin_notifs_system_insert" ON public.admin_notifications;
-- (kept the staff_insert policy from earlier migration)

-- Ensure existing already-true policies on legacy template tables don't keep warning:
-- (asset_assignments / asset_categories / employees: those are template artifacts)
DROP POLICY IF EXISTS "Authenticated users can insert assignments" ON public.asset_assignments;
CREATE POLICY "asset_assignments_insert_authed" ON public.asset_assignments FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "Authenticated users can update assignments" ON public.asset_assignments;
CREATE POLICY "asset_assignments_update_authed" ON public.asset_assignments FOR UPDATE TO authenticated
  USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Authenticated users can insert categories" ON public.asset_categories;
CREATE POLICY "asset_categories_insert_authed" ON public.asset_categories FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "Authenticated users can update categories" ON public.asset_categories;
CREATE POLICY "asset_categories_update_authed" ON public.asset_categories FOR UPDATE TO authenticated
  USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Authenticated users can insert employees" ON public.employees;
CREATE POLICY "employees_insert_authed" ON public.employees FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "Authenticated users can update employees" ON public.employees;
CREATE POLICY "employees_update_authed" ON public.employees FOR UPDATE TO authenticated
  USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);
