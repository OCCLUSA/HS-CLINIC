import { FileText } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { DEFAULT_OG_IMAGE, DEFAULT_OG_IMAGE_ALT, SEO, SITE_NAME } from '@/lib/seo';

const sections = [
  {
    title: 'General information only',
    text: 'Website content helps visitors understand questions and contact paths. It is not dental advice, a diagnosis, a treatment plan, or an emergency service.',
  },
  {
    title: 'No treatment contract online',
    text: 'Viewing the site or starting a WhatsApp or email conversation does not create a treatment agreement. Examination, consent, written clinical documents, and case-specific terms are separate steps.',
  },
  {
    title: 'Preliminary estimates and timing',
    text: 'Any remote discussion of options, prices, or visit stages is preliminary and may change after examination, appropriate records, material choices, healing, or clinician review.',
  },
  {
    title: 'Third-party services',
    text: 'WhatsApp, email, Maps, YouTube, and external links are operated by other providers under their own privacy and service terms. Use them only if you accept that transfer.',
  },
  {
    title: 'Website reuse and corrections',
    text: 'Ask before copying website material. If you find an inaccurate statement or broken link, contact the clinic so it can be reviewed.',
  },
];

export default function TermsOfService() {
  return (
    <section className="relative min-h-screen py-24 sm:py-32">
      <Helmet>
        <title>{SEO.termsOfService.title}</title>
        <meta name="description" content={SEO.termsOfService.description} />
        <meta name="robots" content="noindex,follow" />
        <link rel="canonical" href={SEO.termsOfService.canonical} />
        <meta property="og:title" content={SEO.termsOfService.title} />
        <meta property="og:description" content={SEO.termsOfService.description} />
        <meta property="og:url" content={SEO.termsOfService.canonical} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:alt" content={DEFAULT_OG_IMAGE_ALT} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.termsOfService.title} />
        <meta name="twitter:description" content={SEO.termsOfService.description} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      </Helmet>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <FileText className="text-gold-400 mx-auto mb-4 h-11 w-11" aria-hidden="true" />
          <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl">Website Use Notice</h1>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-400">
            These are narrow public website boundaries. Formal legal, payment, consent, and
            treatment documents must be reviewed separately before care.
          </p>
        </header>

        <div className="space-y-5">
          {sections.map((section) => (
            <section key={section.title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
              <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              <p className="mt-3 leading-7 text-gray-300">{section.text}</p>
            </section>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-gray-400">
          Questions or correction requests can be sent through the{' '}
          <Link to="/contact" className="text-amber-300 underline underline-offset-4">contact page</Link>.
        </p>
      </div>
    </section>
  );
}
