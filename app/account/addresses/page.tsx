'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Plus, Edit, Trash2, Check } from 'lucide-react';
import Link from 'next/link';

const ADDRESSES = [
  {
    id: '1',
    type: 'home',
    label: 'Domicile',
    fullName: 'Marie Dupont',
    address: '12 Rue du Faubourg',
    city: 'Paris',
    postalCode: '75008',
    country: 'France',
    phone: '+33 6 12 34 56 78',
    isDefault: true,
  },
  {
    id: '2',
    type: 'work',
    label: 'Travail',
    fullName: 'Marie Dupont',
    address: '45 Avenue des Champs-Élysées',
    city: 'Paris',
    postalCode: '75008',
    country: 'France',
    phone: '+33 6 12 34 56 78',
    isDefault: false,
  },
];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState(ADDRESSES);
  const [showForm, setShowForm] = useState(false);

  const setDefault = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const deleteAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/account">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-frosted text-sm font-medium text-foreground hover:text-foreground/80 transition-colors mb-4"
            >
              ← Retour à mon compte
            </motion.button>
          </Link>
          <h1 className="font-display text-4xl font-bold text-foreground mb-2">
            Mes Adresses
          </h1>
          <p className="text-foreground/65">
            Gérez vos adresses de livraison et de facturation.
          </p>
        </motion.div>

        {/* Add button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowForm(true)}
          className="mb-8 flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all w-fit"
          style={{ background: '#E8004D' }}
        >
          <Plus className="w-4 h-4" />
          Ajouter une adresse
        </motion.button>

        {/* Addresses list */}
        <div className="space-y-4">
          {addresses.map((address, index) => (
            <motion.div
              key={address.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-frosted rounded-2xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #E8004D 0%, #F4A7C3 100%)' }}>
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{address.label}</h3>
                    <p className="text-sm text-foreground/60">{address.fullName}</p>
                  </div>
                </div>
                {address.isDefault && (
                  <span className="flex items-center gap-1 text-xs font-medium text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full">
                    <Check className="w-3 h-3" />
                    Par défaut
                  </span>
                )}
              </div>

              <div className="text-foreground/70 text-sm mb-4">
                <p>{address.address}</p>
                <p>{address.postalCode} {address.city}</p>
                <p>{address.country}</p>
                <p>{address.phone}</p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-foreground/10">
                {!address.isDefault && (
                  <button
                    onClick={() => setDefault(address.id)}
                    className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
                  >
                    Définir par défaut
                  </button>
                )}
                <button className="flex items-center gap-1.5 text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">
                  <Edit className="w-4 h-4" />
                  Modifier
                </button>
                <button
                  onClick={() => deleteAddress(address.id)}
                  className="flex items-center gap-1.5 text-sm font-medium text-foreground/60 hover:text-rose-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Supprimer
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
