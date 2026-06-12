'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingBag } from 'lucide-react';
import { type Product } from '@/lib/store';

interface ProductPreviewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export function ProductPreviewModal({ product, isOpen, onClose, onAddToCart }: ProductPreviewModalProps) {
  if (!product) return null;

  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="glass-frosted rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="grid md:grid-cols-2 gap-8 p-8">
                {/* Image */}
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden glass-clear">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.is_new && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase"
                        style={{
                          background: 'rgba(244, 167, 195, 0.15)',
                          color: '#F4A7C3',
                        }}
                      >
                        Nouveau
                      </span>
                    )}
                    {product.is_bestseller && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase"
                        style={{
                          background: 'rgba(232, 0, 77, 0.15)',
                          color: '#E8004D',
                        }}
                      >
                        Best-seller
                      </span>
                    )}
                    {discount && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold text-white"
                        style={{ background: '#E8004D' }}
                      >
                        -{discount}%
                      </span>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col">
                  {/* Close button */}
                  <button
                    onClick={onClose}
                    className="self-end p-2 rounded-xl glass-frosted text-foreground/60 hover:text-foreground transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Brand */}
                  <p className="text-xs font-semibold tracking-widest uppercase text-foreground/40 mb-2">
                    {product.brand}
                  </p>

                  {/* Name */}
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    {product.name}
                  </h2>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'fill-amber-400 text-amber-400'
                              : i < product.rating
                              ? 'fill-amber-200 text-amber-200'
                              : 'text-foreground/15 fill-foreground/15'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-foreground/60">({product.review_count} avis)</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-3xl font-bold text-foreground">€{product.price}</span>
                    {product.original_price && (
                      <span className="text-lg text-foreground/35 line-through">€{product.original_price}</span>
                    )}
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-foreground mb-2">Description</h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Ingredients */}
                  {product.ingredients && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-foreground mb-2">Ingrédients</h3>
                      <p className="text-sm text-foreground/70 leading-relaxed">
                        {product.ingredients}
                      </p>
                    </div>
                  )}

                  {/* Add to cart button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onAddToCart(product);
                      onClose();
                    }}
                    className="mt-auto flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-semibold text-white transition-all"
                    style={{ background: '#E8004D' }}
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Ajouter au panier
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
