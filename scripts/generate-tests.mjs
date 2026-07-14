import fs from 'fs';
import path from 'path';

const LEGAL_PAGES = [
  'PrivacyPolicy',
  'TermsOfService',
  'MedicalDisclaimer',
  'Guarantee'
];

const SERVICE_PAGES = [
  'DentalImplants',
  'TmdTreatment',
  'ClearAligners',
  'FullArchRehab'
];

const basePath = 'F:\\HS CLINIC\\src\\app\\pages';

// 1. Contact Test
const contactTest = `import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Contact } from './Contact';

vi.mock('@/hooks/useCmsData', () => ({
  useSiteSettings: () => ({
    settings: {
      phone: '+201012345678',
      whatsapp: '+201012345678',
      email: 'hello@drhaithamsharshar.com',
      address: 'Test Address, Cairo',
      workingHours: 'Mon-Sun: 10AM - 10PM | Friday: Off',
    }
  }),
  useSanityImage: () => 'test-image.jpg'
}));

describe('Contact Page', () => {
  it('renders without crashing', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <Contact />
        </MemoryRouter>
      </HelmetProvider>
    );
    expect(screen.getByText(/Initiate Contact/i)).toBeInTheDocument();
    expect(screen.getByText(/TRANSMIT DATA/i)).toBeInTheDocument();
  });
});
`;

fs.writeFileSync(path.join(basePath, 'Contact.test.tsx'), contactTest, 'utf-8');

// 2. Legal Tests
LEGAL_PAGES.forEach(page => {
  const content = `import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ${page} from './legal/${page}';

describe('${page} Page', () => {
  it('renders without crashing', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <${page} />
        </MemoryRouter>
      </HelmetProvider>
    );
    // Use a loose regex to match typical legal headings
    expect(screen.getAllByRole('heading')[0]).toBeInTheDocument();
  });
});
`;
  fs.writeFileSync(path.join(basePath, `legal/${page}.test.tsx`), content, 'utf-8');
});

// 3. Service Pillar Tests
SERVICE_PAGES.forEach(page => {
  const content = `import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ${page} from './services/${page}';

vi.mock('@/hooks/useCmsData', () => ({
  useServicePillar: () => ({
    pillar: {
      heroTitle: 'Test ${page}',
      heroSubtitle: 'Test Subtitle',
      heroTagline: 'Test Tagline',
      ctaPrimary: 'Book Now',
      ctaSecondary: 'Learn More',
      technologies: [{name: 'Tech 1', description: 'Desc 1'}],
      benefits: [{title: 'Benefit 1', description: 'Desc 1'}],
      faqs: [{question: 'Q1', answer: 'A1'}],
    }
  })
}));

vi.mock('@/lib/sanityClient', () => ({
  urlFor: () => ({
    width: () => ({
      quality: () => ({
        auto: () => ({
          url: () => 'test-url'
        })
      })
    })
  })
}));

describe('${page} Page', () => {
  it('renders without crashing', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <${page} />
        </MemoryRouter>
      </HelmetProvider>
    );
    expect(screen.getAllByRole('heading')[0]).toBeInTheDocument();
  });
});
`;
  fs.writeFileSync(path.join(basePath, `services/${page}.test.tsx`), content, 'utf-8');
});

console.log('Successfully generated 9 unit test files.');
