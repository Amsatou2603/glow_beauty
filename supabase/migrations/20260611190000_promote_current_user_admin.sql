-- Promote the currently authenticated user to admin role
-- Run this after connecting to your database with your user account

-- First, let's check if the user exists in the users table
-- This will insert the user if they don't exist yet
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

-- Then update the role to admin for the current user
UPDATE public.users 
SET role = 'admin' 
WHERE id = auth.uid();

-- Verify the update
SELECT id, email, full_name, role FROM public.users WHERE id = auth.uid();
