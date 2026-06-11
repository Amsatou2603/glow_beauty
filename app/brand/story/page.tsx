'use client';

import { motion } from 'framer-motion';
import { Sparkles, Heart, Globe } from 'lucide-react';
import Link from 'next/link';

export default function StoryPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
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
            Notre Histoire
          </h1>
          <p className="text-foreground/65 max-w-2xl mx-auto">
            L'histoire de Glow Beauty, de sa création à sa mission de révéler l'éclat naturel de chaque femme.
          </p>
        </motion.div>

        {/* Story content */}
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-frosted rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #E8004D 0%, #F4A7C3 100%)' }}>
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">Nos origines</h2>
            </div>
            <p className="text-foreground/70 leading-relaxed mb-4">
              Fondée en 2020 par Marie Laurent, Glow Beauty est née d'une passion pour les ingrédients naturels et d'une vision : créer des produits de beauté qui respectent la peau et l'environnement.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              Après des années de recherche dans les laboratoires cosmétiques les plus prestigieux, Marie a développé des formules uniques combinant la science moderne et la sagesse des traditions ancestrales.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-frosted rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #E8004D 0%, #F4A7C3 100%)' }}>
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">Notre mission</h2>
            </div>
            <p className="text-foreground/70 leading-relaxed mb-4">
              Chez Glow Beauty, nous croyons que chaque femme mérite de se sentir belle et confiante dans sa propre peau. Notre mission est de créer des produits qui subliment votre beauté naturelle sans compromettre votre santé ou l'environnement.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              Nous nous engageons à utiliser uniquement des ingrédients naturels, biologiques et éthiquement sourcés. Chaque produit est formulé avec amour et soin, dans le respect des normes les plus strictes de qualité et de sécurité.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-frosted rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #E8004D 0%, #F4A7C3 100%)' }}>
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">Notre impact</h2>
            </div>
            <p className="text-foreground/70 leading-relaxed mb-4">
              Aujourd'hui, Glow Beauty est présent dans plus de 15 pays européens et compte plus de 100 000 clientes fidèles. Notre communauté continue de grandir chaque jour, portée par des femmes qui partagent nos valeurs.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              Nous sommes fiers de contribuer à un monde plus beau et plus responsable, en soutenant des initiatives locales et en réduisant notre empreinte écologique grâce à des emballages recyclables et des processus de fabrication durables.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
