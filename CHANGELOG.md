# Changelog

## 2026-07-07T06:21:33+03:00 — BLD

- **Files changed:** `public/images/style-references/*`, `src/app/components/StyleReferenceShowcase.tsx`, `src/app/pages/DigitalSmileDesign.tsx`, `src/app/pages/services/DentalImplants.tsx`, `src/app/pages/DentalTourism.tsx`, `src/app/pages/tourism/RegionalEducationPage.tsx`.
- **Summary:** Converted 15 owner-approved style-reference images to public WebP assets with SEO/GEO file names, added a reusable visual planning section with visible captions and alt text, and embedded the images across Digital Smile Design, Dental Implants, Dental Tourism, and the Gulf/Europe implant travel guides.
- **QC status:** baseline build passed before edits | lint passed | full test suite passed with 11 files and 54 tests | build/prerender passed with 29 sitemap URLs and 30 prerendered routes | browser proof passed on 5 pages with 21 style-reference image placements, 0 missing alt text, 0 unloaded images after scroll, and 0 mobile horizontal overflow on checked pages.

## 2026-07-07T00:35:21+03:00 — BLD

- **Files changed:** `src/app/pages/tourism/RegionalEducationPage.tsx`, `src/lib/seo.ts`.
- **Summary:** Expanded the Gulf and Europe implant travel education pages with patient-readable sections on stackable digital guides, smile-design-led implant planning, CBCT guide planning, digital occlusion, jaw tracking, EMG screening, responsible travel records, and safety limits.
- **QC status:** lint passed | focused route and analytics tests passed with 7 tests | full test suite passed with 11 files and 54 tests | build/prerender passed with 29 sitemap URLs and 30 prerendered routes | source safety wording scan passed with 0 risky hits.

## 2026-07-06T23:55:00+03:00 — BLD

- **Files changed:** `docs/search-console-indexing-checklist.md`, `src/app/pages/tourism/RegionalEducationPage.tsx`, `src/app/pages/DentalTourism.tsx`, `src/app/pages/tourism/RegionalTourismPage.tsx`, `src/app/components/Layout.tsx`, `src/lib/seo.ts`, `src/lib/analytics.ts`, route/sitemap/prerender files, and focused tests.
- **Summary:** Added the first indexing and SEO batch: Search Console checklist, visible regional patient links, hreflang and regional metadata, Gulf and Europe dental implant travel guide pages, and privacy-safe WhatsApp/form conversion tracking.
- **QC status:** focused route and analytics tests passed with 7 tests | full test suite passed with 11 files and 54 tests | lint passed | build/prerender passed with 29 sitemap URLs and 30 prerendered routes | built SEO proof scan passed with 0 risky hits on checked pages.

## 2026-07-06T22:25:00+03:00 — BLD

- **Files changed:** `src/hooks/useCmsData.ts`, `src/hooks/useCmsData.test.ts`.
- **Summary:** Added a broader CMS safety fallback for live homepage hero copy, testimonials, dental tourism pricing rows, tourism FAQs, and tourism page settings. This prevents old Sanity wording such as VIP, luxury, world-class, fixed prices, high savings, warranty, lifetime, and guarantee claims from hydrating onto patient-facing pages.
- **QC status:** focused CMS guard test passed with 8 tests | full test suite passed with 10 files and 50 tests | lint passed | build/prerender passed with pre-existing `svgo` favicon optimizer warning.
## 2026-07-06T04:00:00+03:00 — BLD

- **Files changed:** `src/app/pages/tourism/RegionalTourismPage.tsx`, `src/app/routes.tsx`, `src/lib/seo.ts`, `scripts/generate-sitemap.mjs`, `scripts/prerender.mjs`, `public/llms.txt`, `scripts/generate-tests.mjs`
- **Summary:** Added Gulf, Saudi Arabia, UAE, Europe, UK, and Germany dental tourism landing pages with safe clinician-review wording, SEO metadata, FAQ/Breadcrumb/MedicalWebPage JSON-LD, sitemap coverage, prerender coverage, and AI summary links. Also fixed the existing test generator syntax blocker.
- **QC status:** build passed | lint passed | test passed | browser proof passed on six new regional pages

## 2026-07-06T04:10:00+03:00 — BLD

- **Files changed:** `src/app/pages/Contact.tsx`, `src/app/components/CookieConsent.tsx`
- **Summary:** Replaced technical contact language with patient-readable appointment wording, added clinician-review safety copy, improved WhatsApp booking text, and reduced cookie notice footprint with a longer delay.
- **QC status:** build passed | lint passed | test passed | browser proof passed on contact desktop and mobile

## 2026-07-06T04:30:00+03:00 — BLD

- **Files changed:** `src/app/components/CyberHero.tsx`, `src/app/components/ClinicalSimulation.tsx`, `src/app/components/Layout.tsx`, `src/app/pages/Home.tsx`, `src/hooks/useCmsData.ts`, `src/app/components/CyberHero.test.tsx`
- **Summary:** Replaced homepage system/demo language with patient-readable consultation, records-review, scan-review, and clinician-review wording. Removed unsupported homepage precision/status claims from the visible homepage fallback.
- **QC status:** build passed | lint passed | test passed | browser proof passed on homepage desktop and mobile

## 2026-07-06T04:45:00+03:00 — BLD

- **Files changed:** `src/app/components/tourism/FAQAccordion.tsx`, `src/app/components/tourism/WhyHSClinic.tsx`, `src/app/components/tourism/VIPWelcome.tsx`, `src/app/pages/tourism/TourismProgram.tsx`, `src/app/pages/services/ClearAligners.tsx`, `src/app/pages/services/FullArchRehab.tsx`, `src/hooks/useCmsData.ts`, `src/lib/seo.ts`, `src/app/components/tourism/WhyHSClinic.test.tsx`
- **Summary:** Replaced tourism, Digital Smile Design, implant, aligner, and full-arch certainty claims with case-dependent, clinician-reviewed wording for safety, infection control, temporary teeth, digital bite planning, guided surgery, and smile planning.
- **QC status:** build passed | lint passed | test passed | generated HTML scan passed | browser proof passed on tourism, DSD, clear aligners, and full arch
## 2026-07-06T04:56:57+03:00 — BLD

- **Files changed:** `src/lib/seo.ts`, `src/app/pages/legal/Guarantee.tsx`, `src/app/pages/legal/PrivacyPolicy.tsx`, `src/app/pages/legal/TermsOfService.tsx`, `src/app/pages/legal/MedicalDisclaimer.tsx`, `scripts/prerender.mjs`, `public/llms.txt`
- **Summary:** Added centralized search metadata and Open Graph/Twitter preview image tags for the guarantee, privacy, terms, and medical disclaimer pages. Added Terms of Service to prerender proof and AI policy links.
- **QC status:** build passed with pre-existing `svgo` optimizer warning | lint passed | test passed | HTML metadata scan passed on guarantee, privacy, terms, and medical disclaimer

## 2026-07-06T19:37:20+03:00 — BLD

- **Files changed:** `src/hooks/useCmsData.ts`, `src/hooks/useCmsData.test.ts`, `src/lib/seo.ts`, `src/app/pages/DentalTourism.tsx`, `src/app/pages/tourism/TourismProgram.tsx`, `src/app/components/PatientStories.tsx`, `src/app/components/tourism/FAQAccordion.tsx`, `src/app/components/tourism/ServicesGrid.tsx`, `src/app/components/tourism/WhyHSClinic.tsx`, `src/app/components/tourism/VIPWelcome.tsx`, `src/app/components/tourism/CuratedResidences.tsx`, `src/app/pages/Home.tsx`, `src/app/pages/About.tsx`, `src/app/components/Layout.tsx`, `src/app/pages/legal/Guarantee.tsx`, `src/app/pages/legal/TermsOfService.tsx`, `src/app/pages/services/DentalImplants.tsx`, `src/app/pages/services/FullArchRehab.tsx`, `src/app/pages/services/TmdTreatment.tsx`, `src/app/pages/tourism/RegionalTourismPage.tsx`, related focused tests.
- **Summary:** Removed unsupported fixed-price, savings, free consultation, lifetime, same-day certainty, perfection, luxury, and absolute TMD/implant claims from patient-facing fallback copy. Added a CMS service-pillar safety guard so unsafe Sanity service copy falls back to reviewed clinical wording instead of hydrating onto the page.
- **QC status:** focused CMS guard test passed | lint passed | test passed with 10 files and 45 tests | build/prerender passed with pre-existing `svgo` favicon optimizer warning | generated HTML unsafe-claim scan passed | published Sanity `dental-implants` record still contains unsafe copy and needs owner-approved CMS cleanup.

## 2026-07-06T20:13:19+03:00 — BLD

- **Files changed:** `src/app/components/Layout.tsx`, `src/app/components/tourism/WhyHSClinic.tsx`, `src/app/components/tourism/VIPWelcome.tsx`, `src/app/pages/tourism/TourismProgram.tsx`, `src/hooks/useCmsData.ts`, `src/app/components/tourism/WhyHSClinic.test.tsx`, `public/llms.txt`, `scripts/seed-sanity.mjs`, `output/cms-dental-implants-cleanup-proof.json`, `output/static-copy-rendered-text-scan-final.json`.
- **Summary:** Applied owner-approved live Sanity CMS cleanup for the dental implants service record and removed remaining local sales-heavy labels such as VIP, free consultation, lifetime warranty, fixed prices, and savings language from visible fallback copy and seed data. The legal coverage page stays reachable at `/guarantee`, but visible labels now say treatment coverage terms.
- **QC status:** live CMS unsafe-hit count changed from 10 to 0 | focused tests passed | full test suite passed with 10 files and 45 tests | lint passed | build/prerender passed with pre-existing `svgo` favicon optimizer warning | rendered local page scan passed with 0 risky hits on checked patient pages and 1 allowed disclaimer-only guarantee sentence.
