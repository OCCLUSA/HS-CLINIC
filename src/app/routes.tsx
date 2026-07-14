import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import { Layout } from './components/Layout';
const Home = lazy(() => import('@/app/pages/Home').then((module) => ({ default: module.Home })));
const About = lazy(() => import('@/app/pages/About').then((module) => ({ default: module.About })));
const Services = lazy(() =>
  import('@/app/pages/Services').then((module) => ({ default: module.Services }))
);
const Technology = lazy(() =>
  import('@/app/pages/Technology').then((module) => ({ default: module.Technology }))
);
const Contact = lazy(() =>
  import('@/app/pages/Contact').then((module) => ({ default: module.Contact }))
);
const DigitalSmileDesign = lazy(() => import('@/app/pages/DigitalSmileDesign'));
const DentalTourism = lazy(() => import('@/app/pages/DentalTourism'));
const SendYourRecords = lazy(() => import('@/app/pages/SendYourRecords'));
const Gallery = lazy(() => import('@/app/pages/Gallery'));
const SanityStudio = lazy(() => import('@/app/pages/SanityStudio'));
const DentalImplants = lazy(() => import('@/app/pages/services/DentalImplants'));
const TmdTreatment = lazy(() => import('@/app/pages/services/TmdTreatment'));
const ClearAligners = lazy(() => import('@/app/pages/services/ClearAligners'));
const FullArchRehab = lazy(() => import('@/app/pages/services/FullArchRehab'));
const ServiceDetailPage = lazy(() => import('@/app/pages/services/ServiceDetailPage'));
const TourismProgram = lazy(() => import('@/app/pages/tourism/TourismProgram'));
const DentalTourismPartners = lazy(() =>
  import('@/app/pages/tourism/DentalTourismPartners')
);
const RegionalTourismPage = lazy(() => import('@/app/pages/tourism/RegionalTourismPage'));
const RegionalEducationPage = lazy(() => import('@/app/pages/tourism/RegionalEducationPage'));
const PrivacyPolicy = lazy(() => import('@/app/pages/legal/PrivacyPolicy'));
const TermsOfService = lazy(() => import('@/app/pages/legal/TermsOfService'));
const MedicalDisclaimer = lazy(() => import('@/app/pages/legal/MedicalDisclaimer'));
const Guarantee = lazy(() => import('@/app/pages/legal/Guarantee'));
const NotFound = lazy(() =>
  import('@/app/pages/NotFound').then((module) => ({ default: module.NotFound }))
);

// Simple loading fallback
const PageLoader = () => (
  <div
    className="flex min-h-screen items-center justify-center bg-slate-950 text-amber-400"
    role="status"
    aria-live="polite"
  >
    <span className="sr-only">Loading page</span>
    <div
      className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-current"
      aria-hidden="true"
    />
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<PageLoader />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<PageLoader />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: 'services',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Services />
          </Suspense>
        ),
      },
      {
        path: 'technology',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Technology />
          </Suspense>
        ),
      },
      {
        path: 'digital-smile-design',
        element: (
          <Suspense fallback={<PageLoader />}>
            <DigitalSmileDesign />
          </Suspense>
        ),
      },
      {
        path: 'dental-tourism',
        element: (
          <Suspense fallback={<PageLoader />}>
            <DentalTourism />
          </Suspense>
        ),
      },
      {
        path: 'dental-tourism/program',
        element: (
          <Suspense fallback={<PageLoader />}>
            <TourismProgram />
          </Suspense>
        ),
      },
      {
        path: 'dental-tourism/partners',
        element: (
          <Suspense fallback={<PageLoader />}>
            <DentalTourismPartners />
          </Suspense>
        ),
      },
      {
        path: 'dental-tourism/:regionSlug/dental-implant-travel-guide',
        element: (
          <Suspense fallback={<PageLoader />}>
            <RegionalEducationPage />
          </Suspense>
        ),
      },
      {
        path: 'dental-tourism/:regionSlug',
        element: (
          <Suspense fallback={<PageLoader />}>
            <RegionalTourismPage />
          </Suspense>
        ),
      },
      {
        path: 'gallery',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Gallery />
          </Suspense>
        ),
      },
      {
        path: 'send-your-records',
        element: (
          <Suspense fallback={<PageLoader />}>
            <SendYourRecords />
          </Suspense>
        ),
      },
      {
        path: 'services/dental-implants',
        element: (
          <Suspense fallback={<PageLoader />}>
            <DentalImplants />
          </Suspense>
        ),
      },
      {
        path: 'services/tmj-tmd-treatment',
        element: (
          <Suspense fallback={<PageLoader />}>
            <TmdTreatment />
          </Suspense>
        ),
      },
      {
        path: 'services/clear-aligners',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ClearAligners />
          </Suspense>
        ),
      },
      {
        path: 'services/full-arch-rehabilitation',
        element: (
          <Suspense fallback={<PageLoader />}>
            <FullArchRehab />
          </Suspense>
        ),
      },
      {
        path: 'services/:slug',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ServiceDetailPage />
          </Suspense>
        ),
      },
      {
        path: 'contact',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: 'privacy-policy',
        element: (
          <Suspense fallback={<PageLoader />}>
            <PrivacyPolicy />
          </Suspense>
        ),
      },
      {
        path: 'terms-of-service',
        element: (
          <Suspense fallback={<PageLoader />}>
            <TermsOfService />
          </Suspense>
        ),
      },
      {
        path: 'medical-disclaimer',
        element: (
          <Suspense fallback={<PageLoader />}>
            <MedicalDisclaimer />
          </Suspense>
        ),
      },
      {
        path: 'guarantee',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Guarantee />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<PageLoader />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/studio',
    element: (
      <Suspense fallback={<PageLoader />}>
        <SanityStudio />
      </Suspense>
    ),
  },
]);
