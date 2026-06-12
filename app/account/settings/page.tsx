'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Bell, Shield, CreditCard, Trash2, Package, Users, ShoppingBag, BarChart3, Edit, Plus, X, Save } from 'lucide-react';
import Link from 'next/link';
import { useDjangoAuth } from '@/components/django-auth-provider';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { type Product } from '@/lib/store';
import { AdminProductModal } from '@/components/admin-product-modal';
import { ConfirmModal } from '@/components/confirm-modal';

export default function SettingsPage() {
  const router = useRouter();
  const { user, token, loading: authLoading, isAdmin } = useDjangoAuth();
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
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const loadAdminData = async () => {
      if (!isAdmin || !token) return;
      try {
        // Load admin data using Django API
        const productsData = await api.getProducts();
        setProducts(productsData);
        setStats({ users: 0, orders: 0, products: productsData.length, revenue: 0 });
      } catch (error) {
        console.error('Error loading admin data:', error);
      }
    };
    loadAdminData();
  }, [isAdmin, token]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      setFormData(prev => ({
        ...prev,
        fullName: user.first_name && user.last_name 
          ? `${user.first_name} ${user.last_name}` 
          : user.username || '',
        email: user.email || '',
        phone: user.phone || '',
      }));
    };
    
    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user || !token) return;
    setSaving(true);
    setMessage({ text: '', type: '' });

    try {
      // Update user profile using Django API
      const nameParts = formData.fullName.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/auth/profile/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          phone: formData.phone,
        }),
      });

      if (response.ok) {
        setMessage({ text: 'Profil mis à jour avec succès', type: 'success' });
      } else {
        setMessage({ text: 'Erreur lors de la mise à jour', type: 'error' });
      }
    } catch (error: any) {
      setMessage({ text: error.message || 'Une erreur est survenue', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    setDeleteProductId(productId);
    setShowDeleteModal(true);
  };

  const confirmDeleteProduct = async () => {
    if (!deleteProductId || !token) return;
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/products/${deleteProductId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${token}`,
        },
      });

      if (response.ok) {
        setMessage({ text: 'Produit supprimé avec succès', type: 'success' });
        // Reload products
        const productsData = await api.getProducts();
        setProducts(productsData);
        setShowDeleteModal(false);
        setDeleteProductId(null);
      } else {
        setMessage({ text: 'Erreur lors de la suppression du produit', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Erreur lors de la suppression du produit', type: 'error' });
    }
  };

  if (authLoading || !user) return <div className="min-h-screen pt-24 pb-16 px-4 flex justify-center"><Sparkles className="w-8 h-8 animate-spin text-rose-500" /></div>;

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'security', label: 'Sécurité', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'payment', label: 'Paiement', icon: CreditCard },
  ];

  if (isAdmin) {
    tabs.push(
      { id: 'admin-dashboard', label: 'Admin Dashboard', icon: BarChart3 },
      { id: 'admin-products', label: 'Produits', icon: Package }
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

          {isAdmin && activeTab === 'admin-dashboard' && (
            <AdminDashboard stats={stats} />
          )}

          {isAdmin && activeTab === 'admin-products' && (
            <AdminProducts 
              products={products} 
              onEdit={setEditingProduct}
              onDelete={handleDeleteProduct}
              onAdd={() => { setEditingProduct(null); setShowProductModal(true); }}
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
            // Reload products
            api.getProducts().then(setProducts);
          }}
        />

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setDeleteProductId(null);
          }}
          onConfirm={confirmDeleteProduct}
          title="Supprimer le produit"
          message="Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible."
          confirmText="Supprimer"
          cancelText="Annuler"
          variant="danger"
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
        {users.map((user: any) => (
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
