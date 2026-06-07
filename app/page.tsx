import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero-section';
import { ProductsSection } from '@/components/products-section';
import { FeaturesSection } from '@/components/features-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { NewsletterSection } from '@/components/newsletter-section';
import { Footer } from '@/components/footer';
import { CartDrawer } from '@/components/cart-drawer';
import { getSupabase } from '@/lib/supabase';
import type { Product } from '@/lib/store';

async function getProducts(): Promise<Product[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('in_stock', true)
    .order('created_at', { ascending: false });

  if (error || !data) return [];
  return data as Product[];
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-mesh-light">
      <Navbar />
      <HeroSection />
      <ProductsSection products={products} />
      <FeaturesSection />
      <TestimonialsSection />
      <NewsletterSection />
      <Footer />
      <CartDrawer />
    </main>
  );
}
