import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  FileSearch,
  HeartPulse,
  MapPin,
  MessageCircle,
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
    icon: MessageCircle,
    title: 'Ask which records are useful',
    text: 'Start through the Send Your Records page. Do not book travel only from general website information.',
  },
  {
    icon: FileSearch,
    title: 'Preliminary records review',
    text: 'The clinic can organise likely questions and possible stages. This is not a diagnosis or final treatment plan.',
  },
  {
    icon: CalendarDays,
    title: 'Discuss possible visit timing',
    text: 'Timing is case specific. Surgery, healing, provisional work, and final restorations may require separate visits.',
  },
  {
    icon: HeartPulse,
    title: 'Review after examination',
    text: 'Clinical examination and appropriate diagnostics inform discussion of treatment options, risks, consent, estimates, and aftercare needs.',
  },
] as const;

const faqs = [
  {
    question: 'Is a travel timeline guaranteed after online records review?',
    answer:
      'No. The clinic can discuss a preliminary sequence, but timing may change after examination, diagnostics, healing response, or clinician review.',
  },
  {
    question: 'Are flights, hotels, or transfers included automatically?',
    answer:
      'No. Confirm any travel or accommodation arrangement separately and only after the likely clinic timing is clearer. This page does not promise a travel package.',
  },
  {
    question: 'Can complex care be completed in one visit?',
    answer:
      'Not necessarily. Complex implant and restorative care may need staged visits. The individual clinical situation determines the sequence.',
  },
  {
    question: 'What if symptoms become urgent before travel?',
    answer:
      'Seek urgent local dental or medical care for severe pain, swelling, bleeding, breathing difficulty, or trauma. Do not wait for an online reply or travel date.',
  },
] as const;

export default function TourismProgram() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Dental Tourism', path: '/dental-tourism' },
    { name: 'Visit Stages', path: '/dental-tourism/program' },
  ]);
  const faq = buildFaqJsonLd([...faqs]);
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: SEO.tourismProgram.title,
    description: SEO.tourismProgram.description,
    url: SEO.tourismProgram.canonical,
    inLanguage: 'en',
  };

  return (
    <div className="bg-dark-950 min-h-screen text-white">
      <Helmet>
        <title>{SEO.tourismProgram.title}</title>
        <meta name="description" content={SEO.tourismProgram.description} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href={SEO.tourismProgram.canonical} />
        {buildHreflangTags(SEO.tourismProgram.canonical).map((tag) => (
          <link key={tag.hrefLang} {...tag} />
        ))}
        <meta property="og:title" content={SEO.tourismProgram.title} />
        <meta property="og:description" content={SEO.tourismProgram.description} />
        <meta property="og:url" content={SEO.tourismProgram.canonical} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:alt" content="HS Clinic Cairo" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.tourismProgram.title} />
        <meta name="twitter:description" content={SEO.tourismProgram.description} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
        <script type="application/ld+json">{JSON.stringify(faq)}</script>
      </Helmet>

      <section className="relative overflow-hidden px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        <div className="bg-gold-400/10 absolute top-0 left-1/2 h-80 w-[44rem] max-w-full -translate-x-1/2 rounded-full blur-[150px]" />
        <div className="relative mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-10 text-sm text-gray-400">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/dental-tourism" className="hover:text-white">Dental Tourism</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-gold-300">Visit Stages</li>
            </ol>
          </nav>
          <div className="text-center">
            <p className="text-gold-300 text-sm font-semibold uppercase tracking-[0.25em]">
              Case specific timing
            </p>
            <h1 className="mx-auto mt-5 max-w-4xl font-serif text-5xl font-bold md:text-7xl">
              Dental Tourism Visit Stages
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
              A clear sequence from records review to in-clinic confirmation. It explains the order
              of decisions without promising a fixed package, visit count, or treatment outcome.
            </p>
            <Link
              to="/send-your-records"
              className="bg-gold-400 text-dark-950 mt-8 inline-flex min-h-12 items-center gap-3 rounded-xl px-7 py-3 font-bold transition duration-200 hover:bg-white active:scale-[0.98]"
            >
              Start with your records
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/20 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-serif text-4xl md:text-5xl">The planning sequence</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <article key={stage.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
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
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-9">
            <MapPin className="text-gold-400 h-8 w-8" />
            <h2 className="mt-5 font-serif text-3xl">Travel choices stay separate</h2>
            <ul className="mt-7 space-y-4 text-sm leading-6 text-gray-300">
              {[
                'Confirm likely clinic timing before non-refundable bookings.',
                'Check current visa, airline, hotel, transport, and accessibility details yourself.',
                'Do not treat tourism activities as part of clinical recovery advice.',
                'Ask before assuming translation, companion, weekend, or transfer support.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="text-gold-400 mt-0.5 h-5 w-5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/25 p-7 sm:p-9">
            <ShieldCheck className="text-gold-400 h-8 w-8" />
            <h2 className="mt-5 font-serif text-3xl">Clinical decisions stay with the clinician</h2>
            <ul className="mt-7 space-y-4 text-sm leading-6 text-gray-300">
              {[
                'Records review is preliminary and may be incomplete.',
                'Examination and diagnostics can change the options or sequence.',
                'Costs depend on the confirmed case, materials, and stages.',
                'Consent includes alternatives, risks, limitations, and aftercare.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="text-gold-400 mt-0.5 h-5 w-5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-dark-900/60 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-serif text-4xl">Visit planning questions</h2>
          <div className="mt-10 space-y-4">
            {faqs.map((item) => (
              <article key={item.question} className="rounded-2xl border border-white/10 bg-black/20 p-6">
                <h3 className="font-semibold">{item.question}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-400">{item.answer}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex gap-4 rounded-2xl border border-amber-300/25 bg-amber-300/5 p-6">
            <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-amber-200" />
            <p className="text-sm leading-6 text-gray-300">
              This program page is informational. It is not emergency care and does not confirm
              diagnosis, treatment suitability, travel fitness, or a treatment result.
            </p>
          </div>
          <div className="mt-10 text-center">
            <Link to="/contact" className="text-gold-300 font-semibold hover:text-white">
              View clinic contact options
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
