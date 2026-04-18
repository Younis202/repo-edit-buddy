
-- updated_at trigger
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- is_staff helper (now safe — enum values committed)
CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('admin','moderator','crm_sales_agent','branch_manager','marketing')
  )
$$;

-- =========================================
-- PROFILES
-- =========================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE NOT NULL,
  full_name text,
  phone text,
  avatar_url text,
  date_of_birth date,
  marketing_consent boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_self_read" ON public.profiles FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "profiles_self_insert" ON public.profiles FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());
CREATE POLICY "profiles_self_update" ON public.profiles FOR UPDATE TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE TRIGGER profiles_touch BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE OR REPLACE FUNCTION public.handle_new_user_profile()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name')
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END; $$;
DROP TRIGGER IF EXISTS on_auth_user_created_profile ON auth.users;
CREATE TRIGGER on_auth_user_created_profile
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_profile();

DROP TRIGGER IF EXISTS on_auth_user_created_role ON auth.users;
CREATE TRIGGER on_auth_user_created_role
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_role();

-- =========================================
-- SITE SETTINGS
-- =========================================
CREATE TABLE IF NOT EXISTS public.site_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "settings_public_read" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "settings_admin_write" ON public.site_settings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- =========================================
-- PRODUCTS
-- =========================================
CREATE TABLE IF NOT EXISTS public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  name_italic text,
  slug text UNIQUE NOT NULL,
  category text NOT NULL DEFAULT 'عود',
  tag text,
  short_description text,
  material text,
  season text,
  price numeric(10,2) NOT NULL DEFAULT 0,
  price_display text NOT NULL DEFAULT '0 ج.م',
  original_price numeric(10,2),
  original_price_display text,
  in_stock boolean NOT NULL DEFAULT true,
  is_published boolean NOT NULL DEFAULT true,
  display_order int NOT NULL DEFAULT 0,
  stock_count int NOT NULL DEFAULT 100,
  low_stock_threshold int NOT NULL DEFAULT 5,
  sizes jsonb NOT NULL DEFAULT '[]'::jsonb,
  colors jsonb NOT NULL DEFAULT '[]'::jsonb,
  images jsonb NOT NULL DEFAULT '[]'::jsonb,
  accordion jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_published ON public.products(is_published, display_order);
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "products_public_read" ON public.products FOR SELECT
  USING (is_published = true OR public.is_staff(auth.uid()));
CREATE POLICY "products_admin_write" ON public.products FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER products_touch BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- =========================================
-- COUPONS
-- =========================================
CREATE TABLE IF NOT EXISTS public.coupons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  description text,
  discount_type text NOT NULL CHECK (discount_type IN ('percent','fixed')),
  discount_value numeric(10,2) NOT NULL DEFAULT 0,
  min_order_amount numeric(10,2) NOT NULL DEFAULT 0,
  max_uses int,
  uses_count int NOT NULL DEFAULT 0,
  expires_at timestamptz,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "coupons_public_check" ON public.coupons FOR SELECT
  USING (is_active = true OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "coupons_admin_write" ON public.coupons FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- =========================================
-- ORDERS
-- =========================================
CREATE TABLE IF NOT EXISTS public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL DEFAULT '',
  user_id uuid,
  guest_email text,
  guest_phone text,
  shipping_full_name text NOT NULL,
  shipping_phone text NOT NULL,
  shipping_street text NOT NULL,
  shipping_city text NOT NULL,
  shipping_governorate text NOT NULL,
  shipping_country text NOT NULL DEFAULT 'مصر',
  shipping_postal_code text,
  subtotal numeric(10,2) NOT NULL DEFAULT 0,
  shipping_cost numeric(10,2) NOT NULL DEFAULT 0,
  discount numeric(10,2) NOT NULL DEFAULT 0,
  coupon_code text,
  coupon_discount numeric(10,2) NOT NULL DEFAULT 0,
  total numeric(10,2) NOT NULL DEFAULT 0,
  gift_wrap boolean NOT NULL DEFAULT false,
  gift_message text,
  notes text,
  payment_method text NOT NULL DEFAULT 'cash_on_delivery',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','processing','shipped','delivered','cancelled','refunded')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_orders_user ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON public.orders(created_at DESC);

CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
    NEW.order_number = 'SHZ-' || to_char(now(),'YYMMDD') || '-' || lpad(floor(random()*10000)::text,4,'0');
  END IF;
  RETURN NEW;
END; $$;
CREATE TRIGGER orders_set_number BEFORE INSERT ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.generate_order_number();
CREATE TRIGGER orders_touch BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "orders_owner_read" ON public.orders FOR SELECT
  USING (user_id = auth.uid() OR public.is_staff(auth.uid()));
CREATE POLICY "orders_anyone_create" ON public.orders FOR INSERT
  WITH CHECK (user_id IS NULL OR user_id = auth.uid() OR public.is_staff(auth.uid()));
CREATE POLICY "orders_staff_update" ON public.orders FOR UPDATE TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "orders_admin_delete" ON public.orders FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(),'admin'));

-- =========================================
-- ORDER ITEMS
-- =========================================
CREATE TABLE IF NOT EXISTS public.order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES public.products(id) ON DELETE SET NULL,
  product_slug text,
  product_name text NOT NULL,
  product_image text,
  size text,
  color text,
  unit_price numeric(10,2) NOT NULL DEFAULT 0,
  unit_price_display text,
  quantity int NOT NULL DEFAULT 1,
  line_total numeric(10,2) NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON public.order_items(order_id);
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "order_items_read" ON public.order_items FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id
                 AND (o.user_id = auth.uid() OR public.is_staff(auth.uid()))));
CREATE POLICY "order_items_insert" ON public.order_items FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id
                 AND (o.user_id IS NULL OR o.user_id = auth.uid() OR public.is_staff(auth.uid()))));

-- =========================================
-- COUPON REDEMPTIONS
-- =========================================
CREATE TABLE IF NOT EXISTS public.coupon_redemptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  coupon_id uuid NOT NULL REFERENCES public.coupons(id) ON DELETE CASCADE,
  order_id uuid REFERENCES public.orders(id) ON DELETE SET NULL,
  user_id uuid,
  discount_applied numeric(10,2) NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.coupon_redemptions ENABLE ROW LEVEL SECURITY;
-- Tightened: must reference an existing order
CREATE POLICY "redemptions_anyone_insert" ON public.coupon_redemptions FOR INSERT
  WITH CHECK (
    order_id IS NULL OR EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id
      AND (o.user_id IS NULL OR o.user_id = auth.uid() OR public.is_staff(auth.uid())))
  );
CREATE POLICY "redemptions_admin_read" ON public.coupon_redemptions FOR SELECT TO authenticated
  USING (public.is_staff(auth.uid()) OR user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.increment_coupon_uses()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  UPDATE public.coupons SET uses_count = uses_count + 1 WHERE id = NEW.coupon_id;
  RETURN NEW;
END; $$;
CREATE TRIGGER redemptions_increment AFTER INSERT ON public.coupon_redemptions
  FOR EACH ROW EXECUTE FUNCTION public.increment_coupon_uses();

-- =========================================
-- REVIEWS
-- =========================================
CREATE TABLE IF NOT EXISTS public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  user_id uuid,
  reviewer_name text,
  rating int NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title text,
  comment text,
  is_verified_purchase boolean NOT NULL DEFAULT false,
  is_approved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_reviews_product ON public.reviews(product_id, is_approved);
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reviews_public_read" ON public.reviews FOR SELECT
  USING (is_approved = true OR user_id = auth.uid() OR public.is_staff(auth.uid()));
CREATE POLICY "reviews_anyone_create" ON public.reviews FOR INSERT
  WITH CHECK (user_id IS NULL OR user_id = auth.uid());
CREATE POLICY "reviews_admin_moderate" ON public.reviews FOR UPDATE TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "reviews_admin_delete" ON public.reviews FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(),'admin'));

-- =========================================
-- WISHLIST
-- =========================================
CREATE TABLE IF NOT EXISTS public.wishlist_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, product_id)
);
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "wishlist_self" ON public.wishlist_items FOR ALL TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- =========================================
-- ADMIN NOTIFICATIONS
-- =========================================
CREATE TABLE IF NOT EXISTS public.admin_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL DEFAULT 'info',
  title text NOT NULL,
  message text,
  link text,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_admin_notifs_unread ON public.admin_notifications(is_read, created_at DESC);
ALTER TABLE public.admin_notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin_notifs_staff_read" ON public.admin_notifications FOR SELECT TO authenticated
  USING (public.is_staff(auth.uid()));
CREATE POLICY "admin_notifs_staff_update" ON public.admin_notifications FOR UPDATE TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
-- Tightened: only staff can manually insert (triggers use SECURITY DEFINER, bypass RLS)
CREATE POLICY "admin_notifs_staff_insert" ON public.admin_notifications FOR INSERT TO authenticated
  WITH CHECK (public.is_staff(auth.uid()));

CREATE OR REPLACE FUNCTION public.notify_new_order()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.admin_notifications (type, title, message, link)
  VALUES ('order', 'طلب جديد ' || NEW.order_number,
          NEW.shipping_full_name || ' — ' || NEW.total::text || ' ج.م',
          '/admin/orders/' || NEW.id);
  RETURN NEW;
END; $$;
CREATE TRIGGER orders_notify AFTER INSERT ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.notify_new_order();

ALTER PUBLICATION supabase_realtime ADD TABLE public.admin_notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;

-- =========================================
-- CRM: BRANCHES
-- =========================================
CREATE TABLE IF NOT EXISTS public.crm_branches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE,
  address text,
  city text,
  governorate text,
  phone text,
  whatsapp text,
  manager_name text,
  opening_hours text,
  google_maps_url text,
  is_active boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.crm_branches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "branches_public_read" ON public.crm_branches FOR SELECT
  USING (is_active = true OR public.is_staff(auth.uid()));
CREATE POLICY "branches_staff_write" ON public.crm_branches FOR ALL TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

-- =========================================
-- CRM: CUSTOMERS
-- =========================================
CREATE TABLE IF NOT EXISTS public.crm_customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  full_name text NOT NULL,
  phone text,
  whatsapp text,
  email text,
  date_of_birth date,
  gender text,
  city text,
  governorate text,
  address text,
  source text NOT NULL DEFAULT 'website',
  status text NOT NULL DEFAULT 'lead',
  tier text NOT NULL DEFAULT 'bronze',
  preferred_concentration text,
  preferred_season text,
  scent_families jsonb NOT NULL DEFAULT '[]'::jsonb,
  scent_profile_notes text,
  internal_notes text,
  marketing_consent boolean NOT NULL DEFAULT true,
  total_spent numeric(12,2) NOT NULL DEFAULT 0,
  loyalty_points int NOT NULL DEFAULT 0,
  branch_id uuid REFERENCES public.crm_branches(id) ON DELETE SET NULL,
  assigned_to uuid,
  created_by uuid,
  last_purchase_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_crm_customers_status ON public.crm_customers(status);
CREATE INDEX IF NOT EXISTS idx_crm_customers_phone ON public.crm_customers(phone);
ALTER TABLE public.crm_customers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "crm_customers_staff_all" ON public.crm_customers FOR ALL TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER crm_customers_touch BEFORE UPDATE ON public.crm_customers
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- =========================================
-- CRM: LEADS
-- =========================================
CREATE TABLE IF NOT EXISTS public.crm_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text,
  whatsapp text,
  email text,
  city text,
  source text NOT NULL DEFAULT 'website',
  interest text,
  estimated_value numeric(10,2) NOT NULL DEFAULT 0,
  stage text NOT NULL DEFAULT 'new',
  win_probability int NOT NULL DEFAULT 20,
  expected_close_date date,
  notes text,
  customer_id uuid REFERENCES public.crm_customers(id) ON DELETE SET NULL,
  assigned_to uuid,
  created_by uuid,
  last_activity_at timestamptz DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_crm_leads_stage ON public.crm_leads(stage);
ALTER TABLE public.crm_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "crm_leads_staff_all" ON public.crm_leads FOR ALL TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER crm_leads_touch BEFORE UPDATE ON public.crm_leads
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- =========================================
-- CRM: TASKS
-- =========================================
CREATE TABLE IF NOT EXISTS public.crm_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  customer_id uuid REFERENCES public.crm_customers(id) ON DELETE CASCADE,
  lead_id uuid REFERENCES public.crm_leads(id) ON DELETE CASCADE,
  due_at timestamptz,
  priority text NOT NULL DEFAULT 'medium',
  status text NOT NULL DEFAULT 'pending',
  assigned_to uuid,
  created_by uuid,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_crm_tasks_due ON public.crm_tasks(due_at, status);
ALTER TABLE public.crm_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "crm_tasks_staff_all" ON public.crm_tasks FOR ALL TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

-- =========================================
-- CRM: INTERACTIONS
-- =========================================
CREATE TABLE IF NOT EXISTS public.crm_interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES public.crm_customers(id) ON DELETE CASCADE,
  lead_id uuid REFERENCES public.crm_leads(id) ON DELETE CASCADE,
  channel text NOT NULL DEFAULT 'whatsapp',
  direction text NOT NULL DEFAULT 'inbound',
  subject text,
  body text,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_crm_inter_occurred ON public.crm_interactions(occurred_at DESC);
ALTER TABLE public.crm_interactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "crm_inter_staff_all" ON public.crm_interactions FOR ALL TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

-- =========================================
-- CRM: BRANCH STOCK
-- =========================================
CREATE TABLE IF NOT EXISTS public.crm_branch_stock (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id uuid NOT NULL REFERENCES public.crm_branches(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity int NOT NULL DEFAULT 0,
  low_threshold int NOT NULL DEFAULT 5,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (branch_id, product_id)
);
ALTER TABLE public.crm_branch_stock ENABLE ROW LEVEL SECURITY;
CREATE POLICY "branch_stock_staff_all" ON public.crm_branch_stock FOR ALL TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER branch_stock_touch BEFORE UPDATE ON public.crm_branch_stock
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- =========================================
-- CRM: INVENTORY MOVEMENTS
-- =========================================
CREATE TABLE IF NOT EXISTS public.crm_inventory_movements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE,
  branch_id uuid REFERENCES public.crm_branches(id) ON DELETE SET NULL,
  movement_type text NOT NULL CHECK (movement_type IN ('purchase','sale','transfer','adjustment','return')),
  quantity int NOT NULL,
  reference text,
  notes text,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.crm_inventory_movements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "inv_mov_staff_all" ON public.crm_inventory_movements FOR ALL TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

-- =========================================
-- CRM: LOYALTY
-- =========================================
CREATE TABLE IF NOT EXISTS public.crm_loyalty_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES public.crm_customers(id) ON DELETE CASCADE,
  points int NOT NULL,
  reason text NOT NULL,
  reference text,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.crm_loyalty_transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "loyalty_staff_all" ON public.crm_loyalty_transactions FOR ALL TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

-- =========================================
-- CRM: SEGMENTS
-- =========================================
CREATE TABLE IF NOT EXISTS public.crm_segments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  filter_rules jsonb NOT NULL DEFAULT '{}'::jsonb,
  customer_count int NOT NULL DEFAULT 0,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.crm_segments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "segments_staff_all" ON public.crm_segments FOR ALL TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER segments_touch BEFORE UPDATE ON public.crm_segments
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- =========================================
-- CRM: CAMPAIGNS
-- =========================================
CREATE TABLE IF NOT EXISTS public.crm_campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL DEFAULT 'whatsapp',
  segment_id uuid REFERENCES public.crm_segments(id) ON DELETE SET NULL,
  subject text,
  content text NOT NULL,
  status text NOT NULL DEFAULT 'draft',
  scheduled_at timestamptz,
  sent_count int NOT NULL DEFAULT 0,
  opened_count int NOT NULL DEFAULT 0,
  clicked_count int NOT NULL DEFAULT 0,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.crm_campaigns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "campaigns_staff_all" ON public.crm_campaigns FOR ALL TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER campaigns_touch BEFORE UPDATE ON public.crm_campaigns
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- =========================================
-- Seed defaults
-- =========================================
INSERT INTO public.site_settings (key, value) VALUES
  ('shipping', '{"default_cost":75,"free_threshold":1000,"governorates":[{"name":"القاهرة","cost":60},{"name":"الجيزة","cost":60},{"name":"الإسكندرية","cost":80},{"name":"الدقهلية","cost":85},{"name":"الشرقية","cost":85},{"name":"المنوفية","cost":85},{"name":"القليوبية","cost":75},{"name":"الفيوم","cost":90},{"name":"بني سويف","cost":90},{"name":"المنيا","cost":95},{"name":"أسيوط","cost":100},{"name":"سوهاج","cost":105},{"name":"قنا","cost":110},{"name":"الأقصر","cost":115},{"name":"أسوان","cost":120}]}'::jsonb),
  ('contact', '{"phone":"+201000000000","whatsapp":"+201000000000","email":"hello@shazaya.com","address":"القاهرة، مصر"}'::jsonb),
  ('social', '{"instagram":"https://instagram.com/shazaya","facebook":"https://facebook.com/shazaya","tiktok":"https://tiktok.com/@shazaya"}'::jsonb)
ON CONFLICT (key) DO NOTHING;
