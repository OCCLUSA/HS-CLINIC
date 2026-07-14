import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

const sanityClient = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'nk38o90y',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2026-02-14',
  useCdn: false,
});

const SITE_URL = 'https://drhaithamsharshar.com';
const routeManifestPath = path.resolve(process.cwd(), 'src/data/public-routes.json');
const publicRoutes = JSON.parse(fs.readFileSync(routeManifestPath, 'utf8'));
const allowedChangeFrequencies = new Set([
  'always',
  'hourly',
  'daily',
  'weekly',
  'monthly',
  'yearly',
  'never',
]);

function validateRouteManifest(routes) {
  if (!Array.isArray(routes) || routes.length === 0) {
    throw new Error('Public route manifest must be a non-empty array.');
  }

  const seen = new Set();
  for (const route of routes) {
    const validPath = route.path === '/' || /^\/[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/.test(route.path);
    const validPriority = /^(?:0(?:\.\d+)?|1(?:\.0+)?)$/.test(route.priority);

    if (!validPath || seen.has(route.path)) {
      throw new Error(`Invalid or duplicate public route: ${route.path}`);
    }
    if (
      typeof route.indexable !== 'boolean' ||
      typeof route.sitemap !== 'boolean' ||
      typeof route.prerender !== 'boolean' ||
      !validPriority ||
      !allowedChangeFrequencies.has(route.changefreq)
    ) {
      throw new Error(`Incomplete public route metadata: ${route.path}`);
    }
    if (route.sitemap && (!route.indexable || !route.prerender)) {
      throw new Error(`Sitemap route must be indexable and prerendered: ${route.path}`);
    }
    seen.add(route.path);
  }
}

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

async function fetchDynamicServiceRoutes() {
  try {
    const docs = await sanityClient.fetch(
      `*[_type == "service" && defined(slug.current) && ownerApproved == true && clinicianCopyApproved == true]{
        "slug": slug.current,
        _updatedAt
      }`
    );

    const entries = docs
      .filter((doc) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(doc.slug))
      .map((doc) => ({
        path: `/services/${doc.slug}`,
        priority: '0.9',
        changefreq: 'monthly',
        lastmod: doc._updatedAt ? doc._updatedAt.split('T')[0] : undefined,
      }));
    console.log(`✅ Found ${entries.length} dynamic service routes from Sanity.`);
    return entries;
  } catch (error) {
    console.warn(`⚠️ Sanity service routes unavailable: ${error.message}`);
    return [];
  }
}

function renderUrl(entry) {
  const lastmod = entry.lastmod ? `\n    <lastmod>${escapeXml(entry.lastmod)}</lastmod>` : '';
  return `  <url>
    <loc>${escapeXml(`${SITE_URL}${entry.path}`)}</loc>${lastmod}
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`;
}

async function generateSitemap() {
  console.log('🗺️  Generating sitemap from the public route manifest...');
  validateRouteManifest(publicRoutes);

  const dynamicEntries = await fetchDynamicServiceRoutes();
  const entryMap = new Map();
  for (const route of publicRoutes.filter((entry) => entry.indexable && entry.sitemap)) {
    entryMap.set(route.path, route);
  }
  for (const route of dynamicEntries) {
    entryMap.set(route.path, route);
  }

  const entries = [...entryMap.values()].sort((a, b) => a.path.localeCompare(b.path));
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(renderUrl).join('\n')}
</urlset>
`;

  const targets = [
    path.resolve(process.cwd(), 'dist/sitemap.xml'),
    path.resolve(process.cwd(), 'public/sitemap.xml'),
  ];
  for (const target of targets) {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, xml, 'utf8');
  }

  console.log(`✅ Sitemap written with ${entries.length} indexable URLs; noindex routes omitted.`);
}

generateSitemap().catch((error) => {
  console.error('❌ Sitemap generation failed:', error);
  process.exit(1);
});
