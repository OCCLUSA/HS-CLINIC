import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

const sanityClient = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'nk38o90y', // must match sanity.config.ts
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2026-02-14',
  useCdn: false,
});

const SITE_URL = 'https://drhaithamsharshar.com';

// Static routes with their priority and changefreq
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  { path: '/technology', priority: '0.8', changefreq: 'monthly' },
  { path: '/dental-tourism', priority: '0.9', changefreq: 'weekly' },
  { path: '/dental-tourism/gulf', priority: '0.8', changefreq: 'monthly' },
  { path: '/dental-tourism/saudi-arabia', priority: '0.8', changefreq: 'monthly' },
  { path: '/dental-tourism/uae', priority: '0.8', changefreq: 'monthly' },
  { path: '/dental-tourism/europe', priority: '0.8', changefreq: 'monthly' },
  { path: '/dental-tourism/uk', priority: '0.8', changefreq: 'monthly' },
  { path: '/dental-tourism/germany', priority: '0.8', changefreq: 'monthly' },
  { path: '/dental-tourism/gulf/dental-implant-travel-guide', priority: '0.75', changefreq: 'monthly' },
  { path: '/dental-tourism/europe/dental-implant-travel-guide', priority: '0.75', changefreq: 'monthly' },
  { path: '/digital-smile-design', priority: '0.9', changefreq: 'monthly' },
  { path: '/gallery', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'yearly' },
  { path: '/services/dental-implants', priority: '0.9', changefreq: 'monthly' },
  { path: '/services/tmj-tmd-treatment', priority: '0.9', changefreq: 'monthly' },
  { path: '/services/clear-aligners', priority: '0.9', changefreq: 'monthly' },
  { path: '/services/full-arch-rehabilitation', priority: '0.9', changefreq: 'monthly' },
  { path: '/dental-tourism/program', priority: '0.8', changefreq: 'monthly' },
  { path: '/guarantee', priority: '0.6', changefreq: 'yearly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/medical-disclaimer', priority: '0.3', changefreq: 'yearly' },
];

async function generateSitemap() {
  console.log('🗺️  Generating dynamic sitemap...');

  // Fetch dynamic routes + their updatedAt from Sanity
  let dynamicEntries = [];
  try {
    const query = `*[_type in ["post", "service"] && defined(slug.current)]{
      _type,
      "slug": slug.current,
      _updatedAt
    }`;
    const docs = await sanityClient.fetch(query);
    dynamicEntries = docs.map((doc) => ({
      path: doc._type === 'service' ? `/services/${doc.slug}` : `/blog/${doc.slug}`,
      priority: doc._type === 'service' ? '0.9' : '0.7',
      changefreq: 'monthly',
      lastmod: doc._updatedAt
        ? doc._updatedAt.split('T')[0]
        : new Date().toISOString().split('T')[0],
    }));
    console.log(`✅ Found ${dynamicEntries.length} dynamic routes from Sanity.`);
  } catch (error) {
    console.error('⚠️ Warning: Could not fetch Sanity routes for sitemap:', error.message);
  }

  const today = new Date().toISOString().split('T')[0];

  // Merge static + dynamic, deduplicating by path (dynamic wins when paths collide)
  const entryMap = new Map();
  for (const r of staticRoutes) {
    entryMap.set(r.path, { ...r, lastmod: today });
  }
  for (const d of dynamicEntries) {
    entryMap.set(d.path, d); // dynamic entry overrides static (has real _updatedAt)
  }
  const allEntries = [...entryMap.values()];

  // Build XML
  const urls = allEntries
    .map(
      (entry) => `  <url>
    <loc>${SITE_URL}${entry.path}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  const distDir = path.resolve(process.cwd(), 'dist');
  const sitemapPath = path.join(distDir, 'sitemap.xml');

  // Ensure dist exists (it should after vite build)
  if (!fs.existsSync(distDir)) {
    console.error('❌ dist/ directory not found. Run vite build first.');
    process.exit(1);
  }

  fs.writeFileSync(sitemapPath, xml, 'utf-8');
  console.log(`✅ Sitemap written to ${sitemapPath} with ${allEntries.length} URLs.`);
}

generateSitemap();
