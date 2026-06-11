'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Bell, Shield, CreditCard, Trash2, Package, Users, ShoppingBag, BarChart3, Edit, Plus, X, Save } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/components/auth-provider';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { isAdmin, getAllUsers, updateUserRole, deleteUser, getAllOrders, updateOrderStatus, getStats, type AdminUser } from '@/lib/admin';
import { type Product } from '@/lib/store';
import { AdminProductModal } from '@/components/admin-product-modal';

export default function SettingsPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [is_admin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  // Admin state
  const [stats, setStats] = useState({ users: 0, orders: 0, products: 0, revenue: 0 });
  const [allUsers, setAllUsers] = useState<AdminUser[]>([]);
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const checkAdmin = async () => {
      const adminStatus = await isAdmin();
      setIsAdmin(adminStatus);
      if (adminStatus) {
        loadAdminData();
      }
    };
    checkAdmin();
  }, [user]);

  const loadAdminData = async () => {
    const [statsData, usersData, ordersData, productsData] = await Promise.all([
      getStats(),
      getAllUsers(),
      getAllOrders(),
      supabase.from('products').select('*').order('created_at', { ascending: false })
    ]);
    setStats(statsData);
    setAllUsers(usersData);
    setAllOrders(ordersData);
    if (productsData.data) {
      setProducts(productsData.data as Product[]);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      setFormData(prev => ({
        ...prev,
        fullName: user.user_metadata?.full_name || '',
        email: user.email || '',
      }));

      const { data } = await supabase
        .from('profiles')
        .select('phone')
        .eq('id', user.id)
        .single();
        
      if (data) {
        setFormData(prev => ({
          ...prev,
          phone: data.phone || '',
        }));
      }
    };
    
    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setMessage({ text: '', type: '' });

    try {
      // Update Auth Metadata
      const { error: authError } = await supabase.auth.updateUser({
        data: { full_name: formData.fullName }
      });

      if (authError) throw authError;

      // Update Profile table
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ phone: formData.phone })
        .eq('id', user.id);

      if (profileError) throw profileError;

      setMessage({ text: 'Profil mis à jour avec succès', type: 'success' });
    } catch (error: any) {
      setMessage({ text: error.message || 'Une erreur est survenue', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateUserRole = async (userId: string, role: 'user' | 'admin') => {
    const success = await updateUserRole(userId, role);
    if (success) {
      setMessage({ text: 'Rôle mis à jour avec succès', type: 'success' });
      loadAdminData();
    } else {
      setMessage({ text: 'Erreur lors de la mise à jour du rôle', type: 'error' });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return;
    const success = await deleteUser(userId);
    if (success) {
      setMessage({ text: 'Utilisateur supprimé avec succès', type: 'success' });
      loadAdminData();
    } else {
      setMessage({ text: 'Erreur lors de la suppression de l\'utilisateur', type: 'error' });
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    const success = await updateOrderStatus(orderId, status);
    if (success) {
      setMessage({ text: 'Statut de commande mis à jour', type: 'success' });
      loadAdminData();
    } else {
      setMessage({ text: 'Erreur lors de la mise à jour du statut', type: 'error' });
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return;
    const { error } = await supabase.from('products').delete().eq('id', productId);
    if (error) {
      setMessage({ text: 'Erreur lors de la suppression du produit', type: 'error' });
    } else {
      setMessage({ text: 'Produit supprimé avec succès', type: 'success' });
      loadAdminData();
    }
  };

  if (authLoading || !user) return <div className="min-h-screen pt-24 pb-16 px-4 flex justify-center"><Sparkles className="w-8 h-8 animate-spin text-rose-500" /></div>;

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'security', label: 'Sécurité', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'payment', label: 'Paiement', icon: CreditCard },
  ];

  if (is_admin) {
    tabs.push(
      { id: 'admin-dashboard', label: 'Admin Dashboard', icon: BarChart3 },
      { id: 'admin-products', label: 'Produits', icon: Package },
      { id: 'admin-users', label: 'Utilisateurs', icon: Users },
      { id: 'admin-orders', label: 'Commandes', icon: ShoppingBag }
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
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
            Paramètres
          </h1>
          <p className="text-foreground/65">
            Gérez vos informations personnelles et vos préférences.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2 mb-6 flex-wrap"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'glass-frosted text-foreground/70 hover:text-foreground'
                }`}
                style={activeTab === tab.id ? {
                  background: 'linear-gradient(135deg, #E8004D, #F4A7C3)',
                  boxShadow: '0 4px 16px rgba(232, 0, 77, 0.3)',
                } : {}}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-frosted rounded-2xl p-6"
            >
              <h2 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                <User className="w-5 h-5 text-rose-500" />
                Informations personnelles
              </h2>
              {message.text && (
                <div className={`mb-6 p-4 rounded-xl text-sm ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'}`}>
                  {message.text}
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background/50 dark:bg-background/30 border border-foreground/10 outline-none focus:border-rose-500/50 text-foreground transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full px-4 py-3 rounded-xl bg-background/50 dark:bg-background/30 border border-foreground/10 outline-none text-foreground/50 transition-colors cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background/50 dark:bg-background/30 border border-foreground/10 outline-none focus:border-rose-500/50 text-foreground transition-colors"
                  />
                </div>
                <button 
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-3 rounded-full text-sm font-semibold text-white transition-all disabled:opacity-50"
                  style={{ background: '#E8004D' }}
                >
                  {saving ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-frosted rounded-2xl p-6"
            >
              <h2 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Lock className="w-5 h-5 text-rose-500" />
                Sécurité
              </h2>
              <div className="space-y-4">
                <Link
                  href="/auth/forgot-password"
                  className="flex items-center justify-between p-4 glass-clear rounded-xl hover:bg-foreground/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-foreground/60" />
                    <span className="text-foreground">Changer le mot de passe</span>
                  </div>
                </Link>
                <Link
                  href="/auth/2fa"
                  className="flex items-center justify-between p-4 glass-clear rounded-xl hover:bg-foreground/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-foreground/60" />
                    <span className="text-foreground">Authentification à deux facteurs</span>
                  </div>
                </Link>
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div
              key="notifications"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-frosted rounded-2xl p-6"
            >
              <h2 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Bell className="w-5 h-5 text-rose-500" />
                Notifications
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 glass-clear rounded-xl">
                  <div>
                    <p className="font-medium text-foreground">Email marketing</p>
                    <p className="text-sm text-foreground/60">Recevoir nos offres et nouveautés</p>
                  </div>
                  <button className="w-12 h-6 rounded-full bg-rose-500 relative">
                    <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" />
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 glass-clear rounded-xl">
                  <div>
                    <p className="font-medium text-foreground">Suivi de commande</p>
                    <p className="text-sm text-foreground/60">Notifications sur l'état de vos commandes</p>
                  </div>
                  <button className="w-12 h-6 rounded-full bg-rose-500 relative">
                    <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'payment' && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-frosted rounded-2xl p-6"
            >
              <h2 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-rose-500" />
                Moyens de paiement
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 glass-clear rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="text-foreground">•••• 4242</div>
                    <span className="text-xs glass-clear px-2 py-1 rounded-full text-foreground/60">Visa</span>
                  </div>
                  <span className="text-xs text-emerald-500">Par défaut</span>
                </div>
                <button className="w-full p-4 glass-clear rounded-xl text-foreground hover:bg-foreground/5 transition-colors">
                  + Ajouter un moyen de paiement
                </button>
              </div>
            </motion.div>
          )}

          {is_admin && activeTab === 'admin-dashboard' && (
            <AdminDashboard stats={stats} />
          )}

          {is_admin && activeTab === 'admin-products' && (
            <AdminProducts 
              products={products} 
              onEdit={setEditingProduct}
              onDelete={handleDeleteProduct}
              onAdd={() => { setEditingProduct(null); setShowProductModal(true); }}
              onRefresh={loadAdminData}
            />
          )}

          {is_admin && activeTab === 'admin-users' && (
            <AdminUsers 
              users={allUsers} 
              onUpdateRole={handleUpdateUserRole}
              onDeleteUser={handleDeleteUser}
              onRefresh={loadAdminData}
            />
          )}

          {is_admin && activeTab === 'admin-orders' && (
            <AdminOrders 
              orders={allOrders} 
              onUpdateStatus={handleUpdateOrderStatus}
              onRefresh={loadAdminData}
            />
          )}
        </AnimatePresence>

        {/* Product Modal */}
        <AdminProductModal
          isOpen={showProductModal}
          onClose={() => setShowProductModal(false)}
          product={editingProduct}
          onSuccess={() => {
            setShowProductModal(false);
            loadAdminData();
          }}
        />
      </div>
    </div>
  );
}

function AdminDashboard({ stats }: { stats: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-frosted rounded-2xl p-6"
    >
      <h2 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-3">
        <BarChart3 className="w-5 h-5 text-rose-500" />
        Tableau de bord Admin
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Utilisateurs" value={stats.users} icon={Users} color="text-blue-500" />
        <StatCard label="Commandes" value={stats.orders} icon={ShoppingBag} color="text-emerald-500" />
        <StatCard label="Produits" value={stats.products} icon={Package} color="text-purple-500" />
        <StatCard label="Revenus" value={`€${stats.revenue.toFixed(2)}`} icon={CreditCard} color="text-rose-500" />
      </div>
    </motion.div>
  );
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: string | number; icon: any; color: string }) {
  return (
    <div className="glass-clear rounded-xl p-4">
      <div className="flex items-center gap-3 mb-2">
        <Icon className={`w-5 h-5 ${color}`} />
        <span className="text-sm text-foreground/60">{label}</span>
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
    </div>
  );
}

function AdminProducts({ products, onEdit, onDelete, onAdd, onRefresh }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-frosted rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-3">
          <Package className="w-5 h-5 text-rose-500" />
          Gestion des produits
        </h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all"
          style={{ background: '#E8004D' }}
        >
          <Plus className="w-4 h-4" />
          Ajouter un produit
        </motion.button>
      </div>
      <div className="space-y-3">
        {products.map((product: Product) => (
          <div key={product.id} className="flex items-center justify-between p-4 glass-clear rounded-xl">
            <div className="flex items-center gap-4">
              <img src={product.image_url} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
              <div>
                <p className="font-medium text-foreground">{product.name}</p>
                <p className="text-sm text-foreground/60">{product.brand} • €{product.price}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onEdit(product)}
                className="p-2 rounded-lg glass-frosted text-rose-500 hover:bg-rose-500/20 transition-colors"
              >
                <Edit className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDelete(product.id)}
                className="p-2 rounded-lg glass-frosted text-rose-500 hover:bg-rose-500/20 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function AdminUsers({ users, onUpdateRole, onDeleteUser, onRefresh }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-frosted rounded-2xl p-6"
    >
      <h2 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-3">
        <Users className="w-5 h-5 text-rose-500" />
        Gestion des utilisateurs
      </h2>
      <div className="space-y-3">
        {users.map((user: AdminUser) => (
          <div key={user.id} className="flex items-center justify-between p-4 glass-clear rounded-xl">
            <div>
              <p className="font-medium text-foreground">{user.full_name || user.email}</p>
              <p className="text-sm text-foreground/60">{user.email}</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={user.role}
                onChange={(e) => onUpdateRole(user.id, e.target.value as 'user' | 'admin')}
                className="px-3 py-1 rounded-lg glass-frosted text-sm text-foreground outline-none"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDeleteUser(user.id)}
                className="p-2 rounded-lg glass-frosted text-rose-500 hover:bg-rose-500/20 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function AdminOrders({ orders, onUpdateStatus, onRefresh }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-frosted rounded-2xl p-6"
    >
      <h2 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-3">
        <ShoppingBag className="w-5 h-5 text-rose-500" />
        Gestion des commandes
      </h2>
      <div className="space-y-3">
        {orders.map((order: any) => (
          <div key={order.id} className="flex items-center justify-between p-4 glass-clear rounded-xl">
            <div>
              <p className="font-medium text-foreground">Commande #{order.id.slice(0, 8)}</p>
              <p className="text-sm text-foreground/60">{order.user?.email} • €{order.total}</p>
            </div>
            <select
              value={order.status}
              onChange={(e) => onUpdateStatus(order.id, e.target.value)}
              className="px-3 py-1 rounded-lg glass-frosted text-sm text-foreground outline-none"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
