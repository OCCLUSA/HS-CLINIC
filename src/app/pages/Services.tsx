import {
  BrainCircuit,
  CheckCircle2,
  Scan,
  Shield,
  Smile,
  Stethoscope,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useServices, useServicesPageSettings } from '@/hooks/useCmsData';
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  SEO,
  SITE_NAME,
  buildBreadcrumbJsonLd,
  buildHreflangTags,
} from '@/lib/seo';

const ICON_MAP: Record<string, LucideIcon> = {
  Stethoscope,
  Zap,
  Scan,
  Shield,
  Smile,
  BrainCircuit,
  CheckCircle2,
};

const PATIENT_GUIDES: Array<{
  title: string;
  description: string;
  path: string;
  icon: LucideIcon;
}> = [
  {
    title: 'Dental Implant Records Guide',
    description:
      'What existing images, health details, and treatment notes may help a clinician prepare questions before examination.',
    path: '/services/dental-implants',
    icon: Stethoscope,
  },
  {
    title: 'TMJ and Bite Screening Guide',
    description:
      'How symptom history and existing records support clinician screening without diagnosing TMD or proving causation.',
    path: '/services/tmj-tmd-treatment',
    icon: Shield,
  },
  {
    title: 'Clear Aligner Records Guide',
    description:
      'What photographs and existing dental records may support an examination-led suitability discussion.',
    path: '/services/clear-aligners',
    icon: Smile,
  },
  {
    title: 'Full Arch Records Guide',
    description:
      'How existing images, denture details, and health information can prepare questions before clinician review.',
    path: '/services/full-arch-rehabilitation',
    icon: Scan,
  },
];

const breadcrumbs = buildBreadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
]);

export function Services() {
  const { services } = useServices();
  const { pageSettings } = useServicesPageSettings();
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Dental services and records reviewed at HS Clinic',
    itemListElement: [
      ...PATIENT_GUIDES.map((guide, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: guide.title,
        description: guide.description,
        url: new URL(guide.path, SEO.services.canonical).href,
      })),
      ...services.map((service, index) => ({
        '@type': 'ListItem',
        position: PATIENT_GUIDES.length + index + 1,
        name: service.title,
        description: service.description,
      })),
    ],
  };

  return (
    <div className="bg-dark-950 min-h-screen overflow-hidden pt-24 pb-16">
      <Helmet>
        <title>{SEO.services.title}</title>
        <meta name="description" content={SEO.services.description} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={SEO.services.canonical} />
        {buildHreflangTags(SEO.services.canonical).map((tag) => (
          <link key={tag.hrefLang} rel={tag.rel} hrefLang={tag.hrefLang} href={tag.href} />
        ))}
        <meta property="og:title" content={SEO.services.title} />
        <meta property="og:description" content={SEO.services.description} />
        <meta property="og:url" content={SEO.services.canonical} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:alt" content={DEFAULT_OG_IMAGE_ALT} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.services.title} />
        <meta name="twitter:description" content={SEO.services.description} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbs)}</script>
        <script type="application/ld+json">{JSON.stringify(itemList)}</script>
      </Helmet>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[38rem] bg-[radial-gradient(circle_at_78%_12%,rgba(212,175,55,0.14),transparent_42%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-10 text-sm text-gray-400">
          <Link to="/" className="transition-colors hover:text-amber-300">
            Home
          </Link>
          <span aria-hidden="true" className="px-2">/</span>
          <span className="text-amber-300">Services</span>
        </nav>

        <header className="cinematic-hairline mx-auto mb-16 max-w-4xl text-center">
          <p className="mb-4 font-mono text-sm tracking-[0.28em] text-amber-300 uppercase">
            Clinician review required
          </p>
          <h1 className="font-serif text-4xl font-bold tracking-tight text-white md:text-6xl">
            Dental Services and Records Review
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Dental records, symptoms, examination findings, and patient priorities are reviewed
            together. No device, scan, or online page makes a diagnosis or treatment decision by
            itself.
          </p>
        </header>

        <section aria-labelledby="patient-guides" className="mb-24">
          <h2 id="patient-guides" className="mb-8 font-serif text-3xl text-white">
            Patient treatment guides
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {PATIENT_GUIDES.map((guide) => {
              const Icon = guide.icon;
              return (
                <Link
                  key={guide.path}
                  to={guide.path}
                  aria-label={guide.title}
                  className="cinematic-card group relative min-h-44 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-7 transition-colors hover:border-amber-300/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300 motion-reduce:transition-none"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-amber-300/30 bg-amber-300/10">
                    <Icon className="h-6 w-6 text-amber-300" aria-hidden="true" />
                  </div>
                  <h3 className="mb-3 font-serif text-xl font-semibold text-white">
                    {guide.title}
                  </h3>
                  <p className="leading-7 text-gray-300">{guide.description}</p>
                  <span className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-amber-300 group-hover:text-white">
                    Read the guide
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {services.length > 0 ? (
          <section aria-labelledby="service-records" className="mb-24">
            <h2 id="service-records" className="mb-8 font-serif text-3xl text-white">
              Records and care discussions
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => {
                const Icon = (service.icon && ICON_MAP[service.icon]) || Stethoscope;
                return (
                  <article
                    key={service._id}
                    className="cinematic-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-7"
                  >
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-amber-300/30 bg-amber-300/10">
                      <Icon className="h-6 w-6 text-amber-300" aria-hidden="true" />
                    </div>
                    <h3 className="mb-3 font-serif text-xl font-semibold text-white">
                      {service.title}
                    </h3>
                    <p className="leading-7 text-gray-300">{service.description}</p>
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}

        <section aria-labelledby="reasons-for-review" className="mb-24">
          <h2 id="reasons-for-review" className="mb-8 text-center font-serif text-3xl text-white">
            Reasons patients request a review
          </h2>
          <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
            {pageSettings.conditions.map((condition) => (
              <span
                key={condition}
                className="rounded-full border border-white/10 bg-white/[0.035] px-5 py-3 text-sm text-gray-200"
              >
                {condition}
              </span>
            ))}
          </div>
        </section>

        <section aria-labelledby="review-path" className="mb-20">
          <h2 id="review-path" className="mb-10 text-center font-serif text-3xl text-white">
            Clinician-led review path
          </h2>
          <ol className="grid gap-6 md:grid-cols-4">
            {pageSettings.processSteps.map((step) => (
              <li key={`${step.step}-${step.title}`} className="rounded-2xl border border-white/10 p-6">
                <span className="font-mono text-sm text-amber-300">{step.step}</span>
                <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-400">{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="text-center">
          <Link
            to="/send-your-records"
            className="bg-gold-400 text-dark-950 inline-flex min-h-12 items-center gap-2 rounded-xl px-8 py-4 font-bold transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
          >
            Start with your records <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
