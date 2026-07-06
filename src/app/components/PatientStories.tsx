import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useTestimonials } from '@/hooks/useCmsData';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
};

export function PatientStories() {
  const { testimonials } = useTestimonials();

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden border-t border-white/5 px-4 py-32 sm:px-6 lg:px-8">
      {/* Background glow */}
      <div className="bg-gold-400/5 absolute top-1/2 left-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[200px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gold-400 mb-3 font-mono text-sm tracking-[0.3em] uppercase"
          >
            PATIENT STORIES
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-4 font-serif text-4xl text-white md:text-5xl"
          >
            Voices of Transformation
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-xl text-lg text-gray-400"
          >
            Real patient stories appear here only when reviewed clinic testimonials are available.
          </motion.p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t._id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="group bg-dark-900/60 hover:border-gold-400/30 relative rounded-2xl border border-white/5 p-8 backdrop-blur-sm transition-all duration-500 hover:shadow-[0_0_50px_rgba(197,165,90,0.1)]"
            >
              {/* Quote icon */}
              <Quote className="text-gold-400/20 group-hover:text-gold-400/40 mb-6 h-8 w-8 transition-colors" />

              {/* Stars */}
              <div className="mb-5 flex gap-1">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} className="fill-gold-400 text-gold-400 h-4 w-4" />
                ))}
              </div>

              {/* Quote text */}
              <p className="mb-6 text-sm leading-relaxed text-gray-300 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Divider */}
              <div className="border-t border-white/5 pt-5">
                <p className="text-sm font-medium text-white">{t.name}</p>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {t.countryFlag} {t.country}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
