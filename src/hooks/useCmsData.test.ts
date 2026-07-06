import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import {
  hasPatientUnsafeCopy,
  useFaqs,
  useHero,
  useServicePillar,
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

    expect(result.current.pillar.heroTitle).toBe('Digitally Guided Dental Implant Surgery in Cairo');
    expect(result.current.pillar.heroSubtitle).toContain('clinician-reviewed prosthetic planning');
    expect(result.current.pillar.ctaPrimary).toBe('Request Case Review');
    expect(result.current.pillar.faqs[0].answer).toContain('case-specific');
    expect(result.current.pillar.benefits[0].title).toBe('Single Tooth Implants');
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
    expect(result.current.ctaText).toBe('Book a Consultation');
    expect(result.current.backgroundImageAlt).toBe('Digital dentistry clinic interior');
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
        },
      ],
      loading: false,
      error: null,
    });

    const { result } = renderHook(() => useTestimonials());

    expect(result.current.testimonials).toHaveLength(1);
    expect(result.current.testimonials[0].name).toBe('Reviewed Review');
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

    expect(result.current.pricing[0].egyptPrice).toBe('Case estimate after records review');
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

    expect(result.current.faqs[0].question).toBe('Is dental treatment in Egypt safe?');
    expect(result.current.faqs[0].answer).toContain('infection-control protocols');
  });

  it('falls back to reviewed tourism settings when CMS page settings contain unsafe words', () => {
    mockUseSanityQuery.mockReturnValue({
      data: [
        {
          _id: 'unsafe-tourism-settings',
          _type: 'tourismSettings',
          heroTitle: 'Luxury Dental Tourism',
          timelineSteps: [
            {
              step: '01',
              title: 'VIP Arrival',
              description: 'Same-day permanent teeth with perfect results.',
            },
          ],
          residences: [
            {
              name: 'VIP Suite',
              subtitle: 'Nile',
              stars: 5,
              description: 'Luxury recovery suite.',
            },
          ],
        },
      ],
      loading: false,
      error: null,
    });

    const { result } = renderHook(() => useTourismSettings());

    expect(result.current.tourism.heroTitle).toBe('Planned Implant Care.');
    expect(result.current.tourism.timelineSteps[0].description).toContain('Share dental records');
    expect(result.current.tourism.residences[0].name).toBe('St. Regis Cairo');
  });
});
