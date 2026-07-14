import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import {
  hasPatientUnsafeCopy,
  useFaqs,
  useHero,
  useServices,
  useServiceBySlug,
  useServicePillar,
  useSiteSettings,
  useBeforeAfterCases,
  useTestimonials,
  useTourismPricing,
  useTourismSettings,
} from '@/hooks/useCmsData';
import { useSanityQuery } from '@/hooks/useSanity';

vi.mock('@/hooks/useSanity', () => ({
  useSanityImage: vi.fn(),
  useSanityQuery: vi.fn(),
}));

const mockUseSanityQuery = vi.mocked(useSanityQuery);

describe('CMS patient safety guard', () => {
  beforeEach(() => {
    mockUseSanityQuery.mockReset();
  });

  it('detects absolute patient promise wording inside nested CMS data', () => {
    expect(
      hasPatientUnsafeCopy({
        heroSubtitle: 'World-class implant care with permanent teeth and zero guesswork.',
      })
    ).toBe(true);
    expect(hasPatientUnsafeCopy('99.9% success rate after AI diagnosis')).toBe(true);
  });

  it('requires both owner and clinical-copy approval before CMS hero wording can appear', () => {
    mockUseSanityQuery.mockReturnValue({
      data: {
        _id: 'owner-only-hero',
        _type: 'hero',
        title: 'Owner approved only',
        subtitle: 'This copy has not completed clinical wording review.',
        ctaText: 'Contact',
        ctaLink: '/contact',
        ownerApproved: true,
      },
      loading: false,
      error: null,
    });

    const { result } = renderHook(() => useHero());

    expect(result.current.title).toBe('Plan Your Confident Smile');
    expect(result.current.ctaText).toBe('Start With Your Records');
  });

  it('keeps unapproved CMS service claims out of public service cards and detail pages', () => {
    mockUseSanityQuery.mockReturnValue({
      data: [
        {
          _id: 'unapproved-service',
          _type: 'service',
          slug: 'tmj-occlusion',
          title: 'Advanced TMJ Care',
          description: 'Advanced neuromuscular diagnostics for chronic jaw pain.',
          image: { asset: { _ref: 'image-patient', _type: 'reference' } },
        },
      ],
      loading: false,
      error: null,
    });

    const { result: collection } = renderHook(() => useServices());
    const { result: detail } = renderHook(() => useServiceBySlug('tmj-occlusion'));

    expect(collection.current.services[0].title).toBe('Bite Contact Records');
    expect(detail.current.service).toBeNull();
  });

  it('keeps unapproved CMS hero copy out while restoring the exact owner-approved homepage photo', () => {
    mockUseSanityQuery.mockReturnValue({
      data: {
        _id: 'unapproved-hero',
        _type: 'hero',
        title: 'Unapproved CMS headline',
        subtitle: 'Unapproved CMS treatment wording.',
        ctaText: 'Unapproved action',
        ctaLink: '/unapproved-path',
        backgroundImage: { asset: { _ref: 'image-patient', _type: 'reference' } },
        backgroundImageAlt: 'Dentist scanning a patient',
      },
      loading: false,
      error: null,
    });

    const { result } = renderHook(() => useHero());

    expect(result.current.title).toBe('Plan Your Confident Smile');
    expect(result.current.subtitle).toContain('clinician review');
    expect(result.current.ctaText).toBe('Start With Your Records');
    expect(result.current.ctaLink).toBe('/send-your-records');
    expect(result.current.backgroundImage).toEqual({
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-14598198071ac7b5008ac148b0226e8296b6f68a-2752x1536-webp',
      },
    });
    expect(result.current.backgroundImageAlt).toBe(
      'Dental consultation with digital jaw imaging at HS Clinic Cairo'
    );
  });

  it('keeps unapproved clinic contact and social-preview settings out of public pages', () => {
    mockUseSanityQuery.mockReturnValue({
      data: [
        {
          _id: 'unapproved-settings',
          _type: 'siteSettings',
          clinicName: 'Unverified Clinic Name',
          phone: '+000000000',
          address: 'Unverified address',
          ogImage: { asset: { _ref: 'image-person', _type: 'reference' } },
          ogImageAlt: 'Person in clinic',
        },
      ],
      loading: false,
      error: null,
    });

    const { result } = renderHook(() => useSiteSettings());

    expect(result.current.settings.clinicName).toBe('HS Clinic');
    expect(result.current.settings.phone).toBe('+201101010599');
    expect(result.current.settings.ogImage).toBeNull();
  });

  it('keeps safe service pillar CMS wording', () => {
    mockUseSanityQuery.mockReturnValue({
      data: [
        {
          _id: 'safe-service-pillar',
          _type: 'servicePillar',
          slug: { current: 'dental-implants' },
          serviceTitle: 'Dental Implants',
          heroTitle: 'Implant Case Review in Cairo',
          heroSubtitle: 'Records are reviewed before implant timing and estimate requirements are discussed.',
          faqs: [
            {
              question: 'How is timing reviewed?',
              answer: 'Timing depends on CBCT records, bone, bite, healing needs, and clinician review.',
            },
          ],
          benefits: [
            {
              title: 'Records first',
              description: 'CBCT and prosthetic needs guide the treatment discussion.',
            },
          ],
          technologies: [
            {
              name: 'CBCT review',
              description: '3D records support clinician-led implant planning.',
            },
          ],
          ctaPrimary: 'Request Case Review',
          ctaSecondary: 'Review Travel Timing',
          ownerApproved: true,
          clinicianCopyApproved: true,
        },
      ],
      loading: false,
      error: null,
    });

    const { result } = renderHook(() => useServicePillar('dental-implants'));

    expect(result.current.pillar.heroTitle).toBe('Implant Case Review in Cairo');
    expect(result.current.pillar.ctaPrimary).toBe('Request Case Review');
    expect(result.current.pillar.faqs).toHaveLength(1);
  });

  it('does not publish an unapproved service-pillar image even when its copy is approved', () => {
    mockUseSanityQuery.mockReturnValue({
      data: [
        {
          _id: 'safe-copy-unapproved-image',
          _type: 'servicePillar',
          slug: { current: 'dental-implants' },
          ownerApproved: true,
          clinicianCopyApproved: true,
          heroTitle: 'Implant Case Review in Cairo',
          heroSubtitle: 'Records are reviewed before treatment options are discussed.',
          heroImage: { asset: { _ref: 'image-person', _type: 'reference' } },
        },
      ],
      loading: false,
      error: null,
    });

    const { result } = renderHook(() => useServicePillar('dental-implants'));

    expect(result.current.pillar.heroImage).toBeUndefined();
  });

  it('falls back to reviewed defaults when CMS service copy has unsafe promises', () => {
    mockUseSanityQuery.mockReturnValue({
      data: [
        {
          _id: 'unsafe-service-pillar',
          _type: 'servicePillar',
          slug: { current: 'dental-implants' },
          serviceTitle: 'Dental Implants',
          heroTitle: 'World-Class Implants',
          heroSubtitle: 'Permanent teeth with zero guesswork and perfectly predictable results.',
          faqs: [
            {
              question: 'Can I get same-day teeth?',
              answer: 'Premium patients receive same-day permanent teeth.',
            },
          ],
          benefits: [
            {
              title: 'Elite care',
              description: 'Designed to last a lifetime.',
            },
          ],
          technologies: [
            {
              name: 'Guide',
              description: 'Guarantees the exact planned position.',
            },
          ],
          ctaPrimary: 'Book Free Consultation',
          ctaSecondary: 'Premium Dental Tourism',
        },
      ],
      loading: false,
      error: null,
    });

    const { result } = renderHook(() => useServicePillar('dental-implants'));

    expect(result.current.pillar.heroTitle).toBe('Dental Implant Planning in Cairo');
    expect(result.current.pillar.heroSubtitle).toContain('Final suitability');
    expect(result.current.pillar.ctaPrimary).toBe('Request Case Review');
    expect(result.current.pillar.faqs[0].answer).toContain('case-specific');
    expect(result.current.pillar.benefits[0].title).toBe('Single tooth review');
  });

  it('keeps every service-pillar fallback free of fixed pathways and outcome claims', () => {
    mockUseSanityQuery.mockReturnValue({
      data: [],
      loading: false,
      error: null,
    });

    const slugs = [
      'dental-implants',
      'tmj-tmd-treatment',
      'clear-aligners',
      'full-arch-rehabilitation',
    ];

    for (const slug of slugs) {
      const { result, unmount } = renderHook(() => useServicePillar(slug));
      const publicCopy = JSON.stringify(result.current.pillar);

      expect(publicCopy).not.toMatch(
        /ideal for|treatment of choice|clinically proven|see your results in advance|precise occlusal adjustment|myocentric|quality controlled|fixed visit|completed in a single session/i
      );
      unmount();
    }
  });
  it('falls back to reviewed homepage hero copy when CMS hero has unsafe marketing words', () => {
    mockUseSanityQuery.mockReturnValue({
      data: {
        _id: 'unsafe-hero',
        _type: 'hero',
        title: 'Luxury Smile Design and VIP Implants',
        subtitle: 'World-class treatment at a fraction of the price.',
        ctaText: 'Book Free Consultation',
        ctaLink: '/contact',
        backgroundImageAlt: 'Luxury dental suite',
      },
      loading: false,
      error: null,
    });

    const { result } = renderHook(() => useHero());

    expect(result.current.title).toBe('Plan Your Confident Smile');
    expect(result.current.subtitle).toContain('clinician review');
    expect(result.current.ctaText).toBe('Start With Your Records');
    expect(result.current.backgroundImageAlt).toBe(
      'Dental consultation with digital jaw imaging at HS Clinic Cairo'
    );
  });

  it('filters unsafe testimonials before they can show on patient pages', () => {
    mockUseSanityQuery.mockReturnValue({
      data: [
        {
          _id: 'unsafe-testimonial',
          _type: 'testimonial',
          name: 'Old Review',
          text: 'VIP world-class care with unmatched results.',
          stars: 5,
        },
        {
          _id: 'safe-testimonial',
          _type: 'testimonial',
          name: 'Reviewed Review',
          text: 'The clinic explained records, timing, and follow-up steps clearly.',
          stars: 5,
          publicationConsentConfirmed: true,
          ownerApproved: true,
        },
      ],
      loading: false,
      error: null,
    });

    const { result } = renderHook(() => useTestimonials());

    expect(result.current.testimonials).toHaveLength(1);
    expect(result.current.testimonials[0].name).toBe('Reviewed Review');
  });

  it('keeps patient cases unpublished without explicit owner approval', () => {
    mockUseSanityQuery.mockReturnValue({
      data: [
        {
          _id: 'unapproved-case',
          _type: 'beforeAfterCase',
          label: 'Unapproved case',
          beforeImage: { asset: { _ref: 'image-before', _type: 'reference' } },
          afterImage: { asset: { _ref: 'image-after', _type: 'reference' } },
          publicationConsentConfirmed: true,
          imageAuthenticityConfirmed: true,
          clinicianCaptionApproved: true,
          ownerApproved: false,
        },
      ],
      loading: false,
      error: null,
    });

    const { result } = renderHook(() => useBeforeAfterCases());

    expect(result.current.cases).toEqual([]);
  });

  it('falls back to reviewed tourism pricing when CMS rows show fixed prices or savings', () => {
    mockUseSanityQuery.mockReturnValue({
      data: [
        {
          _id: 'unsafe-price',
          _type: 'tourismPricing',
          treatment: 'Single Implant',
          egyptPrice: '$900',
          usaPrice: '$4,500',
          ukPrice: '$3,500',
          saving: 'Up to 86% savings',
        },
      ],
      loading: false,
      error: null,
    });

    const { result } = renderHook(() => useTourismPricing());

    expect(result.current.pricing[0].egyptPrice).toBe('Ask for a case-specific estimate');
    expect(result.current.pricing[0].saving).toBe('Case-by-case review');
  });

  it('falls back to reviewed FAQs when CMS questions promise warranty coverage', () => {
    mockUseSanityQuery.mockReturnValue({
      data: [
        {
          _id: 'unsafe-faq',
          _type: 'faq',
          question: 'What warranty do I get?',
          answer: 'Lifetime warranty and guaranteed implant results are included.',
        },
      ],
      loading: false,
      error: null,
    });

    const { result } = renderHook(() => useFaqs());

    expect(result.current.faqs[0].question).toBe('Is online records review a final treatment plan?');
    expect(result.current.faqs[0].answer).toContain('preliminary');
  });

  it('falls back to reviewed tourism settings when CMS page settings lack owner approval', () => {
    mockUseSanityQuery.mockReturnValue({
      data: [
        {
          _id: 'unapproved-tourism-settings',
          _type: 'tourismSettings',
          heroTitle: 'Unapproved travel page title',
          timelineSteps: [
            {
              step: '01',
              title: 'Unapproved first stage',
              description: 'Unapproved but otherwise bounded copy.',
            },
          ],
          residences: [
            {
              name: 'Unapproved accommodation',
              subtitle: 'Nile',
              stars: 0,
              description: 'Unapproved accommodation wording.',
            },
          ],
        },
      ],
      loading: false,
      error: null,
    });

    const { result } = renderHook(() => useTourismSettings());

    expect(result.current.tourism.heroTitle).toBe('Planned Implant Care.');
    expect(result.current.tourism.timelineSteps[0].description).toContain(
      'preliminary clinician review'
    );
    expect(result.current.tourism.residences[0].name).toBe(
      'Choose accommodation after review'
    );
  });
});
