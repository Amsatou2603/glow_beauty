'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Bell, Shield, CreditCard, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/components/auth-provider';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, authLoading, router]);

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

  if (authLoading || !user) return <div className="min-h-screen pt-24 pb-16 px-4 flex justify-center"><Sparkles className="w-8 h-8 animate-spin text-rose-500" /></div>;

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

        {/* Settings sections */}
        <div className="space-y-6">
          {/* Personal info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
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

          {/* Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
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

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
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

          {/* Payment methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
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

          {/* Danger zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-frosted rounded-2xl p-6 border border-rose-500/20"
          >
            <h2 className="font-display text-xl font-bold text-rose-500 mb-6 flex items-center gap-3">
              <Trash2 className="w-5 h-5" />
              Zone de danger
            </h2>
            <div className="space-y-4">
              <button className="w-full p-4 glass-clear rounded-xl text-rose-500 hover:bg-rose-500/10 transition-colors">
                Supprimer mon compte
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
