import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import RegionalEducationPage from '@/app/pages/tourism/RegionalEducationPage';

function renderRoute(path: string) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route
            path="/dental-tourism/:regionSlug/dental-implant-travel-guide"
            element={<RegionalEducationPage />}
          />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>
  );
}

describe('regional implant education pages', () => {
  it.each([
    ['/dental-tourism/gulf/dental-implant-travel-guide', 'Gulf'],
    ['/dental-tourism/europe/dental-implant-travel-guide', 'Europe'],
  ])('keeps %s records-first and examination-led', (path, audience) => {
    const { container } = renderRoute(path);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: new RegExp(`dental implant travel guide for ${audience} patients`, 'i'),
      })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /start with your records/i })).toHaveAttribute(
      'href',
      '/send-your-records'
    );
    expect(container.textContent).toMatch(/final decisions require examination and clinician review/i);
  });

  it('does not publish unverified review, device, guide, language, or local-dentist claims', () => {
    const source = readFileSync(
      resolve(process.cwd(), 'src/app/pages/tourism/RegionalEducationPage.tsx'),
      'utf8'
    );

    expect(source).not.toMatch(/reviewedBy|MedicalProcedure|stackable|Zebris|Occlusense|Neurobite/i);
    expect(source).not.toMatch(/Arabic or English|coordinate with my dentist|provide records.*local dentist/i);
    expect(source).toContain("'@type': 'WebPage'");
  });
});
