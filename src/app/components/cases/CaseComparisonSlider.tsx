import { useId, useState } from 'react';

type CaseImage = {
  src: string;
  alt: string;
};

export type CaseComparisonSliderProps = {
  caseTitle: string;
  before: CaseImage;
  after: CaseImage;
  width: number;
  height: number;
  caption: string;
};

export function CaseComparisonSlider({
  caseTitle,
  before,
  after,
  width,
  height,
  caption,
}: CaseComparisonSliderProps) {
  const [activeView, setActiveView] = useState<'before' | 'after'>('before');
  const [transitionCount, setTransitionCount] = useState(0);
  const captionId = useId();
  const photoId = useId();
  const activeImage = activeView === 'before' ? before : after;

  const showView = (view: 'before' | 'after') => {
    if (view === activeView) return;
    setActiveView(view);
    setTransitionCount((count) => count + 1);
  };

  return (
    <figure className="overflow-hidden rounded-3xl border border-white/10 bg-black/30">
      <div
        id={photoId}
        className="case-comparison-frame relative isolate overflow-hidden bg-black"
        style={{ aspectRatio: `${width} / ${height}` }}
        aria-live="polite"
        aria-atomic="true"
      >
        <img
          key={activeView}
          src={activeImage.src}
          alt={activeImage.alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute inset-0 h-full w-full object-contain [filter:none] [transform:none]"
        />

        {transitionCount > 0 && (
          <span
            key={`${activeView}-${transitionCount}`}
            className="case-photo-curtain"
            aria-hidden="true"
          />
        )}

        <span className="absolute top-4 left-4 z-10 rounded-full border border-white/10 bg-black/80 px-3 py-1 text-xs font-semibold text-white shadow-lg">
          {activeView === 'before' ? 'Before' : 'After'}
        </span>
      </div>

      <div
        role="group"
        aria-label={`${caseTitle} photo view`}
        aria-describedby={captionId}
        className="case-comparison-controls grid grid-cols-2 gap-2 border-t border-white/10 bg-black/60 p-3"
      >
        {(['before', 'after'] as const).map((view) => {
          const isActive = activeView === view;
          const label = view === 'before' ? 'Before' : 'After';

          return (
            <button
              key={view}
              type="button"
              aria-controls={photoId}
              aria-pressed={isActive}
              aria-label={`Show ${view} photo for ${caseTitle}`}
              onClick={() => showView(view)}
              className={`min-h-11 rounded-xl border px-4 py-2 text-sm font-semibold transition duration-200 ${
                isActive
                  ? 'border-gold-300 bg-gold-400 text-dark-950 shadow-[0_0_24px_rgba(212,175,55,0.22)]'
                  : 'border-white/10 bg-white/[0.04] text-gray-300 hover:border-white/25 hover:text-white'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <figcaption id={captionId} className="border-t border-white/10 p-5 pr-20 sm:pr-5">
        <h2 className="font-serif text-2xl text-white">{caseTitle}</h2>
        <p className="mt-2 text-sm leading-6 text-gray-400">{caption}</p>
        <p className="mt-3 text-xs leading-5 text-gray-400">
          Individual outcomes vary. This comparison is clinical documentation, not a promise of a
          similar result.
        </p>
      </figcaption>
    </figure>
  );
}
