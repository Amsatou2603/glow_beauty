'use client';

import { motion } from 'framer-motion';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { ProductCard } from '@/components/product-card';

const WISHLIST_PRODUCTS = [
  {
    id: '1',
    name: 'Sérum Éclat Hyaluronique',
    brand: 'Glow Beauty',
    price: 89,
    original_price: 110,
    image_url: 'https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?auto=compress&cs=tinysrgb&w=700&h=875&dpr=2',
    category: 'skincare',
    description: 'Sérum hydratant à l\'acide hyaluronique pour une peau repulpée et éclatante',
    rating: 4.8,
    review_count: 234,
    is_new: true,
    is_bestseller: true,
  },
  {
    id: '5',
    name: 'Huile Précieuse Rose',
    brand: 'Glow Beauty',
    price: 95,
    image_url: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=700&h=875&dpr=2',
    category: 'skincare',
    description: 'Huile précieuse à l\'extrait de rose pour nourrir et sublimer la peau',
    rating: 4.8,
    review_count: 210,
    is_new: false,
    is_bestseller: true,
  },
  {
    id: '11',
    name: 'Parfum Rose Éternelle',
    brand: 'Glow Beauty',
    price: 145,
    image_url: 'https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?auto=compress&cs=tinysrgb&w=700&h=875&dpr=2',
    category: 'fragrance',
    description: 'Parfum floral délicat aux notes de rose et de pivoine',
    rating: 4.9,
    review_count: 287,
    is_new: true,
    is_bestseller: true,
  },
];

export default function WishlistPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/account">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-frosted text-sm font-medium text-foreground hover:text-foreground/80 transition-colors mb-4"
            >
              ← Retour à mon compte
            </motion.button>
          </Link>
          <h1 className="font-display text-4xl font-bold text-foreground mb-2">
            Ma Liste d'Envies
          </h1>
          <p className="text-foreground/65">
            {WISHLIST_PRODUCTS.length} article{WISHLIST_PRODUCTS.length > 1 ? 's' : ''} dans votre liste
          </p>
        </motion.div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WISHLIST_PRODUCTS.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Empty state */}
        {WISHLIST_PRODUCTS.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-frosted rounded-2xl p-12 text-center"
          >
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: 'linear-gradient(135deg, #E8004D 0%, #F4A7C3 100%)' }}>
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Votre liste est vide
            </h2>
            <p className="text-foreground/65 mb-6">
              Ajoutez des produits à votre liste d'envies pour les retrouver plus tard.
            </p>
            <Link
              href="/shop/new"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all"
              style={{ background: '#E8004D' }}
            >
              Découvrir les nouveautés
              <ShoppingBag className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
