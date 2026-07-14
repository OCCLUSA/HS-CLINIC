import { AlertTriangle, Stethoscope } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { DEFAULT_OG_IMAGE, DEFAULT_OG_IMAGE_ALT, SEO, SITE_NAME } from '@/lib/seo';

export default function MedicalDisclaimer() {
  return (
    <section className="relative min-h-screen py-24 sm:py-32">
      <Helmet>
        <title>{SEO.medicalDisclaimer.title}</title>
        <meta name="description" content={SEO.medicalDisclaimer.description} />
        <meta name="robots" content="noindex,follow" />
        <link rel="canonical" href={SEO.medicalDisclaimer.canonical} />
        <meta property="og:title" content={SEO.medicalDisclaimer.title} />
        <meta property="og:description" content={SEO.medicalDisclaimer.description} />
        <meta property="og:url" content={SEO.medicalDisclaimer.canonical} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:alt" content={DEFAULT_OG_IMAGE_ALT} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.medicalDisclaimer.title} />
        <meta name="twitter:description" content={SEO.medicalDisclaimer.description} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      </Helmet>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <Stethoscope className="text-gold-400 mx-auto mb-4 h-11 w-11" aria-hidden="true" />
          <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl">Medical Disclaimer</h1>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-400">
            Website information is educational. Clinician review is required for diagnosis,
            suitability, consent, treatment decisions, and follow-up.
          </p>
        </header>

        <div className="space-y-6 text-gray-300">
          <section className="rounded-2xl border border-amber-300/20 bg-amber-300/[0.045] p-7">
            <h2 className="text-xl font-semibold text-white">Online review is preliminary</h2>
            <p className="mt-3 leading-7">
              Photographs, messages, and existing records can help organise questions. They cannot
              replace examination, appropriate imaging or tests, and clinician judgment.
            </p>
          </section>
          <section className="rounded-2xl border border-white/10 p-7">
            <h2 className="text-xl font-semibold text-white">No single record diagnoses alone</h2>
            <p className="mt-3 leading-7">
              Jaw tracking, surface muscle activity, bite contact, scans, and digital simulations
              are adjunct information when clinically relevant. None proves causation or forces a
              treatment choice by itself.
            </p>
          </section>
          <section className="rounded-2xl border border-white/10 p-7">
            <h2 className="text-xl font-semibold text-white">Outcomes and timing vary</h2>
            <p className="mt-3 leading-7">
              Health, anatomy, diagnosis, materials, healing, hygiene, bite forces, follow-up, and
              other individual factors can change options, timing, risks, and outcomes. No website
              example guarantees another patient&apos;s result.
            </p>
          </section>
          <section className="rounded-2xl border border-red-300/20 bg-red-300/[0.04] p-7">
            <div className="flex items-start gap-4">
              <AlertTriangle className="mt-1 h-6 w-6 shrink-0 text-red-200" aria-hidden="true" />
              <div>
                <h2 className="text-xl font-semibold text-white">Urgent symptoms need local care</h2>
                <p className="mt-3 leading-7">
                  Seek prompt local dental or medical care for severe pain, trauma, swelling, fever,
                  uncontrolled bleeding, breathing or swallowing difficulty, or rapidly worsening
                  symptoms. Do not wait for a website reply.
                </p>
              </div>
            </div>
          </section>
        </div>

        <p className="mt-10 text-center text-sm text-gray-400">
          For a non-urgent enquiry, use the{' '}
          <Link to="/contact" className="text-amber-300 underline underline-offset-4">contact page</Link>.
        </p>
      </div>
    </section>
  );
}
