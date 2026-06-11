'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, ShoppingBag, Heart, MapPin, Settings, LogOut, ChevronRight, Sparkles, Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/components/auth-provider';
import { supabase } from '@/lib/supabase';
import { useEffect } from 'react';

export default function AccountPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [stats, setStats] = useState({ orders: 0, pending: 0, wishlist: 0 });
  const [lastOrder, setLastOrder] = useState<any>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;

      const [
        { count: ordersCount },
        { count: pendingCount },
        { count: wishlistCount },
        { data: lastOrders }
      ] = await Promise.all([
        supabase.from('orders').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('orders').select('*', { count: 'exact', head: true }).eq('user_id', user.id).in('status', ['pending', 'processing']),
        supabase.from('wishlist').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('orders').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(1)
      ]);

      setStats({
        orders: ordersCount || 0,
        pending: pendingCount || 0,
        wishlist: wishlistCount || 0,
      });

      if (lastOrders && lastOrders.length > 0) {
        setLastOrder(lastOrders[0]);
      }
    };

    fetchStats();
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  if (authLoading || !user) return <div className="min-h-screen pt-24 pb-16 px-4 flex justify-center"><Sparkles className="w-8 h-8 animate-spin text-rose-500" /></div>;

  const menuItems = [
    { id: 'home', label: 'Accueil', icon: Home, href: '/' },
    { id: 'profile', label: 'Mon profil', icon: User, href: '/account/profile' },
    { id: 'orders', label: 'Mes commandes', icon: ShoppingBag, href: '/account/orders' },
    { id: 'wishlist', label: 'Ma liste d\'envies', icon: Heart, href: '/account/wishlist' },
    { id: 'addresses', label: 'Mes adresses', icon: MapPin, href: '/account/addresses' },
    { id: 'settings', label: 'Paramètres', icon: Settings, href: '/account/settings' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-4xl font-bold text-foreground mb-2">
            Mon compte
          </h1>
          <p className="text-foreground/65">
            Gérez vos informations personnelles et vos commandes
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="glass-frosted rounded-2xl p-4 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl transition-all',
                    activeTab === item.id
                      ? 'bg-rose-500/10 text-rose-500'
                      : 'text-foreground/70 hover:bg-foreground/5 hover:text-foreground'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                </Link>
              ))}
              <div className="border-t border-foreground/10 my-2" />
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground/70 hover:bg-foreground/5 hover:text-rose-500 transition-all w-full"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Déconnexion</span>
              </button>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="glass-frosted rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #E8004D 0%, #F4A7C3 100%)' }}>
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    {user.user_metadata?.full_name || 'Utilisateur'}
                  </h2>
                  <p className="text-foreground/65">{user.email}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="glass-clear rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-gradient mb-1">{stats.orders}</div>
                  <div className="text-sm text-foreground/60">Commandes</div>
                </div>
                <div className="glass-clear rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-gradient mb-1">{stats.pending}</div>
                  <div className="text-sm text-foreground/60">En attente</div>
                </div>
                <div className="glass-clear rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-gradient mb-1">{stats.wishlist}</div>
                  <div className="text-sm text-foreground/60">Liste d'envies</div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-foreground/10">
                <h3 className="font-semibold text-foreground mb-4">Dernière commande</h3>
                {lastOrder ? (
                  <div className="glass-clear rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-medium text-foreground">Commande #{lastOrder.id.substring(0, 8)}</div>
                        <div className="text-sm text-foreground/60">{new Date(lastOrder.created_at).toLocaleDateString('fr-FR')}</div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500">
                        {lastOrder.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-foreground/60">Total</div>
                      <div className="font-semibold text-foreground">€{lastOrder.total.toFixed(2)}</div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-foreground/60">Aucune commande pour le moment.</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
