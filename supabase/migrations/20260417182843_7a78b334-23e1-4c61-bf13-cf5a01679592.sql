-- Promote user to admin + crm_owner
INSERT INTO public.user_roles (user_id, role)
SELECT u.id, 'admin'::app_role FROM auth.users u WHERE u.email = 'younismohamedyounis022@gmail.com'
ON CONFLICT DO NOTHING;

INSERT INTO public.user_roles (user_id, role)
SELECT u.id, 'crm_owner'::app_role FROM auth.users u WHERE u.email = 'younismohamedyounis022@gmail.com'
ON CONFLICT DO NOTHING;