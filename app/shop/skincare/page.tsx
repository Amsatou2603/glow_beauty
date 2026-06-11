'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import { ProductCard } from '@/components/product-card';

// Mock data - will be replaced with Supabase data
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
    id: '3',
    name: 'Gel Nettoyant Doux',
    brand: 'Glow Beauty',
    price: 45,
    image_url: 'https://images.pexels.com/photos/3762453/pexels-photo-3762453.jpeg?auto=compress&cs=tinysrgb&w=700&h=875&dpr=2',
    category: 'skincare',
    description: 'Gel nettoyant doux qui respecte l\'équilibre de la peau',
    rating: 4.7,
    review_count: 156,
    is_new: false,
    is_bestseller: false,
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
    id: '6',
    name: 'Lotion Tonique Équilibrante',
    brand: 'Glow Beauty',
    price: 55,
    image_url: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=700&h=875&dpr=2',
    category: 'skincare',
    description: 'Lotion tonique qui rééquilibre le pH de la peau',
    rating: 4.5,
    review_count: 87,
    is_new: false,
    is_bestseller: false,
  },
];

export default function SkincarePage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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
            Skincare
          </h1>
          <p className="text-foreground/65 max-w-2xl">
            Découvrez notre collection de soins de la peau formulés avec des ingrédients naturels et précieux pour révéler votre éclat naturel.
          </p>
        </motion.div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
