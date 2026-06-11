'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, User, ArrowRight, Eye, EyeOff, Check } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Le nom est requis';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Vous devez accepter les conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError(null);
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName,
        },
      },
    });

    setLoading(false);

    if (error) {
      setGlobalError(error.message);
    } else {
      router.push('/account');
    }
  };

  const passwordStrength = formData.password ? [
    formData.password.length >= 8,
    /[a-z]/.test(formData.password),
    /[A-Z]/.test(formData.password),
    /[0-9]/.test(formData.password),
    /[^a-zA-Z0-9]/.test(formData.password),
  ] : [false, false, false, false, false];

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
              Créer un compte
            </h1>
            <p className="text-foreground/65">
              Rejoignez le cercle Glow Beauty
            </p>
          </div>

          {globalError && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-sm text-center">
              {globalError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full name */}
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">
                Nom complet
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Marie Dupont"
                  className={cn(
                    'w-full pl-12 pr-4 py-3.5 rounded-xl bg-background/50 dark:bg-background/30 border outline-none focus:border-rose-500/50 text-foreground placeholder:text-foreground/30 transition-colors',
                    errors.fullName ? 'border-rose-500/50' : 'border-foreground/10'
                  )}
                />
              </div>
              {errors.fullName && <p className="text-xs text-rose-500 mt-1">{errors.fullName}</p>}
            </div>

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
                  className={cn(
                    'w-full pl-12 pr-4 py-3.5 rounded-xl bg-background/50 dark:bg-background/30 border outline-none focus:border-rose-500/50 text-foreground placeholder:text-foreground/30 transition-colors',
                    errors.email ? 'border-rose-500/50' : 'border-foreground/10'
                  )}
                />
              </div>
              {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
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
                  className={cn(
                    'w-full pl-12 pr-12 py-3.5 rounded-xl bg-background/50 dark:bg-background/30 border outline-none focus:border-rose-500/50 text-foreground placeholder:text-foreground/30 transition-colors',
                    errors.password ? 'border-rose-500/50' : 'border-foreground/10'
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-rose-500 mt-1">{errors.password}</p>}
              
              {/* Password strength */}
              {formData.password && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1">
                    {passwordStrength.map((strength, i) => (
                      <div
                        key={i}
                        className={cn(
                          'h-1 flex-1 rounded-full transition-colors',
                          strength ? 'bg-rose-500' : 'bg-foreground/10'
                        )}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2 text-xs text-foreground/50">
                    <span className={passwordStrength[0] ? 'text-emerald-500' : ''}>8+ caractères</span>
                    <span className={passwordStrength[1] ? 'text-emerald-500' : ''}>Minuscule</span>
                    <span className={passwordStrength[2] ? 'text-emerald-500' : ''}>Majuscule</span>
                    <span className={passwordStrength[3] ? 'text-emerald-500' : ''}>Chiffre</span>
                    <span className={passwordStrength[4] ? 'text-emerald-500' : ''}>Spécial</span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  className={cn(
                    'w-full pl-12 pr-12 py-3.5 rounded-xl bg-background/50 dark:bg-background/30 border outline-none focus:border-rose-500/50 text-foreground placeholder:text-foreground/30 transition-colors',
                    errors.confirmPassword ? 'border-rose-500/50' : 'border-foreground/10'
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/60 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-xs text-rose-500 mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, acceptTerms: !formData.acceptTerms })}
                className={cn(
                  'w-5 h-5 rounded-md border flex items-center justify-center transition-colors mt-0.5',
                  formData.acceptTerms ? 'bg-rose-500 border-rose-500' : 'border-foreground/20'
                )}
              >
                {formData.acceptTerms && <Check className="w-3.5 h-3.5 text-white" />}
              </button>
              <label className="text-sm text-foreground/60">
                J'accepte les{' '}
                <Link href="/legal/privacy" className="text-foreground hover:text-foreground/80 underline">
                  conditions d'utilisation
                </Link>{' '}
                et la{' '}
                <Link href="/legal/privacy" className="text-foreground hover:text-foreground/80 underline">
                  politique de confidentialité
                </Link>
              </label>
            </div>
            {errors.acceptTerms && <p className="text-xs text-rose-500 mt-1">{errors.acceptTerms}</p>}

            {/* Submit button */}
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(232, 0, 77, 0.50)' }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-semibold text-white transition-all"
              style={{ background: '#E8004D' }}
            >
              {loading ? 'Création...' : 'Créer mon compte'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-foreground/10" />
            <span className="text-xs text-foreground/40">ou</span>
            <div className="flex-1 h-px bg-foreground/10" />
          </div>

          {/* Login link */}
          <p className="text-center text-sm text-foreground/60">
            Déjà inscrit ?{' '}
            <Link href="/auth/login" className="font-semibold text-foreground hover:text-foreground/80 transition-colors">
              Se connecter
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
