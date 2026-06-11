'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ProductCard } from '@/components/product-card';

const PRODUCTS = [
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
  {
    id: '12',
    name: 'Eau de Parfum Bois Mystique',
    brand: 'Glow Beauty',
    price: 165,
    image_url: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=700&h=875&dpr=2',
    category: 'fragrance',
    description: 'Parfum boisé aux notes de santal et de cèdre',
    rating: 4.8,
    review_count: 198,
    is_new: false,
    is_bestseller: true,
  },
  {
    id: '13',
    name: 'Eau de Toilette Fraîcheur',
    brand: 'Glow Beauty',
    price: 95,
    image_url: 'https://images.pexels.com/photos/3762453/pexels-photo-3762453.jpeg?auto=compress&cs=tinysrgb&w=700&h=875&dpr=2',
    category: 'fragrance',
    description: 'Eau de toilette fraîche aux notes agrumées',
    rating: 4.7,
    review_count: 156,
    is_new: false,
    is_bestseller: false,
  },
];

export default function FragrancePage() {
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
            Parfums
          </h1>
          <p className="text-foreground/65 max-w-2xl">
            Découvrez notre collection de parfums raffinés pour une signature olfactive unique.
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
