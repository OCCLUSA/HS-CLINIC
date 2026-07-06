import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';
import {
  SEO,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  DENTAL_IMPLANTS_JSONLD,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
} from '@/lib/seo';
import { useServicePillar } from '@/hooks/useCmsData';
import { urlFor } from '@/lib/sanityClient';
import { MedicallyReviewedBadge } from '@/app/components/MedicallyReviewedBadge';

const breadcrumbs = buildBreadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Dental Implants', path: '/services/dental-implants' },
]);

export default function DentalImplants() {
  const { pillar } = useServicePillar('dental-implants');

  const faqJsonLd = useMemo(() => buildFaqJsonLd(pillar.faqs), [pillar.faqs]);

  const seoTitle = pillar.seoTitle ?? SEO.dentalImplants.title;
  const seoDesc = pillar.seoDescription ?? SEO.dentalImplants.description;

  return (
    <div className="bg-dark-950 min-h-screen pt-24 pb-12">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <link rel="canonical" href={SEO.dentalImplants.canonical} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:url" content={SEO.dentalImplants.canonical} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:alt" content="Dr. Haitham Sharshar — HS Clinic Cairo" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content="en_EG" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDesc} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(DENTAL_IMPLANTS_JSONLD)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbs)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      {/* Breadcrumb Navigation */}
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
          <span className="text-amber-400">Dental Implants</span>
        </nav>
        <MedicallyReviewedBadge lastUpdated="Feb 2026" />
      </div>

      {/* Hero Section */}
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
            {pillar.heroTitle === 'Digitally Guided Dental Implant Surgery in Cairo' ? (
              <>
                Digitally Guided <span className="text-amber-400">Dental Implant Surgery</span> in
                Cairo
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

      {/* NLP Semantic Section — Why HS Clinic */}
      <section className="mx-auto mb-20 max-w-6xl px-4">
        <h2 className="mb-6 text-3xl font-bold text-white">
          Why Choose Dr. Haitham Sharshar for Dental Implants?
        </h2>
        <div className="prose prose-invert max-w-none space-y-4 leading-relaxed text-gray-300">
          <p>
            Dr. Haitham Sharshar is a Digital Dentistry Consultant and Perio Implantologist with
            over 15 years of experience in advanced implant surgery. As the Official exocad
            Certified ICTP Trainer for the Middle East, he integrates clinical and laboratory
            digital workflows to support implant planning, prosthetic design, and clinician-reviewed
            treatment steps.
          </p>
          <p>
            At HS Clinic in Cairo, every implant case begins with a CBCT cone beam computed
            tomography scan, providing a complete 3D map of the patient&apos;s jaw anatomy. Dr.
            Sharshar digitally plans the implant position, angulation, and depth using specialized
            software, then 3D-prints a surgical guide that helps the clinician transfer the digital
            plan into surgery.
          </p>
          <p>
            This digital-first approach helps the clinician plan implant position, anticipate nearby
            anatomy, discuss risks before treatment, and transfer the digital plan into surgery.
            Final surgical decisions still depend on examination and clinical findings.
          </p>
        </div>
      </section>

      {/* Digital Workflow Steps */}
      {pillar.technologies?.length > 0 && (
        <section className="mx-auto mb-20 max-w-6xl px-4">
          <h2 className="mb-8 text-3xl font-bold text-white">The Digital Implant Process</h2>
          <div className="grid gap-6 md:grid-cols-5">
            {pillar.technologies.map((step, i) => (
              <motion.div
                key={step.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-dark-900/50 relative rounded-xl border border-amber-500/20 p-5"
              >
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20 text-sm font-bold text-amber-400">
                  {i + 1}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{step.name}</h3>
                <p className="text-sm text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Implant Types */}
      {pillar.benefits?.length > 0 && (
        <section className="mx-auto mb-20 max-w-6xl px-4">
          <h2 className="mb-8 text-3xl font-bold text-white">Implant Solutions We Offer</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {pillar.benefits.map((item) => (
              <div
                key={item.title}
                className="bg-dark-900/50 rounded-xl border border-white/10 p-6"
              >
                <CheckCircle2 className="mb-3 h-6 w-6 text-amber-400" />
                <h3 className="mb-2 text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ Section */}
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

      {/* Related Services Cross-Links */}
      <section className="mx-auto mb-20 max-w-6xl px-4">
        <h2 className="mb-6 text-2xl font-bold text-white">Related Services</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            to="/services/full-arch-rehabilitation"
            className="group bg-dark-900/50 rounded-xl border border-white/10 p-5 transition-colors hover:border-amber-400/30"
          >
            <h3 className="font-semibold text-white transition-colors group-hover:text-amber-400">
              Full-Arch Rehabilitation
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Complete mouth restoration with implant-supported prosthetics
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
              Digital occlusal analysis and neuromuscular therapy
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
              Travel planning support for international patients
            </p>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 text-center">
        <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-amber-600/5 p-12">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Ready for Your Dental Implant Consultation?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-300">
            Whether you&apos;re in Cairo or travelling from abroad, Dr. Sharshar can review your
            records and discuss implant options, timing, and estimate requirements before treatment.
          </p>
          <Link
            to="/contact"
            className="text-dark-950 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-8 py-4 text-lg font-semibold transition-colors hover:bg-amber-400"
          >
            Request Implant Case Review <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
