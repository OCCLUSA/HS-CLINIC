import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';
import { SITE_NAME } from '@/lib/seo';

export function NotFound() {
  return (
    <div className="bg-dark-950 flex min-h-[80vh] items-center justify-center px-4">
      <Helmet>
        <title>404 — Page Not Found | {SITE_NAME}</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="text-center">
        {/* Glitch-style 404 */}
        <div className="relative mb-8">
          <div className="text-gold-400/10 font-mono text-[10rem] leading-none font-bold select-none md:text-[14rem]">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <AlertTriangle className="text-gold-400 h-16 w-16 animate-pulse md:h-24 md:w-24" />
          </div>
        </div>

        <h1 className="text-gold-400 mb-2 font-mono text-sm tracking-[0.3em] uppercase">
          SIGNAL LOST
        </h1>
        <h2 className="mb-4 font-serif text-3xl text-white md:text-4xl">Page Not Found</h2>
        <p className="mx-auto mb-10 max-w-md text-gray-400">
          The coordinates you entered don&apos;t match any known location in our system.
          Re-calibrate your navigation and try again.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="bg-gold-400 text-dark-950 group inline-flex items-center gap-2 rounded-lg px-6 py-3 font-bold transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
          >
            <Home className="h-4 w-4" />
            Return to Base
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="border-gold-400/30 hover:bg-gold-400/10 inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-white transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>

        {/* Decorative scan line */}
        <div className="bg-gold-400/5 mx-auto mt-16 h-px w-48" />
        <p className="mt-4 font-mono text-xs text-gray-400">ERROR_CODE: 0x404 // ROUTE_NOT_FOUND</p>
      </div>
    </div>
  );
}
