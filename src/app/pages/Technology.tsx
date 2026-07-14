import { Activity, Cpu, Eye, Gauge, Laptop, ScanLine, type LucideIcon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTechnologySettings } from '@/hooks/useCmsData';
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  SEO,
  SITE_NAME,
  buildBreadcrumbJsonLd,
  buildHreflangTags,
} from '@/lib/seo';

const ICON_MAP: Record<string, LucideIcon> = { Activity, Cpu, Gauge, Eye, ScanLine, Laptop };

const breadcrumbs = buildBreadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Technology', path: '/technology' },
]);

export function Technology() {
  const { tech } = useTechnologySettings();
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: SEO.technology.title,
    url: SEO.technology.canonical,
    description: SEO.technology.description,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: tech.technologies.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.title,
        description: item.description,
      })),
    },
  };

  return (
    <div className="bg-dark-950 min-h-screen overflow-hidden pt-24 pb-16">
      <Helmet>
        <title>{SEO.technology.title}</title>
        <meta name="description" content={SEO.technology.description} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={SEO.technology.canonical} />
        {buildHreflangTags(SEO.technology.canonical).map((tag) => (
          <link key={tag.hrefLang} rel={tag.rel} hrefLang={tag.hrefLang} href={tag.href} />
        ))}
        <meta property="og:title" content={SEO.technology.title} />
        <meta property="og:description" content={SEO.technology.description} />
        <meta property="og:url" content={SEO.technology.canonical} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:alt" content={DEFAULT_OG_IMAGE_ALT} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.technology.title} />
        <meta name="twitter:description" content={SEO.technology.description} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbs)}</script>
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
      </Helmet>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(circle_at_25%_12%,rgba(212,175,55,0.14),transparent_40%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-10 text-sm text-gray-400">
          <Link to="/" className="transition-colors hover:text-amber-300">
            Home
          </Link>
          <span aria-hidden="true" className="px-2">/</span>
          <span className="text-amber-300">Technology</span>
        </nav>

        <header className="cinematic-hairline mx-auto mb-16 max-w-4xl text-center">
          <p className="mb-4 font-mono text-sm tracking-[0.28em] text-amber-300 uppercase">
            Records support decisions
          </p>
          <h1 className="font-serif text-4xl font-bold tracking-tight text-white md:text-6xl">
            Digital Records and Planning
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Digital tools can record anatomy, movement, muscle activity, or bite contact when a
            clinician considers them relevant. Each record is interpreted with symptoms,
            examination findings, and patient priorities.
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-amber-100/80">
            No device or software result diagnoses a condition or selects treatment by itself.
          </p>
        </header>

        <section aria-labelledby="record-types" className="mb-20">
          <h2 id="record-types" className="mb-8 font-serif text-3xl text-white">
            Record types that may be considered
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tech.technologies.map((technology) => {
              const Icon =
                (technology.iconName && ICON_MAP[technology.iconName]) || Activity;
              return (
                <article
                  key={technology.title}
                  className="cinematic-card rounded-2xl border border-white/10 bg-white/[0.035] p-7"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-amber-300/30 bg-amber-300/10">
                    <Icon className="h-6 w-6 text-amber-300" aria-hidden="true" />
                  </div>
                  <h3 className="mb-3 font-serif text-xl font-semibold text-white">
                    {technology.title}
                  </h3>
                  <p className="leading-7 text-gray-300">{technology.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="interpretation-boundary" className="mb-16 rounded-3xl border border-amber-300/20 bg-amber-300/[0.045] p-8 md:p-10">
          <h2 id="interpretation-boundary" className="font-serif text-3xl text-white">
            The clinical boundary
          </h2>
          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {tech.stats.map((stat) => (
              <div key={`${stat.value}-${stat.label}`} className="rounded-2xl border border-white/10 p-5">
                <p className="font-serif text-xl text-amber-200">{stat.value}</p>
                <p className="mt-2 text-sm leading-6 text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center">
          <Link
            to="/send-your-records"
            className="bg-gold-400 text-dark-950 inline-flex min-h-12 items-center rounded-xl px-8 py-4 font-bold transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
          >
            Ask which records are useful
          </Link>
        </div>
      </div>
    </div>
  );
}
