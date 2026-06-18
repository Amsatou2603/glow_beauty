'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Sun, Moon, Search, Menu, X, Sparkles, Heart } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useCartStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'Skincare', href: '#skincare' },
  { label: 'Makeup', href: '#makeup' },
  { label: 'Fragrance', href: '#fragrance' },
  { label: 'Wellness', href: '#wellness' },
  { label: 'Nouveautés', href: '#new' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const itemCount = useCartStore((s) => s.itemCount());
  const setCartOpen = useCartStore((s) => s.setOpen);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            'glass-navbar relative flex items-center justify-between',
            'px-5 py-3 rounded-3xl transition-all duration-500',
            scrolled ? 'py-2.5' : 'py-3.5'
          )}
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
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #f9a8d4 0%, #f43f5e 100%)',
                boxShadow: '0 4px 12px rgba(244, 63, 94, 0.35)',
              }}
            >
              <Sparkles className="w-4 h-4 text-white" />
            </motion.div>
            <span className="font-display font-bold text-xl text-gradient tracking-tight">
              Glow Beauty
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  'relative px-3.5 py-1.5 text-sm font-medium rounded-xl',
                  'text-foreground/70 hover:text-foreground',
                  'transition-all duration-200 hover:bg-white/30 dark:hover:bg-white/8',
                  'group'
                )}
              >
                {link.label}
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-0.5 rounded-full bg-primary group-hover:w-3/4 transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            {/* Search */}
            <AnimatePresence mode="wait">
              {searchOpen ? (
                <motion.div
                  key="search-input"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 180, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onBlur={() => { if (!searchQuery) setSearchOpen(false); }}
                    placeholder="Rechercher..."
                    className="w-full bg-white/40 dark:bg-white/8 backdrop-blur-sm border border-white/50 dark:border-white/12 rounded-xl px-3 py-1.5 text-sm outline-none focus:border-primary/40 text-foreground placeholder:text-foreground/40"
                  />
                </motion.div>
              ) : (
                <NavIconButton key="search-btn" onClick={() => setSearchOpen(true)} label="Rechercher">
                  <Search className="w-4 h-4" />
                </NavIconButton>
              )}
            </AnimatePresence>

            {/* Wishlist */}
            <NavIconButton onClick={() => {}} label="Favoris" className="hidden sm:flex">
              <Heart className="w-4 h-4" />
            </NavIconButton>

            {/* Theme Toggle */}
            {mounted && (
              <NavIconButton
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                label="Changer le thème"
              >
                <AnimatePresence mode="wait">
                  {theme === 'dark' ? (
                    <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Sun className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Moon className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavIconButton>
            )}

            {/* Cart */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 px-4 py-1.5 rounded-2xl text-sm font-semibold text-white"
              style={{
                background: 'linear-gradient(135deg, #f472b6 0%, #f43f5e 100%)',
                boxShadow: '0 4px 16px rgba(244, 63, 94, 0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
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
              className="absolute top-full left-4 right-4 mt-2 glass-navbar rounded-3xl p-4 md:hidden"
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
                    className="block px-4 py-2.5 text-sm font-medium text-foreground/80 hover:text-foreground rounded-xl hover:bg-white/30 dark:hover:bg-white/8 transition-all"
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
