'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ProductCard } from '@/components/product-card';

const PRODUCTS = [
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
    id: '4',
    name: 'Masque Détox Argile',
    brand: 'Glow Beauty',
    price: 65,
    image_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=700&h=875&dpr=2',
    category: 'skincare',
    description: 'Masque purifiant à l\'argile pour éliminer les impuretés',
    rating: 4.6,
    review_count: 98,
    is_new: true,
    is_bestseller: false,
  },
  {
    id: '7',
    name: 'Rouge à Lèvres Velours',
    brand: 'Glow Beauty',
    price: 35,
    image_url: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=700&h=875&dpr=2',
    category: 'makeup',
    description: 'Rouge à lèvres longue tenue à la texture veloutée',
    rating: 4.7,
    review_count: 312,
    is_new: true,
    is_bestseller: true,
  },
  {
    id: '10',
    name: 'Mascara Volume Extrême',
    brand: 'Glow Beauty',
    price: 28,
    image_url: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=700&h=875&dpr=2',
    category: 'makeup',
    description: 'Mascara pour un volume et une longueur exceptionnels',
    rating: 4.5,
    review_count: 156,
    is_new: true,
    is_bestseller: false,
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
];

export default function NewPage() {
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
            Nouveautés
          </h1>
          <p className="text-foreground/65 max-w-2xl">
            Découvrez nos derniers lancements et nos nouveautés exclusives.
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
