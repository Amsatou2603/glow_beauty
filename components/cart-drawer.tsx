'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export function CartDrawer() {
  const { items, isOpen, setOpen, removeItem, updateQuantity, total, itemCount } = useCartStore();
  const count = itemCount();
  const cartTotal = total();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 35 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-[420px] flex flex-col"
          >
            <div className="flex flex-col h-full glass-navbar m-3 rounded-[2rem] overflow-hidden shadow-float dark:shadow-float-dark">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/20 dark:border-white/8">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #f472b6, #f43f5e)', boxShadow: '0 4px 12px rgba(244,63,94,0.3)' }}>
                    <ShoppingBag className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-foreground/90">Mon Panier</h2>
                    <p className="text-xs text-foreground/45">{count} article{count !== 1 ? 's' : ''}</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setOpen(false)}
                  className="glass-button w-8 h-8 rounded-xl flex items-center justify-center text-foreground/60 hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                <AnimatePresence initial={false}>
                  {items.length === 0 ? (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center h-64 text-center gap-4"
                    >
                      <div className="w-20 h-20 rounded-3xl glass-card flex items-center justify-center">
                        <ShoppingBag className="w-8 h-8 text-foreground/25" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground/60">Votre panier est vide</p>
                        <p className="text-xs text-foreground/35 mt-1">Ajoutez des produits pour commencer</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setOpen(false)}
                        className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                        style={{ background: 'linear-gradient(135deg, #f472b6, #f43f5e)', boxShadow: '0 4px 16px rgba(244,63,94,0.3)' }}
                      >
                        Explorer la boutique
                      </motion.button>
                    </motion.div>
                  ) : (
                    items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="glass-card rounded-2xl p-3 flex gap-3"
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 product-image-glass">
                          <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] text-foreground/40 uppercase tracking-wider">{item.brand}</p>
                          <p className="text-xs font-semibold text-foreground/85 mt-0.5 line-clamp-2 leading-tight">{item.name}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm font-bold text-gradient">€{(item.price * item.quantity).toFixed(2)}</span>
                            <div className="flex items-center gap-1">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-6 h-6 glass-button rounded-lg flex items-center justify-center text-foreground/60 hover:text-foreground"
                              >
                                <Minus className="w-3 h-3" />
                              </motion.button>
                              <span className="text-xs font-bold text-foreground/80 w-5 text-center">{item.quantity}</span>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-6 h-6 glass-button rounded-lg flex items-center justify-center text-foreground/60 hover:text-foreground"
                              >
                                <Plus className="w-3 h-3" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => removeItem(item.id)}
                                className="w-6 h-6 rounded-lg flex items-center justify-center text-rose-400/60 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 ml-0.5 transition-colors"
                              >
                                <Trash2 className="w-3 h-3" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="px-4 pb-4 pt-2 border-t border-white/20 dark:border-white/8 space-y-3">
                  {/* Free shipping bar */}
                  <div className="glass-card rounded-2xl px-4 py-3">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-foreground/55">
                        {cartTotal >= 80 ? (
                          <span className="text-emerald-600 dark:text-emerald-400 font-medium">Livraison offerte !</span>
                        ) : (
                          <>Plus que <span className="font-semibold text-foreground/80">€{(80 - cartTotal).toFixed(2)}</span> pour la livraison offerte</>
                        )}
                      </span>
                      <span className="text-foreground/40">€80</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-foreground/8 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (cartTotal / 80) * 100)}%` }}
                        transition={{ duration: 0.5 }}
                        className="h-full rounded-full"
                        style={{ background: 'linear-gradient(90deg, #f472b6, #f43f5e)' }}
                      />
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex items-center justify-between px-1">
                    <span className="text-sm text-foreground/60">Total</span>
                    <span className="text-xl font-bold text-gradient">€{cartTotal.toFixed(2)}</span>
                  </div>

                  {/* Checkout */}
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: '0 12px 32px rgba(244,63,94,0.45)' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-semibold text-white"
                    style={{ background: 'linear-gradient(135deg, #f472b6 0%, #f43f5e 60%, #db2777 100%)', boxShadow: '0 6px 20px rgba(244,63,94,0.4), inset 0 1px 0 rgba(255,255,255,0.25)' }}
                  >
                    Passer commande
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
