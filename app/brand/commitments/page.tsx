'use client';

import { motion } from 'framer-motion';
import { Leaf, Heart, Recycle, Shield } from 'lucide-react';
import Link from 'next/link';

const COMMITMENTS = [
  {
    icon: Leaf,
    title: 'Ingrédients naturels',
    description: '100% de nos ingrédients sont d\'origine naturelle et biologiques. Nous sélectionnons chaque composant avec le plus grand soin pour garantir qualité et efficacité.',
  },
  {
    icon: Heart,
    title: 'Cruelty-free',
    description: 'Nos produits ne sont jamais testés sur les animaux. Nous sommes certifiés Leaping Bunny et PETA, garantissant notre engagement envers le bien-être animal.',
  },
  {
    icon: Recycle,
    title: 'Éco-responsabilité',
    description: 'Nos emballages sont recyclables ou biodégradables. Nous réduisons notre empreinte carbone en privilégiant des fournisseurs locaux et des transports écologiques.',
  },
  {
    icon: Shield,
    title: 'Transparence',
    description: 'Nous affichons la liste complète de nos ingrédients sur chaque produit. Aucun secret, aucune substance cachée. La confiance se mérite.',
  },
];

export default function CommitmentsPage() {
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
            Nos Engagements
          </h1>
          <p className="text-foreground/65 max-w-2xl mx-auto">
            Chez Glow Beauty, nous nous engageons à créer des produits qui respectent votre peau, les animaux et l'environnement.
          </p>
        </motion.div>

        {/* Commitments grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {COMMITMENTS.map((commitment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-frosted rounded-2xl p-8"
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                style={{ background: 'linear-gradient(135deg, #E8004D 0%, #F4A7C3 100%)' }}>
                <commitment.icon className="w-7 h-7 text-white" />
              </div>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">
                {commitment.title}
              </h2>
              <p className="text-foreground/70 leading-relaxed">
                {commitment.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 glass-frosted rounded-2xl p-8"
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            Certifications
          </h2>
          <p className="text-foreground/70 leading-relaxed mb-6">
            Nos produits sont certifiés par des organismes indépendants reconnus :
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {['Ecocert', 'Cosmébio', 'Leaping Bunny', 'PETA'].map((cert, index) => (
              <div key={index} className="glass-clear rounded-xl p-4 text-center">
                <div className="font-semibold text-foreground">{cert}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
