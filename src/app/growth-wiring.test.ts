import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { buildDentalTourismHreflangTags, SEO } from '@/lib/seo';

const root = process.cwd();
const read = (path: string) => readFileSync(resolve(root, path), 'utf8');

describe('growth route and search wiring', () => {
  it('uses one public route manifest for sitemap and prerender', () => {
    const manifestPath = resolve(root, 'src/data/public-routes.json');
    expect(existsSync(manifestPath)).toBe(true);

    const routes = JSON.parse(readFileSync(manifestPath, 'utf8')) as Array<{
      path: string;
      indexable: boolean;
      sitemap: boolean;
    }>;
    const paths = routes.map((route) => route.path);

    expect(new Set(paths).size).toBe(paths.length);
    expect(paths).toEqual(
      expect.arrayContaining([
        '/send-your-records',
        '/dental-tourism/partners',
        '/dental-tourism/kuwait',
        '/dental-tourism/qatar',
        '/dental-tourism/oman',
        '/dental-tourism/bahrain',
      ])
    );
    expect(routes.find((route) => route.path === '/gallery')).toMatchObject({
      indexable: true,
      sitemap: true,
    });

    for (const script of ['scripts/generate-sitemap.mjs', 'scripts/prerender.mjs']) {
      const source = read(script);
      expect(source).toContain('public-routes.json');
      expect(source).not.toMatch(/const staticRoutes\s*=\s*\[/);
    }
  });

  it('declares specific partnership and records routes before the regional wildcard', () => {
    const routes = read('src/app/routes.tsx');
    const partnersIndex = routes.indexOf("path: 'dental-tourism/partners'");
    const recordsIndex = routes.indexOf("path: 'send-your-records'");
    const regionalIndex = routes.indexOf("path: 'dental-tourism/:regionSlug'");

    expect(partnersIndex).toBeGreaterThan(-1);
    expect(recordsIndex).toBeGreaterThan(-1);
    expect(regionalIndex).toBeGreaterThan(partnersIndex);
  });

  it('provides reciprocal country hreflang tags for the four priority countries', () => {
    const countrySeo = [
      SEO.dentalTourismKuwait,
      SEO.dentalTourismQatar,
      SEO.dentalTourismOman,
      SEO.dentalTourismBahrain,
    ];
    const tags = buildDentalTourismHreflangTags(SEO.dentalTourismKuwait.canonical);

    expect(countrySeo.every(Boolean)).toBe(true);
    expect(tags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ hrefLang: 'en-KW' }),
        expect.objectContaining({ hrefLang: 'en-QA' }),
        expect.objectContaining({ hrefLang: 'en-OM' }),
        expect.objectContaining({ hrefLang: 'en-BH' }),
        expect.objectContaining({ hrefLang: 'x-default', href: SEO.dentalTourism.canonical }),
      ])
    );
  });

  it('keeps AI guidance clinically bounded and links the new patient paths', () => {
    const llms = read('public/llms.txt');

    expect(llms).toContain('/send-your-records');
    expect(llms).toContain('/dental-tourism/partners');
    expect(llms).toContain('/dental-tourism/kuwait');
    expect(llms).toContain('/dental-tourism/qatar');
    expect(llms).toContain('/dental-tourism/oman');
    expect(llms).toContain('/dental-tourism/bahrain');
    expect(llms).not.toMatch(/certified specialists|full quality control|instant corrections/i);
  });

  it('fails closed when prerendered search evidence is incomplete or belongs to another route', () => {
    const prerender = read('scripts/prerender.mjs');
    const sitemap = read('scripts/generate-sitemap.mjs');
    const index = read('index.html');

    expect(prerender).toContain('canonical mismatch');
    expect(prerender).toContain('expected one non-empty description');
    expect(prerender).toContain('expected one H1');
    expect(prerender).toContain('htmlWithoutScripts');
    expect(prerender).toContain('expected one robots tag');
    expect(prerender).toContain('missing required social tag');
    expect(prerender).toContain('missing x-default hreflang');
    expect(prerender).toContain('invalid JSON-LD');
    expect(prerender).toContain('snapshots = new Map()');
    expect(prerender.indexOf('await stopServer(server)')).toBeLessThan(
      prerender.indexOf('for (const [route, html] of snapshots)')
    );
    expect(prerender).not.toMatch(/opacity:\s*1\s*!important/);
    expect(prerender).not.toMatch(/visibility:\s*visible\s*!important/);
    expect(sitemap).not.toContain('_type in ["post", "service"]');
    expect(sitemap).not.toContain('/blog/');
    expect(index).not.toContain('name="description"');
    expect(index).not.toContain('hreflang=');
  });

  it('skips SVG optimization when the optional SVG optimizer is not installed', () => {
    const viteConfig = read('vite.config.ts');

    expect(viteConfig).toContain("test: /\\.(jpe?g|png|gif|tiff|webp|avif)$/i");
  });

  it('publishes dynamic service routes only after owner and clinical-copy approval', () => {
    const sitemap = read('scripts/generate-sitemap.mjs');
    const prerender = read('scripts/prerender.mjs');

    for (const source of [sitemap, prerender]) {
      expect(source).toContain('ownerApproved == true');
      expect(source).toContain('clinicianCopyApproved == true');
    }
  });

  it('keeps approved dynamic service pages records first and schema bounded', () => {
    const detailPage = read('src/app/pages/services/ServiceDetailPage.tsx');

    expect(detailPage).toContain("to=\"/send-your-records\"");
    expect(detailPage).toContain("'@type': 'WebPage'");
    expect(detailPage).not.toContain("'@type': 'MedicalProcedure'");
    expect(detailPage).not.toContain('framer-motion');
    expect(detailPage).not.toContain('urlFor(');
  });

  it('keeps search titles concise and Search Console proof URLs aligned with canonicals', () => {
    for (const page of Object.values(SEO)) {
      expect(page.title.length).toBeLessThanOrEqual(60);
    }

    const checklist = read('docs/search-console-indexing-checklist.md');
    expect(checklist).not.toMatch(
      /https:\/\/drhaithamsharshar\.com\/(?!`)(?:[^`\r\n]+)\/`/
    );
  });

  it('uses visible clinic names in schema and keeps page-loading status audible', () => {
    const seo = read('src/lib/seo.ts');
    const regional = read('src/app/pages/tourism/RegionalTourismPage.tsx');
    const routes = read('src/app/routes.tsx');

    expect(seo).toContain("name: 'HS Clinic'");
    expect(regional).toContain("name: 'HS Clinic'");
    expect(routes).toContain('role="status"');
    expect(routes).toContain('aria-live="polite"');
    expect(routes).toContain('Loading page');
  });

  it('keeps trust text readable and the tablet menu clear of the clinic logo', () => {
    const trustSources = [
      'src/app/components/Layout.tsx',
      'src/app/components/cases/CaseComparisonSlider.tsx',
      'src/app/components/tourism/RecordsFirstConsultation.tsx',
      'src/app/pages/SendYourRecords.tsx',
      'src/app/pages/tourism/DentalTourismPartners.tsx',
      'src/app/pages/legal/SafePrivacyPolicy.tsx',
    ]
      .map(read)
      .join('\n');
    const layout = read('src/app/components/Layout.tsx');

    expect(trustSources).not.toContain('text-gray-500');
    expect(layout).toContain('hidden lg:flex');
    expect(layout).toContain('flex lg:hidden');
    expect(layout).toContain('width={2000}');
    expect(layout).toContain('height={2000}');
  });

  it('preloads fonts used above the fold and avoids layout-heavy meter animation', () => {
    const index = read('index.html');
    const simulation = read('src/app/components/ClinicalSimulation.tsx');

    expect(index).toContain('/fonts/inter-latin-400.woff2');
    expect(index).toContain('/fonts/playfair-display-latin-700.woff2');
    expect(index).not.toMatch(/rel="preload"[\s\S]{0,180}jetbrains-mono-latin-400/);
    expect(index).not.toMatch(/rel="preload"[\s\S]{0,180}playfair-display-latin-400/);
    expect(simulation).not.toMatch(/animate=\{\{\s*height:/);
    expect(simulation).toContain('useReducedMotion');
    expect(simulation.match(/repeat:\s*reduceMotion\s*\?\s*0\s*:\s*Infinity/g)).toHaveLength(3);
    expect(simulation).toContain('reduceMotion ? { opacity: 1, scaleY: 1 }');
  });
});
