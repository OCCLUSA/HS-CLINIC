# Changelog

## 2026-07-14T19:48:16+03:00 — BLD and GRD

- **Files changed:** `src/app/components/cases/CaseComparisonSlider.tsx`, `src/app/components/cases/CaseComparisonSlider.test.tsx`, `src/app/pages/HsDentalCases.tsx`, `src/app/safety-foundation.test.tsx`, `src/styles/index.css`, and desktop/mobile local proof screenshots.
- **Summary:** Replaced the split-face wipe with a premium whole-photo Before/After choice. Each case now shows one complete photograph at a time, uses a short black-and-gold curtain between views, keeps the prepared image proportions unchanged, and limits the desktop card to 620 pixels so the teeth are not enlarged into a hybrid comparison.
- **QC status:** failing checks first reproduced the old slider expectations | 18 focused checks passed | 125 full-site tests passed | lint passed | build produced 29 sitemap URLs and validated 31 prerendered routes | all 20 built case photographs match the approved source files byte-for-byte and by SHA-256 | desktop proof found 10 complete photographs, 20 choices, 0 sliders, 0 broken photographs, 620-pixel cards, and no horizontal overflow | mobile proof found 10 complete photographs, 0 broken photographs, 342.67-pixel cards, and no horizontal overflow | both Before and After states verified for all ten cases | local only; no deployment, commit, or push performed.

## 2026-07-14T18:38:23+03:00 — BLD and GRD

- **Files changed:** `vite.config.ts`, `src/app/pages/HsDentalCases.tsx`, `src/app/safety-foundation.test.tsx`, `_AGENT_COORD/PROPOSALS/PROP-004-approved-case-image-quality-rescue.md`, and desktop/mobile local proof screenshots.
- **Summary:** Stopped the production image tool from recompressing the twenty approved HS Dental Cases photographs, added fresh case-only image addresses so visitors do not receive older cached copies, and capped the desktop comparison width at the prepared 940-pixel image width to prevent enlargement blur.
- **QC status:** regression test failed before the final exclusion correction and passed afterward | 20 of 20 built photographs match their approved source files byte-for-byte and by SHA-256 | 125 tests passed | lint passed | build produced 29 sitemap URLs and validated 31 prerendered routes | Netlify production deploy `6a565a62a6170800e3f2e0d8` ready | the live custom domain returned all 20 versioned photographs with 20 exact byte and SHA-256 matches | live desktop and mobile proof found 10 sliders, 20 loaded images, 0 broken images, and no horizontal overflow | no commit or push performed.

## 2026-07-14T17:45:38+03:00 — BLD and GRD

- **Files changed:** `src/app/pages/HsDentalCases.tsx`, `src/lib/seo.ts`, `src/data/public-routes.json`, `public/llms.txt`, `src/app/growth-wiring.test.ts`, and `src/app/safety-foundation.test.tsx`.
- **Summary:** Applied the owner's confirmed publication and search approval to all ten HS Dental Cases and twenty patient photographs. Removed the gallery noindex restriction, enabled large image previews, added the gallery to the sitemap and AI-search guide, and added matching canonical, hreflang, ImageGallery, and breadcrumb signals.
- **QC status:** focused tests passed with 28 tests | full tests passed with 124 tests | lint passed | build produced 29 sitemap URLs and 31 prerendered pages | local browser found 10 sliders, 20 loaded images, 0 broken images, and no horizontal overflow | Netlify production deploy `6a564b64275467ffe4a4f4b5` ready | live gallery, sitemap, and `llms.txt` returned HTTP 200 with the approved indexing signals present.

## 2026-07-14T17:29:00+03:00 — BLD and GRD

- **Files changed:** `src/app/pages/HsDentalCases.tsx`, `src/app/components/cases/CaseComparisonSlider.tsx`, their focused safety tests, and 20 approved WebP assets under `src/assets/cases/`.
- **Summary:** Replaced the unintended empty HS Dental Cases placeholder with ten owner-approved cinematic before-and-after sliders. Kept the clinical photographs unaltered, added bounded case captions, and protected mobile caption space from the floating contact buttons.
- **QC status:** baseline build passed | failing regression test reproduced the empty page | 20 of 20 copied source hashes matched | focused tests passed with 17 tests | full tests passed with 124 tests | lint passed | build passed with 28 sitemap URLs and 31 validated prerender routes | local desktop and mobile browser proof found 10 sliders, 20 loaded case images, 0 broken case images, and 0 mobile horizontal overflow.

## 2026-07-14T16:47:00+03:00 — BLD

- **Files changed:** `src/app/components/Layout.tsx`, `src/app/components/Layout.test.tsx`, `src/app/pages/tourism/RegionalTourismPage.tsx`, `src/app/pages/tourism/RegionalTourismPage.test.tsx`.
- **Summary:** Simplified the global menu under “International Patients” to records, journey, Gulf guide, Europe guide, and partnerships. Converted the Gulf and Europe regional pages into country-selection hubs with “Travelling from” links.
- **QC status:** focused tests passed with 13 tests | full tests passed with 124 tests | lint passed | build passed with 28 sitemap URLs and 31 validated prerender routes | desktop and mobile local browser proof passed | no commit, push, or deployment performed.

## 2026-07-14T15:18:00+03:00 — GRD

- **Files changed:** `src/hooks/useCmsData.ts`, `src/hooks/useCmsData.test.ts`, `src/app/components/Layout.test.tsx`, `_AGENT_COORD/PROPOSALS/PROP-003-approved-home-photo-menu-release.md`.
- **Summary:** Restored the owner-approved exact homepage consultation photo without weakening the CMS wording safeguards. Added desktop and mobile proof that HS Dental Cases, Send Your Records, Company Partnerships, Kuwait, Qatar, Oman, and Bahrain are linked from the main navigation.
- **QC status:** baseline tests passed with 120 tests | focused tests passed with 26 tests | lint passed | full tests passed with 122 tests | build passed with 28 sitemap URLs and 31 validated prerender routes | local desktop and mobile browser proof passed | production deployment pending the separately required commit and push approval.

## 2026-07-07T07:25:34+03:00 — BLD

- **Files changed:** `src/app/components/Layout.tsx`.
- **Summary:** Added all regional dental tourism pages and the Gulf/Europe implant travel guides into one Dental Tourism submenu on desktop and mobile, while preserving the existing Services submenu behavior.
- **QC status:** baseline build passed before edit | lint passed | full test suite passed with 11 files and 54 tests | build/prerender passed with 29 sitemap URLs and 30 prerendered routes | browser proof passed with 8/8 Dental Tourism submenu links visible on desktop and mobile.

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
