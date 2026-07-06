import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ClipboardList, MessageCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { SEO, SITE_NAME, DEFAULT_OG_IMAGE, buildLocalBusinessJsonLd } from '@/lib/seo';
import { SectionHeader } from '@/app/components/ui/SectionHeader';
import { useSiteSettings, useSanityImage } from '@/hooks/useCmsData';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const form = e.currentTarget;
    const formDataObj = new FormData(form);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formDataObj as unknown as Record<string, string>).toString(),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          message: '',
        });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        throw new Error('Booking request failed. Please try again or contact us directly.');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setSubmitError(err instanceof Error ? err.message : 'Unknown booking error. Please contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { settings } = useSiteSettings();
  const ogImageUrl = useSanityImage(settings.ogImage, 1200) || DEFAULT_OG_IMAGE;
  const jsonLd = buildLocalBusinessJsonLd(settings);

  // Derive clickable links from settings
  const phoneDigits = settings.phone.replace(/[^0-9+]/g, '');
  const waDigits = (settings.whatsapp || settings.phone).replace(/[^0-9]/g, '');
  const formattedPhone =
    settings.phone.replace(/^\+(\d{3})(\d{3})(\d{3})(\d{4})$/, '+$1 $2 $3 $4') || settings.phone;

  const contactInfo = [
    {
      icon: Phone,
      title: 'Clinic Phone',
      details: [formattedPhone, 'Call or WhatsApp for appointment timing'],
      href: `tel:${phoneDigits}`,
    },
    {
      icon: Mail,
      title: 'Email',
      details: [settings.email.replace('@', '\u200B@\u200B'), 'Send records or appointment questions'],
      href: `mailto:${settings.email}`,
    },
    {
      icon: MapPin,
      title: 'Clinic Address',
      details: [settings.address, 'Zahraa El Maadi, Cairo'],
    },
    {
      icon: Clock,
      title: 'Opening Hours',
      details: settings.workingHours.split('|').map((s: string) => s.trim()),
    },
  ];

  return (
    <div className="bg-dark-950 min-h-screen pt-24 pb-12">
      <Helmet>
        <title>{SEO.contact.title}</title>
        <meta name="description" content={SEO.contact.description} />
        <link rel="canonical" href={SEO.contact.canonical} />
        <meta property="og:title" content={SEO.contact.title} />
        <meta property="og:description" content={SEO.contact.description} />
        <meta property="og:url" content={SEO.contact.canonical} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:alt" content="Dr. Haitham Sharshar — HS Clinic Cairo" />
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
        <p className="mx-auto -mt-8 mb-12 max-w-2xl text-center text-sm leading-6 text-gray-400">
          Tell us what you need, choose a preferred visit time, and send any dental records by
          WhatsApp or email. Final treatment decisions require clinician review.
        </p>

        <div className="mb-20 grid gap-12 lg:grid-cols-2">
          {/* Form */}
          <div className="bg-dark-900/50 relative overflow-hidden rounded-2xl border border-white/5 p-8">
            <div className="from-gold-600 via-gold-400 to-gold-600 absolute top-0 left-0 h-1 w-full bg-gradient-to-r" />

            <div className="mb-8 flex items-center justify-between">
              <h2 className="font-serif text-2xl text-white">Appointment request</h2>
              <div className="text-gold-400 flex items-center gap-2 text-xs font-semibold">
                <ClipboardList className="h-3.5 w-3.5" />
                Records welcome
              </div>
            </div>

            {submitted ? (
              <div className="bg-gold-400/10 border-gold-400/30 text-gold-400 animate-pulse rounded-lg border px-6 py-4 text-center">
                <CheckCircle2 className="mx-auto mb-2 h-8 w-8" />
                <p className="font-semibold">Request received</p>
                <p className="mt-1 text-xs text-gray-400">
                  The clinic team will reply with the next appointment step.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                aria-label="Book an appointment"
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
              >
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden">
                  <label>
                    Don&apos;t fill this out: <input name="bot-field" />
                  </label>
                </p>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="contact-name" className="sr-only">
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      required
                      aria-required="true"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full name"
                      className="bg-dark-950 focus:border-gold-400 focus:ring-gold-400 w-full rounded border border-white/10 px-4 py-3 text-white transition-all outline-none placeholder:text-gray-700 focus:ring-1"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-email" className="sr-only">
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        aria-required="true"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email address"
                        className="bg-dark-950 focus:border-gold-400 focus:ring-gold-400 w-full rounded border border-white/10 px-4 py-3 text-white transition-all outline-none placeholder:text-gray-700 focus:ring-1"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="sr-only">
                        Phone Number
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        required
                        aria-required="true"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone or WhatsApp number"
                        className="bg-dark-950 focus:border-gold-400 focus:ring-gold-400 w-full rounded border border-white/10 px-4 py-3 text-white transition-all outline-none placeholder:text-gray-700 focus:ring-1"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-date" className="sr-only">
                        Preferred Date
                      </label>
                      <input
                        id="contact-date"
                        name="date"
                        type="date"
                        required
                        aria-required="true"
                        value={formData.date}
                        onChange={handleChange}
                        className="bg-dark-950 focus:border-gold-400 focus:ring-gold-400 w-full rounded border border-white/10 px-4 py-3 text-white transition-all outline-none focus:ring-1"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-time" className="sr-only">
                        Time Slot
                      </label>
                      <select
                        id="contact-time"
                        name="time"
                        required
                        aria-required="true"
                        value={formData.time}
                        onChange={handleChange}
                        className="bg-dark-950 focus:border-gold-400 focus:ring-gold-400 w-full rounded border border-white/10 px-4 py-3 text-white transition-all outline-none focus:ring-1"
                      >
                        <option value="">Select preferred time</option>
                        <option value="09:00">09:00 - Morning appointment</option>
                        <option value="12:00">12:00 - Midday appointment</option>
                        <option value="15:00">15:00 - Afternoon appointment</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="sr-only">
                      Clinical Notes
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="What dental problem or treatment are you asking about?"
                      className="bg-dark-950 focus:border-gold-400 focus:ring-gold-400 w-full rounded border border-white/10 px-4 py-3 text-white transition-all outline-none placeholder:text-gray-700 focus:ring-1"
                    />
                  </div>
                </div>
                {submitError && (
                  <div className="rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gold-400 text-dark-950 flex w-full items-center justify-center gap-2 rounded py-4 font-bold transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? (
                    'Sending request...'
                  ) : (
                    <>
                      Send appointment request <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Visuals & Info */}
          <div className="space-y-8">
            {/* WhatsApp CTA */}
            <a
              href={`https://api.whatsapp.com/send/?phone=${waDigits}&text=Hello%20Dr.%20Haitham%2C%20I%20would%20like%20to%20book%20a%20consultation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-[#25D366]/30 bg-[#25D366]/10 px-5 py-4 transition-all hover:border-[#25D366]/60 hover:bg-[#25D366]/20"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 transition-transform group-hover:scale-110">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-white">WhatsApp booking</p>
                <p className="text-sm text-[#25D366]">Send records or ask for a visit time</p>
              </div>
            </a>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {contactInfo.map((info, index) => {
                const Wrapper = info.href ? 'a' : 'div';
                const wrapperProps = info.href
                  ? {
                      href: info.href,
                      target: info.href.startsWith('mailto') ? undefined : ('_self' as const),
                    }
                  : {};
                return (
                  <Wrapper
                    key={index}
                    {...wrapperProps}
                    className="bg-dark-900/30 hover:border-gold-400/30 rounded-xl border border-white/5 p-4 transition-colors"
                  >
                    <info.icon className="text-gold-500 mb-3 h-6 w-6" />
                    <h3 className="mb-1 font-bold text-white">{info.title}</h3>
                    {info.details.map((d, i) => (
                      <p key={i} className="text-xs text-gray-500">
                        {d}
                      </p>
                    ))}
                  </Wrapper>
                );
              })}
            </div>

            {/* Google Maps Embed */}
            <div className="group relative overflow-hidden rounded-xl border border-white/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.0!2d31.3139!3d29.9628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDU3JzQ2LjEiTiAzMcKwMTgnNTAuMCJF!5e0!3m2!1sen!2seg!4v1"
                width="100%"
                height="256"
                style={{
                  border: 0,
                  filter: 'invert(90%) hue-rotate(180deg) brightness(0.9) contrast(1.1)',
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="HS Clinic Location — Zahraa El Maadi, Cairo"
                className="w-full"
              />
              <a
                href="https://maps.app.goo.gl/bs7YaRkiFgkpbmLRA"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-dark-950/80 text-gold-400 hover:text-gold-300 absolute right-3 bottom-3 flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm backdrop-blur-sm transition-colors"
              >
                <MapPin className="h-4 w-4" /> Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
