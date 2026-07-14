import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ExternalLink, FileText, MapPin, MessageCircle, ShieldCheck } from 'lucide-react';
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  SEO,
  SITE_NAME,
  buildHreflangTags,
} from '@/lib/seo';

const sections = [
  {
    icon: FileText,
    title: 'Information on this website',
    text:
      'The public website provides clinic information and does not contain a patient portal or website file-storage system. It does not ask you to upload X-rays, photographs, or medical records.',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp and email',
    text:
      'If you choose WhatsApp or email, you leave this website and use that provider. Share only what the clinic requests and what you are comfortable sending through that channel. The clinic may use the information to answer your enquiry and arrange clinician review.',
  },
  {
    icon: MapPin,
    title: 'Maps and videos',
    text:
      'Google Maps and YouTube are not loaded automatically on the contact and video surfaces. Their content loads only after you choose the relevant button, and their own privacy terms then apply.',
  },
  {
    icon: ShieldCheck,
    title: 'Clinic website content',
    text:
      'Page text, clinic settings, and images may be delivered from the clinic content system and its Sanity content network. This connection supports the public website; it is not a patient records portal.',
  },
  {
    icon: ShieldCheck,
    title: 'Clinical records',
    text:
      'Records used for clinical care are handled through clinic processes separate from this public website. Online records review is preliminary; treatment decisions require examination and clinician review.',
  },
];

export default function SafePrivacyPolicy() {
  return (
    <div className="bg-dark-950 min-h-screen px-4 pt-32 pb-20 text-white sm:px-6 lg:px-8">
      <Helmet>
        <title>{SEO.privacyPolicy.title}</title>
        <meta name="description" content={SEO.privacyPolicy.description} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={SEO.privacyPolicy.canonical} />
        {buildHreflangTags(SEO.privacyPolicy.canonical).map((tag) => (
          <link key={tag.hrefLang} {...tag} />
        ))}
        <meta property="og:title" content={SEO.privacyPolicy.title} />
        <meta property="og:description" content={SEO.privacyPolicy.description} />
        <meta property="og:url" content={SEO.privacyPolicy.canonical} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:alt" content={DEFAULT_OG_IMAGE_ALT} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.privacyPolicy.title} />
        <meta name="twitter:description" content={SEO.privacyPolicy.description} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      </Helmet>

      <div className="mx-auto max-w-5xl">
        <p className="text-gold-300 text-sm font-semibold uppercase tracking-[0.25em]">
          Website privacy
        </p>
        <h1 className="mt-4 font-serif text-5xl font-bold md:text-7xl">Privacy Policy</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
          This page describes only the public HS Clinic website and its enquiry links. It does not
          make claims about security systems or data handling that cannot be proved from the website.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <section key={section.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <Icon className="text-gold-400 h-7 w-7" />
                <h2 className="mt-4 font-serif text-2xl">{section.title}</h2>
                <p className="mt-3 text-sm leading-7 text-gray-400">{section.text}</p>
              </section>
            );
          })}
        </div>

        <section className="border-gold-400/20 bg-gold-400/5 mt-10 rounded-2xl border p-6">
          <h2 className="font-serif text-2xl">Your choices</h2>
          <p className="mt-3 text-sm leading-7 text-gray-300">
            You can browse the site without activating Maps or YouTube. You can contact the clinic
            by phone instead of using a third-party messaging service. For questions about website
            privacy, use the clinic contact details shown on the Contact page.
          </p>
          <Link
            to="/contact"
            className="text-gold-300 mt-5 inline-flex items-center gap-2 font-semibold hover:text-white"
          >
            View contact choices <ExternalLink className="h-4 w-4" />
          </Link>
        </section>

        <p className="mt-8 text-xs text-gray-400">Last reviewed for website accuracy: 13 July 2026.</p>
      </div>
    </div>
  );
}
