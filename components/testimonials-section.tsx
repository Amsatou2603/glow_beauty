'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Amina D.',
    handle: '@aminadiallo',
    avatar: 'https://images.pexels.com/photos/3762453/pexels-photo-3762453.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2',
    text: 'Le Sérum Éclat a littéralement transformé ma peau en deux semaines. Ma peau est lumineuse, hydratée et les taches ont clairement diminué. Je ne peux plus m\'en passer !',
    rating: 5,
    product: 'Sérum Éclat Rose',
  },
  {
    name: 'Khadija B.',
    handle: '@khadijab',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2',
    text: 'La Crème Velours est exactement ce dont ma peau mature avait besoin. Texture divine, absorption rapide et résultats anti-âge visibles dès la première semaine.',
    rating: 5,
    product: 'Crème Velours Anti-Âge',
  },
  {
    name: 'Fatou M.',
    handle: '@fatoum',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2',
    text: 'J\'ai enfin trouvé un parfum qui me correspond vraiment. Fleur de Sakura est subtil, enveloppant, et tient toute la journée. Un vrai coup de coeur !',
    rating: 5,
    product: 'Parfum Fleur de Sakura',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Attenuated pink blobs for testimonials section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] blob"
          style={{
            background: 'radial-gradient(circle, rgba(232, 0, 77, 0.08) 0%, transparent 70%)',
            animation: 'blob 14s ease-in-out infinite reverse',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] blob"
          style={{
            background: 'radial-gradient(circle, rgba(244, 167, 195, 0.06) 0%, transparent 70%)',
            animation: 'blob 16s ease-in-out infinite',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14 relative z-10"
      >
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
          Elles témoignent de leur{' '}
          <span className="text-gradient">éclat</span>
        </h2>
        <p className="text-foreground/65 text-lg">Plus de 28 000 clientes font confiance à Glow Beauty.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
        {TESTIMONIALS.map(({ name, handle, avatar, text, rating, product }, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className="glass-clear rounded-3xl p-6 relative flex flex-col gap-4"
          >
            <div className="absolute top-5 right-5 opacity-10">
              <Quote className="w-10 h-10 text-rose-400" />
            </div>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl overflow-hidden flex-shrink-0" style={{
                border: '2px solid rgba(232, 0, 77, 0.30)',
              }}>
                <img src={avatar} alt={name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground/90">{name}</p>
                <p className="text-xs text-foreground/40">{handle}</p>
              </div>
            </div>

            <div className="flex gap-0.5">
              {[...Array(rating)].map((_, j) => (
                <Star key={j} className="w-3.5 h-3.5" style={{ fill: '#E8004D', color: '#E8004D' }} />
              ))}
            </div>

            <p className="text-sm text-foreground/65 leading-relaxed flex-1">&ldquo;{text}&rdquo;</p>

            <div className="flex items-center gap-1.5">
              <span className="text-[10px] glass-clear px-2.5 py-1 rounded-full text-foreground/50 font-medium">
                {product}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
