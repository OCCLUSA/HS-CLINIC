import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  FileSearch,
  HeartHandshake,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react';
import {
  DEFAULT_OG_IMAGE,
  SEO,
  SITE_NAME,
  SITE_URL,
  buildBreadcrumbJsonLd,
  buildHreflangTags,
} from '@/lib/seo';

const principles = [
  {
    icon: Stethoscope,
    title: 'Examination before decisions',
    text: 'Website information and remote records can organise questions. Diagnosis and treatment decisions require clinician review and appropriate examination.',
  },
  {
    icon: FileSearch,
    title: 'Records used as support',
    text: 'Images, scans, bite records, and other tests are interpreted together when clinically relevant. No single device proves a diagnosis by itself.',
  },
  {
    icon: HeartHandshake,
    title: 'Patient questions and consent',
    text: 'Options, alternatives, risks, timing, limitations, and aftercare are part of the discussion before treatment consent.',
  },
  {
    icon: ShieldCheck,
    title: 'Bounded public information',
    text: 'The website does not promise outcomes, fixed visit counts, success rates, or identical results for different patients.',
  },
] as const;

export function About() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ]);
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: SEO.about.title,
    description: SEO.about.description,
    url: SEO.about.canonical,
    inLanguage: 'en',
    about: {
      '@type': 'Person',
      '@id': SITE_URL + '/#doctor',
      name: 'Dr. Haitham Sharshar',
      worksFor: {
        '@type': 'Dentist',
        '@id': SITE_URL + '/#clinic',
        name: 'HS Clinic',
      },
    },
  };

  return (
    <div className="bg-dark-950 min-h-screen text-white">
      <Helmet>
        <title>{SEO.about.title}</title>
        <meta name="description" content={SEO.about.description} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href={SEO.about.canonical} />
        {buildHreflangTags(SEO.about.canonical).map((tag) => (
          <link key={tag.hrefLang} {...tag} />
        ))}
        <meta property="og:title" content={SEO.about.title} />
        <meta property="og:description" content={SEO.about.description} />
        <meta property="og:url" content={SEO.about.canonical} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:alt" content="HS Clinic Cairo" />
        <meta property="og:type" content="profile" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.about.title} />
        <meta name="twitter:description" content={SEO.about.description} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      </Helmet>

      <section className="relative overflow-hidden px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(197,165,90,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(197,165,90,0.04)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        <div className="bg-gold-400/10 absolute top-0 left-1/2 h-80 w-[44rem] max-w-full -translate-x-1/2 rounded-full blur-[150px]" />
        <div className="relative mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-10 text-sm text-gray-400">
            <ol className="flex items-center gap-2">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-gold-300">About</li>
            </ol>
          </nav>
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="text-gold-300 text-sm font-semibold uppercase tracking-[0.25em]">
                HS Clinic Cairo
              </p>
              <h1 className="mt-5 font-serif text-5xl font-bold md:text-7xl">
                About Dr. Haitham Sharshar
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
                Dental care at HS Clinic is led by Dr. Haitham Sharshar and planned around patient
                concerns, examination, appropriate records, and clear clinical discussion.
              </p>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-gray-400">
                Professional credentials, affiliations, and training claims are not listed here until
                the owner provides current, public verification for each statement.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/send-your-records"
                  className="bg-gold-400 text-dark-950 inline-flex min-h-12 items-center gap-3 rounded-xl px-7 py-3 font-bold transition duration-200 hover:bg-white active:scale-[0.98]"
                >
                  Start with records
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/contact"
                  className="border-gold-400/30 text-gold-300 inline-flex min-h-12 items-center gap-3 rounded-xl border px-7 py-3 font-semibold hover:bg-white/10"
                >
                  <MessageCircle className="h-5 w-5" />
                  Contact choices
                </Link>
              </div>
            </div>
            <aside className="border-gold-400/20 bg-dark-900/80 rounded-3xl border p-8">
              <MapPin className="text-gold-400 h-8 w-8" />
              <h2 className="mt-5 font-serif text-3xl">Clinic location</h2>
              <p className="mt-4 text-sm leading-7 text-gray-300">
                8/63, 10th District, Zahraa El Maadi, Cairo, Egypt.
              </p>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Use the Contact page to choose phone, email, WhatsApp, or the click-to-load map.
              </p>
              <Link to="/contact" className="text-gold-300 mt-6 inline-flex items-center gap-2 font-semibold hover:text-white">
                View clinic contact details <ArrowRight className="h-4 w-4" />
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/20 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-gold-300 text-sm font-semibold uppercase tracking-[0.22em]">
              Clinical approach
            </p>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl">Four patient trust principles</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {principles.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <Icon className="text-gold-400 h-7 w-7" />
                  <h3 className="mt-5 font-serif text-2xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-400">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
