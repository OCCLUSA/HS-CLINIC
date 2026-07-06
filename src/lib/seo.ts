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
      'Dental clinic in Cairo offering digital occlusion review, TMJ screening, cosmetic dentistry, and dental implants.',
    canonical: SITE_URL + '/',
  },
  about: {
    title: 'About Dr. Haitham Sharshar | Board-Certified Prosthodontist | Cairo',
    description:
      'Dr. Haitham Sharshar is a board-certified prosthodontist using digital dental occlusion records with over 15 years of experience in Cairo, Egypt.',
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
      'Digital dental technology at HS Clinic Cairo: CBCT 3D imaging, T-Scan occlusal analysis, EMG records, and CAD/CAM digital dentistry.',
    canonical: SITE_URL + '/technology',
  },
  dentalTourism: {
    title: 'Dental Tourism in Cairo | Case Review & Travel Planning | HS Clinic Egypt',
    description:
      'Records-first dental tourism planning in Cairo for implants, smile design, crowns, veneers, and full arch care with clinician-reviewed treatment steps.',
    canonical: SITE_URL + '/dental-tourism',
  },
  dentalTourismGulf: {
    title: 'Dental Tourism in Cairo for Gulf Patients | HS Clinic Egypt',
    description:
      'Records-first dental tourism planning in Cairo for Gulf patients considering implants, smile design, crowns, veneers, full arch care, or bite screening.',
    canonical: SITE_URL + '/dental-tourism/gulf',
  },
  dentalTourismSaudi: {
    title: 'Dental Treatment in Cairo for Saudi Patients | HS Clinic Egypt',
    description:
      'Dental tourism planning for Saudi patients travelling to Cairo for implants, crowns, veneers, smile design, full arch rehabilitation, or bite screening.',
    canonical: SITE_URL + '/dental-tourism/saudi-arabia',
  },
  dentalTourismUae: {
    title: 'Dental Treatment in Cairo for UAE Patients | HS Clinic Egypt',
    description:
      'Plan dental care in Cairo from the UAE with records review, clinic visit timing, WhatsApp coordination, and clinician-reviewed treatment steps.',
    canonical: SITE_URL + '/dental-tourism/uae',
  },
  dentalTourismEurope: {
    title: 'Dental Tourism in Cairo for Europe Patients | HS Clinic Egypt',
    description:
      'Practical dental tourism guidance for Europe patients considering Cairo for implants, crowns, veneers, full arch care, smile design, or bite screening.',
    canonical: SITE_URL + '/dental-tourism/europe',
  },
  dentalTourismUk: {
    title: 'Dental Treatment in Cairo for UK Patients | HS Clinic Egypt',
    description:
      'Dental tourism planning for UK patients considering implants, crowns, veneers, full arch rehabilitation, or bite related care in Cairo.',
    canonical: SITE_URL + '/dental-tourism/uk',
  },
  dentalTourismGermany: {
    title: 'Dental Treatment in Cairo for Germany Patients | HS Clinic Egypt',
    description:
      'Records-first dental tourism planning for Germany patients considering implants, crowns, veneers, full arch care, or digital bite assessment in Cairo.',
    canonical: SITE_URL + '/dental-tourism/germany',
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
      'Experience Digital Smile Design at HS Clinic Cairo with golden proportion references, 3D mockups, and clinician-reviewed smile planning.',
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
      'Digitally guided dental implant surgery in Cairo, Egypt. CBCT 3D-planned single implants, All-on-4, and full-arch rehabilitation by Dr. Haitham Sharshar.',
    canonical: SITE_URL + '/services/dental-implants',
  },
  tmdTreatment: {
    title: 'TMJ/TMD Treatment Cairo | Jaw Tracking & EMG | Dr. Haitham Sharshar',
    description:
      'TMJ/TMD screening and bite review in Cairo using jaw tracking (Zebris), EMG records, TENS relaxation records, Occlusense, and Neurobite planning.',
    canonical: SITE_URL + '/services/tmj-tmd-treatment',
  },
  clearAligners: {
    title: 'Clear Aligners Cairo | Digital Orthodontics | HS Clinic',
    description:
      'Clear aligner therapy with digital integration at HS Clinic Cairo. 3D treatment planning, occlusal review, and clinician-led tooth movement planning by Dr. Haitham Sharshar.',
    canonical: SITE_URL + '/services/clear-aligners',
  },
  fullArchRehab: {
    title: 'Full Arch Rehabilitation Cairo | Implant-Supported Prosthetics | HS Clinic',
    description:
      'Full-arch rehabilitation combining dental implants, prosthetics, CBCT-guided records, and digital occlusal review in Cairo by Dr. Haitham Sharshar.',
    canonical: SITE_URL + '/services/full-arch-rehabilitation',
  },
  tourismProgram: {
    title: 'Dental Tourism Program | Case Review & Travel Planning | HS Clinic Cairo',
    description:
      'Dental tourism program in Cairo with records review, treatment timelines, airport transfer coordination, accommodation guidance, and clinician-led planning.',
    canonical: SITE_URL + '/dental-tourism/program',
  },
  guarantee: {
    title: 'Treatment Coverage Terms | HS Clinic Cairo',
    description:
      'Review HS Clinic treatment coverage terms for implants, crowns, veneers, full arch prosthetics, aligners, and splint appliances in Cairo.',
    canonical: SITE_URL + '/guarantee',
  },
  privacyPolicy: {
    title: 'Privacy Policy | HS Clinic Cairo',
    description:
      'Learn how HS Clinic handles website contact details, consultation information, cookies, and patient privacy requests.',
    canonical: SITE_URL + '/privacy-policy',
  },
  termsOfService: {
    title: 'Terms of Service | HS Clinic Cairo',
    description:
      'Read the HS Clinic website terms covering online information, preliminary consultations, treatment consent, pricing estimates, and dental tourism coordination.',
    canonical: SITE_URL + '/terms-of-service',
  },
  medicalDisclaimer: {
    title: 'Medical Disclaimer | HS Clinic Cairo',
    description:
      'HS Clinic website content is educational and does not replace a licensed dental examination, diagnosis, treatment plan, or emergency care.',
    canonical: SITE_URL + '/medical-disclaimer',
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
      'HS Clinic offers dental implants, cosmetic dentistry, TMJ/TMD screening, digital smile design, full-arch rehabilitation, clear aligners, and smile makeovers using digital records and clinician review.',
  },
  {
    question: 'How does dental implant pricing work for international patients?',
    answer:
      'Dental implant pricing depends on CBCT findings, bone volume, number of implants, materials, prosthetic design, and visit timing. HS Clinic provides a case-specific estimate after record review.',
  },
  {
    question: 'Does HS Clinic offer dental tourism packages?',
    answer:
      'Yes. The dental tourism program can include airport transfer coordination, accommodation guidance, a dedicated coordinator, and clinician-reviewed treatment timelines for patients visiting Cairo, Egypt.',
  },
  {
    question: 'What is digital occlusion and why does it matter?',
    answer:
      'Digital occlusion uses T-Scan sensors, muscle screening, and CBCT imaging to review how your teeth come together. These records support clinician-led planning for implants, crowns, and veneers.',
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
    'Digital dentistry clinic in Cairo offering digital occlusion review, TMJ/TMD screening, guided dental implant planning, Digital Smile Design, and clear aligner therapy. Led by Dr. Haitham Sharshar with 15+ years of clinical experience using jaw tracking, EMG, TENS, and Occlusense records.',
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
  priceRange: 'Case-specific',
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
        'Guided implant planning using CBCT 3D imaging, digital surgical guides, and clinician-reviewed prosthetic steps.',
    },
    {
      '@type': 'MedicalProcedure',
      name: 'TMJ/TMD Neuromuscular Treatment',
      description:
        'TMJ/TMD screening and splint planning using jaw tracking, EMG records, TENS relaxation records, Occlusense pressure sensors, and Neurobite occlusal splints.',
    },
    {
      '@type': 'MedicalProcedure',
      name: 'Digital Smile Design (DSD)',
      description:
        'Digital workflow with pre-simulation before intervention, golden proportion references, 3D mockups, and clinician-reviewed aesthetic planning.',
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
    'Digital dentistry clinic led by Dr. Haitham Sharshar, offering digital occlusion review, TMJ/TMD screening, dental implants, and cosmetic dentistry in Cairo, Egypt.',
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
    'Digital Dentistry Consultant and Perio Implantologist with over 15 years of clinical and academic expertise. Official JMA-Optic+ Digital Occlusion System Certified Trainer for Zebris Co. (Germany) and Official exocad Certified ICTP Trainer for the Middle East, using jaw tracking, EMG, and Occlusense records for clinician-led bite review in Cairo, Egypt.',
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
    'Digital dental record technology at HS Clinic Cairo: CBCT 3D imaging, T-Scan occlusal analysis, jaw tracking (JT-3D), EMG electromyography, TENS relaxation records, Occlusense digital pressure mapping, Neurobite occlusal splints, and CAD/CAM digital dentistry.',
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
        'Surface electromyography measuring electrical activity of masticatory muscles (masseter, temporalis) to support clinician review of muscle activity patterns in TMD screening.',
      bodyLocation: 'Masticatory muscles',
    },
    {
      '@type': 'MedicalProcedure',
      name: 'Jaw Tracking (JT-3D)',
      description:
        'Three-dimensional digital mandibular tracking recording jaw movement patterns, range of motion, velocity, and trajectory deviations for clinician-led TMJ review.',
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
        'Neuromuscular occlusal splint (Neurobite) designed from EMG and jaw tracking records to support clinician-led TMD, bruxism, and occlusal review.',
      bodyLocation: 'Dental arches and temporomandibular joint',
    },
    {
      '@type': 'MedicalProcedure',
      name: 'CAD/CAM Digital Dentistry',
      description:
        'Computer-aided design and manufacturing for case-dependent restorations, crowns, veneers, and prosthetics supported by digital records.',
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
    'A cosmetic planning procedure using golden proportion references, 3D mockups, and digital facial mapping to support clinician-reviewed smile design.',
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
    'Guided dental implant planning at HS Clinic Cairo. CBCT 3D imaging, digital surgical guide fabrication, and clinician-reviewed prosthetic integration for single implants, All-on-4, and full-arch rehabilitation.',
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
    'TMJ/TMD screening and bite review workflow in Cairo. Dr. Haitham Sharshar uses jaw tracking (JT-3D), surface EMG electromyography, TENS relaxation records, Occlusense digital pressure mapping, and custom Neurobite splint planning as clinician-reviewed decision support for jaw pain, bruxism, and occlusal concerns.',
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
        'Non-invasive electromyography system measuring electrical activity of masseter and temporalis muscles for TMD screening review.',
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
        'Custom-designed neuromuscular occlusal splint fabricated from patient-specific EMG and jaw tracking records to support TMJ therapy and bruxism care.',
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
    'Dental tourism planning in Cairo, Egypt for implants, cosmetic dentistry, and full-arch rehabilitation with records review, travel coordination, and clinician-led treatment planning. Led by Dr. Haitham Sharshar.',
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
        'Digitally guided dental implant surgery with travel coordination and clinician-reviewed planning.',
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
    name: 'Dental Tourism Planning Options',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Dental Implant Case Review',
        description:
          'Records review for single implant planning, visit timing, prosthetic needs, and follow-up steps.',
      },
      {
        '@type': 'Offer',
        name: 'Full-Arch Rehabilitation Case Review',
        description:
          'Records review for full arch rehabilitation planning, expected visits, temporary teeth eligibility, and final prosthetic steps.',
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
    'Official website of HS Clinic - Dr. Haitham Sharshar. Digital occlusion review, TMD screening, dental implants, and Digital Smile Design in Cairo, Egypt.',
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
