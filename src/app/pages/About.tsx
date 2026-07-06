import React from 'react';
import { Award, GraduationCap, Heart, Users, Quote, type LucideIcon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { SEO, SITE_NAME, DEFAULT_OG_IMAGE, buildDoctorJsonLd } from '@/lib/seo';
import { SectionHeader } from '@/app/components/ui/SectionHeader';
import {
  useTeamMembers,
  useSanityImage,
  useAboutSettings,
  useSiteSettings,
} from '@/hooks/useCmsData';
import { PortableText } from '@portabletext/react';

/** Map icon name strings from CMS to Lucide components */
const ICON_MAP: Record<string, LucideIcon> = { Heart, Award, GraduationCap, Users };

export function About() {
  const { members } = useTeamMembers();
  const { about } = useAboutSettings();
  const { settings } = useSiteSettings();
  const doctor = members[0];
  const doctorImageUrl = useSanityImage(doctor?.image, 800);
  const ogImageUrl = useSanityImage(settings.ogImage, 1200) || DEFAULT_OG_IMAGE;

  const jsonLd = doctor
    ? buildDoctorJsonLd({
        name: doctor.name,
        role: doctor.role,
        bioExcerpt: SEO.about.description,
      })
    : null;

  // Split quote into two halves for the gold accent
  const quoteParts = about.quote.split('.');
  const quoteLine1 = (quoteParts[0] || '').trim() + '.';
  const quoteLine2 = quoteParts.slice(1).join('.').trim();

  return (
    <div className="bg-dark-950 min-h-screen pt-24 pb-12">
      <Helmet>
        <title>{SEO.about.title}</title>
        <meta name="description" content={SEO.about.description} />
        <link rel="canonical" href={SEO.about.canonical} />
        <meta property="og:title" content={SEO.about.title} />
        <meta property="og:description" content={SEO.about.description} />
        <meta property="og:url" content={SEO.about.canonical} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:alt" content="Dr. Haitham Sharshar — HS Clinic Cairo" />
        <meta property="og:type" content="profile" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.about.title} />
        <meta name="twitter:description" content={SEO.about.description} />
        <meta name="twitter:image" content={ogImageUrl} />
        {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader title="The Visionary" subtitle="DR. HAITHAM SHARSHAR" />

        {/* Bio Section */}
        <div className="mb-32 grid items-center gap-16 md:grid-cols-2">
          {/* Image Hologram */}
          <div className="group relative">
            <div className="bg-gold-400/15 absolute inset-0 rounded-full opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-50" />
            <div className="border-gold-400/30 bg-dark-900/50 relative overflow-hidden rounded-2xl border p-1 backdrop-blur-sm">
              <img
                src={
                  doctorImageUrl ||
                  'https://images.unsplash.com/photo-1631596577204-53ad0d6e6978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZW50aXN0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcwNzEyOTQzfDA&ixlib=rb-4.1.0&q=80&w=1080'
                }
                alt={doctor?.name || 'Dr. Sharshar'}
                className="rounded-xl grayscale transition-all duration-700 group-hover:grayscale-0"
                loading="lazy"
              />
              <div className="bg-dark-950/80 absolute right-4 bottom-4 left-4 rounded border border-white/10 p-3 backdrop-blur transition-opacity group-hover:opacity-100 lg:opacity-0">
                <div className="text-gold-400 mb-1 font-mono text-xs">ID: DHS-001</div>
                <div className="text-sm text-white">{doctor?.role || 'Chief Medical Officer'}</div>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div>
            <Quote className="text-gold-500/20 mb-6 h-12 w-12" />
            <h3 className="mb-6 font-serif text-2xl leading-tight text-white md:text-3xl">
              &quot;{quoteLine1} <br />
              <span className="text-gold-400">{quoteLine2}</span>&quot;
            </h3>
            <div className="space-y-6 text-lg font-light text-gray-400">
              {doctor?.bio ? (
                <PortableText value={doctor.bio} />
              ) : (
                <>
                  <p>
                    Working across digital dentistry in the Middle East, Dr. Sharshar has
                    discarded traditional guesswork in favor of{' '}
                    <span className="border-gold-400/30 border-b text-white">absolute data</span>.
                  </p>
                  <p>
                    By integrating aerospace-grade sensor technology with biological science, he
                    reconstructs not just smiles, but the functional harmony of the entire
                    cranio-facial system.
                  </p>
                </>
              )}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              {about.certifications.map((cert, i) => {
                let certContent: React.ReactNode = cert;

                // Add verification links for AI crawling support based on known CMS string matches
                if (typeof cert === 'string') {
                  if (cert.includes('Zebris')) {
                    certContent = (
                      <a
                        href="https://www.zebris.de/en/dental"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {cert}
                      </a>
                    );
                  } else if (cert.includes('exocad')) {
                    certContent = (
                      <a
                        href="https://exocad.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {cert}
                      </a>
                    );
                  }
                }

                return (
                  <div
                    key={i}
                    className={`rounded border border-white/10 bg-white/5 px-4 py-2 font-mono text-sm ${i === 0 ? 'text-gold-400' : 'text-gold-500'}`}
                  >
                    {certContent}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Values Matrix */}
        <div className="mb-24 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {about.values.map((val, i) => {
            const Icon = (val.iconName && ICON_MAP[val.iconName]) || Heart;
            return (
              <div
                key={i}
                className="bg-dark-900/50 hover:border-gold-400/50 group rounded-xl border border-white/5 p-6 transition-colors"
              >
                <Icon className="group-hover:text-gold-400 mb-4 h-8 w-8 text-gray-500 transition-colors" />
                <h4 className="mb-2 text-lg font-bold text-white">{val.title}</h4>
                <p className="text-sm text-gray-500">{val.description}</p>
              </div>
            );
          })}
        </div>

        {/* Credentials Data Stream */}
        <div className="flex flex-wrap items-center justify-between gap-8 border-t border-b border-white/5 py-12 text-center md:text-left">
          {about.stats.map((stat, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div className="hidden h-12 w-px bg-white/10 md:block" />}
              <div>
                <div className="font-mono text-5xl font-bold tracking-tighter text-white">
                  {stat.value}
                </div>
                <div className="text-gold-400 mt-1 text-xs tracking-widest uppercase">
                  {stat.label}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
