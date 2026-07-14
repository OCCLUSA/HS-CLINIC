import { useMemo } from 'react';
import { ClipboardList, FileText, HeartPulse, Plane, ShieldCheck } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  SEO,
  SITE_NAME,
  buildBreadcrumbJsonLd,
  buildDentalTourismHreflangTags,
  buildFaqJsonLd,
} from '@/lib/seo';

type EducationPage = {
  slug: 'gulf' | 'europe';
  seoKey: 'dentalTourismGulfGuide' | 'dentalTourismEuropeGuide';
  parentPath: string;
  audience: string;
  heading: string;
  lead: string;
  checklist: string[];
  questions: Array<{ question: string; answer: string }>;
};

const sharedQuestions = [
  {
    question: 'Can an online records review confirm implant treatment?',
    answer:
      'No. It can organise preliminary questions and possible stages. Final decisions require examination, appropriate records, and clinician review in Cairo.',
  },
  {
    question: 'Should I book flights before the clinic reviews my records?',
    answer:
      'Ask about the likely clinical stages first. Visit length or the number of trips can change after examination, new records, surgery findings, or healing review.',
  },
  {
    question: 'Can a visit count or temporary restoration be promised online?',
    answer:
      'No. These are case-specific questions that depend on examination, anatomy, stability, bite, materials, healing needs, and clinician assessment.',
  },
  {
    question: 'What if I have severe symptoms before travel?',
    answer:
      'Seek prompt local dental or medical care for severe pain, trauma, swelling, fever, uncontrolled bleeding, breathing or swallowing difficulty, or rapidly worsening symptoms.',
  },
];

const EDUCATION_PAGES: Record<string, EducationPage> = {
  gulf: {
    slug: 'gulf',
    seoKey: 'dentalTourismGulfGuide',
    parentPath: '/dental-tourism/gulf',
    audience: 'Gulf patients',
    heading: 'Dental implant travel guide for Gulf patients',
    lead:
      'A records-first guide to the questions that can be discussed before travel and the decisions that must wait for examination in Cairo.',
    checklist: [
      'Ask which existing X-rays or scans are useful before sending files',
      'Photographs of the smile, missing teeth, bite, and current restorations if requested',
      'Relevant medical history, medicines, allergies, and previous dental information',
      'Your travel limits and whether more than one visit is possible',
      'Questions about provisional options, healing, materials, maintenance, and follow-up',
    ],
    questions: sharedQuestions,
  },
  europe: {
    slug: 'europe',
    seoKey: 'dentalTourismEuropeGuide',
    parentPath: '/dental-tourism/europe',
    audience: 'Europe patients',
    heading: 'Dental implant travel guide for Europe patients',
    lead:
      'A records-first guide to preliminary timing, staged visits, examination, healing, and follow-up questions before considering implant travel to Cairo.',
    checklist: [
      'Ask which existing X-rays, scans, or dental notes are useful before sending files',
      'Photographs of the smile, missing teeth, bite, and current restorations if requested',
      'Relevant medical history, medicines, allergies, and previous implant information',
      'Your travel limits and whether staged visits can be considered',
      'Questions about healing, maintenance, urgent review, and return travel',
    ],
    questions: sharedQuestions,
  },
};

const planningStages = [
  {
    icon: FileText,
    title: 'Ask before sending files',
    text: 'The clinic can say which existing records are useful. Do not send unrelated or unnecessary health information.',
  },
  {
    icon: ClipboardList,
    title: 'Discuss possible next steps',
    text: 'Remote review can organise questions and possible stages. It is not a diagnosis, final plan, or travel-fitness decision.',
  },
  {
    icon: HeartPulse,
    title: 'Review in Cairo',
    text: 'Examination and clinician-selected records inform suitability assessment and discussion of risks, alternatives, materials, estimates, consent, and timing.',
  },
  {
    icon: Plane,
    title: 'Plan travel after review',
    text: 'Flights and accommodation should follow discussion of likely visit stages, healing windows, and possible changes.',
  },
];

export default function RegionalEducationPage() {
  const { regionSlug } = useParams();
  const page = regionSlug ? EDUCATION_PAGES[regionSlug] : undefined;

  const breadcrumbJsonLd = useMemo(() => {
    if (!page) return null;
    return buildBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Dental Tourism', path: '/dental-tourism' },
      { name: page.audience, path: page.parentPath },
      {
        name: 'Implant Travel Guide',
        path: `/dental-tourism/${page.slug}/dental-implant-travel-guide`,
      },
    ]);
  }, [page]);
  const faqJsonLd = useMemo(() => (page ? buildFaqJsonLd(page.questions) : null), [page]);

  if (!page) return <Navigate to="/dental-tourism" replace />;

  const seo = SEO[page.seoKey];
  const pageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: seo.title,
    description: seo.description,
    url: seo.canonical,
    inLanguage: 'en',
    audience: {
      '@type': 'Audience',
      audienceType: page.audience,
    },
  };

  return (
    <div className="bg-dark-950 min-h-screen overflow-hidden text-white">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={seo.canonical} />
        {buildDentalTourismHreflangTags(seo.canonical).map((tag) => (
          <link key={tag.hrefLang} rel={tag.rel} hrefLang={tag.hrefLang} href={tag.href} />
        ))}
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={seo.canonical} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:alt" content={DEFAULT_OG_IMAGE_ALT} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(pageJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(circle_at_76%_8%,rgba(212,175,55,0.14),transparent_42%)]" />

      <div className="relative mx-auto max-w-6xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap items-center gap-2 text-sm text-gray-400">
          <Link to="/" className="hover:text-amber-300">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/dental-tourism" className="hover:text-amber-300">Dental Tourism</Link>
          <span aria-hidden="true">/</span>
          <Link to={page.parentPath} className="hover:text-amber-300">{page.audience}</Link>
          <span aria-hidden="true">/</span>
          <span className="text-amber-300">Implant Travel Guide</span>
        </nav>

        <header className="cinematic-hairline max-w-4xl">
          <p className="mb-4 font-mono text-sm tracking-[0.25em] text-amber-300 uppercase">
            Educational planning guide
          </p>
          <h1 className="font-serif text-4xl leading-tight font-bold md:text-6xl">{page.heading}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">{page.lead}</p>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-amber-100/80">
            Final decisions require examination and clinician review. This page does not confirm
            suitability, treatment, outcome, visit count, or travel fitness.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/send-your-records"
              className="bg-gold-400 text-dark-950 inline-flex min-h-12 items-center rounded-xl px-6 py-3 font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
            >
              Start with your records
            </Link>
            <Link
              to={page.parentPath}
              className="inline-flex min-h-12 items-center rounded-xl border border-amber-300/30 px-6 py-3 font-semibold text-amber-200 hover:bg-white/5"
            >
              Back to {page.audience}
            </Link>
          </div>
        </header>

        <section aria-labelledby="planning-stages" className="mt-20">
          <h2 id="planning-stages" className="font-serif text-3xl text-white md:text-4xl">
            A safer planning sequence
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {planningStages.map(({ icon: Icon, title, text }, index) => (
              <article key={title} className="cinematic-card rounded-2xl border border-white/10 bg-white/[0.035] p-6">
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-300/10 font-mono text-sm text-amber-300">
                    {index + 1}
                  </span>
                  <Icon className="h-6 w-6 text-amber-300" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-serif text-xl text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-300">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="records-checklist" className="mt-20 rounded-3xl border border-white/10 bg-white/[0.025] p-8 md:p-10">
          <div className="flex items-center gap-4">
            <ShieldCheck className="h-7 w-7 text-amber-300" aria-hidden="true" />
            <h2 id="records-checklist" className="font-serif text-3xl text-white">
              Questions and records to prepare
            </h2>
          </div>
          <ul className="mt-7 grid gap-4 md:grid-cols-2">
            {page.checklist.map((item) => (
              <li key={item} className="rounded-xl border border-white/10 p-4 text-sm leading-7 text-gray-300">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="travel-questions" className="mt-20">
          <h2 id="travel-questions" className="font-serif text-3xl text-white md:text-4xl">
            Questions before travel
          </h2>
          <div className="mt-8 space-y-4">
            {page.questions.map((item) => (
              <details key={item.question} className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
                <summary className="cursor-pointer font-semibold text-white">{item.question}</summary>
                <p className="mt-4 max-w-4xl text-sm leading-7 text-gray-300">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
