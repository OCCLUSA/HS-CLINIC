import { Link, Outlet, useLocation } from 'react-router-dom';
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
import { useEffect, useRef, useState } from 'react';
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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownTriggerRef = useRef<HTMLButtonElement | null>(null);
  const previousPathRef = useRef<string | null>(null);
  const location = useLocation();
  const { settings } = useSiteSettings();

  const serviceSubItems = [
    { name: 'Dental Implants', href: '/services/dental-implants' },
    { name: 'TMJ/TMD Treatment', href: '/services/tmj-tmd-treatment' },
    { name: 'Clear Aligners', href: '/services/clear-aligners' },
    { name: 'Full Arch Rehab', href: '/services/full-arch-rehabilitation' },
  ];

  const internationalPatientSubItems = [
    { name: 'Start with your records', href: '/send-your-records' },
    { name: 'Patient journey', href: '/dental-tourism/program' },
    { name: 'Gulf patient guide', href: '/dental-tourism/gulf' },
    { name: 'Europe patient guide', href: '/dental-tourism/europe' },
    { name: 'Company partnerships', href: '/dental-tourism/partners' },
  ];

  const patientGuideLinks = [
    { label: 'Start with your records', path: '/send-your-records' },
    { label: 'Patient journey', path: '/dental-tourism/program' },
    { label: 'Gulf patient guide', path: '/dental-tourism/gulf' },
    { label: 'Europe patient guide', path: '/dental-tourism/europe' },
    { label: 'Company partnerships', path: '/dental-tourism/partners' },
  ];

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services', subItems: serviceSubItems },
    { name: 'Technology', href: '/technology' },
    { name: 'Smile Design', href: '/digital-smile-design' },
    {
      name: 'International Patients',
      href: '/dental-tourism',
      subItems: internationalPatientSubItems,
    },
    { name: 'HS Dental Cases', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  useEffect(() => {
    const resetMenus = window.setTimeout(() => {
      setMobileMenuOpen(false);
      setOpenDropdown(null);
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, 0);

    return () => window.clearTimeout(resetMenus);
  }, [location.pathname]);

  useEffect(() => {
    const previousPath = previousPathRef.current;
    previousPathRef.current = location.pathname;
    if (previousPath === null || previousPath === location.pathname) return;

    const main = document.getElementById('main');
    if (!main) return;

    let focused = false;
    const focusPageHeading = () => {
      if (focused) return true;
      const heading = main.querySelector<HTMLElement>('h1');
      if (!heading) return false;
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
      focused = true;
      return true;
    };

    const observer = new MutationObserver(() => {
      if (focusPageHeading()) observer.disconnect();
    });
    observer.observe(main, { childList: true, subtree: true });
    const focusTimer = window.setTimeout(focusPageHeading, 0);
    const stopTimer = window.setTimeout(() => observer.disconnect(), 5000);

    return () => {
      window.clearTimeout(focusTimer);
      window.clearTimeout(stopTimer);
      observer.disconnect();
    };
  }, [location.pathname]);

  useEffect(() => {
    const closeMenusOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        const returnFocusTo = openDropdown
          ? dropdownTriggerRef.current
          : mobileMenuOpen
            ? mobileMenuButtonRef.current
            : null;
        setMobileMenuOpen(false);
        setOpenDropdown(null);
        window.requestAnimationFrame(() => returnFocusTo?.focus());
      }
    };

    window.addEventListener('keydown', closeMenusOnEscape);
    return () => window.removeEventListener('keydown', closeMenusOnEscape);
  }, [mobileMenuOpen, openDropdown]);

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
                  className="h-28 w-auto transition-all group-hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.6)] lg:h-32"
                  src={clinicLogo}
                  alt="Dr. Haitham Sharshar — Dental Clinic"
                  width={2000}
                  height={2000}
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex lg:gap-x-8">
              {navigation.map((item) =>
                item.subItems ? (
                  <div
                    key={item.name}
                    className="group relative flex items-center"
                    onMouseEnter={() => setOpenDropdown(item.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      type="button"
                      onClick={(event) => {
                        dropdownTriggerRef.current = event.currentTarget;
                        setOpenDropdown(openDropdown === item.name ? null : item.name);
                      }}
                      aria-expanded={openDropdown === item.name}
                      aria-controls={`desktop-submenu-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                      className={`relative inline-flex items-center gap-1 text-sm font-medium transition-colors duration-300 after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 after:-translate-x-1/2 after:rounded-full after:transition-all after:duration-300 after:ease-out ${
                        isActive(item.href)
                          ? 'text-gold-400 after:bg-gold-400 after:w-full'
                          : 'hover:text-gold-400 after:bg-gold-400 text-gray-400 hover:after:w-full'
                      }`}
                    >
                      {item.name}
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${openDropdown === item.name ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {openDropdown === item.name && (
                      <div className="absolute top-full left-1/2 z-50 -translate-x-1/2 pt-2">
                        <div
                          id={`desktop-submenu-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                          className="bg-dark-900/95 max-h-[calc(100vh-6rem)] w-80 overflow-y-auto rounded-xl border border-white/10 shadow-2xl shadow-black/40 backdrop-blur-xl"
                        >
                          <div className="p-2">
                            <Link
                              to={item.href}
                              onClick={() => setOpenDropdown(null)}
                              className="text-gold-300 block rounded-lg border-b border-white/10 px-3 py-2.5 text-sm font-semibold hover:bg-white/5"
                            >
                              All {item.name}
                            </Link>
                            {item.subItems.map((sub) => (
                              <Link
                                key={sub.name}
                                to={sub.href}
                                onClick={() => setOpenDropdown(null)}
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
            <div className="flex lg:hidden">
              <button
                ref={mobileMenuButtonRef}
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400 hover:text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <span className="sr-only">
                  {mobileMenuOpen ? 'Close main menu' : 'Open main menu'}
                </span>
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
          <div
            id="mobile-menu"
            className="bg-dark-900 max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain border-b border-white/10 lg:hidden"
          >
            <div className="space-y-1 px-4 pt-2 pb-[max(1rem,env(safe-area-inset-bottom))]">
              {navigation.map((item) =>
                item.subItems ? (
                  <div key={item.name}>
                    <button
                      type="button"
                      onClick={(event) => {
                        dropdownTriggerRef.current = event.currentTarget;
                        setOpenDropdown(openDropdown === item.name ? null : item.name);
                      }}
                      aria-expanded={openDropdown === item.name}
                      aria-controls={`mobile-submenu-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className={`flex min-h-11 w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium ${
                        isActive(item.href)
                          ? 'bg-gold-400/10 text-gold-400'
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {item.name}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${openDropdown === item.name ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {openDropdown === item.name && (
                      <div
                        id={`mobile-submenu-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="mt-1 ml-4 space-y-1 border-l border-white/10 pl-3"
                      >
                        <Link
                          to={item.href}
                          className={`flex min-h-11 items-center rounded-md px-3 py-2 text-sm font-medium ${
                            location.pathname === item.href
                              ? 'text-gold-400'
                              : 'hover:text-gold-400 text-gray-400'
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          All {item.name}
                        </Link>
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.href}
                            className={`flex min-h-11 items-center rounded-md px-3 py-2 text-sm font-medium ${
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
                    className={`flex min-h-11 items-center rounded-md px-3 py-2 text-base font-medium ${
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
        <Outlet key={location.pathname} />
      </main>

      <footer className="bg-dark-900 border-t border-white/5 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-5">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <img
                className="h-16 w-auto"
                src={clinicLogo}
                alt="Dr. Haitham Sharshar — Dental Clinic"
                width={2000}
                height={2000}
              />
            </div>
            <p className="mb-6 max-w-sm font-light text-gray-400">
              Dental care in Cairo guided by patient questions, clinical examination, appropriate
              records, and clinician review.
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
              Patient Guides
            </h3>
            <ul className="space-y-2">
              {patientGuideLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="hover:text-gold-400 text-sm text-gray-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
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
              className="hover:text-gold-400 text-gray-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="hover:text-gold-400 text-gray-400 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/medical-disclaimer"
              className="hover:text-gold-400 text-gray-400 transition-colors"
            >
              Medical Disclaimer
            </Link>
            <Link to="/guarantee" className="hover:text-gold-400 text-gray-400 transition-colors">
              Coverage Terms
            </Link>
          </div>
          <p className="text-center font-mono text-xs text-gray-400">
            &copy; {new Date().getFullYear()} HS Clinic — Dr. Haitham Sharshar. Cairo dental clinic.
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp + Call CTA */}
      <FloatingCTA />
      <CookieConsent />
    </div>
  );
}
