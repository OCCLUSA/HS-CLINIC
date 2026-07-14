import { PrivateYouTubeEmbed, type PrivateYouTubeEmbedProps } from '@/app/components/PrivateYouTubeEmbed';

interface PrivateVideoSectionProps {
  videos: PrivateYouTubeEmbedProps[];
  sectionTitle?: string;
  sectionSubtitle?: string;
}

export function PrivateVideoSection({
  videos,
  sectionTitle,
  sectionSubtitle,
}: PrivateVideoSectionProps) {
  if (!videos.length) return null;

  return (
    <section className="border-t border-white/5 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {(sectionTitle || sectionSubtitle) && (
          <div className="mb-14 text-center">
            {sectionSubtitle && (
              <p className="text-gold-400 mb-3 font-mono text-sm tracking-[0.3em] uppercase">
                {sectionSubtitle}
              </p>
            )}
            {sectionTitle && (
              <h3 className="font-serif text-4xl text-white md:text-5xl">{sectionTitle}</h3>
            )}
          </div>
        )}
        <div className={`grid gap-8 ${videos.length === 1 ? 'mx-auto max-w-2xl' : 'md:grid-cols-2'}`}>
          {videos.map((video) => (
            <PrivateYouTubeEmbed key={video.videoId} {...video} />
          ))}
        </div>
      </div>
    </section>
  );
}
