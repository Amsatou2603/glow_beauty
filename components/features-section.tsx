'use client';

import { motion } from 'framer-motion';
import { Leaf, Shield, Star, Zap, Heart, Award } from 'lucide-react';

const FEATURES = [
  {
    icon: Leaf,
    title: 'Formules Clean',
    description: 'Sans perturbateurs endocriniens, sans ingrédients controversés. 97% d\'ingrédients d\'origine naturelle.',
    color: 'from-emerald-400/20 to-teal-300/20',
    iconColor: 'text-emerald-500 dark:text-emerald-400',
  },
  {
    icon: Shield,
    title: 'Cruelty-Free & Vegan',
    description: 'Certifiés Leaping Bunny. Aucun test sur les animaux, aucun ingrédient d\'origine animale.',
    color: 'from-rose-400/20 to-pink-300/20',
    iconColor: 'text-rose-500 dark:text-rose-400',
  },
  {
    icon: Award,
    title: 'Résultats Prouvés',
    description: 'Testés dermatologiquement. Résultats visibles et mesurés par études cliniques indépendantes.',
    color: 'from-amber-400/20 to-yellow-300/20',
    iconColor: 'text-amber-500 dark:text-amber-400',
  },
  {
    icon: Zap,
    title: 'Actifs Haute Concentration',
    description: 'Jusqu\'à 10x plus concentré que les standards du marché. Moins produit, plus d\'efficacité.',
    color: 'from-violet-400/20 to-purple-300/20',
    iconColor: 'text-violet-500 dark:text-violet-400',
  },
  {
    icon: Heart,
    title: 'Packaging Durable',
    description: 'Flacons en verre recyclé, recharges disponibles, emballages biodégradables.',
    color: 'from-pink-400/20 to-rose-300/20',
    iconColor: 'text-pink-500 dark:text-pink-400',
  },
  {
    icon: Star,
    title: 'Noté 4.9/5',
    description: 'Plus de 28 000 clientes satisfaites. La confiance construite produit après produit, soin après soin.',
    color: 'from-orange-400/20 to-amber-300/20',
    iconColor: 'text-orange-500 dark:text-orange-400',
  },
];

export function FeaturesSection() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground/90 mb-4">
          La beauté selon{' '}
          <span className="text-gradient">Glow Beauty</span>
        </h2>
        <p className="text-foreground/55 text-lg max-w-2xl mx-auto">
          Nous croyons que la beauté devrait être un acte de soin — pour vous et pour la planète.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURES.map(({ icon: Icon, title, description, color, iconColor }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="glass-card rounded-3xl p-6 group"
          >
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 border border-white/30 dark:border-white/10 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300`}>
              <Icon className={`w-5 h-5 ${iconColor}`} />
            </div>
            <h3 className="font-semibold text-foreground/90 mb-2">{title}</h3>
            <p className="text-sm text-foreground/55 leading-relaxed">{description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
