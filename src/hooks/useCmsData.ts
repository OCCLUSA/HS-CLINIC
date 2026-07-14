/**
 * CMS Data Hooks — Fallback-first pattern
 *
 * Each hook fetches data from Sanity CMS. If CMS returns empty/null,
 * the hardcoded defaults are used so the site never breaks.
 */
import { useSanityQuery, useSanityImage } from '@/hooks/useSanity';
import { urlFor } from '@/lib/sanityClient';
import type {
  SanityHero,
  SanityService,
  SanityTestimonial,
  SanityTeamMember,
  SanityTourismPricing,
  SanityFaq,
  SanitySiteSettings,
  SanityAboutSettings,
  SanityTourismSettings,
  SanityBeforeAfterCase,
  SanityYoutubeVideo,
  SanityServicePillar,
  SanityImage,
} from '@/types/sanity';

/* ================================================================
   Re-export image helper for convenience
   ================================================================ */
export { useSanityImage };

/* ================================================================
   HERO
   ================================================================ */

const DEFAULT_HERO = {
  title: 'Plan Your Confident Smile',
  subtitle:
    'Dental implants, smile design, crowns, and bite care planned with digital records, clinical examination, and clinician review.',
  ctaText: 'Start With Your Records',
  ctaLink: '/send-your-records',
};

const OWNER_APPROVED_HOMEPAGE_HERO_IMAGE: SanityImage = {
  _type: 'image',
  asset: {
    _type: 'reference',
    _ref: 'image-14598198071ac7b5008ac148b0226e8296b6f68a-2752x1536-webp',
  },
};

const OWNER_APPROVED_HOMEPAGE_HERO_ALT =
  'Dental consultation with digital jaw imaging at HS Clinic Cairo';

export function useHero() {
  type ApprovedHero = SanityHero & {
    ownerApproved?: boolean;
    clinicianCopyApproved?: boolean;
    imageRightsConfirmed?: boolean;
    publicationConsentConfirmed?: boolean;
  };
  const {
    data: hero,
    loading,
    error,
  } = useSanityQuery<ApprovedHero>(
    `coalesce(*[_type == "hero" && _id == "hero"][0], *[_type == "hero"][0]) {
      title, subtitle, ctaText, ctaLink, backgroundImage, backgroundImageAlt,
      ownerApproved, clinicianCopyApproved, imageRightsConfirmed, publicationConsentConfirmed
    }`
  );
  const doc =
    hero?.ownerApproved === true &&
    hero.clinicianCopyApproved === true &&
    !hasPatientUnsafeCopy({
      title: hero.title,
      subtitle: hero.subtitle,
      ctaText: hero.ctaText,
      ctaLink: hero.ctaLink,
    })
      ? hero
      : undefined;
  const canPublishHeroImage =
    doc?.imageRightsConfirmed === true && doc.publicationConsentConfirmed === true;
  return {
    title: safeCmsValue(doc?.title, DEFAULT_HERO.title),
    subtitle: safeCmsValue(doc?.subtitle, DEFAULT_HERO.subtitle),
    ctaText: safeCmsValue(doc?.ctaText, DEFAULT_HERO.ctaText),
    ctaLink: safeCmsValue(doc?.ctaLink, DEFAULT_HERO.ctaLink),
    backgroundImage:
      canPublishHeroImage && doc?.backgroundImage
        ? doc.backgroundImage
        : OWNER_APPROVED_HOMEPAGE_HERO_IMAGE,
    backgroundImageAlt:
      canPublishHeroImage && doc?.backgroundImage
        ? safeCmsValue(doc.backgroundImageAlt, OWNER_APPROVED_HOMEPAGE_HERO_ALT)
        : OWNER_APPROVED_HOMEPAGE_HERO_ALT,
    loading,
    error,
  };
}

/* ================================================================
   SERVICES
   ================================================================ */

export interface CmsService {
  _id: string;
  title: string;
  description: string;
  icon?: string;
  image?: SanityImage;
}

const DEFAULT_SERVICES: CmsService[] = [
  {
    _id: 'default-1',
    title: 'Bite Contact Records',
    description:
      'Digital bite records can support clinician review of contact timing and force distribution.',
    icon: 'Stethoscope',
  },
  {
    _id: 'default-2',
    title: 'Muscle Activity Records',
    description:
      'Surface electromyography records muscle electrical activity as an adjunct to examination.',
    icon: 'Zap',
  },
  {
    _id: 'default-3',
    title: 'Jaw Movement Records',
    description: 'Jaw tracking records movement patterns for clinician review and does not diagnose alone.',
    icon: 'Scan',
  },
  {
    _id: 'default-4',
    title: 'Occlusion Planning',
    description: 'Bite records can support discussion of case-specific restorative or splint planning.',
    icon: 'Shield',
  },
  {
    _id: 'default-5',
    title: 'Clinical Examination',
    description: 'Symptoms, dental findings, function, and relevant records are reviewed together.',
    icon: 'Smile',
  },
  {
    _id: 'default-6',
    title: 'Digital Planning',
    description:
      'Digital planning records can support clinician discussion before final decisions.',
    icon: 'BrainCircuit',
  },
];

export function useServices() {
  type ApprovedService = SanityService & {
    ownerApproved?: boolean;
    clinicianCopyApproved?: boolean;
  };
  const { data, loading, error } = useSanityQuery<ApprovedService[]>(
    `*[_type == "service"] | order(order asc) {
      _id, title, description, icon, imageAlt,
      ownerApproved, clinicianCopyApproved,
      "slug": slug.current,
      image
    }`
  );
  const safeData = data?.filter(
    (service) =>
      service.ownerApproved === true &&
      service.clinicianCopyApproved === true &&
      !hasPatientUnsafeCopy(service)
  );
  const services: CmsService[] =
    safeData && safeData.length > 0
      ? safeData.map((s) => ({
          _id: s._id,
          title: s.title,
          description: s.description,
          icon: s.icon,
          image: undefined,
        }))
      : DEFAULT_SERVICES;
  return { services, loading, error };
}

/** Fetch a single service document by slug for the dynamic service detail page */
export function useServiceBySlug(slug: string) {
  type ApprovedService = SanityService & {
    ownerApproved?: boolean;
    clinicianCopyApproved?: boolean;
  };
  const { data, loading, error } = useSanityQuery<ApprovedService[]>(
    `*[_type == "service" && slug.current == $slug][0...1] {
      _id, title, description, icon, image, imageAlt,
      ownerApproved, clinicianCopyApproved,
      "slug": slug.current
    }`,
    { slug }
  );
  const candidate = data?.[0];
  const service =
    candidate?.ownerApproved === true &&
    candidate.clinicianCopyApproved === true &&
    !hasPatientUnsafeCopy(candidate)
    ? {
        ...candidate,
        title: safeCmsValue(candidate.title, 'Dental Service Information'),
        description: safeCmsValue(
          candidate.description,
          'This page provides general information. Suitability and treatment decisions require examination and clinician review.'
        ),
        image: undefined,
      }
    : null;
  return { service, loading, error };
}

/* ================================================================
   TESTIMONIALS
   ================================================================ */

export interface CmsTestimonial {
  _id: string;
  name: string;
  country?: string;
  countryFlag?: string;
  text: string;
  stars: number;
  image?: SanityImage;
}

const DEFAULT_TESTIMONIALS: CmsTestimonial[] = [];

export function useTestimonials() {
  type PublishableTestimonial = SanityTestimonial & {
    publicationConsentConfirmed?: boolean;
    ownerApproved?: boolean;
  };
  const { data, loading, error } = useSanityQuery<PublishableTestimonial[]>(
    `*[_type == "testimonial"] | order(_createdAt desc) {
      _id, name, country, countryFlag, text, stars, image, imageAlt,
      publicationConsentConfirmed, ownerApproved
    }`
  );
  const safeData = data?.filter(
    (testimonial) =>
      testimonial.publicationConsentConfirmed === true &&
      testimonial.ownerApproved === true &&
      !hasPatientUnsafeCopy(testimonial)
  );
  const testimonials: CmsTestimonial[] =
    safeData && safeData.length > 0
      ? safeData.map((t) => ({
          _id: t._id,
          name: t.name,
          country: t.country,
          countryFlag: t.countryFlag,
          text: t.text,
          stars: t.stars,
          image: t.image,
        }))
      : DEFAULT_TESTIMONIALS;
  return { testimonials, loading, error };
}

/* ================================================================
   TEAM MEMBERS
   ================================================================ */

export interface CmsTeamMember {
  _id: string;
  name: string;
  role: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bio?: any[];
  image?: SanityImage;
}

const DEFAULT_TEAM: CmsTeamMember[] = [
  {
    _id: 'default-tm1',
    name: 'Dr. Haitham Sharshar',
    role: 'Dentist at HS Clinic',
    bio: undefined,
    image: undefined,
  },
];

export function useTeamMembers() {
  type ApprovedTeamMember = SanityTeamMember & {
    ownerApproved?: boolean;
    profileCopyApproved?: boolean;
    imageRightsConfirmed?: boolean;
  };
  const { data, loading, error } = useSanityQuery<ApprovedTeamMember[]>(
    `*[_type == "teamMember"] | order(order asc) {
      _id, name, role, bio, image,
      ownerApproved, profileCopyApproved, imageRightsConfirmed
    }`
  );
  const safeData = data?.filter(
    (member) =>
      member.ownerApproved === true &&
      member.profileCopyApproved === true &&
      !hasPatientUnsafeCopy(member)
  );
  const members: CmsTeamMember[] =
    safeData && safeData.length > 0
      ? safeData.map((m) => ({
          _id: m._id,
          name: m.name,
          role: m.role,
          bio: m.bio,
          image: m.imageRightsConfirmed === true ? m.image : undefined,
        }))
      : DEFAULT_TEAM;
  return { members, loading, error };
}

/* ================================================================
   TOURISM PRICING
   ================================================================ */

export interface CmsPricing {
  _id: string;
  treatment: string;
  egyptPrice: string;
  usaPrice: string;
  ukPrice: string;
  turkeyPrice?: string;
  hungaryPrice?: string;
  uaePrice?: string;
  saving: string;
}

const DEFAULT_PRICING: CmsPricing[] = [
  {
    _id: 'dp1',
    treatment: 'Single Implant',
    egyptPrice: 'Ask for a case-specific estimate',
    usaPrice: 'Use your local quote for comparison',
    ukPrice: 'Use your local quote for comparison',
    turkeyPrice: 'Local quote varies',
    hungaryPrice: 'Local quote varies',
    uaePrice: 'Local quote varies',
    saving: 'Case-by-case review',
  },
  {
    _id: 'dp2',
    treatment: 'All-on-4',
    egyptPrice: 'Ask for a case-specific estimate',
    usaPrice: 'Use your local quote for comparison',
    ukPrice: 'Use your local quote for comparison',
    turkeyPrice: 'Local quote varies',
    hungaryPrice: 'Local quote varies',
    uaePrice: 'Local quote varies',
    saving: 'Case-by-case review',
  },
  {
    _id: 'dp3',
    treatment: 'Veneer (per tooth)',
    egyptPrice: 'Ask for a case-specific estimate',
    usaPrice: 'Use your local quote for comparison',
    ukPrice: 'Use your local quote for comparison',
    turkeyPrice: 'Local quote varies',
    hungaryPrice: 'Local quote varies',
    uaePrice: 'Local quote varies',
    saving: 'Case-by-case review',
  },
  {
    _id: 'dp4',
    treatment: 'Bone Graft',
    egyptPrice: 'Ask for a case-specific estimate',
    usaPrice: 'Use your local quote for comparison',
    ukPrice: 'Use your local quote for comparison',
    turkeyPrice: 'Local quote varies',
    hungaryPrice: 'Local quote varies',
    uaePrice: 'Local quote varies',
    saving: 'Case-by-case review',
  },
];

export function useTourismPricing() {
  type ApprovedTourismPricing = SanityTourismPricing & {
    ownerApproved?: boolean;
    clinicianCopyApproved?: boolean;
  };
  const { data, loading, error } = useSanityQuery<ApprovedTourismPricing[]>(
    `*[_type == "tourismPricing"] | order(order asc, treatment asc) {
      _id, treatment, egyptPrice, usaPrice, ukPrice,
      turkeyPrice, hungaryPrice, uaePrice, saving,
      ownerApproved, clinicianCopyApproved
    }`
  );
  const safeData = data?.filter(
    (price) =>
      price.ownerApproved === true &&
      price.clinicianCopyApproved === true &&
      !hasPatientUnsafeCopy(price)
  );
  const pricing: CmsPricing[] =
    safeData && safeData.length > 0
      ? safeData.map((p) => ({
          _id: p._id,
          treatment: p.treatment,
          egyptPrice: p.egyptPrice,
          usaPrice: p.usaPrice,
          ukPrice: p.ukPrice,
          turkeyPrice: p.turkeyPrice,
          hungaryPrice: p.hungaryPrice,
          uaePrice: p.uaePrice,
          saving: p.saving,
        }))
      : DEFAULT_PRICING;
  return { pricing, loading, error };
}

/* ================================================================
   FAQs
   ================================================================ */

export interface CmsFaq {
  _id: string;
  question: string;
  answer: string;
}

const DEFAULT_FAQS: CmsFaq[] = [
  {
    _id: 'df1',
    question: 'Is online records review a final treatment plan?',
    answer:
      'No. Online records review is preliminary. Diagnosis and treatment decisions require examination, appropriate diagnostic records, clinician review, and patient consent.',
  },
  {
    _id: 'df2',
    question: 'How are treatment costs compared before travel?',
    answer:
      'Costs are reviewed case by case after dental records, CBCT needs, materials, travel timing, and visit sequence are clear.',
  },
  {
    _id: 'df3',
    question: 'Are travel services included in dental care?',
    answer:
      'Do not assume that flights, accommodation, transport, translation, or tourism activities are included. Ask the clinic to confirm current responsibilities before booking.',
  },
  {
    _id: 'df4',
    question: 'How long do I need to stay in Cairo?',
    answer:
      'Visit length is case-specific and can change after examination, diagnostics, or healing review. Ask about possible stages before making non-refundable bookings.',
  },
];

export function useFaqs() {
  type ApprovedFaq = SanityFaq & {
    ownerApproved?: boolean;
    clinicianCopyApproved?: boolean;
  };
  const { data, loading, error } = useSanityQuery<ApprovedFaq[]>(
    `*[_type == "faq"] | order(order asc) {
      _id, question, answer, ownerApproved, clinicianCopyApproved
    }`
  );
  const safeData = data?.filter(
    (faq) =>
      faq.ownerApproved === true &&
      faq.clinicianCopyApproved === true &&
      !hasPatientUnsafeCopy(faq)
  );
  const faqs: CmsFaq[] =
    safeData && safeData.length > 0
      ? safeData.map((f) => ({
          _id: f._id,
          question: f.question,
          answer: f.answer,
        }))
      : DEFAULT_FAQS;
  return { faqs, loading, error };
}

/* ================================================================
   SITE SETTINGS (singleton)
   ================================================================ */

export interface CmsSiteSettings {
  clinicName: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  socialLinks: Array<{ platform: string; url: string }>;
  workingHours: string;
  seoTitle: string;
  seoDescription: string;
  ogImage?: SanityImage | null;
  ogImageAlt: string;
  geoLat: number;
  geoLng: number;
}

const DEFAULT_SETTINGS: CmsSiteSettings = {
  clinicName: 'HS Clinic',
  phone: '+201101010599',
  whatsapp: '+201101010599',
  email: 'clinic@drhaithamsharshar.com',
  address: '8/63, 10th District, Zahraa El Maadi, Cairo, Egypt',
  socialLinks: [
    { platform: 'facebook', url: 'https://www.facebook.com/dentistdrhaithamsharshar/' },
    { platform: 'instagram', url: 'https://www.instagram.com/hsdental2025/' },
  ],
  workingHours: 'Mon–Fri: 09:00–18:00 | Sat: 09:00–14:00',
  seoTitle: '',
  seoDescription: '',
  ogImage: null,
  ogImageAlt: '',
  geoLat: 30.0511,
  geoLng: 31.3656,
};

export function useSiteSettings() {
  type ApprovedSiteSettings = SanitySiteSettings & {
    ownerApproved?: boolean;
    ogImageRightsConfirmed?: boolean;
    ogImagePublicationApproved?: boolean;
  };
  const { data, loading, error } = useSanityQuery<ApprovedSiteSettings[]>(
    `*[_type == "siteSettings"][0...1] {
      clinicName, phone, whatsapp, email, address, socialLinks, workingHours,
      seoTitle, seoDescription, ogImage, ogImageAlt, geoLat, geoLng,
      ownerApproved, ogImageRightsConfirmed, ogImagePublicationApproved
    }`
  );
  const candidate = data?.[0];
  const doc = candidate?.ownerApproved === true ? candidate : undefined;
  const canPublishOgImage =
    doc?.ogImageRightsConfirmed === true && doc.ogImagePublicationApproved === true;
  const settings: CmsSiteSettings = {
    clinicName: doc?.clinicName ?? DEFAULT_SETTINGS.clinicName,
    phone: doc?.phone ?? DEFAULT_SETTINGS.phone,
    whatsapp: doc?.whatsapp ?? DEFAULT_SETTINGS.whatsapp,
    email: doc?.email ?? DEFAULT_SETTINGS.email,
    address: doc?.address ?? DEFAULT_SETTINGS.address,
    socialLinks: (() => {
      const cms = doc?.socialLinks ?? [];
      const canonical: Record<string, string> = {
        facebook: 'https://www.facebook.com/dentistdrhaithamsharshar/',
        instagram: 'https://www.instagram.com/hsdental2025/',
      };
      // Merge: use canonical override for known platforms, keep CMS for others
      const merged = cms.map((link) =>
        canonical[link.platform] ? { ...link, url: canonical[link.platform] } : link
      );
      // Add any canonical platforms missing from CMS
      for (const [platform, url] of Object.entries(canonical)) {
        if (!merged.some((l) => l.platform === platform)) {
          merged.push({ platform, url });
        }
      }
      return merged;
    })(),
    workingHours: doc?.workingHours ?? DEFAULT_SETTINGS.workingHours,
    seoTitle: doc?.seoTitle ?? '',
    seoDescription: doc?.seoDescription ?? '',
    ogImage: canPublishOgImage ? (doc?.ogImage ?? null) : null,
    ogImageAlt: canPublishOgImage ? (doc?.ogImageAlt ?? '') : '',
    geoLat: doc?.geoLat ?? 30.0511,
    geoLng: doc?.geoLng ?? 31.3656,
  };
  return { settings, loading, error };
}

// ─── About Page Settings ─────────────────────────────────────────
const DEFAULT_ABOUT_SETTINGS = {
  quote:
    'Dental decisions start with patient concerns, clinical examination, appropriate records, and clear discussion.',
  values: [
    {
      title: 'Patient questions',
      description: 'Concerns, priorities, and questions are discussed before treatment decisions.',
      iconName: 'Heart',
    },
    {
      title: 'Examination first',
      description: 'Clinical examination and appropriate diagnostic records guide the discussion.',
      iconName: 'Award',
    },
    {
      title: 'Records in context',
      description: 'No scan, device, or digital record is interpreted as a diagnosis by itself.',
      iconName: 'GraduationCap',
    },
    {
      title: 'Consent and choice',
      description: 'Options, alternatives, risks, limitations, and aftercare are discussed before consent.',
      iconName: 'Users',
    },
  ],
  stats: [
    { value: 'Clinician led', label: 'DECISIONS' },
    { value: 'Case specific', label: 'PLANNING' },
    { value: 'Records in context', label: 'REVIEW' },
  ],
  certifications: [],
};

export function useAboutSettings() {
  type ApprovedAboutSettings = SanityAboutSettings & {
    ownerApproved?: boolean;
    clinicianCopyApproved?: boolean;
  };
  const { data, loading, error } = useSanityQuery<ApprovedAboutSettings[]>(
    `*[_type == "aboutSettings"][0...1] {
      quote, values, stats, certifications, ownerApproved, clinicianCopyApproved
    }`
  );
  const candidate = data?.[0];
  const doc =
    candidate?.ownerApproved === true &&
    candidate.clinicianCopyApproved === true &&
    !hasPatientUnsafeCopy(candidate)
      ? candidate
      : undefined;
  return {
    about: {
      quote: doc?.quote ?? DEFAULT_ABOUT_SETTINGS.quote,
      values: doc?.values ?? DEFAULT_ABOUT_SETTINGS.values,
      stats: doc?.stats ?? DEFAULT_ABOUT_SETTINGS.stats,
      certifications: doc?.certifications ?? DEFAULT_ABOUT_SETTINGS.certifications,
    },
    loading,
    error,
  };
}

// ─── Technology Page Settings ─────────────────────────────────────
const DEFAULT_TECH_SETTINGS = {
  technologies: [
    {
      title: 'Jaw Movement Records',
      description: 'Jaw movement records can support clinician review when clinically relevant.',
      iconName: 'Activity',
    },
    {
      title: 'Surface Muscle Activity Records',
      description: 'Surface EMG records muscle electrical activity as an adjunct to examination.',
      iconName: 'Cpu',
    },
    {
      title: 'Bite Contact Records',
      description: 'Digital bite records can show contact timing and force distribution.',
      iconName: 'Gauge',
    },
    {
      title: 'Pressure Contact Records',
      description: 'Pressure sensors can record contact patterns for clinician interpretation.',
      iconName: 'Eye',
    },
    {
      title: 'Three-Dimensional Imaging',
      description: 'Three-dimensional imaging can support anatomical review when indicated.',
      iconName: 'ScanLine',
    },
    {
      title: 'Joint Screening Records',
      description: 'Vibration records are adjunct information and do not diagnose a joint disorder alone.',
      iconName: 'Laptop',
    },
  ],
  stats: [
    { value: 'Adjunct', label: 'RECORDS' },
    { value: 'Clinician', label: 'REVIEW' },
    { value: 'Case specific', label: 'USE' },
  ],
};

export function useTechnologySettings() {
  return {
    tech: {
      technologies: DEFAULT_TECH_SETTINGS.technologies,
      heroImage: null,
      heroImageAlt: 'Dental records used during clinician review',
      stats: DEFAULT_TECH_SETTINGS.stats,
    },
    loading: false,
    error: null,
  };
}

// ─── Homepage Settings ────────────────────────────────────────────
const DEFAULT_HOMEPAGE_SETTINGS = {
  features: [
    {
      title: 'Digital Records Review',
      description: 'Photos, scans, and bite records help the clinician understand your case.',
      iconName: 'BrainCircuit',
    },
    {
      title: 'Jaw Movement Review',
      description: 'Movement records support bite and TMJ screening during clinician review.',
      iconName: 'Orbit',
    },
    {
      title: 'Muscle Activity Screening',
      description: 'Muscle readings can support the examination when jaw tension is a concern.',
      iconName: 'Activity',
    },
    {
      title: 'Bite Contact Review',
      description: 'Digital bite records help review contact balance before treatment planning.',
      iconName: 'Microscope',
    },
    {
      title: 'TMJ Screening Support',
      description: 'TMJ findings are reviewed as screening information, not an AI-only diagnosis.',
      iconName: 'ShieldCheck',
    },
    {
      title: 'Planned Dental Visits',
      description:
        'Treatment timing is discussed clearly before implants, crowns, or smile design.',
      iconName: 'Zap',
    },
  ],
  ctaTitle: 'Ready to plan your visit?',
  ctaSubtitle:
    'Start with a consultation. The clinic reviews your concern, records, and timing before treatment decisions are made.',
  ctaButtonText: 'Start records review',
};

export function useHomepageSettings() {
  return {
    homepage: {
      features: DEFAULT_HOMEPAGE_SETTINGS.features,
      ctaTitle: DEFAULT_HOMEPAGE_SETTINGS.ctaTitle,
      ctaSubtitle: DEFAULT_HOMEPAGE_SETTINGS.ctaSubtitle,
      ctaButtonText: DEFAULT_HOMEPAGE_SETTINGS.ctaButtonText,
    },
    loading: false,
    error: null,
  };
}

// ─── Services Page Settings ───────────────────────────────────────
const DEFAULT_SERVICES_PAGE = {
  conditions: [
    'Jaw discomfort questions',
    'Jaw Clicking',
    'Tooth wear concerns',
    'Bite change questions',
    'Muscle tenderness',
    'Limited Opening',
    'Restoration planning',
    'Implant planning',
    'Splint review',
    'Second opinion questions',
  ],
  processSteps: [
    { step: '01', title: 'Listen', description: 'Review concerns, history, and patient questions' },
    { step: '02', title: 'Examine', description: 'Complete a clinician-led dental examination' },
    { step: '03', title: 'Record', description: 'Use appropriate images or digital records when indicated' },
    { step: '04', title: 'Discuss', description: 'Review options, limits, alternatives, and consent' },
  ],
};

export function useServicesPageSettings() {
  return {
    pageSettings: {
      conditions: DEFAULT_SERVICES_PAGE.conditions,
      processSteps: DEFAULT_SERVICES_PAGE.processSteps,
    },
    loading: false,
    error: null,
  };
}

// ─── DSD Page Settings ────────────────────────────────────────────
const DEFAULT_DSD_SETTINGS = {
  heroImageAlt: 'Digital Smile Design planning information',
  heroCtaText: 'Start Records Review',
  splitRealityTitle: 'Planning Preview',
  splitRealitySubtitle:
    'A visual reference can support discussion but does not guarantee the final appearance.',
  splitRealityImageAlt:
    'Digital smile planning reference used during clinician review',
  timeline: [
    {
      title: 'Video Analysis',
      description: 'Clinical photographs can support the smile-planning discussion.',
      iconName: 'Video',
    },
    { title: '2D Reference', description: 'A visual reference supports patient questions.', iconName: 'PenTool' },
    { title: '3D Mockup', description: 'A mockup may support discussion when appropriate.', iconName: 'Box' },
    {
      title: 'Final Try-in',
      description: 'Review the planned smile with the clinician before final treatment steps.',
      iconName: 'Smile',
    },
  ],
  goldenTitle: 'Golden\nProportion',
  goldenDescription:
    'Golden Ratio planning is used as a visual reference, then adjusted through clinician review, facial photos, bite records, and patient preferences.',
  goldenStats: [
    { value: '1.618', label: 'Ratio' },
    { value: 'Photo', label: 'Review' },
    { value: 'Bite', label: 'Records' },
  ],
  goldenImageAlt: 'Golden proportion dental analysis overlay',
  goldenCtaText: 'Start Your Design',
  journey: [
    {
      number: '1',
      title: 'DIGITAL CAPTURE & ANALYSIS',
      description:
        'We use facial photos, scans, and bite records to support clinician-led smile planning.',
      iconName: 'ScanLine',
    },
    {
      number: '2',
      title: 'PLANNING DISCUSSION',
      description:
        'Visual references are considered with facial context, dental findings, function, and patient preferences.',
      iconName: 'Sparkles',
    },
    {
      number: '3',
      title: 'CLINICIAN REVIEW',
      description:
        'The clinician discusses options, limits, alternatives, and consent before any treatment decision.',
      iconName: 'Crown',
    },
  ],
  journeyCtaText: 'Explore the Full Process',
};

export function useDsdSettings() {
  return {
    dsd: {
      ...DEFAULT_DSD_SETTINGS,
      heroImage: null,
      splitRealityImage: null,
      goldenImage: null,
    },
    loading: false,
    error: null,
  };
}

// ─── Tourism Page Settings ────────────────────────────────────────
const DEFAULT_TOURISM = {
  heroTagline: 'DENTAL TOURISM // CAIRO, EGYPT',
  heroTitle: 'Planned Implant Care.',
  heroTitleAccent: 'A Records First Journey.',
  heroSubtitle:
    'Plan dental treatment in Cairo with records review, digital planning, travel coordination, and clinician-led treatment steps.',
  heroCtaText: 'Request Case Review',
  timelineSteps: [
    {
      step: '01',
      title: 'Preliminary Records Enquiry',
      description:
        'Ask which existing records may be useful for preliminary clinician review before travel.',
      iconName: 'Video',
    },
    {
      step: '02',
      title: 'Arrival & Travel Coordination',
      description:
        'Confirm visit stages first, then arrange flights, accommodation, and local transport separately around the agreed clinic timing.',
      iconName: 'Plane',
    },
    {
      step: '03',
      title: 'Examination and Clinician Review',
      description:
        'Examination, appropriate diagnostic records, risks, alternatives, and healing needs guide any treatment discussion.',
      iconName: 'Shield',
    },
    {
      step: '04',
      title: 'Follow the Agreed Aftercare',
      description:
        'Follow the case-specific instructions and review schedule provided by the treating clinician.',
      iconName: 'BookOpen',
    },
  ],
  fusionSubheading: 'RECORDS BEFORE TRAVEL',
  fusionTitle: 'Clinical Planning Before Cairo Dates',
  vipFeatures: [
    {
      title: 'Travel Timing',
      description:
        'Choose travel dates only after discussing the likely clinic stages and case-dependent timing.',
      iconName: 'Plane',
    },
    {
      title: 'Local Transport',
      description:
        'Confirm any transport needs and provider separately after the clinic appointment timing is clear.',
      iconName: 'Car',
    },
    {
      title: 'Communication Needs',
      description:
        'Ask the clinic to confirm language, scheduling, and accompanying-family arrangements before travel.',
      iconName: 'Clock',
    },
    {
      title: 'Clinical Examination',
      description:
        'Final decisions require examination, appropriate diagnostic records, questions, and informed consent.',
      iconName: 'Sparkles',
    },
    {
      title: 'Recovery Planning',
      description:
        'Ask the treating clinician about case-specific food, medication, hygiene, and activity instructions.',
      iconName: 'Utensils',
    },
    {
      title: 'Urgent Care Boundary',
      description:
        'Severe pain, swelling, bleeding, breathing difficulty, or trauma needs urgent local care before travel.',
      iconName: 'Crown',
    },
  ],
  vipStats: [
    { value: 'Records first', label: 'PLANNING START' },
    { value: 'Clinician review', label: 'DECISION BOUNDARY' },
    { value: 'Case specific', label: 'VISIT TIMING' },
  ],
  whyClinicReasons: [
    {
      title: 'Records in Context',
      description:
        'Appropriate images and digital records can support clinician review when relevant to the case.',
      iconName: 'Cpu',
    },
    {
      title: 'Questions Before Consent',
      description:
        'Ask about materials, stages, alternatives, risks, aftercare, and case-specific limitations before consent.',
      iconName: 'Shield',
    },
    {
      title: 'Written Terms When Applicable',
      description:
        'Ask whether any case-specific coverage or follow-up terms apply and request them in writing before care.',
      iconName: 'Award',
    },
    {
      title: 'Communication Planning',
      description: 'Ask the clinic to confirm language and communication arrangements before travel.',
      iconName: 'Globe',
    },
    {
      title: 'Digital Bite Planning',
      description:
        'Bite records, muscle screening, and jaw movement review can support clinician-led planning.',
      iconName: 'HeartPulse',
    },
    {
      title: 'Travel Coordination',
      description:
        'Travel and accommodation choices follow the preliminary clinic timing and remain separate from clinical decisions.',
      iconName: 'Plane',
    },
  ],
  residences: [
    {
      name: 'Choose accommodation after review',
      subtitle: 'Independent travel decision',
      stars: 0,
      description:
        'Compare current location, accessibility, cancellation, and transport details after the likely visit timing is discussed.',
      features: ['Flexible booking', 'Clinic access', 'Personal needs'],
    },
  ],
  bottomCtaText: 'Request Case Review',
};

export function useTourismSettings() {
  type ApprovedTourismSettings = SanityTourismSettings & {
    ownerApproved?: boolean;
    clinicianCopyApproved?: boolean;
  };
  const { data, loading, error } = useSanityQuery<ApprovedTourismSettings[]>(
    `*[_type == "tourismSettings"][0...1] {
      heroTagline, heroTitle, heroTitleAccent, heroSubtitle, heroCtaText,
      timelineSteps, fusionSubheading, fusionTitle,
      vipFeatures, vipStats, whyClinicReasons, residences,
      bottomCtaText, ownerApproved, clinicianCopyApproved
    }`
  );
  const candidate = data?.[0];
  const doc =
    candidate?.ownerApproved === true &&
    candidate.clinicianCopyApproved === true &&
    !hasPatientUnsafeCopy(candidate)
      ? candidate
      : undefined;
  return {
    tourism: {
      heroTagline: safeCmsValue(doc?.heroTagline, DEFAULT_TOURISM.heroTagline),
      heroTitle: safeCmsValue(doc?.heroTitle, DEFAULT_TOURISM.heroTitle),
      heroTitleAccent: safeCmsValue(doc?.heroTitleAccent, DEFAULT_TOURISM.heroTitleAccent),
      heroSubtitle: safeCmsValue(doc?.heroSubtitle, DEFAULT_TOURISM.heroSubtitle),
      heroCtaText: safeCmsValue(doc?.heroCtaText, DEFAULT_TOURISM.heroCtaText),
      timelineSteps: safeCmsValue(doc?.timelineSteps, DEFAULT_TOURISM.timelineSteps),
      fusionSubheading: safeCmsValue(doc?.fusionSubheading, DEFAULT_TOURISM.fusionSubheading),
      fusionTitle: safeCmsValue(doc?.fusionTitle, DEFAULT_TOURISM.fusionTitle),
      vipFeatures: safeCmsValue(doc?.vipFeatures, DEFAULT_TOURISM.vipFeatures),
      vipStats: safeCmsValue(doc?.vipStats, DEFAULT_TOURISM.vipStats),
      whyClinicReasons: safeCmsValue(doc?.whyClinicReasons, DEFAULT_TOURISM.whyClinicReasons),
      residences: safeCmsValue(doc?.residences, DEFAULT_TOURISM.residences),
      bottomCtaText: safeCmsValue(doc?.bottomCtaText, DEFAULT_TOURISM.bottomCtaText),
    },
    loading,
    error,
  };
}

/* ================================================================
   Before / After Cases — collection hook (Gallery + Slider)
   ================================================================ */
export function useBeforeAfterCases() {
  type PublishableCase = SanityBeforeAfterCase & {
    ownerApproved?: boolean;
    publicationConsentConfirmed?: boolean;
    imageAuthenticityConfirmed?: boolean;
    clinicianCaptionApproved?: boolean;
  };
  const { data, loading, error } = useSanityQuery<PublishableCase[]>(
    `*[_type == "beforeAfterCase"] | order(sortOrder asc) {
      _id, label, beforeImage, afterImage, treatment, sortOrder,
      ownerApproved, publicationConsentConfirmed, imageAuthenticityConfirmed, clinicianCaptionApproved
    }`
  );

  const cases = (data ?? [])
    .filter(
      (caseItem) =>
        caseItem.ownerApproved === true &&
        caseItem.publicationConsentConfirmed === true &&
        caseItem.imageAuthenticityConfirmed === true &&
        caseItem.clinicianCaptionApproved === true &&
        Boolean(caseItem.beforeImage) &&
        Boolean(caseItem.afterImage)
    )
    .map((caseItem) => ({
      before: urlFor(caseItem.beforeImage!).auto('format').width(940).url(),
      after: urlFor(caseItem.afterImage!).auto('format').width(940).url(),
      label: caseItem.label,
      treatment: caseItem.treatment ?? '',
    }));

  return { cases, loading, error };
}

/* ================================================================
   YouTube Videos — filtered by page category
   ================================================================ */
export function useYoutubeVideos(category: string) {
  type ApprovedYoutubeVideo = SanityYoutubeVideo & {
    ownerApproved?: boolean;
    publicationRightsConfirmed?: boolean;
    clinicianCopyApproved?: boolean;
  };
  const { data, loading, error } = useSanityQuery<ApprovedYoutubeVideo[]>(
    `*[_type == "youtubeVideo" && category == $category] | order(sortOrder asc) {
      _id, title, videoId, description, category, sortOrder,
      ownerApproved, publicationRightsConfirmed, clinicianCopyApproved
    }`,
    { category }
  );

  const videos = (data ?? [])
    .filter(
      (video) =>
        video.ownerApproved === true &&
        video.publicationRightsConfirmed === true &&
        video.clinicianCopyApproved === true &&
        !hasPatientUnsafeCopy(video)
    )
    .map((video) => ({
      videoId: video.videoId,
      title: video.title,
      description: video.description ?? '',
    }));

  return { videos, loading, error };
}

/* ================================================================
   SERVICE PILLAR PAGES — CMS-driven with hardcoded fallbacks
   ================================================================ */

export interface ServicePillarData {
  heroTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  heroImage?: any;
  faqs: Array<{ question: string; answer: string }>;
  benefits: Array<{ title: string; description?: string }>;
  technologies: Array<{ name: string; description?: string; iconName?: string }>;
  ctaPrimary: string;
  ctaSecondary: string;
  seoTitle?: string;
  seoDescription?: string;
}

const PATIENT_PROMISE_PATTERNS = [
  /\bworld[-\s]class\b/i,
  /\bvip\b/i,
  /\bluxury\b/i,
  /\bpermanent teeth\b/i,
  /\bfree consultation\b/i,
  /\bfraction of\b/i,
  /\bguarantee[sd]?\b/i,
  /\bwarrant(y|ies)\b/i,
  /\bexact planned\b/i,
  /\blifetime\b/i,
  /\bzero guesswork\b/i,
  /\bperfect\b/i,
  /\bperfectly\b/i,
  /\belite\b/i,
  /\bpremium\b/i,
  /\bunmatched\b/i,
  /\bhighly competitive\b/i,
  /\bsuperior technology\b/i,
  /\bsame[-\s]day\b/i,
  /\bmost advanced\b/i,
  /\bmost comprehensive\b/i,
  /\bonly facility\b/i,
  /\bdefinitive diagnosis\b/i,
  /\bdiagnos(?:e[sd]?|is|tic)\b/i,
  /\bsuccess(?:ful|fully|\s+rate)?\b/i,
  /\b\d+(?:\.\d+)?\s?%\b/,
  /\bai(?:[-\s]powered)?\b/i,
  /\bpredictable results\b/i,
  /\bsafest\b/i,
  /\bno additional cost\b/i,
  /[$€£]\s?\d/,
  /\bup to\s?\d+\s?%/i,
  /\b\d+\s?%\s?(saving|savings|off|less|cheaper|lower)\b/i,
  /\b(60|70)[–-](70|85|90)\b/,
];

export function hasPatientUnsafeCopy(value: unknown): boolean {
  if (typeof value === 'string') {
    return PATIENT_PROMISE_PATTERNS.some((pattern) => pattern.test(value));
  }

  if (Array.isArray(value)) {
    return value.some((item) => hasPatientUnsafeCopy(item));
  }

  if (value && typeof value === 'object') {
    return Object.values(value).some((item) => hasPatientUnsafeCopy(item));
  }

  return false;
}

function safeCmsValue<T>(candidate: T | null | undefined, fallback: T): T {
  if (candidate == null || hasPatientUnsafeCopy(candidate)) return fallback;
  return candidate;
}
const PILLAR_DEFAULTS: Record<string, ServicePillarData> = {
  'dental-implants': {
    heroTagline: 'Records first',
    heroTitle: 'Dental Implant Planning in Cairo',
    heroSubtitle:
      'Existing dental records can support a preliminary implant discussion. Final suitability, implant number, grafting questions, materials, risks, and timing require examination and clinician review.',
    faqs: [
      {
        question: 'How much do dental implants cost in Cairo compared to the USA or UK?',
        answer:
          'Implant costs are case-specific and depend on examination findings, imaging when indicated, grafting questions, implant number, prosthetic material, and visit sequence. Ask whether a case-specific estimate can be discussed after records review.',
      },
      {
        question: 'Can an online records review confirm that I am suitable for implants?',
        answer:
          'No. A remote review can organise questions and possible stages. Suitability requires clinical examination and appropriate imaging selected by the clinician.',
      },
      {
        question: 'Which records may be useful before an implant visit?',
        answer:
          'Ask the clinic before sending files. Existing radiographs, scans, photographs, medical information, and prior treatment notes may help, but new records may still be required after review.',
      },
    ],
    benefits: [
      {
        title: 'Single tooth review',
        description:
          'Discuss the missing tooth, adjacent teeth, available space, bone questions, and restorative options.',
      },
      {
        title: 'Multiple tooth review',
        description:
          'Review how implant number, remaining teeth, prosthetic design, hygiene, and visit stages may interact.',
      },
      {
        title: 'Bone and healing questions',
        description:
          'Imaging and examination may identify questions about anatomy, grafting, healing, and staged care.',
      },
    ],
    technologies: [
      {
        name: 'Existing records review',
        description: 'Available records can help organise questions before travel or examination.',
      },
      {
        name: 'Clinical examination',
        description:
          'The clinician reviews the mouth, symptoms, medical information, and restorative needs.',
      },
      {
        name: 'Imaging when indicated',
        description:
          'The clinician selects appropriate imaging to review anatomy and planning questions.',
      },
      {
        name: 'Prosthetic planning',
        description:
          'Implant and restoration questions are considered together before consent.',
      },
      {
        name: 'Case-specific sequence',
        description:
          'The visit and healing sequence is discussed after examination and record review.',
      },
    ],
    ctaPrimary: 'Request Case Review',
    ctaSecondary: 'Review Travel Stages',
  },
  'tmj-tmd-treatment': {
    heroTagline: 'Screening information only',
    heroTitle: 'TMJ and Bite Screening Review',
    heroSubtitle:
      'Jaw symptoms, patient history, examination findings, and selected movement, muscle, imaging, or bite records can be reviewed together. No single record diagnoses TMD or proves that occlusion caused symptoms.',
    faqs: [
      {
        question: 'Can jaw tracking or muscle records diagnose TMD?',
        answer:
          'No. These are adjunct screening records. A clinician reviews them with symptoms, examination findings, relevant imaging, medical history, and other possible causes.',
      },
      {
        question: 'What can a remote records review provide?',
        answer:
          'It can help organise questions and identify which existing records may be useful. It is not a diagnosis or a final treatment plan.',
      },
      {
        question: 'What should I do for sudden severe jaw symptoms?',
        answer:
          'Seek prompt local medical or dental care for trauma, swelling, fever, a locked jaw, breathing or swallowing difficulty, or rapidly worsening symptoms.',
      },
    ],
    benefits: [
      {
        title: 'Symptoms and history',
        description: 'Timing, triggers, function, previous care, and medical context guide the review.',
      },
      {
        title: 'Examination first',
        description: 'Clinical examination is required before a diagnosis or treatment decision.',
      },
      {
        title: 'Adjunct records',
        description: 'Selected records may support screening when the clinician considers them relevant.',
      },
    ],
    technologies: [
      {
        name: 'Jaw movement records',
        description:
          'Movement paths can be recorded as adjunct information for clinician review.',
      },
      {
        name: 'Surface muscle activity records',
        description:
          'Electrical activity can be recorded as screening information and does not diagnose a disorder alone.',
      },
      {
        name: 'Bite contact records',
        description:
          'Contact timing or pressure records can support discussion but do not prove symptom causation.',
      },
      {
        name: 'Imaging when indicated',
        description:
          'The clinician decides whether imaging is appropriate based on symptoms and examination.',
      },
      {
        name: 'Clinician synthesis',
        description:
          'Findings are considered together before any reversible or irreversible care is discussed.',
      },
    ],
    ctaPrimary: 'Request Screening Review',
    ctaSecondary: '',
  },
  'clear-aligners': {
    heroTagline: 'Case-specific assessment',
    heroTitle: 'Clear Aligner Assessment in Cairo',
    heroSubtitle:
      'Photographs and existing records can support an early discussion. Aligner suitability, tooth movement limits, attachments, refinements, risks, alternatives, and timing require examination and clinician review.',
    faqs: [
      {
        question: 'Can every orthodontic concern be treated with clear aligners?',
        answer:
          'No. Suitability depends on the teeth, bite, periodontal health, goals, movement required, and clinician assessment. Other options may be discussed.',
      },
      {
        question: 'Can a digital preview promise the final result?',
        answer:
          'No. A simulation is a planning aid. Biological response, wear, attachments, refinements, and clinical findings can change the pathway.',
      },
      {
        question: 'How is treatment duration estimated?',
        answer:
          'Timing is case-specific and may change during review. It is discussed after examination, records, goals, and likely refinement needs are considered.',
      },
    ],
    benefits: [
      {
        title: 'Digital planning aid',
        description:
          'A digital setup can support discussion of proposed tooth movements and limitations.',
      },
      {
        title: 'Removable appliance option',
        description: 'Aligners are removable, and suitability depends on case needs and patient use.',
      },
      {
        title: 'Bite review',
        description: 'Tooth position and bite relationships are reviewed together during planning.',
      },
      {
        title: 'Review checkpoints',
        description: 'Progress and fit require clinician review, and refinements may be needed.',
      },
    ],
    technologies: [],
    ctaPrimary: 'Request Aligner Assessment',
    ctaSecondary: '',
  },
  'full-arch-rehabilitation': {
    heroTagline: 'Staged planning',
    heroTitle: 'Full-Arch Implant Assessment in Cairo',
    heroSubtitle:
      'A full-arch review considers remaining teeth, bone and soft tissue, hygiene, bite forces, prosthetic choices, medical information, healing, maintenance, and travel stages. Final decisions require examination and clinician review.',
    faqs: [
      {
        question: 'Can remote records confirm a full-arch treatment plan?',
        answer:
          'No. Remote review can organise preliminary questions and possible stages. The final plan requires examination and appropriate imaging.',
      },
      {
        question: 'Can temporary teeth be promised before examination?',
        answer:
          'No. Any provisional option and timing depend on clinical findings, stability, bite, healing needs, materials, and clinician assessment.',
      },
      {
        question: 'How are price and visit stages estimated?',
        answer:
          'They are case-specific. The clinic discusses an estimate and likely stages after reviewing records, examination findings, materials, healing needs, and follow-up requirements.',
      },
    ],
    benefits: [
      {
        title: 'Anatomy review',
        description:
          'The clinician selects appropriate imaging to review bone, anatomy, and planning questions.',
      },
      {
        title: 'Prosthetic discussion',
        description:
          'Materials, design, hygiene access, provisional options, and maintenance are discussed case by case.',
      },
      {
        title: 'Bite and function review',
        description:
          'Bite records may support clinician review when considered relevant to the case.',
      },
      {
        title: 'Travel and healing stages',
        description:
          'The sequence may include more than one visit and can change after examination or healing review.',
      },
    ],
    technologies: [],
    ctaPrimary: 'Request Full-Arch Review',
    ctaSecondary: 'Review Travel Stages',
  },
};

export function useServicePillar(slug: string) {
  type ApprovedServicePillar = SanityServicePillar & {
    ownerApproved?: boolean;
    clinicianCopyApproved?: boolean;
    heroImageRightsConfirmed?: boolean;
    heroImagePublicationApproved?: boolean;
  };
  const { data, loading, error } = useSanityQuery<ApprovedServicePillar[]>(
    `*[_type == "servicePillar" && slug.current == $slug][0...1] {
      serviceTitle, seoTitle, seoDescription,
      heroTagline, heroTitle, heroSubtitle, heroImage,
      sections, technologies, benefits, faqs,
      ctaPrimary, ctaSecondary,
      ownerApproved, clinicianCopyApproved,
      heroImageRightsConfirmed, heroImagePublicationApproved
    }`,
    { slug }
  );
  const candidate = data?.[0];
  const doc =
    candidate?.ownerApproved === true &&
    candidate.clinicianCopyApproved === true &&
    !hasPatientUnsafeCopy(candidate)
      ? candidate
      : undefined;
  const defaults = PILLAR_DEFAULTS[slug] ?? PILLAR_DEFAULTS['dental-implants'];

  const pillar: ServicePillarData = {
    heroTagline: safeCmsValue(doc?.heroTagline, defaults.heroTagline),
    heroTitle: safeCmsValue(doc?.heroTitle, defaults.heroTitle),
    heroSubtitle: safeCmsValue(doc?.heroSubtitle, defaults.heroSubtitle),
    heroImage:
      doc?.heroImageRightsConfirmed === true && doc.heroImagePublicationApproved === true
        ? doc.heroImage
        : undefined,
    faqs: safeCmsValue(doc?.faqs, defaults.faqs),
    benefits: safeCmsValue(doc?.benefits, defaults.benefits),
    technologies: safeCmsValue(doc?.technologies, defaults.technologies),
    ctaPrimary: safeCmsValue(doc?.ctaPrimary, defaults.ctaPrimary),
    ctaSecondary: safeCmsValue(doc?.ctaSecondary, defaults.ctaSecondary),
    seoTitle: safeCmsValue(doc?.seoTitle, undefined),
    seoDescription: safeCmsValue(doc?.seoDescription, undefined),
  };

  return { pillar, loading, error };
}
