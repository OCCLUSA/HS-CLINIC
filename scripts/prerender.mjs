import { chromium } from 'playwright';
import { createClient } from '@sanity/client';
import { spawn } from 'child_process';
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
const PREVIEW_URL = 'http://localhost:4173';
const routeManifestPath = path.resolve(process.cwd(), 'src/data/public-routes.json');
const publicRoutes = JSON.parse(fs.readFileSync(routeManifestPath, 'utf8'));
const manifestByPath = new Map(publicRoutes.map((route) => [route.path, route]));

function validateRouteManifest(routes) {
  const seen = new Set();
  for (const route of routes) {
    if (!route.path?.startsWith('/') || seen.has(route.path)) {
      throw new Error(`Invalid or duplicate public route: ${route.path}`);
    }
    if (route.sitemap && (!route.indexable || !route.prerender)) {
      throw new Error(`Sitemap route must be indexable and prerendered: ${route.path}`);
    }
    seen.add(route.path);
  }
}

async function fetchDynamicServiceRoutes() {
  try {
    const docs = await sanityClient.fetch(
      `*[_type == "service" && defined(slug.current) && ownerApproved == true && clinicianCopyApproved == true]{"slug": slug.current}`
    );
    const routes = docs
      .filter((doc) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(doc.slug))
      .map((doc) => `/services/${doc.slug}`);
    console.log(`✅ Found ${routes.length} dynamic service routes.`);
    return routes;
  } catch (error) {
    console.warn(`⚠️ Sanity service routes unavailable: ${error.message}`);
    return [];
  }
}

function sanitizePrerenderedHtml(html) {
  let sanitized = html.replace(/<script>try\{[\s\S]*?console-ninja[\s\S]*?<\/script>/gi, '');
  sanitized = sanitized.replace(/<script>try\{[\s\S]*?wallabyjs[\s\S]*?<\/script>/gi, '');
  return sanitized;
}

function getAttribute(tag, name) {
  const match = tag.match(new RegExp(`\\s${name}=["']([^"']*)["']`, 'i'));
  return match?.[1];
}

function tagsByAttribute(html, tagName, attribute, value) {
  const tags = html.match(new RegExp(`<${tagName}\\b[^>]*>`, 'gi')) ?? [];
  return tags.filter((tag) => getAttribute(tag, attribute)?.toLowerCase() === value.toLowerCase());
}

function validateJsonLd(route, html) {
  const scripts = [
    ...html.matchAll(
      /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
    ),
  ];
  for (const script of scripts) {
    try {
      JSON.parse(script[1]);
    } catch (error) {
      throw new Error(`${route} contains invalid JSON-LD: ${error.message}`);
    }
  }
}

function validateSnapshot(route, html) {
  const errors = [];
  const htmlWithoutScripts = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  const expectedCanonical = route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`;
  const titleMatches = [...html.matchAll(/<title(?:\s[^>]*)?>([\s\S]*?)<\/title>/gi)];
  const descriptions = tagsByAttribute(html, 'meta', 'name', 'description');
  const canonicals = tagsByAttribute(html, 'link', 'rel', 'canonical');
  const robots = tagsByAttribute(html, 'meta', 'name', 'robots');
  const h1Count = (htmlWithoutScripts.match(/<h1\b/gi) ?? []).length;
  const alternateTags = tagsByAttribute(html, 'link', 'rel', 'alternate');
  const hrefLangs = alternateTags.map((tag) => getAttribute(tag, 'hreflang')).filter(Boolean);
  const routePolicy = manifestByPath.get(route);

  if (titleMatches.length !== 1 || !titleMatches[0]?.[1].trim()) {
    errors.push(`expected one non-empty title, found ${titleMatches.length}`);
  }
  if (descriptions.length !== 1 || !getAttribute(descriptions[0], 'content')?.trim()) {
    errors.push(`expected one non-empty description, found ${descriptions.length}`);
  }
  if (canonicals.length !== 1) {
    errors.push(`expected one canonical, found ${canonicals.length}`);
  } else if (getAttribute(canonicals[0], 'href') !== expectedCanonical) {
    errors.push(
      `canonical mismatch: ${getAttribute(canonicals[0], 'href')} instead of ${expectedCanonical}`
    );
  }
  if (h1Count !== 1) {
    errors.push(`expected one H1, found ${h1Count}`);
  }
  if (robots.length !== 1) {
    errors.push(`expected one robots tag, found ${robots.length}`);
  }
  if (new Set(hrefLangs).size !== hrefLangs.length) {
    errors.push('duplicate hreflang values');
  }

  const requiredSocialTags = [
    ['property', 'og:title'],
    ['property', 'og:description'],
    ['property', 'og:url'],
    ['property', 'og:image'],
    ['property', 'og:image:alt'],
    ['property', 'og:type'],
    ['property', 'og:site_name'],
    ['name', 'twitter:card'],
    ['name', 'twitter:title'],
    ['name', 'twitter:description'],
    ['name', 'twitter:image'],
  ];
  for (const [attribute, value] of requiredSocialTags) {
    const matches = tagsByAttribute(html, 'meta', attribute, value);
    if (matches.length !== 1 || !getAttribute(matches[0], 'content')?.trim()) {
      errors.push(`missing required social tag ${value}`);
    }
  }

  const ogUrls = tagsByAttribute(html, 'meta', 'property', 'og:url');
  if (ogUrls.length === 1 && getAttribute(ogUrls[0], 'content') !== expectedCanonical) {
    errors.push('Open Graph URL does not match canonical');
  }

  const robotsContent = robots.map((tag) => getAttribute(tag, 'content') ?? '').join(',').toLowerCase();
  if (routePolicy?.indexable === false && !robotsContent.includes('noindex')) {
    errors.push('manifest marks route noindex but HTML does not');
  }
  if (routePolicy?.indexable !== false && robotsContent.includes('noindex')) {
    errors.push('indexable route rendered noindex');
  }
  if (routePolicy?.indexable !== false && !hrefLangs.some((value) => value.toLowerCase() === 'x-default')) {
    errors.push('missing x-default hreflang');
  }
  if (/visibility:\s*visible\s*!important/i.test(html) || /data-prerender-helper/i.test(html)) {
    errors.push('temporary prerender CSS leaked into the saved page');
  }
  if (/Page Not Found|The page you are looking for does not exist/i.test(htmlWithoutScripts)) {
    errors.push('not-found content rendered for a public route');
  }

  try {
    validateJsonLd(route, html);
  } catch (error) {
    errors.push(error.message);
  }

  if (errors.length > 0) {
    throw new Error(`${route}: ${errors.join('; ')}`);
  }
}

async function waitForPreview() {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const response = await fetch(`${PREVIEW_URL}/`, { method: 'HEAD' });
      if (response.ok) return;
    } catch {
      // The preview process is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error('Preview server did not become healthy within 15 seconds.');
}

async function settleViewportAnimations(page) {
  await page.evaluate(async () => {
    const pause = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
    const maximumScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
    const step = Math.max(Math.floor(window.innerHeight * 0.8), 600);
    for (let position = 0; position <= maximumScroll; position += step) {
      window.scrollTo(0, position);
      await pause(35);
    }
    window.scrollTo(0, 0);
    await pause(250);
  });
}

async function stopServer(server) {
  if (server.exitCode !== null || server.killed) return;
  const exited = new Promise((resolve) => server.once('exit', resolve));
  server.kill();
  await Promise.race([exited, new Promise((resolve) => setTimeout(resolve, 3000))]);
}

async function run() {
  console.log('🚀 Starting fail-closed prerender process...');
  validateRouteManifest(publicRoutes);

  const dynamicRoutes = await fetchDynamicServiceRoutes();
  const manifestRoutes = publicRoutes
    .filter((route) => route.prerender)
    .map((route) => route.path);
  const allRoutes = [...new Set([...manifestRoutes, ...dynamicRoutes])];
  const snapshots = new Map();
  const failures = [];
  const viteBin = path.resolve(process.cwd(), 'node_modules/vite/bin/vite.js');
  const server = spawn(process.execPath, [viteBin, 'preview', '--port', '4173'], {
    stdio: 'ignore',
    shell: false,
  });
  let browser;

  try {
    await waitForPreview();
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ reducedMotion: 'reduce' });

    for (const route of allRoutes) {
      const page = await context.newPage();
      const pageErrors = [];
      page.on('pageerror', (error) => pageErrors.push(error.message));

      try {
        console.log(`📸 Auditing: ${route}`);
        const response = await page.goto(`${PREVIEW_URL}${route}`, {
          waitUntil: 'networkidle',
          timeout: 30000,
        });
        if (!response?.ok()) {
          throw new Error(`HTTP ${response?.status() ?? 'unknown'}`);
        }

        const finalPath = new URL(page.url()).pathname.replace(/\/$/, '') || '/';
        const expectedPath = route.replace(/\/$/, '') || '/';
        if (finalPath !== expectedPath) {
          throw new Error(`route redirected to ${finalPath}`);
        }

        await page.locator('h1').first().waitFor({ state: 'visible', timeout: 10000 });
        await settleViewportAnimations(page);
        if (pageErrors.length > 0) {
          throw new Error(`browser error: ${pageErrors.join(' | ')}`);
        }

        const html = sanitizePrerenderedHtml(await page.content());
        validateSnapshot(route, html);
        snapshots.set(route, html);
      } catch (error) {
        failures.push(`${route}: ${error.message}`);
      } finally {
        await page.close();
      }
    }
  } finally {
    if (browser) await browser.close();
    await stopServer(server);
  }

  if (failures.length > 0) {
    throw new Error(`Prerender quality gate failed:\n${failures.join('\n')}`);
  }

  const distDir = path.resolve(process.cwd(), 'dist');
  for (const [route, html] of snapshots) {
    const relativeRoute = route === '/' ? '' : route.replace(/^\/+/, '');
    const targetDir = path.join(distDir, relativeRoute);
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
  }

  console.log(`✅ Prerendered and validated ${snapshots.size} routes after stopping the server.`);
}

run().catch((error) => {
  console.error('❌ Prerender failed:', error.message);
  process.exit(1);
});
