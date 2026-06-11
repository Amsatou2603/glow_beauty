'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero-section';
import { ProductsSection } from '@/components/products-section';
import { FeaturesSection } from '@/components/features-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { NewsletterSection } from '@/components/newsletter-section';
import { Footer } from '@/components/footer';
import dynamic from 'next/dynamic';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/lib/store';

const CartDrawer = dynamic(() => import('@/components/cart-drawer').then(mod => ({ default: mod.CartDrawer })), {
  ssr: false,
  loading: () => null,
});

async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('in_stock', true)
    .order('created_at', { ascending: false });

  if (error || !data) return [];
  return data as Product[];
}

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      router.push('/onboarding');
    }

    async function loadProducts() {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    }
    loadProducts();
  }, [router]);

  if (loading) {
    return null;
  }

  return (
    <main className="min-h-screen relative z-10">
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
