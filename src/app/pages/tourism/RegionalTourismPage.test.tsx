import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import RegionalTourismPage from './RegionalTourismPage';

function renderCountry(slug: string) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[`/dental-tourism/${slug}`]}>
        <Routes>
          <Route path="/dental-tourism/:regionSlug" element={<RegionalTourismPage />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>
  );
}

describe.each([
  ['kuwait', 'Kuwait', /implant component details/i],
  ['qatar', 'Qatar', /provisional and final restoration stages/i],
  ['oman', 'Oman', /whether older imaging remains useful/i],
  ['bahrain', 'Bahrain', /aftercare summary/i],
])('priority regional page %s', (slug, country, countrySpecificCopy) => {
  it('renders its own records-first patient path', () => {
    renderCountry(slug);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: `Dental care in Cairo for patients from ${country}`,
      })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /send your records/i })).toHaveAttribute(
      'href',
      '/send-your-records'
    );
    expect(screen.getByText(countrySpecificCopy)).toBeInTheDocument();
  });
});

describe('regional country hubs', () => {
  it('turns the Gulf page into a country-selection hub', () => {
    renderCountry('gulf');

    for (const country of ['Kuwait', 'Qatar', 'Oman', 'Bahrain', 'Saudi Arabia', 'United Arab Emirates']) {
      expect(screen.getByRole('link', { name: `Travelling from ${country}` })).toBeInTheDocument();
    }
    expect(screen.getByRole('heading', { level: 2, name: 'Choose your Gulf departure point' })).toBeInTheDocument();
  });

  it('turns the Europe page into a country-selection hub', () => {
    renderCountry('europe');

    for (const country of ['United Kingdom', 'Germany']) {
      expect(screen.getByRole('link', { name: `Travelling from ${country}` })).toBeInTheDocument();
    }
    expect(screen.getByRole('heading', { level: 2, name: 'Choose your Europe departure point' })).toBeInTheDocument();
  });
});

describe('regional wording boundaries', () => {
  it('does not promise a pre-travel sequence, short visit, or enough information from WhatsApp', () => {
    const source = readFileSync(
      resolve(process.cwd(), 'src/app/pages/tourism/RegionalTourismPage.tsx'),
      'utf8'
    );

    expect(source).not.toMatch(/Receive a clinician reviewed treatment sequence/i);
    expect(source).not.toMatch(/WhatsApp is enough/i);
    expect(source).not.toMatch(/Some (cosmetic and diagnostic )?visits can be short/i);
    expect(source).not.toMatch(/recommended first step/i);
    expect(source).not.toMatch(/Share your panoramic X-ray/i);
    expect(source).not.toMatch(/Send dental records first/i);
    expect(source).not.toMatch(/Share existing UK dental records/i);
    expect(source).not.toMatch(/Send X-rays, treatment notes/i);
    expect(source).not.toMatch(/safe local maintenance/i);
    expect(source).not.toMatch(/You can receive a preliminary pathway/i);
  });
});
