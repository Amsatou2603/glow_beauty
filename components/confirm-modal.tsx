'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  variant = 'danger',
}: ConfirmModalProps) {
  const variantStyles = {
    danger: {
      confirmBg: '#E8004D',
      confirmHover: '#c7003f',
      icon: 'text-rose-500',
    },
    warning: {
      confirmBg: '#f59e0b',
      confirmHover: '#d97706',
      icon: 'text-amber-500',
    },
    info: {
      confirmBg: '#3b82f6',
      confirmHover: '#2563eb',
      icon: 'text-blue-500',
    },
  };

  const styles = variantStyles[variant];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="glass-frosted rounded-2xl p-6 max-w-md w-full">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${styles.icon} bg-opacity-10`}
                  style={{ backgroundColor: variant === 'danger' ? 'rgba(232, 0, 77, 0.1)' : undefined }}
                >
                  <AlertTriangle className="w-6 h-6" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    {title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {message}
                  </p>
                </div>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="p-1 rounded-lg glass-frosted text-foreground/60 hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold glass-frosted text-foreground hover:bg-foreground/10 transition-colors"
                >
                  {cancelText}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onConfirm}
                  className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold text-white transition-all"
                  style={{ background: styles.confirmBg }}
                >
                  {confirmText}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
