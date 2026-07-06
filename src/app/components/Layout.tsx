import { Link, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  ChevronDown,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState } from 'react';
import clinicLogo from '../../assets/logo.webp';
import { FloatingCTA } from './FloatingCTA';
import { CookieConsent } from './CookieConsent';
import { useSiteSettings } from '@/hooks/useCmsData';

/** Maps Sanity social platform strings → Lucide icons */
const SOCIAL_ICONS: Record<string, LucideIcon> = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  tiktok: Twitter, // Lucide has no TikTok icon; fallback to Twitter-style
};

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  const { settings } = useSiteSettings();

  const serviceSubItems = [
    { name: 'Dental Implants', href: '/services/dental-implants' },
    { name: 'TMJ/TMD Treatment', href: '/services/tmj-tmd-treatment' },
    { name: 'Clear Aligners', href: '/services/clear-aligners' },
    { name: 'Full Arch Rehab', href: '/services/full-arch-rehabilitation' },
  ];

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services', subItems: serviceSubItems },
    { name: 'Technology', href: '/technology' },
    { name: 'Smile Design', href: '/digital-smile-design' },
    { name: 'Dental Tourism', href: '/dental-tourism' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <div className="bg-dark-950 selection:bg-gold-400/30 selection:text-gold-400 flex min-h-screen flex-col font-sans text-gray-200">
      {/* Skip to content — keyboard-only link */}
      <a
        href="#main"
        className="focus:bg-gold-400 focus:text-dark-950 sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded focus:px-4 focus:py-2 focus:font-semibold focus:outline-none"
      >
        Skip to content
      </a>

      <header className="bg-dark-950/80 fixed z-50 w-full border-b border-white/5 backdrop-blur-md">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Global">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-2">
              <Link to="/" className="group -m-1.5 flex items-center p-1.5">
                <img
                  className="h-28 w-auto transition-all group-hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.6)] md:h-32"
                  src={clinicLogo}
                  alt="Dr. Haitham Sharshar — Dental Clinic"
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex md:gap-x-8">
              {navigation.map((item) =>
                item.subItems ? (
                  <div
                    key={item.name}
                    className="group relative flex items-center"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <Link
                      to={item.href}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                      className={`relative inline-flex items-center gap-1 text-sm font-medium transition-colors duration-300 after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 after:-translate-x-1/2 after:rounded-full after:transition-all after:duration-300 after:ease-out ${
                        isActive(item.href)
                          ? 'text-gold-400 after:bg-gold-400 after:w-full'
                          : 'hover:text-gold-400 after:bg-gold-400 text-gray-400 hover:after:w-full'
                      }`}
                    >
                      {item.name}
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                      />
                    </Link>
                    {servicesOpen && (
                      <div className="absolute top-full left-1/2 z-50 -translate-x-1/2 pt-2">
                        <div className="bg-dark-900/95 w-56 overflow-hidden rounded-xl border border-white/10 shadow-2xl shadow-black/40 backdrop-blur-xl">
                          <div className="p-2">
                            {item.subItems.map((sub) => (
                              <Link
                                key={sub.name}
                                to={sub.href}
                                className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                                  isActive(sub.href)
                                    ? 'bg-gold-400/10 text-gold-400'
                                    : 'hover:text-gold-400 text-gray-300 hover:bg-white/5'
                                }`}
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={`relative text-sm font-medium transition-colors duration-300 after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 after:-translate-x-1/2 after:rounded-full after:transition-all after:duration-300 after:ease-out ${
                      isActive(item.href)
                        ? 'text-gold-400 after:bg-gold-400 after:w-full'
                        : 'hover:text-gold-400 after:bg-gold-400 text-gray-400 hover:after:w-full'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400 hover:text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div id="mobile-menu" className="bg-dark-900 border-b border-white/10 md:hidden">
            <div className="space-y-1 px-4 pt-2 pb-3">
              {navigation.map((item) =>
                item.subItems ? (
                  <div key={item.name}>
                    <button
                      type="button"
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium ${
                        isActive(item.href)
                          ? 'bg-gold-400/10 text-gold-400'
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {item.name}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {servicesOpen && (
                      <div className="mt-1 ml-4 space-y-1 border-l border-white/10 pl-3">
                        <Link
                          to={item.href}
                          className={`block rounded-md px-3 py-1.5 text-sm font-medium ${
                            location.pathname === item.href
                              ? 'text-gold-400'
                              : 'hover:text-gold-400 text-gray-400'
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          All Services
                        </Link>
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.href}
                            className={`block rounded-md px-3 py-1.5 text-sm font-medium ${
                              isActive(sub.href)
                                ? 'text-gold-400'
                                : 'hover:text-gold-400 text-gray-400'
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={`block rounded-md px-3 py-2 text-base font-medium ${
                      isActive(item.href)
                        ? 'bg-gold-400/10 text-gold-400'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </header>

      <main id="main" className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            onAnimationStart={() => window.scrollTo(0, 0)}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-dark-900 border-t border-white/5 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <img
                className="h-16 w-auto"
                src={clinicLogo}
                alt="Dr. Haitham Sharshar — Dental Clinic"
              />
            </div>
            <p className="mb-6 max-w-sm font-light text-gray-400">
              Digital dentistry in the Middle East, combining precision, technology,
              and art combined.
            </p>
            {settings.socialLinks.length > 0 && (
              <div className="flex gap-3">
                {settings.socialLinks.map((link) => {
                  const Icon = SOCIAL_ICONS[link.platform];
                  if (!Icon) return null;
                  return (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.platform}
                      className="hover:bg-gold-400/20 hover:text-gold-400 flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-gray-400 transition-all duration-300"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <h3 className="mb-4 font-mono text-sm font-semibold tracking-wider text-white uppercase">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="hover:text-gold-400 flex items-center gap-2 text-gray-400 transition-colors">
                <Phone className="text-gold-500 h-4 w-4" />
                <span>{settings.phone}</span>
              </li>
              <li className="hover:text-gold-400 flex items-center gap-2 text-gray-400 transition-colors">
                <Mail className="text-gold-500 h-4 w-4" />
                <a
                  href={`mailto:${settings.email}`}
                  className="hover:text-gold-400 transition-colors"
                  aria-label={`Email ${settings.email}`}
                >
                  <span>{settings.email.replace('@', '\u200B@\u200B')}</span>
                </a>
              </li>
              <li className="hover:text-gold-400 flex items-start gap-2 text-gray-400 transition-colors">
                <MapPin className="text-gold-500 mt-1 h-4 w-4" />
                <span>{settings.address}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-sm font-semibold tracking-wider text-white uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="hover:text-gold-400 text-sm text-gray-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/5 pt-8">
          <div className="mb-4 flex flex-wrap justify-center gap-4 text-xs">
            <Link
              to="/privacy-policy"
              className="hover:text-gold-400 text-gray-500 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="hover:text-gold-400 text-gray-500 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/medical-disclaimer"
              className="hover:text-gold-400 text-gray-500 transition-colors"
            >
              Medical Disclaimer
            </Link>
            <Link to="/guarantee" className="hover:text-gold-400 text-gray-500 transition-colors">
              Coverage Terms
            </Link>
          </div>
          <p className="text-center font-mono text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Dr. Haitham Sharshar. Cairo dental clinic.
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp + Call CTA */}
      <FloatingCTA />
      <CookieConsent />
    </div>
  );
}
