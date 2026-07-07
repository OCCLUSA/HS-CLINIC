import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  SEO,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  DENTAL_TOURISM_JSONLD,
  REGIONAL_TOURISM_LINKS,
  TOURISM_EDUCATION_LINKS,
  buildDentalTourismHreflangTags,
  buildFaqJsonLd,
} from '@/lib/seo';
import { Globe, ChevronRight, Phone, Star, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WhyHSClinic } from '@/app/components/tourism/WhyHSClinic';
import { ServicesGrid } from '@/app/components/tourism/ServicesGrid';
import { FAQAccordion } from '@/app/components/tourism/FAQAccordion';
import { ConsultationForm } from '@/app/components/tourism/ConsultationForm';
import { BeforeAfterSlider } from '@/app/components/tourism/BeforeAfterSlider';
import { CuratedResidences } from '@/app/components/tourism/CuratedResidences';
import { VIPWelcome } from '@/app/components/tourism/VIPWelcome';
import { RoyalDentalJourney } from '@/app/components/tourism/RoyalDentalJourney';
import { StyleReferenceShowcase } from '@/app/components/StyleReferenceShowcase';
import {
  useTestimonials,
  useTourismPricing,
  useFaqs,
  useTourismSettings,
} from '@/hooks/useCmsData';
import { getIcon } from '@/lib/iconMap';
import { trackWhatsAppClick } from '@/lib/analytics';

export default function DentalTourism() {
  const { testimonials } = useTestimonials();
  const { pricing: cmsPricing } = useTourismPricing();
  const { faqs: cmsFaqs } = useFaqs();
  const { tourism } = useTourismSettings();

  // Build FAQ schema from CMS data for SEO/GEO
  const faqJsonLd = useMemo(
    () => buildFaqJsonLd(cmsFaqs.map((f) => ({ question: f.question, answer: f.answer }))),
    [cmsFaqs]
  );

  // Real CMS testimonials only; no fabricated fallback patient quotes.
  const reviews = testimonials.map((t) => ({
    name: t.name,
    country: `${t.countryFlag ?? ''} ${t.country ?? ''}`.trim() || '🌍',
    text: t.text,
    stars: t.stars,
  }));

  // Use CMS pricing if available, otherwise safe case-review placeholders.
  const priceComparison = cmsPricing.map((p) => ({
    treatment: p.treatment,
    egypt: p.egyptPrice,
    usa: p.usaPrice,
    uk: p.ukPrice,
    turkey: p.turkeyPrice ?? '—',
    hungary: p.hungaryPrice ?? '—',
    uae: p.uaePrice ?? '—',
    saving: p.saving,
  }));

  const fusionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: fusionRef,
    offset: ['start end', 'end start'],
  });
  const fusionOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const fusionScale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1]);

  return (
    <div className="bg-dark-950 min-h-screen overflow-hidden">
      <Helmet>
        <title>{SEO.dentalTourism.title}</title>
        <meta name="description" content={SEO.dentalTourism.description} />
        <link rel="canonical" href={SEO.dentalTourism.canonical} />
        <meta property="og:title" content={SEO.dentalTourism.title} />
        <meta property="og:description" content={SEO.dentalTourism.description} />
        <meta property="og:url" content={SEO.dentalTourism.canonical} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:alt" content="Dr. Haitham Sharshar — HS Clinic Cairo" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content="en_EG" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.dentalTourism.title} />
        <meta name="twitter:description" content={SEO.dentalTourism.description} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        {buildDentalTourismHreflangTags(SEO.dentalTourism.canonical).map((tag) => (
          <link key={tag.hrefLang} rel={tag.rel} hrefLang={tag.hrefLang} href={tag.href} />
        ))}
        {/* JSON-LD: Dental Tourism MedicalBusiness schema */}
        <script type="application/ld+json">{JSON.stringify(DENTAL_TOURISM_JSONLD)}</script>
        {/* JSON-LD: FAQPage schema for AI/GEO answer extraction */}
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      {/* ==========================================
          SECTION 1: CINEMATIC HERO
          ========================================== */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Background pattern — circuit + geometry grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(197,165,90,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(197,165,90,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        <div className="bg-gold-400/10 absolute top-0 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full mix-blend-screen blur-[150px]" />
        <div className="bg-gold-600/5 absolute right-0 bottom-0 h-[400px] w-[600px] rounded-full mix-blend-screen blur-[120px]" />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
          {/* Left: Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="border-gold-400/30 bg-gold-400/10 text-gold-400 mx-auto mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2"
            >
              <Globe className="h-4 w-4 animate-pulse" />
              <span className="font-mono text-xs tracking-wider">{tourism.heroTagline}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 font-serif text-4xl leading-[1.1] font-bold tracking-tight md:text-6xl lg:text-7xl"
            >
              <span className="text-white">{tourism.heroTitle}</span>
              <br />
              <span className="from-gold-300 via-gold-400 bg-gradient-to-r to-white bg-clip-text text-transparent">
                {tourism.heroTitleAccent}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed font-light text-gray-400 md:text-xl"
            >
              {tourism.heroSubtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link
                to="/contact"
                className="group bg-gold-400 text-dark-950 relative overflow-hidden rounded-lg px-8 py-4 font-bold transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(212,175,55,0.5)]"
              >
                <div className="absolute inset-0 translate-y-full bg-white/30 transition-transform duration-300 group-hover:translate-y-0" />
                <span className="relative flex items-center gap-2">
                  {tourism.heroCtaText} <ChevronRight className="h-5 w-5" />
                </span>
              </Link>
              <a
                href="https://api.whatsapp.com/send/?phone=201101010599"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('dental_tourism_hero')}
                className="border-gold-400/30 text-gold-400 hover:bg-gold-400/10 flex items-center gap-2 rounded-lg border px-8 py-4 transition-all"
              >
                <Phone className="h-5 w-5" />
                WhatsApp Us
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="text-gold-400 font-mono text-sm tracking-[0.25em] uppercase">
              Country guides
            </p>
            <h2 className="mt-3 font-serif text-3xl text-white md:text-5xl">
              Find the page written for your travel route
            </h2>
            <p className="mt-4 text-sm leading-6 text-gray-400">
              Each guide explains records review, visit timing, and follow up in plain language.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {REGIONAL_TOURISM_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="hover:border-gold-400/40 rounded-xl border border-white/10 bg-white/[0.03] p-5 text-white transition hover:bg-white/[0.06]"
              >
                <span className="text-gold-300 text-sm font-semibold">{link.label}</span>
                <span className="mt-2 block text-xs leading-5 text-gray-500">
                  Records first dental travel planning in Cairo.
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {TOURISM_EDUCATION_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="border-gold-400/30 text-gold-300 hover:bg-gold-400/10 rounded-full border px-4 py-2 text-sm transition"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 1.5: ROYAL DENTAL JOURNEY
          ========================================== */}
      <RoyalDentalJourney />

      {/* ==========================================
          SECTION 2: FUSION — TECH × HISTORY
          ========================================== */}
      <section ref={fusionRef} className="relative overflow-hidden px-4 py-32 sm:px-6 lg:px-8">
        <motion.div
          style={{ opacity: fusionOpacity, scale: fusionScale }}
          className="mx-auto max-w-7xl"
        >
          <div className="mb-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-gold-400 mb-3 font-mono text-sm tracking-[0.3em] uppercase"
            >
              {tourism.fusionSubheading}
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 font-serif text-4xl text-white md:text-6xl"
            >
              {tourism.fusionTitle}
            </motion.h3>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="border-gold-400/20 relative overflow-hidden rounded-2xl border">
              <BeforeAfterSlider />
            </div>
            <div className="border-gold-400/20 group relative h-80 overflow-hidden rounded-2xl border">
              <img
                src="/images/tourism/The-pyramids-the-Sphinx-and-the-buildings-of-Cairo-1200x720.webp"
                alt="Pyramids of Giza at sunset"
                className="absolute inset-0 h-full w-full object-cover opacity-50 transition-all duration-1000 group-hover:scale-110 group-hover:opacity-100"
                loading="lazy"
              />
              <div className="from-dark-950 via-dark-950/30 absolute inset-0 bg-gradient-to-t to-transparent" />
            </div>
          </div>
        </motion.div>
      </section>

      <VIPWelcome features={tourism.vipFeatures} stats={tourism.vipStats} />
      <WhyHSClinic reasons={tourism.whyClinicReasons} />
      <ServicesGrid />

      {/* PRICE COMPARISON */}
      <section className="border-t border-white/5 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h3 className="mb-4 font-serif text-4xl text-white md:text-5xl">
              Compare Your Treatment Plan
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-3 py-4 font-mono text-xs text-gray-500 uppercase">Treatment</th>
                  <th className="text-gold-400 px-3 py-4 font-mono text-xs uppercase">
                    Cairo Plan
                  </th>
                  <th className="px-3 py-4 font-mono text-xs text-gray-500 uppercase">
                    Local Quote
                  </th>
                  <th className="text-gold-400 px-3 py-4 font-mono text-xs tracking-wider uppercase">
                    Review
                  </th>
                </tr>
              </thead>
              <tbody>
                {priceComparison.map((row, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="px-3 py-4 text-sm text-white">{row.treatment}</td>
                    <td className="text-gold-400 px-3 py-4 text-sm font-bold">{row.egypt}</td>
                    <td className="px-3 py-4 text-sm text-gray-500">{row.usa}</td>
                    <td className="px-3 py-4">
                      <span className="bg-gold-400/10 text-gold-400 rounded-full px-2 py-1 text-xs font-bold">
                        {row.saving}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      {/* REVIEWS */}
      {reviews.length > 0 && (
        <section className="overflow-hidden border-t border-white/5 py-24">
          <div className="mx-auto mb-12 max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h3 className="font-serif text-4xl text-white md:text-5xl">Patient Reviews</h3>
          </div>
          <div className="relative">
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="flex gap-6"
            >
              {[...reviews, ...reviews].map((review, i) => (
                <div
                  key={i}
                  className="bg-dark-900/60 w-[280px] flex-shrink-0 rounded-2xl border border-white/5 p-6 backdrop-blur-md sm:w-[380px]"
                >
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: review.stars }).map((_, j) => (
                      <Star key={j} className="fill-gold-400 text-gold-400 h-4 w-4" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-300 italic">{review.text}</p>
                  <div className="mt-4 flex items-center justify-between text-sm text-white">
                    <span>{review.name}</span>
                    <span>{review.country}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* TIMELINE */}
      <section className="border-t border-white/5 px-4 py-32 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <h3 className="font-serif text-4xl text-white md:text-5xl">Four Steps to Your Smile</h3>
        </div>
        <div className="mx-auto grid max-w-4xl gap-8">
          {tourism.timelineSteps.map((step, i) => {
            const Icon = getIcon(step.iconName);
            return (
              <div
                key={i}
                className="bg-dark-900/50 flex flex-col gap-4 rounded-2xl border border-white/5 p-6 sm:flex-row sm:gap-6"
              >
                <div className="bg-gold-400/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg">
                  <Icon className="text-gold-400 h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-white">{step.title}</h4>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <StyleReferenceShowcase
        eyebrow="Clinic planning language"
        title="Dental travel should feel clear before it feels luxurious"
        intro="These visuals help international patients understand the difference between cosmetic images, real treatment planning, and clinician-reviewed dental records before choosing travel dates."
        imageIds={[
          'smileMakeoverBeforeAfterStyle',
          'toothEnamelArt',
          'toothAnatomyArt',
          'ceramicVeneerShade',
        ]}
        links={[
          { label: 'Gulf implant guide', to: '/dental-tourism/gulf/dental-implant-travel-guide' },
          {
            label: 'Europe implant guide',
            to: '/dental-tourism/europe/dental-implant-travel-guide',
          },
          { label: 'HS Dental Cases', to: '/gallery' },
        ]}
      />

      <CuratedResidences residences={tourism.residences} />
      <FAQAccordion cmsFaqs={cmsFaqs} />
      <ConsultationForm />

      <section className="relative border-t border-white/5 px-4 py-32 text-center sm:px-6 lg:px-8">
        <Award className="text-gold-400 mx-auto mb-6 h-12 w-12" />
        <h2 className="mb-6 font-serif text-4xl text-white md:text-6xl">Experience Egypt.</h2>
        <Link
          to="/contact"
          className="bg-gold-400 text-dark-950 inline-block rounded-lg px-10 py-5 font-bold transition-all hover:scale-105"
        >
          {tourism.bottomCtaText}
        </Link>
      </section>
    </div>
  );
}
