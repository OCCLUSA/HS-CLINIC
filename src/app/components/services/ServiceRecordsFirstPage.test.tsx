import type { ComponentType } from 'react';
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import type { HelmetServerState } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import ClearAligners from '@/app/pages/services/ClearAligners';
import DentalImplants from '@/app/pages/services/DentalImplants';
import FullArchRehab from '@/app/pages/services/FullArchRehab';
import TmdTreatment from '@/app/pages/services/TmdTreatment';

type Schema = {
  '@type': string;
  description?: string;
  itemListElement?: Array<{ name: string }>;
  mainEntity?: Array<{
    name: string;
    acceptedAnswer: { text: string };
  }>;
};

function renderPage(Page: ComponentType, path: string) {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const canUseDom = HelmetProvider.canUseDOM;
  HelmetProvider.canUseDOM = false;

  try {
    const view = render(
      <HelmetProvider context={helmetContext}>
        <MemoryRouter initialEntries={[path]}>
          <Page />
        </MemoryRouter>
      </HelmetProvider>
    );

    if (!helmetContext.helmet) {
      throw new Error('Helmet metadata was not collected');
    }

    return { ...view, helmet: helmetContext.helmet };
  } finally {
    HelmetProvider.canUseDOM = canUseDom;
  }
}

function readHead(helmet: HelmetServerState) {
  return new DOMParser().parseFromString(
    `<html><head>${helmet.meta.toString()}${helmet.script.toString()}</head><body></body></html>`,
    'text/html'
  );
}

function readSchemas(helmet: HelmetServerState) {
  const head = readHead(helmet);
  return Array.from(head.querySelectorAll('script[type="application/ld+json"]')).map(
    (script) => JSON.parse(script.textContent ?? '{}') as Schema
  );
}

describe.each([
  ['dental implants', DentalImplants, '/services/dental-implants'],
  ['TMJ and TMD', TmdTreatment, '/services/tmj-tmd-treatment'],
  ['clear aligners', ClearAligners, '/services/clear-aligners'],
  ['full arch rehabilitation', FullArchRehab, '/services/full-arch-rehabilitation'],
] as const)('%s records-first service page', (_label, Page, path) => {
  it('keeps one visible heading, a breadcrumb, and the records path', () => {
    const { container } = renderPage(Page, path);

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('navigation', { name: /breadcrumb/i })).toBeVisible();
    screen.getAllByRole('link', { name: /send your records/i }).forEach((link) => {
      expect(link).toHaveAttribute('href', '/send-your-records');
    });
    expect(container.querySelector('img')).not.toBeInTheDocument();
    expect(container.querySelector('[style*="opacity: 0"]')).not.toBeInTheDocument();
    expect(screen.queryByText(/medically reviewed/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/last updated/i)).not.toBeInTheDocument();
  });

  it('uses only visible WebPage, breadcrumb, and FAQ structured content', () => {
    const { helmet } = renderPage(Page, path);
    const schemas = readSchemas(helmet);

    expect(schemas.map((schema) => schema['@type'])).toEqual([
      'WebPage',
      'BreadcrumbList',
      'FAQPage',
    ]);
    expect(JSON.stringify(schemas)).not.toContain('MedicalProcedure');

    const pageSchema = schemas.find((schema) => schema['@type'] === 'WebPage');
    expect(screen.getByText(pageSchema?.description ?? '')).toBeVisible();

    const breadcrumbSchema = schemas.find((schema) => schema['@type'] === 'BreadcrumbList');
    breadcrumbSchema?.itemListElement?.forEach((item) => {
      expect(screen.getAllByText(item.name).length).toBeGreaterThan(0);
    });

    const faqSchema = schemas.find((schema) => schema['@type'] === 'FAQPage');
    faqSchema?.mainEntity?.forEach((item) => {
      expect(screen.getByText(item.name)).toBeVisible();
      expect(screen.getByText(item.acceptedAnswer.text)).toBeInTheDocument();
    });
  });

  it('keeps complete search sharing and indexing tags', () => {
    const { helmet } = renderPage(Page, path);
    const head = readHead(helmet);

    expect(head.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe(
      'index,follow,max-image-preview:large'
    );

    [
      'og:title',
      'og:description',
      'og:url',
      'og:image',
      'og:image:alt',
      'og:image:type',
      'og:image:width',
      'og:image:height',
      'og:type',
      'og:site_name',
      'og:locale',
    ].forEach((property) => {
      expect(head.querySelector(`meta[property="${property}"]`)).not.toBeNull();
    });

    [
      'twitter:card',
      'twitter:title',
      'twitter:description',
      'twitter:image',
      'twitter:image:alt',
    ].forEach((name) => {
      expect(head.querySelector(`meta[name="${name}"]`)).not.toBeNull();
    });
  });
});

describe('TMJ and TMD clinical boundary', () => {
  it('states the limits of jaw tracking, EMG, and bite data', () => {
    renderPage(TmdTreatment, '/services/tmj-tmd-treatment');

    expect(
      screen.getByText(/jaw tracking, EMG, and bite data are adjunct screening inputs/i)
    ).toHaveTextContent(/do not diagnose TMD or prove causation/i);
  });
});
