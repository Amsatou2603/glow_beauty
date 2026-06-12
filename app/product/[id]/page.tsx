'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { ShoppingBag, Heart, Star, Edit, Trash2, ArrowLeft, Check, X } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { useDjangoAuth } from '@/components/django-auth-provider';
import { api } from '@/lib/api';
import { AdminProductModal } from '@/components/admin-product-modal';
import Link from 'next/link';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const { isAdmin, token } = useDjangoAuth();
  
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setOpen);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await api.getProduct(productId);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        router.push('/');
      }
    };

    fetchProduct();
  }, [productId, router]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
    setTimeout(() => setCartOpen(true), 200);
  };

  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return;
    
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
      const response = await fetch(`${API_BASE}/products/${productId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du produit');
      }

      alert('Produit supprimé avec succès');
      router.push('/');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Erreur lors de la suppression du produit');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
        <p className="text-foreground/60">Produit non trouvé</p>
      </div>
    );
  }

  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : null;

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-frosted text-sm font-medium text-foreground hover:text-foreground/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="glass-frosted rounded-2xl p-4">
              <div className="aspect-[3/4] rounded-xl overflow-hidden relative">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.is_new && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-rose-500/20 text-rose-500">
                      Nouveau
                    </span>
                  )}
                  {product.is_bestseller && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-rose-500/20 text-rose-500">
                      Best-seller
                    </span>
                  )}
                  {discount && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-rose-500">
                      -{discount}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="glass-frosted rounded-2xl p-8">
              {/* Admin Actions */}
              {isAdmin && (
                <div className="flex gap-2 mb-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowEditModal(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl glass-frosted text-rose-500 hover:bg-rose-500/20 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Modifier
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDelete}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl glass-frosted text-rose-500 hover:bg-rose-500/20 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Supprimer
                  </motion.button>
                </div>
              )}

              <p className="text-sm font-semibold tracking-widest uppercase text-foreground/40 mb-2">
                {product.brand}
              </p>
              <h1 className="font-display text-3xl font-bold text-foreground mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-foreground/15 fill-foreground/15'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-foreground/60">({product.review_count} avis)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-foreground">€{product.price}</span>
                {product.original_price && (
                  <span className="text-xl text-foreground/35 line-through">€{product.original_price}</span>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-2">Description</h3>
                <p className="text-foreground/70 leading-relaxed">{product.description}</p>
              </div>

              {/* Ingredients */}
              {product.ingredients && (
                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-2">Ingrédients</h3>
                  <p className="text-foreground/70 leading-relaxed">{product.ingredients}</p>
                </div>
              )}

              {/* Stock Status */}
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  {product.in_stock !== false ? (
                    <>
                      <Check className="w-5 h-5 text-emerald-500" />
                      <span className="text-emerald-500 font-medium">En stock</span>
                    </>
                  ) : (
                    <>
                      <X className="w-5 h-5 text-rose-500" />
                      <span className="text-rose-500 font-medium">Rupture de stock</span>
                    </>
                  )}
                </div>
              </div>

              {/* Add to Cart */}
              {product.in_stock !== false && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-full text-lg font-semibold text-white transition-all disabled:opacity-50"
                  style={{ background: addedToCart ? '#10b981' : '#E8004D' }}
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-5 h-5" />
                      Ajouté au panier
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      Ajouter au panier
                    </>
                  )}
                </motion.button>
              )}

              {/* Wishlist */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setWishlisted(!wishlisted)}
                className="w-full mt-3 flex items-center justify-center gap-3 px-6 py-4 rounded-full text-lg font-semibold glass-frosted text-foreground hover:bg-foreground/10 transition-colors"
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                {wishlisted ? 'Dans ma liste d\'envies' : 'Ajouter à ma liste d\'envies'}
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Edit Modal */}
        {isAdmin && (
          <AdminProductModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            product={product}
            onSuccess={() => {
              setShowEditModal(false);
              // Refresh product data
              api.getProduct(productId).then(data => {
                if (data) setProduct(data);
              });
            }}
          />
        )}
      </div>
    </div>
  );
}
