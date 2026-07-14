import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  FileSearch,
  MessageCircle,
  ScanFace,
  ShieldCheck,
} from 'lucide-react';
import {
  DEFAULT_OG_IMAGE,
  SEO,
  SITE_NAME,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildHreflangTags,
} from '@/lib/seo';

const stages = [
  {
    icon: FileSearch,
    title: 'Concerns and records',
    text: 'The discussion begins with your dental concerns, existing records, health information, and what you would like to understand.',
  },
  {
    icon: Camera,
    title: 'Clinical photographs',
    text: 'Photographs may support the clinician’s review of teeth, smile, and facial context when they are appropriate for the case.',
  },
  {
    icon: ScanFace,
    title: 'Planning references',
    text: 'Digital references or a mock-up can support discussion. They are planning aids, not a guarantee of the final appearance.',
  },
  {
    icon: ShieldCheck,
    title: 'Examination and consent',
    text: 'Clinical findings, oral health, function, materials, alternatives, limitations, and patient consent guide any treatment decision.',
  },
] as const;

const faqs = [
  {
    question: 'Does a digital preview guarantee the final smile?',
    answer:
      'No. A preview is a communication and planning aid. Clinical findings, tooth structure, gums, bite, materials, healing, and patient choices can affect the final result.',
  },
  {
    question: 'Can Digital Smile Design diagnose dental problems?',
    answer:
      'No. Photographs and digital planning do not replace examination, diagnostic records, or clinician judgment.',
  },
  {
    question: 'Is cosmetic treatment suitable for everyone?',
    answer:
      'Suitability is individual. The clinician must review oral health, function, alternatives, risks, maintenance, and the amount of tooth preparation before consent.',
  },
] as const;

export default function DigitalSmileDesign() {
  const seo = SEO.digitalSmileDesign;
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Digital Smile Design', path: '/digital-smile-design' },
  ]);
  const faq = buildFaqJsonLd([...faqs]);
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: seo.title,
    description: seo.description,
    url: seo.canonical,
    inLanguage: 'en',
  };

  return (
    <div className="bg-dark-950 min-h-screen text-white">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href={seo.canonical} />
        {buildHreflangTags(seo.canonical).map((tag) => (
          <link key={tag.hrefLang} {...tag} />
        ))}
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={seo.canonical} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:alt" content="HS Clinic Cairo" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
        <script type="application/ld+json">{JSON.stringify(faq)}</script>
      </Helmet>

      <section className="relative overflow-hidden px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(197,165,90,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(197,165,90,0.04)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        <div className="bg-gold-400/10 absolute top-0 left-1/2 h-80 w-[44rem] max-w-full -translate-x-1/2 rounded-full blur-[150px]" />
        <div className="relative mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-10 text-sm text-gray-400">
            <ol className="flex items-center gap-2">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-gold-300">Digital Smile Design</li>
            </ol>
          </nav>
          <div className="text-center">
            <p className="cinematic-hairline text-gold-300 inline-block text-sm font-semibold uppercase tracking-[0.25em]">
              Planning aid not a promise
            </p>
            <h1 className="mx-auto mt-5 max-w-5xl font-serif text-5xl font-bold md:text-7xl">
              Digital Smile Design Planning
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
              A visual discussion can help connect dental records, facial context, function, and
              patient preferences before treatment decisions are made.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
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
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/20 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-serif text-4xl md:text-5xl">A clinician-led sequence</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <article key={stage.title} className="cinematic-card rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <div className="flex items-center justify-between">
                    <Icon className="text-gold-400 h-7 w-7" />
                    <span className="text-gold-300/70 font-mono text-sm">0{index + 1}</span>
                  </div>
                  <h3 className="mt-5 font-serif text-2xl">{stage.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-400">{stage.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-serif text-4xl">Questions patients should ask</h2>
          <div className="mt-10 space-y-4">
            {faqs.map((item) => (
              <article key={item.question} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="flex gap-3 font-semibold">
                  <CheckCircle2 className="text-gold-400 mt-0.5 h-5 w-5 shrink-0" />
                  {item.question}
                </h3>
                <p className="mt-3 pl-8 text-sm leading-7 text-gray-400">{item.answer}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-white/10 bg-black/25 p-6 text-center">
            <p className="text-sm leading-7 text-gray-300">
              No patient photograph or before-and-after comparison is published on this page without
              documented publication consent and owner approval.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
