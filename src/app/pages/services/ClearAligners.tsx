import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight, CheckCircle2 } from 'lucide-react';
import {
  SEO,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  CLEAR_ALIGNERS_JSONLD,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
} from '@/lib/seo';
import { useServicePillar } from '@/hooks/useCmsData';
import { urlFor } from '@/lib/sanityClient';
import { MedicallyReviewedBadge } from '@/app/components/MedicallyReviewedBadge';

const breadcrumbs = buildBreadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Clear Aligners', path: '/services/clear-aligners' },
]);

export default function ClearAligners() {
  const { pillar } = useServicePillar('clear-aligners');

  const faqJsonLd = useMemo(() => buildFaqJsonLd(pillar.faqs), [pillar.faqs]);

  const seoTitle = pillar.seoTitle ?? SEO.clearAligners.title;
  const seoDesc = pillar.seoDescription ?? SEO.clearAligners.description;

  return (
    <div className="bg-dark-950 min-h-screen pt-24 pb-12">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <link rel="canonical" href={SEO.clearAligners.canonical} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:url" content={SEO.clearAligners.canonical} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:alt" content="Dr. Haitham Sharshar — HS Clinic Cairo" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content="en_EG" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDesc} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(CLEAR_ALIGNERS_JSONLD)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbs)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      {/* Breadcrumb */}
      <div className="mx-auto max-w-6xl px-4">
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-gray-400">
          <Link to="/" className="transition-colors hover:text-amber-400">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/services" className="transition-colors hover:text-amber-400">
            Services
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-amber-400">Clear Aligners</span>
        </nav>
        <MedicallyReviewedBadge lastUpdated="Feb 2026" />
      </div>

      {/* Hero */}
      <section className="mx-auto mb-20 max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {pillar.heroTagline && (
            <div className="mb-4 inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1 text-sm text-amber-400">
              {pillar.heroTagline}
            </div>
          )}
          <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            {pillar.heroTitle === 'Digitally Integrated Clear Aligner Therapy' ? (
              <>
                Digitally Integrated <span className="text-amber-400">Clear Aligner Therapy</span>
              </>
            ) : (
              <span className="text-amber-400">{pillar.heroTitle}</span>
            )}
          </h1>
          <p className="mb-8 max-w-3xl text-lg leading-relaxed text-gray-300">
            {pillar.heroSubtitle}
          </p>
          <Link
            to="/contact"
            className="text-dark-950 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 font-semibold transition-colors hover:bg-amber-400"
          >
            {pillar.ctaPrimary} <ArrowRight className="h-4 w-4" />
          </Link>
          {pillar.heroImage && (
            <motion.div
              className="mt-10 overflow-hidden rounded-2xl border border-amber-500/20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <img
                src={urlFor(pillar.heroImage).width(1200).quality(85).auto('format').url()}
                alt={pillar.heroTitle}
                className="h-auto w-full object-cover"
                loading="lazy"
              />
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Benefits Grid */}
      {pillar.benefits?.length > 0 && (
        <section className="mx-auto mb-20 max-w-6xl px-4">
          <h2 className="mb-8 text-3xl font-bold text-white">
            Why Choose Digital Clear Aligners at HS Clinic?
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pillar.benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="bg-dark-900/50 rounded-xl border border-white/10 p-6"
              >
                <CheckCircle2 className="mb-3 h-6 w-6 text-amber-400" />
                <h3 className="mb-2 text-lg font-semibold text-white">{b.title}</h3>
                <p className="text-sm text-gray-400">{b.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* NLP Content */}
      <section className="mx-auto mb-20 max-w-6xl px-4">
        <h2 className="mb-6 text-3xl font-bold text-white">
          The HS Clinic Difference: Occlusion-Optimized Aligners
        </h2>
        <div className="prose prose-invert max-w-none space-y-4 leading-relaxed text-gray-300">
          <p>
            Most clear aligner treatments focus solely on tooth alignment — making teeth straight.
            Dr. Sharshar goes further by integrating digital occlusal analysis into every aligner
            case. T-Scan digital bite analysis and jaw tracking support review of final tooth
            positions, bite function, tooth wear risk, and jaw comfort during clinician-led
            planning.
          </p>
          <p>
            As an Official exocad Certified ICTP Trainer for the Middle East, Dr. Sharshar maintains
            quality control standards in every digital dentistry workflow. Each aligner tray is
            designed and reviewed within a digital pipeline to support controlled tooth movement and
            treatment planning.
          </p>
        </div>
      </section>

      {/* FAQ */}
      {pillar.faqs?.length > 0 && (
        <section className="mx-auto mb-20 max-w-6xl px-4">
          <h2 className="mb-8 text-3xl font-bold text-white">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {pillar.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group bg-dark-900/50 rounded-xl border border-white/10"
              >
                <summary className="flex cursor-pointer items-center justify-between p-5 font-medium text-white">
                  {faq.question}
                  <ChevronRight className="h-4 w-4 text-amber-400 transition-transform group-open:rotate-90" />
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-gray-400">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Related Services */}
      <section className="mx-auto mb-20 max-w-6xl px-4">
        <h2 className="mb-6 text-2xl font-bold text-white">Related Services</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            to="/digital-smile-design"
            className="group bg-dark-900/50 rounded-xl border border-white/10 p-5 transition-colors hover:border-amber-400/30"
          >
            <h3 className="font-semibold text-white transition-colors group-hover:text-amber-400">
              Digital Smile Design
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Preview your final smile before treatment begins
            </p>
          </Link>
          <Link
            to="/services/tmj-tmd-treatment"
            className="group bg-dark-900/50 rounded-xl border border-white/10 p-5 transition-colors hover:border-amber-400/30"
          >
            <h3 className="font-semibold text-white transition-colors group-hover:text-amber-400">
              TMJ/TMD Treatment
            </h3>
            <p className="mt-2 text-sm text-gray-400">Review bite function during planning</p>
          </Link>
          <Link
            to="/services/dental-implants"
            className="group bg-dark-900/50 rounded-xl border border-white/10 p-5 transition-colors hover:border-amber-400/30"
          >
            <h3 className="font-semibold text-white transition-colors group-hover:text-amber-400">
              Dental Implants
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Replace missing teeth with digitally guided implants
            </p>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 text-center">
        <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-amber-600/5 p-12">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Ready for a Straighter, Healthier Smile?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-300">
            See your digital treatment simulation before starting. Book a consultation with Dr.
            Sharshar today.
          </p>
          <Link
            to="/contact"
            className="text-dark-950 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-8 py-4 text-lg font-semibold transition-colors hover:bg-amber-400"
          >
            {pillar.ctaPrimary} <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
