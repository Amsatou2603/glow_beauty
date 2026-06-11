'use client';

import { motion } from 'framer-motion';
import { Handshake, Globe, Heart } from 'lucide-react';
import Link from 'next/link';

const PARTNERS = [
  {
    name: 'L\'Oréal',
    category: 'Innovation',
    description: 'Partenariat pour la recherche et développement de nouvelles formules.',
  },
  {
    name: 'WWF',
    category: 'Environnement',
    description: 'Engagement pour la protection de la biodiversité et des écosystèmes.',
  },
  {
    name: 'UNICEF',
    category: 'Social',
    description: 'Programme de dons pour l\'éducation des enfants dans les pays producteurs.',
  },
];

export default function PartnersPage() {
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
            Nos Partenaires
          </h1>
          <p className="text-foreground/65 max-w-2xl mx-auto">
            Nous sommes fiers de collaborer avec des organisations qui partagent nos valeurs.
          </p>
        </motion.div>

        {/* Partners grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {PARTNERS.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-frosted rounded-2xl p-8"
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                style={{ background: 'linear-gradient(135deg, #E8004D 0%, #F4A7C3 100%)' }}>
                <Handshake className="w-7 h-7 text-white" />
              </div>
              <h2 className="font-display text-xl font-bold text-foreground mb-2">
                {partner.name}
              </h2>
              <span className="text-xs glass-clear px-3 py-1 rounded-full text-foreground/60 mb-3 inline-block">
                {partner.category}
              </span>
              <p className="text-foreground/70 leading-relaxed">
                {partner.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Partnership info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-frosted rounded-2xl p-8 mb-8"
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
            <Globe className="w-6 h-6 text-rose-500" />
            Devenir partenaire
          </h2>
          <p className="text-foreground/70 leading-relaxed mb-6">
            Nous sommes toujours à la recherche de nouveaux partenariats avec des organisations qui partagent notre vision de la beauté responsable et durable.
          </p>
          <Link
            href="/help/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all"
            style={{ background: '#E8004D' }}
          >
            Nous contacter
          </Link>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-frosted rounded-2xl p-8"
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
            <Heart className="w-6 h-6 text-rose-500" />
            Nos valeurs partenariales
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-foreground/70">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Transparence</h3>
              <p className="text-sm">Des relations basées sur la confiance et l'honnêteté.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Durabilité</h3>
              <p className="text-sm">Des partenariats à long terme pour un impact durable.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Innovation</h3>
              <p className="text-sm">Collaboration pour créer des solutions innovantes.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
