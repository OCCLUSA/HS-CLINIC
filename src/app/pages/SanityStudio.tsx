import { Helmet } from 'react-helmet-async';

const STUDIO_URL = `https://hs-dental-clinic.sanity.studio`;

/**
 * CMS Dashboard — links to the hosted Sanity Studio.
 *
 * Access control is handled by Sanity's built-in authentication
 * (Google / GitHub / email). No client-side gate needed here.
 */
export default function SanityStudio() {
  return (
    <div className="bg-dark-950 flex min-h-screen flex-col items-center justify-center px-4">
      <Helmet>
        <title>CMS Dashboard | HS Clinic</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="w-full max-w-md space-y-8 text-center">
        {/* Logo / Icon */}
        <div className="from-gold-400 to-gold-600 mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br shadow-[0_0_40px_rgba(212,175,55,0.3)]">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-dark-950"
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        </div>

        <div>
          <h1 className="mb-2 font-serif text-3xl text-white">Content Dashboard</h1>
          <p className="text-sm text-gray-400">
            Manage your clinic&apos;s content, services, testimonials, and page data through the
            Sanity Studio. You&apos;ll be asked to sign in with your authorized account.
          </p>
        </div>

        <a
          href={STUDIO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gold-400 text-dark-950 inline-flex items-center gap-3 rounded-lg px-8 py-4 font-bold transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
        >
          Open Sanity Studio
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>

        <p className="font-mono text-xs text-gray-400">
          Project ID: nk38o90y &middot; Target: production
        </p>
      </div>
    </div>
  );
}
