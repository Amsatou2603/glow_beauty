-- Script manuel pour créer un admin via email
-- À exécuter dans le Supabase SQL Editor (pas via migration)

-- Remplacez 'votre@email.com' par votre vrai email
-- Exemple: 'ndiayeamsatou26@gmail.com'

DO $$
DECLARE
  user_email TEXT := 'votre@email.com';  -- REMPLACEZ CECI
  user_id UUID;
BEGIN
  -- Récupérer l'ID de l'utilisateur depuis auth.users
  SELECT id INTO user_id FROM auth.users WHERE email = user_email;
  
  IF user_id IS NULL THEN
    RAISE EXCEPTION 'Utilisateur avec email % non trouvé dans auth.users', user_email;
  END IF;
  
  -- Supprimer l'entrée existante si elle existe
  DELETE FROM public.users WHERE id = user_id;
  
  -- Créer l'utilisateur avec rôle admin
  INSERT INTO public.users (id, email, full_name, role)
  VALUES (
    user_id,
    user_email,
    'Admin',
    'admin'
  );
  
  RAISE NOTICE 'Utilisateur % créé avec succès comme admin', user_email;
  
  -- Vérifier
  RAISE NOTICE 'Vérification:';
  PERFORM * FROM public.users WHERE id = user_id;
END $$;

-- Vérifier le résultat
SELECT id, email, full_name, role FROM public.users WHERE email = 'votre@email.com';
