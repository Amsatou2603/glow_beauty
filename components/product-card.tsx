'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Star, Eye } from 'lucide-react';
import { useCartStore, type Product } from '@/lib/store';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setOpen);

  const handleAddToCart = () => {
    addItem(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
    setTimeout(() => setCartOpen(true), 200);
  };

  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.34, 1.56, 0.64, 1] }}
      className="glass-card rounded-3xl overflow-hidden group relative flex flex-col"
    >
      {/* Image container */}
      <div className="relative overflow-hidden rounded-2xl m-3 mb-0">
        <div className="product-image-glass aspect-[3/4] relative overflow-hidden">
          <motion.img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            loading="lazy"
          />
          {/* Overlay on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-t from-rose-950/30 via-transparent to-transparent"
          />

          {/* Quick view button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-2 glass rounded-xl text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            Aperçu rapide
          </motion.button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.is_new && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, delay: 0.2 + index * 0.07 }}
              className="badge-glass px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase text-emerald-600 dark:text-emerald-400"
            >
              Nouveau
            </motion.span>
          )}
          {product.is_bestseller && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, delay: 0.25 + index * 0.07 }}
              className="badge-glass px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase text-rose-500 dark:text-rose-400"
            >
              Best-seller
            </motion.span>
          )}
          {discount && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #f43f5e, #db2777)' }}>
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.85 }}
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-3 right-3 w-8 h-8 glass-button rounded-xl flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={wishlisted ? 'filled' : 'empty'}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Heart className={cn('w-4 h-4 transition-colors', wishlisted ? 'fill-rose-500 text-rose-500' : 'text-foreground/60')} />
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 pt-3">
        <p className="text-[11px] font-semibold tracking-widest uppercase text-foreground/40 mb-1">
          {product.brand}
        </p>
        <h3 className="font-semibold text-sm leading-snug text-foreground/90 mb-1.5 line-clamp-2 flex-1">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'w-3 h-3',
                  i < Math.floor(product.rating)
                    ? 'fill-amber-400 text-amber-400'
                    : i < product.rating
                    ? 'fill-amber-200 text-amber-200'
                    : 'text-foreground/15 fill-foreground/15'
                )}
              />
            ))}
          </div>
          <span className="text-[11px] text-foreground/45">({product.review_count})</span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-gradient">€{product.price}</span>
            {product.original_price && (
              <span className="text-xs text-foreground/35 line-through">€{product.original_price}</span>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.93 }}
            onClick={handleAddToCart}
            className={cn(
              'flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-300',
              addedToCart
                ? 'text-white scale-105'
                : 'text-white'
            )}
            style={{
              background: addedToCart
                ? 'linear-gradient(135deg, #10b981, #059669)'
                : 'linear-gradient(135deg, #f472b6 0%, #f43f5e 100%)',
              boxShadow: addedToCart
                ? '0 4px 16px rgba(16, 185, 129, 0.35)'
                : '0 4px 16px rgba(244, 63, 94, 0.3)',
            }}
          >
            <AnimatePresence mode="wait">
              {addedToCart ? (
                <motion.span
                  key="added"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex items-center gap-1"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Ajouté
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex items-center gap-1"
                >
                  <ShoppingBag className="w-3 h-3" />
                  Ajouter
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
