
-- 1) Storage bucket للصور (منتجات + بانرات)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Public can view product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

CREATE POLICY "Admins can upload product images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update product images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'product-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete product images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'product-images' AND public.has_role(auth.uid(), 'admin'));

-- 2) جدول إعدادات المتجر (key/value)
CREATE TABLE public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by UUID
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read settings"
ON public.site_settings FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admins manage settings insert"
ON public.site_settings FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage settings update"
ON public.site_settings FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage settings delete"
ON public.site_settings FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- بيانات افتراضية
INSERT INTO public.site_settings (key, value) VALUES
  ('shipping', '{"default_cost": 60, "free_threshold": 1500, "governorates": [
    {"name": "القاهرة", "cost": 60},
    {"name": "الجيزة", "cost": 60},
    {"name": "الإسكندرية", "cost": 80},
    {"name": "الدقهلية", "cost": 80},
    {"name": "الشرقية", "cost": 80},
    {"name": "القليوبية", "cost": 70},
    {"name": "المنوفية", "cost": 80},
    {"name": "الغربية", "cost": 80},
    {"name": "كفر الشيخ", "cost": 90},
    {"name": "البحيرة", "cost": 90},
    {"name": "دمياط", "cost": 90},
    {"name": "بورسعيد", "cost": 90},
    {"name": "الإسماعيلية", "cost": 90},
    {"name": "السويس", "cost": 90},
    {"name": "بني سويف", "cost": 90},
    {"name": "الفيوم", "cost": 90},
    {"name": "المنيا", "cost": 100},
    {"name": "أسيوط", "cost": 100},
    {"name": "سوهاج", "cost": 110},
    {"name": "قنا", "cost": 110},
    {"name": "الأقصر", "cost": 110},
    {"name": "أسوان", "cost": 120},
    {"name": "البحر الأحمر", "cost": 130},
    {"name": "مطروح", "cost": 130},
    {"name": "شمال سيناء", "cost": 140},
    {"name": "جنوب سيناء", "cost": 140},
    {"name": "الوادي الجديد", "cost": 140}
  ]}'::jsonb),
  ('store', '{"name": "شذايا", "tagline": "عطور من قلب الشرق", "phone": "+201234567890", "whatsapp": "+201234567890", "email": "info@shazaya.com", "instagram": "shazaya", "facebook": "shazaya"}'::jsonb),
  ('announcement', '{"enabled": true, "text": "شحن مجاني للطلبات أكثر من 1500 ج.م", "link": ""}'::jsonb);

-- 3) إشعارات الأدمن (للطلبات الجديدة)
CREATE TABLE public.admin_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  link TEXT,
  is_read BOOLEAN NOT NULL DEFAULT false,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins view notifications"
ON public.admin_notifications FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can insert notification on order"
ON public.admin_notifications FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins update notifications"
ON public.admin_notifications FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete notifications"
ON public.admin_notifications FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Trigger: عند إنشاء طلب جديد، أنشئ إشعار للأدمن
CREATE OR REPLACE FUNCTION public.notify_new_order()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.admin_notifications (type, title, body, link, metadata)
  VALUES (
    'new_order',
    'طلب جديد: ' || NEW.order_number,
    NEW.shipping_full_name || ' • ' || NEW.total::text || ' ج.م',
    '/admin/orders/' || NEW.id::text,
    jsonb_build_object('order_id', NEW.id, 'total', NEW.total)
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_order_created_notify
AFTER INSERT ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.notify_new_order();

-- 4) Realtime للطلبات والإشعارات
ALTER TABLE public.orders REPLICA IDENTITY FULL;
ALTER TABLE public.admin_notifications REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.admin_notifications;

-- 5) دالة لجلب كل المستخدمين (للأدمن فقط) - بدون كشف بيانات حساسة
CREATE OR REPLACE FUNCTION public.admin_list_users()
RETURNS TABLE (
  user_id UUID,
  email TEXT,
  created_at TIMESTAMPTZ,
  last_sign_in_at TIMESTAMPTZ,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  is_admin BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Forbidden';
  END IF;

  RETURN QUERY
  SELECT 
    u.id AS user_id,
    u.email::TEXT,
    u.created_at,
    u.last_sign_in_at,
    p.first_name,
    p.last_name,
    p.phone,
    EXISTS(SELECT 1 FROM public.user_roles r WHERE r.user_id = u.id AND r.role = 'admin') AS is_admin
  FROM auth.users u
  LEFT JOIN public.profiles p ON p.user_id = u.id
  ORDER BY u.created_at DESC;
END;
$$;

-- 6) Trigger لزيادة uses_count للكوبون عند استخدامه
CREATE OR REPLACE FUNCTION public.increment_coupon_uses()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.coupons
  SET uses_count = uses_count + 1, updated_at = now()
  WHERE id = NEW.coupon_id;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_redemption_increment
AFTER INSERT ON public.coupon_redemptions
FOR EACH ROW EXECUTE FUNCTION public.increment_coupon_uses();
