import { FileCheck2, HeartHandshake, MessageCircle, ShieldCheck } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  SEO,
  SITE_NAME,
  buildBreadcrumbJsonLd,
  buildHreflangTags,
} from '@/lib/seo';

const principles = [
  {
    icon: ShieldCheck,
    title: 'No universal outcome promise',
    text: 'Dental outcomes vary with health, anatomy, diagnosis, materials, healing, hygiene, bite forces, follow-up, and other case-specific factors.',
  },
  {
    icon: FileCheck2,
    title: 'Written terms before care',
    text: 'Any repair, replacement, material, appliance, fee, or follow-up coverage must be stated in the case-specific written terms provided before treatment.',
  },
  {
    icon: HeartHandshake,
    title: 'Follow-up is clinical care',
    text: 'New symptoms, damage, fit concerns, or healing questions require clinician assessment. A website page cannot decide whether any remedy applies.',
  },
];

const breadcrumbs = buildBreadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Treatment coverage and follow-up', path: '/guarantee' },
]);

export default function Guarantee() {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: SEO.guarantee.title,
    url: SEO.guarantee.canonical,
    description: SEO.guarantee.description,
  };

  return (
    <section className="relative min-h-screen overflow-hidden py-24 sm:py-32">
      <Helmet>
        <title>{SEO.guarantee.title}</title>
        <meta name="description" content={SEO.guarantee.description} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={SEO.guarantee.canonical} />
        {buildHreflangTags(SEO.guarantee.canonical).map((tag) => (
          <link key={tag.hrefLang} rel={tag.rel} hrefLang={tag.hrefLang} href={tag.href} />
        ))}
        <meta property="og:title" content={SEO.guarantee.title} />
        <meta property="og:description" content={SEO.guarantee.description} />
        <meta property="og:url" content={SEO.guarantee.canonical} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:alt" content={DEFAULT_OG_IMAGE_ALT} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.guarantee.title} />
        <meta name="twitter:description" content={SEO.guarantee.description} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbs)}</script>
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
      </Helmet>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[38rem] bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.14),transparent_46%)]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-10 text-sm text-gray-400">
          <Link to="/" className="hover:text-amber-300">Home</Link>
          <span aria-hidden="true" className="px-2">/</span>
          <span className="text-amber-300">Treatment coverage</span>
        </nav>

        <header className="cinematic-hairline mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-4 font-mono text-sm tracking-[0.25em] text-amber-300 uppercase">
            Clear limits before care
          </p>
          <h1 className="font-serif text-4xl font-bold text-white sm:text-6xl">
            Treatment Coverage and Follow-Up
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300">
            This public page does not create a treatment warranty or outcome guarantee. Any
            coverage must appear in the case-specific written terms supplied before treatment.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {principles.map(({ icon: Icon, title, text }) => (
            <article key={title} className="cinematic-card rounded-2xl border border-white/10 bg-white/[0.035] p-7">
              <Icon className="mb-5 h-7 w-7 text-amber-300" aria-hidden="true" />
              <h2 className="font-serif text-xl font-semibold text-white">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-gray-300">{text}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-amber-300/20 bg-amber-300/[0.045] p-8 md:p-10">
          <h2 className="font-serif text-3xl text-white">What to ask before treatment</h2>
          <ul className="mt-6 space-y-3 text-gray-300">
            <li>Which materials, appliances, or treatment stages are covered in writing?</li>
            <li>Which follow-up visits, maintenance, or clinical records are required?</li>
            <li>Which events or conditions are excluded?</li>
            <li>What happens if assessment is needed while you are outside Cairo?</li>
          </ul>
          <p className="mt-6 text-sm leading-7 text-amber-100/80">
            Do not rely on a verbal promise or this page as a substitute for your own written case
            documents. Urgent symptoms require prompt local dental or medical care.
          </p>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/contact"
            className="bg-gold-400 text-dark-950 inline-flex min-h-12 items-center gap-2 rounded-xl px-8 py-4 font-bold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Ask about written terms
          </Link>
        </div>
      </div>
    </section>
  );
}
