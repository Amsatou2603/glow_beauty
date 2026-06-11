-- Create policy for admin to view all products (including out of stock)
-- This policy allows admins to see all products regardless of stock status

DROP POLICY IF EXISTS "Admin can view all products" ON products;
CREATE POLICY "Admin can view all products" ON products
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );
