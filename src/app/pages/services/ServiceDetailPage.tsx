import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  SITE_NAME,
  SITE_URL,
  DEFAULT_OG_IMAGE,
  buildBreadcrumbJsonLd,
  serviceBreadcrumbs,
} from '@/lib/seo';
import { useServiceBySlug } from '@/hooks/useCmsData';
import { urlFor } from '@/lib/sanityClient';
import { NotFound } from '@/app/pages/NotFound';

/**
 * Generic service detail page for Sanity-managed services
 * that don't have a dedicated hardcoded component.
 *
 * Rendered by the `services/:slug` catch-all route.
 */
export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { service, loading } = useServiceBySlug(slug ?? '');

  const breadcrumbs = useMemo(
    () =>
      service
        ? buildBreadcrumbJsonLd(serviceBreadcrumbs(service.title, slug ?? ''))
        : null,
    [service, slug]
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-amber-400">
        <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-current" />
      </div>
    );
  }

  if (!service) {
    return <NotFound />;
  }

  const seoTitle = `${service.title} | Dr. Haitham Sharshar | HS Clinic Cairo`;
  const canonical = `${SITE_URL}/services/${slug}`;

  return (
    <div className="bg-dark-950 min-h-screen pt-24 pb-12">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={service.description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={service.description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:alt" content="Dr. Haitham Sharshar — HS Clinic Cairo" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content="en_EG" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={service.description} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        {breadcrumbs && (
          <script type="application/ld+json">{JSON.stringify(breadcrumbs)}</script>
        )}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalProcedure',
            name: service.title,
            url: canonical,
            description: service.description,
            provider: {
              '@type': 'Dentist',
              '@id': `${SITE_URL}/#clinic`,
              name: 'HS Clinic',
            },
          })}
        </script>
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
          <span className="text-amber-400">{service.title}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="mx-auto mb-20 max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            <span className="text-amber-400">{service.title}</span>
          </h1>
          <p className="mb-8 max-w-3xl text-lg leading-relaxed text-gray-300">
            {service.description}
          </p>
          <Link
            to="/contact"
            className="text-dark-950 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 font-semibold transition-colors hover:bg-amber-400"
          >
            Book Consultation
          </Link>
        </motion.div>
      </section>

      {/* Service Image (if available) */}
      {service.image && (
        <section className="mx-auto mb-20 max-w-4xl px-4">
          <img
            src={urlFor(service.image).width(800).auto('format').url()}
            alt={service.imageAlt ?? service.title}
            className="w-full rounded-2xl border border-white/10"
            loading="lazy"
          />
        </section>
      )}

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 text-center">
        <div className="bg-dark-900/50 rounded-2xl border border-white/10 p-8 md:p-12">
          <h2 className="mb-4 text-2xl font-bold text-white">
            Ready to Get Started?
          </h2>
          <p className="mb-6 text-gray-300">
            Contact HS Clinic to schedule your consultation with Dr. Haitham Sharshar.
          </p>
          <Link
            to="/contact"
            className="text-dark-950 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-8 py-4 font-semibold transition-colors hover:bg-amber-400"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
