import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  FileSearch,
  Globe2,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Plane,
  ShieldCheck,
} from 'lucide-react';
import {
  DEFAULT_OG_IMAGE,
  REGIONAL_TOURISM_LINKS,
  SEO,
  SITE_NAME,
  buildBreadcrumbJsonLd,
  buildDentalTourismHreflangTags,
  buildFaqJsonLd,
} from '@/lib/seo';

const steps = [
  {
    icon: MessageCircle,
    title: 'Ask what records are useful',
    text: 'Start on the Send Your Records page. The public website has no upload form or patient file storage.',
  },
  {
    icon: FileSearch,
    title: 'Preliminary clinician review',
    text: 'The clinic reviews the available information and explains questions, limitations, and possible visit stages.',
  },
  {
    icon: CalendarDays,
    title: 'Plan dates after review',
    text: 'Choose travel only after discussing likely appointment needs. Complex care may require staged visits and healing time.',
  },
  {
    icon: ShieldCheck,
    title: 'Confirm in Cairo',
    text: 'Examination and appropriate diagnostic records are required before a final treatment decision or consent.',
  },
] as const;

const questions = [
  {
    question: 'Can treatment be confirmed before I travel?',
    answer:
      'No. A records review can outline preliminary questions and possible stages. Final decisions require examination, appropriate diagnostics, and clinician review in Cairo.',
  },
  {
    question: 'Should I book flights before sending records?',
    answer:
      'No. Ask the clinic about likely visit timing first. The required sequence may change after examination or new diagnostic information.',
  },
  {
    question: 'Does one visit suit every dental case?',
    answer:
      'No. Visit number and timing depend on the individual clinical situation, healing, and the agreed treatment sequence. No fixed timeline is promised online.',
  },
  {
    question: 'What if I have severe symptoms before travel?',
    answer:
      'Severe pain, swelling, bleeding, breathing difficulty, or trauma needs urgent local dental or medical care. Do not delay urgent care while planning travel.',
  },
] as const;

export default function DentalTourism() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Dental Tourism', path: '/dental-tourism' },
  ]);
  const faq = buildFaqJsonLd([...questions]);
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: SEO.dentalTourism.title,
    description: SEO.dentalTourism.description,
    url: SEO.dentalTourism.canonical,
    inLanguage: 'en',
  };

  return (
    <div className="bg-dark-950 min-h-screen overflow-hidden text-white">
      <Helmet>
        <title>{SEO.dentalTourism.title}</title>
        <meta name="description" content={SEO.dentalTourism.description} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href={SEO.dentalTourism.canonical} />
        {buildDentalTourismHreflangTags(SEO.dentalTourism.canonical).map((tag) => (
          <link key={tag.hrefLang} {...tag} />
        ))}
        <meta property="og:title" content={SEO.dentalTourism.title} />
        <meta property="og:description" content={SEO.dentalTourism.description} />
        <meta property="og:url" content={SEO.dentalTourism.canonical} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:alt" content="HS Clinic Cairo" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.dentalTourism.title} />
        <meta name="twitter:description" content={SEO.dentalTourism.description} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
        <script type="application/ld+json">{JSON.stringify(faq)}</script>
      </Helmet>

      <section className="relative px-4 pt-28 pb-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(197,165,90,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(197,165,90,0.04)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        <div className="bg-gold-400/10 absolute top-0 left-1/2 h-96 w-[52rem] max-w-full -translate-x-1/2 rounded-full blur-[170px]" />
        <div className="relative mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-10 text-sm text-gray-400">
            <ol className="flex items-center gap-2">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-gold-300">Dental Tourism</li>
            </ol>
          </nav>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="cinematic-hairline text-gold-300 inline-block text-sm font-semibold uppercase tracking-[0.25em]">
                Cairo dental travel
              </p>
              <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-tight font-bold md:text-7xl">
                Records First Dental Tourism
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
                Plan a Cairo dental visit around clinician review, appropriate records, and realistic
                treatment stages. Travel follows the clinical pathway; it does not decide it.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/send-your-records"
                  className="bg-gold-400 text-dark-950 inline-flex min-h-12 items-center gap-3 rounded-xl px-7 py-3 font-bold transition duration-200 hover:bg-white active:scale-[0.98]"
                >
                  Send your records
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/contact"
                  className="border-gold-400/30 text-gold-300 inline-flex min-h-12 items-center gap-3 rounded-xl border px-7 py-3 font-semibold transition duration-200 hover:bg-white/10"
                >
                  Contact the clinic
                </Link>
              </div>
              <p className="mt-5 max-w-2xl text-sm leading-6 text-gray-400">
                Online review is preliminary. No diagnosis, treatment suitability, outcome, or visit
                count is guaranteed through the website.
              </p>
            </div>

            <aside className="border-gold-400/20 bg-dark-900/80 rounded-3xl border p-7 shadow-2xl shadow-black/30 sm:p-9">
              <Globe2 className="text-gold-400 h-9 w-9" />
              <h2 className="mt-5 font-serif text-3xl">Before choosing travel dates</h2>
              <ul className="mt-7 space-y-5">
                {[
                  'Ask which records are useful for your concern.',
                  'Discuss whether the likely pathway may need more than one visit.',
                  'Keep urgent and emergency care local rather than waiting to travel.',
                  'Confirm accommodation or transport separately after clinic timing is clearer.',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-gray-300">
                    <CheckCircle2 className="text-gold-400 mt-0.5 h-5 w-5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/20 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-gold-300 text-sm font-semibold uppercase tracking-[0.22em]">
              Patient pathway
            </p>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl">Four clear stages</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <article key={step.title} className="cinematic-card rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <div className="flex items-center justify-between">
                    <Icon className="text-gold-400 h-7 w-7" />
                    <span className="text-gold-300/70 font-mono text-sm">0{index + 1}</span>
                  </div>
                  <h3 className="mt-5 font-serif text-2xl">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-400">{step.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-gold-300 text-sm font-semibold uppercase tracking-[0.22em]">
                Regional planning
              </p>
              <h2 className="mt-4 font-serif text-4xl md:text-5xl">Guides for Gulf and Europe patients</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-gray-400">
              Country pages organise travel questions. They do not change the clinical standard or
              promise that travel is suitable for a particular patient.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {REGIONAL_TOURISM_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                hrefLang={link.hrefLang}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition duration-200 hover:border-gold-400/40 hover:bg-white/[0.06]"
              >
                <MapPin className="text-gold-400 h-5 w-5" />
                <span className="mt-4 block font-semibold text-white">{link.label}</span>
                <span className="text-gold-300 mt-3 inline-flex items-center gap-2 text-sm">
                  Read guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-dark-900/60 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
          <Link to="/send-your-records" className="rounded-3xl border border-white/10 bg-black/20 p-7 hover:border-gold-400/40">
            <FileSearch className="text-gold-400 h-8 w-8" />
            <h2 className="mt-5 font-serif text-3xl">Send Your Records</h2>
            <p className="mt-3 text-sm leading-7 text-gray-400">See the checklist, privacy boundary, and WhatsApp-first next step.</p>
          </Link>
          <Link to="/dental-tourism/program" className="rounded-3xl border border-white/10 bg-black/20 p-7 hover:border-gold-400/40">
            <Plane className="text-gold-400 h-8 w-8" />
            <h2 className="mt-5 font-serif text-3xl">Visit Stages</h2>
            <p className="mt-3 text-sm leading-7 text-gray-400">Read the visit sequence while keeping timing subject to clinician review.</p>
          </Link>
          <Link to="/dental-tourism/partners" className="rounded-3xl border border-white/10 bg-black/20 p-7 hover:border-gold-400/40">
            <Building2 className="text-gold-400 h-8 w-8" />
            <h2 className="mt-5 font-serif text-3xl">Company Partnerships</h2>
            <p className="mt-3 text-sm leading-7 text-gray-400">A separate enquiry path for transparent company coordination.</p>
          </Link>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <HeartHandshake className="text-gold-400 mx-auto h-9 w-9" />
            <h2 className="mt-5 font-serif text-4xl">Questions before travel</h2>
          </div>
          <div className="mt-10 space-y-4">
            {questions.map((item) => (
              <article key={item.question} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="font-semibold text-white">{item.question}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-400">{item.answer}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex gap-4 rounded-2xl border border-amber-300/25 bg-amber-300/5 p-6">
            <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-amber-200" />
            <div>
              <h3 className="font-semibold text-amber-100">Urgent care stays local</h3>
              <p className="mt-2 text-sm leading-6 text-gray-300">
                Travel planning is not an emergency service. Seek urgent local care for severe
                symptoms, bleeding, swelling, breathing difficulty, or trauma.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
