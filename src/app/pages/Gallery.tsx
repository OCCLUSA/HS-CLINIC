import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { SEO, SITE_NAME, DEFAULT_OG_IMAGE, GALLERY_JSONLD } from '@/lib/seo';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useBeforeAfterCases } from '@/hooks/useCmsData';

/* ── Slider sub-component (unchanged visual logic) ── */
function Slider({ before, after, label }: { before: string; after: string; label: string }) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | string>('100%');

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPos((x / rect.width) * 100);
  };

  return (
    <div className="space-y-3">
      <div
        ref={containerRef}
        className="relative h-72 w-full cursor-col-resize overflow-hidden rounded-xl border border-white/10 select-none sm:h-96"
        onMouseMove={(e) => e.buttons === 1 && handleMove(e.clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      >
        {/* After (full background) */}
        <img
          src={after}
          alt="After treatment"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        {/* Before (clipped) */}
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
          <img
            src={before}
            alt="Before treatment"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ minWidth: width }}
            loading="lazy"
          />
        </div>
        {/* Divider line */}
        <div className="absolute top-0 bottom-0 z-10" style={{ left: `${pos}%` }}>
          <div className="bg-gold-400 absolute h-full w-0.5 -translate-x-1/2 shadow-[0_0_10px_rgba(212,175,55,0.6)]" />
          <div className="bg-dark-950 border-gold-400 absolute top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M5 2L1 8L5 14" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
              <path d="M11 2L15 8L11 14" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        {/* Labels */}
        <div className="bg-dark-950/80 absolute top-3 left-3 z-20 rounded px-2 py-1 font-mono text-xs text-white">
          BEFORE
        </div>
        <div className="bg-gold-400/20 text-gold-400 absolute top-3 right-3 z-20 rounded px-2 py-1 font-mono text-xs">
          AFTER
        </div>
      </div>
      <p className="text-center font-mono text-sm text-gray-400">{label}</p>
    </div>
  );
}

/* ── Gallery page ── */
export default function Gallery() {
  const { cases } = useBeforeAfterCases();

  return (
    <div className="bg-dark-950 min-h-screen">
      <Helmet>
        <title>{SEO.gallery.title}</title>
        <meta name="description" content={SEO.gallery.description} />
        <link rel="canonical" href={SEO.gallery.canonical} />
        <meta property="og:title" content={SEO.gallery.title} />
        <meta property="og:description" content={SEO.gallery.description} />
        <meta property="og:url" content={SEO.gallery.canonical} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:alt" content="Dr. Haitham Sharshar — HS Clinic Cairo" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.gallery.title} />
        <meta name="twitter:description" content={SEO.gallery.description} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(GALLERY_JSONLD)}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative flex items-center justify-center overflow-hidden px-4 py-32 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(197,165,90,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(197,165,90,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        <div className="bg-gold-400/10 absolute top-0 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full mix-blend-screen blur-[150px]" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gold-400 mb-4 font-mono text-sm tracking-[0.3em] uppercase"
          >
            REAL RESULTS
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 font-serif text-4xl font-bold text-white md:text-6xl"
          >
            Before & After Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mx-auto max-w-2xl text-lg font-light text-gray-400"
          >
            Drag the slider to compare. Every case performed by Dr. Haitham Sharshar at HS Clinic,
            Cairo.
          </motion.p>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="px-4 pb-32 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Slider {...c} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative border-t border-white/5 px-4 py-24 text-center sm:px-6 lg:px-8">
        <h2 className="mb-6 font-serif text-3xl text-white md:text-5xl">
          Ready for Your Transformation?
        </h2>
        <Link
          to="/contact"
          className="bg-gold-400 text-dark-950 group relative inline-flex items-center gap-2 overflow-hidden rounded-lg px-10 py-5 font-bold transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(212,175,55,0.5)]"
        >
          <div className="absolute inset-0 translate-y-full bg-white/30 transition-transform duration-300 group-hover:translate-y-0" />
          <span className="relative flex items-center gap-2">
            Book Consultation <ChevronRight className="h-5 w-5" />
          </span>
        </Link>
      </section>
    </div>
  );
}
