'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const FAQS = [
  {
    question: 'Quels sont les délais de livraison ?',
    answer: 'Nos délais de livraison sont de 2 à 5 jours ouvrés pour la France métropolitaine, et de 5 à 10 jours pour les autres pays européens. Pour les commandes express, la livraison est effectuée en 24 à 48h.',
  },
  {
    question: 'Puis-je retourner un produit ?',
    answer: 'Oui, vous disposez de 30 jours à compter de la réception de votre commande pour retourner tout produit qui ne vous convient pas. Les produits doivent être dans leur emballage d\'origine et n\'avoir pas été utilisés.',
  },
  {
    question: 'Les produits sont-ils testés sur les animaux ?',
    answer: 'Non, tous nos produits sont cruelty-free et ne sont jamais testés sur les animaux. Nous sommes certifiés Leaping Bunny et PETA.',
  },
  {
    question: 'Quels ingrédients utilisez-vous ?',
    answer: 'Nos produits sont formulés avec des ingrédients naturels et biologiques de la plus haute qualité. Nous évitons les parabens, sulfates, silicones et autres ingrédients controversés.',
  },
  {
    question: 'Comment créer un compte ?',
    answer: 'Vous pouvez créer un compte en cliquant sur le bouton "Créer un compte" en haut à droite de notre site. Vous pourrez ainsi suivre vos commandes, gérer votre liste d\'envies et bénéficier d\'offres exclusives.',
  },
  {
    question: 'Puis-je modifier ma commande après validation ?',
    answer: 'Une fois votre commande validée, vous disposez d\'un délai de 30 minutes pour la modifier. Passé ce délai, veuillez nous contacter par email ou téléphone.',
  },
  {
    question: 'Quels modes de paiement acceptez-vous ?',
    answer: 'Nous acceptons les cartes bancaires (Visa, Mastercard, American Express), PayPal, Apple Pay et Google Pay. Tous les paiements sont sécurisés.',
  },
  {
    question: 'Les produits conviennent-ils aux peaux sensibles ?',
    answer: 'La plupart de nos produits sont adaptés aux peaux sensibles. Nous recommandons toutefois de réaliser un test cutané 24h avant la première utilisation. N\'hésitez pas à nous contacter pour des conseils personnalisés.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
            FAQ
          </h1>
          <p className="text-foreground/65 max-w-2xl mx-auto">
            Trouvez les réponses aux questions les plus fréquentes sur nos produits, services et politiques.
          </p>
        </motion.div>

        {/* FAQ items */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-frosted rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <h3 className="font-semibold text-foreground pr-4">{faq.question}</h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-foreground/50 flex-shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-foreground/70 leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 glass-frosted rounded-2xl p-8 text-center"
        >
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: 'linear-gradient(135deg, #E8004D 0%, #F4A7C3 100%)' }}>
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            Vous ne trouvez pas votre réponse ?
          </h2>
          <p className="text-foreground/65 mb-6">
            Notre équipe est à votre disposition pour vous aider
          </p>
          <Link
            href="/help/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all"
            style={{ background: '#E8004D' }}
          >
            Nous contacter
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
