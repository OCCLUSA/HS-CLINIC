import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plane,
  Hotel,
  Clock,
  Shield,
  Heart,
  MapPin,
  Calendar,
  Phone,
  MessageCircle,
  CheckCircle2,
  Car,
  Utensils,
  Globe,
  ChevronRight,
} from 'lucide-react';
import {
  SEO,
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
} from '@/lib/seo';
import { trackWhatsAppClick } from '@/lib/analytics';

/* ── Animation helpers ────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

/* ── Data ─────────────────────────────────────────── */
const TIMELINE = [
  {
    step: '01',
    title: 'Virtual Case Review',
    description:
      'Share your dental records and photos via WhatsApp or email. Dr. Sharshar reviews your case and outlines treatment options, timing, and estimate needs after clinical review.',
    icon: MessageCircle,
    duration: '1–2 days',
  },
  {
    step: '02',
    title: 'Travel Planning & Concierge',
    description:
      'Our dedicated coordinator can help with airport transfers, accommodation options near the clinic, and appointment timing around your travel plan.',
    icon: Plane,
    duration: '1–2 weeks',
  },
  {
    step: '03',
    title: 'Arrival & Clinic Visit',
    description:
      'Airport transfer can be coordinated before your clinic visit. Consultation, CBCT records, and treatment timing are confirmed after examination.',
    icon: Heart,
    duration: '5–10 days',
  },
  {
    step: '04',
    title: 'Recovery & Follow-Up',
    description:
      "Enjoy Cairo's historic sites during recovery. We provide 24/7 WhatsApp support, follow-up appointments, and a comprehensive aftercare kit before departure.",
    icon: Shield,
    duration: 'Ongoing',
  },
];

const VIP_SERVICES = [
  {
    icon: Car,
    title: 'Airport Transfer',
    description: 'Private car pickup and drop-off at Cairo International Airport',
  },
  {
    icon: Hotel,
    title: 'Accommodation Guidance',
    description: 'Selected hotel options near the clinic can be discussed before travel',
  },
  {
    icon: Utensils,
    title: 'Personal Coordinator',
    description: 'Dedicated English-speaking coordinator throughout your stay',
  },
  {
    icon: Globe,
    title: 'Translation Services',
    description: 'Multi-language support for Arabic, English, French, and German',
  },
  {
    icon: MapPin,
    title: 'Tourism Excursions',
    description: 'Optional guided tours to Pyramids, Khan el-Khalili, and Old Cairo',
  },
  {
    icon: Calendar,
    title: 'Flexible Scheduling',
    description: 'Weekend and evening appointments to maximize your holiday time',
  },
];

const TREATMENT_PACKAGES = [
  {
    name: 'Smile Makeover',
    treatments: ['Porcelain Veneers', 'Digital Smile Design', 'Teeth Whitening'],
    duration: '5–7 days',
    savings: 'Case estimate',
  },
  {
    name: 'Implant Package',
    treatments: ['CBCT Scan', 'Guided Implant Surgery', 'Zirconia Crown'],
    duration: '7–10 days (2 visits)',
    savings: 'Case estimate',
  },
  {
    name: 'Full Arch Restoration',
    treatments: ['All-on-4 Implants', 'Immediate Load Prosthesis', 'Final Zirconia Bridge'],
    duration: '7–14 days (2 visits)',
    savings: 'Case estimate',
  },
  {
    name: 'TMD Treatment',
    treatments: ['Digital TMD Assessment', 'Jaw Tracking + EMG', 'Custom Orthotic'],
    duration: '3–5 days',
    savings: 'Case estimate',
  },
];

const FAQS = [
  {
    question: 'How do I start the dental tourism process with HS Clinic?',
    answer:
      'Send your dental records, X-rays, or photos via WhatsApp (+201101010599) or our consultation form. Dr. Sharshar will review your case and explain the next treatment-planning steps before travel.',
  },
  {
    question: 'What can be included in the dental tourism support plan?',
    answer:
      'The support plan can include private airport transfers, accommodation guidance, a personal coordinator, diagnostic records, treatment appointments, aftercare instructions, and optional tourism add-ons.',
  },
  {
    question: 'How long do I need to stay in Cairo for treatment?',
    answer:
      'Most treatments take 5–10 days. Simple procedures like veneers or single implants may require just one visit (5–7 days). Complex cases like All-on-4 or full arch rehabilitation may require two visits separated by 3–6 months for healing.',
  },
  {
    question: 'Is it safe to get dental treatment in Egypt?',
    answer:
      'Absolutely. HS Clinic uses the same premium materials (Nobel Biocare, Straumann, IPS e.max) and advanced technology (CBCT, digital planning, in-house CAD/CAM) as top clinics in the USA and Europe. Dr. Sharshar holds international certifications and is a certified Zebris and exocad trainer.',
  },
  {
    question: 'What happens if I need follow-up care after returning home?',
    answer:
      'We provide a comprehensive aftercare kit, detailed instructions, and 24/7 WhatsApp support. For any concerns, Dr. Sharshar offers virtual follow-up consultations. We can also coordinate with your local dentist for ongoing maintenance.',
  },
];

/* ── Component ────────────────────────────────────── */
export default function TourismProgram() {
  const breadcrumbJsonLd = useMemo(
    () =>
      buildBreadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Dental Tourism', path: '/dental-tourism' },
        { name: 'Tourism Program', path: '/dental-tourism/program' },
      ]),
    []
  );

  const faqJsonLd = useMemo(() => buildFaqJsonLd(FAQS), []);

  const tourismJsonLd = useMemo(
    () =>
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'TouristTrip',
        name: 'HS Clinic Dental Tourism Program — Cairo, Egypt',
        description:
          'Dental tourism program in Cairo including airport transfer coordination, accommodation guidance, records review, treatment planning, and patient coordination.',
        touristType: 'Medical Tourist',
        provider: {
          '@type': 'Dentist',
          name: 'HS Clinic — Dr. Haitham Sharshar',
          url: SITE_URL,
          telephone: '+201101010599',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Cairo',
            addressCountry: 'EG',
          },
        },
        itinerary: {
          '@type': 'ItemList',
          itemListElement: TIMELINE.map((step, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: step.title,
            description: step.description,
          })),
        },
      }),
    []
  );

  return (
    <>
      <Helmet>
        <title>{SEO.tourismProgram.title}</title>
        <meta name="description" content={SEO.tourismProgram.description} />
        <link rel="canonical" href={SEO.tourismProgram.canonical} />
        <meta property="og:title" content={SEO.tourismProgram.title} />
        <meta property="og:description" content={SEO.tourismProgram.description} />
        <meta property="og:url" content={SEO.tourismProgram.canonical} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:alt" content="Dr. Haitham Sharshar — HS Clinic Cairo" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content="en_EG" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.tourismProgram.title} />
        <meta name="twitter:description" content={SEO.tourismProgram.description} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json">{tourismJsonLd}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      {/* ── Breadcrumb ── */}
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <div
          className="container"
          style={{ maxWidth: 1200, margin: '0 auto', padding: '1rem 1.5rem' }}
        >
          <ol
            style={{
              display: 'flex',
              gap: '0.5rem',
              listStyle: 'none',
              padding: 0,
              margin: 0,
              fontSize: '0.875rem',
              color: 'var(--color-text-muted, #9ca3af)',
            }}
          >
            <li>
              <Link
                to="/"
                style={{ color: 'var(--color-accent, #d4af37)', textDecoration: 'none' }}
              >
                Home
              </Link>
            </li>
            <li>
              <ChevronRight size={14} style={{ margin: '0 0.25rem', verticalAlign: 'middle' }} />
            </li>
            <li>
              <Link
                to="/dental-tourism"
                style={{ color: 'var(--color-accent, #d4af37)', textDecoration: 'none' }}
              >
                Dental Tourism
              </Link>
            </li>
            <li>
              <ChevronRight size={14} style={{ margin: '0 0.25rem', verticalAlign: 'middle' }} />
            </li>
            <li aria-current="page" style={{ color: 'var(--color-text, #e5e7eb)' }}>
              Tourism Program
            </li>
          </ol>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section
        style={{
          padding: '4rem 1.5rem 3rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(15,20,35,1) 0%, rgba(25,35,55,1) 100%)',
        }}
      >
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              color: 'var(--color-accent, #d4af37)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              fontSize: '0.875rem',
              marginBottom: '1rem',
              fontWeight: 600,
            }}
          >
            Guided Dental Travel Experience
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '1.5rem',
              color: '#fff',
            }}
          >
            Your Complete Dental Tourism{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #d4af37, #f5d68a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Program
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: '1.125rem',
              color: 'var(--color-text-muted, #9ca3af)',
              maxWidth: 700,
              margin: '0 auto 2rem',
              lineHeight: 1.7,
            }}
          >
            From your first WhatsApp message to your flight home with a brand-new smile — HS Clinic
            manages every detail of your dental journey in Cairo, Egypt.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.875rem 2rem',
                borderRadius: '0.5rem',
                background: 'linear-gradient(135deg, #d4af37, #b8942e)',
                color: '#0f1423',
                fontWeight: 700,
                textDecoration: 'none',
                fontSize: '1rem',
              }}
            >
              <Phone size={18} /> Request Case Review
            </Link>
            <a
              href="https://api.whatsapp.com/send/?phone=201101010599"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('tourism_program_hero')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.875rem 2rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(212,175,55,0.4)',
                color: '#d4af37',
                fontWeight: 600,
                textDecoration: 'none',
                fontSize: '1rem',
              }}
            >
              <MessageCircle size={18} /> WhatsApp Us
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── 4-Step Journey Timeline ── */}
      <section style={{ padding: '5rem 1.5rem', background: 'var(--color-bg, #0a0e1a)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2
            style={{
              textAlign: 'center',
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '0.75rem',
            }}
          >
            Your 4-Step Dental Journey
          </h2>
          <p
            style={{
              textAlign: 'center',
              color: 'var(--color-text-muted, #9ca3af)',
              marginBottom: '3rem',
              maxWidth: 600,
              margin: '0 auto 3rem',
            }}
          >
            A streamlined process designed for international patients — from virtual consultation to
            travel home after clinician-reviewed care.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '2rem',
            }}
          >
            {TIMELINE.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '1rem',
                    padding: '2rem 1.5rem',
                    textAlign: 'center',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '-0.75rem',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(135deg, #d4af37, #b8942e)',
                      color: '#0f1423',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      padding: '0.25rem 0.75rem',
                      borderRadius: '1rem',
                    }}
                  >
                    STEP {item.step}
                  </div>
                  <Icon
                    size={32}
                    style={{ color: '#d4af37', marginBottom: '1rem', marginTop: '0.5rem' }}
                  />
                  <h3
                    style={{
                      fontSize: '1.125rem',
                      fontWeight: 700,
                      color: '#fff',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--color-text-muted, #9ca3af)',
                      lineHeight: 1.6,
                      marginBottom: '0.75rem',
                    }}
                  >
                    {item.description}
                  </p>
                  <span style={{ fontSize: '0.75rem', color: '#d4af37', fontWeight: 600 }}>
                    <Clock size={12} style={{ verticalAlign: 'middle', marginRight: '0.25rem' }} />
                    {item.duration}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── VIP Services ── */}
      <section
        style={{
          padding: '5rem 1.5rem',
          background: 'linear-gradient(180deg, var(--color-bg, #0a0e1a), rgba(15,20,35,1))',
        }}
      >
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2
            style={{
              textAlign: 'center',
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '0.75rem',
            }}
          >
            Travel Coordination Services
          </h2>
          <p
            style={{
              textAlign: 'center',
              color: 'var(--color-text-muted, #9ca3af)',
              marginBottom: '3rem',
              maxWidth: 600,
              margin: '0 auto 3rem',
            }}
          >
            Every detail is handled so you can focus on your smile and enjoy Cairo.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {VIP_SERVICES.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <motion.div
                  key={svc.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'flex-start',
                    padding: '1.5rem',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '0.75rem',
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: 40,
                      height: 40,
                      borderRadius: '0.5rem',
                      background: 'rgba(212,175,55,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={20} style={{ color: '#d4af37' }} />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: '#fff',
                        marginBottom: '0.25rem',
                      }}
                    >
                      {svc.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--color-text-muted, #9ca3af)',
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      {svc.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Treatment Packages ── */}
      <section style={{ padding: '5rem 1.5rem', background: 'var(--color-bg, #0a0e1a)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2
            style={{
              textAlign: 'center',
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '0.75rem',
            }}
          >
            Treatment Packages
          </h2>
          <p
            style={{
              textAlign: 'center',
              color: 'var(--color-text-muted, #9ca3af)',
              marginBottom: '3rem',
              maxWidth: 600,
              margin: '0 auto 3rem',
            }}
          >
            Popular dental tourism paths with travel coordination, accommodation guidance, and
            case-reviewed treatment estimates.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {TREATMENT_PACKAGES.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: '1rem',
                  }}
                >
                  {pkg.name}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', flex: 1 }}>
                  {pkg.treatments.map((t) => (
                    <li
                      key={t}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'var(--color-text-muted, #9ca3af)',
                        fontSize: '0.875rem',
                        marginBottom: '0.5rem',
                      }}
                    >
                      <CheckCircle2 size={14} style={{ color: '#d4af37', flexShrink: 0 }} /> {t}
                    </li>
                  ))}
                </ul>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    paddingTop: '1rem',
                  }}
                >
                  <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted, #9ca3af)' }}>
                    <Clock size={12} style={{ verticalAlign: 'middle', marginRight: '0.25rem' }} />
                    {pkg.duration}
                  </span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#d4af37' }}>
                    {pkg.savings}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        style={{
          padding: '5rem 1.5rem',
          background: 'linear-gradient(180deg, rgba(15,20,35,1), var(--color-bg, #0a0e1a))',
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2
            style={{
              textAlign: 'center',
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '3rem',
            }}
          >
            Dental Tourism FAQ
          </h2>
          {FAQS.map((faq, i) => (
            <motion.details
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              style={{
                marginBottom: '1rem',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '0.75rem',
                overflow: 'hidden',
              }}
            >
              <summary
                style={{
                  padding: '1.25rem 1.5rem',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#fff',
                  listStyle: 'none',
                }}
              >
                {faq.question}
              </summary>
              <p
                style={{
                  padding: '0 1.5rem 1.25rem',
                  color: 'var(--color-text-muted, #9ca3af)',
                  lineHeight: 1.7,
                  fontSize: '0.9375rem',
                  margin: 0,
                }}
              >
                {faq.answer}
              </p>
            </motion.details>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section
        style={{
          padding: '4rem 1.5rem',
          textAlign: 'center',
          background: 'var(--color-bg, #0a0e1a)',
        }}
      >
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '1.5rem',
            }}
          >
            Ready to Start Your Dental Journey?
          </h2>
          <p
            style={{
              color: 'var(--color-text-muted, #9ca3af)',
              marginBottom: '2rem',
              lineHeight: 1.7,
            }}
          >
            Send us your case records and receive clinician-reviewed next steps, timing guidance,
            and estimate requirements before you travel.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 2.5rem',
                borderRadius: '0.5rem',
                background: 'linear-gradient(135deg, #d4af37, #b8942e)',
                color: '#0f1423',
                fontWeight: 700,
                textDecoration: 'none',
                fontSize: '1rem',
              }}
            >
              <Phone size={18} /> Request Case Review
            </Link>
            <Link
              to="/dental-tourism"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 2.5rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(212,175,55,0.4)',
                color: '#d4af37',
                fontWeight: 600,
                textDecoration: 'none',
                fontSize: '1rem',
              }}
            >
              Review Planning <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
