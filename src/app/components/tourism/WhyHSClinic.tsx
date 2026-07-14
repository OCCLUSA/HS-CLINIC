import { motion } from 'framer-motion';
import { getIcon } from '@/lib/iconMap';

interface WhyHSClinicProps {
  reasons?: Array<{ title: string; description: string; iconName?: string }>;
}

const DEFAULT_REASONS = [
  {
    title: 'Fully Digital Workflow',
    description:
      '3D-guided surgery, digital bite review, in-house planning, and 3D printing support clinician-led treatment planning.',
    iconName: 'Cpu',
  },
  {
    title: 'Sterilization Protocols',
    description:
      'Strict infection control protocols are followed and discussed clearly before treatment.',
    iconName: 'Shield',
  },
  {
    title: 'Written Coverage Terms',
    description:
      'Written coverage conditions are reviewed for eligible implant and prosthetic components before treatment.',
    iconName: 'Award',
  },
  {
    title: 'English-Speaking Team',
    description: 'Fluent communication in English, Arabic & French. No language barriers, ever.',
    iconName: 'Globe',
  },
  {
    title: 'Digital Bite Planning',
    description:
      'Bite records, muscle screening, and jaw movement review can support clinician-led planning.',
    iconName: 'HeartPulse',
  },
  {
    title: 'Travel Coordination',
    description:
      'Airport transfer coordination, accommodation guidance, clinic visits, and optional Cairo sightseeing support.',
    iconName: 'Plane',
  },
];

export function WhyHSClinic({ reasons }: WhyHSClinicProps) {
  const items = reasons ?? DEFAULT_REASONS;
  return (
    <section className="border-t border-white/5 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h2 className="text-gold-400 mb-3 font-mono text-sm tracking-[0.3em] uppercase">
            WHY PATIENTS CHOOSE US
          </h2>
          <h3 className="mb-4 font-serif text-4xl text-white md:text-5xl">Why HS Clinic Cairo?</h3>
          <p className="mx-auto max-w-2xl text-gray-400">
            Digital records, clinician-led planning, and coordinated support for patients travelling
            to Cairo.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((r, i) => {
            const Icon = getIcon(r.iconName);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group bg-dark-900/50 hover:border-gold-400/30 rounded-2xl border border-white/5 p-6 backdrop-blur transition-all duration-300"
              >
                <div className="bg-gold-400/10 border-gold-400/20 group-hover:bg-gold-400/20 group-hover:border-gold-400/40 mb-4 flex h-12 w-12 items-center justify-center rounded-lg border transition-colors">
                  <Icon className="text-gold-400 h-6 w-6" />
                </div>
                <h4 className="group-hover:text-gold-300 mb-2 font-serif text-lg font-bold text-white transition-colors">
                  {r.title}
                </h4>
                <p className="text-sm leading-relaxed text-gray-400">{r.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
