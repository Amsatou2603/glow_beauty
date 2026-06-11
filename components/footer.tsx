'use client';

import { Sparkles, Instagram, Twitter, Facebook, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const LINKS = {
  boutique: [
    { label: 'Skincare', href: '/shop/skincare' },
    { label: 'Makeup', href: '/shop/makeup' },
    { label: 'Parfum', href: '/shop/fragrance' },
    { label: 'Wellness', href: '/shop/wellness' },
    { label: 'Nouveautés', href: '/shop/new' },
    { label: 'Best-sellers', href: '/shop/bestsellers' },
  ],
  aide: [
    { label: 'Mon compte', href: '/account' },
    { label: 'Suivi commande', href: '/account/orders' },
    { label: 'Livraison & retours', href: '/help/delivery' },
    { label: 'Guide des tailles', href: '/help/sizes' },
    { label: 'FAQ', href: '/help/faq' },
  ],
  marque: [
    { label: 'Notre histoire', href: '/brand/story' },
    { label: 'Nos engagements', href: '/brand/commitments' },
    { label: 'Ingrédients', href: '/brand/ingredients' },
    { label: 'Presse', href: '/brand/press' },
    { label: 'Partenaires', href: '/brand/partners' },
  ],
};

export function Footer() {
  return (
    <footer className="mt-10 bg-background dark:bg-dark-base border-t border-rose-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #E8004D 0%, #F4A7C3 100%)', boxShadow: '0 0 16px rgba(232, 0, 77, 0.40)' }}>
                <Sparkles className="w-4 h-4 text-foreground dark:text-white" />
              </div>
              <span className="font-display font-bold text-xl">
                Glow <span className="italic" style={{ color: '#F4A7C3' }}>Beauty</span>
              </span>
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
                  className="glass-frosted w-9 h-9 rounded-xl flex items-center justify-center text-foreground/50 hover:text-foreground transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
            <div className="space-y-2 text-xs text-foreground/40">
              <div className="flex items-center gap-2"><Mail className="w-3 h-3" /><span>ceo_glowbeauty@gmail.com</span></div>
              <div className="flex items-center gap-2"><Phone className="w-3 h-3" /><span>+221 77 777 77 77</span></div>
              <div className="flex items-center gap-2"><MapPin className="w-3 h-3" /><span>Dakar, Sénégal</span></div>
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
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-foreground/55 hover:text-foreground/90 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-foreground/8">
          <p className="text-xs text-foreground/35">
            &copy; {new Date().getFullYear()} Glow Beauty. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 text-xs text-foreground/35">
            <Link href="/legal/mentions" className="hover:text-foreground/60 transition-colors">Mentions légales</Link>
            <Link href="/legal/privacy" className="hover:text-foreground/60 transition-colors">Confidentialité</Link>
            <Link href="/legal/terms" className="hover:text-foreground/60 transition-colors">CGV</Link>
          </div>
          <div className="flex items-center gap-2 text-xs text-foreground/35">
            <span>Paiement sécurisé</span>
            <div className="flex gap-1">
              {['Visa', 'MC', 'CB', 'PayPal'].map((card) => (
                <span key={card} className="glass-clear px-1.5 py-0.5 rounded text-[10px] text-foreground/50">{card}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
