/**
 * SEO Constants — HS Clinic
 * Central source for all SEO metadata across the site.
 */

export const SITE_URL = 'https://drhaithamsharshar.com';
export const SITE_NAME = 'Dr. Haitham Sharshar | HS Clinic';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-clinic.jpg`;
export const DEFAULT_OG_IMAGE_TYPE = 'image/jpeg';
export const DEFAULT_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_OG_IMAGE_HEIGHT = 630;
export const DEFAULT_OG_IMAGE_ALT =
  'Dr. Haitham Sharshar Dental Clinic in Cairo with digital dentistry technology';

export const SEO = {
  home: {
    title: 'Dr. Haitham Sharshar | Dental Implants & Smile Design Cairo',
    description:
      'Leading dental clinic in Cairo specializing in digital occlusion, TMJ treatment, cosmetic dentistry, and dental implants.',
    canonical: SITE_URL + '/',
  },
  about: {
    title: 'About Dr. Haitham Sharshar | Board-Certified Prosthodontist | Cairo',
    description:
      'Dr. Haitham Sharshar is a board-certified prosthodontist and pioneer in digital dental occlusion with over 15 years of experience in Cairo, Egypt.',
    canonical: SITE_URL + '/about',
  },
  services: {
    title: 'Services | Digital Occlusion, TMJ Treatment & Cosmetic Dentistry | HS Clinic',
    description:
      'Advanced dental services including EMG analysis, jaw tracking, T-Scan diagnostics, cosmetic dentistry, dental implants, and full-arch rehabilitation at HS Clinic Cairo.',
    canonical: SITE_URL + '/services',
  },
  technology: {
    title: 'Technology | CBCT, T-Scan, EMG & Digital Smile Design | HS Clinic',
    description:
      'State-of-the-art dental technology at HS Clinic Cairo: CBCT 3D imaging, T-Scan occlusal analysis, EMG diagnostics, and CAD/CAM digital dentistry.',
    canonical: SITE_URL + '/technology',
  },
  dentalTourism: {
    title: 'Dental Tourism in Cairo | Save Up to 90% | HS Clinic Egypt',
    description:
      'Premium dental implants and cosmetic dentistry in Cairo, Egypt. Save 70-90% vs USA/UK prices. German technology, 5-star experience, free virtual consultation.',
    canonical: SITE_URL + '/dental-tourism',
  },
  contact: {
    title: 'Contact HS Clinic | Book Your Appointment in Cairo, Egypt',
    description:
      'Book your dental appointment with Dr. Haitham Sharshar in Cairo, Egypt. WhatsApp consultation available. Located in Zahraa El Maadi, Cairo.',
    canonical: SITE_URL + '/contact',
  },
  digitalSmileDesign: {
    title: 'Digital Smile Design | Luxarian Scientific DSD | HS Clinic Cairo',
    description:
      'Experience luxury scientific Digital Smile Design at HS Clinic Cairo. Golden proportion analysis, 3D mockups, and precision planning for your perfect smile transformation.',
    canonical: SITE_URL + '/digital-smile-design',
  },
  gallery: {
    title: 'Before & After Gallery | Real Patient Transformations | HS Clinic Cairo',
    description:
      'See real before and after dental transformations by Dr. Haitham Sharshar. Full arch rehabilitation, All-on-4 implants, veneers, and cosmetic dentistry results.',
    canonical: SITE_URL + '/gallery',
  },
  dentalImplants: {
    title: 'Dental Implants in Cairo | CBCT-Guided Surgery | Dr. Haitham Sharshar',
    description:
      'Digitally guided dental implant surgery in Cairo, Egypt. CBCT 3D-planned single implants, All-on-4, and full-arch rehabilitation by Dr. Haitham Sharshar. Save 70-90% vs USA/UK.',
    canonical: SITE_URL + '/services/dental-implants',
  },
  tmdTreatment: {
    title: 'TMJ/TMD Treatment Cairo | Jaw Tracking & EMG | Dr. Haitham Sharshar',
    description:
      "The Middle East's most advanced TMD/TMJ neuromuscular treatment. Jaw tracking (Zebris), EMG, TENS, Occlusense, and Neurobite therapy by Dr. Haitham Sharshar in Cairo.",
    canonical: SITE_URL + '/services/tmj-tmd-treatment',
  },
  clearAligners: {
    title: 'Clear Aligners Cairo | Digital Orthodontics | HS Clinic',
    description:
      'Invisible clear aligner therapy with full digital integration at HS Clinic Cairo. 3D treatment planning, occlusal optimization, and predictable results by Dr. Haitham Sharshar.',
    canonical: SITE_URL + '/services/clear-aligners',
  },
  fullArchRehab: {
    title: 'Full Arch Rehabilitation Cairo | Implant-Supported Prosthetics | HS Clinic',
    description:
      'Complete full-arch rehabilitation combining dental implants, prosthetics, and digital occlusal analysis. All-on-4 and full mouth reconstruction in Cairo by Dr. Haitham Sharshar.',
    canonical: SITE_URL + '/services/full-arch-rehabilitation',
  },
  tourismProgram: {
    title: 'Dental Tourism Program | VIP Concierge & Treatment Plans | HS Clinic Cairo',
    description:
      'Complete dental tourism program: VIP airport transfers, luxury accommodation, treatment timelines, and concierge support. Full-service dental travel packages in Cairo, Egypt.',
    canonical: SITE_URL + '/dental-tourism/program',
  },
} as const;

/**
 * FAQ JSON-LD Schema builder.
 * Google shows expandable Q&A rich snippets in search results when this is present.
 * Use on service pages to boost click-through rate.
 */
export function buildFAQJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/** Pre-built FAQ data for the homepage / general pages */
export const HOMEPAGE_FAQS = [
  {
    question: 'What dental services does HS Clinic in Cairo offer?',
    answer:
      'HS Clinic offers dental implants, cosmetic dentistry, TMJ/TMD treatment, digital smile design, full-arch rehabilitation, clear aligners, and Hollywood smile makeovers. All treatments use AI-driven diagnostics and CBCT 3D imaging.',
  },
  {
    question: 'How much do dental implants cost in Egypt compared to the US?',
    answer:
      'Dental implants in Egypt typically cost 70-90% less than in the US or UK, while using the same premium materials (Straumann, Nobel Biocare). A single implant at HS Clinic starts from $400-600 compared to $3,000-5,000 in the US.',
  },
  {
    question: 'Does HS Clinic offer dental tourism packages?',
    answer:
      'Yes. Our dental tourism program includes VIP airport transfers, luxury accommodation arrangements, dedicated treatment coordinators, and comprehensive treatment plans — all designed for international patients visiting Cairo, Egypt.',
  },
  {
    question: 'What is digital occlusion and why does it matter?',
    answer:
      'Digital occlusion uses T-Scan sensors, EMG muscle analysis, and CBCT imaging to precisely measure how your teeth come together. This data-driven approach ensures dental work like implants, crowns, and veneers are functionally perfect — not just aesthetically pleasing.',
  },
  {
    question: 'How do I book an appointment with Dr. Haitham Sharshar?',
    answer:
      'You can book via WhatsApp for instant response, call +201101010599, or use the appointment form on our Contact page. International patients can request a virtual consultation first.',
  },
];

/**
 * Breadcrumb JSON-LD Schema builder.
 * Google shows clickable navigation trails in search results:
 *   Home > Services > Dental Implants
 * This improves CTR and helps Google understand site structure.
 */
export function buildBreadcrumbJsonLd(
  crumbs: readonly { readonly name: string; readonly path: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: SITE_URL + crumb.path,
    })),
  };
}

/** Common breadcrumb paths for reuse across pages */
export const BREADCRUMBS = {
  home: [{ name: 'Home', path: '/' }],
  about: [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ],
  services: [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
  ],
  technology: [
    { name: 'Home', path: '/' },
    { name: 'Technology', path: '/technology' },
  ],
  dentalTourism: [
    { name: 'Home', path: '/' },
    { name: 'Dental Tourism', path: '/dental-tourism' },
  ],
  gallery: [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
  ],
  contact: [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ],
  dsd: [
    { name: 'Home', path: '/' },
    { name: 'Digital Smile Design', path: '/digital-smile-design' },
  ],
} as const;

/** Helper: build service-specific breadcrumbs */
export function serviceBreadcrumbs(serviceName: string, serviceSlug: string) {
  return [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: serviceName, path: `/services/${serviceSlug}` },
  ];
}

/**
 * JSON-LD: MedicalClinic + Dentist schema for Google Rich Results & AI/GEO engines.
 * Dual-typed for maximum schema coverage.
 */
export const LOCAL_BUSINESS_JSONLD = {
  '@context': 'https://schema.org',
  '@type': ['Dentist', 'MedicalClinic'],
  '@id': SITE_URL + '/#clinic',
  name: 'HS Clinic - Dr. Haitham Sharshar',
  alternateName: 'HS Dental Clinic Cairo',
  description:
    "The Middle East's premier digital dentistry center specializing in digital occlusion correction, TMJ/TMD neuromuscular treatment, guided dental implant surgery, Digital Smile Design, and clear aligner therapy. Led by Dr. Haitham Sharshar with 15+ years of clinical experience using jaw tracking, EMG, TENS, and Occlusense diagnostics.",
  url: SITE_URL,
  telephone: '+201101010599',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '8/63, 10th District, Zahraa El Maadi',
    addressLocality: 'Cairo',
    addressRegion: 'Cairo Governorate',
    postalCode: '11742',
    addressCountry: 'EG',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 29.9628,
    longitude: 31.3139,
  },
  image: DEFAULT_OG_IMAGE,
  priceRange: '$$',
  currenciesAccepted: 'EGP, USD, EUR, GBP',
  paymentAccepted: 'Cash, Credit Card, Bank Transfer',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Saturday', 'Sunday'],
      opens: '10:00',
      closes: '22:00',
    },
  ],
  sameAs: [
    'https://www.facebook.com/dentistdrhaithamsharshar/',
    'https://www.instagram.com/hsdental2025/',
    'https://maps.app.goo.gl/bs7YaRkiFgkpbmLRA',
  ],
  medicalSpecialty: ['Dentistry', 'Prosthodontics', 'Periodontology', 'Implantology'],
  knowsAbout: [
    'Digital Occlusion',
    'TMJ/TMD Neuromuscular Treatment',
    'Digital Smile Design',
    'Guided Dental Implant Surgery',
    'Clear Aligner Therapy',
    'Full-Arch Rehabilitation',
    'Jaw Tracking Diagnostics',
    'EMG Analysis',
    'TENS Therapy',
    'Occlusense Pressure Mapping',
    'Neurobite Occlusal Splint',
    'CBCT 3D Imaging',
    'CAD/CAM Dentistry',
  ],
  availableService: [
    {
      '@type': 'MedicalProcedure',
      name: 'Digitally Guided Dental Implant Surgery',
      description:
        'Full digital guided implant placement using CBCT 3D imaging, digital surgical guides, and precision-planned prosthetic outcomes.',
    },
    {
      '@type': 'MedicalProcedure',
      name: 'TMJ/TMD Neuromuscular Treatment',
      description:
        'Advanced temporomandibular joint disorder treatment using jaw tracking, EMG, TENS, Occlusense pressure sensors, and Neurobite occlusal splints.',
    },
    {
      '@type': 'MedicalProcedure',
      name: 'Digital Smile Design (DSD)',
      description:
        'Full digital workflow with pre-simulation before intervention, golden proportion analysis, 3D mockups, and predictable aesthetic outcomes.',
    },
    {
      '@type': 'MedicalProcedure',
      name: 'Clear Aligner Therapy',
      description:
        'Digitally integrated invisible orthodontics with 3D treatment planning and occlusal optimization.',
    },
    {
      '@type': 'MedicalProcedure',
      name: 'Full-Arch Rehabilitation',
      description:
        'Complete oral rehabilitation combining implants, prosthetics, and digital occlusal analysis for full mouth restoration.',
    },
  ],
  areaServed: [
    { '@type': 'Country', name: 'Egypt' },
    { '@type': 'Country', name: 'Saudi Arabia' },
    { '@type': 'Country', name: 'United Arab Emirates' },
    { '@type': 'Country', name: 'Kuwait' },
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'Germany' },
  ],
  isAcceptingNewPatients: true,
  hasMap: 'https://maps.app.goo.gl/bs7YaRkiFgkpbmLRA',
  // NOTE: aggregateRating intentionally omitted.
  // On YMYL medical sites, hardcoded review data without a live on-page review
  // system can trigger a Google manual action. Let your Google Business Profile
  // organically supply star ratings to the Knowledge Panel instead.
};

/**
 * JSON-LD: Organization schema for Google Knowledge Panel.
 * Provides structured logo + social links independently of MedicalClinic type.
 * Google uses this to populate the Knowledge Panel sidebar with logo, name, URL,
 * and social media links.
 */
export const ORGANIZATION_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': SITE_URL + '/#organization',
  name: 'HS Clinic - Dr. Haitham Sharshar',
  alternateName: 'HS Dental Clinic Cairo',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: SITE_URL + '/assets/logo.webp',
    width: 512,
    height: 512,
  },
  image: DEFAULT_OG_IMAGE,
  description:
    "The Middle East's premier digital dentistry center led by Dr. Haitham Sharshar — specializing in digital occlusion, TMJ/TMD treatment, dental implants, and cosmetic dentistry in Cairo, Egypt.",
  telephone: '+201101010599',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '8/63, 10th District, Zahraa El Maadi',
    addressLocality: 'Cairo',
    addressRegion: 'Cairo Governorate',
    postalCode: '11742',
    addressCountry: 'EG',
  },
  sameAs: [
    'https://www.facebook.com/dentistdrhaithamsharshar/',
    'https://www.instagram.com/hsdental2025/',
    'https://maps.app.goo.gl/bs7YaRkiFgkpbmLRA',
  ],
  founder: {
    '@type': 'Person',
    '@id': SITE_URL + '/#doctor',
    name: 'Dr. Haitham Sharshar',
  },
};

/**
 * JSON-LD: Person schema for Dr. Haitham Sharshar.
 * Enriched with credentials, affiliations, and expertise for AI/GEO entity recognition.
 */
export const DOCTOR_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': SITE_URL + '/#doctor',
  name: 'Dr. Haitham Sharshar',
  givenName: 'Haitham',
  familyName: 'Sharshar',
  jobTitle: 'Digital Dentistry Consultant & Perio Implantologist',
  worksFor: {
    '@type': ['Dentist', 'MedicalClinic'],
    '@id': SITE_URL + '/#clinic',
    name: 'HS Clinic',
  },
  url: SITE_URL + '/about',
  image: DEFAULT_OG_IMAGE,
  description:
    "Digital Dentistry Consultant and Perio Implantologist with over 15 years of clinical and academic expertise. The Middle East's leading authority in digital occlusion, TMJ/TMD neuromuscular treatment, and Digital Smile Design. Official JMA-Optic+ Digital Occlusion System Certified Trainer for Zebris Co. (Germany) and Official exocad Certified ICTP Trainer for the Middle East. Pioneer of jaw tracking, EMG, and Occlusense-based bite diagnostics in Cairo, Egypt.",
  knowsAbout: [
    'Digital Dental Occlusion',
    'Temporomandibular Joint Disorders (TMD)',
    'Periodontology',
    'Dental Implantology',
    'Digital Smile Design',
    'Guided Implant Surgery',
    'Full-Arch Case Planning',
    'Jaw Tracking Diagnostics (Zebris JMA-Optic+)',
    'Electromyography (EMG) for Dentistry',
    'TENS Neuromuscular Therapy',
    'Occlusense Digital Bite Analysis',
    'Neurobite Occlusal Splint Therapy',
    'Clear Aligner Orthodontics',
    'Full-Arch Rehabilitation',
    'CAD/CAM Digital Dentistry',
    'CBCT 3D Imaging',
    'exocad CAD Software',
    '2D and 3D Digital Smile Design',
    'Digital Dentistry Quality Control',
  ],
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'Cairo University',
      department: 'Faculty of Dentistry',
    },
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'degree',
      name: 'Bachelor of Dental Surgery (BDS)',
      educationalLevel: 'Bachelor',
      dateCreated: '2010',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'degree',
      name: "Master's Program in Periodontology and Implantology",
      educationalLevel: 'Master',
      recognizedBy: {
        '@type': 'CollegeOrUniversity',
        name: 'Cairo University',
      },
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certification',
      name: 'Official JMA-Optic+ Digital Occlusion System Certified Trainer',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Zebris Medical GmbH',
        address: { '@type': 'PostalAddress', addressCountry: 'DE' },
      },
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certification',
      name: 'Official exocad Certified ICTP Trainer for the Middle East',
      recognizedBy: {
        '@type': 'Organization',
        name: 'exocad GmbH',
      },
    },
  ],
  memberOf: [
    {
      '@type': 'Role',
      roleName: 'Key Opinion Leader & International Trainer',
      memberOf: {
        '@type': 'Organization',
        name: 'Zebris Medical GmbH (Germany)',
      },
      description:
        'Official international trainer for the Middle East for the JMA-Optic+ Digital Occlusion System.',
    },
    {
      '@type': 'Role',
      roleName: 'Key Opinion Leader & Certified Trainer',
      memberOf: {
        '@type': 'Organization',
        name: 'exocad GmbH',
      },
      description:
        'Official exocad ICTP Trainer for the Middle East, teaching digital dentistry workflows worldwide.',
    },
  ],
  award: [
    'Key Opinion Leader — Zebris Medical GmbH (Germany)',
    'Key Opinion Leader — exocad GmbH',
    'International Speaker & Trainer — Digital Dentistry',
  ],
  sameAs: [
    'https://www.facebook.com/dentistdrhaithamsharshar/',
    'https://www.instagram.com/hsdental2025/',
  ],
};

/**
 * Build a LocalBusiness JSON-LD from CMS settings.
 * Falls back to the hardcoded constant for any missing field.
 */
export function buildLocalBusinessJsonLd(settings: {
  clinicName?: string;
  phone?: string;
  address?: string;
  geoLat?: number;
  geoLng?: number;
  socialLinks?: Array<{ platform: string; url: string }>;
}) {
  return {
    ...LOCAL_BUSINESS_JSONLD,
    name: settings.clinicName || LOCAL_BUSINESS_JSONLD.name,
    telephone: settings.phone || LOCAL_BUSINESS_JSONLD.telephone,
    address: {
      '@type': 'PostalAddress' as const,
      streetAddress: settings.address || '8/63, 10th District, Zahraa El Maadi',
      addressLocality: 'Cairo',
      addressRegion: 'Cairo Governorate',
      postalCode: '11742',
      addressCountry: 'EG',
    },
    geo: {
      '@type': 'GeoCoordinates' as const,
      latitude: settings.geoLat ?? LOCAL_BUSINESS_JSONLD.geo.latitude,
      longitude: settings.geoLng ?? LOCAL_BUSINESS_JSONLD.geo.longitude,
    },
    sameAs: settings.socialLinks?.map((s) => s.url) ?? [],
  };
}

/**
 * Build a Person JSON-LD for a team member/doctor from CMS data.
 */
export function buildDoctorJsonLd(doctor: { name: string; role: string; bioExcerpt: string }) {
  return {
    ...DOCTOR_JSONLD,
    name: doctor.name || DOCTOR_JSONLD.name,
    jobTitle: doctor.role || DOCTOR_JSONLD.jobTitle,
    description: doctor.bioExcerpt || DOCTOR_JSONLD.description,
  };
}

/** JSON-LD: Services page — list of offered dental services */
export const SERVICES_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: 'HS Clinic - Dr. Haitham Sharshar',
  url: SITE_URL + '/services',
  medicalSpecialty: 'Dentistry',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Dental Services',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'Digital Occlusion & TMJ',
        description: 'EMG analysis, jaw tracking, T-Scan diagnostics for occlusal optimization.',
      },
      {
        '@type': 'OfferCatalog',
        name: 'Cosmetic Dentistry',
        description: 'Veneers, smile makeovers, aesthetic restorations with Digital Smile Design.',
      },
      {
        '@type': 'OfferCatalog',
        name: 'Dental Implants',
        description:
          'Single implants, All-on-4, full-arch rehabilitation with CBCT-guided planning.',
      },
      {
        '@type': 'OfferCatalog',
        name: 'Full-Arch Rehabilitation',
        description:
          'Complete oral rehabilitation combining implants, prosthetics, and occlusal analysis.',
      },
    ],
  },
};

/**
 * JSON-LD: Technology page — comprehensive diagnostic equipment and methods.
 * Includes all TMD-specific devices for GEO differentiation.
 */
export const TECHNOLOGY_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  '@id': SITE_URL + '/technology#tech',
  name: 'HS Clinic - Advanced Digital Diagnostics',
  url: SITE_URL + '/technology',
  medicalSpecialty: ['Dentistry', 'Prosthodontics'],
  description:
    'Cutting-edge dental diagnostic technology at HS Clinic Cairo: CBCT 3D imaging, T-Scan occlusal analysis, jaw tracking (JT-3D), EMG electromyography, TENS neuromuscular therapy, Occlusense digital pressure mapping, Neurobite occlusal splints, and CAD/CAM digital dentistry.',
  availableService: [
    {
      '@type': 'MedicalProcedure',
      name: 'CBCT 3D Imaging',
      description:
        'Cone beam computed tomography providing precise three-dimensional dental and jaw imaging for implant planning and TMJ assessment.',
      bodyLocation: 'Jaw, teeth, and temporomandibular joint',
    },
    {
      '@type': 'MedicalProcedure',
      name: 'T-Scan Occlusal Analysis',
      description:
        'Digital real-time occlusal force measurement and bite timing analysis to identify premature contacts and occlusal interferences.',
      bodyLocation: 'Dental occlusion',
    },
    {
      '@type': 'MedicalProcedure',
      name: 'EMG Electromyography Diagnostics',
      description:
        'Surface electromyography measuring electrical activity of masticatory muscles (masseter, temporalis) to diagnose muscle dysfunction and hyperactivity in TMD patients.',
      bodyLocation: 'Masticatory muscles',
    },
    {
      '@type': 'MedicalProcedure',
      name: 'Jaw Tracking (JT-3D)',
      description:
        'Three-dimensional digital mandibular tracking recording jaw movement patterns, range of motion, velocity, and trajectory deviations for TMJ dysfunction diagnosis.',
      bodyLocation: 'Mandible and temporomandibular joint',
    },
    {
      '@type': 'MedicalProcedure',
      name: 'TENS Neuromuscular Therapy',
      description:
        'Transcutaneous electrical nerve stimulation (TENS) for relaxing masticatory muscles to find the neuromuscular (myocentric) jaw position, essential for occlusal rehabilitation.',
      bodyLocation: 'Masticatory muscles and trigeminal nerve',
    },
    {
      '@type': 'MedicalProcedure',
      name: 'Occlusense Digital Pressure Mapping',
      description:
        'Wireless digital occlusal pressure sensor providing real-time bite force distribution analysis and pressure mapping for precise occlusal adjustment.',
      bodyLocation: 'Dental occlusion',
    },
    {
      '@type': 'MedicalProcedure',
      name: 'Neurobite Occlusal Splint Therapy',
      description:
        'Advanced neuromuscular occlusal splint (Neurobite) designed from EMG and jaw tracking data to treat TMD, bruxism, and occlusal dysfunction.',
      bodyLocation: 'Dental arches and temporomandibular joint',
    },
    {
      '@type': 'MedicalProcedure',
      name: 'CAD/CAM Digital Dentistry',
      description:
        'Computer-aided design and manufacturing for same-day restorations, crowns, veneers, and prosthetics with sub-millimeter accuracy.',
      bodyLocation: 'Teeth',
    },
  ],
};

/** JSON-LD: Digital Smile Design page — the DSD procedure */
export const DSD_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'MedicalProcedure',
  name: 'Luxarian Scientific Digital Smile Design',
  url: SITE_URL + '/digital-smile-design',
  description:
    'A precision cosmetic planning procedure using golden proportion analysis, 3D mockups, and digital facial mapping to design the perfect smile.',
  procedureType: 'http://schema.org/NoninvasiveProcedure',
  howPerformed:
    'Video analysis → 2D blueprint design → 3D mockup → final try-in with golden proportion verification.',
  preparation: 'Initial consultation and comprehensive digital scanning.',
  bodyLocation: 'Teeth and facial structure',
  status: 'http://schema.org/EventScheduled',
};

// ═══════════════════════════════════════════════════════════════
// NEW SCHEMAS — GEO/AI Dominance Layer
// ═══════════════════════════════════════════════════════════════

/** JSON-LD: Dental Implants — pillar service MedicalProcedure */
export const DENTAL_IMPLANTS_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'MedicalProcedure',
  name: 'Digitally Guided Dental Implant Surgery',
  url: SITE_URL + '/services',
  description:
    'Full digital guided dental implant placement at HS Clinic Cairo. CBCT 3D imaging, digital surgical guide fabrication, and precision-planned prosthetic integration for single implants, All-on-4, and full-arch rehabilitation.',
  procedureType: 'http://schema.org/SurgicalProcedure',
  howPerformed:
    'CBCT 3D scan → digital implant planning → surgical guide 3D printing → guided implant placement → immediate or delayed prosthetic loading.',
  preparation:
    'Comprehensive digital examination including CBCT scan, intraoral scanning, and digital smile design preview.',
  bodyLocation: 'Maxilla and mandible (upper and lower jaw)',
  followup:
    'Post-operative monitoring, osseointegration verification, and final prosthetic delivery.',
  status: 'http://schema.org/EventScheduled',
};

/** JSON-LD: TMD/TMJ Treatment — unique differentiator MedicalProcedure */
export const TMD_TREATMENT_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'MedicalProcedure',
  name: 'Advanced TMD/TMJ Neuromuscular Treatment',
  alternateName: 'Temporomandibular Joint Disorder Treatment',
  url: SITE_URL + '/services',
  description:
    'The most advanced TMD/TMJ treatment protocol in the Middle East. Dr. Haitham Sharshar uses a comprehensive neuromuscular diagnostic approach combining jaw tracking (JT-3D), surface EMG electromyography, TENS transcutaneous electrical nerve stimulation, Occlusense digital pressure mapping, and custom Neurobite occlusal splint therapy to diagnose and treat temporomandibular joint disorders, chronic jaw pain, bruxism, and occlusal dysfunction.',
  procedureType: 'http://schema.org/NoninvasiveProcedure',
  howPerformed:
    'Step 1: Jaw tracking (JT-3D) records mandibular movement patterns → Step 2: Surface EMG measures masticatory muscle activity → Step 3: TENS relaxes muscles to neuromuscular rest position → Step 4: Occlusense maps bite force distribution → Step 5: Custom Neurobite occlusal splint fabricated from collected data → Step 6: Progressive occlusal adjustment and monitoring.',
  preparation:
    'Comprehensive TMJ examination, patient history, CBCT imaging, and baseline EMG/jaw tracking recordings.',
  bodyLocation: 'Temporomandibular joint, masticatory muscles, dental occlusion',
  followup:
    'Periodic EMG and jaw tracking reassessment, splint adjustment, and long-term occlusal maintenance.',
  status: 'http://schema.org/EventScheduled',
  usesDevice: [
    {
      '@type': 'MedicalDevice',
      name: 'Jaw Tracker (JT-3D)',
      description:
        'Three-dimensional digital mandibular tracking system recording jaw movement patterns, range of motion, and trajectory deviations.',
    },
    {
      '@type': 'MedicalDevice',
      name: 'Surface EMG (Electromyography)',
      description:
        'Non-invasive electromyography system measuring electrical activity of masseter and temporalis muscles for TMD diagnosis.',
    },
    {
      '@type': 'MedicalDevice',
      name: 'TENS Unit (Transcutaneous Electrical Nerve Stimulation)',
      description:
        'Ultra-low frequency TENS device for neuromuscular relaxation of masticatory muscles to find the myocentric jaw position.',
    },
    {
      '@type': 'MedicalDevice',
      name: 'Occlusense Pressure Sensor',
      description:
        'Wireless digital sensor for real-time occlusal pressure mapping and bite force distribution analysis.',
    },
    {
      '@type': 'MedicalDevice',
      name: 'Neurobite Occlusal Splint',
      description:
        'Custom-designed neuromuscular occlusal splint fabricated from patient-specific EMG and jaw tracking data for TMJ therapy and bruxism treatment.',
    },
  ],
};

/** JSON-LD: Clear Aligners — pillar service MedicalProcedure */
export const CLEAR_ALIGNERS_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'MedicalProcedure',
  name: 'Digitally Integrated Clear Aligner Therapy',
  url: SITE_URL + '/services',
  description:
    'Invisible orthodontics with full digital integration at HS Clinic Cairo. 3D treatment planning, digital occlusal analysis, and progressive aligner therapy for functional and aesthetic tooth alignment.',
  procedureType: 'http://schema.org/NoninvasiveProcedure',
  howPerformed:
    'Intraoral 3D scan → digital treatment simulation → sequential clear aligner fabrication → progressive tooth movement with periodic digital monitoring → occlusal optimization.',
  preparation:
    'Comprehensive orthodontic assessment, CBCT scan, intraoral scanning, and digital treatment preview.',
  bodyLocation: 'Upper and lower dental arches',
  status: 'http://schema.org/EventScheduled',
};

/**
 * JSON-LD: Dental Tourism page — combined schema array
 * Includes TouristDestination + MedicalClinic reference for international SEO.
 */
export const DENTAL_TOURISM_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  '@id': SITE_URL + '/dental-tourism#tourism',
  name: 'HS Clinic Dental Tourism Program — Cairo, Egypt',
  url: SITE_URL + '/dental-tourism',
  description:
    'Premium dental tourism in Cairo, Egypt. Save 70-90% vs USA/UK prices on dental implants, cosmetic dentistry, and full-arch rehabilitation. German-standard technology, VIP concierge service, free virtual consultation. Led by Dr. Haitham Sharshar.',
  medicalSpecialty: 'Dentistry',
  areaServed: [
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'Country', name: 'Germany' },
    { '@type': 'Country', name: 'Saudi Arabia' },
    { '@type': 'Country', name: 'United Arab Emirates' },
    { '@type': 'Country', name: 'Kuwait' },
    { '@type': 'Country', name: 'Canada' },
    { '@type': 'Country', name: 'Australia' },
  ],
  availableService: [
    {
      '@type': 'MedicalProcedure',
      name: 'Dental Implants for International Patients',
      description:
        'Digitally guided dental implant surgery with travel logistics support and VIP concierge.',
    },
    {
      '@type': 'MedicalProcedure',
      name: 'Digital Smile Design for International Patients',
      description:
        'Virtual consultation and pre-simulation before travel, with full treatment completed in Cairo.',
    },
    {
      '@type': 'MedicalProcedure',
      name: 'Full-Arch Rehabilitation',
      description:
        'Complete oral rehabilitation for dental tourists with structured multi-visit treatment timelines.',
    },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Dental Tourism Packages',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Dental Implant Package',
        description:
          'Single dental implant with abutment and crown, including consultation and follow-up.',
        priceCurrency: 'USD',
        price: '450',
        priceValidUntil: '2027-12-31',
      },
      {
        '@type': 'Offer',
        name: 'All-on-4 Full Arch Package',
        description: 'Full arch rehabilitation with 4 implants and fixed prosthesis.',
        priceCurrency: 'USD',
        price: '5500',
        priceValidUntil: '2027-12-31',
      },
    ],
  },
};

/** JSON-LD: WebSite schema for sitelinks search box & AI entity recognition */
export const WEBSITE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': SITE_URL + '/#website',
  name: SITE_NAME,
  url: SITE_URL,
  publisher: {
    '@type': ['Dentist', 'MedicalClinic'],
    '@id': SITE_URL + '/#clinic',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: SITE_URL + '/services?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
  description:
    "Official website of HS Clinic — Dr. Haitham Sharshar. The Middle East's leading center for digital occlusion, TMD treatment, dental implants, and Digital Smile Design in Cairo, Egypt.",
};

/** JSON-LD: Gallery page — ImageGallery with ItemList */
export const GALLERY_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name: 'Before & After Dental Transformations — HS Clinic',
  url: SITE_URL + '/gallery',
  description:
    'Real patient before and after dental transformations by Dr. Haitham Sharshar at HS Clinic Cairo. Full-arch rehabilitation, All-on-4 implants, veneers, and cosmetic dentistry results.',
  author: {
    '@type': 'Person',
    '@id': SITE_URL + '/#doctor',
    name: 'Dr. Haitham Sharshar',
  },
};

// ═══════════════════════════════════════════════════════════════
// UTILITY BUILDERS — Dynamic schema generation
// ═══════════════════════════════════════════════════════════════

/** Build a FAQPage JSON-LD from an array of question/answer pairs */
export function buildFaqJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// NOTE: buildAggregateRatingJsonLd was removed.
// On YMYL medical sites, fabricated review data triggers Google manual actions.
// Star ratings should come from your Google Business Profile organically.

/**
 * Build hreflang link objects for react-helmet-async.
 * Returns self-referencing `en` + `x-default` tags for the given canonical URL.
 * Important for dental tourism SEO — signals Google that the page targets English-speaking patients globally.
 */
export function buildHreflangTags(canonicalUrl: string) {
  return [
    { rel: 'alternate', hrefLang: 'en', href: canonicalUrl },
    { rel: 'alternate', hrefLang: 'x-default', href: canonicalUrl },
  ];
}
