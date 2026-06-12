'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock, XCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useDjangoAuth } from '@/components/django-auth-provider';
import { api } from '@/lib/api';
import { useEffect, useState } from 'react';



const STATUS_ICONS = {
  delivered: CheckCircle,
  shipped: Truck,
  processing: Clock,
  cancelled: XCircle,
};

const STATUS_COLORS = {
  delivered: 'text-emerald-500',
  shipped: 'text-blue-500',
  processing: 'text-amber-500',
  cancelled: 'text-rose-500',
};

export default function OrdersPage() {
  const { user, loading: authLoading, token } = useDjangoAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user || !token) return;
      
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
        const response = await fetch(`${API_BASE}/orders/`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
      setLoading(false);
    };

    if (!authLoading) {
      if (user) {
        fetchOrders();
      } else {
        setLoading(false);
      }
    }
  }, [user, authLoading, token]);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'delivered': return 'Livrée';
      case 'shipped': return 'Expédiée';
      case 'processing': return 'En préparation';
      case 'cancelled': return 'Annulée';
      default: return 'En attente';
    }
  };

  if (authLoading || loading) return <div className="min-h-screen pt-24 pb-16 px-4 flex justify-center"><Sparkles className="w-8 h-8 animate-spin text-rose-500" /></div>;
  
  if (!user) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 flex justify-center">
        <p className="text-foreground/60">Veuillez vous connecter pour voir vos commandes.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/account">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-frosted text-sm font-medium text-foreground hover:text-foreground/80 transition-colors mb-4"
            >
              ← Retour à mon compte
            </motion.button>
          </Link>
          <h1 className="font-display text-4xl font-bold text-foreground mb-2">
            Mes Commandes
          </h1>
          <p className="text-foreground/65">
            Suivez l'état de vos commandes et accédez à leur historique.
          </p>
        </motion.div>

        {/* Orders list */}
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="glass-frosted rounded-2xl p-8 text-center">
              <Package className="w-12 h-12 text-foreground/20 mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Aucune commande</h3>
              <p className="text-foreground/60 mb-6">Vous n'avez pas encore passé de commande.</p>
              <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all" style={{ background: '#E8004D' }}>
                Découvrir nos produits
              </Link>
            </div>
          ) : (
            orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-frosted rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #E8004D 0%, #F4A7C3 100%)' }}>
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Commande #{order.id.substring(0, 8)}</h3>
                      <p className="text-sm text-foreground/60">{new Date(order.created_at).toLocaleDateString('fr-FR')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`flex items-center gap-1.5 text-sm font-medium ${STATUS_COLORS[order.status as keyof typeof STATUS_COLORS] || 'text-foreground/60'}`}>
                      {React.createElement(STATUS_ICONS[order.status as keyof typeof STATUS_ICONS] || Clock, { className: 'w-4 h-4' })}
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-foreground/10">
                  <div className="text-sm text-foreground/60">
                    {order.items?.length || 0} article{order.items?.length > 1 ? 's' : ''}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="font-semibold text-foreground">€{Number(order.total).toFixed(2)}</div>
                    <Link
                      href={`/account/orders/${order.id}`}
                      className="text-sm font-semibold text-rose-500 hover:text-rose-600 transition-colors"
                    >
                      Voir détails
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
