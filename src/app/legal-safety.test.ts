import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf8');

describe('patient-facing legal and schema boundaries', () => {
  it('publishes no universal coverage promise or unverified partner condition', () => {
    const guarantee = read('src/app/pages/legal/Guarantee.tsx');
    const terms = read('src/app/pages/legal/TermsOfService.tsx');

    expect(guarantee).toContain('does not create a treatment warranty or outcome guarantee');
    expect(guarantee).toContain('case-specific written terms');
    expect(guarantee).not.toMatch(/six months|waived|return logistics|virtual consultation platform/i);
    expect(terms).not.toMatch(/trusted third-party partners|regular partner audits|all content.*property|full cost breakdowns/i);
  });

  it('keeps draft legal notices out of the sitemap while preserving the accurate coverage page', () => {
    const manifest = JSON.parse(read('src/data/public-routes.json')) as Array<{
      path: string;
      indexable: boolean;
      sitemap: boolean;
      prerender: boolean;
    }>;

    expect(manifest.find((route) => route.path === '/guarantee')).toMatchObject({
      indexable: true,
      sitemap: true,
      prerender: true,
    });
    for (const path of ['/terms-of-service', '/medical-disclaimer']) {
      expect(manifest.find((route) => route.path === path)).toMatchObject({
        indexable: false,
        sitemap: false,
        prerender: true,
      });
    }
  });

  it('removes unsupported medical, credential, and fixed-workflow schema from the shared SEO source', () => {
    const seo = read('src/lib/seo.ts');

    expect(seo).not.toContain("'@type': 'MedicalProcedure'");
    expect(seo).not.toMatch(/certified trainer|15\+ years|myocentric|predictable results/i);
  });

  it('tells AI systems that coverage requires case-specific written terms', () => {
    const llms = read('public/llms.txt');

    expect(llms).toContain('case-specific written terms');
    expect(llms).not.toContain('Published coverage conditions');
  });
});
