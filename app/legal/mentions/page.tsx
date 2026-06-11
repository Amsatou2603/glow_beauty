'use client';

import { motion } from 'framer-motion';
import { Building2, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function MentionsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
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
          <h1 className="font-display text-4xl font-bold text-foreground mb-2">
            Mentions Légales
          </h1>
          <p className="text-foreground/65">
            Informations légales sur Glow Beauty
          </p>
        </motion.div>

        {/* Content */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-frosted rounded-2xl p-8"
          >
            <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-3">
              <Building2 className="w-5 h-5 text-rose-500" />
              Éditeur du site
            </h2>
            <div className="text-foreground/70 space-y-2">
              <p><strong>Glow Beauty SAS</strong></p>
              <p>Capital social : 50 000 €</p>
              <p>SIRET : 123 456 789 00012</p>
              <p>RCS Paris B 123 456 789</p>
              <p>N° TVA intracommunautaire : FR 12 345 678 901</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-frosted rounded-2xl p-8"
          >
            <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-rose-500" />
              Siège social
            </h2>
            <div className="text-foreground/70 space-y-2">
              <p>12 Rue du Faubourg</p>
              <p>75008 Paris</p>
              <p>France</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-frosted rounded-2xl p-8"
          >
            <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-3">
              <Mail className="w-5 h-5 text-rose-500" />
              Contact
            </h2>
            <div className="text-foreground/70 space-y-2">
              <p>Email : hello@glowbeauty.fr</p>
              <p>Téléphone : +33 1 23 45 67 89</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-frosted rounded-2xl p-8"
          >
            <h2 className="font-display text-xl font-bold text-foreground mb-4">Hébergement</h2>
            <div className="text-foreground/70 space-y-2">
              <p><strong>Vercel Inc.</strong></p>
              <p>340 S Lemon Ave #4133</p>
              <p>Walnut, CA 91789, USA</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-frosted rounded-2xl p-8"
          >
            <h2 className="font-display text-xl font-bold text-foreground mb-4">Directeur de la publication</h2>
            <div className="text-foreground/70">
              <p>Marie Laurent</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
