import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
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
import { trackWhatsAppClick } from '@/lib/analytics';

type RegionalPage = {
  slug: string;
  seoKey:
    | 'dentalTourismGulf'
    | 'dentalTourismSaudi'
    | 'dentalTourismUae'
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
  travelFit: string[];
};

const REGIONAL_PAGES: Record<string, RegionalPage> = {
  gulf: {
    slug: 'gulf',
    seoKey: 'dentalTourismGulf',
    eyebrow: 'For Gulf patients',
    heading: 'Dental care in Cairo for Gulf patients',
    lead:
      'Plan implant, smile, crown, or bite related dental care in Cairo with a clinic team that can review records before you travel.',
    regionName: 'Gulf countries',
    airportNote: 'Short regional flights to Cairo and airport pickup planning after your visit dates are agreed.',
    languageNote: 'Arabic and English coordination for records, appointments, and aftercare messages.',
    planningNotes: [
      'Send photos, X-rays, or CBCT files before booking travel.',
      'Receive a clinician reviewed treatment sequence before committing to dates.',
      'Keep complex implant or full arch cases open to staged visits when healing is needed.',
    ],
    patientQuestions: [
      {
        question: 'Can Gulf patients start before flying to Cairo?',
        answer:
          'Yes. The safe first step is a remote records review. A final plan still needs clinical examination and diagnostic records at the clinic.',
      },
      {
        question: 'Which treatments are commonly planned for Gulf patients?',
        answer:
          'Patients usually ask about dental implants, smile design, crowns, veneers, full arch rehabilitation, and bite or TMJ screening suggestions.',
      },
      {
        question: 'Is the treatment plan confirmed online?',
        answer:
          'No. Online review helps estimate the pathway, but final decisions are made only after clinician review in Cairo.',
      },
    ],
    travelFit: ['Saudi Arabia', 'UAE', 'Kuwait', 'Qatar', 'Bahrain', 'Oman'],
  },
  'saudi-arabia': {
    slug: 'saudi-arabia',
    seoKey: 'dentalTourismSaudi',
    eyebrow: 'For Saudi patients',
    heading: 'Dental treatment in Cairo for Saudi patients',
    lead:
      'A clear pathway for patients travelling from Saudi Arabia for dental implants, cosmetic dentistry, crowns, and full mouth planning.',
    regionName: 'Saudi Arabia',
    airportNote: 'Cairo travel planning can be aligned around Jeddah, Riyadh, Dammam, or Medina flight timing.',
    languageNote: 'Arabic first communication is available for records, appointment timing, and follow up.',
    planningNotes: [
      'Share your panoramic X-ray, CBCT if available, and current dental concerns.',
      'Ask for visit length guidance before choosing flight dates.',
      'Plan implant and full arch cases with healing time, not only holiday length.',
    ],
    patientQuestions: [
      {
        question: 'Can I travel from Saudi Arabia for a short dental visit?',
        answer:
          'Some cosmetic and diagnostic visits can be short. Implant and full arch cases may need staged treatment and clinician review.',
      },
      {
        question: 'Can my family coordinate the appointment in Arabic?',
        answer:
          'Yes. Arabic communication can be used for record collection, scheduling, and aftercare coordination.',
      },
      {
        question: 'What should Saudi patients send first?',
        answer:
          'Start with X-rays, smile photos, bite photos, medical history, and a list of current dental symptoms or goals.',
      },
    ],
    travelFit: ['Riyadh', 'Jeddah', 'Dammam', 'Medina', 'Makkah', 'Khobar'],
  },
  uae: {
    slug: 'uae',
    seoKey: 'dentalTourismUae',
    eyebrow: 'For UAE patients',
    heading: 'Dental care in Cairo for UAE patients',
    lead:
      'A Cairo dental visit can be planned around records review, flight timing, clinic appointments, and clear aftercare communication.',
    regionName: 'United Arab Emirates',
    airportNote: 'Treatment dates can be planned around Dubai, Abu Dhabi, Sharjah, or nearby airport schedules.',
    languageNote: 'English and Arabic support for international patients and accompanying family members.',
    planningNotes: [
      'Begin with a virtual records review before choosing the final travel window.',
      'Use the first clinic visit for examination, scans, and confirmation of the sequence.',
      'Keep bite, TMJ, and implant cases clinically staged when needed.',
    ],
    patientQuestions: [
      {
        question: 'Can UAE patients combine dental care with a Cairo trip?',
        answer:
          'Yes, if the dental plan and visit length are reviewed first. Treatment timing should follow the clinical plan, not the holiday schedule alone.',
      },
      {
        question: 'Is WhatsApp enough to start?',
        answer:
          'WhatsApp is enough to send initial records and questions. The final treatment decision needs in-person examination.',
      },
      {
        question: 'Which dental records help most?',
        answer:
          'A recent panoramic X-ray, CBCT if available, bite photos, smile photos, and previous treatment notes help the review.',
      },
    ],
    travelFit: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Al Ain'],
  },
  europe: {
    slug: 'europe',
    seoKey: 'dentalTourismEurope',
    eyebrow: 'For Europe patients',
    heading: 'Dental tourism in Cairo for Europe patients',
    lead:
      'Plan dental implants, smile design, crowns, or complex dental rehabilitation in Cairo with records review before travel.',
    regionName: 'Europe',
    airportNote: 'Cairo visit windows can be planned around European flight schedules and required treatment stages.',
    languageNote: 'English support, with German and French communication support available by coordination.',
    planningNotes: [
      'Send dental records first so the visit is not planned blindly.',
      'Ask which steps are diagnostic, surgical, provisional, or final restorative.',
      'Keep follow up and maintenance possible with your local dentist when appropriate.',
    ],
    patientQuestions: [
      {
        question: 'Can European patients plan dental treatment before travelling?',
        answer:
          'Yes. Remote record review helps define the likely pathway. Final treatment still needs clinician review and in-clinic diagnostics.',
      },
      {
        question: 'Can HS Clinic coordinate with my local dentist?',
        answer:
          'When useful, the clinic can provide dental records and aftercare information for local maintenance and follow up.',
      },
      {
        question: 'How should complex cases be planned?',
        answer:
          'Complex implant, bite, or full arch cases should be staged around healing, provisional teeth, and final restoration timing.',
      },
    ],
    travelFit: ['United Kingdom', 'Germany', 'France', 'Italy', 'Netherlands', 'Switzerland'],
  },
  uk: {
    slug: 'uk',
    seoKey: 'dentalTourismUk',
    eyebrow: 'For UK patients',
    heading: 'Dental treatment in Cairo for UK patients',
    lead:
      'A practical route for UK patients considering dental implants, full arch rehabilitation, veneers, crowns, or bite related care in Cairo.',
    regionName: 'United Kingdom',
    airportNote: 'Visit planning can align around London, Manchester, Birmingham, or other UK to Cairo travel windows.',
    languageNote: 'English communication for planning, consent questions, records, and follow up messages.',
    planningNotes: [
      'Share existing UK dental records before planning flights.',
      'Ask what can be completed in one visit and what may need a second visit.',
      'Use written aftercare notes for your local maintenance dentist when needed.',
    ],
    patientQuestions: [
      {
        question: 'Can UK patients get a full plan before booking flights?',
        answer:
          'You can receive a preliminary pathway after record review. The final treatment plan is confirmed after examination and diagnostics in Cairo.',
      },
      {
        question: 'Can I continue maintenance in the UK?',
        answer:
          'Yes, many patients maintain routine hygiene and checkups locally after Cairo treatment, depending on the treatment type.',
      },
      {
        question: 'Is this suitable for emergency dental pain?',
        answer:
          'No. Severe pain, swelling, bleeding, or trauma should be handled urgently near you before travel is considered.',
      },
    ],
    travelFit: ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow', 'Edinburgh'],
  },
  germany: {
    slug: 'germany',
    seoKey: 'dentalTourismGermany',
    eyebrow: 'For Germany patients',
    heading: 'Dental treatment in Cairo for Germany patients',
    lead:
      'A records first pathway for patients from Germany considering dental implants, crowns, veneers, full arch care, or digital bite assessment in Cairo.',
    regionName: 'Germany',
    airportNote: 'Cairo appointment windows can be planned around Frankfurt, Berlin, Munich, Hamburg, or Dusseldorf flights.',
    languageNote: 'English communication, with German language support coordinated when available for patient planning.',
    planningNotes: [
      'Send X-rays, treatment notes, and any implant or crown records from Germany.',
      'Ask for a staged plan if surgery, healing, and final prosthetics are involved.',
      'Keep local dentist follow up in mind for hygiene and long term maintenance.',
    ],
    patientQuestions: [
      {
        question: 'Can German patients send records before visiting Cairo?',
        answer:
          'Yes. Records review is the recommended first step. The final plan is confirmed only after clinical examination and diagnostics.',
      },
      {
        question: 'Can implant brands and materials be discussed before travel?',
        answer:
          'Yes. You can ask about planned implant systems, restorative materials, provisional teeth, and maintenance needs during the review stage.',
      },
      {
        question: 'Can Germany patients plan a short trip?',
        answer:
          'Some visits can be short, but surgical and full arch cases may require staged visits based on healing and clinician review.',
      },
    ],
    travelFit: ['Berlin', 'Frankfurt', 'Munich', 'Hamburg', 'Dusseldorf', 'Cologne'],
  },
};

const regionalLinks = Object.values(REGIONAL_PAGES).map((page) => ({
  slug: page.slug,
  label: page.regionName,
  path: `/dental-tourism/${page.slug}`,
}));

function buildRegionalJsonLd(page: RegionalPage) {
  const seo = SEO[page.seoKey];

  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: seo.title,
    description: seo.description,
    url: seo.canonical,
    inLanguage: 'en',
    about: {
      '@type': 'MedicalProcedure',
      name: `Dental tourism planning for patients from ${page.regionName}`,
      procedureType: 'Dental treatment planning',
    },
    reviewedBy: {
      '@type': 'Dentist',
      name: 'Dr. Haitham Sharshar',
      url: SITE_URL,
    },
    provider: {
      '@type': 'Dentist',
      name: 'HS Clinic - Dr. Haitham Sharshar',
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

  if (!resolvedPage) {
    return <Navigate to="/dental-tourism" replace />;
  }

  return (
    <main className="bg-dark-950 min-h-screen overflow-hidden text-white">
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
        <meta
          name="keywords"
          content={`dental treatment Cairo ${page.regionName}, dental implants Cairo ${page.regionName}, dental tourism Egypt ${page.regionName}`}
        />
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

        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
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
              <a
                href="https://api.whatsapp.com/send/?phone=201101010599"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(`regional_${page.slug}_hero`)}
                className="bg-gold-400 text-dark-950 inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition hover:bg-white"
              >
                Start with WhatsApp
                <MessageCircle className="h-5 w-5" />
              </a>
              <Link
                to="/dental-tourism/program"
                className="border-gold-400/30 text-gold-300 inline-flex items-center gap-2 rounded-lg border px-6 py-3 font-semibold transition hover:bg-white/10"
              >
                View travel program
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="border-gold-400/20 bg-dark-900/80 rounded-2xl border p-6 shadow-2xl shadow-black/30"
          >
            <h2 className="font-serif text-2xl text-white">Before you choose travel dates</h2>
            <div className="mt-6 space-y-4">
              {page.planningNotes.map((note) => (
                <div key={note} className="flex gap-3">
                  <CheckCircle2 className="text-gold-400 mt-1 h-5 w-5 flex-none" />
                  <p className="text-sm leading-6 text-gray-300">{note}</p>
                </div>
              ))}
            </div>
          </motion.aside>
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
                What to send before travel
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ['Dental records', 'X-rays, CBCT files if available, and recent dental notes.'],
                ['Smile and bite photos', 'Front, side, open bite, and close bite photos.'],
                ['Health history', 'Medical conditions, medication list, allergies, and smoking status.'],
                ['Timing goals', 'Preferred travel dates and how long you can stay in Cairo.'],
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
                More patient travel pages
              </h2>
            </div>
            <Link
              to="/contact"
              className="text-gold-300 inline-flex items-center gap-2 font-semibold hover:text-white"
            >
              Ask for case review
              <CalendarDays className="h-5 w-5" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {regionalLinks.map((link) => (
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
    </main>
  );
}
