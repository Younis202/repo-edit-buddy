-- =====================================================
-- HELPER FUNCTIONS
-- =====================================================
CREATE OR REPLACE FUNCTION public.has_any_crm_role(_user_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('admin'::app_role, 'crm_owner'::app_role, 'crm_sales_manager'::app_role, 'crm_sales_agent'::app_role, 'crm_marketing'::app_role, 'crm_branch_manager'::app_role, 'crm_support'::app_role)
  )
$$;

CREATE OR REPLACE FUNCTION public.is_crm_manager(_user_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('admin'::app_role, 'crm_owner'::app_role, 'crm_sales_manager'::app_role)
  )
$$;

-- =====================================================
-- ENUMS
-- =====================================================
CREATE TYPE public.customer_status AS ENUM ('lead', 'active', 'vip', 'inactive', 'lost');
CREATE TYPE public.customer_tier AS ENUM ('bronze', 'silver', 'gold', 'platinum');
CREATE TYPE public.customer_source AS ENUM ('website', 'instagram', 'facebook', 'whatsapp', 'walk_in', 'referral', 'tiktok', 'google', 'other');
CREATE TYPE public.interaction_type AS ENUM ('call', 'whatsapp', 'email', 'sms', 'visit', 'meeting', 'note', 'instagram_dm');
CREATE TYPE public.interaction_direction AS ENUM ('inbound', 'outbound');
CREATE TYPE public.lead_stage AS ENUM ('new', 'contacted', 'qualified', 'tasting', 'negotiation', 'won', 'lost');
CREATE TYPE public.task_type AS ENUM ('call', 'follow_up', 'meeting', 'email', 'whatsapp', 'visit', 'other');
CREATE TYPE public.task_priority AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE public.task_status AS ENUM ('pending', 'in_progress', 'completed', 'cancelled');
CREATE TYPE public.campaign_type AS ENUM ('whatsapp', 'email', 'sms', 'instagram');
CREATE TYPE public.campaign_status AS ENUM ('draft', 'scheduled', 'sending', 'sent', 'completed', 'cancelled');
CREATE TYPE public.loyalty_txn_type AS ENUM ('earned', 'redeemed', 'expired', 'adjusted', 'gifted');
CREATE TYPE public.inventory_movement_type AS ENUM ('transfer', 'sale', 'restock', 'adjustment', 'damage', 'return');

-- =====================================================
-- 1. CRM CUSTOMERS
-- =====================================================
CREATE TABLE public.crm_customers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  full_name TEXT NOT NULL,
  phone TEXT, whatsapp TEXT, email TEXT,
  date_of_birth DATE, gender TEXT,
  city TEXT, governorate TEXT, address TEXT, country TEXT DEFAULT 'مصر',
  source customer_source DEFAULT 'website',
  status customer_status NOT NULL DEFAULT 'lead',
  tier customer_tier NOT NULL DEFAULT 'bronze',
  assigned_to UUID, branch_id UUID,
  scent_families JSONB NOT NULL DEFAULT '[]'::jsonb,
  scent_notes_loved JSONB NOT NULL DEFAULT '[]'::jsonb,
  scent_notes_disliked JSONB NOT NULL DEFAULT '[]'::jsonb,
  preferred_concentration TEXT, preferred_season TEXT, scent_profile_notes TEXT,
  total_orders INTEGER NOT NULL DEFAULT 0,
  total_spent NUMERIC(12,2) NOT NULL DEFAULT 0,
  avg_order_value NUMERIC(12,2) NOT NULL DEFAULT 0,
  last_order_at TIMESTAMPTZ, first_order_at TIMESTAMPTZ,
  loyalty_points INTEGER NOT NULL DEFAULT 0,
  internal_notes TEXT,
  rating SMALLINT CHECK (rating IS NULL OR (rating >= 1 AND rating <= 5)),
  tags JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_blocked BOOLEAN NOT NULL DEFAULT false,
  marketing_consent BOOLEAN NOT NULL DEFAULT true,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_crm_customers_phone ON public.crm_customers(phone);
CREATE INDEX idx_crm_customers_email ON public.crm_customers(email);
CREATE INDEX idx_crm_customers_status ON public.crm_customers(status);
CREATE INDEX idx_crm_customers_tier ON public.crm_customers(tier);
CREATE INDEX idx_crm_customers_assigned_to ON public.crm_customers(assigned_to);
CREATE INDEX idx_crm_customers_user_id ON public.crm_customers(user_id);
CREATE INDEX idx_crm_customers_last_order ON public.crm_customers(last_order_at DESC);

ALTER TABLE public.crm_customers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "crm_customers_managers_all" ON public.crm_customers FOR ALL TO authenticated
  USING (public.is_crm_manager(auth.uid())) WITH CHECK (public.is_crm_manager(auth.uid()));
CREATE POLICY "crm_customers_agents_select" ON public.crm_customers FOR SELECT TO authenticated
  USING (public.has_any_crm_role(auth.uid()) AND (assigned_to = auth.uid() OR assigned_to IS NULL OR public.is_crm_manager(auth.uid())));
CREATE POLICY "crm_customers_agents_insert" ON public.crm_customers FOR INSERT TO authenticated
  WITH CHECK (public.has_any_crm_role(auth.uid()));
CREATE POLICY "crm_customers_agents_update" ON public.crm_customers FOR UPDATE TO authenticated
  USING (public.has_any_crm_role(auth.uid()) AND (assigned_to = auth.uid() OR public.is_crm_manager(auth.uid())))
  WITH CHECK (public.has_any_crm_role(auth.uid()) AND (assigned_to = auth.uid() OR public.is_crm_manager(auth.uid())));

-- =====================================================
-- 2. INTERACTIONS
-- =====================================================
CREATE TABLE public.crm_interactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID NOT NULL REFERENCES public.crm_customers(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  type interaction_type NOT NULL,
  direction interaction_direction NOT NULL DEFAULT 'outbound',
  subject TEXT, content TEXT, outcome TEXT,
  duration_seconds INTEGER,
  attachments JSONB NOT NULL DEFAULT '[]'::jsonb,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_crm_interactions_customer ON public.crm_interactions(customer_id, occurred_at DESC);
CREATE INDEX idx_crm_interactions_user ON public.crm_interactions(user_id, occurred_at DESC);
ALTER TABLE public.crm_interactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "crm_interactions_access" ON public.crm_interactions FOR ALL TO authenticated
  USING (public.has_any_crm_role(auth.uid()))
  WITH CHECK (public.has_any_crm_role(auth.uid()) AND user_id = auth.uid());

-- =====================================================
-- 3. LEADS
-- =====================================================
CREATE TABLE public.crm_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT, whatsapp TEXT, email TEXT, city TEXT,
  source customer_source DEFAULT 'website',
  interest TEXT,
  estimated_value NUMERIC(12,2) DEFAULT 0,
  stage lead_stage NOT NULL DEFAULT 'new',
  win_probability SMALLINT NOT NULL DEFAULT 20 CHECK (win_probability >= 0 AND win_probability <= 100),
  expected_close_date DATE,
  assigned_to UUID,
  customer_id UUID REFERENCES public.crm_customers(id) ON DELETE SET NULL,
  lost_reason TEXT, notes TEXT,
  tags JSONB NOT NULL DEFAULT '[]'::jsonb,
  position INTEGER NOT NULL DEFAULT 0,
  last_activity_at TIMESTAMPTZ,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_crm_leads_stage ON public.crm_leads(stage, position);
CREATE INDEX idx_crm_leads_assigned ON public.crm_leads(assigned_to);
ALTER TABLE public.crm_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "crm_leads_managers_all" ON public.crm_leads FOR ALL TO authenticated
  USING (public.is_crm_manager(auth.uid())) WITH CHECK (public.is_crm_manager(auth.uid()));
CREATE POLICY "crm_leads_agents_select" ON public.crm_leads FOR SELECT TO authenticated
  USING (public.has_any_crm_role(auth.uid()) AND (assigned_to = auth.uid() OR assigned_to IS NULL OR public.is_crm_manager(auth.uid())));
CREATE POLICY "crm_leads_agents_insert" ON public.crm_leads FOR INSERT TO authenticated
  WITH CHECK (public.has_any_crm_role(auth.uid()));
CREATE POLICY "crm_leads_agents_update" ON public.crm_leads FOR UPDATE TO authenticated
  USING (public.has_any_crm_role(auth.uid()) AND (assigned_to = auth.uid() OR public.is_crm_manager(auth.uid())))
  WITH CHECK (public.has_any_crm_role(auth.uid()) AND (assigned_to = auth.uid() OR public.is_crm_manager(auth.uid())));

-- =====================================================
-- 4. TASKS
-- =====================================================
CREATE TABLE public.crm_tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL, description TEXT,
  type task_type NOT NULL DEFAULT 'follow_up',
  priority task_priority NOT NULL DEFAULT 'medium',
  status task_status NOT NULL DEFAULT 'pending',
  due_at TIMESTAMPTZ, completed_at TIMESTAMPTZ,
  assigned_to UUID,
  customer_id UUID REFERENCES public.crm_customers(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES public.crm_leads(id) ON DELETE CASCADE,
  order_id UUID,
  reminder_at TIMESTAMPTZ,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_crm_tasks_assigned ON public.crm_tasks(assigned_to, status, due_at);
CREATE INDEX idx_crm_tasks_customer ON public.crm_tasks(customer_id);
CREATE INDEX idx_crm_tasks_lead ON public.crm_tasks(lead_id);
ALTER TABLE public.crm_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "crm_tasks_access" ON public.crm_tasks FOR ALL TO authenticated
  USING (public.has_any_crm_role(auth.uid()) AND (assigned_to = auth.uid() OR created_by = auth.uid() OR public.is_crm_manager(auth.uid())))
  WITH CHECK (public.has_any_crm_role(auth.uid()));

-- =====================================================
-- 5. SEGMENTS
-- =====================================================
CREATE TABLE public.crm_segments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL, description TEXT,
  conditions JSONB NOT NULL DEFAULT '{}'::jsonb,
  color TEXT DEFAULT '#B8860B',
  customer_count INTEGER NOT NULL DEFAULT 0,
  is_dynamic BOOLEAN NOT NULL DEFAULT true,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.crm_segments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "crm_segments_access" ON public.crm_segments FOR ALL TO authenticated
  USING (public.has_any_crm_role(auth.uid())) WITH CHECK (public.has_any_crm_role(auth.uid()));

-- =====================================================
-- 6. CAMPAIGNS
-- =====================================================
CREATE TABLE public.crm_campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type campaign_type NOT NULL DEFAULT 'whatsapp',
  subject TEXT, content TEXT NOT NULL,
  segment_id UUID REFERENCES public.crm_segments(id) ON DELETE SET NULL,
  status campaign_status NOT NULL DEFAULT 'draft',
  scheduled_at TIMESTAMPTZ, sent_at TIMESTAMPTZ,
  recipients_count INTEGER NOT NULL DEFAULT 0,
  delivered_count INTEGER NOT NULL DEFAULT 0,
  opened_count INTEGER NOT NULL DEFAULT 0,
  clicked_count INTEGER NOT NULL DEFAULT 0,
  converted_count INTEGER NOT NULL DEFAULT 0,
  conversion_revenue NUMERIC(12,2) NOT NULL DEFAULT 0,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.crm_campaigns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "crm_campaigns_access" ON public.crm_campaigns FOR ALL TO authenticated
  USING (public.has_any_crm_role(auth.uid())) WITH CHECK (public.has_any_crm_role(auth.uid()));

-- =====================================================
-- 7. LOYALTY
-- =====================================================
CREATE TABLE public.crm_loyalty_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID NOT NULL REFERENCES public.crm_customers(id) ON DELETE CASCADE,
  type loyalty_txn_type NOT NULL,
  points INTEGER NOT NULL,
  reason TEXT, order_id UUID, created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_crm_loyalty_customer ON public.crm_loyalty_transactions(customer_id, created_at DESC);
ALTER TABLE public.crm_loyalty_transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "crm_loyalty_access" ON public.crm_loyalty_transactions FOR ALL TO authenticated
  USING (public.has_any_crm_role(auth.uid())) WITH CHECK (public.has_any_crm_role(auth.uid()));

-- =====================================================
-- 8. BRANCHES
-- =====================================================
CREATE TABLE public.crm_branches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL, slug TEXT UNIQUE,
  address TEXT, city TEXT, governorate TEXT, phone TEXT,
  manager_id UUID, manager_name TEXT,
  latitude NUMERIC(10,7), longitude NUMERIC(10,7),
  hours JSONB DEFAULT '{}'::jsonb, image TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.crm_branches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "crm_branches_public_read" ON public.crm_branches FOR SELECT TO public
  USING (is_active = true OR public.has_any_crm_role(auth.uid()));
CREATE POLICY "crm_branches_managers" ON public.crm_branches FOR ALL TO authenticated
  USING (public.is_crm_manager(auth.uid())) WITH CHECK (public.is_crm_manager(auth.uid()));

-- =====================================================
-- 9. BRANCH STOCK
-- =====================================================
CREATE TABLE public.crm_branch_stock (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  branch_id UUID NOT NULL REFERENCES public.crm_branches(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 0,
  low_stock_threshold INTEGER NOT NULL DEFAULT 5,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(branch_id, product_id)
);
CREATE INDEX idx_crm_branch_stock_branch ON public.crm_branch_stock(branch_id);
CREATE INDEX idx_crm_branch_stock_product ON public.crm_branch_stock(product_id);
ALTER TABLE public.crm_branch_stock ENABLE ROW LEVEL SECURITY;
CREATE POLICY "crm_branch_stock_access" ON public.crm_branch_stock FOR ALL TO authenticated
  USING (public.has_any_crm_role(auth.uid())) WITH CHECK (public.has_any_crm_role(auth.uid()));

-- =====================================================
-- 10. INVENTORY MOVEMENTS
-- =====================================================
CREATE TABLE public.crm_inventory_movements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  from_branch_id UUID REFERENCES public.crm_branches(id) ON DELETE SET NULL,
  to_branch_id UUID REFERENCES public.crm_branches(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL,
  type inventory_movement_type NOT NULL,
  notes TEXT, performed_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_crm_inventory_product ON public.crm_inventory_movements(product_id, created_at DESC);
ALTER TABLE public.crm_inventory_movements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "crm_inventory_access" ON public.crm_inventory_movements FOR ALL TO authenticated
  USING (public.has_any_crm_role(auth.uid())) WITH CHECK (public.has_any_crm_role(auth.uid()));

-- =====================================================
-- 11. ACTIVITY LOG
-- =====================================================
CREATE TABLE public.crm_activity_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  action TEXT NOT NULL,
  entity_type TEXT, entity_id UUID,
  description TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_crm_activity_user ON public.crm_activity_log(user_id, created_at DESC);
CREATE INDEX idx_crm_activity_entity ON public.crm_activity_log(entity_type, entity_id);
ALTER TABLE public.crm_activity_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "crm_activity_managers_read" ON public.crm_activity_log FOR SELECT TO authenticated
  USING (public.is_crm_manager(auth.uid()));
CREATE POLICY "crm_activity_users_insert" ON public.crm_activity_log FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() AND public.has_any_crm_role(auth.uid()));

-- =====================================================
-- TRIGGERS
-- =====================================================
CREATE TRIGGER trg_crm_customers_updated BEFORE UPDATE ON public.crm_customers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_crm_leads_updated BEFORE UPDATE ON public.crm_leads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_crm_tasks_updated BEFORE UPDATE ON public.crm_tasks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_crm_segments_updated BEFORE UPDATE ON public.crm_segments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_crm_campaigns_updated BEFORE UPDATE ON public.crm_campaigns
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_crm_branches_updated BEFORE UPDATE ON public.crm_branches
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_crm_branch_stock_updated BEFORE UPDATE ON public.crm_branch_stock
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- RECALC METRICS FUNCTION
-- =====================================================
CREATE OR REPLACE FUNCTION public.recalc_customer_metrics(_customer_id uuid)
RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_count INTEGER;
  v_total NUMERIC;
  v_first TIMESTAMPTZ;
  v_last TIMESTAMPTZ;
  v_phone TEXT;
  v_user UUID;
BEGIN
  SELECT phone, user_id INTO v_phone, v_user FROM public.crm_customers WHERE id = _customer_id;

  SELECT COUNT(*), COALESCE(SUM(total),0), MIN(created_at), MAX(created_at)
    INTO v_count, v_total, v_first, v_last
  FROM public.orders
  WHERE status NOT IN ('cancelled'::order_status, 'refunded'::order_status)
    AND ((v_user IS NOT NULL AND user_id = v_user)
      OR (v_phone IS NOT NULL AND (customer_phone = v_phone OR guest_phone = v_phone OR shipping_phone = v_phone)));

  UPDATE public.crm_customers
  SET total_orders = COALESCE(v_count,0),
      total_spent = COALESCE(v_total,0),
      avg_order_value = CASE WHEN COALESCE(v_count,0) > 0 THEN v_total / v_count ELSE 0 END,
      first_order_at = v_first,
      last_order_at = v_last
  WHERE id = _customer_id;
END;
$$;

-- =====================================================
-- TEAM LIST
-- =====================================================
CREATE OR REPLACE FUNCTION public.crm_list_team()
RETURNS TABLE(user_id uuid, email text, first_name text, last_name text, roles text[])
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF NOT public.is_crm_manager(auth.uid()) THEN
    RAISE EXCEPTION 'forbidden';
  END IF;

  RETURN QUERY
  SELECT u.id, u.email::text, p.first_name, p.last_name,
    ARRAY(SELECT r.role::text FROM public.user_roles r WHERE r.user_id = u.id) AS roles
  FROM auth.users u
  LEFT JOIN public.profiles p ON p.user_id = u.id
  WHERE EXISTS (
    SELECT 1 FROM public.user_roles r
    WHERE r.user_id = u.id
      AND (r.role = 'admin'::app_role OR r.role::text LIKE 'crm_%')
  )
  ORDER BY u.created_at DESC;
END;
$$;