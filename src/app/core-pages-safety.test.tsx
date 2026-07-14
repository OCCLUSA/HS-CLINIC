import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/hooks/useCmsData', () => ({
  useServices: () => ({
    services: [
      {
        _id: 'safe-service',
        title: 'Bite Contact Records',
        description: 'Digital bite records can support clinician review.',
        icon: 'Stethoscope',
      },
    ],
    loading: false,
    error: null,
  }),
  useServicesPageSettings: () => ({
    pageSettings: {
      conditions: ['Jaw comfort questions'],
      processSteps: [
        { step: '01', title: 'Share records', description: 'Ask what records are useful.' },
      ],
    },
    loading: false,
    error: null,
  }),
  useTechnologySettings: () => ({
    tech: {
      heroImage: null,
      heroImageAlt: '',
      technologies: [
        {
          title: 'Digital scan records',
          description: 'Digital models can support clinician-led planning.',
          iconName: 'ScanLine',
        },
      ],
      stats: [
        { value: 'Case specific', label: 'Record selection' },
        { value: 'Clinician led', label: 'Interpretation' },
      ],
    },
    loading: false,
    error: null,
  }),
  useSanityImage: () => '',
}));

import { Services } from '@/app/pages/Services';
import { Technology } from '@/app/pages/Technology';

function renderPage(page: React.ReactNode) {
  return render(
    <HelmetProvider>
      <MemoryRouter>{page}</MemoryRouter>
    </HelmetProvider>
  );
}

describe('bounded core patient pages', () => {
  beforeEach(() => {
    document.head.querySelectorAll('[data-rh="true"]').forEach((node) => node.remove());
  });

  it('presents services as clinician-reviewed records with a records-first next step', async () => {
    const { container } = renderPage(<Services />);

    expect(
      screen.getByRole('heading', { level: 1, name: /dental services and records review/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /start with your records/i })).toHaveAttribute(
      'href',
      '/send-your-records'
    );
    expect(screen.getByRole('link', { name: /dental implant records guide/i })).toHaveAttribute(
      'href',
      '/services/dental-implants'
    );
    expect(screen.getByRole('link', { name: /tmj and bite screening guide/i })).toHaveAttribute(
      'href',
      '/services/tmj-tmd-treatment'
    );
    expect(screen.getByRole('link', { name: /clear aligner records guide/i })).toHaveAttribute(
      'href',
      '/services/clear-aligners'
    );
    expect(screen.getByRole('link', { name: /full arch records guide/i })).toHaveAttribute(
      'href',
      '/services/full-arch-rehabilitation'
    );
    expect(screen.getAllByText(/^read the guide$/i)).toHaveLength(4);
    expect(container.textContent).not.toMatch(/target pathologies|diagnostic scan|precision protocols/i);
    await waitFor(() =>
      expect(document.head.querySelectorAll('script[type="application/ld+json"]')).toHaveLength(2)
    );
  });

  it('explains technology without certification, diagnostic, status, or third-party image claims', () => {
    const { container } = renderPage(<Technology />);

    expect(
      screen.getByRole('heading', { level: 1, name: /digital records and planning/i })
    ).toBeInTheDocument();
    expect(container.textContent).not.toMatch(
      /certified|advanced diagnostics|system status|optimal|T-Scan|Tekscan|JMA|Zebris/i
    );
    expect(container.querySelector('img')).toBeNull();
    expect(container.innerHTML).not.toContain('unsplash.com');
  });
});
