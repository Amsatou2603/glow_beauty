'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const STEPS = [
  {
    id: 1,
    title: 'Bienvenue chez Glow Beauty',
    description: 'Découvrez notre collection de produits de beauté premium pour sublimer votre routine.',
    image: 'https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
  },
  {
    id: 2,
    title: 'Ingrédients Naturels',
    description: 'Nos produits sont formulés avec des ingrédients naturels et respectueux de votre peau.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
  },
  {
    id: 3,
    title: 'Cruelty-Free',
    description: 'Tous nos produits sont cruelty-free et respectueux de l\'environnement.',
    image: 'https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      localStorage.setItem('hasSeenOnboarding', 'true');
      router.push('/');
    }
  };

  const handleSkip = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-background dark:bg-dark-base relative overflow-hidden">
      {/* Splash screen */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #E8004D 0%, #F4A7C3 100%)' }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              className="text-center"
            >
              <Sparkles className="w-20 h-20 text-white mx-auto mb-4" />
              <h1 className="font-display text-4xl font-bold text-white mb-2">
                Glow Beauty
              </h1>
              <p className="text-white/80">Votre beauté, notre passion</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Onboarding slides */}
      <AnimatePresence mode="wait">
        {!showSplash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex flex-col"
          >
            {/* Skip button */}
            <div className="fixed top-6 right-6 z-10">
              <button
                onClick={handleSkip}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass-frosted text-sm font-medium text-foreground hover:text-foreground/80 transition-colors"
              >
                Passer
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={STEPS[currentStep].id}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4 }}
                  className="text-center max-w-2xl"
                >
                  {/* Image */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="w-64 h-64 mx-auto mb-8 rounded-3xl overflow-hidden shadow-2xl"
                  >
                    <img
                      src={STEPS[currentStep].image}
                      alt={STEPS[currentStep].title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Text */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4"
                  >
                    {STEPS[currentStep].title}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-foreground/65 text-lg"
                  >
                    {STEPS[currentStep].description}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="p-8">
              {/* Dots */}
              <div className="flex justify-center gap-2 mb-8">
                {STEPS.map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentStep ? 'bg-rose-500' : 'bg-foreground/20'
                    }`}
                  />
                ))}
              </div>

              {/* Next button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={handleNext}
                className="w-full max-w-xs mx-auto flex items-center justify-center gap-2 py-4 rounded-full text-sm font-semibold text-white transition-all"
                style={{ background: '#E8004D' }}
              >
                {currentStep === STEPS.length - 1 ? 'Commencer' : 'Suivant'}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
