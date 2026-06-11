-- Script pour vérifier votre rôle actuel dans la base de données
-- Exécutez ceci dans le Supabase SQL Editor

-- Vérifier si vous êtes dans la table users
SELECT id, email, full_name, role FROM public.users WHERE id = auth.uid();

-- Si rien ne s'affiche, vous n'êtes pas dans la table users
-- Dans ce cas, exécutez d'abord:

INSERT INTO public.users (id, email, full_name, role)
SELECT 
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'full_name', 'Admin'),
  'admin'
FROM auth.users au
WHERE au.id = auth.uid()
AND NOT EXISTS (
  SELECT 1 FROM public.users WHERE id = auth.uid()
);

-- Puis mettez à jour votre rôle
UPDATE public.users 
SET role = 'admin' 
WHERE id = auth.uid();

-- Vérifiez à nouveau
SELECT id, email, full_name, role FROM public.users WHERE id = auth.uid();
