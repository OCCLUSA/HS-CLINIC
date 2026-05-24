import { chromium } from 'playwright';
import { createClient } from '@sanity/client';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

// Initialize Sanity Client (Guardrail 1: GROQ Fetching)
const sanityClient = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'nk38o90y', // must match sanity.config.ts
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2026-02-14',
  useCdn: false, // Bypass CDN for freshest data during build
});

// Hardcoded core routes currently inside App router
const staticRoutes = [
  '/',
  '/about',
  '/services',
  '/technology',
  '/digital-smile-design',
  '/dental-tourism',
  '/dental-tourism/program',
  '/gallery',
  '/contact',
  '/services/dental-implants',
  '/services/tmj-tmd-treatment',
  '/services/clear-aligners',
  '/services/full-arch-rehabilitation',
  '/guarantee',
  '/privacy-policy',
  '/medical-disclaimer',
];

async function fetchDynamicRoutes() {
  console.log('🔍 Fetching dynamic routes from Sanity (GROQ)...');
  try {
    // Attempt to fetch any dynamic doc types that might have slugs (blog posts, services, etc)
    const query = `*[_type in ["post", "service"] && defined(slug.current)]{_type, "slug": slug.current}`;
    const docs = await sanityClient.fetch(query);
    const dynamicRoutes = docs.map((doc) => {
      if (doc._type === 'service') return `/services/${doc.slug}`;
      return `/blog/${doc.slug}`; // default: blog posts
    });
    console.log(`✅ Found ${dynamicRoutes.length} dynamic routes.`);
    return dynamicRoutes;
  } catch (error) {
    console.error('⚠️ Warning: Failed to fetch Sanity dynamic routes:', error.message);
    return [];
  }
}

function sanitizePrerenderedHtml(html) {
  const originalLength = html.length;
  let sanitized = html.replace(/<script>try\{[\s\S]*?console-ninja[\s\S]*?<\/script>/gi, '');
  sanitized = sanitized.replace(/<script>try\{[\s\S]*?wallabyjs[\s\S]*?<\/script>/gi, '');

  const removedBytes = originalLength - sanitized.length;
  if (removedBytes > 0) {
    console.log(`   ├─ Removed ${removedBytes} bytes of local dev instrumentation`);
  }

  return sanitized;
}

function warnIfCrawlerMetadataIsLate(route, html) {
  const crawlerScanWindow = html.slice(0, 64 * 1024);
  const checks = [
    ['title', /<title>[^<]+<\/title>/i],
    ['description', /<meta[^>]+name=["']description["']/i],
    ['og:image', /<meta[^>]+property=["']og:image["']/i],
    ['twitter:image', /<meta[^>]+name=["']twitter:image["']/i],
  ];

  for (const [label, pattern] of checks) {
    if (!pattern.test(crawlerScanWindow)) {
      console.warn(`   ⚠️ WARNING: ${route} ${label} is missing from the first 64 KB.`);
    }
  }
}

async function run() {
  console.log('🚀 Starting Pre-render process...');

  const dynamicRoutes = await fetchDynamicRoutes();
  const allRoutes = [...new Set([...staticRoutes, ...dynamicRoutes])]; // Merge and dedupe

  console.log(`🗺️  Total routes to pre-render: ${allRoutes.length}`);

  // Start a local server to serve the built /dist folder
  console.log('🌐 Starting local preview server...');
  const server = spawn('npm', ['run', 'preview', '--', '--port', '4173'], {
    stdio: 'ignore',
    shell: true,
  });

  // Wait a moment for the server to spin up
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Health check: verify server is actually running before proceeding
  try {
    const healthCheck = await fetch('http://localhost:4173/', { method: 'HEAD' });
    if (!healthCheck.ok) throw new Error(`HTTP ${healthCheck.status}`);
    console.log('✅ Preview server health check passed.');
  } catch (error) {
    console.error('❌ Preview server failed to start. Cannot pre-render.');
    server.kill();
    process.exit(1);
  }

  console.log('🎭 Launching Playwright browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const distDir = path.resolve(process.cwd(), 'dist');

  for (const route of allRoutes) {
    try {
      console.log(`📸 Snapshotting: ${route}`);
      const url = `http://localhost:4173${route}`;

      // Navigate to the route. Wait until network is idle so all XHR/Fetch API calls finish loading
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

      // Guardrail 2: The "Loading & Animation" Trap
      // Force disable all CSS animations/transitions so we capture the final settled state, not an opacity:0 frame
      await page.evaluate(() => {
        const style = document.createElement('style');
        style.innerHTML = `
          * {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            visibility: visible !important;
          }
        `;
        document.head.appendChild(style);
      });

      // Extra safety buffer for complex Framer Motion unmounts / hydrating logic
      await page.waitForTimeout(1500);

      // Get the fully serialized DOM HTML
      let html = await page.content();
      html = sanitizePrerenderedHtml(html);

      // Quality gate: warn if essential SEO elements are missing
      if (!html.includes('<title>') || !html.includes('<title></title>') === false) {
        if (!/<title>[^<]+<\/title>/.test(html)) {
          console.warn(`   ⚠️ WARNING: ${route} has no <title> tag — possible blank snapshot.`);
        }
      }
      if (!/<h1[\s>]/i.test(html)) {
        console.warn(`   ⚠️ WARNING: ${route} has no <h1> tag.`);
      }
      warnIfCrawlerMetadataIsLate(route, html);

      // Clean up injected Playwright/Vite preview scripts if needed, though they are usually harmless

      // Determine file path: /about -> /dist/about/index.html
      const isIndex = route === '/';
      const routePath = isIndex ? '' : route;
      const targetDir = path.join(distDir, routePath);
      const targetFile = path.join(targetDir, 'index.html');

      // Make directory if it doesn't exist
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      // Write HTML to disk
      fs.writeFileSync(targetFile, html, 'utf-8');
      console.log(`   └─ Saved to ${targetFile}`);
    } catch (error) {
      console.error(`❌ Failed to pre-render ${route}:`, error);
    }
  }

  console.log('✅ Pre-rendering complete. Cleaning up...');
  await browser.close();
  server.kill();
  process.exit(0);
}

run();
