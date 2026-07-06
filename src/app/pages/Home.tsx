import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  SEO,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_TYPE,
  DEFAULT_OG_IMAGE_WIDTH,
  buildLocalBusinessJsonLd,
  buildFAQJsonLd,
  buildBreadcrumbJsonLd,
  HOMEPAGE_FAQS,
  BREADCRUMBS,
  WEBSITE_JSONLD,
  ORGANIZATION_JSONLD,
} from '@/lib/seo';
import {
  Activity,
  Zap,
  Orbit,
  BrainCircuit,
  ShieldCheck,
  Microscope,
  type LucideIcon,
} from 'lucide-react';
import { CyberHero } from '@/app/components/CyberHero';
import { ClinicalSimulation } from '@/app/components/ClinicalSimulation';
import { GlowCard } from '@/app/components/ui/GlowCard';
import { PatientStories } from '@/app/components/PatientStories';
import { useHomepageSettings, useSiteSettings, useSanityImage } from '@/hooks/useCmsData';

/** Map icon name strings from CMS to Lucide components */
const ICON_MAP: Record<string, LucideIcon> = {
  BrainCircuit,
  Orbit,
  Activity,
  Microscope,
  ShieldCheck,
  Zap,
};

export function Home() {
  const { homepage } = useHomepageSettings();
  const { settings } = useSiteSettings();
  const ogImageUrl = useSanityImage(settings.ogImage, 1200) || DEFAULT_OG_IMAGE;
  const jsonLd = buildLocalBusinessJsonLd(settings);
  const faqJsonLd = buildFAQJsonLd(HOMEPAGE_FAQS);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(BREADCRUMBS.home);

  const features = homepage.features.map((f) => ({
    icon: (f.iconName && ICON_MAP[f.iconName]) || Zap,
    title: f.title,
    description: f.description,
  }));

  return (
    <div className="bg-dark-950 min-h-screen">
      <Helmet>
        <title>{SEO.home.title}</title>
        <meta name="description" content={SEO.home.description} />
        <link rel="canonical" href={SEO.home.canonical} />
        {/* Open Graph */}
        <meta property="og:title" content={SEO.home.title} />
        <meta property="og:description" content={SEO.home.description} />
        <meta property="og:url" content={SEO.home.canonical} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:secure_url" content={ogImageUrl} />
        <meta property="og:image:type" content={DEFAULT_OG_IMAGE_TYPE} />
        <meta property="og:image:width" content={String(DEFAULT_OG_IMAGE_WIDTH)} />
        <meta property="og:image:height" content={String(DEFAULT_OG_IMAGE_HEIGHT)} />
        <meta property="og:image:alt" content={DEFAULT_OG_IMAGE_ALT} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content="en_EG" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.home.title} />
        <meta name="twitter:description" content={SEO.home.description} />
        <meta name="twitter:image" content={ogImageUrl} />
        <meta name="twitter:image:alt" content={DEFAULT_OG_IMAGE_ALT} />
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        {/* JSON-LD WebSite schema for sitelinks search box */}
        <script type="application/ld+json">{JSON.stringify(WEBSITE_JSONLD)}</script>
        {/* JSON-LD Organization schema for Google Knowledge Panel logo */}
        <script type="application/ld+json">{JSON.stringify(ORGANIZATION_JSONLD)}</script>
        {/* JSON-LD FAQ schema for rich snippets in search results */}
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        {/* JSON-LD Breadcrumb schema for navigation trails in search results */}
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      <CyberHero />

      <ClinicalSimulation />

      {/* Feature Grid */}
      <section className="relative px-4 py-32 sm:px-6 lg:px-8">
        <div className="from-dark-950 via-dark-900 to-dark-950 absolute inset-0 bg-gradient-to-b" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <h2 className="text-gold-400 mb-4 font-mono text-sm tracking-[0.5em]">
              DENTAL IMPLANTS · SMILE DESIGN · DIGITAL OCCLUSION
            </h2>
            <h3 className="mb-6 font-serif text-4xl text-white md:text-5xl">
              Advanced Dentistry, Simplified.
            </h3>
            <p className="mx-auto max-w-2xl text-lg font-light text-gray-400">
              Explore dental implant, smile design, and bite care options planned with CBCT 3D
              imaging, digital bite records, and clinician review in Cairo, Egypt.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <GlowCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Expertise & Approach Section — boosts word count and keyword density */}
      <section className="relative border-t border-white/5 px-4 py-24 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="text-gold-400 mb-4 font-mono text-sm tracking-[0.5em]">
              WHY CHOOSE HS CLINIC
            </h2>
            <h3 className="mb-6 font-serif text-3xl text-white md:text-4xl">
              Cosmetic Dentistry Meets Digital Precision
            </h3>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <p className="text-lg leading-relaxed text-gray-300">
                Dr. Haitham Sharshar brings over 15 years of specialized experience in dental
                implants, TMJ treatment, and digital smile design to every patient. As one of a
                Cairo prosthodontist, he combines traditional clinical expertise with digital
                occlusion records to support treatment planning for function and aesthetics.
              </p>
              <p className="leading-relaxed text-gray-400">
                Every treatment begins with comprehensive diagnostics including CBCT 3D imaging,
                T-Scan occlusal analysis, and jaw muscle assessment when clinically indicated. These
                records support the examination and help the clinician plan dental implants,
                veneers, and full-arch rehabilitations.
              </p>
            </div>
            <div className="space-y-4">
              <p className="leading-relaxed text-gray-400">
                Whether you need a single dental implant, full mouth reconstruction, or cosmetic
                smile design, HS Clinic offers a seamless patient experience from consultation
                through treatment completion. Our digital workflow includes CAD/CAM planning, guided
                implant surgery, and Digital Smile Design previews to support the discussion before
                treatment begins.
              </p>
              <p className="leading-relaxed text-gray-400">
                For international patients, our dental tourism program provides coordinated travel
                support including airport transfer planning, accommodation guidance, and dedicated
                treatment coordinators for dental care in Cairo, Egypt.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PatientStories />

      {/* CTA Section */}
      <section className="relative overflow-hidden border-t border-white/5 py-32">
        <div className="bg-gold-600/3 absolute inset-0" />
        <div className="bg-gold-400/8 animate-pulse-slow absolute -top-[50%] -left-[20%] h-[1000px] w-[1000px] rounded-full mix-blend-screen blur-[150px]" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-8 font-serif text-5xl tracking-tighter text-white md:text-7xl">
            {homepage.ctaTitle}
          </h2>
          <p className="mb-12 text-xl font-light text-gray-300">{homepage.ctaSubtitle}</p>

          <Link
            to="/contact"
            className="border-gold-400 bg-gold-400/10 text-gold-400 hover:bg-gold-400 hover:text-dark-950 focus:ring-gold-400 focus:ring-offset-dark-950 inline-flex h-12 w-full max-w-xs items-center justify-center rounded-lg border px-6 font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            {homepage.ctaButtonText}
          </Link>
        </div>
      </section>
    </div>
  );
}
