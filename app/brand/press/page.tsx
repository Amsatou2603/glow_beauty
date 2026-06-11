'use client';

import { motion } from 'framer-motion';
import { Newspaper, Calendar, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const PRESS_ARTICLES = [
  {
    title: 'Glow Beauty révolutionne le marché de la beauté naturelle',
    publication: 'Elle Magazine',
    date: 'Mai 2024',
    excerpt: 'Une interview exclusive avec Marie Laurent sur la vision et l\'avenir de Glow Beauty.',
  },
  {
    title: 'Les secrets de la routine beauté Glow Beauty',
    publication: 'Vogue Paris',
    date: 'Avril 2024',
    excerpt: 'Découvrez les produits cultes qui ont conquis les rédactions mode.',
  },
  {
    title: 'Glow Beauty : L\'engagement éco-responsable',
    publication: 'Le Figaro',
    date: 'Mars 2024',
    excerpt: 'Comment la marque s\'engage pour un avenir plus durable.',
  },
];

export default function PressPage() {
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
            Presse
          </h1>
          <p className="text-foreground/65 max-w-2xl mx-auto">
            Découvrez ce que les médias disent de Glow Beauty.
          </p>
        </motion.div>

        {/* Press articles */}
        <div className="space-y-6">
          {PRESS_ARTICLES.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-frosted rounded-2xl p-8"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #E8004D 0%, #F4A7C3 100%)' }}>
                  <Newspaper className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-xl font-bold text-foreground mb-2">
                    {article.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-foreground/60 mb-3">
                    <span className="font-medium">{article.publication}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {article.date}
                    </span>
                  </div>
                  <p className="text-foreground/70 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-2 text-sm font-semibold text-rose-500 hover:text-rose-600 transition-colors">
                Lire l'article
                <ExternalLink className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Contact press */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 glass-frosted rounded-2xl p-8 text-center"
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            Espace Presse
          </h2>
          <p className="text-foreground/65 mb-6">
            Vous êtes journaliste et souhaitez des informations sur Glow Beauty ?
          </p>
          <Link
            href="/help/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all"
            style={{ background: '#E8004D' }}
          >
            Contacter notre équipe presse
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
