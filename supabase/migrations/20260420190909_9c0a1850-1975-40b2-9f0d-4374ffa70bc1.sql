DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'product_gender') THEN
    CREATE TYPE public.product_gender AS ENUM ('men', 'women', 'unisex');
  END IF;
END $$;

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS gender public.product_gender NOT NULL DEFAULT 'unisex';

CREATE INDEX IF NOT EXISTS idx_products_gender ON public.products(gender);