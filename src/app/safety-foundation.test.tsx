import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

vi.mock('@/hooks/useCmsData', () => ({
  useBeforeAfterCases: () => ({ cases: [], loading: false, error: null }),
  useSanityImage: () => '',
  useSiteSettings: () => ({
    settings: {
      clinicName: 'HS Clinic',
      phone: '+201101010599',
      whatsapp: '+201101010599',
      email: 'clinic@drhaithamsharshar.com',
      address: '8/63, 10th District, Zahraa El Maadi, Cairo, Egypt',
      workingHours: 'Mon–Fri: 09:00–18:00 | Sat: 09:00–14:00',
      socialLinks: [],
    },
    loading: false,
    error: null,
  }),
}));

import { Contact } from '@/app/pages/Contact';
import Gallery from '@/app/pages/Gallery';
import { CookieConsent } from '@/app/components/CookieConsent';
import { YouTubeEmbed } from '@/app/components/YouTubeEmbed';

function renderPage(page: React.ReactNode) {
  return render(
    <HelmetProvider>
      <MemoryRouter>{page}</MemoryRouter>
    </HelmetProvider>
  );
}

describe('patient trust and privacy foundation', () => {
  beforeEach(() => {
    localStorage.clear();
    document.head.querySelectorAll('[data-rh="true"]').forEach((node) => node.remove());
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('does not load Google Analytics before a patient chooses an external service', () => {
    const html = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8');
    expect(html).not.toContain('googletagmanager.com');
    expect(html).not.toContain("gtag('config'");
  });

  it('uses one accurate privacy acknowledgement instead of ineffective consent choices', () => {
    vi.useFakeTimers();
    render(<CookieConsent />);
    act(() => vi.advanceTimersByTime(3100));

    expect(screen.getByRole('heading', { name: /privacy first/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /got it/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /accept/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /^dismiss$/i })).not.toBeInTheDocument();
  });

  it('keeps the nontracking privacy notice compact on small screens', () => {
    vi.useFakeTimers();
    render(<CookieConsent />);
    act(() => vi.advanceTimersByTime(3100));

    const notice = screen.getByRole('dialog', { name: /privacy notice/i });
    const row = notice.querySelector('[data-privacy-notice-row]');
    const acknowledge = screen.getByRole('button', { name: /got it/i });

    expect(notice).toHaveClass('max-w-lg');
    expect(row).toHaveClass('items-center');
    expect(acknowledge).toHaveClass('shrink-0');
  });

  it('makes contact WhatsApp first without collecting patient details on the website', () => {
    const { container } = renderPage(<Contact />);

    expect(screen.getByRole('link', { name: /start on whatsapp/i })).toHaveAttribute(
      'href',
      expect.stringContaining('api.whatsapp.com')
    );
    expect(container.querySelector('form')).toBeNull();
    expect(container.querySelector('input')).toBeNull();
    expect(container.querySelector('textarea')).toBeNull();
  });

  it('loads Google Maps only after a patient asks to view it', () => {
    const { container } = renderPage(<Contact />);

    expect(container.querySelector('iframe')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: /load clinic map/i }));
    expect(container.querySelector('iframe')).toHaveAttribute(
      'src',
      expect.stringContaining('google.com/maps/embed')
    );
  });

  it('shows the ten owner-approved HS Dental Cases as whole-photo comparisons', () => {
    const { container } = renderPage(<Gallery />);
    const pageSource = readFileSync(resolve(process.cwd(), 'src/app/pages/HsDentalCases.tsx'), 'utf8');

    expect(screen.getByRole('heading', { name: /hs dental cases/i })).toBeInTheDocument();
    expect(screen.getByText(/no patient case is published without/i)).toBeInTheDocument();
    expect(screen.queryByRole('slider')).not.toBeInTheDocument();
    expect(screen.getAllByRole('group', { name: /photo view/i })).toHaveLength(10);
    expect(screen.getAllByRole('button', { name: /show before photo/i })).toHaveLength(10);
    expect(screen.getAllByRole('button', { name: /show after photo/i })).toHaveLength(10);
    expect(container.querySelectorAll('img')).toHaveLength(10);
    expect(screen.queryByText(/prepared case files remain unpublished/i)).not.toBeInTheDocument();
    expect(pageSource).toContain(
      '<meta name="robots" content="index,follow,max-image-preview:large" />'
    );
    expect(pageSource).toContain('buildHreflangTags(SEO.gallery.canonical)');
    expect(pageSource).toContain("'ImageGallery'");
    expect(screen.queryByText(/real results/i)).not.toBeInTheDocument();
  });

  it('preserves approved case image detail and avoids cached compressed copies', () => {
    const viteConfig = readFileSync(resolve(process.cwd(), 'vite.config.ts'), 'utf8');
    const pageSource = readFileSync(
      resolve(process.cwd(), 'src/app/pages/HsDentalCases.tsx'),
      'utf8'
    );

    expect(viteConfig).toContain('exclude: CASE_IMAGE_PATTERN');
    expect(viteConfig).toContain('case-quality-v2');
    expect(pageSource).toContain('max-w-[620px]');

    const patternLiteral = viteConfig.match(
      /const CASE_IMAGE_PATTERN\s*=\s*\/([^\r\n]+)\/i;/
    );
    expect(patternLiteral).not.toBeNull();

    const caseImagePattern = new RegExp(patternLiteral![1], 'i');
    expect(
      caseImagePattern.test(
        'dr-haitham-sharshar-cairo-case-before-154.webp'
      )
    ).toBe(true);
    expect(
      caseImagePattern.test(
        'F:/HS CLINIC/dist/assets/dr-haitham-sharshar-cairo-case-before-154-case-quality-v2-DCR9EYN6.webp'
      )
    ).toBe(true);
  });

  it('does not contact YouTube for a thumbnail before play is selected', () => {
    const { container } = render(<YouTubeEmbed videoId="safe-video" title="Clinic guide" />);
    expect(container.querySelector('iframe')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: /play video/i }));
    expect(container.querySelector('iframe')).toHaveAttribute(
      'src',
      expect.stringContaining('youtube-nocookie.com')
    );
  });

  it('keeps unsafe legacy collection and gallery claims out of public modules', () => {
    const publicModules = [
      'src/app/pages/Contact.tsx',
      'src/app/components/tourism/ConsultationForm.tsx',
      'src/app/pages/Gallery.tsx',
      'src/app/pages/DentalTourism.tsx',
      'src/app/components/tourism/BeforeAfterSlider.tsx',
      'src/app/components/YouTubeEmbed.tsx',
      'src/app/pages/legal/PrivacyPolicy.tsx',
      'src/lib/seo.ts',
    ]
      .map((path) => readFileSync(resolve(process.cwd(), path), 'utf8'))
      .join('\n');

    expect(publicModules).not.toMatch(/LegacyContact|LegacyConsultationForm|LegacyGallery/);
    expect(publicModules).not.toContain('data-netlify');
    expect(publicModules).not.toContain('img.youtube.com');
    expect(publicModules).not.toContain('GALLERY_JSONLD');
    expect(publicModules).not.toContain("'@type': 'ImageGallery'");
    expect(publicModules).not.toMatch(/REAL RESULTS|Every case performed by/i);
  });

  it('describes the website privacy boundary without unverified protection claims', () => {
    const policy = readFileSync(
      resolve(process.cwd(), 'src/app/pages/legal/SafePrivacyPolicy.tsx'),
      'utf8'
    );

    expect(policy).toContain('does not contain a patient portal or website file-storage system');
    expect(policy).toContain('Sanity content network');
    expect(policy).not.toMatch(/anonymized analytics|encrypted storage|medical-grade confidentiality/i);
  });

  it('routes the records call to action and includes approved cases in search lists', () => {
    const routes = readFileSync(resolve(process.cwd(), 'src/app/routes.tsx'), 'utf8');
    const manifest = JSON.parse(
      readFileSync(resolve(process.cwd(), 'src/data/public-routes.json'), 'utf8')
    ) as Array<{ path: string; indexable: boolean; sitemap: boolean }>;
    const llms = readFileSync(resolve(process.cwd(), 'public/llms.txt'), 'utf8');

    expect(routes).toContain("path: 'send-your-records'");
    expect(manifest.find((route) => route.path === '/gallery')).toMatchObject({
      indexable: true,
      sitemap: true,
    });
    expect(llms).toContain('https://drhaithamsharshar.com/gallery');
  });

  it('keeps unapproved reference and portrait assets out of public page wiring and build output', () => {
    const publicPageSources = [
      'src/app/pages/DigitalSmileDesign.tsx',
      'src/app/pages/services/DentalImplants.tsx',
      'src/app/pages/tourism/RegionalEducationPage.tsx',
    ]
      .map((path) => readFileSync(resolve(process.cwd(), path), 'utf8'))
      .join('\n');
    const pruneScript = readFileSync(
      resolve(process.cwd(), 'scripts/prune-private-public-files.mjs'),
      'utf8'
    );
    const seoSource = readFileSync(resolve(process.cwd(), 'src/lib/seo.ts'), 'utf8');
    const redirects = readFileSync(resolve(process.cwd(), 'public/_redirects'), 'utf8');

    expect(publicPageSources).not.toContain('StyleReferenceShowcase');
    expect(publicPageSources).not.toMatch(/variant1-4k|variant2-4k|style-references/);
    expect(pruneScript).toContain('approvedPublicImagePaths');
    expect(pruneScript).toContain('og-hs-clinic.webp');
    expect(pruneScript).toContain('about.md');
    expect(seoSource).toContain('/images/og-hs-clinic.webp');
    expect(seoSource).not.toContain('/images/og-clinic.jpg');
    expect(redirects).not.toMatch(/^\/about\.md\s/m);
  });

  it('keeps one page landmark because the shared clinic layout owns the main landmark', () => {
    const nestedPageSources = [
      'src/app/components/services/ServiceRecordsFirstPage.tsx',
      'src/app/pages/legal/SafePrivacyPolicy.tsx',
    ]
      .map((path) => readFileSync(resolve(process.cwd(), path), 'utf8'))
      .join('\n');

    expect(nestedPageSources).not.toMatch(/<\/?main\b/);
  });

  it('keeps primary headings and card content visible without motion startup', () => {
    const primaryContentSources = [
      'src/app/components/CyberHero.tsx',
      'src/app/components/ClinicalSimulation.tsx',
      'src/app/components/ui/SectionHeader.tsx',
      'src/app/components/ui/GlowCard.tsx',
    ]
      .map((path) => readFileSync(resolve(process.cwd(), path), 'utf8'))
      .join('\n');
    const cardSource = readFileSync(
      resolve(process.cwd(), 'src/app/components/ui/GlowCard.tsx'),
      'utf8'
    );

    expect(primaryContentSources).not.toMatch(/initial=\{\{[^}]*opacity:\s*0/);
    expect(cardSource).not.toContain('cursor-pointer');
    expect(cardSource).not.toContain('whileHover');
  });

  it('keeps the shared footer clinically bounded', () => {
    const layout = readFileSync(
      resolve(process.cwd(), 'src/app/components/Layout.tsx'),
      'utf8'
    );

    expect(layout).not.toMatch(/Digital dentistry in the Middle East|precision, technology, and art/i);
    expect(layout).toContain('clinical examination');
    expect(layout).toContain('clinician review');
  });

  it('keeps dormant CMS fallbacks free of unverified credentials and case counts', () => {
    const cmsHooks = readFileSync(
      resolve(process.cwd(), 'src/hooks/useCmsData.ts'),
      'utf8'
    );

    expect(cmsHooks).not.toMatch(
      /DSD CERTIFIED|T-SCAN MASTER|Official JMA|Official exocad|20\+|5K\+|Chief Medical Officer/i
    );
  });

  it('keeps active records and tourism wording ask-first without service promises', () => {
    const activeCopy = [
      'src/app/pages/SafeContact.tsx',
      'src/app/pages/SendYourRecords.tsx',
      'src/app/pages/tourism/RegionalTourismPage.tsx',
      'src/app/pages/tourism/RegionalEducationPage.tsx',
      'src/app/pages/tourism/TourismProgram.tsx',
      'src/lib/seo.ts',
      'src/hooks/useCmsData.ts',
    ]
      .map((path) => readFileSync(resolve(process.cwd(), path), 'utf8'))
      .join('\n');

    expect(activeCopy).not.toMatch(/safest way to share records/i);
    expect(activeCopy).not.toMatch(/You receive preliminary questions/i);
    expect(activeCopy).not.toMatch(/provides (?:a )?case-specific estimate/i);
    expect(activeCopy).not.toMatch(/safe local maintenance/i);
    expect(activeCopy).not.toMatch(/preliminary pathway/i);
    expect(activeCopy).not.toMatch(/diagnostics confirm treatment options/i);
    expect(activeCopy).not.toMatch(/records confirm suitability/i);
    expect(activeCopy).not.toMatch(/team will explain|team member organises/i);
  });
});
