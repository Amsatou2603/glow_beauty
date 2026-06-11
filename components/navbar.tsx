'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Sun, Moon, Search, Menu, X, Sparkles, Heart, User, Shield } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useCartStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useAuth } from '@/components/auth-provider';
import { isAdmin } from '@/lib/admin';

const NAV_LINKS = [
  { label: 'Skincare', href: '/shop/skincare' },
  { label: 'Makeup', href: '/shop/makeup' },
  { label: 'Fragrance', href: '/shop/fragrance' },
  { label: 'Wellness', href: '/shop/wellness' },
  { label: 'Nouveautés', href: '/shop/new' },
];

const SEARCH_PRODUCTS = [
  { id: '1', name: 'Sérum Éclat Hyaluronique', category: 'Skincare', href: '/shop/skincare' },
  { id: '2', name: 'Crème Velours Nuit', category: 'Skincare', href: '/shop/skincare' },
  { id: '3', name: 'Gel Nettoyant Doux', category: 'Skincare', href: '/shop/skincare' },
  { id: '4', name: 'Masque Détox Argile', category: 'Skincare', href: '/shop/skincare' },
  { id: '5', name: 'Huile Précieuse Rose', category: 'Skincare', href: '/shop/skincare' },
  { id: '6', name: 'Rouge à Lèvres Velours', category: 'Makeup', href: '/shop/makeup' },
  { id: '7', name: 'Fond de Teint Lumineux', category: 'Makeup', href: '/shop/makeup' },
  { id: '8', name: 'Palette Ombres à Paupières', category: 'Makeup', href: '/shop/makeup' },
  { id: '9', name: 'Mascara Volume Extrême', category: 'Makeup', href: '/shop/makeup' },
  { id: '10', name: 'Parfum Rose Éternelle', category: 'Parfum', href: '/shop/fragrance' },
  { id: '11', name: 'Parfum Bois Mystique', category: 'Parfum', href: '/shop/fragrance' },
  { id: '12', name: 'Huile de Massage Relaxante', category: 'Wellness', href: '/shop/wellness' },
  { id: '13', name: 'Bain Moussant Lavande', category: 'Wellness', href: '/shop/wellness' },
  { id: '14', name: 'Bougie Parfumée Zen', category: 'Wellness', href: '/shop/wellness' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [is_admin, setIsAdmin] = useState(false);
  const itemCount = useCartStore((s) => s.itemCount());
  const setCartOpen = useCartStore((s) => s.setOpen);
  const searchRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  const filteredProducts = searchQuery
    ? SEARCH_PRODUCTS.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkAdmin = async () => {
      const adminStatus = await isAdmin();
      setIsAdmin(adminStatus);
    };
    checkAdmin();
  }, [user]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
      >
        <motion.nav
          animate={{
            width: scrolled ? '90%' : '100%',
            maxWidth: scrolled ? '1100px' : '1280px',
          }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className={cn(
            'glass-frosted relative flex items-center justify-between',
            'px-5 py-3 rounded-3xl transition-all duration-500',
            scrolled ? 'py-2.5' : 'py-3.5'
          )}
          style={{
            backdropFilter: scrolled ? 'blur(24px) saturate(200%)' : 'blur(8px)',
            borderBottom: scrolled ? '1px solid rgba(232, 0, 77, 0.12)' : 'none',
          }}
        >
          {/* Shine overlay */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <motion.div
              whileHover={{ rotate: 20, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400 }}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #E8004D 0%, #F4A7C3 100%)',
                boxShadow: '0 0 16px rgba(232, 0, 77, 0.40)',
              }}
            >
              <Sparkles className="w-4 h-4 text-white" />
            </motion.div>
            <span className="font-display font-bold text-xl tracking-tight">
              Glow <span className="italic" style={{ color: '#F4A7C3' }}>Beauty</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  'relative px-3.5 py-1.5 text-sm font-medium rounded-full',
                  'text-foreground/75 hover:text-foreground dark:text-white/75 dark:hover:text-white',
                  'transition-all duration-200 hover:bg-white/8 dark:hover:bg-white/8',
                  'group'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            {/* Search */}
            <div className="relative">
              <AnimatePresence mode="wait">
                {searchOpen ? (
                  <motion.div
                    key="search-input"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 280, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <input
                      ref={searchRef}
                      type="text"
                      id="search-input"
                      name="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onBlur={() => { setTimeout(() => { if (!searchQuery) setSearchOpen(false); }, 200); }}
                      placeholder="Rechercher..."
                      className="w-full bg-white/40 dark:bg-white/8 backdrop-blur-sm border border-foreground/50 dark:border-white/12 rounded-xl px-3 py-1.5 text-sm outline-none focus:border-primary/40 text-foreground placeholder:text-foreground/40"
                    />
                  </motion.div>
                ) : (
                  <NavIconButton key="search-btn" onClick={() => setSearchOpen(true)} label="Rechercher">
                    <Search className="w-4 h-4" />
                  </NavIconButton>
                )}
              </AnimatePresence>

              {/* Search results dropdown */}
              <AnimatePresence>
                {searchOpen && filteredProducts.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full right-0 mt-2 w-80 glass-frosted rounded-2xl p-2 shadow-xl z-50"
                  >
                    {filteredProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={product.href}
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="block px-3 py-2 rounded-xl hover:bg-foreground/5 transition-colors"
                      >
                        <div className="text-sm font-medium text-foreground">{product.name}</div>
                        <div className="text-xs text-foreground/60">{product.category}</div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle - Neumorphic */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={cn(
                  'neumorphic-toggle',
                  theme === 'light' ? 'light' : 'dark'
                )}
                aria-label="Changer le thème"
              >
                <div className={cn(
                  'neumorphic-thumb',
                  theme === 'light' ? 'light' : 'dark'
                )}>
                  {theme === 'light' ? (
                    <Sun className="w-4 h-4" style={{ color: '#E8004D' }} />
                  ) : (
                    <Moon className="w-4 h-4 text-foreground dark:text-white" />
                  )}
                </div>
              </button>
            )}

            {/* Wishlist */}
            <Link href="/account/wishlist">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="hidden md:flex w-10 h-10 rounded-full items-center justify-center glass-frosted text-foreground/70 hover:text-foreground transition-colors"
              >
                <Heart className="w-5 h-5" />
              </motion.button>
            </Link>

            {/* Profile */}
            <Link href="/account" className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="hidden md:flex w-10 h-10 rounded-full items-center justify-center glass-frosted text-foreground/70 hover:text-foreground transition-colors"
              >
                <User className="w-5 h-5" />
              </motion.button>
              {is_admin && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center"
                >
                  <Shield className="w-3 h-3 text-white" />
                </motion.div>
              )}
            </Link>

            {/* Cart */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(232, 0, 77, 0.55)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold text-white"
              style={{
                background: '#E8004D',
              }}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Panier</span>
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className="absolute -top-2 -right-2 min-w-[20px] h-5 px-1 rounded-full bg-white text-rose-500 text-xs font-bold flex items-center justify-center shadow-sm"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile menu */}
            <NavIconButton
              onClick={() => setMobileOpen(!mobileOpen)}
              label="Menu"
              className="md:hidden"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div key="x" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }} transition={{ duration: 0.15 }}>
                    <X className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }} transition={{ duration: 0.15 }}>
                    <Menu className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </NavIconButton>
          </div>
        </motion.nav>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="absolute top-full left-4 right-4 mt-2 glass-frosted rounded-3xl p-4 md-hidden backdrop-blur-xl saturate-200"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2.5 text-sm font-medium text-foreground/80 hover:text-foreground dark:text-white/80 dark:hover:text-white rounded-full hover:bg-white/8 dark:hover:bg-white/8 transition-all"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}

function NavIconButton({
  children,
  onClick,
  label,
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
  className?: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      aria-label={label}
      className={cn(
        'glass-button w-8 h-8 rounded-xl flex items-center justify-center',
        'text-foreground/70 hover:text-foreground transition-colors',
        className
      )}
    >
      {children}
    </motion.button>
  );
}
