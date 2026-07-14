import { useState } from 'react';
import { Clock, ExternalLink, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import {
  DEFAULT_OG_IMAGE,
  SEO,
  SITE_NAME,
  buildHreflangTags,
  buildLocalBusinessJsonLd,
} from '@/lib/seo';
import { SectionHeader } from '@/app/components/ui/SectionHeader';
import { useSanityImage, useSiteSettings } from '@/hooks/useCmsData';
import { trackWhatsAppClick } from '@/lib/analytics';

const MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.0!2d31.3139!3d29.9628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDU3JzQ2LjEiTiAzMcKwMTgnNTAuMCJF!5e0!3m2!1sen!2seg!4v1';

export function SafeContact() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const { settings } = useSiteSettings();
  const ogImageUrl = useSanityImage(settings.ogImage, 1200) || DEFAULT_OG_IMAGE;
  const jsonLd = buildLocalBusinessJsonLd(settings);
  const phoneDigits = settings.phone.replace(/[^0-9+]/g, '');
  const whatsappDigits = (settings.whatsapp || settings.phone).replace(/[^0-9]/g, '');
  const whatsappHref = `https://api.whatsapp.com/send/?phone=${whatsappDigits}&text=${encodeURIComponent(
    'Hello HS Clinic. I would like to arrange a dental consultation. Please tell me which records may be relevant and how you currently receive them.'
  )}`;

  const contactItems = [
    {
      icon: Phone,
      title: 'Clinic phone',
      detail: settings.phone,
      href: `tel:${phoneDigits}`,
    },
    {
      icon: Mail,
      title: 'Clinic email',
      detail: settings.email.replace('@', '\u200B@\u200B'),
      href: `mailto:${settings.email}`,
    },
    {
      icon: MapPin,
      title: 'Clinic address',
      detail: settings.address,
    },
    {
      icon: Clock,
      title: 'Opening hours',
      detail: settings.workingHours.replaceAll('|', ' · '),
    },
  ];

  return (
    <div className="bg-dark-950 min-h-screen pt-24 pb-16 text-white">
      <Helmet>
        <title>{SEO.contact.title}</title>
        <meta name="description" content={SEO.contact.description} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href={SEO.contact.canonical} />
        {buildHreflangTags(SEO.contact.canonical).map((tag) => (
          <link key={tag.hrefLang} {...tag} />
        ))}
        <meta property="og:title" content={SEO.contact.title} />
        <meta property="og:description" content={SEO.contact.description} />
        <meta property="og:url" content={SEO.contact.canonical} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:alt" content="Dr. Haitham Sharshar dental clinic in Cairo" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.contact.title} />
        <meta name="twitter:description" content={SEO.contact.description} />
        <meta name="twitter:image" content={ogImageUrl} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Book a Consultation" subtitle="HS Clinic Cairo" />
        <p className="mx-auto -mt-8 max-w-2xl text-center text-base leading-7 text-gray-300">
          Start in WhatsApp for appointment timing and guidance on sharing records. Online review is
          a screening step; final treatment decisions require examination and clinician review.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="border-gold-400/20 bg-dark-900/70 relative overflow-hidden rounded-3xl border p-7 shadow-2xl shadow-black/30 sm:p-10">
            <div className="bg-gold-400/10 absolute -top-24 -right-20 h-64 w-64 rounded-full blur-3xl" />
            <div className="relative">
              <div className="text-gold-300 mb-5 inline-flex items-center gap-2 rounded-full border border-gold-400/25 bg-gold-400/10 px-4 py-2 text-sm font-semibold">
                <ShieldCheck className="h-4 w-4" />
                WhatsApp first
              </div>
              <h2 className="font-serif text-3xl text-white sm:text-4xl">A clear first step</h2>
              <p className="mt-4 max-w-xl leading-7 text-gray-300">
                Please begin with a general message. A clinic team member can explain which records
                may be useful and how they are currently received. Avoid sending urgent or highly sensitive information
                through the website because this page does not store patient details.
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('contact_primary')}
                className="bg-gold-400 text-dark-950 mt-8 inline-flex min-h-12 items-center gap-3 rounded-xl px-6 py-3 font-bold transition duration-200 hover:bg-white active:scale-[0.98]"
              >
                <MessageCircle className="h-5 w-5" />
                Start on WhatsApp
                <ExternalLink className="h-4 w-4" />
              </a>
              <p className="mt-5 text-sm leading-6 text-gray-400">
                Severe swelling, uncontrolled bleeding, facial trauma, or difficulty breathing or
                swallowing needs urgent local medical or dental care; do not wait for travel advice.
              </p>
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {contactItems.map((item) => {
              const Icon = item.icon;
              const content = (
                <>
                  <Icon className="text-gold-400 h-6 w-6 shrink-0" />
                  <span>
                    <span className="block font-semibold text-white">{item.title}</span>
                    <span className="mt-1 block text-sm leading-6 text-gray-400">{item.detail}</span>
                  </span>
                </>
              );

              return item.href ? (
                <a
                  key={item.title}
                  href={item.href}
                  className="hover:border-gold-400/30 flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                  {content}
                </div>
              );
            })}
          </section>
        </div>

        <section className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
          {mapLoaded ? (
            <iframe
              src={MAP_EMBED_URL}
              width="100%"
              height="360"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="HS Clinic location in Zahraa El Maadi, Cairo"
              className="block w-full"
            />
          ) : (
            <div className="flex min-h-64 flex-col items-center justify-center px-6 py-12 text-center">
              <MapPin className="text-gold-400 h-8 w-8" />
              <h2 className="mt-4 font-serif text-2xl text-white">View the clinic location</h2>
              <p className="mt-3 max-w-lg text-sm leading-6 text-gray-400">
                Google Maps is not contacted until you choose to load the map.
              </p>
              <button
                type="button"
                onClick={() => setMapLoaded(true)}
                className="border-gold-400/30 text-gold-300 mt-6 min-h-11 rounded-xl border px-5 py-2.5 font-semibold transition hover:bg-gold-400/10"
              >
                Load clinic map
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
