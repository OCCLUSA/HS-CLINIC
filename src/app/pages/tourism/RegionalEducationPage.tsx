import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  ArrowRight,
  ClipboardList,
  FileText,
  HeartPulse,
  MessageCircle,
  Plane,
  ShieldCheck,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
  DEFAULT_OG_IMAGE,
  SEO,
  SITE_NAME,
  SITE_URL,
  buildBreadcrumbJsonLd,
  buildDentalTourismHreflangTags,
  buildFaqJsonLd,
} from '@/lib/seo';
import { trackWhatsAppClick } from '@/lib/analytics';
import {
  StyleReferenceShowcase,
  type StyleReferenceImageId,
} from '@/app/components/StyleReferenceShowcase';

type EducationPage = {
  slug: 'gulf' | 'europe';
  seoKey: 'dentalTourismGulfGuide' | 'dentalTourismEuropeGuide';
  parentPath: string;
  audience: string;
  heading: string;
  lead: string;
  visualHeading: string;
  visualIntro: string;
  visualImageIds: StyleReferenceImageId[];
  sections: Array<{ title: string; text: string; icon: LucideIcon }>;
  workflowSteps: Array<{ title: string; text: string }>;
  recordsChecklist: string[];
  questions: Array<{ question: string; answer: string }>;
};

const EDUCATION_PAGES: Record<string, EducationPage> = {
  gulf: {
    slug: 'gulf',
    seoKey: 'dentalTourismGulfGuide',
    parentPath: '/dental-tourism/gulf',
    audience: 'Gulf patients',
    heading: 'Dental implant travel guide for Gulf patients',
    lead: 'A simple planning guide for Gulf patients considering dental implants, stackable guided surgery, smile design, digital occlusion, or full arch care in Cairo. It explains what can be reviewed before travel, what digital records are useful, and what must wait for the clinic visit.',
    visualHeading: 'What Gulf patients can understand before travel',
    visualIntro:
      'These images support the conversation around implant surfaces, smile planning, and consented before-and-after storytelling. They do not replace examination or a final treatment plan.',
    visualImageIds: ['implantSurface', 'laminateVeneerAnnotation', 'premiumSmileFocus'],
    sections: [
      {
        title: 'Start with records',
        text: 'Send a panoramic X-ray, CBCT if available, smile photos, bite photos, medical history, and previous implant or crown records. These help the clinic prepare a screening suggestion before travel.',
        icon: FileText,
      },
      {
        title: 'Plan visits around healing',
        text: 'Implant care may need a diagnostic visit, surgical visit, healing period, provisional teeth, and final restoration. The exact sequence depends on bone, bite forces, and clinician review.',
        icon: ClipboardList,
      },
      {
        title: 'Plan the smile first',
        text: 'For front teeth, full arch, or smile design cases, the final tooth position is planned before the implant position. This helps the team review lip line, tooth length, smile curve, crown emergence, and screw access before surgery.',
        icon: HeartPulse,
      },
      {
        title: 'Use stackable guides',
        text: 'Some full arch cases can use a stackable digital guide sequence. A bone reduction guide, implant drilling guide, and temporary tooth guide may be designed to sit in a planned order when the case anatomy supports it.',
        icon: ClipboardList,
      },
      {
        title: 'Reduce avoidable risk',
        text: 'Digital preplanning helps review bone volume, nerve and sinus position, prosthetic space, implant direction, and temporary tooth clearance. It reduces avoidable surprises, but it cannot remove all surgical risk.',
        icon: ShieldCheck,
      },
      {
        title: 'Review digital occlusion',
        text: 'Digital occlusion planning can combine bite records with jaw tracking records that show how the lower jaw moves during opening, closing, chewing paths, and border movements. These records can support implant bite planning, especially in full arch and bite reconstruction cases.',
        icon: HeartPulse,
      },
      {
        title: 'Screen muscle activity',
        text: 'Surface EMG can record masseter and temporalis muscle activity as screening information. It may help identify overactivity, asymmetry, or clenching patterns that should be reviewed before implant loading or splint planning.',
        icon: HeartPulse,
      },
      {
        title: 'Keep emergency care local',
        text: 'Severe pain, swelling, bleeding, trauma, or fever should be managed urgently near you before travel is considered.',
        icon: ShieldCheck,
      },
      {
        title: 'Use Arabic or English',
        text: 'The team can collect records and explain appointment timing in Arabic or English so family members can follow the plan clearly.',
        icon: MessageCircle,
      },
    ],
    workflowSteps: [
      {
        title: 'Records review before flights',
        text: 'Photos, X-rays, CBCT files, bite photos, medical history, and travel limits are reviewed before you choose appointment dates.',
      },
      {
        title: 'Smile design and prosthetic setup',
        text: 'The planned tooth position is reviewed first so implant placement supports the final smile, speech, cleaning access, and bite.',
      },
      {
        title: 'CBCT and digital guide planning',
        text: 'CBCT, scans, and prosthetic setup are combined to review implant depth, angle, guide support, prosthetic space, and anatomical safety zones.',
      },
      {
        title: 'Digital occlusion and muscle screening',
        text: 'Jaw tracking, bite records, and EMG screening can be added when the case shows bruxism, muscle pain, uneven bite, or full arch reconstruction needs.',
      },
      {
        title: 'Clinician review in Cairo',
        text: 'The final surgical and restorative decision is confirmed only after examination, updated records, and clinician review at HS Clinic.',
      },
    ],
    recordsChecklist: [
      'Panoramic X-ray and CBCT if available',
      'Smile photos, side photos, and bite photos',
      'Short video of smile and speech if front teeth are involved',
      'Medical history, medication list, allergies, and smoking status',
      'History of clenching, jaw pain, headaches, or broken crowns',
      'Previous implant brand, crown material, or denture records',
      'Travel dates, maximum stay length, and family coordination needs',
    ],
    questions: [
      {
        question: 'Can Gulf patients confirm implant treatment online?',
        answer:
          'No. Online records can support a preliminary pathway, but implant decisions require examination, diagnostic records, and clinician review in Cairo.',
      },
      {
        question: 'What should I ask before choosing flights?',
        answer:
          'Ask which steps are diagnostic, surgical, healing related, provisional, and final restorative. Also ask whether your case may need more than one visit.',
      },
      {
        question: 'Can full arch cases be finished in one short trip?',
        answer:
          'Some cases may receive temporary teeth during a visit, but timing depends on bone, implant stability, bite, healing needs, and clinician assessment.',
      },
      {
        question: 'Why are stackable guides useful in full arch implant care?',
        answer:
          'They help transfer several planned steps to the mouth in sequence, such as reduction, implant drilling, and temporary tooth positioning. The guide design still needs stable support, accurate records, and clinician control during surgery.',
      },
      {
        question: 'Can jaw tracking and EMG fix muscle problems before implants?',
        answer:
          'They do not fix or confirm muscle problems alone. They are screening records that can help the clinician review muscle activity, jaw movement, bite timing, and whether splint or bite planning should be considered with implant treatment.',
      },
      {
        question: 'Does digital planning prevent complications?',
        answer:
          'Digital planning can reduce avoidable risk by showing anatomy, prosthetic space, and bite factors before surgery. It cannot remove all risk because healing, bone quality, medical history, hygiene, and surgery findings still matter.',
      },
    ],
  },
  europe: {
    slug: 'europe',
    seoKey: 'dentalTourismEuropeGuide',
    parentPath: '/dental-tourism/europe',
    audience: 'Europe patients',
    heading: 'Dental implant travel guide for Europe patients',
    lead: 'A practical guide for patients from Europe comparing dental implant care, guided surgery, smile design, and full arch treatment in Cairo. It focuses on digital records, staged visits, occlusion review, local dentist follow up, and safety limits.',
    visualHeading: 'What Europe patients can review before choosing Cairo',
    visualIntro:
      'These visuals explain why implant and cosmetic planning should include dental photography, enamel texture, shade matching, and clinician-reviewed functional records.',
    visualImageIds: ['polarizedEnamel', 'naturalToothEducation', 'naturalEnamelTexture'],
    sections: [
      {
        title: 'Ask for a staged plan',
        text: 'Complex implant and full arch cases should separate case review, surgery, healing, provisional teeth, and final restorations so travel dates match clinical needs.',
        icon: ClipboardList,
      },
      {
        title: 'Prepare local records',
        text: 'Send X-rays, CBCT files if available, medical history, medication list, current dentist notes, and any implant brand or crown material information.',
        icon: FileText,
      },
      {
        title: 'Link implants to smile design',
        text: 'Digital Smile Design helps the team review the desired tooth position, gum display, smile curve, and facial balance before implant positions are finalized.',
        icon: HeartPulse,
      },
      {
        title: 'Use guided surgery when suitable',
        text: 'CBCT and digital scans can be merged to design a surgical guide. In selected full arch cases, stackable guides can organize bone correction, implant drilling, and temporary teeth into planned steps.',
        icon: ClipboardList,
      },
      {
        title: 'Review prosthetic space',
        text: 'Before surgery, the clinician reviews whether there is enough space for implants, abutments, temporary teeth, final zirconia or ceramic work, cleaning access, and bite adjustment.',
        icon: ShieldCheck,
      },
      {
        title: 'Add digital occlusion records',
        text: 'Jaw tracking and bite records can help review mandibular movement, chewing path, bite timing, and functional contacts before a large implant restoration is loaded.',
        icon: HeartPulse,
      },
      {
        title: 'Screen muscle overload',
        text: 'Surface EMG can support review of masseter and temporalis muscle activity. It is useful when there is clenching, jaw fatigue, fractured restorations, or suspected overload around planned implant prosthetics.',
        icon: HeartPulse,
      },
      {
        title: 'Plan follow up at home',
        text: 'For long term maintenance, ask what records can be shared with your local dentist after Cairo treatment and which signs need urgent review.',
        icon: HeartPulse,
      },
      {
        title: 'Travel after clinical review',
        text: 'Flights should be booked after the clinic explains likely visit length, possible healing windows, and whether your case needs more than one trip.',
        icon: Plane,
      },
    ],
    workflowSteps: [
      {
        title: 'Remote record review',
        text: 'Existing European dental records, CBCT files, photos, medication history, and treatment goals are reviewed before travel is discussed.',
      },
      {
        title: 'Aesthetic and prosthetic planning',
        text: 'The desired smile and final tooth position guide implant location, angulation, screw access, material choice, and cleaning access.',
      },
      {
        title: 'Guide and stackable guide design',
        text: 'When records are accurate and anatomy is suitable, static or stackable guides can be designed to help transfer the digital plan to surgery.',
      },
      {
        title: 'Jaw tracking and EMG review',
        text: 'Functional records can be added for patients with bite instability, bruxism, TMD symptoms, or full arch implant loading concerns.',
      },
      {
        title: 'Local maintenance plan',
        text: 'After treatment, written records can help your dentist in Europe support hygiene, maintenance, emergency review, and long term monitoring.',
      },
    ],
    recordsChecklist: [
      'Recent X-rays, CBCT, intraoral scans, or dentist notes',
      'Medical history, medications, allergies, and smoking status',
      'Photos of smile, profile, bite, missing teeth, and old restorations',
      'Information about existing implants, crowns, bridges, or dentures',
      'Symptoms such as jaw pain, muscle fatigue, clicking, headaches, or clenching',
      'Timeline limits for one visit versus staged visits',
      'Local dentist contact details if shared maintenance is planned',
    ],
    questions: [
      {
        question: 'Can Europe patients receive a final treatment plan before travel?',
        answer:
          'No. A remote records review can outline a likely route. Final treatment decisions require clinical examination and suitable diagnostics in Cairo.',
      },
      {
        question: 'Can HS Clinic coordinate with my dentist in Europe?',
        answer:
          'When useful, the clinic can provide records and aftercare information for routine maintenance and follow up with your local dentist.',
      },
      {
        question: 'What makes a case unsuitable for travel planning first?',
        answer:
          'Active swelling, uncontrolled pain, bleeding, trauma, fever, or urgent infection signs should be handled locally before dental travel is considered.',
      },
      {
        question: 'How does smile design change implant planning?',
        answer:
          'It starts from the planned final teeth rather than only from the available bone. This helps the clinician review tooth position, esthetics, bite, screw access, and hygiene before implant surgery.',
      },
      {
        question: 'Are stackable guides always used?',
        answer:
          'No. They are used only when the case design, anatomy, guide support, opening, records, and surgical access make them suitable. Some cases need a different guide design or a staged approach.',
      },
      {
        question: 'Why review jaw movement and EMG before implant loading?',
        answer:
          'Implants do not have the same ligament feedback as natural teeth. Bite force, muscle activity, and jaw movement patterns can affect how a full arch or large implant bridge is designed and adjusted.',
      },
    ],
  },
};

function buildEducationJsonLd(page: EducationPage) {
  const seo = SEO[page.seoKey];

  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: seo.title,
    description: seo.description,
    url: seo.canonical,
    inLanguage: 'en',
    audience: {
      '@type': 'Audience',
      audienceType: page.audience,
    },
    reviewedBy: {
      '@type': 'Dentist',
      name: 'Dr. Haitham Sharshar',
      url: SITE_URL + '/about',
    },
    about: {
      '@type': 'MedicalProcedure',
      name: 'Dental implant travel planning',
      procedureType: 'Screening suggestion and clinician review',
    },
  };
}

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
  const educationJsonLd = useMemo(() => (page ? buildEducationJsonLd(page) : null), [page]);

  if (!page) {
    return <Navigate to="/dental-tourism" replace />;
  }

  const seo = SEO[page.seoKey];

  return (
    <main className="bg-dark-950 min-h-screen text-white">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={seo.canonical} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={seo.canonical} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:alt" content="HS Clinic Cairo dental travel planning" />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content="en_EG" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <meta name="geo.region" content="EG-C" />
        <meta name="geo.placename" content={`Cairo dental clinic for ${page.audience}`} />
        {buildDentalTourismHreflangTags(seo.canonical).map((tag) => (
          <link key={tag.hrefLang} rel={tag.rel} hrefLang={tag.hrefLang} href={tag.href} />
        ))}
        <script type="application/ld+json">{JSON.stringify(educationJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <section className="relative px-4 pt-28 pb-16 sm:px-6 lg:px-8">
        <div className="from-gold-400/10 absolute inset-x-0 top-0 h-72 bg-gradient-to-b to-transparent" />
        <div className="relative mx-auto max-w-5xl">
          <p className="text-gold-400 mb-4 font-mono text-sm tracking-[0.25em] uppercase">
            Educational guide
          </p>
          <h1 className="font-serif text-4xl leading-tight font-bold md:text-6xl">
            {page.heading}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">{page.lead}</p>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-500">
            Medical note: this is educational content only. It is not a clinical decision or final
            treatment plan.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://api.whatsapp.com/send/?phone=201101010599"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick(`${page.slug}_education_hero`)}
              className="bg-gold-400 text-dark-950 inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition hover:bg-white"
            >
              Ask about case review
              <MessageCircle className="h-5 w-5" />
            </a>
            <Link
              to={page.parentPath}
              className="border-gold-400/30 text-gold-300 inline-flex items-center gap-2 rounded-lg border px-6 py-3 font-semibold transition hover:bg-white/10"
            >
              Back to {page.audience}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <StyleReferenceShowcase
        eyebrow={`${page.audience} planning visuals`}
        title={page.visualHeading}
        intro={page.visualIntro}
        imageIds={page.visualImageIds}
        links={[
          { label: 'Dental implants in Cairo', to: '/services/dental-implants' },
          { label: 'Digital Smile Design', to: '/digital-smile-design' },
          { label: 'Dental tourism overview', to: '/dental-tourism' },
        ]}
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
          {page.sections.map((section) => {
            const Icon = section.icon;
            return (
              <article key={section.title} className="rounded-xl bg-white/[0.04] p-6">
                <Icon className="text-gold-400 mb-4 h-6 w-6" />
                <h2 className="font-serif text-2xl text-white">{section.title}</h2>
                <p className="mt-3 text-sm leading-7 text-gray-400">{section.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-t border-white/5 bg-white/[0.02] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-gold-400 font-mono text-sm tracking-[0.25em] uppercase">
              Digital workflow
            </p>
            <h2 className="mt-3 font-serif text-3xl text-white md:text-5xl">
              How planning moves from smile to bite
            </h2>
            <p className="mt-5 text-sm leading-7 text-gray-400">
              The aim is to connect smile design, CBCT anatomy, guide design, jaw movement, and
              muscle screening before the final implant pathway is confirmed.
            </p>
          </div>
          <div className="space-y-4">
            {page.workflowSteps.map((step, index) => (
              <article key={step.title} className="rounded-xl bg-black/20 p-5">
                <div className="flex gap-4">
                  <span className="bg-gold-400/10 text-gold-300 flex h-9 w-9 flex-none items-center justify-center rounded-full text-sm font-bold">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-gray-400">{step.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="text-gold-400 font-mono text-sm tracking-[0.25em] uppercase">
              Records checklist
            </p>
            <h2 className="mt-3 font-serif text-3xl text-white md:text-5xl">
              What helps the clinic plan responsibly
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {page.recordsChecklist.map((item) => (
              <div key={item} className="flex gap-3 rounded-xl bg-white/[0.04] p-4">
                <ShieldCheck className="text-gold-400 mt-1 h-5 w-5 flex-none" />
                <p className="text-sm leading-6 text-gray-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-gold-400 font-mono text-sm tracking-[0.25em] uppercase">
              Patient questions
            </p>
            <h2 className="mt-3 font-serif text-3xl text-white md:text-5xl">
              Questions before travel
            </h2>
          </div>
          <div className="space-y-4">
            {page.questions.map((item) => (
              <article key={item.question} className="rounded-xl bg-white/[0.04] p-6">
                <h3 className="text-lg font-semibold text-white">{item.question}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-400">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
