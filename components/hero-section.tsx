'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star, Sparkles, Shield, Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';

const BADGES = [
  { icon: Leaf, label: 'Clean Beauty', color: 'from-emerald-400/20 to-green-300/20', border: 'border-emerald-200/40 dark:border-emerald-700/30', text: 'text-emerald-700 dark:text-emerald-400' },
  { icon: Shield, label: 'Vegan & Cruelty-Free', color: 'from-pink-400/20 to-rose-300/20', border: 'border-pink-200/40 dark:border-pink-700/30', text: 'text-rose-600 dark:text-rose-400' },
  { icon: Star, label: 'Noté 4.9/5', color: 'from-amber-400/20 to-yellow-300/20', border: 'border-amber-200/40 dark:border-amber-700/30', text: 'text-amber-700 dark:text-amber-400' },
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full liquid-blob"
          style={{ background: 'radial-gradient(circle, rgba(253,164,175,0.45) 0%, rgba(251,207,232,0.2) 60%, transparent 80%)' }}
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 25, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute -top-20 -right-40 w-[700px] h-[700px] rounded-full liquid-blob"
          style={{ background: 'radial-gradient(circle, rgba(249,168,212,0.35) 0%, rgba(252,231,243,0.15) 60%, transparent 80%)' }}
        />
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
          className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full liquid-blob"
          style={{ background: 'radial-gradient(circle, rgba(244,114,182,0.25) 0%, rgba(253,164,175,0.1) 60%, transparent 80%)' }}
        />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[80vh] py-12">
          {/* Left content */}
          <div className="flex flex-col gap-6">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex"
            >
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase badge-glass text-rose-500 dark:text-rose-400">
                <Sparkles className="w-3 h-3" />
                Collection Printemps 2026
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-balance"
            >
              Révélez votre{' '}
              <span className="text-gradient relative">
                éclat naturel
                <motion.svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 1, ease: 'easeOut' }}
                >
                  <motion.path
                    d="M2 8 Q75 2 150 6 Q225 10 298 4"
                    stroke="url(#pinkGrad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <defs>
                    <linearGradient id="pinkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f472b6" />
                      <stop offset="100%" stopColor="#f43f5e" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="text-lg text-foreground/65 leading-relaxed max-w-md"
            >
              Des formules ultra-luxueuses inspirées de la nature. Skincare, maquillage et rituels bien-être pensés pour sublimer chaque type de peau.
            </motion.p>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-wrap gap-2"
            >
              {BADGES.map(({ icon: Icon, label, color, border, text }) => (
                <div
                  key={label}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium',
                    `bg-gradient-to-r ${color} border ${border} backdrop-blur-sm ${text}`
                  )}
                >
                  <Icon className="w-3 h-3" />
                  {label}
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <motion.a
                href="#products"
                whileHover={{ scale: 1.03, boxShadow: '0 16px 40px rgba(244, 63, 94, 0.45)' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-semibold text-white"
                style={{
                  background: 'linear-gradient(135deg, #f472b6 0%, #f43f5e 60%, #db2777 100%)',
                  boxShadow: '0 8px 24px rgba(244, 63, 94, 0.4), inset 0 1px 0 rgba(255,255,255,0.25)',
                }}
              >
                Découvrir la collection
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#about"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-semibold glass-button text-foreground/80"
              >
                Notre histoire
              </motion.a>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="flex items-center gap-4 pt-2"
            >
              <div className="flex -space-x-2.5">
                {['https://images.pexels.com/photos/3762453/pexels-photo-3762453.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
                  'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
                  'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
                  'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
                ].map((src, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-background overflow-hidden"
                    style={{ zIndex: 4 - i }}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-foreground/80 ml-1">4.9</span>
                </div>
                <p className="text-xs text-foreground/55 mt-0.5">+28 000 clientes ravies</p>
              </div>
            </motion.div>
          </div>

          {/* Right - Hero visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative flex items-center justify-center"
          >
            {/* Main hero image */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full max-w-md"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] glass-card p-3">
                <div className="rounded-[2rem] overflow-hidden h-full relative">
                  <img
                    src="https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=700&h=875&dpr=2"
                    alt="Glow Beauty Hero"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-950/20 via-transparent to-transparent" />
                </div>
                {/* Shine overlay */}
                <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)' }}
                />
              </div>

              {/* Floating card 1 — bestseller */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="absolute -left-8 top-1/4 glass-card p-3 rounded-2xl w-44 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src="https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2"
                      alt="Sérum"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground/90 leading-tight">Sérum Éclat</p>
                    <p className="text-[10px] text-foreground/55 mt-0.5">Rose & Hyaluronique</p>
                    <div className="flex items-center gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-2 h-2 fill-amber-400 text-amber-400" />)}
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-gradient">€89</span>
                  <span className="text-[10px] badge-glass px-1.5 py-0.5 rounded-full text-rose-500 dark:text-rose-400 font-medium">Best-seller</span>
                </div>
              </motion.div>

              {/* Floating card 2 — new */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="absolute -right-8 bottom-1/4 glass-card p-3 rounded-2xl w-44 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2"
                      alt="Crème"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground/90 leading-tight">Crème Velours</p>
                    <p className="text-[10px] text-foreground/55 mt-0.5">Nourrissante & Anti-âge</p>
                    <div className="mt-1 badge-glass inline-flex items-center px-1.5 py-0.5 rounded-full">
                      <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">Nouveau</span>
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-gradient">€125</span>
                  <span className="text-[10px] text-foreground/40">30 ml</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-foreground/40 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-foreground/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-foreground/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
