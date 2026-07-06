import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { hasPatientUnsafeCopy, useServicePillar } from '@/hooks/useCmsData';
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
});