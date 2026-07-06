import { motion } from 'framer-motion';
import { MapPin, Star, ExternalLink } from 'lucide-react';

interface CuratedResidencesProps {
  residences?: Array<{
    name: string;
    subtitle: string;
    stars: number;
    description: string;
    features?: string[];
  }>;
}

// Visual styling per card index — not editable from CMS (design tokens)
const CARD_STYLES = [
  { gradient: 'from-amber-900/40 to-amber-800/10', accent: 'border-amber-400/30' },
  { gradient: 'from-gold-600/30 to-gold-400/5', accent: 'border-gold-400/30' },
  { gradient: 'from-emerald-900/30 to-emerald-800/5', accent: 'border-emerald-400/20' },
  { gradient: 'from-blue-900/30 to-blue-800/5', accent: 'border-blue-400/20' },
];

const DEFAULT_RESIDENCES = [
  {
    name: 'St. Regis Cairo',
    subtitle: 'Nile Corniche',
    stars: 5,
    description: 'Unrivaled Nile views with bespoke butler service. 15 minutes from the clinic.',
    features: ['Butler Service', 'Nile Views', 'Spa & Pool'],
  },
  {
    name: 'Four Seasons',
    subtitle: 'First Residence, Giza',
    stars: 5,
    description:
      'Pyramid-area accommodation option that can be coordinated with airport transfer planning.',
    features: ['Pyramid Views', 'Private Balcony', 'Fine Dining'],
  },
  {
    name: 'Kempinski Nile Hotel',
    subtitle: 'Garden City',
    stars: 5,
    description: 'European elegance on the banks of the Nile. Walking distance to historic Cairo.',
    features: ['Riverside Terrace', 'Heated Pool', 'Concierge'],
  },
  {
    name: 'Marriott Mena House',
    subtitle: 'Giza Plateau',
    stars: 5,
    description: 'Sleep at the foot of the Great Pyramids. A legendary retreat since 1886.',
    features: ['Historic Palace', 'Garden Oasis', 'Pyramid Gate'],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export function CuratedResidences({ residences }: CuratedResidencesProps) {
  const hotels = residences ?? DEFAULT_RESIDENCES;

  return (
    <section className="border-t border-white/5 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gold-400 mb-3 font-mono text-sm tracking-[0.3em] uppercase"
          >
            CURATED RESIDENCES
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-4 font-serif text-4xl text-white md:text-5xl"
          >
            Your Sanctuary Awaits
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg text-gray-400"
          >
            We help coordinate selected Cairo hotel options so your stay is as organized as your
            treatment.
          </motion.p>
        </div>

        {/* Hotel Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-6 md:grid-cols-2"
        >
          {hotels.map((hotel, idx) => {
            const style = CARD_STYLES[idx % CARD_STYLES.length];
            return (
              <motion.div
                key={hotel.name}
                variants={cardVariants}
                className={`group relative rounded-2xl border ${style.accent} bg-gradient-to-br ${style.gradient} overflow-hidden backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(197,165,90,0.15)]`}
              >
                {/* Shimmer overlay on hover */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

                <div className="relative p-8">
                  {/* Top row: name + stars */}
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h4 className="group-hover:text-gold-300 font-serif text-xl text-white transition-colors">
                        {hotel.name}
                      </h4>
                      <div className="mt-1 flex items-center gap-1.5">
                        <MapPin className="text-gold-400/60 h-3.5 w-3.5" />
                        <span className="text-sm text-gray-400">{hotel.subtitle}</span>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: hotel.stars }).map((_, j) => (
                        <Star key={j} className="fill-gold-400 text-gold-400 h-3.5 w-3.5" />
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mb-5 text-sm leading-relaxed text-gray-300/80">
                    {hotel.description}
                  </p>

                  {/* Feature pills */}
                  <div className="mb-5 flex flex-wrap gap-2">
                    {(hotel.features ?? []).map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-gray-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Bottom: partner badge */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="text-gold-400/60 font-mono text-xs tracking-wider">
                      PREFERRED PARTNER
                    </span>
                    <ExternalLink className="group-hover:text-gold-400 h-4 w-4 text-gray-500 transition-colors" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center text-sm text-gray-500"
        >
          Accommodation options and transfer timing can be discussed during your case review.
        </motion.p>
      </div>
    </section>
  );
}
