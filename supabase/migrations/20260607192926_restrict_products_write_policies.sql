-- Drop the overly permissive write policies.
-- Products are a read-only catalog for all users; mutations are done
-- exclusively by the service_role (which bypasses RLS), not by authenticated users.
DROP POLICY IF EXISTS "insert_products" ON products;
DROP POLICY IF EXISTS "update_products" ON products;
DROP POLICY IF EXISTS "delete_products" ON products;
