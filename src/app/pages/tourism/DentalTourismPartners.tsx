import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  ClipboardCheck,
  FileCheck2,
  MessageCircle,
  ShieldCheck,
  Users,
} from 'lucide-react';
import {
  DEFAULT_OG_IMAGE,
  SEO,
  SITE_NAME,
  buildBreadcrumbJsonLd,
  buildHreflangTags,
} from '@/lib/seo';

const partnerWhatsapp = `https://api.whatsapp.com/send/?phone=201101010599&text=${encodeURIComponent(
  'Hello HS Clinic. I am contacting you about a possible dental tourism company partnership. Please share the appropriate next step.'
)}`;

const principles = [
  {
    icon: ShieldCheck,
    title: 'Clinical independence',
    text: 'The treating clinician keeps responsibility for examination, consent, treatment options, and final decisions.',
  },
  {
    icon: FileCheck2,
    title: 'Records before travel',
    text: 'Case coordination starts with the records the clinic requests. Preliminary review never guarantees suitability or an outcome.',
  },
  {
    icon: ClipboardCheck,
    title: 'Clear responsibilities',
    text: 'The clinic and partner agree who handles travel questions, appointments, records, patient communication, and aftercare coordination.',
  },
  {
    icon: Users,
    title: 'Patient choice',
    text: 'Patients receive clinically bounded information and remain free to ask questions, seek another opinion, or pause the process.',
  },
] as const;

export default function DentalTourismPartners() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Dental Tourism', path: '/dental-tourism' },
    { name: 'Partnerships', path: '/dental-tourism/partners' },
  ]);
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: SEO.dentalTourismPartners.title,
    description: SEO.dentalTourismPartners.description,
    url: SEO.dentalTourismPartners.canonical,
    inLanguage: 'en',
  };

  return (
    <div className="bg-dark-950 min-h-screen text-white">
      <Helmet>
        <title>{SEO.dentalTourismPartners.title}</title>
        <meta name="description" content={SEO.dentalTourismPartners.description} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href={SEO.dentalTourismPartners.canonical} />
        {buildHreflangTags(SEO.dentalTourismPartners.canonical).map((tag) => (
          <link key={tag.hrefLang} {...tag} />
        ))}
        <meta property="og:title" content={SEO.dentalTourismPartners.title} />
        <meta property="og:description" content={SEO.dentalTourismPartners.description} />
        <meta property="og:url" content={SEO.dentalTourismPartners.canonical} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:alt" content="HS Clinic Cairo" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.dentalTourismPartners.title} />
        <meta name="twitter:description" content={SEO.dentalTourismPartners.description} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      </Helmet>

      <section className="relative overflow-hidden px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="bg-gold-400/10 absolute top-0 left-1/2 h-80 w-[44rem] max-w-full -translate-x-1/2 rounded-full blur-[150px]" />
        <div className="relative mx-auto max-w-5xl text-center">
          <nav aria-label="Breadcrumb" className="mb-10 text-left text-sm text-gray-400">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/dental-tourism" className="hover:text-white">Dental Tourism</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-gold-300">Partnerships</li>
            </ol>
          </nav>
          <div className="border-gold-400/30 bg-gold-400/10 text-gold-300 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border">
            <Building2 className="h-7 w-7" />
          </div>
          <p className="cinematic-hairline text-gold-300 mt-6 inline-block text-sm font-semibold uppercase tracking-[0.24em]">
            Company enquiries
          </p>
          <h1 className="mt-5 font-serif text-5xl font-bold md:text-7xl">
            Dental Tourism Partnerships
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            A first-contact page for travel coordinators and dental tourism companies who want to
            discuss transparent, clinician-led case coordination in Cairo. No partnership is implied
            until both sides review and agree the responsibilities in writing.
          </p>
          <a
            href={partnerWhatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold-400 text-dark-950 mt-8 inline-flex min-h-12 items-center gap-3 rounded-xl px-7 py-3 font-bold transition duration-200 hover:bg-white active:scale-[0.98]"
          >
            <MessageCircle className="h-5 w-5" />
            Start a company enquiry
            <ArrowRight className="h-5 w-5" />
          </a>
          <p className="mt-4 text-xs leading-5 text-gray-400">
            This opens WhatsApp, a third-party service. Do not send patient records in the first
            company message.
          </p>
          <Link to="/privacy-policy" className="text-gold-300 mt-3 inline-block text-xs hover:text-white">
            Read the website privacy boundary
          </Link>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-gold-300 text-sm font-semibold uppercase tracking-[0.2em]">
              Partnership safety
            </p>
            <h2 className="mt-4 font-serif text-4xl">The patient pathway stays clinical</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {principles.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="cinematic-card rounded-2xl border border-white/10 bg-white/[0.03] p-7">
                  <Icon className="text-gold-400 h-7 w-7" />
                  <h3 className="mt-4 font-serif text-2xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-400">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-3xl border border-white/10 bg-black/25 p-7 md:grid-cols-2 sm:p-10">
          <div>
            <h2 className="font-serif text-3xl">Useful first-company information</h2>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-gray-300">
              {[
                'Registered company name, location, and main contact.',
                'Countries and patient groups you currently support.',
                'How you describe clinical services to patients.',
                'Who handles travel, payments, records, consent, and aftercare questions.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-gold-400" aria-hidden="true">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-3xl">What this page does not promise</h2>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-gray-300">
              {[
                'No automatic acceptance of a patient or case.',
                'No treatment guarantee, success rate, or fixed clinical outcome.',
                'No right to use clinic or patient images without written permission.',
                'No public upload portal or new website storage system.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-gold-400" aria-hidden="true">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 text-center">
          <Link to="/dental-tourism" className="text-gold-300 font-semibold hover:text-white">
            Return to the patient travel pathway
          </Link>
        </div>
      </section>
    </div>
  );
}
