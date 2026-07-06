import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';

const CONSENT_KEY = 'hs-cookie-consent';

/**
 * CookieConsent — GDPR-style cookie consent banner.
 * Shows once on first visit. Persisted to localStorage.
 * HS Clinic uses essential cookies only (no tracking).
 */
export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show banner after the page has settled so it does not interrupt appointment forms.
    const timer = setTimeout(() => {
      if (!localStorage.getItem(CONSENT_KEY)) {
        setIsVisible(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setIsVisible(false);
  };

  const handleDismiss = () => {
    localStorage.setItem(CONSENT_KEY, 'dismissed');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="bg-dark-900/95 fixed inset-x-3 bottom-3 z-40 mx-auto max-w-sm rounded-xl border border-white/10 p-4 shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:right-4 sm:bottom-4 sm:left-auto"
          role="dialog"
          aria-label="Cookie consent"
          aria-describedby="cookie-desc"
        >
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 text-gray-500 transition-colors hover:text-white"
            aria-label="Dismiss cookie notice"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-start gap-3">
            <Cookie className="text-gold-400 mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-white">Essential cookies only</h3>
              <p id="cookie-desc" className="mt-1 text-xs leading-relaxed text-gray-400">
                We use essential cookies for basic site function. No tracking or advertising
                cookies are used. See our{' '}
                <a href="/privacy-policy" className="text-gold-400 underline underline-offset-2">
                  Privacy Policy
                </a>
                .
              </p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={handleAccept}
                  className="bg-gold-500 hover:bg-gold-400 rounded-lg px-4 py-1.5 text-xs font-semibold text-slate-950 transition-colors"
                >
                  Accept
                </button>
                <button
                  onClick={handleDismiss}
                  className="rounded-lg border border-white/10 px-4 py-1.5 text-xs text-gray-400 transition-colors hover:border-white/20 hover:text-white"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
