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
import { AdminProductModal } from '@/components/admin-product-modal';
import { ConfirmModal } from '@/components/confirm-modal';
import dynamic from 'next/dynamic';
import { api } from '@/lib/api';
import type { Product } from '@/lib/store';
import { useDjangoAuth } from '@/components/django-auth-provider';

const CartDrawer = dynamic(() => import('@/components/cart-drawer').then(mod => ({ default: mod.CartDrawer })), {
  ssr: false,
  loading: () => null,
});

async function getProducts(): Promise<Product[]> {
  try {
    const data = await api.getProducts();
    return data.filter((p: Product) => p.in_stock);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default function Home() {
  const router = useRouter();
  const { isAdmin, token } = useDjangoAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  const handleEditProduct = (product: Product) => {
    setEditProduct(product);
    setShowEditModal(true);
  };

  const handleDeleteProduct = (productId: string) => {
    setDeleteProductId(productId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteProductId) return;

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
      const response = await fetch(`${API_BASE}/products/${deleteProductId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du produit');
      }

      // Refresh products
      const data = await getProducts();
      setProducts(data);
      setShowDeleteModal(false);
      setDeleteProductId(null);
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Erreur lors de la suppression du produit');
    }
  };

  if (loading) {
    return null;
  }

  return (
    <main className="min-h-screen relative z-10">
      <Navbar />
      <HeroSection />
      <ProductsSection 
        products={products} 
        onEditProduct={isAdmin ? handleEditProduct : undefined}
        onDeleteProduct={isAdmin ? handleDeleteProduct : undefined}
      />
      <FeaturesSection />
      <TestimonialsSection />
      <NewsletterSection />
      <Footer />
      <CartDrawer />
      
      {/* Edit Modal */}
      {isAdmin && (
        <AdminProductModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditProduct(null);
          }}
          product={editProduct}
          onSuccess={async () => {
            setShowEditModal(false);
            setEditProduct(null);
            // Refresh products
            const data = await getProducts();
            setProducts(data);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeleteProductId(null);
        }}
        onConfirm={confirmDelete}
        title="Supprimer le produit"
        message="Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible."
        confirmText="Supprimer"
        cancelText="Annuler"
        variant="danger"
      />
    </main>
  );
}
