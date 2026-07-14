import { Link } from 'react-router-dom';
import { ChevronRight, CalendarCheck, ClipboardCheck, ScanLine, Stethoscope } from 'lucide-react';
import { useHero, useSanityImage } from '@/hooks/useCmsData';

export function CyberHero() {
  const hero = useHero();
  const bgUrl = useSanityImage(hero.backgroundImage, 1920);
  const bgUrlSmall = useSanityImage(hero.backgroundImage, 768);
  const bgUrlMedium = useSanityImage(hero.backgroundImage, 1280);

  // Split title into two lines for the gradient effect — first word is white, rest is gold
  const titleWords = hero.title.split(' ');
  const firstLine = titleWords.slice(0, 2).join(' ');
  const secondLine = titleWords.slice(2).join(' ');

  return (
    <section className="bg-dark-950 relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* CMS background image (if set) */}
      {bgUrl && (
        <img
          src={bgUrl}
          srcSet={`${bgUrlSmall} 768w, ${bgUrlMedium} 1280w, ${bgUrl} 1920w`}
          sizes="100vw"
          alt={hero.backgroundImageAlt}
          className="absolute inset-0 h-full w-full object-cover opacity-30"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      )}
      {/* Background Grid & Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(197,165,90,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(197,165,90,0.04)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-[size:4rem_4rem]" />
      <div className="bg-gold-400/15 absolute top-0 left-1/2 h-[400px] w-[1000px] -translate-x-1/2 rounded-full mix-blend-screen blur-[120px]" />
      <div className="bg-gold-600/8 absolute right-0 bottom-0 h-[600px] w-[800px] rounded-full mix-blend-screen blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="border-gold-400/30 bg-gold-400/10 text-gold-400 mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2">
          <Stethoscope className="h-4 w-4" />
          <span className="text-sm font-medium">
            Dental implants, smile design, and bite care in Cairo
          </span>
        </div>

        <h1 className="mb-8 font-serif text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl">
          <span className="block text-white">{firstLine}</span>
          {' '}
          <span className="from-gold-300 via-gold-400 bg-gradient-to-r to-white bg-clip-text text-transparent">
            {secondLine}
          </span>
        </h1>

        <p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed font-normal text-gray-300 md:text-2xl">
          {hero.subtitle}
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <Link
            to={hero.ctaLink}
            className="group bg-gold-400 text-dark-950 relative overflow-hidden rounded-lg px-8 py-4 font-bold transition-all hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] motion-reduce:transform-none motion-reduce:transition-none"
          >
            <div className="absolute inset-0 translate-y-full bg-white/40 transition-transform duration-300 group-hover:translate-y-0" />
            <span className="relative flex items-center gap-2">
              {hero.ctaText} <ChevronRight className="h-5 w-5" />
            </span>
          </Link>

          <Link
            to="/technology"
            className="border-gold-400/30 hover:bg-gold-400/10 group flex items-center gap-2 rounded-lg border px-8 py-4 text-white transition-all"
          >
            <ScanLine className="text-gold-400 group-hover:text-gold-300 h-5 w-5 transition-colors" />
            See clinic technology
          </Link>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="pointer-events-none absolute top-1/4 left-4 hidden scale-[0.85] animate-float md:block lg:left-10 lg:scale-100 motion-reduce:animate-none">
        <div className="glass-card border-gold-400 border-l-4 p-4">
          <div className="text-gold-400 mb-1 text-xs font-semibold">Before you travel</div>
          <div className="flex items-center gap-2 text-lg font-bold text-white">
            <ClipboardCheck className="h-5 w-5 text-gold-400" />
            Records review
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute right-4 bottom-1/4 hidden scale-[0.85] animate-float md:block lg:right-10 lg:scale-100 motion-reduce:animate-none">
        <div className="glass-card border-gold-500 border-r-4 p-4">
          <div className="text-gold-500 mb-1 text-xs font-semibold">First step</div>
          <div className="flex items-center gap-2 text-lg font-bold text-white">
            <CalendarCheck className="h-5 w-5 text-gold-500" />
            Book consultation
          </div>
        </div>
      </div>
    </section>
  );
}
