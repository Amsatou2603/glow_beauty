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
    id: '2',
    name: 'Crème Velours Nuit',
    brand: 'Glow Beauty',
    price: 125,
    image_url: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=700&h=875&dpr=2',
    category: 'skincare',
    description: 'Crème nourrissante régénératrice pour une peau douce au réveil',
    rating: 4.9,
    review_count: 189,
    is_new: false,
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
    id: '8',
    name: 'Fond de Teint Lumineux',
    brand: 'Glow Beauty',
    price: 55,
    image_url: 'https://images.pexels.com/photos/3762453/pexels-photo-3762453.jpeg?auto=compress&cs=tinysrgb&w=700&h=875&dpr=2',
    category: 'makeup',
    description: 'Fond de teint hydratant pour un teint unifié et lumineux',
    rating: 4.8,
    review_count: 245,
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

export default function BestsellersPage() {
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
            Best-sellers
          </h1>
          <p className="text-foreground/65 max-w-2xl">
            Découvrez les produits préférés de nos clientes.
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
