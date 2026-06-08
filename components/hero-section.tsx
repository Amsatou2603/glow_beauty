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
      {/* Hero gradient background */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, #0f0a12, #1a0e1e, #200d1f)',
      }} />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[80vh] py-12">
          {/* Left content */}
          <div className="flex flex-col gap-6">

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-display font-bold leading-[1.1] tracking-tight text-balance text-white"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
            >
              Révélez votre{' '}
              <span className="italic" style={{
                background: 'linear-gradient(135deg, #E8004D, #F4A7C3)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                éclat naturel
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="text-lg leading-relaxed max-w-md"
              style={{ color: 'rgba(255, 255, 255, 0.65)' }}
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
              {BADGES.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium uppercase"
                  style={{
                    background: 'rgba(232, 0, 77, 0.12)',
                    border: '1px solid rgba(232, 0, 77, 0.25)',
                    color: '#E8004D',
                  }}
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
                whileHover={{ scale: 1.04, translateY: -2, boxShadow: '0 0 30px rgba(232, 0, 77, 0.50)' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-white"
                style={{
                  background: '#E8004D',
                }}
              >
                Découvrir la collection
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#about"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold glass-frosted text-white"
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                }}
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
                    className="w-8 h-8 rounded-full border-2 border-dark-base overflow-hidden"
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
                  <span className="text-xs font-bold text-white ml-1">4.9</span>
                </div>
                <p className="text-xs text-white mt-0.5">+28 000 clientes ravies</p>
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
              <div className="relative rounded-[1.5rem] overflow-hidden aspect-[4/5] p-3 glass-frosted">
                <div className="rounded-[1.25rem] overflow-hidden h-full relative" style={{
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                }}>
                  <img
                    src="https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=700&h=875&dpr=2"
                    alt="Glow Beauty Hero"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-950/20 via-transparent to-transparent" />
                </div>
                {/* Shine overlay */}
                <div className="absolute inset-0 rounded-[1.5rem] pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)' }}
                />
              </div>

              {/* Floating card 1 — bestseller */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="absolute -left-8 top-1/4 glass-frosted p-3 rounded-2xl w-44 cursor-pointer"
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
                    <p className="text-xs font-semibold text-white leading-tight">Sérum Éclat</p>
                    <p className="text-[10px] text-white/55 mt-0.5">Rose & Hyaluronique</p>
                    <div className="flex items-center gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-2 h-2 fill-amber-400 text-amber-400" />)}
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-white">€89</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium" style={{
                    background: 'rgba(232, 0, 77, 0.15)',
                    color: '#E8004D',
                  }}>Best-seller</span>
                </div>
              </motion.div>

              {/* Floating card 2 — new */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="absolute -right-8 bottom-1/4 glass-frosted p-3 rounded-2xl w-44 cursor-pointer"
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
                    <p className="text-xs font-semibold text-white leading-tight">Crème Velours</p>
                    <p className="text-[10px] text-white/55 mt-0.5">Nourrissante & Anti-âge</p>
                    <div className="mt-1 inline-flex items-center px-1.5 py-0.5 rounded-full" style={{
                      background: 'rgba(244, 167, 195, 0.15)',
                    }}>
                      <span className="text-[10px] font-semibold" style={{ color: '#F4A7C3' }}>Nouveau</span>
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-white">€125</span>
                  <span className="text-[10px] text-white/40">30 ml</span>
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
        <span className="text-xs text-white/40 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
