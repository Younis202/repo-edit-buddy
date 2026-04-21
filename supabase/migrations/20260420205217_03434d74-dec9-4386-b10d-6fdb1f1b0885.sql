INSERT INTO public.user_roles (user_id, role)
VALUES ('19a42b72-4f7e-4a72-827c-80afc2847218', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;