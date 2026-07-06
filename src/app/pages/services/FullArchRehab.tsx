import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight, CheckCircle2 } from 'lucide-react';
import {
  SEO,
  SITE_NAME,
  SITE_URL,
  DEFAULT_OG_IMAGE,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
} from '@/lib/seo';
import { useServicePillar } from '@/hooks/useCmsData';
import { urlFor } from '@/lib/sanityClient';
import { MedicallyReviewedBadge } from '@/app/components/MedicallyReviewedBadge';

/** JSON-LD for Full-Arch Rehabilitation procedure */
const FULL_ARCH_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'MedicalProcedure',
  name: 'Full-Arch Rehabilitation & All-on-4 Implants',
  url: SITE_URL + '/services/full-arch-rehabilitation',
  description:
    'Complete full-arch rehabilitation at HS Clinic Cairo. All-on-4 and All-on-6 implant-supported prosthetics, CBCT-guided records, digital occlusal review, and case-dependent temporary teeth by Dr. Haitham Sharshar.',
  procedureType: 'http://schema.org/SurgicalProcedure',
  howPerformed:
    'CBCT 3D scan → digital treatment planning → guided implant placement (4-6 implants per arch) → case-dependent temporary prosthesis → osseointegration period → final prosthetic delivery with digital occlusal review.',
  preparation:
    'Comprehensive digital examination, CBCT scan, diagnostic wax-up, and digital smile design preview.',
  bodyLocation: 'Full maxillary and/or mandibular arch',
  status: 'http://schema.org/EventScheduled',
};

const breadcrumbs = buildBreadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Full Arch Rehabilitation', path: '/services/full-arch-rehabilitation' },
]);

export default function FullArchRehab() {
  const { pillar } = useServicePillar('full-arch-rehabilitation');

  const faqJsonLd = useMemo(() => buildFaqJsonLd(pillar.faqs), [pillar.faqs]);

  const seoTitle = pillar.seoTitle ?? SEO.fullArchRehab.title;
  const seoDesc = pillar.seoDescription ?? SEO.fullArchRehab.description;

  return (
    <div className="bg-dark-950 min-h-screen pt-24 pb-12">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <link rel="canonical" href={SEO.fullArchRehab.canonical} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:url" content={SEO.fullArchRehab.canonical} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:alt" content="Dr. Haitham Sharshar — HS Clinic Cairo" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content="en_EG" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDesc} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(FULL_ARCH_JSONLD)}</script>
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
          <span className="text-amber-400">Full Arch Rehabilitation</span>
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
            {pillar.heroTitle === 'Full-Arch Rehabilitation & All-on-4 Implants' ? (
              <>
                <span className="text-amber-400">Full-Arch Rehabilitation</span> &amp; All-on-4
                Implants
              </>
            ) : (
              <span className="text-amber-400">{pillar.heroTitle}</span>
            )}
          </h1>
          <p className="mb-8 max-w-3xl text-lg leading-relaxed text-gray-300">
            {pillar.heroSubtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="text-dark-950 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 font-semibold transition-colors hover:bg-amber-400"
            >
              {pillar.ctaPrimary} <ArrowRight className="h-4 w-4" />
            </Link>
            {pillar.ctaSecondary && (
              <Link
                to="/dental-tourism"
                className="inline-flex items-center gap-2 rounded-lg border border-amber-500/30 px-6 py-3 font-semibold text-amber-400 transition-colors hover:bg-amber-500/10"
              >
                {pillar.ctaSecondary}
              </Link>
            )}
          </div>
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

      {/* Features */}
      {pillar.benefits?.length > 0 && (
        <section className="mx-auto mb-20 max-w-6xl px-4">
          <h2 className="mb-8 text-3xl font-bold text-white">The HS Clinic Full-Arch Advantage</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {pillar.benefits.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-dark-900/50 rounded-xl border border-white/10 p-6"
              >
                <CheckCircle2 className="mb-3 h-6 w-6 text-amber-400" />
                <h3 className="mb-2 text-xl font-semibold text-white">{f.title}</h3>
                <p className="text-sm text-gray-400">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* NLP Content */}
      <section className="mx-auto mb-20 max-w-6xl px-4">
        <h2 className="mb-6 text-3xl font-bold text-white">Who Needs Full-Arch Rehabilitation?</h2>
        <div className="prose prose-invert max-w-none space-y-4 leading-relaxed text-gray-300">
          <p>
            Full-arch rehabilitation is ideal for patients who are fully edentulous (missing all
            teeth in one or both arches), have severely compromised remaining teeth, or are
            currently wearing removable dentures and want to explore a fixed prosthetic option. It
            is also the treatment of choice for patients with terminal dentition — teeth that cannot
            be kept due to advanced periodontal disease or extensive decay.
          </p>
          <p>
            Dr. Sharshar&apos;s digital-first approach begins with a comprehensive CBCT scan and
            digital smile design preview. Patients see their projected final result before any
            surgery begins. Implant positions are planned virtually and executed with 3D-printed
            surgical guides to support planned placement and clinician review.
          </p>
          <p>
            What sets the HS Clinic apart is the integration of digital occlusal verification
            (T-Scan and jaw tracking) into the prosthetic phase. These records support review of
            final bite distribution during clinician-led prosthetic planning.
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
            to="/services/dental-implants"
            className="group bg-dark-900/50 rounded-xl border border-white/10 p-5 transition-colors hover:border-amber-400/30"
          >
            <h3 className="font-semibold text-white transition-colors group-hover:text-amber-400">
              Dental Implants
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Individual implant placement with CBCT-guided records
            </p>
          </Link>
          <Link
            to="/services/tmj-tmd-treatment"
            className="group bg-dark-900/50 rounded-xl border border-white/10 p-5 transition-colors hover:border-amber-400/30"
          >
            <h3 className="font-semibold text-white transition-colors group-hover:text-amber-400">
              TMJ/TMD Treatment
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Optimize your bite function with neuromuscular therapy
            </p>
          </Link>
          <Link
            to="/dental-tourism"
            className="group bg-dark-900/50 rounded-xl border border-white/10 p-5 transition-colors hover:border-amber-400/30"
          >
            <h3 className="font-semibold text-white transition-colors group-hover:text-amber-400">
              Dental Tourism
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Travel planning support for international full-arch patients
            </p>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 text-center">
        <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-amber-600/5 p-12">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Transform Your Smile with Full-Arch Implants
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-300">
            International patients can request a records review to discuss full-arch options, travel
            timing, and estimate requirements before treatment.
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
