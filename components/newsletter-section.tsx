'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export function NewsletterSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative glass-blur rounded-[2.5rem] overflow-hidden p-10 sm:p-14 text-center"
      >
        {/* Background blobs */}
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full blob"
          style={{ background: 'radial-gradient(circle, rgba(232, 0, 77, 0.12) 0%, transparent 70%)', animation: 'blob 12s ease-in-out infinite' }} />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full blob"
          style={{ background: 'radial-gradient(circle, rgba(244, 167, 195, 0.10) 0%, transparent 70%)', animation: 'blob 15s ease-in-out infinite reverse' }} />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider glass-clear text-rose-glow mb-5">
              <Sparkles className="w-3 h-3" />
              Newsletter exclusive
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="font-display text-3xl sm:text-4xl font-bold text-foreground/90 mb-4"
          >
            Rejoignez le cercle{' '}
            <span className="text-gradient">Glow Beauty</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-foreground/65 text-base mb-8 max-w-md mx-auto"
          >
            Accès anticipé aux nouveautés, offres exclusives, conseils beauté personnalisés et rituels de saison. -15% sur votre première commande.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              id="newsletter-email"
              name="email"
              placeholder="Votre adresse email"
              className="flex-1 px-5 py-3.5 rounded-full bg-white/10 dark:bg-white/10 border border-white/20 dark:border-white/20 backdrop-blur-sm outline-none focus:border-rose-glow text-sm text-foreground placeholder:text-foreground/35 transition-colors"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(232, 0, 77, 0.50)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white flex-shrink-0"
              style={{
                background: '#E8004D',
              }}
            >
              S&apos;inscrire
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="text-xs text-foreground/35 mt-4"
          >
            En vous inscrivant, vous acceptez notre politique de confidentialité. Désinscription à tout moment.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
