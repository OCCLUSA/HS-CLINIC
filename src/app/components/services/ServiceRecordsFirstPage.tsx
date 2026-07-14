import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronRight, FileText, ShieldCheck } from 'lucide-react';
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_TYPE,
  DEFAULT_OG_IMAGE_WIDTH,
  SITE_NAME,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildHreflangTags,
} from '@/lib/seo';

type SeoEntry = {
  title: string;
  description: string;
  canonical: string;
};

type RecordItem = {
  title: string;
  description: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

export type ServiceRecordsFirstContent = {
  seo: SeoEntry;
  breadcrumbLabel: string;
  heading: string;
  introduction: string;
  clinicalBoundary: string;
  records: readonly RecordItem[];
  faqs: readonly FaqItem[];
};

type ServiceRecordsFirstPageProps = {
  content: ServiceRecordsFirstContent;
};

const reviewStages = [
  {
    title: 'Existing records',
    description: 'The clinic reviews what you already have and notes what may still be needed.',
  },
  {
    title: 'Preliminary questions',
    description: 'A clinician identifies questions that should be checked during an examination.',
  },
  {
    title: 'Possible visit stages',
    description: 'The clinic can outline likely appointment stages without promising a final plan.',
  },
  {
    title: 'In person confirmation',
    description: 'Examination and appropriate diagnostics guide any treatment decision.',
  },
] as const;

export function ServiceRecordsFirstPage({ content }: ServiceRecordsFirstPageProps) {
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: content.breadcrumbLabel, path: new URL(content.seo.canonical).pathname },
  ];
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: content.heading,
    description: content.introduction,
    url: content.seo.canonical,
    inLanguage: 'en',
  };
  const breadcrumbSchema = buildBreadcrumbJsonLd(breadcrumbItems);
  const faqSchema = buildFaqJsonLd([...content.faqs]);

  return (
    <div className="bg-dark-950 min-h-screen overflow-hidden text-white">
      <Helmet>
        <title>{content.seo.title}</title>
        <meta name="description" content={content.seo.description} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href={content.seo.canonical} />
        {buildHreflangTags(content.seo.canonical).map((tag) => (
          <link key={tag.hrefLang} {...tag} />
        ))}
        <meta property="og:title" content={content.seo.title} />
        <meta property="og:description" content={content.seo.description} />
        <meta property="og:url" content={content.seo.canonical} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:alt" content={DEFAULT_OG_IMAGE_ALT} />
        <meta property="og:image:type" content={DEFAULT_OG_IMAGE_TYPE} />
        <meta property="og:image:width" content={String(DEFAULT_OG_IMAGE_WIDTH)} />
        <meta property="og:image:height" content={String(DEFAULT_OG_IMAGE_HEIGHT)} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content="en_EG" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={content.seo.title} />
        <meta name="twitter:description" content={content.seo.description} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:image:alt" content={DEFAULT_OG_IMAGE_ALT} />
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <section className="relative px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="bg-gold-400/10 pointer-events-none absolute top-0 left-1/2 h-96 w-[52rem] max-w-full -translate-x-1/2 rounded-full blur-[170px]"
        />
        <div className="relative mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-12 text-sm text-gray-400">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link
                  to="/"
                  className="transition-colors hover:text-white motion-reduce:transition-none"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-4 w-4" />
              </li>
              <li>
                <Link
                  to="/services"
                  className="transition-colors hover:text-white motion-reduce:transition-none"
                >
                  Services
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-4 w-4" />
              </li>
              <li aria-current="page" className="text-gold-300">
                {content.breadcrumbLabel}
              </li>
            </ol>
          </nav>

          <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <h1 className="max-w-4xl font-serif text-5xl leading-tight font-bold md:text-7xl">
                {content.heading}
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-gray-300">
                {content.introduction}
              </p>
              <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Link
                  to="/send-your-records"
                  className="bg-gold-400 text-dark-950 inline-flex min-h-12 items-center gap-3 rounded-xl px-7 py-3 font-bold transition-colors duration-200 hover:bg-white motion-reduce:transition-none"
                >
                  Send your records
                  <ArrowRight aria-hidden="true" className="h-5 w-5" />
                </Link>
                <p className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle2 aria-hidden="true" className="text-gold-400 h-5 w-5" />
                  Screening suggestion only
                </p>
              </div>
            </div>

            <aside
              aria-label="Clinical boundary"
              className="glass-card border-gold-400/20 relative overflow-hidden p-7 sm:p-9"
            >
              <div
                aria-hidden="true"
                className="from-gold-400/10 pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r via-white/30 to-transparent"
              />
              <ShieldCheck aria-hidden="true" className="text-gold-400 h-8 w-8" />
              <h2 className="mt-5 font-serif text-3xl">Clinical boundary</h2>
              <p className="mt-4 leading-7 text-gray-300">{content.clinicalBoundary}</p>
              <p className="mt-5 text-sm font-semibold text-white">Clinician review required.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-white/[0.02] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h2 className="font-serif text-4xl">Records that may help</h2>
            <p className="mt-4 leading-7 text-gray-400">
              Send only records you already have. Do not arrange new imaging only for an online
              enquiry; a clinician can advise whether it is appropriate.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {content.records.map((record) => (
              <article
                key={record.title}
                className="cinematic-card rounded-2xl border border-white/10 bg-black/25 p-6"
              >
                <FileText aria-hidden="true" className="text-gold-400 h-6 w-6" />
                <h3 className="mt-4 text-xl font-semibold">{record.title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-400">{record.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="font-serif text-4xl">What the first review can do</h2>
            <p className="mt-5 leading-7 text-gray-400">
              It can organise records and prepare useful questions. It cannot provide an online
              diagnosis, final treatment decision, guaranteed result, or fixed timeline.
            </p>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2">
            {reviewStages.map((stage, index) => (
              <li
                key={stage.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <span className="border-gold-400/40 text-gold-300 flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-xl font-semibold">{stage.title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-400">{stage.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-serif text-4xl">Questions before you continue</h2>
          <div className="mt-10 space-y-4">
            {content.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-6 font-semibold text-white">
                  <span>{faq.question}</span>
                  <ChevronRight
                    aria-hidden="true"
                    className="text-gold-400 h-5 w-5 shrink-0 transition-transform group-open:rotate-90 motion-reduce:transition-none"
                  />
                </summary>
                <p className="px-6 pb-6 text-sm leading-7 text-gray-400">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pt-4 pb-24 text-center sm:px-6 lg:px-8">
        <div className="border-gold-400/20 mx-auto max-w-5xl rounded-3xl border bg-gradient-to-br from-white/[0.06] to-transparent p-9 shadow-2xl shadow-black/30 sm:p-12">
          <h2 className="font-serif text-4xl">Start with the records you have</h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-300">
            The clinic can explain what may be useful next. Any clinical conclusion waits for
            examination and appropriate diagnostics.
          </p>
          <Link
            to="/send-your-records"
            className="bg-gold-400 text-dark-950 mt-8 inline-flex min-h-12 items-center gap-3 rounded-xl px-7 py-3 font-bold transition-colors duration-200 hover:bg-white motion-reduce:transition-none"
          >
            Send your records
            <ArrowRight aria-hidden="true" className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
