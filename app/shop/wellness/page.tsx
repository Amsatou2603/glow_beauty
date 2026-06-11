'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ProductCard } from '@/components/product-card';

const PRODUCTS = [
  {
    id: '14',
    name: 'Huile de Massage Relaxante',
    brand: 'Glow Beauty',
    price: 75,
    image_url: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=700&h=875&dpr=2',
    category: 'wellness',
    description: 'Huile de massage aux huiles essentielles pour une relaxation profonde',
    rating: 4.8,
    review_count: 167,
    is_new: true,
    is_bestseller: true,
  },
  {
    id: '15',
    name: 'Bain Moussant Lavande',
    brand: 'Glow Beauty',
    price: 35,
    image_url: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=700&h=875&dpr=2',
    category: 'wellness',
    description: 'Sels de bain moussants à la lavande pour un moment de détente',
    rating: 4.7,
    review_count: 234,
    is_new: false,
    is_bestseller: true,
  },
  {
    id: '16',
    name: 'Bougie Parfumée Zen',
    brand: 'Glow Beauty',
    price: 45,
    image_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=700&h=875&dpr=2',
    category: 'wellness',
    description: 'Bougie parfumée aux notes de bois de santal et vanille',
    rating: 4.6,
    review_count: 145,
    is_new: false,
    is_bestseller: false,
  },
];

export default function WellnessPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-frosted text-sm font-medium text-foreground hover:text-foreground/80 transition-colors mb-4"
            >
              ← Retour à l'accueil
            </motion.button>
          </Link>
          <h1 className="font-display text-4xl font-bold text-foreground mb-2">
            Wellness
          </h1>
          <p className="text-foreground/65 max-w-2xl">
            Découvrez notre collection de produits bien-être pour des moments de détente et de relaxation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
