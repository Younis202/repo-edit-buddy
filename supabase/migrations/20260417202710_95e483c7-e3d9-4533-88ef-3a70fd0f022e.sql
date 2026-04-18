-- Fix CRM schema gaps so all UI pages match real columns
-- Add missing columns referenced by frontend code

-- crm_tasks: add type column (frontend filters by type)
ALTER TABLE public.crm_tasks
  ADD COLUMN IF NOT EXISTS type text NOT NULL DEFAULT 'follow_up';

-- crm_leads: add position for kanban ordering
ALTER TABLE public.crm_leads
  ADD COLUMN IF NOT EXISTS position integer NOT NULL DEFAULT 0;

-- crm_loyalty_transactions: add type and align with frontend
ALTER TABLE public.crm_loyalty_transactions
  ADD COLUMN IF NOT EXISTS type text NOT NULL DEFAULT 'earned';

-- crm_segments: add color + conditions (frontend uses these names)
ALTER TABLE public.crm_segments
  ADD COLUMN IF NOT EXISTS color text DEFAULT '#B8860B',
  ADD COLUMN IF NOT EXISTS conditions jsonb NOT NULL DEFAULT '{}'::jsonb;

-- crm_campaigns: add metrics columns
ALTER TABLE public.crm_campaigns
  ADD COLUMN IF NOT EXISTS recipients_count integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS converted_count integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS conversion_revenue numeric NOT NULL DEFAULT 0;

-- crm_interactions: add type/content/outcome (in addition to existing channel/body/subject)
ALTER TABLE public.crm_interactions
  ADD COLUMN IF NOT EXISTS type text NOT NULL DEFAULT 'whatsapp',
  ADD COLUMN IF NOT EXISTS content text,
  ADD COLUMN IF NOT EXISTS outcome text;

-- orders: add customer_name for analytics convenience (auto-fill from shipping_full_name)
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS customer_name text;

-- Backfill customer_name on existing orders
UPDATE public.orders SET customer_name = shipping_full_name WHERE customer_name IS NULL;

-- Trigger to auto-fill customer_name on new orders
CREATE OR REPLACE FUNCTION public.fill_order_customer_name()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.customer_name IS NULL OR NEW.customer_name = '' THEN
    NEW.customer_name = NEW.shipping_full_name;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS orders_fill_customer_name ON public.orders;
CREATE TRIGGER orders_fill_customer_name
BEFORE INSERT ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.fill_order_customer_name();

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_crm_tasks_status ON public.crm_tasks(status);
CREATE INDEX IF NOT EXISTS idx_crm_tasks_due_at ON public.crm_tasks(due_at);
CREATE INDEX IF NOT EXISTS idx_crm_leads_stage ON public.crm_leads(stage);
CREATE INDEX IF NOT EXISTS idx_crm_customers_tier ON public.crm_customers(tier);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_products_published ON public.products(is_published);
CREATE INDEX IF NOT EXISTS idx_wishlist_user ON public.wishlist_items(user_id);

-- Trigger to keep crm_segments.customer_count fresh (best-effort placeholder)
-- For now we leave it manual; campaigns reference segment_id directly.
