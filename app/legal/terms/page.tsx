'use client';

import { motion } from 'framer-motion';
import { FileText, ShoppingBag, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
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
            Conditions Générales de Vente
          </h1>
          <p className="text-foreground/65">
            Dernière mise à jour : Juin 2024
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
              <FileText className="w-5 h-5 text-rose-500" />
              Objet
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              Les présentes conditions générales de vente régissent la vente des produits proposés par Glow Beauty sur son site internet. Elles définissent les droits et obligations des parties dans le cadre de la vente en ligne de nos produits.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-frosted rounded-2xl p-8"
          >
            <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-rose-500" />
              Commande
            </h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              Toute commande passée sur notre site constitue une acceptation de nos conditions générales de vente. Le client déclare avoir la capacité juridique nécessaire pour passer commande.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              Glow Beauty se réserve le droit de refuser toute commande pour un motif légitime, notamment en cas de litige avec le client sur une commande antérieure.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-frosted rounded-2xl p-8"
          >
            <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-rose-500" />
              Prix et paiement
            </h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              Les prix affichés sur notre site sont en euros toutes taxes comprises. Ils tiennent compte de la TVA applicable au jour de la commande.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              Le paiement est exigible immédiatement à la commande. Nous acceptons les cartes bancaires, PayPal, Apple Pay et Google Pay. Toutes les transactions sont sécurisées.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-frosted rounded-2xl p-8"
          >
            <h2 className="font-display text-xl font-bold text-foreground mb-4">Garantie et réclamation</h2>
            <p className="text-foreground/70 leading-relaxed">
              Nos produits sont garantis contre tout défaut de fabrication. En cas de défaut, le client peut demander le remplacement ou le remboursement du produit dans les conditions prévues par la législation en vigueur.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-frosted rounded-2xl p-8"
          >
            <h2 className="font-display text-xl font-bold text-foreground mb-4">Propriété intellectuelle</h2>
            <p className="text-foreground/70 leading-relaxed">
              Tous les éléments du site Glow Beauty (textes, images, vidéos, logos) sont protégés par le droit d'auteur. Toute reproduction, même partielle, est interdite sans autorisation préalable.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
