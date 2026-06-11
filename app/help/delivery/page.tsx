'use client';

import { motion } from 'framer-motion';
import { Truck, Clock, Shield, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function DeliveryPage() {
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
            Livraison & Retours
          </h1>
          <p className="text-foreground/65">
            Tout ce que vous devez savoir sur nos options de livraison et notre politique de retour.
          </p>
        </motion.div>

        {/* Delivery options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-frosted rounded-2xl p-8 mb-8"
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Truck className="w-6 h-6 text-rose-500" />
            Options de livraison
          </h2>
          
          <div className="space-y-6">
            <div className="border-b border-foreground/10 pb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-foreground">Livraison standard</h3>
                <span className="text-foreground/60">Gratuite dès 80€</span>
              </div>
              <p className="text-foreground/65 text-sm mb-2">2 à 5 jours ouvrés</p>
              <p className="text-foreground/50 text-sm">France métropolitaine</p>
            </div>

            <div className="border-b border-foreground/10 pb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-foreground">Livraison express</h3>
                <span className="text-foreground/60">9.90€</span>
              </div>
              <p className="text-foreground/65 text-sm mb-2">24 à 48 heures</p>
              <p className="text-foreground/50 text-sm">France métropolitaine</p>
            </div>

            <div className="border-b border-foreground/10 pb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-foreground">Livraison Europe</h3>
                <span className="text-foreground/60">12.90€</span>
              </div>
              <p className="text-foreground/65 text-sm mb-2">5 à 10 jours ouvrés</p>
              <p className="text-foreground/50 text-sm">Union européenne</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-foreground">Point relais</h3>
                <span className="text-foreground/60">4.90€</span>
              </div>
              <p className="text-foreground/65 text-sm mb-2">3 à 5 jours ouvrés</p>
              <p className="text-foreground/50 text-sm">France métropolitaine</p>
            </div>
          </div>
        </motion.div>

        {/* Returns policy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-frosted rounded-2xl p-8 mb-8"
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <RefreshCw className="w-6 h-6 text-rose-500" />
            Politique de retour
          </h2>
          
          <div className="space-y-4 text-foreground/70">
            <p>
              Vous disposez de <strong>30 jours</strong> à compter de la réception de votre commande pour retourner tout produit qui ne vous convient pas.
            </p>
            <p>
              Les produits doivent être dans leur emballage d\'origine, n\'avoir pas été utilisés et comporter toutes les étiquettes.
            </p>
            <p>
              Les frais de retour sont à notre charge pour tout retour motivé par un défaut de fabrication ou une erreur de commande.
            </p>
            <p>
              Pour les retours de convenance personnelle, les frais de port sont à votre charge (6.90€).
            </p>
            <p>
              Le remboursement est effectué sous <strong>14 jours</strong> après réception et vérification du produit retourné.
            </p>
          </div>
        </motion.div>

        {/* Tracking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-frosted rounded-2xl p-8"
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Clock className="w-6 h-6 text-rose-500" />
            Suivi de commande
          </h2>
          
          <div className="space-y-4 text-foreground/70">
            <p>
              Dès l\'expédition de votre commande, vous recevrez un email avec votre numéro de suivi.
            </p>
            <p>
              Vous pouvez suivre l\'avancement de votre livraison directement sur notre site dans la section <Link href="/account/orders" className="text-rose-500 hover:underline">Mes commandes</Link>.
            </p>
            <p>
              Pour toute question concernant votre livraison, n\'hésitez pas à nous contacter par email à hello@glowbeauty.fr ou par téléphone au +33 1 23 45 67 89.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
