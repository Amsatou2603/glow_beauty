'use client';

import { Sparkles, Instagram, Twitter, Facebook, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const LINKS = {
  boutique: ['Skincare', 'Makeup', 'Parfum', 'Wellness', 'Nouveautés', 'Best-sellers'],
  aide: ['Mon compte', 'Suivi commande', 'Livraison & retours', 'Guide des tailles', 'FAQ'],
  marque: ['Notre histoire', 'Nos engagements', 'Ingrédients', 'Presse', 'Partenaires'],
};

export function Footer() {
  return (
    <footer className="mt-10 border-t border-white/20 dark:border-white/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #f9a8d4 0%, #f43f5e 100%)', boxShadow: '0 4px 12px rgba(244, 63, 94, 0.35)' }}>
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-xl text-gradient">Glow Beauty</span>
            </Link>
            <p className="text-sm text-foreground/50 leading-relaxed mb-5 max-w-xs">
              Des rituels de beauté d&apos;exception, formulés avec les ingrédients les plus précieux du monde, pour révéler votre éclat naturel.
            </p>
            <div className="flex items-center gap-3 mb-5">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="glass-button w-9 h-9 rounded-xl flex items-center justify-center text-foreground/50 hover:text-foreground transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
            <div className="space-y-2 text-xs text-foreground/40">
              <div className="flex items-center gap-2"><Mail className="w-3 h-3" /><span>hello@glowbeauty.fr</span></div>
              <div className="flex items-center gap-2"><Phone className="w-3 h-3" /><span>+33 1 23 45 67 89</span></div>
              <div className="flex items-center gap-2"><MapPin className="w-3 h-3" /><span>12 Rue du Faubourg, Paris 75008</span></div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground/40 mb-4">
                {category === 'boutique' ? 'Boutique' : category === 'aide' ? 'Aide' : 'La marque'}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-foreground/55 hover:text-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/15 dark:border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground/35">
            &copy; {new Date().getFullYear()} Glow Beauty. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 text-xs text-foreground/35">
            <a href="#" className="hover:text-foreground/60 transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-foreground/60 transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-foreground/60 transition-colors">CGV</a>
          </div>
          <div className="flex items-center gap-2 text-xs text-foreground/35">
            <span>Paiement sécurisé</span>
            <div className="flex gap-1">
              {['Visa', 'MC', 'CB', 'PayPal'].map((card) => (
                <span key={card} className="badge-glass px-1.5 py-0.5 rounded text-[10px] text-foreground/50">{card}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
