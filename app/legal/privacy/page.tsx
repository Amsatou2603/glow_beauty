'use client';

import { motion } from 'framer-motion';
import { Shield, Eye, Lock } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
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
            Politique de Confidentialité
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
              <Shield className="w-5 h-5 text-rose-500" />
              Collecte des données
            </h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              Nous collectons uniquement les données personnelles nécessaires à la fourniture de nos services : nom, adresse email, adresse de livraison, et informations de paiement. Ces données sont collectées lorsque vous créez un compte, passez une commande ou vous inscrivez à notre newsletter.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              Vos données sont stockées de manière sécurisée sur des serveurs situés en Europe et ne sont jamais partagées avec des tiers sans votre consentement explicite.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-frosted rounded-2xl p-8"
          >
            <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-3">
              <Eye className="w-5 h-5 text-rose-500" />
              Utilisation des données
            </h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              Vos données personnelles sont utilisées pour :
            </p>
            <ul className="text-foreground/70 space-y-2 list-disc list-inside">
              <li>Traiter vos commandes et livrations</li>
              <li>Améliorer votre expérience utilisateur</li>
              <li>Vous envoyer des communications marketing (avec votre consentement)</li>
              <li>Assurer la sécurité de nos services</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-frosted rounded-2xl p-8"
          >
            <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-3">
              <Lock className="w-5 h-5 text-rose-500" />
              Protection des données
            </h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, modification, divulgation ou destruction.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              Conformément au RGPD, vous disposez des droits suivants : droit d'accès, de rectification, d'effacement, de limitation du traitement, de portabilité et d'opposition. Pour exercer ces droits, contactez-nous à privacy@glowbeauty.fr.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-frosted rounded-2xl p-8"
          >
            <h2 className="font-display text-xl font-bold text-foreground mb-4">Cookies</h2>
            <p className="text-foreground/70 leading-relaxed">
              Nous utilisons des cookies pour améliorer votre expérience de navigation, analyser le trafic du site et personnaliser le contenu. Vous pouvez gérer vos préférences de cookies à tout moment via les paramètres de votre navigateur.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
