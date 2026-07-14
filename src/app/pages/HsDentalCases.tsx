import { FileCheck2, LockKeyhole, MessageCircle, ShieldCheck } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { buildHreflangTags, DEFAULT_OG_IMAGE, SEO, SITE_NAME, SITE_URL } from '@/lib/seo';
import {
  CaseComparisonSlider,
  type CaseComparisonSliderProps,
} from '@/app/components/cases/CaseComparisonSlider';
import case154Before from '@/assets/cases/dr-haitham-sharshar-cairo-upper-right-central-lateral-incisor-guided-implant-smile-makeover-before-154.webp';
import case154After from '@/assets/cases/dr-haitham-sharshar-cairo-upper-right-central-lateral-incisor-guided-implant-smile-makeover-after-154.webp';
import case155Before from '@/assets/cases/dr-haitham-sharshar-cairo-missing-left-lateral-incisor-smile-makeover-before-155.webp';
import case155After from '@/assets/cases/dr-haitham-sharshar-cairo-missing-left-lateral-incisor-smile-makeover-after-155.webp';
import case156Before from '@/assets/cases/dr-haitham-sharshar-cairo-missing-left-anterior-tooth-digital-smile-rehabilitation-before-156.webp';
import case156After from '@/assets/cases/dr-haitham-sharshar-cairo-missing-left-anterior-tooth-digital-smile-rehabilitation-after-156.webp';
import case157Before from '@/assets/cases/dr-haitham-sharshar-cairo-crowding-discoloration-digital-smile-makeover-before-157.webp';
import case157After from '@/assets/cases/dr-haitham-sharshar-cairo-crowding-discoloration-digital-smile-makeover-after-157.webp';
import case158Before from '@/assets/cases/dr-haitham-sharshar-cairo-missing-left-central-lateral-incisor-anterior-implant-smile-before-158.webp';
import case158After from '@/assets/cases/dr-haitham-sharshar-cairo-missing-left-central-lateral-incisor-anterior-implant-smile-after-158.webp';
import case159Before from '@/assets/cases/dr-haitham-sharshar-cairo-six-anterior-teeth-smile-design-digital-occlusion-before-159.webp';
import case159After from '@/assets/cases/dr-haitham-sharshar-cairo-six-anterior-teeth-smile-design-digital-occlusion-after-159.webp';
import case160Before from '@/assets/cases/dr-haitham-sharshar-cairo-gummy-smile-short-teeth-digital-smile-makeover-before-160.webp';
import case160After from '@/assets/cases/dr-haitham-sharshar-cairo-gummy-smile-short-teeth-digital-smile-makeover-after-160.webp';
import case161Before from '@/assets/cases/dr-haitham-sharshar-cairo-missing-right-central-lower-lateral-incisor-smile-rehabilitation-before-161.webp';
import case161After from '@/assets/cases/dr-haitham-sharshar-cairo-missing-right-central-lower-lateral-incisor-smile-rehabilitation-after-161.webp';
import case162Before from '@/assets/cases/dr-haitham-sharshar-cairo-natural-smile-design-digital-occlusion-makeover-before-162.webp';
import case162After from '@/assets/cases/dr-haitham-sharshar-cairo-natural-smile-design-digital-occlusion-makeover-after-162.webp';
import case163Before from '@/assets/cases/dr-haitham-sharshar-cairo-dental-implant-smile-rehabilitation-digital-occlusion-before-163.webp';
import case163After from '@/assets/cases/dr-haitham-sharshar-cairo-dental-implant-smile-rehabilitation-digital-occlusion-after-163.webp';

type PublishableCase = CaseComparisonSliderProps & {
  id: string;
  ownerApproved: true;
  publicationConsentConfirmed: true;
  clinicianCaptionApproved: true;
  imageAuthenticityConfirmed: true;
};

const approvedCaseCaption =
  'Approved clinical documentation shown as an unaltered before-and-after comparison. Treatment planning and outcomes are individual.';

const publishedCases: PublishableCase[] = [
  {
    id: '154',
    caseTitle: 'HS Dental Case 154',
    before: { src: case154Before, alt: 'HS Dental Case 154 before treatment' },
    after: { src: case154After, alt: 'HS Dental Case 154 after treatment' },
    width: 940,
    height: 944,
    caption: approvedCaseCaption,
    ownerApproved: true,
    publicationConsentConfirmed: true,
    clinicianCaptionApproved: true,
    imageAuthenticityConfirmed: true,
  },
  {
    id: '155',
    caseTitle: 'HS Dental Case 155',
    before: { src: case155Before, alt: 'HS Dental Case 155 before treatment' },
    after: { src: case155After, alt: 'HS Dental Case 155 after treatment' },
    width: 940,
    height: 842,
    caption: approvedCaseCaption,
    ownerApproved: true,
    publicationConsentConfirmed: true,
    clinicianCaptionApproved: true,
    imageAuthenticityConfirmed: true,
  },
  {
    id: '156',
    caseTitle: 'HS Dental Case 156',
    before: { src: case156Before, alt: 'HS Dental Case 156 before treatment' },
    after: { src: case156After, alt: 'HS Dental Case 156 after treatment' },
    width: 940,
    height: 852,
    caption: approvedCaseCaption,
    ownerApproved: true,
    publicationConsentConfirmed: true,
    clinicianCaptionApproved: true,
    imageAuthenticityConfirmed: true,
  },
  {
    id: '157',
    caseTitle: 'HS Dental Case 157',
    before: { src: case157Before, alt: 'HS Dental Case 157 before treatment' },
    after: { src: case157After, alt: 'HS Dental Case 157 after treatment' },
    width: 940,
    height: 899,
    caption: approvedCaseCaption,
    ownerApproved: true,
    publicationConsentConfirmed: true,
    clinicianCaptionApproved: true,
    imageAuthenticityConfirmed: true,
  },
  {
    id: '158',
    caseTitle: 'HS Dental Case 158',
    before: { src: case158Before, alt: 'HS Dental Case 158 before treatment' },
    after: { src: case158After, alt: 'HS Dental Case 158 after treatment' },
    width: 940,
    height: 1023,
    caption: approvedCaseCaption,
    ownerApproved: true,
    publicationConsentConfirmed: true,
    clinicianCaptionApproved: true,
    imageAuthenticityConfirmed: true,
  },
  {
    id: '159',
    caseTitle: 'HS Dental Case 159',
    before: { src: case159Before, alt: 'HS Dental Case 159 before treatment' },
    after: { src: case159After, alt: 'HS Dental Case 159 after treatment' },
    width: 940,
    height: 1576,
    caption: approvedCaseCaption,
    ownerApproved: true,
    publicationConsentConfirmed: true,
    clinicianCaptionApproved: true,
    imageAuthenticityConfirmed: true,
  },
  {
    id: '160',
    caseTitle: 'HS Dental Case 160',
    before: { src: case160Before, alt: 'HS Dental Case 160 before treatment' },
    after: { src: case160After, alt: 'HS Dental Case 160 after treatment' },
    width: 940,
    height: 850,
    caption: approvedCaseCaption,
    ownerApproved: true,
    publicationConsentConfirmed: true,
    clinicianCaptionApproved: true,
    imageAuthenticityConfirmed: true,
  },
  {
    id: '161',
    caseTitle: 'HS Dental Case 161',
    before: { src: case161Before, alt: 'HS Dental Case 161 before treatment' },
    after: { src: case161After, alt: 'HS Dental Case 161 after treatment' },
    width: 940,
    height: 843,
    caption: approvedCaseCaption,
    ownerApproved: true,
    publicationConsentConfirmed: true,
    clinicianCaptionApproved: true,
    imageAuthenticityConfirmed: true,
  },
  {
    id: '162',
    caseTitle: 'HS Dental Case 162',
    before: { src: case162Before, alt: 'HS Dental Case 162 before treatment' },
    after: { src: case162After, alt: 'HS Dental Case 162 after treatment' },
    width: 940,
    height: 870,
    caption: approvedCaseCaption,
    ownerApproved: true,
    publicationConsentConfirmed: true,
    clinicianCaptionApproved: true,
    imageAuthenticityConfirmed: true,
  },
  {
    id: '163',
    caseTitle: 'HS Dental Case 163',
    before: { src: case163Before, alt: 'HS Dental Case 163 before treatment' },
    after: { src: case163After, alt: 'HS Dental Case 163 after treatment' },
    width: 940,
    height: 902,
    caption: approvedCaseCaption,
    ownerApproved: true,
    publicationConsentConfirmed: true,
    clinicianCaptionApproved: true,
    imageAuthenticityConfirmed: true,
  },
];

const gallerySchema = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name: 'HS Dental Cases',
  description: SEO.gallery.description,
  url: SEO.gallery.canonical,
  numberOfItems: publishedCases.length,
  associatedMedia: publishedCases.flatMap((caseItem) => [
    {
      '@type': 'ImageObject',
      contentUrl: new URL(caseItem.before.src, SITE_URL).href,
      caption: caseItem.before.alt,
    },
    {
      '@type': 'ImageObject',
      contentUrl: new URL(caseItem.after.src, SITE_URL).href,
      caption: caseItem.after.alt,
    },
  ]),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'HS Dental Cases',
      item: SEO.gallery.canonical,
    },
  ],
};

export function HsDentalCases() {
  return (
    <div className="bg-dark-950 min-h-screen overflow-hidden text-white">
      <Helmet>
        <title>{SEO.gallery.title}</title>
        <meta name="description" content={SEO.gallery.description} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href={SEO.gallery.canonical} />
        {buildHreflangTags(SEO.gallery.canonical).map((tag) => (
          <link key={tag.hrefLang} {...tag} />
        ))}
        <meta property="og:title" content={SEO.gallery.title} />
        <meta property="og:description" content={SEO.gallery.description} />
        <meta property="og:url" content={SEO.gallery.canonical} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:alt" content="HS Clinic Cairo" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.gallery.title} />
        <meta name="twitter:description" content={SEO.gallery.description} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(gallerySchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <section className="relative px-4 pt-32 pb-20 text-center sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(197,165,90,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(197,165,90,0.04)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        <div className="bg-gold-400/10 absolute top-0 left-1/2 h-80 w-[42rem] max-w-full -translate-x-1/2 rounded-full blur-[140px]" />
        <div className="relative mx-auto max-w-4xl">
          <p className="cinematic-hairline text-gold-300 inline-block text-sm font-semibold uppercase tracking-[0.28em]">
            Consent before display
          </p>
          <h1 className="mt-5 font-serif text-5xl font-bold md:text-7xl">HS Dental Cases</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300">
            Clinician-reviewed case documentation, presented one patient journey at a time with
            clear context and no promise that another patient will have the same result.
          </p>
        </div>
      </section>

      {publishedCases.length > 0 && (
        <section className="px-4 pb-20 sm:px-6 lg:px-8" aria-label="Approved dental cases">
          <div className="mx-auto grid max-w-[620px] gap-10">
            {publishedCases.map((caseItem) => (
              <CaseComparisonSlider key={caseItem.id} {...caseItem} />
            ))}
          </div>
        </section>
      )}

      <section className="px-4 pb-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-10">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: LockKeyhole,
                title: 'Publication consent',
                text: 'No patient case is published without owner-confirmed consent and publication rights.',
              },
              {
                icon: FileCheck2,
                title: 'Clinical context',
                text: 'Captions must describe the visible treatment journey without diagnosis claims or guarantees.',
              },
              {
                icon: ShieldCheck,
                title: 'Unaltered comparison',
                text: 'Clinical photographs will not be reshaped, recoloured, retouched, or generatively changed.',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="cinematic-card rounded-2xl border border-white/10 bg-black/20 p-6">
                  <Icon className="text-gold-400 h-7 w-7" />
                  <h2 className="mt-4 font-serif text-xl text-white">{item.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-gray-400">{item.text}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-8 border-t border-white/10 pt-8 text-center">
            <p className="text-sm leading-6 text-gray-400">
              These approved comparisons document individual patient journeys. They are not a
              diagnosis, treatment recommendation, or promise of a similar result.
            </p>
            <Link
              to="/send-your-records"
              className="bg-gold-400 text-dark-950 mt-6 inline-flex min-h-12 items-center gap-3 rounded-xl px-6 py-3 font-bold transition duration-200 hover:bg-white active:scale-[0.98]"
            >
              <MessageCircle className="h-5 w-5" />
              Start a records review on WhatsApp
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
