-- Re-point each seeded product's image gallery to the new branded image keys.
-- The frontend's resolveImage() maps `branded:<slug>` -> the new bundled hero photo.
-- We use the branded hero as positions 0, 2, 3 and a male lookbook lifestyle shot conceptually
-- (still served from the same branded slug so each product retains a consistent identity).

UPDATE public.products SET images = to_jsonb(ARRAY[
  'branded:' || slug,
  'branded:' || slug,
  'branded:' || slug,
  'branded:' || slug
]::text[])
WHERE slug IN (
  'oud-royal','ward-taifi','misk-aswad','amber-nights',
  'bukhoor-elite','zaafaran-gold','jasmine-blanc','oud-supreme',
  'misk-tahara','sandal-hind','dehn-ward','layali-sharqiya'
);