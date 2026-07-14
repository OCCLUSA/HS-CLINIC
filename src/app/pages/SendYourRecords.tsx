import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  FileImage,
  FileText,
  HeartPulse,
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

const whatsappHref = `https://api.whatsapp.com/send/?phone=201101010599&text=${encodeURIComponent(
  'Hello HS Clinic. I would like to ask which dental records are needed for a preliminary clinician review.'
)}`;

const recordItems = [
  ['Recent dental images', 'A panoramic X-ray or CBCT only if you already have one.'],
  ['Clear mouth photographs', 'Smile, front teeth, side views, and the areas you want reviewed.'],
  ['Previous treatment notes', 'Implant cards, crown details, or a recent dentist summary if available.'],
  ['Health information', 'Relevant conditions, medicines, allergies, and smoking history.'],
] as const;

const questions = [
  {
    question: 'Does this website upload or store my dental files?',
    answer:
      'No. This public website has no patient upload form or new file-storage system. The WhatsApp button opens a third-party service only after you choose it.',
  },
  {
    question: 'Is the records review a final treatment plan?',
    answer:
      'No. It is a preliminary clinician review to help organise questions and likely visit stages. Final decisions require examination and appropriate diagnostic records.',
  },
  {
    question: 'What if I have severe pain, swelling, bleeding, or trauma?',
    answer:
      'Seek urgent dental or medical care near you. Do not delay urgent care while waiting for an online reply or planning travel.',
  },
] as const;

export default function SendYourRecords() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Send Your Records', path: '/send-your-records' },
  ]);
  const faq = buildFaqJsonLd([...questions]);
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: SEO.sendYourRecords.title,
    description: SEO.sendYourRecords.description,
    url: SEO.sendYourRecords.canonical,
    inLanguage: 'en',
  };

  return (
    <div className="bg-dark-950 min-h-screen text-white">
      <Helmet>
        <title>{SEO.sendYourRecords.title}</title>
        <meta name="description" content={SEO.sendYourRecords.description} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href={SEO.sendYourRecords.canonical} />
        {buildHreflangTags(SEO.sendYourRecords.canonical).map((tag) => (
          <link key={tag.hrefLang} {...tag} />
        ))}
        <meta property="og:title" content={SEO.sendYourRecords.title} />
        <meta property="og:description" content={SEO.sendYourRecords.description} />
        <meta property="og:url" content={SEO.sendYourRecords.canonical} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:alt" content="HS Clinic Cairo" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.sendYourRecords.title} />
        <meta name="twitter:description" content={SEO.sendYourRecords.description} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
        <script type="application/ld+json">{JSON.stringify(faq)}</script>
      </Helmet>

      <section className="relative overflow-hidden px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="bg-gold-400/10 absolute top-0 left-1/2 h-80 w-[44rem] max-w-full -translate-x-1/2 rounded-full blur-[150px]" />
        <div className="relative mx-auto max-w-6xl text-center">
          <nav aria-label="Breadcrumb" className="mb-10 text-left text-sm text-gray-400">
            <ol className="flex items-center gap-2">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-gold-300">Send Your Records</li>
            </ol>
          </nav>
          <p className="cinematic-hairline text-gold-300 inline-block text-sm font-semibold uppercase tracking-[0.26em]">
            Records first
          </p>
          <h1 className="mx-auto mt-5 max-w-4xl font-serif text-5xl font-bold md:text-7xl">
            Send Your Dental Records
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Ask the clinic which records are useful before choosing travel dates. This website does
            not collect or store your files; the first action continues through WhatsApp only when
            you choose it.
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold-400 text-dark-950 mt-8 inline-flex min-h-12 items-center gap-3 rounded-xl px-7 py-3 font-bold transition duration-200 hover:bg-white active:scale-[0.98]"
          >
            <MessageCircle className="h-5 w-5" />
            Ask what records to send
            <ArrowRight className="h-5 w-5" />
          </a>
          <p className="mx-auto mt-4 max-w-2xl text-xs leading-5 text-gray-400">
            WhatsApp is a third-party service with its own privacy terms. Share only what the clinic
            requests and what you are comfortable sending through that channel.
          </p>
          <Link to="/privacy-policy" className="text-gold-300 mt-3 inline-block text-xs hover:text-white">
            Read the website privacy boundary
          </Link>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-gold-300 text-sm font-semibold uppercase tracking-[0.2em]">
              Useful starting records
            </p>
            <h2 className="mt-4 font-serif text-4xl">Send only what you already have</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {recordItems.map(([title, text], index) => {
                const Icon = index === 0 || index === 1 ? FileImage : index === 2 ? FileText : HeartPulse;
                return (
                  <article key={title} className="cinematic-card rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                    <Icon className="text-gold-400 h-6 w-6" />
                    <h3 className="mt-4 font-semibold">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-400">{text}</p>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/25 p-7 sm:p-9">
            <ShieldCheck className="text-gold-400 h-8 w-8" />
            <h2 className="mt-5 font-serif text-3xl">What happens next</h2>
            <ol className="mt-7 space-y-5">
              {[
                'Ask which records are relevant to your concern.',
                'A clinic team member may organise the information for clinician review.',
                'The clinic may reply with preliminary questions or possible visit stages, not a final diagnosis.',
                'Final treatment decisions require examination, appropriate diagnostics, clinician review, and patient consent in Cairo.',
              ].map((step, index) => (
                <li key={step} className="flex gap-4 text-sm leading-6 text-gray-300">
                  <span className="border-gold-400/40 text-gold-300 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-semibold">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <div className="mt-8 rounded-2xl border border-amber-300/30 bg-amber-300/5 p-5">
              <div className="flex items-center gap-3 text-amber-200">
                <AlertTriangle className="h-5 w-5" />
                <h3 className="font-semibold">Urgent symptoms</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-300">
                Severe pain, swelling, bleeding, breathing difficulty, or trauma needs urgent local
                care. Do not wait for an online reply or travel plan.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-serif text-4xl">Questions before you continue</h2>
          <div className="mt-8 space-y-4">
            {questions.map((item) => (
              <article key={item.question} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="flex items-start gap-3 font-semibold">
                  <CheckCircle2 className="text-gold-400 mt-0.5 h-5 w-5 shrink-0" />
                  {item.question}
                </h3>
                <p className="mt-3 pl-8 text-sm leading-6 text-gray-400">{item.answer}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/contact" className="text-gold-300 font-semibold hover:text-white">
              View phone, email, and clinic location
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
