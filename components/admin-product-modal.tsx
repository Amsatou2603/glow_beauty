'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { type Product } from '@/lib/store';

interface AdminProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onSuccess: () => void;
}

export function AdminProductModal({ isOpen, onClose, product, onSuccess }: AdminProductModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    original_price: '',
    category: 'skincare',
    description: '',
    image_url: '',
    rating: '4.5',
    review_count: '0',
    is_new: false,
    is_bestseller: false,
    in_stock: true,
    ingredients: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        brand: product.brand,
        price: product.price.toString(),
        original_price: product.original_price?.toString() || '',
        category: product.category,
        description: product.description,
        image_url: product.image_url,
        rating: product.rating.toString(),
        review_count: product.review_count.toString(),
        is_new: product.is_new || false,
        is_bestseller: product.is_bestseller || false,
        in_stock: product.in_stock !== undefined ? product.in_stock : true,
        ingredients: product.ingredients || '',
      });
    } else {
      setFormData({
        name: '',
        brand: '',
        price: '',
        original_price: '',
        category: 'skincare',
        description: '',
        image_url: '',
        rating: '4.5',
        review_count: '0',
        is_new: false,
        is_bestseller: false,
        in_stock: true,
        ingredients: '',
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const productData = {
        name: formData.name,
        brand: formData.brand,
        price: parseFloat(formData.price),
        original_price: formData.original_price ? parseFloat(formData.original_price) : null,
        category: formData.category,
        description: formData.description,
        image_url: formData.image_url,
        rating: parseFloat(formData.rating),
        review_count: parseInt(formData.review_count),
        is_new: formData.is_new,
        is_bestseller: formData.is_bestseller,
        in_stock: formData.in_stock,
        ingredients: formData.ingredients || null,
      };

      let error;
      if (product) {
        const result = await supabase.from('products').update(productData).eq('id', product.id);
        error = result.error;
      } else {
        const result = await supabase.from('products').insert(productData);
        error = result.error;
      }

      if (error) throw error;

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="glass-frosted rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold text-foreground">
              {product ? 'Modifier le produit' : 'Ajouter un produit'}
            </h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 rounded-lg glass-frosted text-foreground hover:bg-foreground/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          {error && (
            <div className="mb-4 p-4 rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/20 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Nom du produit *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-background/50 dark:bg-background/30 border border-foreground/10 outline-none focus:border-rose-500/50 text-foreground transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Marque *
                </label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-background/50 dark:bg-background/30 border border-foreground/10 outline-none focus:border-rose-500/50 text-foreground transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Prix *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-background/50 dark:bg-background/30 border border-foreground/10 outline-none focus:border-rose-500/50 text-foreground transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Prix original
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.original_price}
                  onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-background/50 dark:bg-background/30 border border-foreground/10 outline-none focus:border-rose-500/50 text-foreground transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">
                Catégorie *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl bg-background/50 dark:bg-background/30 border border-foreground/10 outline-none focus:border-rose-500/50 text-foreground transition-colors"
              >
                <option value="skincare">Skincare</option>
                <option value="makeup">Makeup</option>
                <option value="fragrance">Parfum</option>
                <option value="wellness">Wellness</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-background/50 dark:bg-background/30 border border-foreground/10 outline-none focus:border-rose-500/50 text-foreground transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">
                URL de l'image *
              </label>
              <input
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl bg-background/50 dark:bg-background/30 border border-foreground/10 outline-none focus:border-rose-500/50 text-foreground transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">
                Ingrédients
              </label>
              <textarea
                value={formData.ingredients}
                onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                rows={2}
                className="w-full px-4 py-3 rounded-xl bg-background/50 dark:bg-background/30 border border-foreground/10 outline-none focus:border-rose-500/50 text-foreground transition-colors resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Note
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-background/50 dark:bg-background/30 border border-foreground/10 outline-none focus:border-rose-500/50 text-foreground transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Nombre d'avis
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.review_count}
                  onChange={(e) => setFormData({ ...formData, review_count: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-background/50 dark:bg-background/30 border border-foreground/10 outline-none focus:border-rose-500/50 text-foreground transition-colors"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_new}
                  onChange={(e) => setFormData({ ...formData, is_new: e.target.checked })}
                  className="w-5 h-5 rounded border-foreground/20 text-rose-500 focus:ring-rose-500"
                />
                <span className="text-sm text-foreground">Nouveau</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_bestseller}
                  onChange={(e) => setFormData({ ...formData, is_bestseller: e.target.checked })}
                  className="w-5 h-5 rounded border-foreground/20 text-rose-500 focus:ring-rose-500"
                />
                <span className="text-sm text-foreground">Best-seller</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.in_stock}
                  onChange={(e) => setFormData({ ...formData, in_stock: e.target.checked })}
                  className="w-5 h-5 rounded border-foreground/20 text-rose-500 focus:ring-rose-500"
                />
                <span className="text-sm text-foreground">En stock</span>
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 rounded-full text-sm font-semibold glass-frosted text-foreground hover:bg-foreground/10 transition-colors"
              >
                Annuler
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all disabled:opacity-50"
                style={{ background: '#E8004D' }}
              >
                <Save className="w-4 h-4" />
                {saving ? 'Enregistrement...' : product ? 'Modifier' : 'Ajouter'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
