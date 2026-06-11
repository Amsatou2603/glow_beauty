-- Script pour forcer la création de l'utilisateur admin
-- Exécutez ceci dans le Supabase SQL Editor

-- 1. D'abord, voyons ce qu'il y a dans auth.users
SELECT id, email, raw_user_meta_data FROM auth.users WHERE id = auth.uid();

-- 2. Supprimons l'entrée existante si elle existe (pour éviter les conflits)
DELETE FROM public.users WHERE id = auth.uid();

-- 3. Créons l'utilisateur avec rôle admin
INSERT INTO public.users (id, email, full_name, role)
SELECT 
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'full_name', 'Admin'),
  'admin'
FROM auth.users au
WHERE au.id = auth.uid();

-- 4. Vérifions que ça a marché
SELECT id, email, full_name, role FROM public.users WHERE id = auth.uid();

-- 5. Si toujours rien, essayons avec votre email spécifique (remplacez VOTRE_EMAIL)
-- Décommentez et modifiez la ligne ci-dessous avec votre email réel:
-- DELETE FROM public.users WHERE email = 'votre@email.com';
-- INSERT INTO public.users (id, email, full_name, role)
-- SELECT id, email, 'Admin', 'admin' FROM auth.users WHERE email = 'votre@email.com';
-- SELECT id, email, full_name, role FROM public.users WHERE email = 'votre@email.com';
