-- Clean up legacy AssetWise template tables that are not used in Shazaya project
DROP TABLE IF EXISTS public.asset_assignments CASCADE;
DROP TABLE IF EXISTS public.assets CASCADE;
DROP TABLE IF EXISTS public.asset_categories CASCADE;
DROP TABLE IF EXISTS public.employees CASCADE;
DROP TYPE IF EXISTS public.asset_condition CASCADE;