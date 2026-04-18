
-- 1) Auto-grant admin role to owner email on signup
CREATE OR REPLACE FUNCTION public.grant_owner_admin()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.email = 'younismohamedyounis022@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created_owner ON auth.users;
CREATE TRIGGER on_auth_user_created_owner
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.grant_owner_admin();

-- Also grant if already exists
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role FROM auth.users
WHERE email = 'younismohamedyounis022@gmail.com'
ON CONFLICT DO NOTHING;

-- 2) Ensure profile + default user role triggers exist on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created_profile ON auth.users;
CREATE TRIGGER on_auth_user_created_profile
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_profile();

DROP TRIGGER IF EXISTS on_auth_user_created_role ON auth.users;
CREATE TRIGGER on_auth_user_created_role
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_role();

-- 3) Order triggers
DROP TRIGGER IF EXISTS orders_set_number ON public.orders;
CREATE TRIGGER orders_set_number
BEFORE INSERT ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.generate_order_number();

DROP TRIGGER IF EXISTS orders_touch ON public.orders;
CREATE TRIGGER orders_touch
BEFORE UPDATE ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS orders_notify ON public.orders;
CREATE TRIGGER orders_notify
AFTER INSERT ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.notify_new_order();

DROP TRIGGER IF EXISTS orders_recalc_stats ON public.orders;
CREATE TRIGGER orders_recalc_stats
AFTER INSERT OR UPDATE ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.recalc_customer_stats();

-- 4) Coupon trigger
DROP TRIGGER IF EXISTS coupon_redemption_increment ON public.coupon_redemptions;
CREATE TRIGGER coupon_redemption_increment
AFTER INSERT ON public.coupon_redemptions
FOR EACH ROW EXECUTE FUNCTION public.increment_coupon_uses();

-- 5) Touch updated_at on common tables
DROP TRIGGER IF EXISTS products_touch ON public.products;
CREATE TRIGGER products_touch BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS crm_customers_touch ON public.crm_customers;
CREATE TRIGGER crm_customers_touch BEFORE UPDATE ON public.crm_customers FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS crm_leads_touch ON public.crm_leads;
CREATE TRIGGER crm_leads_touch BEFORE UPDATE ON public.crm_leads FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS crm_segments_touch ON public.crm_segments;
CREATE TRIGGER crm_segments_touch BEFORE UPDATE ON public.crm_segments FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS crm_campaigns_touch ON public.crm_campaigns;
CREATE TRIGGER crm_campaigns_touch BEFORE UPDATE ON public.crm_campaigns FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS profiles_touch ON public.profiles;
CREATE TRIGGER profiles_touch BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
