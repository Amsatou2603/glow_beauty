'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, CreditCard, Lock, ArrowRight, Check, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';

const COUNTRIES = [
  { code: 'FR', name: 'France', flag: '🇫🇷', phoneCode: '+33' },
  { code: 'SN', name: 'Sénégal', flag: '🇸🇳', phoneCode: '+221' },
  { code: 'BE', name: 'Belgique', flag: '🇧🇪', phoneCode: '+32' },
  { code: 'CH', name: 'Suisse', flag: '🇨🇭', phoneCode: '+41' },
  { code: 'LU', name: 'Luxembourg', flag: '🇱🇺', phoneCode: '+352' },
  { code: 'DE', name: 'Allemagne', flag: '🇩🇪', phoneCode: '+49' },
  { code: 'IT', name: 'Italie', flag: '🇮🇹', phoneCode: '+39' },
  { code: 'ES', name: 'Espagne', flag: '🇪🇸', phoneCode: '+34' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', phoneCode: '+351' },
  { code: 'NL', name: 'Pays-Bas', flag: '🇳🇱', phoneCode: '+31' },
  { code: 'GB', name: 'Royaume-Uni', flag: '🇬🇧', phoneCode: '+44' },
  { code: 'US', name: 'États-Unis', flag: '🇺🇸', phoneCode: '+1' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', phoneCode: '+1' },
  { code: 'MA', name: 'Maroc', flag: '🇲🇦', phoneCode: '+212' },
  { code: 'TN', name: 'Tunisie', flag: '🇹🇳', phoneCode: '+216' },
  { code: 'CI', name: 'Côte d\'Ivoire', flag: '🇨🇮', phoneCode: '+225' },
  { code: 'CM', name: 'Cameroun', flag: '🇨🇲', phoneCode: '+237' },
  { code: 'MG', name: 'Madagascar', flag: '🇲🇬', phoneCode: '+261' },
  { code: 'CD', name: 'RD Congo', flag: '🇨🇩', phoneCode: '+243' },
  { code: 'DZ', name: 'Algérie', flag: '🇩🇿', phoneCode: '+213' },
];

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const defaultCountry = COUNTRIES.find(c => c.code === 'FR') || COUNTRIES[0];
  const [formData, setFormData] = useState({
    // Shipping
    fullName: '',
    email: '',
    phone: defaultCountry.phoneCode,
    address: '',
    city: '',
    postalCode: '',
    country: 'FR',
    // Payment
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvc: '',
    saveCard: false,
  });

  const selectedCountry = COUNTRIES.find(c => c.code === formData.country) || COUNTRIES[0];

  const handleCountryChange = (countryCode: string) => {
    const country = COUNTRIES.find(c => c.code === countryCode);
    if (country) {
      setFormData({
        ...formData,
        country: countryCode,
        phone: country.phoneCode,
      });
    }
    setCountryDropdownOpen(false);
  };

  const cartTotal = total();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement checkout logic with Supabase
    clearCart();
    // Redirect to success page
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="glass-frosted rounded-2xl p-12 text-center max-w-md">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">
            Votre panier est vide
          </h1>
          <p className="text-foreground/65 mb-6">
            Ajoutez des produits avant de passer commande.
          </p>
          <Link
            href="/shop/new"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all"
            style={{ background: '#E8004D' }}
          >
            Découvrir nos produits
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-frosted text-sm font-medium text-foreground hover:text-foreground/80 transition-colors mb-4"
            >
              ← Retour à la boutique
            </motion.button>
          </Link>
          <h1 className="font-display text-4xl font-bold text-foreground mb-2">
            Commande
          </h1>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-frosted rounded-2xl p-6"
            >
              <h2 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-rose-500" />
                Adresse de livraison
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background/50 dark:bg-background/30 border border-foreground/10 outline-none focus:border-rose-500/50 text-foreground transition-colors"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background/50 dark:bg-background/30 border border-foreground/10 outline-none focus:border-rose-500/50 text-foreground transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background/50 dark:bg-background/30 border border-foreground/10 outline-none focus:border-rose-500/50 text-foreground transition-colors"
                    required
                  />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Pays
                  </label>
                  <button
                    type="button"
                    onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                    className="w-full px-4 py-3 rounded-xl bg-background/50 dark:bg-background/30 border border-foreground/10 outline-none focus:border-rose-500/50 text-foreground transition-colors flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-xl">{selectedCountry.flag}</span>
                      <span>{selectedCountry.name}</span>
                    </span>
                    <ChevronDown className="w-4 h-4 text-foreground/60" />
                  </button>

                  <AnimatePresence>
                    {countryDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 glass-frosted rounded-2xl p-2 shadow-xl z-50 max-h-64 overflow-y-auto"
                      >
                        {COUNTRIES.map((country) => (
                          <button
                            key={country.code}
                            type="button"
                            onClick={() => handleCountryChange(country.code)}
                            className="w-full px-3 py-2 rounded-xl hover:bg-foreground/5 transition-colors flex items-center gap-2 text-left"
                          >
                            <span className="text-xl">{country.flag}</span>
                            <span className="text-sm text-foreground">{country.name}</span>
                            <span className="text-xs text-foreground/60 ml-auto">{country.phoneCode}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Adresse
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background/50 dark:bg-background/30 border border-foreground/10 outline-none focus:border-rose-500/50 text-foreground transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Ville
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background/50 dark:bg-background/30 border border-foreground/10 outline-none focus:border-rose-500/50 text-foreground transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Code postal
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background/50 dark:bg-background/30 border border-foreground/10 outline-none focus:border-rose-500/50 text-foreground transition-colors"
                    required
                  />
                </div>
              </div>
            </motion.div>

            {/* Payment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-frosted rounded-2xl p-6"
            >
              <h2 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-rose-500" />
                Moyen de paiement
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Numéro de carte
                  </label>
                  <input
                    type="text"
                    placeholder="•••• •••• •••• ••••"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background/50 dark:bg-background/30 border border-foreground/10 outline-none focus:border-rose-500/50 text-foreground transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Nom sur la carte
                  </label>
                  <input
                    type="text"
                    value={formData.cardName}
                    onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background/50 dark:bg-background/30 border border-foreground/10 outline-none focus:border-rose-500/50 text-foreground transition-colors"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">
                      Expiration (MM/AA)
                    </label>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      value={formData.cardExpiry}
                      onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background/50 dark:bg-background/30 border border-foreground/10 outline-none focus:border-rose-500/50 text-foreground transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">
                      CVC
                    </label>
                    <input
                      type="text"
                      placeholder="•••"
                      value={formData.cardCvc}
                      onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background/50 dark:bg-background/30 border border-foreground/10 outline-none focus:border-rose-500/50 text-foreground transition-colors"
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, saveCard: !formData.saveCard })}
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                      formData.saveCard ? 'bg-rose-500 border-rose-500' : 'border-foreground/20'
                    }`}
                  >
                    {formData.saveCard && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                  <label className="text-sm text-foreground/60">
                    Enregistrer cette carte pour les prochains achats
                  </label>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Order summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="glass-frosted rounded-2xl p-6 sticky top-24">
              <h2 className="font-display text-xl font-bold text-foreground mb-6">
                Récapitulatif
              </h2>

              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground line-clamp-1">{item.name}</p>
                      <p className="text-xs text-foreground/60">Qté: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-semibold text-foreground">
                      €{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-foreground/10 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60">Sous-total</span>
                  <span className="text-foreground">€{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60">Livraison</span>
                  <span className="text-emerald-500">Gratuite</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-foreground pt-2 border-t border-foreground/10">
                  <span>Total</span>
                  <span>€{cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-6">
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(232, 0, 77, 0.50)' }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-semibold text-white transition-all"
                  style={{ background: '#E8004D' }}
                >
                  <Lock className="w-4 h-4" />
                  Passer commande
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </form>

              <p className="text-xs text-foreground/50 text-center mt-4">
                Paiement sécurisé par SSL
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
