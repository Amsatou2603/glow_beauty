
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  original_price NUMERIC(10, 2),
  category TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  rating NUMERIC(3, 2) DEFAULT 4.5,
  review_count INTEGER DEFAULT 0,
  badge TEXT,
  ingredients TEXT,
  is_new BOOLEAN DEFAULT false,
  is_bestseller BOOLEAN DEFAULT false,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Anyone (including unauthenticated visitors) may read the product catalog.
-- INSERT / UPDATE / DELETE are intentionally omitted: the service_role key
-- (used only server-side) bypasses RLS, so backend admin operations still work
-- while no authenticated end-user can mutate products.
DROP POLICY IF EXISTS "select_products" ON products;
CREATE POLICY "select_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

INSERT INTO products (name, brand, price, original_price, category, description, image_url, rating, review_count, is_new, is_bestseller) VALUES
  ('Sérum Éclat Rose & Acide Hyaluronique', 'Glow Lab', 89.00, NULL, 'skincare', 'Un sérum léger aux extraits de rose bulgare et acide hyaluronique triple action. Hydratation intense et éclat repulpé dès 7 jours.', 'https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?auto=compress&cs=tinysrgb&w=500&h=666&dpr=2', 4.9, 1243, false, true),
  ('Crème Velours Anti-Âge', 'Glow Lab', 125.00, 159.00, 'skincare', 'Formule riche aux peptides de soie et beurre de karité. Nourrit en profondeur, réduit les rides et restaure la fermeté.', 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=500&h=666&dpr=2', 4.8, 892, true, false),
  ('Huile Précieuse Visage & Corps', 'Lumière d''Or', 78.00, NULL, 'skincare', 'Blend précieux d''huiles de rosehip, jojoba et neroli. Raffermit, illumine et nourrit la peau pour un éclat satiné.', 'https://images.pexels.com/photos/6621374/pexels-photo-6621374.jpeg?auto=compress&cs=tinysrgb&w=500&h=666&dpr=2', 4.7, 567, false, true),
  ('Fond de Teint Peau Parfaite', 'Rose Atelier', 52.00, NULL, 'makeup', 'Formule légère buildable, SPF 30. Couvre naturellement les imperfections tout en respectant la microbiome cutanée.', 'https://images.pexels.com/photos/3373746/pexels-photo-3373746.jpeg?auto=compress&cs=tinysrgb&w=500&h=666&dpr=2', 4.6, 2150, true, false),
  ('Palette Regard Enchanté', 'Rose Atelier', 65.00, 85.00, 'makeup', '12 teintes soigneusement sélectionnées allant du nude pêche au bordeaux profond. Finitions mate, satin et scintillant.', 'https://images.pexels.com/photos/2639947/pexels-photo-2639947.jpeg?auto=compress&cs=tinysrgb&w=500&h=666&dpr=2', 4.8, 3421, false, true),
  ('Masque Détox Argile Rose', 'Pure Ritual', 45.00, NULL, 'skincare', 'L''argile rose kaolinite et l''extrait de charbon actif éliminent les impuretés en douceur. Pores affinés, teint unifié.', 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=500&h=666&dpr=2', 4.5, 789, false, false),
  ('Parfum Fleur de Sakura', 'Velours', 168.00, NULL, 'fragrance', 'Notes de tête : fleur de cerisier, bergamote. Coeur : pivoine, musc blanc. Fond : bois de santal, vanille bourbon.', 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=500&h=666&dpr=2', 4.9, 634, true, true),
  ('Baume Lèvres Nourissant', 'Glow Lab', 28.00, NULL, 'skincare', 'Formule concentrée au beurre de mangue, vitamine E et huile de rose musquée. Lèvres repulpées et hydratées 24h.', 'https://images.pexels.com/photos/3621234/pexels-photo-3621234.jpeg?auto=compress&cs=tinysrgb&w=500&h=666&dpr=2', 4.7, 1876, false, true),
  ('Contour des Yeux Régénérant', 'Lumière d''Or', 95.00, 119.00, 'skincare', 'Formule triple action : repulpe, décongestionne et illumine. Café vert et rétinol encapsulé pour résultats visibles.', 'https://images.pexels.com/photos/4202928/pexels-photo-4202928.jpeg?auto=compress&cs=tinysrgb&w=500&h=666&dpr=2', 4.8, 445, true, false),
  ('Rouge à Lèvres Satiné', 'Rose Atelier', 38.00, NULL, 'makeup', 'Formule crémeuse infusée à la vitamine E et à l''huile de jojoba. 8h de tenue, couleur intense, lèvres préservées.', 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=500&h=666&dpr=2', 4.6, 2034, false, false),
  ('Gommage Corps Sucre de Canne', 'Pure Ritual', 42.00, NULL, 'wellness', 'Exfoliant doux au sucre de canne et à l''huile d''amande douce. Peau veloutée, douce et lumineuse après chaque utilisation.', 'https://images.pexels.com/photos/6621329/pexels-photo-6621329.jpeg?auto=compress&cs=tinysrgb&w=500&h=666&dpr=2', 4.7, 923, false, false),
  ('Brume Visage Hydratante', 'Glow Lab', 35.00, NULL, 'skincare', 'Spray hydratant à l''eau florale de rose de Grasse. Fixe le maquillage et rafraîchit instantanément. Idéale toute la journée.', 'https://images.pexels.com/photos/3762453/pexels-photo-3762453.jpeg?auto=compress&cs=tinysrgb&w=500&h=666&dpr=2', 4.5, 1567, true, false);
