import { Helmet } from 'react-helmet-async';
import { ArrowRight, ChevronRight, ShieldCheck } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { NotFound } from '@/app/pages/NotFound';
import { useServiceBySlug } from '@/hooks/useCmsData';
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_TYPE,
  DEFAULT_OG_IMAGE_WIDTH,
  SITE_NAME,
  SITE_URL,
  buildBreadcrumbJsonLd,
  buildHreflangTags,
  serviceBreadcrumbs,
} from '@/lib/seo';

/**
 * Fail-closed detail page for an owner-approved, clinician-approved CMS service.
 * Image publication is deliberately excluded until a separate rights gate exists.
 */
export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const safeSlug = slug ?? '';
  const { service, loading } = useServiceBySlug(safeSlug);

  if (loading) {
    return (
      <div
        className="flex min-h-[60vh] items-center justify-center bg-slate-950 text-amber-400"
        role="status"
        aria-label="Loading service information"
      >
        <div className="h-12 w-12 animate-spin rounded-full border-y-2 border-current motion-reduce:animate-none" />
      </div>
    );
  }

  if (!service) {
    return <NotFound />;
  }

  const seoTitle = `${service.title} | HS Clinic Cairo`;
  const canonical = `${SITE_URL}/services/${safeSlug}`;
  const breadcrumbItems = serviceBreadcrumbs(service.title, safeSlug);
  const breadcrumbSchema = buildBreadcrumbJsonLd(breadcrumbItems);
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: service.title,
    description: service.description,
    url: canonical,
    inLanguage: 'en',
  };

  return (
    <div className="bg-dark-950 min-h-screen overflow-hidden px-4 pt-12 pb-24 text-white sm:px-6 lg:px-8">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={service.description} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href={canonical} />
        {buildHreflangTags(canonical).map((tag) => (
          <link key={tag.hrefLang} {...tag} />
        ))}
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={service.description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:alt" content={DEFAULT_OG_IMAGE_ALT} />
        <meta property="og:image:type" content={DEFAULT_OG_IMAGE_TYPE} />
        <meta property="og:image:width" content={String(DEFAULT_OG_IMAGE_WIDTH)} />
        <meta property="og:image:height" content={String(DEFAULT_OG_IMAGE_HEIGHT)} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content="en_EG" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={service.description} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:image:alt" content={DEFAULT_OG_IMAGE_ALT} />
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div
        aria-hidden="true"
        className="bg-gold-400/10 pointer-events-none absolute top-28 left-1/2 h-80 w-[48rem] max-w-full -translate-x-1/2 rounded-full blur-[170px]"
      />

      <div className="relative mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="mb-12 text-sm text-gray-400">
          <ol className="flex flex-wrap items-center gap-2">
            {breadcrumbItems.map((item, index) => (
              <li key={item.path} className="flex items-center gap-2">
                {index > 0 && <ChevronRight aria-hidden="true" className="h-4 w-4" />}
                {index === breadcrumbItems.length - 1 ? (
                  <span aria-current="page" className="text-gold-300">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    to={item.path}
                    className="transition-colors hover:text-white motion-reduce:transition-none"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <section className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <p className="text-gold-300 text-sm font-semibold tracking-[0.18em] uppercase">
              Records first
            </p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-tight font-bold md:text-7xl">
              {service.title}
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-gray-300">
              {service.description}
            </p>
            <Link
              to="/send-your-records"
              className="bg-gold-400 text-dark-950 mt-9 inline-flex min-h-12 items-center gap-3 rounded-xl px-7 py-3 font-bold transition-colors hover:bg-white motion-reduce:transition-none"
            >
              Send your records
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </Link>
          </div>

          <aside className="glass-card border-gold-400/20 p-8" aria-label="Clinical boundary">
            <ShieldCheck aria-hidden="true" className="text-gold-400 h-8 w-8" />
            <h2 className="mt-5 font-serif text-3xl">Clinical boundary</h2>
            <p className="mt-4 leading-7 text-gray-300">
              This page provides general information. Suitability, diagnosis, treatment choices,
              risks, alternatives, timing, and costs require examination and clinician review.
            </p>
            <p className="mt-5 text-sm font-semibold text-white">Clinician review required.</p>
          </aside>
        </section>
      </div>
    </div>
  );
}
