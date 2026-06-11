'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);
    
    if (error) {
      setError(error.message);
    } else {
      router.push('/account');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full blob"
        style={{ background: 'radial-gradient(circle, rgba(232, 0, 77, 0.15) 0%, transparent 70%)', animation: 'blob 15s ease-in-out infinite' }} />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full blob"
        style={{ background: 'radial-gradient(circle, rgba(244, 167, 195, 0.12) 0%, transparent 70%)', animation: 'blob 18s ease-in-out infinite reverse' }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="flex justify-center mb-8"
        >
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #E8004D 0%, #F4A7C3 100%)', boxShadow: '0 0 24px rgba(232, 0, 77, 0.40)' }}>
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight">
              Glow <span className="italic" style={{ color: '#F4A7C3' }}>Beauty</span>
            </span>
          </Link>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="glass-frosted rounded-[2rem] p-8 sm:p-10"
        >
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Bienvenue
            </h1>
            <p className="text-foreground/65">
              Connectez-vous pour accéder à votre compte
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="votre@email.com"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-background/50 dark:bg-background/30 border border-foreground/10 outline-none focus:border-rose-500/50 text-foreground placeholder:text-foreground/30 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-background/50 dark:bg-background/30 border border-foreground/10 outline-none focus:border-rose-500/50 text-foreground placeholder:text-foreground/30 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="flex justify-end">
              <Link href="/auth/forgot-password" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                Mot de passe oublié ?
              </Link>
            </div>

            {/* Submit button */}
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(232, 0, 77, 0.50)' }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-semibold text-white transition-all"
              style={{ background: '#E8004D' }}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-foreground/10" />
            <span className="text-xs text-foreground/40">ou</span>
            <div className="flex-1 h-px bg-foreground/10" />
          </div>

          {/* Register link */}
          <p className="text-center text-sm text-foreground/60">
            Pas encore de compte ?{' '}
            <Link href="/auth/register" className="font-semibold text-foreground hover:text-foreground/80 transition-colors">
              Créer un compte
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
