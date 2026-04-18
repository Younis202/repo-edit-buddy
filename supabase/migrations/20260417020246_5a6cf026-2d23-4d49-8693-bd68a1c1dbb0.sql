-- Enable realtime for admin notifications so the bell icon updates live
ALTER TABLE public.admin_notifications REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.admin_notifications;