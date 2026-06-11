'use client';

import { motion } from 'framer-motion';
import { Ruler, Shirt, Package } from 'lucide-react';
import Link from 'next/link';

const SIZE_GUIDES = [
  {
    category: 'Skincare',
    sizes: [
      { size: 'Standard', description: 'Tous nos produits skincare sont disponibles en format standard de 30ml, 50ml et 100ml.' },
    ],
  },
  {
    category: 'Maquillage',
    sizes: [
      { size: 'Standard', description: 'Format standard adapté à tous les types de visage.' },
    ],
  },
  {
    category: 'Parfums',
    sizes: [
      { size: '30ml', description: 'Format voyage idéal pour les déplacements.' },
      { size: '50ml', description: 'Format standard pour usage quotidien.' },
      { size: '100ml', description: 'Format généreux pour les amateurs de parfum.' },
    ],
  },
];

export default function SizesPage() {
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
            Guide des Tailles
          </h1>
          <p className="text-foreground/65">
            Retrouvez toutes les informations sur les formats de nos produits.
          </p>
        </motion.div>

        {/* Size guides */}
        <div className="space-y-8">
          {SIZE_GUIDES.map((guide, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-frosted rounded-2xl p-8"
            >
              <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Ruler className="w-6 h-6 text-rose-500" />
                {guide.category}
              </h2>
              <div className="space-y-4">
                {guide.sizes.map((size, i) => (
                  <div key={i} className="glass-clear rounded-xl p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #E8004D 0%, #F4A7C3 100%)' }}>
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{size.size}</h3>
                        <p className="text-foreground/70 text-sm">{size.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 glass-frosted rounded-2xl p-8"
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
            <Shirt className="w-6 h-6 text-rose-500" />
            Conseils
          </h2>
          <ul className="text-foreground/70 space-y-2">
            <li>• Nos produits sont formulés pour convenir à tous les types de peau.</li>
            <li>• Pour une première utilisation, nous recommandons de faire un test cutané 24h avant.</li>
            <li>• N'hésitez pas à nous contacter pour des conseils personnalisés.</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
