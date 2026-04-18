-- 1. DROP LEGACY TABLES (asset management template)
DROP TABLE IF EXISTS public.asset_assignments CASCADE;
DROP TABLE IF EXISTS public.assets CASCADE;
DROP TABLE IF EXISTS public.asset_categories CASCADE;
DROP TABLE IF EXISTS public.employees CASCADE;
DROP TYPE IF EXISTS public.asset_condition CASCADE;

-- 2. ADD INVENTORY + ORDER WORKFLOW COLUMNS
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS stock_count INTEGER NOT NULL DEFAULT 100,
  ADD COLUMN IF NOT EXISTS low_stock_threshold INTEGER NOT NULL DEFAULT 5;

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS tracking_number TEXT,
  ADD COLUMN IF NOT EXISTS tracking_url TEXT,
  ADD COLUMN IF NOT EXISTS shipped_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS delivered_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS cancelled_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS cancellation_reason TEXT;

-- 3. SEED PRODUCTS (12 real perfumes from src/data/products.ts)
INSERT INTO public.products (slug, name, name_italic, category, tag, price, price_display, original_price, original_price_display, short_description, material, season, sizes, colors, images, accordion, in_stock, stock_count, is_published, display_order)
VALUES
  ('oud-royal','عود ملكي','ملكي','عود','الأكثر مبيعاً',4250,'٤,٢٥٠ ج.م',5250,'٥,٢٥٠ ج.م','عود ملكي فاخر مستخلص من أجود أنواع خشب العود الكمبودي.','عود كمبودي طبيعي','٢٠٢٦',
    '["٣٠ مل","٥٠ مل","١٠٠ مل"]'::jsonb,
    '[{"name":"عنبر","value":"hsl(35, 40%, 35%)"},{"name":"ذهبي","value":"hsl(42, 60%, 55%)"},{"name":"أسود","value":"hsl(40, 5%, 8%)"},{"name":"كريستال","value":"hsl(0, 0%, 90%)"}]'::jsonb,
    '["collection-1","product-detail-2","product-detail-3","product-detail-4"]'::jsonb,
    '[{"title":"الوصف","content":"عود ملكي هو تحفة فنية من عالم العطور الفاخرة. مُركّب من أجود خشب العود الكمبودي."},{"title":"المكونات والتركيبة","content":"المكونات الرئيسية: خشب العود الكمبودي • التركيز: أو دو بارفان • المنشأ: القاهرة."},{"title":"الحجم والسعة","content":"متوفر بأحجام متعددة. العطر مركّز بدرجة عالية."},{"title":"نصائح الاستخدام","content":"يُحفظ في مكان بارد وجاف بعيداً عن أشعة الشمس."},{"title":"الشحن والإرجاع","content":"شحن مجاني فوق ١,٠٠٠ ج.م • سياسة إرجاع خلال ٣٠ يوماً."}]'::jsonb,
    true, 100, true, 1),
  ('ward-taifi','ورد طائفي','طائفي','زهري','جديد',3250,'٣,٢٥٠ ج.م',NULL,NULL,'عطر ورد طائفي أصيل.','ورد طائفي طبيعي','٢٠٢٦',
    '["٣٠ مل","٥٠ مل","١٠٠ مل"]'::jsonb,
    '[{"name":"وردي","value":"hsl(340, 40%, 65%)"},{"name":"ذهبي","value":"hsl(42, 60%, 55%)"}]'::jsonb,
    '["collection-2","product-detail-1","product-detail-3","craftsmanship-1"]'::jsonb,
    '[{"title":"الوصف","content":"ورد طائفي هو تحفة فنية. مُركّب من أجود ورد طائفي أصيل."},{"title":"المكونات والتركيبة","content":"ورد طائفي أصيل • أو دو بارفان • القاهرة."},{"title":"الحجم والسعة","content":"متوفر بأحجام متعددة."},{"title":"نصائح الاستخدام","content":"يُحفظ بعيداً عن الشمس."},{"title":"الشحن والإرجاع","content":"شحن مجاني فوق ١,٠٠٠ ج.م."}]'::jsonb,
    true, 80, true, 2),
  ('misk-aswad','مسك أسود','أسود','مسك','الأكثر مبيعاً',4750,'٤,٧٥٠ ج.م',NULL,NULL,'مسك أسود نادر.','مسك أسود نادر','٢٠٢٦',
    '["٣٠ مل","٥٠ مل"]'::jsonb,
    '[{"name":"أسود","value":"hsl(40, 5%, 8%)"}]'::jsonb,
    '["collection-3","product-detail-2","lookbook-1","product-detail-4"]'::jsonb,
    '[{"title":"الوصف","content":"مسك أسود نادر ومميز."},{"title":"المكونات","content":"مسك أسود طبيعي • القاهرة."},{"title":"الحجم","content":"٣٠ و ٥٠ مل."},{"title":"الاستخدام","content":"رشّ على نقاط النبض."},{"title":"الشحن","content":"شحن مجاني فوق ١,٠٠٠ ج.م."}]'::jsonb,
    true, 50, true, 3),
  ('amber-nights','ليالي العنبر','العنبر','شرقي','محدود',3750,'٣,٧٥٠ ج.م',NULL,NULL,'عطر شرقي فاخر.','عنبر طبيعي','٢٠٢٦',
    '["٣٠ مل","٥٠ مل","١٠٠ مل"]'::jsonb,
    '[{"name":"عنبر","value":"hsl(35, 40%, 35%)"}]'::jsonb,
    '["collection-4","craftsmanship-1","product-detail-3","product-detail-1"]'::jsonb,
    '[{"title":"الوصف","content":"ليالي العنبر — رحلة شرقية أصيلة."},{"title":"المكونات","content":"عنبر طبيعي • القاهرة."},{"title":"الحجم","content":"٣ أحجام."},{"title":"الاستخدام","content":"بضع رشات تكفي."},{"title":"الشحن","content":"شحن مجاني فوق ١,٠٠٠ ج.م."}]'::jsonb,
    true, 30, true, 4),
  ('bukhoor-elite','بخور النخبة','النخبة','بخور','رائج',2750,'٢,٧٥٠ ج.م',NULL,NULL,'بخور سائل فاخر.','خلطة بخور فاخرة','٢٠٢٦',
    '["٣٠ مل","٥٠ مل","١٠٠ مل"]'::jsonb,
    '[{"name":"عنبر","value":"hsl(35, 40%, 35%)"},{"name":"ذهبي","value":"hsl(42, 60%, 55%)"}]'::jsonb,
    '["lookbook-1","collection-3","product-detail-2","product-detail-4"]'::jsonb,
    '[{"title":"الوصف","content":"بخور النخبة الفاخر."},{"title":"المكونات","content":"خلطة بخور • القاهرة."},{"title":"الحجم","content":"٣ أحجام."},{"title":"الاستخدام","content":"على نقاط النبض."},{"title":"الشحن","content":"شحن مجاني فوق ١,٠٠٠ ج.م."}]'::jsonb,
    true, 60, true, 5),
  ('zaafaran-gold','زعفران ذهبي','ذهبي','شرقي','عاد للمخزون',2400,'٢,٤٠٠ ج.م',NULL,NULL,'عطر بنفحات الزعفران.','زعفران إيراني','٢٠٢٦',
    '["٣٠ مل","٥٠ مل","١٠٠ مل"]'::jsonb,
    '[{"name":"ذهبي","value":"hsl(42, 60%, 55%)"}]'::jsonb,
    '["lookbook-2","product-detail-1","collection-3","product-detail-3"]'::jsonb,
    '[{"title":"الوصف","content":"زعفران ذهبي أنيق."},{"title":"المكونات","content":"زعفران إيراني • القاهرة."},{"title":"الحجم","content":"٣ أحجام."},{"title":"الاستخدام","content":"رشّ خفيف."},{"title":"الشحن","content":"شحن مجاني فوق ١,٠٠٠ ج.م."}]'::jsonb,
    true, 70, true, 6),
  ('jasmine-blanc','ياسمين أبيض','أبيض','زهري','جديد',2100,'٢,١٠٠ ج.م',NULL,NULL,'ياسمين أبيض نقي.','ياسمين دمشقي','٢٠٢٦',
    '["٣٠ مل","٥٠ مل","١٠٠ مل"]'::jsonb,
    '[{"name":"أبيض","value":"hsl(0, 0%, 95%)"}]'::jsonb,
    '["lookbook-3","collection-2","product-detail-1","craftsmanship-1"]'::jsonb,
    '[{"title":"الوصف","content":"ياسمين دمشقي نقي."},{"title":"المكونات","content":"ياسمين دمشقي • القاهرة."},{"title":"الحجم","content":"٣ أحجام."},{"title":"الاستخدام","content":"على نقاط النبض."},{"title":"الشحن","content":"شحن مجاني فوق ١,٠٠٠ ج.م."}]'::jsonb,
    true, 90, true, 7),
  ('oud-supreme','عود سوبريم','سوبريم','عود','جديد',6000,'٦,٠٠٠ ج.م',NULL,NULL,'أفخم أنواع العود المعتّق.','عود هندي معتّق','٢٠٢٦',
    '["٣٠ مل","٥٠ مل"]'::jsonb,
    '[{"name":"عنبر","value":"hsl(35, 40%, 35%)"},{"name":"ذهبي","value":"hsl(42, 60%, 55%)"}]'::jsonb,
    '["product-detail-1","collection-1","product-detail-3","product-detail-4"]'::jsonb,
    '[{"title":"الوصف","content":"عود هندي معتّق ٢٠ سنة."},{"title":"المكونات","content":"عود هندي • القاهرة."},{"title":"الحجم","content":"حجمان فقط."},{"title":"الاستخدام","content":"كمية صغيرة تكفي."},{"title":"الشحن","content":"شحن مجاني فوق ١,٠٠٠ ج.م."}]'::jsonb,
    true, 25, true, 8),
  ('misk-tahara','مسك الطهارة','الطهارة','مسك','الأكثر مبيعاً',1600,'١,٦٠٠ ج.م',NULL,NULL,'مسك الطهارة الأصيل.','مسك طبيعي نقي','٢٠٢٦',
    '["٣٠ مل","٥٠ مل","١٠٠ مل"]'::jsonb,
    '[{"name":"أبيض","value":"hsl(0, 0%, 95%)"}]'::jsonb,
    '["product-detail-2","craftsmanship-1","collection-2","lookbook-3"]'::jsonb,
    '[{"title":"الوصف","content":"مسك الطهارة الأصيل."},{"title":"المكونات","content":"مسك أبيض • القاهرة."},{"title":"الحجم","content":"٣ أحجام."},{"title":"الاستخدام","content":"رشّ خفيف."},{"title":"الشحن","content":"شحن مجاني فوق ١,٠٠٠ ج.م."}]'::jsonb,
    true, 120, true, 9),
  ('sandal-hind','صندل هندي','هندي','خشبي','جديد',2900,'٢,٩٠٠ ج.م',NULL,NULL,'خشب الصندل الهندي الأصيل.','صندل هندي ميسوري','٢٠٢٦',
    '["٣٠ مل","٥٠ مل","١٠٠ مل"]'::jsonb,
    '[{"name":"بيج","value":"hsl(35, 30%, 70%)"}]'::jsonb,
    '["product-detail-3","lookbook-2","collection-3","product-detail-1"]'::jsonb,
    '[{"title":"الوصف","content":"صندل هندي ميسوري أصيل."},{"title":"المكونات","content":"خشب الصندل • القاهرة."},{"title":"الحجم","content":"٣ أحجام."},{"title":"الاستخدام","content":"على نقاط النبض."},{"title":"الشحن","content":"شحن مجاني فوق ١,٠٠٠ ج.م."}]'::jsonb,
    true, 65, true, 10),
  ('dehn-ward','دهن ورد','ورد','زهري','رائج',3900,'٣,٩٠٠ ج.م',NULL,NULL,'دهن ورد طائفي مركّز.','دهن ورد طائفي','٢٠٢٦',
    '["٣ مل","٦ مل","١٢ مل"]'::jsonb,
    '[{"name":"وردي غامق","value":"hsl(340, 50%, 40%)"}]'::jsonb,
    '["product-detail-4","collection-4","craftsmanship-1","product-detail-2"]'::jsonb,
    '[{"title":"الوصف","content":"دهن ورد طائفي مركّز."},{"title":"المكونات","content":"دهن ورد • القاهرة."},{"title":"الحجم","content":"أحجام صغيرة (مركّز)."},{"title":"الاستخدام","content":"قطرة واحدة تكفي."},{"title":"الشحن","content":"شحن مجاني فوق ١,٠٠٠ ج.م."}]'::jsonb,
    true, 40, true, 11),
  ('layali-sharqiya','ليالي شرقية','شرقية','شرقي','محدود',4450,'٤,٤٥٠ ج.م',5500,'٥,٥٠٠ ج.م','ليالي شرقية الحصري.','تركيبة شرقية','٢٠٢٦',
    '["٣٠ مل","٥٠ مل"]'::jsonb,
    '[{"name":"بنفسجي","value":"hsl(280, 30%, 25%)"}]'::jsonb,
    '["craftsmanship-1","collection-1","product-detail-1","product-detail-4"]'::jsonb,
    '[{"title":"الوصف","content":"ليالي شرقية حصري."},{"title":"المكونات","content":"العود مع العنبر • القاهرة."},{"title":"الحجم","content":"حجمان."},{"title":"الاستخدام","content":"على نقاط النبض."},{"title":"الشحن","content":"شحن مجاني فوق ١,٠٠٠ ج.م."}]'::jsonb,
    true, 20, true, 12)
ON CONFLICT (slug) DO NOTHING;

-- 4. SEED SITE SETTINGS
INSERT INTO public.site_settings (key, value) VALUES
  ('contact', '{"phone":"+20 100 000 0000","whatsapp":"+201000000000","email":"hello@shazaya.com","address":"القاهرة، مصر"}'::jsonb),
  ('social', '{"instagram":"https://instagram.com/shazaya","facebook":"https://facebook.com/shazaya","tiktok":"https://tiktok.com/@shazaya","youtube":""}'::jsonb),
  ('announcement', '{"enabled":true,"text":"شحن مجاني على جميع الطلبات فوق ١,٠٠٠ ج.م — شحن سريع لكل المحافظات"}'::jsonb),
  ('shipping', '{"free_shipping_threshold":1000,"default_cost":75,"governorates":{"القاهرة":50,"الجيزة":50,"الإسكندرية":75,"القليوبية":60,"الدقهلية":80,"الشرقية":80,"المنوفية":75,"الغربية":75,"كفر الشيخ":85,"دمياط":85,"البحيرة":85,"الإسماعيلية":85,"السويس":90,"بورسعيد":90,"شمال سيناء":120,"جنوب سيناء":120,"الفيوم":80,"بني سويف":85,"المنيا":95,"أسيوط":110,"سوهاج":120,"قنا":130,"الأقصر":140,"أسوان":150,"البحر الأحمر":140,"مرسى مطروح":140,"الوادي الجديد":150}}'::jsonb),
  ('store', '{"name":"شذايا","tagline":"عطور فاخرة عند تقاطع الفن والأصالة","currency":"EGP","currency_symbol":"ج.م","language":"ar"}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- 5. AUTO-PROMOTE FIRST USER TO ADMIN (production-ready bootstrap)
CREATE OR REPLACE FUNCTION public.bootstrap_first_admin()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin')
    ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_bootstrap_admin ON auth.users;
CREATE TRIGGER on_auth_user_bootstrap_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.bootstrap_first_admin();

-- 6. AUTO-DECREMENT STOCK ON ORDER ITEM INSERT
CREATE OR REPLACE FUNCTION public.decrement_product_stock()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.product_id IS NOT NULL THEN
    UPDATE public.products
    SET stock_count = GREATEST(0, stock_count - NEW.quantity),
        in_stock = (stock_count - NEW.quantity) > 0
    WHERE id = NEW.product_id;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_order_item_decrement_stock ON public.order_items;
CREATE TRIGGER on_order_item_decrement_stock
  AFTER INSERT ON public.order_items
  FOR EACH ROW EXECUTE FUNCTION public.decrement_product_stock();

-- 7. AUTO-CREATE ADMIN NOTIFICATION ON NEW ORDER
CREATE OR REPLACE FUNCTION public.notify_admin_new_order()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.admin_notifications (type, title, message, link)
  VALUES (
    'order',
    'طلب جديد ' || NEW.order_number,
    NEW.shipping_full_name || ' — ' || NEW.total::text || ' ج.م',
    '/admin/orders/' || NEW.id
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_order_notify_admin ON public.orders;
CREATE TRIGGER on_order_notify_admin
  AFTER INSERT ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.notify_admin_new_order();