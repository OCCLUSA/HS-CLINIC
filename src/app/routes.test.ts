import { describe, it, expect } from 'vitest';
import { router } from '@/app/routes';

describe('Routes', () => {
  const routes = router.routes[0]; // Root route with Layout

  it('has a root route with Layout', () => {
    expect(routes.path).toBe('/');
    expect(routes.element).toBeDefined();
  });

  it('defines core public page routes', () => {
    const children = routes.children ?? [];
    const paths = children.map((r) => r.path ?? '(index)');

    expect(paths).toContain('(index)'); // Home
    expect(paths).toContain('about');
    expect(paths).toContain('services');
    expect(paths).toContain('technology');
    expect(paths).toContain('digital-smile-design');
    expect(paths).toContain('dental-tourism');
    expect(paths).toContain('dental-tourism/:regionSlug/dental-implant-travel-guide');
    expect(paths).toContain('contact');
  });

  it('has a separate /studio route', () => {
    const studioRoute = router.routes.find((r) => r.path === '/studio');
    expect(studioRoute).toBeDefined();
  });
});
