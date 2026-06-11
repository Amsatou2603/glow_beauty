-- Create cart_items table
CREATE TABLE IF NOT EXISTS public.cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Enable RLS
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Users can view own cart" ON public.cart_items;
CREATE POLICY "Users can view own cart" ON public.cart_items
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert into own cart" ON public.cart_items;
CREATE POLICY "Users can insert into own cart" ON public.cart_items
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own cart" ON public.cart_items;
CREATE POLICY "Users can update own cart" ON public.cart_items
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete from own cart" ON public.cart_items;
CREATE POLICY "Users can delete from own cart" ON public.cart_items
  FOR DELETE USING (auth.uid() = user_id);

-- Trigger for updated_at
DROP TRIGGER IF EXISTS update_cart_items_updated_at ON public.cart_items;
CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON public.cart_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
