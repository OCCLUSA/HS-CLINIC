import { useState } from 'react';
import { Play, ShieldCheck } from 'lucide-react';

export interface PrivateYouTubeEmbedProps {
  videoId: string;
  title?: string;
  description?: string;
  aspectRatio?: string;
}

export function PrivateYouTubeEmbed({
  videoId,
  title,
  description,
  aspectRatio = 'aspect-video',
}: PrivateYouTubeEmbedProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="group bg-dark-900/50 hover:border-gold-400/20 overflow-hidden rounded-2xl border border-white/10 backdrop-blur-sm transition-colors duration-300">
      <div className={`relative ${aspectRatio} w-full overflow-hidden`}>
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={title ?? 'YouTube video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.16),transparent_58%)] px-6 text-center"
            aria-label={`Play video: ${title ?? videoId}`}
          >
            <span className="bg-gold-400 text-dark-950 flex h-16 w-16 items-center justify-center rounded-full shadow-[0_0_24px_rgba(212,175,55,0.35)] transition-transform duration-200 group-hover:scale-[1.02]">
              <Play className="ml-1 h-7 w-7" />
            </span>
            <span className="flex items-center gap-2 text-xs text-gray-400">
              <ShieldCheck className="h-4 w-4" />
              YouTube loads only after this click
            </span>
          </button>
        )}
      </div>
      {(title || description) && (
        <div className="p-5">
          {title && <h4 className="font-serif text-lg text-white">{title}</h4>}
          {description && <p className="mt-1 text-sm leading-relaxed text-gray-400">{description}</p>}
        </div>
      )}
    </div>
  );
}
