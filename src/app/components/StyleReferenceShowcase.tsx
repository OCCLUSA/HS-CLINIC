import { Link } from 'react-router-dom';

export type StyleReferenceImageId =
  | 'enamelCharacterization'
  | 'gumLineProportion'
  | 'naturalToothEducation'
  | 'smileMakeoverBeforeAfterStyle'
  | 'ceramicVeneerShade'
  | 'toothEnamelArt'
  | 'implantSurface'
  | 'incisalEdge'
  | 'laminateVeneerAnnotation'
  | 'enamelSurfaceTexture'
  | 'naturalEnamelTexture'
  | 'polarizedEnamel'
  | 'premiumSmileFocus'
  | 'toothAnatomyArt'
  | 'toothRootEndodontic';

type StyleReferenceImage = {
  id: StyleReferenceImageId;
  src: string;
  alt: string;
  title: string;
  caption: string;
  width: number;
  height: number;
};

type ShowcaseLink = {
  label: string;
  to: string;
};

type StyleReferenceShowcaseProps = {
  title: string;
  intro: string;
  imageIds: StyleReferenceImageId[];
  eyebrow?: string;
  links?: ShowcaseLink[];
  columns?: 'two' | 'three';
  className?: string;
};

const BASE_PATH = '/images/style-references/';

export const STYLE_REFERENCE_IMAGES: Record<StyleReferenceImageId, StyleReferenceImage> = {
  enamelCharacterization: {
    id: 'enamelCharacterization',
    src: `${BASE_PATH}dr-haitham-sharshar-cairo-enamel-characterization-digital-smile-design-gulf-europe.webp`,
    alt: 'Macro view of natural anterior enamel texture used for digital smile design education at HS Dental Clinic Cairo for Gulf and Europe patients',
    title: 'Natural enamel character',
    caption:
      'Natural enamel is not flat white. Shape, translucency, and tiny surface details are studied before planning a smile.',
    width: 720,
    height: 720,
  },
  gumLineProportion: {
    id: 'gumLineProportion',
    src: `${BASE_PATH}dr-haitham-sharshar-cairo-gum-line-tooth-proportion-smile-design-gulf-europe.webp`,
    alt: 'Close dental photograph showing gum line and anterior tooth proportions for smile design planning in Cairo',
    title: 'Gum line and proportion',
    caption:
      'A smile plan starts with the gum line, tooth length, and facial balance, not only the color of the teeth.',
    width: 1200,
    height: 913,
  },
  naturalToothEducation: {
    id: 'naturalToothEducation',
    src: `${BASE_PATH}dr-haitham-sharshar-cairo-natural-tooth-enamel-education-gulf-europe.webp`,
    alt: 'Artistic macro tooth enamel image explaining natural tooth layers for cosmetic dentistry patients from Gulf and Europe',
    title: 'Tooth layers and light',
    caption:
      'The best cosmetic dentistry respects the depth and character of natural enamel instead of copying a flat white shade.',
    width: 564,
    height: 722,
  },
  smileMakeoverBeforeAfterStyle: {
    id: 'smileMakeoverBeforeAfterStyle',
    src: `${BASE_PATH}dr-haitham-sharshar-cairo-smile-makeover-before-after-style-gulf-europe.webp`,
    alt: 'Split portrait style reference for a before and after smile makeover layout at HS Dental Clinic Cairo',
    title: 'Before and after storytelling',
    caption:
      'Before and after visuals should be used with consented HS cases and explained as one patient journey, not a guaranteed result.',
    width: 736,
    height: 1013,
  },
  ceramicVeneerShade: {
    id: 'ceramicVeneerShade',
    src: `${BASE_PATH}dr-haitham-sharshar-cairo-ceramic-veneer-shade-matching-gulf-europe.webp`,
    alt: 'Ceramic veneer shade matching photograph for natural smile design planning in Cairo',
    title: 'Ceramic shade matching',
    caption:
      'Shade selection should match the face, lips, gum color, and the character of natural teeth.',
    width: 637,
    height: 747,
  },
  toothEnamelArt: {
    id: 'toothEnamelArt',
    src: `${BASE_PATH}dr-haitham-sharshar-cairo-tooth-enamel-art-education-gulf-europe.webp`,
    alt: 'Colorful artistic tooth image used to explain enamel structure in cosmetic dentistry education',
    title: 'Enamel as layered color',
    caption:
      'Tooth color is made from layers of light, translucency, and surface texture, not a single paint color.',
    width: 280,
    height: 392,
  },
  implantSurface: {
    id: 'implantSurface',
    src: `${BASE_PATH}dr-haitham-sharshar-cairo-dental-implant-surface-digital-planning-gulf-europe.webp`,
    alt: 'Macro dental implant surface image for guided implant planning education at HS Dental Clinic Cairo',
    title: 'Implant surface and planning',
    caption:
      'Implant planning should respect bone, gum support, smile design, and the final bite before surgery.',
    width: 1080,
    height: 1409,
  },
  incisalEdge: {
    id: 'incisalEdge',
    src: `${BASE_PATH}dr-haitham-sharshar-cairo-incisal-edge-translucency-veneers-gulf-europe.webp`,
    alt: 'Close view of incisal edge translucency used for natural veneer and crown planning in Cairo',
    title: 'Incisal edge translucency',
    caption:
      'The edge of a tooth carries small details that make a restoration look alive, not artificial.',
    width: 720,
    height: 786,
  },
  laminateVeneerAnnotation: {
    id: 'laminateVeneerAnnotation',
    src: `${BASE_PATH}dr-haitham-sharshar-cairo-laminate-veneer-smile-design-analysis-gulf-europe.webp`,
    alt: 'Annotated smile design style reference for laminate veneer planning and facial analysis',
    title: 'Annotated smile analysis',
    caption:
      'Planning notes can show why tooth length, gum line, translucency, and facial balance matter before the final design.',
    width: 1199,
    height: 1244,
  },
  enamelSurfaceTexture: {
    id: 'enamelSurfaceTexture',
    src: `${BASE_PATH}dr-haitham-sharshar-cairo-enamel-surface-texture-natural-veneers-gulf-europe.webp`,
    alt: 'Macro enamel surface texture photograph for natural veneer design education at HS Dental Clinic Cairo',
    title: 'Surface texture',
    caption:
      'Natural-looking teeth have micro texture. Planning these details helps the smile avoid a flat artificial look.',
    width: 1199,
    height: 1495,
  },
  naturalEnamelTexture: {
    id: 'naturalEnamelTexture',
    src: `${BASE_PATH}dr-haitham-sharshar-cairo-natural-enamel-texture-polarized-photography-gulf-europe.webp`,
    alt: 'Split color dental photo showing enamel texture and polarized photography style for smile planning',
    title: 'Dental photography comparison',
    caption:
      'Dental photography helps compare color, texture, and light reflection before ceramic work begins.',
    width: 750,
    height: 936,
  },
  polarizedEnamel: {
    id: 'polarizedEnamel',
    src: `${BASE_PATH}dr-haitham-sharshar-cairo-polarized-anterior-enamel-smile-design-gulf-europe.webp`,
    alt: 'Polarized anterior enamel photograph for shade and texture planning in cosmetic dentistry',
    title: 'Polarized enamel record',
    caption: 'Polarized photos can reveal enamel details that normal smile photos may hide.',
    width: 1080,
    height: 1080,
  },
  premiumSmileFocus: {
    id: 'premiumSmileFocus',
    src: `${BASE_PATH}dr-haitham-sharshar-cairo-premium-smile-focus-style-gulf-europe.webp`,
    alt: 'Premium smile focus style reference for a cinematic dental case story layout in Cairo',
    title: 'Smile focus',
    caption:
      'A premium case story should keep the smile clear, calm, and honest, with the clinical explanation beside it.',
    width: 736,
    height: 1165,
  },
  toothAnatomyArt: {
    id: 'toothAnatomyArt',
    src: `${BASE_PATH}dr-haitham-sharshar-cairo-tooth-anatomy-art-concept-gulf-europe.webp`,
    alt: 'Artistic tooth anatomy concept image for dental education content targeting Gulf and Europe patients',
    title: 'Tooth anatomy concept',
    caption:
      'Artistic dental visuals can support education, but real treatment planning still depends on examination and records.',
    width: 1024,
    height: 1024,
  },
  toothRootEndodontic: {
    id: 'toothRootEndodontic',
    src: `${BASE_PATH}dr-haitham-sharshar-cairo-tooth-root-endodontic-education-gulf-europe.webp`,
    alt: 'Translucent tooth root image for endodontic education at HS Dental Clinic Cairo',
    title: 'Root anatomy',
    caption:
      'Root anatomy is complex, so diagnosis and treatment planning should stay clinician reviewed.',
    width: 300,
    height: 250,
  },
};

export function StyleReferenceShowcase({
  title,
  intro,
  imageIds,
  eyebrow = 'Planning visuals',
  links = [],
  columns = 'three',
  className = '',
}: StyleReferenceShowcaseProps) {
  const gridClass = columns === 'two' ? 'md:grid-cols-2' : 'md:grid-cols-3';
  const images = imageIds.map((id) => STYLE_REFERENCE_IMAGES[id]);

  return (
    <section className={`border-t border-white/5 px-4 py-16 sm:px-6 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-3xl">
          <p className="text-gold-400 mb-3 font-mono text-xs tracking-[0.25em] uppercase">
            {eyebrow}
          </p>
          <h2 className="font-serif text-3xl leading-tight text-white md:text-5xl">{title}</h2>
          <p className="mt-4 text-sm leading-7 text-gray-400 md:text-base">{intro}</p>
        </div>
        <div className={`grid gap-5 ${gridClass}`}>
          {images.map((image) => (
            <figure
              key={image.id}
              className="group overflow-hidden rounded-xl border border-white/10 bg-black/30"
            >
              <div className="aspect-[4/3] bg-black/50">
                <img
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <figcaption className="p-5">
                <h3 className="text-base font-semibold text-white">{image.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-400">{image.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        {links.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="border-gold-400/30 text-gold-300 rounded-lg border px-4 py-2 text-sm font-semibold transition hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
