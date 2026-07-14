import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  FileText,
  Globe2,
  Languages,
  MapPin,
  MessageCircle,
  Plane,
  ShieldCheck,
} from 'lucide-react';
import {
  DEFAULT_OG_IMAGE,
  SEO,
  SITE_NAME,
  SITE_URL,
  TOURISM_EDUCATION_LINKS,
  buildBreadcrumbJsonLd,
  buildDentalTourismHreflangTags,
  buildFaqJsonLd,
} from '@/lib/seo';

type RegionalPage = {
  slug: string;
  seoKey:
    | 'dentalTourismGulf'
    | 'dentalTourismSaudi'
    | 'dentalTourismUae'
    | 'dentalTourismKuwait'
    | 'dentalTourismQatar'
    | 'dentalTourismOman'
    | 'dentalTourismBahrain'
    | 'dentalTourismEurope'
    | 'dentalTourismUk'
    | 'dentalTourismGermany';
  eyebrow: string;
  heading: string;
  lead: string;
  regionName: string;
  airportNote: string;
  languageNote: string;
  planningNotes: string[];
  patientQuestions: Array<{ question: string; answer: string }>;
};

function buildPriorityCountryPage(
  slug: 'kuwait' | 'qatar' | 'oman' | 'bahrain',
  seoKey:
    | 'dentalTourismKuwait'
    | 'dentalTourismQatar'
    | 'dentalTourismOman'
    | 'dentalTourismBahrain',
  country: 'Kuwait' | 'Qatar' | 'Oman' | 'Bahrain'
): RegionalPage {
  const countryCopy = {
    kuwait: {
      lead:
        'A records-first guide for patients in Kuwait who want to organise existing dental information and travel questions before considering care in Cairo.',
      planningNotes: [
        'Ask whether previous implant component details, recent X-rays, or a medication list are relevant.',
        'Ask how an examination in Cairo could change the possible sequence before choosing dates.',
        'Ask what aftercare information may be useful for a dentist in Kuwait.',
      ],
      patientQuestions: [
        {
          question: 'What should I ask before sharing records from Kuwait?',
          answer:
            'Describe the dental concern first and ask which existing records are relevant. Avoid sending unnecessary health information.',
        },
        {
          question: 'Can a Kuwait visit count be confirmed online?',
          answer:
            'No. Possible stages may be discussed, but examination, diagnostics when indicated, healing, and clinician review can change the visit sequence.',
        },
        {
          question: 'What if I need follow-up in Kuwait?',
          answer:
            'Ask what written treatment and aftercare information may be appropriate for your local dentist. The treating clinicians decide the case-specific follow-up.',
        },
      ],
    },
    qatar: {
      lead:
        'A planning guide for patients in Qatar who want to separate records questions, possible treatment stages, and travel decisions before a Cairo visit.',
      planningNotes: [
        'Ask which previous crown, bridge, implant, or imaging records may be relevant.',
        'Ask how provisional and final restoration stages could affect more than one visit.',
        'Keep flight and accommodation decisions separate from preliminary clinical discussion.',
      ],
      patientQuestions: [
        {
          question: 'Which questions can Qatar patients raise before travel?',
          answer:
            'You can ask which existing records may be useful, which stages are only possibilities, and what must wait for examination in Cairo.',
        },
        {
          question: 'Can restorative stages be fixed before examination?',
          answer:
            'No. Provisional, healing, and final restorative stages depend on case findings and clinician review.',
        },
        {
          question: 'Should travel be booked from a WhatsApp discussion alone?',
          answer:
            'No. A WhatsApp enquiry is preliminary. Confirm current clinic timing separately before making non-refundable bookings.',
        },
      ],
    },
    oman: {
      lead:
        'A records-first guide for patients in Oman who want to clarify imaging, examination, and staged-care questions before making travel decisions.',
      planningNotes: [
        'Ask whether older imaging remains useful or whether new diagnostics may be considered after examination.',
        'Ask which medical or dental history details are relevant before sharing them.',
        'Keep surgery, healing, and final restoration open to separate stages when clinically required.',
      ],
      patientQuestions: [
        {
          question: 'Can an Oman patient know whether older X-rays are enough?',
          answer:
            'Ask the clinic about the date and type of existing records. A clinician decides whether further imaging is indicated after review and examination.',
        },
        {
          question: 'Can one Cairo visit be assumed?',
          answer:
            'No. Possible visit stages depend on the concern, examination findings, diagnostics, healing, and clinician review.',
        },
        {
          question: 'What communication details should be checked?',
          answer:
            'Ask the clinic to confirm current language and record-format arrangements before sharing health information or booking travel.',
        },
      ],
    },
    bahrain: {
      lead:
        'A practical guide for patients in Bahrain who want to organise dental history, possible Cairo stages, and local follow-up questions before travel.',
      planningNotes: [
        'Begin with the dental concern and ask which dated records or photographs may be relevant.',
        'Ask what cannot be confirmed until clinical examination and suitable diagnostics in Cairo.',
        'Ask what an aftercare summary may need to cover for local maintenance in Bahrain.',
      ],
      patientQuestions: [
        {
          question: 'How should Bahrain patients open a records enquiry?',
          answer:
            'Describe the concern and ask which existing information is relevant. The public website does not upload or store patient records.',
        },
        {
          question: 'Can timing be guaranteed before travel?',
          answer:
            'No. Timing can change after examination, diagnostics, clinician review, or healing assessment.',
        },
        {
          question: 'Can follow-up questions be prepared before returning to Bahrain?',
          answer:
            'Ask which written treatment, material, and aftercare details may be appropriate for the individual case and local dentist.',
        },
      ],
    },
  } as const;
  const copy = countryCopy[slug];

  return {
    slug,
    seoKey,
    eyebrow: `For ${country} patients`,
    heading: `Dental care in Cairo for patients from ${country}`,
    lead: copy.lead,
    regionName: country,
    airportNote:
      'Confirm the likely treatment stages and clinic visit length before choosing flights or accommodation.',
    languageNote:
      'Ask the clinic to confirm the communication arrangements you need before sending health information.',
    planningNotes: [...copy.planningNotes],
    patientQuestions: [...copy.patientQuestions],
  };
}

const REGIONAL_PAGES: Record<string, RegionalPage> = {
  gulf: {
    slug: 'gulf',
    seoKey: 'dentalTourismGulf',
    eyebrow: 'For Gulf patients',
    heading: 'Dental care in Cairo for Gulf patients',
    lead:
      'Plan implant, smile, crown, or bite related dental care in Cairo with a clinic team that can review records before you travel.',
    regionName: 'Gulf countries',
    airportNote: 'Confirm the likely treatment stages and clinic visit length before choosing flights or accommodation.',
    languageNote: 'Ask the clinic to confirm the communication arrangements you need before sending health information.',
    planningNotes: [
      'Ask which existing photos, X-rays, or CBCT files may be useful before booking travel.',
      'Ask about preliminary questions and possible visit stages before committing to dates.',
      'Keep complex implant or full arch cases open to staged visits when healing is needed.',
    ],
    patientQuestions: [
      {
        question: 'Can Gulf patients start before flying to Cairo?',
        answer:
          'You can start by asking which existing records may be useful. A final plan still needs clinical examination, appropriate diagnostic records, and clinician review at the clinic.',
      },
      {
        question: 'Which treatment questions can Gulf patients discuss?',
        answer:
          'This planning page covers questions about implants, smile design, crowns, veneers, full arch care, and bite or TMJ screening suggestions.',
      },
      {
        question: 'Is the treatment plan confirmed online?',
        answer:
          'No. A preliminary discussion may organise questions or possible stages, but final decisions require examination, appropriate diagnostics, and clinician review in Cairo.',
      },
    ],
  },
  'saudi-arabia': {
    slug: 'saudi-arabia',
    seoKey: 'dentalTourismSaudi',
    eyebrow: 'For Saudi patients',
    heading: 'Dental treatment in Cairo for Saudi patients',
    lead:
      'A clear pathway for patients travelling from Saudi Arabia for dental implants, cosmetic dentistry, crowns, and full mouth planning.',
    regionName: 'Saudi Arabia',
    airportNote: 'Confirm the likely treatment stages and clinic visit length before choosing flights or accommodation.',
    languageNote: 'Ask the clinic to confirm the communication arrangements you and accompanying family need.',
    planningNotes: [
      'Describe the concern and ask whether a panoramic X-ray, CBCT, or other existing records may be relevant.',
      'Ask for visit length guidance before choosing flight dates.',
      'Plan implant and full arch cases with healing time, not only holiday length.',
    ],
    patientQuestions: [
      {
        question: 'Can I travel from Saudi Arabia for a short dental visit?',
        answer:
          'Visit length is case-specific. Implant, restorative, or diagnostic visits may require different stages after examination and clinician review.',
      },
      {
        question: 'Can my family coordinate the appointment in Arabic?',
        answer:
          'Ask the clinic to confirm the language and communication arrangements before sharing records or booking travel.',
      },
      {
        question: 'What should Saudi patients send first?',
        answer:
          'Begin by describing the concern and ask which existing X-rays, photographs, or health details are relevant before sharing them.',
      },
    ],
  },
  uae: {
    slug: 'uae',
    seoKey: 'dentalTourismUae',
    eyebrow: 'For UAE patients',
    heading: 'Dental care in Cairo for UAE patients',
    lead:
      'A Cairo dental visit can be planned around records review, flight timing, clinic appointments, and clear aftercare communication.',
    regionName: 'United Arab Emirates',
    airportNote: 'Confirm the likely treatment stages and clinic visit length before choosing flights or accommodation.',
    languageNote: 'Ask the clinic to confirm the communication arrangements you and accompanying family need.',
    planningNotes: [
      'Begin by asking which records may be relevant before choosing a travel window.',
      'Expect the sequence to remain preliminary until examination and diagnostics when indicated.',
      'Keep bite, TMJ, and implant cases clinically staged when needed.',
    ],
    patientQuestions: [
      {
        question: 'Can UAE patients combine dental care with a Cairo trip?',
        answer:
          'It may be possible in some cases, but treatment timing must follow examination and the clinical plan rather than a holiday schedule.',
      },
      {
        question: 'Can WhatsApp open a preliminary enquiry?',
        answer:
          'WhatsApp can open an enquiry and the clinic can explain which records may be useful. The final treatment decision needs in-person examination and clinician review.',
      },
      {
        question: 'Which dental records help most?',
        answer:
          'Ask whether an existing panoramic X-ray, CBCT, photographs, or previous treatment notes are relevant to the concern before sharing them.',
      },
    ],
  },
  kuwait: buildPriorityCountryPage('kuwait', 'dentalTourismKuwait', 'Kuwait'),
  qatar: buildPriorityCountryPage('qatar', 'dentalTourismQatar', 'Qatar'),
  oman: buildPriorityCountryPage('oman', 'dentalTourismOman', 'Oman'),
  bahrain: buildPriorityCountryPage('bahrain', 'dentalTourismBahrain', 'Bahrain'),
  europe: {
    slug: 'europe',
    seoKey: 'dentalTourismEurope',
    eyebrow: 'For Europe patients',
    heading: 'Dental tourism in Cairo for Europe patients',
    lead:
      'A records-first guide for Europe patients asking about implants, smile design, crowns, or complex dental rehabilitation in Cairo.',
    regionName: 'Europe',
    airportNote: 'Confirm the likely treatment stages and clinic visit length before choosing flights or accommodation.',
    languageNote: 'Ask the clinic to confirm the communication arrangements and translation needs before travel.',
    planningNotes: [
      'Ask which existing dental records may be useful before making travel decisions.',
      'Ask which steps are diagnostic, surgical, provisional, or final restorative.',
      'Keep follow up and maintenance possible with your local dentist when appropriate.',
    ],
    patientQuestions: [
      {
        question: 'Can European patients plan dental treatment before travelling?',
        answer:
          'A preliminary records discussion may organise questions and possible stages. Final treatment decisions still require examination, appropriate diagnostics, and clinician review.',
      },
      {
        question: 'Can HS Clinic coordinate with my local dentist?',
        answer:
          'Ask both clinicians what records and aftercare information may be appropriate for local maintenance and follow-up.',
      },
      {
        question: 'How should complex cases be planned?',
        answer:
          'Complex implant, bite, or full arch cases may require staged visits depending on examination findings, healing, and clinician review.',
      },
    ],
  },
  uk: {
    slug: 'uk',
    seoKey: 'dentalTourismUk',
    eyebrow: 'For UK patients',
    heading: 'Dental treatment in Cairo for UK patients',
    lead:
      'A practical route for UK patients considering dental implants, full arch rehabilitation, veneers, crowns, or bite related care in Cairo.',
    regionName: 'United Kingdom',
    airportNote: 'Confirm the likely treatment stages and clinic visit length before choosing flights or accommodation.',
    languageNote: 'Ask the clinic to confirm the communication arrangements you need before sending health information.',
    planningNotes: [
      'Ask which existing UK dental records may be useful before planning flights.',
      'Ask what can be completed in one visit and what may need a second visit.',
      'Use written aftercare notes for your local maintenance dentist when needed.',
    ],
    patientQuestions: [
      {
        question: 'Can UK patients get a full plan before booking flights?',
        answer:
          'Ask whether the available records support a preliminary discussion of possible stages. A final treatment plan requires examination and appropriate diagnostics in Cairo.',
      },
      {
        question: 'Can I continue maintenance in the UK?',
        answer:
          'Local maintenance may be appropriate depending on the treatment. Ask the treating clinicians to agree the records and follow up needed.',
      },
      {
        question: 'Is this suitable for emergency dental pain?',
        answer:
          'No. Severe pain, swelling, bleeding, or trauma should be handled urgently near you before travel is considered.',
      },
    ],
  },
  germany: {
    slug: 'germany',
    seoKey: 'dentalTourismGermany',
    eyebrow: 'For Germany patients',
    heading: 'Dental treatment in Cairo for Germany patients',
    lead:
      'A records first pathway for patients from Germany considering dental implants, crowns, veneers, full arch care, or digital bite assessment in Cairo.',
    regionName: 'Germany',
    airportNote: 'Confirm the likely treatment stages and clinic visit length before choosing flights or accommodation.',
    languageNote: 'Ask the clinic to confirm the communication arrangements and translation needs before travel.',
    planningNotes: [
      'Ask which X-rays, treatment notes, or implant and crown records from Germany may be relevant.',
      'Ask for a staged plan if surgery, healing, and final prosthetics are involved.',
      'Keep local dentist follow up in mind for hygiene and long term maintenance.',
    ],
    patientQuestions: [
      {
        question: 'Can German patients send records before visiting Cairo?',
        answer:
          'One possible first step is to ask which existing records may be useful. A final plan requires clinical examination, appropriate diagnostics, and clinician review.',
      },
      {
        question: 'Can implant brands and materials be discussed before travel?',
        answer:
          'These are reasonable questions to raise. Exact implant systems, materials, provisional stages, and maintenance needs remain case-specific and require clinician review.',
      },
      {
        question: 'Can Germany patients plan a short trip?',
        answer:
          'Visit length is case-specific. Surgical and full arch cases may require staged visits based on examination findings, healing, and clinician review.',
      },
    ],
  },
};

const GULF_COUNTRY_SLUGS = ['saudi-arabia', 'uae', 'kuwait', 'qatar', 'oman', 'bahrain'];
const EUROPE_COUNTRY_SLUGS = ['uk', 'germany'];

function buildRegionalHubLinks(currentSlug: string) {
  const isGulf = currentSlug === 'gulf' || GULF_COUNTRY_SLUGS.includes(currentSlug);
  const hubSlug = isGulf ? 'gulf' : 'europe';
  const countrySlugs = isGulf ? GULF_COUNTRY_SLUGS : EUROPE_COUNTRY_SLUGS;
  const visibleSlugs =
    currentSlug === hubSlug
      ? countrySlugs
      : [hubSlug, ...countrySlugs.filter((slug) => slug !== currentSlug)];

  return visibleSlugs.map((slug) => {
    const page = REGIONAL_PAGES[slug];
    const isHub = slug === hubSlug;
    return {
      slug: page.slug,
      path: `/dental-tourism/${page.slug}`,
      label: isHub
        ? isGulf
          ? 'Gulf patient guide'
          : 'Europe patient guide'
        : `Travelling from ${page.regionName}`,
    };
  });
}

function buildRegionalJsonLd(page: RegionalPage) {
  const seo = SEO[page.seoKey];

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: seo.title,
    description: seo.description,
    url: seo.canonical,
    inLanguage: 'en',
    provider: {
      '@type': 'Dentist',
      name: 'HS Clinic',
      url: SITE_URL,
      telephone: '+201101010599',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '8/63, 10th District, Zahraa El Maadi',
        addressLocality: 'Cairo',
        addressCountry: 'EG',
      },
    },
  };
}

export default function RegionalTourismPage() {
  const { regionSlug } = useParams();
  const resolvedPage = regionSlug ? REGIONAL_PAGES[regionSlug] : undefined;
  const page = resolvedPage ?? REGIONAL_PAGES.gulf;

  const seo = SEO[page.seoKey];
  const breadcrumbJsonLd = useMemo(
    () =>
      buildBreadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Dental Tourism', path: '/dental-tourism' },
        { name: page.regionName, path: `/dental-tourism/${page.slug}` },
      ]),
    [page]
  );
  const faqJsonLd = useMemo(() => buildFaqJsonLd(page.patientQuestions), [page]);
  const regionalJsonLd = useMemo(() => buildRegionalJsonLd(page), [page]);
  const educationGuide = TOURISM_EDUCATION_LINKS.find((link) =>
    link.path.startsWith(`/dental-tourism/${page.slug}/`)
  );
  const regionalHubLinks = buildRegionalHubLinks(page.slug);
  const regionalHubHeading =
    page.slug === 'gulf'
      ? 'Choose your Gulf departure point'
      : page.slug === 'europe'
        ? 'Choose your Europe departure point'
        : page.slug === 'uk' || page.slug === 'germany'
          ? 'More Europe departure points'
          : 'More Gulf departure points';

  if (!resolvedPage) {
    return <Navigate to="/dental-tourism" replace />;
  }

  return (
    <div className="bg-dark-950 min-h-screen overflow-hidden text-white">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={seo.canonical} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={seo.canonical} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:alt" content="Dr. Haitham Sharshar dental clinic in Cairo" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content="en_EG" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <meta name="geo.region" content="EG-C" />
        <meta name="geo.placename" content={`Cairo dental clinic for ${page.regionName}`} />
        {buildDentalTourismHreflangTags(seo.canonical).map((tag) => (
          <link key={tag.hrefLang} rel={tag.rel} hrefLang={tag.hrefLang} href={tag.href} />
        ))}
        <script type="application/ld+json">{JSON.stringify(regionalJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <section className="relative px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(197,165,90,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(197,165,90,0.05)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        <div className="from-gold-400/15 absolute inset-x-0 top-0 h-72 bg-gradient-to-b to-transparent" />

        <div className="relative mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-10 text-sm text-gray-400">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/dental-tourism" className="hover:text-white">Dental Tourism</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-gold-300">{page.regionName}</li>
            </ol>
          </nav>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="border-gold-400/30 bg-gold-400/10 text-gold-300 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm">
              <Globe2 className="h-4 w-4" />
              {page.eyebrow}
            </div>
            <h1 className="max-w-4xl font-serif text-4xl leading-tight font-bold text-white md:text-6xl">
              {page.heading}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">{page.lead}</p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-400">
              Medical note: this page is informational. Dental treatment is confirmed only after
              clinician review, examination, and suitable diagnostic records.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/send-your-records"
                className="bg-gold-400 text-dark-950 inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition hover:bg-white"
              >
                Send your records
                <MessageCircle className="h-5 w-5" />
              </Link>
              <Link
                to="/dental-tourism/program"
                className="border-gold-400/30 text-gold-300 inline-flex items-center gap-2 rounded-lg border px-6 py-3 font-semibold transition hover:bg-white/10"
              >
                View travel program
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <aside className="border-gold-400/20 bg-dark-900/80 rounded-2xl border p-6 shadow-2xl shadow-black/30">
            <h2 className="font-serif text-2xl text-white">Before you choose travel dates</h2>
            <div className="mt-6 space-y-4">
              {page.planningNotes.map((note) => (
                <div key={note} className="flex gap-3">
                  <CheckCircle2 className="text-gold-400 mt-1 h-5 w-5 flex-none" />
                  <p className="text-sm leading-6 text-gray-300">{note}</p>
                </div>
              ))}
            </div>
          </aside>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/20 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-white/[0.04] p-5">
            <Plane className="text-gold-400 mb-4 h-6 w-6" />
            <h2 className="font-semibold text-white">Travel fit</h2>
            <p className="mt-2 text-sm leading-6 text-gray-400">{page.airportNote}</p>
          </div>
          <div className="rounded-xl bg-white/[0.04] p-5">
            <Languages className="text-gold-400 mb-4 h-6 w-6" />
            <h2 className="font-semibold text-white">Communication</h2>
            <p className="mt-2 text-sm leading-6 text-gray-400">{page.languageNote}</p>
          </div>
          <div className="rounded-xl bg-white/[0.04] p-5">
            <ShieldCheck className="text-gold-400 mb-4 h-6 w-6" />
            <h2 className="font-semibold text-white">Clinical safety</h2>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              Online review is a screening step. Treatment decisions need clinician review in Cairo.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-gold-400 font-mono text-sm tracking-[0.25em] uppercase">
              Patient questions
            </p>
            <h2 className="mt-3 font-serif text-3xl text-white md:text-5xl">
              Answers patients ask before flying
            </h2>
            <p className="mt-5 text-base leading-7 text-gray-400">
              These answers are written for planning. They are not a diagnosis or a treatment
              decision.
            </p>
          </div>
          <div className="space-y-4">
            {page.patientQuestions.map((item) => (
              <article key={item.question} className="rounded-xl bg-white/[0.04] p-6">
                <h3 className="text-lg font-semibold text-white">{item.question}</h3>
                <p className="mt-3 leading-7 text-gray-400">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-dark-900/60 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="text-gold-400 font-mono text-sm tracking-[0.25em] uppercase">
                Records first
              </p>
              <h2 className="mt-3 font-serif text-3xl text-white md:text-5xl">
                What to ask about before travel
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ['Dental records', 'Ask which existing X-rays, CBCT files, or dental notes may be relevant.'],
                ['Smile and bite photos', 'Ask whether photographs are useful and which views are needed.'],
                ['Health history', 'Ask which medical, medication, allergy, or smoking details are relevant.'],
                ['Timing questions', 'Ask about possible stages before making travel commitments.'],
              ].map(([title, text]) => (
                <div key={title} className="rounded-xl bg-black/20 p-5">
                  <FileText className="text-gold-400 mb-4 h-5 w-5" />
                  <h3 className="font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-400">{text}</p>
                </div>
              ))}
            </div>
          </div>
          {educationGuide && (
            <Link
              to={educationGuide.path}
              className="border-gold-400/30 bg-gold-400/10 mt-8 block rounded-xl border p-6 transition hover:bg-gold-400/15"
            >
              <span className="text-gold-300 text-sm font-semibold">Education guide</span>
              <span className="mt-2 block font-serif text-2xl text-white">
                {educationGuide.label}
              </span>
              <span className="mt-2 block text-sm leading-6 text-gray-400">
                Read the records, timing, safety, and follow up questions before choosing travel
                dates.
              </span>
            </Link>
          )}
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-gold-400 font-mono text-sm tracking-[0.25em] uppercase">
                Regional guides
              </p>
              <h2 className="mt-3 font-serif text-3xl text-white md:text-5xl">
                {regionalHubHeading}
              </h2>
            </div>
            <Link
              to="/send-your-records"
              className="text-gold-300 inline-flex items-center gap-2 font-semibold hover:text-white"
            >
              Start with records questions
              <CalendarDays className="h-5 w-5" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {regionalHubLinks.map((link) => (
              <Link
                key={link.slug}
                to={link.path}
                className={`rounded-xl border p-5 transition ${
                  link.slug === page.slug
                    ? 'border-gold-400 bg-gold-400/10 text-gold-300'
                    : 'border-white/10 bg-white/[0.03] text-white hover:border-gold-400/40 hover:bg-white/[0.06]'
                }`}
              >
                <MapPin className="mb-4 h-5 w-5" />
                <span className="font-semibold">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
