import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight } from 'lucide-react';
import {
  SEO,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  TMD_TREATMENT_JSONLD,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
} from '@/lib/seo';
import { useServicePillar } from '@/hooks/useCmsData';
import { urlFor } from '@/lib/sanityClient';
import { MedicallyReviewedBadge } from '@/app/components/MedicallyReviewedBadge';

const breadcrumbs = buildBreadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'TMJ/TMD Treatment', path: '/services/tmj-tmd-treatment' },
]);

const diagnosticColors = [
  'from-blue-500/20 to-blue-600/10',
  'from-green-500/20 to-green-600/10',
  'from-purple-500/20 to-purple-600/10',
  'from-amber-500/20 to-amber-600/10',
  'from-red-500/20 to-red-600/10',
];

const treatmentSteps = [
  'Comprehensive clinical examination and patient history',
  'CBCT 3D imaging of TMJ and surrounding structures',
  'Jaw tracking (JT-3D) records mandibular movement patterns',
  'Surface EMG measures masticatory muscle activity and symmetry',
  'TENS therapy relaxes muscles to neuromuscular rest position',
  'Occlusense maps bite force distribution in relaxed state',
  'Custom Neurobite splint fabricated from collected data',
  'Progressive occlusal adjustment and periodic reassessment',
];

export default function TmdTreatment() {
  const { pillar } = useServicePillar('tmj-tmd-treatment');

  const faqJsonLd = useMemo(() => buildFaqJsonLd(pillar.faqs), [pillar.faqs]);

  const seoTitle = pillar.seoTitle ?? SEO.tmdTreatment.title;
  const seoDesc = pillar.seoDescription ?? SEO.tmdTreatment.description;

  return (
    <div className="bg-dark-950 min-h-screen pt-24 pb-12">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <link rel="canonical" href={SEO.tmdTreatment.canonical} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:url" content={SEO.tmdTreatment.canonical} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:alt" content="Dr. Haitham Sharshar — HS Clinic Cairo" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content="en_EG" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDesc} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(TMD_TREATMENT_JSONLD)}</script>
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
          <span className="text-amber-400">TMJ/TMD Treatment</span>
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
            {pillar.heroTitle === 'Advanced TMJ/TMD Neuromuscular Treatment' ? (
              <>
                Advanced <span className="text-amber-400">TMJ/TMD Neuromuscular Treatment</span>
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

      {/* NLP Authority Section */}
      <section className="mx-auto mb-20 max-w-6xl px-4">
        <h2 className="mb-6 text-3xl font-bold text-white">
          TMD Records Reviewed by Dr. Sharshar
        </h2>
        <div className="prose prose-invert max-w-none space-y-4 leading-relaxed text-gray-300">
          <p>
            Dr. Haitham Sharshar is the Official JMA-Optic+ Digital Occlusion System Certified
            Trainer for{' '}
            <a
              href="https://www.zebris.de/en/dental"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:underline"
            >
              Zebris Co. (Germany)
            </a>{' '}
            for the Middle East. He uses and teaches dynamic jaw tracking to support review of jaw
            movement records before splints, restorations, or occlusal treatment are planned for
            each patient&apos;s case.
          </p>
          <p>
            Unlike traditional TMD treatment that relies on subjective clinical assessment, Dr.
            Sharshar&apos;s protocol uses five objective diagnostic instruments to measure,
            quantify, and document jaw function. These records support clinician review,
            follow-up comparison, and treatment planning, but they do not replace examination or
            clinical judgement.
          </p>
          <p>
            The clinic combines Jaw Tracking, Surface EMG, TENS, Occlusense, and Neurobite records
            in one planning workflow. The findings are used as decision support for clinician-led
            TMD screening and splint planning.
          </p>
        </div>
      </section>

      {/* Diagnostic Technology Grid */}
      {pillar.technologies?.length > 0 && (
        <section className="mx-auto mb-20 max-w-6xl px-4">
          <h2 className="mb-8 text-3xl font-bold text-white">Our TMD Diagnostic Technology</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pillar.technologies.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`rounded-xl border border-white/10 bg-gradient-to-br ${diagnosticColors[i % diagnosticColors.length]} p-6`}
              >
                <h3 className="mb-1 text-xl font-semibold text-white">{tool.name}</h3>
                <p className="text-sm text-gray-300">{tool.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Treatment Protocol */}
      <section className="mx-auto mb-20 max-w-6xl px-4">
        <h2 className="mb-8 text-3xl font-bold text-white">The Complete TMD Treatment Protocol</h2>
        <div className="space-y-3">
          {treatmentSteps.map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="bg-dark-900/30 flex items-start gap-4 rounded-lg border border-white/5 p-4"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400">
                {i + 1}
              </span>
              <p className="text-sm text-gray-300">{step}</p>
            </motion.div>
          ))}
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
              Digitally guided implant placement with surgical guides
            </p>
          </Link>
          <Link
            to="/services/full-arch-rehabilitation"
            className="group bg-dark-900/50 rounded-xl border border-white/10 p-5 transition-colors hover:border-amber-400/30"
          >
            <h3 className="font-semibold text-white transition-colors group-hover:text-amber-400">
              Full-Arch Rehabilitation
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Complete mouth restoration with All-on-4/6 implants
            </p>
          </Link>
          <Link
            to="/technology"
            className="group bg-dark-900/50 rounded-xl border border-white/10 p-5 transition-colors hover:border-amber-400/30"
          >
            <h3 className="font-semibold text-white transition-colors group-hover:text-amber-400">
              Our Technology
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Explore our diagnostic equipment and digital workflow
            </p>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 text-center">
        <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-amber-600/5 p-12">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Suffering from Jaw Pain or TMJ Issues?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-300">
            Dr. Sharshar offers comprehensive TMD evaluations using objective diagnostic technology.
            Findings are reviewed as screening information before a clinician confirms the diagnosis
            and treatment plan.
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
