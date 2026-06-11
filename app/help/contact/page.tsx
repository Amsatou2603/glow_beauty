'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Implement contact form submission
    setTimeout(() => {
      setLoading(false);
      alert('Message envoyé avec succès !');
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-frosted text-sm font-medium text-foreground hover:text-foreground/80 transition-colors mb-4"
            >
              ← Retour à l'accueil
            </motion.button>
          </Link>
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">
            Contact
          </h1>
          <p className="text-foreground/65 max-w-2xl mx-auto">
            Une question ? Notre équipe est à votre disposition pour vous répondre.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div className="glass-frosted rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #E8004D 0%, #F4A7C3 100%)' }}>
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <p className="text-foreground/60">hello@glowbeauty.fr</p>
                </div>
              </div>
            </div>

            <div className="glass-frosted rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #E8004D 0%, #F4A7C3 100%)' }}>
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Téléphone</h3>
                  <p className="text-foreground/60">+33 1 23 45 67 89</p>
                </div>
              </div>
            </div>

            <div className="glass-frosted rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #E8004D 0%, #F4A7C3 100%)' }}>
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Adresse</h3>
                  <p className="text-foreground/60">12 Rue du Faubourg, 75008 Paris</p>
                </div>
              </div>
            </div>

            <div className="glass-frosted rounded-2xl p-6">
              <h3 className="font-semibold text-foreground mb-3">Horaires d'ouverture</h3>
              <div className="text-foreground/70 space-y-1 text-sm">
                <p>Lundi - Vendredi : 9h00 - 18h00</p>
                <p>Samedi : 10h00 - 17h00</p>
                <p>Dimanche : Fermé</p>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-frosted rounded-2xl p-8"
          >
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              Envoyez-nous un message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Votre nom"
                  className="w-full px-4 py-3 rounded-xl bg-background/50 dark:bg-background/30 border border-foreground/10 outline-none focus:border-rose-500/50 text-foreground placeholder:text-foreground/30 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="votre@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-background/50 dark:bg-background/30 border border-foreground/10 outline-none focus:border-rose-500/50 text-foreground placeholder:text-foreground/30 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Sujet
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Sujet de votre message"
                  className="w-full px-4 py-3 rounded-xl bg-background/50 dark:bg-background/30 border border-foreground/10 outline-none focus:border-rose-500/50 text-foreground placeholder:text-foreground/30 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Votre message..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-background/50 dark:bg-background/30 border border-foreground/10 outline-none focus:border-rose-500/50 text-foreground placeholder:text-foreground/30 transition-colors resize-none"
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(232, 0, 77, 0.50)' }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-semibold text-white transition-all"
                style={{ background: '#E8004D' }}
              >
                {loading ? 'Envoi...' : 'Envoyer le message'}
                {!loading && <Send className="w-4 h-4" />}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
