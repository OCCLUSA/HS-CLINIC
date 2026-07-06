/**
 * Seed script — pushes all CMS content to Sanity Studio.
 * Run: node scripts/seed-sanity.mjs
 */
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '..', '.env') });

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'nk38o90y',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

// ─── Documents to create ────────────────────────────────────────

const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  clinicName: 'HS Clinic — Digital Occlusion & Cosmetic Dentistry',
  phone: '+20 110 101 0599',
  whatsapp: '+201101010599',
  email: 'info@hsclinic.dental',
  address: '8/63, 10th District, Zahraa El Maadi\nCairo, Egypt',
  socialLinks: [
    { _key: 'fb', platform: 'facebook', url: 'https://facebook.com/dr.haithamsharshar' },
    { _key: 'ig', platform: 'instagram', url: 'https://instagram.com/dr.haithamsharshar' },
    { _key: 'yt', platform: 'youtube', url: 'https://youtube.com/@dr.haithamsharshar' },
    { _key: 'li', platform: 'linkedin', url: 'https://linkedin.com/in/haithamsharshar' },
  ],
};

const hero = {
  _type: 'hero',
  title: 'Precision Dentistry. Perfected.',
  subtitle:
    "Where advanced occlusion science meets cosmetic artistry. Dr. Haitham Sharshar combines digital precision with an artist's eye to create smiles that function as beautifully as they look.",
  ctaText: 'Book Consultation',
  ctaLink: '/contact',
};

const teamMember = {
  _type: 'teamMember',
  name: 'Dr. Haitham Sharshar',
  role: 'Founder — Digital Occlusion & Cosmetic Dentistry Specialist',
  bio: [
    {
      _type: 'block',
      _key: 'bio1',
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: 'bio1s',
          marks: [],
          text: 'Dr. Haitham Sharshar is a leading specialist in digital occlusion and cosmetic dentistry based in Cairo, Egypt. With an MSc in Periodontics & Implantology from Cairo University, he brings over 15 years of clinical experience in complex smile rehabilitation, full-arch implant solutions, and neuromuscular diagnostics.',
        },
      ],
    },
    {
      _type: 'block',
      _key: 'bio2',
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: 'bio2s',
          marks: [],
          text: 'He is certified in Digital Smile Design (DSD), T-Scan occlusal analysis, and CEREC digital restorative workflows. His clinic reviews German and Swiss implant systems, prosthetic needs, and written coverage terms before treatment.',
        },
      ],
    },
    {
      _type: 'block',
      _key: 'bio3',
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: 'bio3s',
          marks: [],
          text: "Dr. Sharshar has treated over 500 international patients from 15+ countries, making HS Clinic one of Cairo's most trusted destinations for dental tourism. His philosophy: every smile must be both beautiful and biomechanically sound.",
        },
      ],
    },
  ],
  order: 1,
};

const services = [
  {
    _type: 'service',
    title: 'Dental Implants',
    slug: { _type: 'slug', current: 'dental-implants' },
    description:
      'German and Swiss implant systems planned with CBCT records, clinician review, guided surgery options, and written coverage terms.',
    icon: 'Stethoscope',
    order: 1,
  },
  {
    _type: 'service',
    title: 'Hollywood Smile',
    slug: { _type: 'slug', current: 'hollywood-smile' },
    description:
      'Complete smile makeovers with premium porcelain veneers, bonding, and whitening. Designed using Digital Smile Design technology.',
    icon: 'Sparkles',
    order: 2,
  },
  {
    _type: 'service',
    title: 'All-on-4 Full Arch',
    slug: { _type: 'slug', current: 'all-on-4-full-arch' },
    description:
      'Full arch rehabilitation with just 4 strategically placed implants. Same-day fixed teeth with immediate loading protocol.',
    icon: 'Crown',
    order: 3,
  },
  {
    _type: 'service',
    title: 'TMJ / Occlusion Therapy',
    slug: { _type: 'slug', current: 'tmj-occlusion' },
    description:
      'Advanced neuromuscular diagnostics using T-Scan and EMG jaw tracking. Splint therapy and occlusal adjustment for chronic jaw pain.',
    icon: 'Brain',
    order: 4,
  },
  {
    _type: 'service',
    title: 'Cosmetic Dentistry',
    slug: { _type: 'slug', current: 'cosmetic-dentistry' },
    description:
      'Teeth whitening, gum contouring, cosmetic bonding, and esthetic crown work. Precision color matching for natural results.',
    icon: 'Smile',
    order: 5,
  },
  {
    _type: 'service',
    title: 'Digital Smile Design',
    slug: { _type: 'slug', current: 'digital-smile-design' },
    description:
      '3D facial scanning, cinematic smile photography, and mathematical proportion analysis to design your perfect smile before treatment begins.',
    icon: 'ScanLine',
    order: 6,
  },
];

const testimonials = [
  {
    _type: 'testimonial',
    name: 'James W.',
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    text: 'Saved 70% compared to London prices. The clinic felt like a 5-star hotel. Dr. Sharshar explained everything clearly and the results are incredible.',
    stars: 5,
  },
  {
    _type: 'testimonial',
    name: 'Maria S.',
    country: 'Germany',
    countryFlag: '🇩🇪',
    text: 'Dr. Sharshar is a true artist. My implants are perfect and the whole Cairo experience was unforgettable. The concierge arranged everything.',
    stars: 5,
  },
  {
    _type: 'testimonial',
    name: 'Ahmed K.',
    country: 'UAE',
    countryFlag: '🇦🇪',
    text: 'World-class technology at a fraction of Gulf prices. The digital smile design process was amazing — I could see my new smile before any work started.',
    stars: 5,
  },
  {
    _type: 'testimonial',
    name: 'Sarah M.',
    country: 'United States',
    countryFlag: '🇺🇸',
    text: 'I flew from New York for my Hollywood Smile. Best decision ever. The whole trip cost less than one veneer in Manhattan, and I got to see the Pyramids!',
    stars: 5,
  },
  {
    _type: 'testimonial',
    name: 'Fatima A.',
    country: 'Saudi Arabia',
    countryFlag: '🇸🇦',
    text: 'The airport-to-clinic coordination helped me understand the visit plan, timing, and follow-up steps before travelling.',
    stars: 5,
  },
];

const tourismPricing = [
  {
    _type: 'tourismPricing',
    treatment: 'Single Implant',
    egyptPrice: 'Case estimate',
    usaPrice: 'Local quote',
    ukPrice: 'Local quote',
    turkeyPrice: 'Local quote',
    hungaryPrice: 'Local quote',
    uaePrice: 'Local quote',
    saving: 'Estimate after review',
  },
  {
    _type: 'tourismPricing',
    treatment: 'All-on-4 (per arch)',
    egyptPrice: 'Case estimate',
    usaPrice: 'Local quote',
    ukPrice: 'Local quote',
    turkeyPrice: 'Local quote',
    hungaryPrice: 'Local quote',
    uaePrice: 'Local quote',
    saving: 'Estimate after review',
  },
  {
    _type: 'tourismPricing',
    treatment: 'Hollywood Smile (20 veneers)',
    egyptPrice: 'Case estimate',
    usaPrice: 'Local quote',
    ukPrice: 'Local quote',
    turkeyPrice: 'Local quote',
    hungaryPrice: 'Local quote',
    uaePrice: 'Local quote',
    saving: 'Estimate after review',
  },
  {
    _type: 'tourismPricing',
    treatment: 'Teeth Whitening',
    egyptPrice: 'Case estimate',
    usaPrice: 'Local quote',
    ukPrice: 'Local quote',
    turkeyPrice: 'Local quote',
    hungaryPrice: 'Local quote',
    uaePrice: 'Local quote',
    saving: 'Estimate after review',
  },
  {
    _type: 'tourismPricing',
    treatment: 'Porcelain Crown',
    egyptPrice: 'Case estimate',
    usaPrice: 'Local quote',
    ukPrice: 'Local quote',
    turkeyPrice: 'Local quote',
    hungaryPrice: 'Local quote',
    uaePrice: 'Local quote',
    saving: 'Estimate after review',
  },
];

const faqs = [
  {
    _type: 'faq',
    question: 'How long do I need to stay in Cairo?',
    answer:
      "Most treatments require 5-7 days. We'll provide a personalized schedule during your virtual consultation. Some procedures like whitening can be done in a single visit.",
    order: 1,
  },
  {
    _type: 'faq',
    question: 'Is dental tourism in Egypt safe?',
    answer:
      'HS Clinic follows documented infection-control protocols and reviews implant system options, sterilization steps, and treatment suitability before care.',
    order: 2,
  },
  {
    _type: 'faq',
    question: 'What can be included in the travel support plan?',
    answer:
      'Airport pickup, hotel guidance, clinic transfers, multilingual coordination, and optional Cairo activities can be discussed before travel.',
    order: 3,
  },
  {
    _type: 'faq',
    question: 'How do I start the process?',
    answer:
      'Send us your X-rays or smile photos via WhatsApp or our consultation form. Within 24 hours, Dr. Sharshar will provide a personalized treatment plan with pricing.',
    order: 4,
  },
  {
    _type: 'faq',
    question: 'Do you provide written coverage terms for implants?',
    answer:
      'Written coverage terms are reviewed before treatment and depend on the selected implant system, prosthetic parts, maintenance plan, and clinical findings.',
    order: 5,
  },
];

// ─── Execute ────────────────────────────────────────────────────

async function seed() {
  console.log('🌱 Starting Sanity seed...\n');

  const allDocs = [
    siteSettings,
    hero,
    teamMember,
    ...services,
    ...testimonials,
    ...tourismPricing,
    ...faqs,
  ];

  let created = 0;
  let errors = 0;

  for (const doc of allDocs) {
    try {
      if (doc._id) {
        // Singleton (siteSettings) — use createOrReplace
        const result = await client.createOrReplace(doc);
        console.log(
          `  ✅ ${doc._type}: ${doc.title || doc.clinicName || doc.name || doc._id} → ${result._id}`
        );
      } else {
        const result = await client.create(doc);
        console.log(
          `  ✅ ${doc._type}: ${doc.title || doc.name || doc.question || doc.treatment} → ${result._id}`
        );
      }
      created++;
    } catch (err) {
      console.error(`  ❌ ${doc._type}: ${err.message}`);
      errors++;
    }
  }

  console.log(`\n🏁 Done! Created: ${created} | Errors: ${errors}`);
}

seed();
