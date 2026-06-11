'use client';

import { motion } from 'framer-motion';
import { Sparkles, Droplets, Flower, Leaf } from 'lucide-react';
import Link from 'next/link';

const INGREDIENTS = [
  {
    icon: Flower,
    name: 'Rose de Damas',
    origin: 'Bulgarie',
    benefits: 'Hydratation intense, apaisement, anti-âge',
    products: ['Sérum Éclat', 'Huile Précieuse'],
  },
  {
    icon: Droplets,
    name: 'Acide Hyaluronique',
    origin: 'Laboratoire',
    benefits: 'Hydratation, repulpant, rides',
    products: ['Sérum Éclat', 'Crème Velours'],
  },
  {
    icon: Leaf,
    name: 'Aloe Vera',
    origin: 'Mexique',
    benefits: 'Apaisant, cicatrisant, hydratant',
    products: ['Gel Nettoyant', 'Lotion Tonique'],
  },
  {
    icon: Sparkles,
    name: 'Vitamine C',
    origin: 'Laboratoire',
    benefits: 'Éclat, antioxydant, uniformité',
    products: ['Sérum Éclat', 'Crème Jour'],
  },
];

export default function IngredientsPage() {
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
            Nos Ingrédients
          </h1>
          <p className="text-foreground/65 max-w-2xl mx-auto">
            Découvrez les ingrédients précieux qui composent nos formules, sélectionnés pour leur qualité et leur efficacité.
          </p>
        </motion.div>

        {/* Ingredients grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {INGREDIENTS.map((ingredient, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-frosted rounded-2xl p-8"
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                style={{ background: 'linear-gradient(135deg, #E8004D 0%, #F4A7C3 100%)' }}>
                <ingredient.icon className="w-7 h-7 text-white" />
              </div>
              <h2 className="font-display text-xl font-bold text-foreground mb-2">
                {ingredient.name}
              </h2>
              <p className="text-foreground/50 text-sm mb-4">{ingredient.origin}</p>
              <p className="text-foreground/70 leading-relaxed mb-4">
                {ingredient.benefits}
              </p>
              <div className="flex flex-wrap gap-2">
                {ingredient.products.map((product, i) => (
                  <span key={i} className="text-xs glass-clear px-3 py-1 rounded-full text-foreground/60">
                    {product}
                  </span>
                ))}
              </div>
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
            Notre philosophie
          </h2>
          <p className="text-foreground/70 leading-relaxed">
            Nous croyons fermement que la qualité des ingrédients fait la qualité du produit. C'est pourquoi nous travaillons directement avec des producteurs locaux et internationaux qui partagent nos valeurs de durabilité et d'éthique. Chaque ingrédient est rigoureusement testé pour garantir sa pureté et son efficacité.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
