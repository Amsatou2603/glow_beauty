-- Script manuel pour promouvoir l'utilisateur connecté en admin
-- À exécuter dans le Supabase SQL Editor

-- 1. D'abord, vérifions si l'utilisateur existe dans la table users
SELECT id, email, full_name, role FROM public.users WHERE id = auth.uid();

-- 2. Si l'utilisateur n'existe pas, insérons-le avec les données de auth.users
INSERT INTO public.users (id, email, full_name, role)
SELECT 
  au.id,
  au.email,
  au.raw_user_meta_data->>'full_name',
  'admin'
FROM auth.users au
WHERE au.id = auth.uid()
AND NOT EXISTS (
  SELECT 1 FROM public.users WHERE id = auth.uid()
);

-- 3. Mettons à jour le rôle à admin pour l'utilisateur connecté
UPDATE public.users 
SET role = 'admin' 
WHERE id = auth.uid();

-- 4. Vérifions la mise à jour
SELECT id, email, full_name, role FROM public.users WHERE id = auth.uid();

-- Note: Après avoir exécuté ce script, déconnectez-vous et reconnectez-vous pour voir les changements
