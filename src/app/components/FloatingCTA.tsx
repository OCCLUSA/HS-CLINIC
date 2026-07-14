import { Phone, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSiteSettings } from '@/hooks/useCmsData';
import { trackPhoneClick, trackWhatsAppClick } from '@/lib/analytics';

/**
 * FloatingCTA — Sticky mobile CTA with WhatsApp + Call buttons.
 * Appears after user scrolls 300px down. Hidden on /studio route.
 * Uses phone number from Sanity CMS site settings.
 */
export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const { settings } = useSiteSettings();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide on studio
  if (location.pathname.startsWith('/studio')) return null;

  // Extract digits from phone for tel: and wa.me links
  const rawPhone = settings?.phone || '';
  const digits = rawPhone.replace(/[^0-9+]/g, '');
  const waDigits = digits.replace('+', '');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="privacy-aware-cta fixed right-4 bottom-[calc(1.5rem+env(safe-area-inset-bottom))] z-50 flex flex-col gap-3 transition-[bottom] duration-200 md:right-6 md:bottom-8"
          role="complementary"
          aria-label="Quick contact buttons"
        >
          {/* WhatsApp Button */}
          <a
            href={`https://api.whatsapp.com/send/?phone=${waDigits}&text=Hello%20Dr.%20Haitham%2C%20I%20would%20like%20to%20book%20a%20consultation.`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open WhatsApp third-party service"
            onClick={() => trackWhatsAppClick('floating_cta')}
            className="group flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 transition-all duration-200 hover:scale-[1.03] hover:shadow-xl hover:shadow-[#25D366]/40"
          >
            <MessageCircle className="h-6 w-6 text-white" />
          </a>

          {/* Call Button */}
          <a
            href={`tel:${digits}`}
            aria-label="Call the clinic"
            onClick={() => trackPhoneClick('floating_cta')}
            className="group bg-gold-500 shadow-gold-500/30 hover:shadow-gold-500/40 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:scale-[1.03] hover:shadow-xl"
          >
            <Phone className="h-6 w-6 text-slate-950" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
