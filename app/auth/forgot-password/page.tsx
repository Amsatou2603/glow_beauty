'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Mail, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Implement Supabase password reset
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
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
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Link href="/auth/login" className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Retour à la connexion
          </Link>
        </motion.div>

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
          {!sent ? (
            <>
              <div className="text-center mb-8">
                <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                  Mot de passe oublié ?
                </h1>
                <p className="text-foreground/65">
                  Entrez votre email pour recevoir un lien de réinitialisation
                </p>
              </div>

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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-background/50 dark:bg-background/30 border border-foreground/10 outline-none focus:border-rose-500/50 text-foreground placeholder:text-foreground/30 transition-colors"
                      required
                    />
                  </div>
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
                  {loading ? 'Envoi...' : 'Envoyer le lien'}
                  {!loading && <ArrowRight className="w-4 h-4" />}
                </motion.button>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-emerald-500" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                Email envoyé !
              </h2>
              <p className="text-foreground/65 mb-6">
                Un lien de réinitialisation a été envoyé à {email}
              </p>
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-foreground/80 transition-colors"
              >
                Retour à la connexion
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
