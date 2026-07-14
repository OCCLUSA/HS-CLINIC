import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

const NOTICE_KEY = 'hs-privacy-notice';

export function PrivacyNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!localStorage.getItem(NOTICE_KEY)) setVisible(true);
    }, 3000);
    return () => window.clearTimeout(timer);
  }, []);

  const acknowledge = () => {
    localStorage.setItem(NOTICE_KEY, 'acknowledged');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 16 }}
          animate={{ y: 0 }}
          exit={{ y: 16 }}
          transition={{ duration: 0.2 }}
          data-privacy-notice
          className="bg-dark-900/95 fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-40 mx-auto max-w-lg rounded-xl border border-white/10 p-3 shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:right-auto sm:bottom-4 sm:left-4 sm:p-4"
          role="dialog"
          aria-label="Privacy notice"
          aria-describedby="privacy-notice-description"
        >
          <div data-privacy-notice-row className="flex items-center gap-3">
            <ShieldCheck className="text-gold-400 h-5 w-5 shrink-0" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-white">Privacy first</h3>
              <p
                id="privacy-notice-description"
                className="mt-0.5 text-[11px] leading-4 text-gray-400 sm:text-xs"
              >
                No analytics or advertising trackers. Maps and videos load only when you choose
                them. See our{' '}
                <a href="/privacy-policy" className="text-gold-400 underline underline-offset-2">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
            <button
              type="button"
              onClick={acknowledge}
              className="bg-gold-500 hover:bg-gold-400 min-h-11 shrink-0 rounded-lg px-3 py-2 text-sm font-semibold text-slate-950 transition-colors"
            >
              Got it
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
