-- Script pour trouver l'utilisateur avec email ndiayeamsatou26@gmail.com
SELECT id, email, created_at, raw_user_meta_data 
FROM auth.users 
WHERE email = 'ndiayeamsatou26@gmail.com';

-- Si trouvé, créer l'entrée dans public.users avec rôle admin
DO $$
DECLARE
  user_id UUID;
BEGIN
  SELECT id INTO user_id FROM auth.users WHERE email = 'ndiayeamsatou26@gmail.com';
  
  IF user_id IS NOT NULL THEN
    -- Supprimer l'entrée existante si elle existe
    DELETE FROM public.users WHERE id = user_id;
    
    -- Créer l'utilisateur avec rôle admin
    INSERT INTO public.users (id, email, full_name, role)
    VALUES (
      user_id,
      'ndiayeamsatou26@gmail.com',
      'Admin',
      'admin'
    );
    
    RAISE NOTICE 'Utilisateur ndiayeamsatou26@gmail.com promu en admin';
  ELSE
    RAISE NOTICE 'Utilisateur ndiayeamsatou26@gmail.com non trouvé dans auth.users';
  END IF;
END $$;

-- Vérifier le résultat
SELECT id, email, full_name, role FROM public.users WHERE email = 'ndiayeamsatou26@gmail.com';
