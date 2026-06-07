'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { ProductCard } from '@/components/product-card';
import { type Product } from '@/lib/store';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  { id: 'all', label: 'Tous' },
  { id: 'skincare', label: 'Skincare' },
  { id: 'makeup', label: 'Makeup' },
  { id: 'fragrance', label: 'Parfum' },
  { id: 'wellness', label: 'Wellness' },
];

interface ProductsSectionProps {
  products: Product[];
}

export function ProductsSection({ products }: ProductsSectionProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <section id="products" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase badge-glass text-rose-500 dark:text-rose-400 mb-4">
          <Sparkles className="w-3 h-3" />
          Notre sélection
        </span>
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground/90 mb-4">
          Rituels de beauté{' '}
          <span className="text-gradient">d&apos;exception</span>
        </h2>
        <p className="text-foreground/55 text-lg max-w-xl mx-auto">
          Des formules méticuleusement élaborées avec les ingrédients les plus précieux du monde.
        </p>
      </motion.div>

      {/* Category filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex items-center justify-center gap-2 mb-10 flex-wrap"
      >
        {CATEGORIES.map((cat) => (
          <motion.button
            key={cat.id}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              'relative px-5 py-2 rounded-2xl text-sm font-semibold transition-all duration-300',
              activeCategory === cat.id
                ? 'text-white'
                : 'glass-button text-foreground/65 hover:text-foreground'
            )}
            style={activeCategory === cat.id ? {
              background: 'linear-gradient(135deg, #f472b6 0%, #f43f5e 100%)',
              boxShadow: '0 6px 20px rgba(244, 63, 94, 0.35)',
            } : {}}
          >
            {cat.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Products grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
