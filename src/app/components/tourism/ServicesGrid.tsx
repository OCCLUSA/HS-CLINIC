import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Stethoscope, Sparkles, Brain, Smile } from 'lucide-react';

const services = [
  {
    icon: Stethoscope,
    title: 'Dental Implants',
    desc: 'Guided implant planning with written coverage terms',
    href: '/services',
    img: '/images/dental/dental-implant-dr-haitham-sharshar.webp',
  },
  {
    icon: Sparkles,
    title: 'Hollywood Smile',
    desc: 'Veneers, bonding & full smile makeovers',
    href: '/services',
    img: '/images/dental/Full-arch-dental-implant-dr-haitham-sharshar.webp',
  },
  {
    icon: Brain,
    title: 'TMJ / Occlusion',
    desc: 'EMG diagnostics, T-Scan & splint therapy',
    href: '/services',
    img: '/images/dental/All-on-4-Dental-Implants-dr haitham sharshar.webp',
  },
  {
    icon: Smile,
    title: 'Esthetics',
    desc: 'Whitening, gum contouring & cosmetic bonding',
    href: '/services',
    img: '/images/dental/dental-implant-dr-haitham-sharshar.webp',
  },
];

export function ServicesGrid() {
  return (
    <section className="border-t border-white/5 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-14 text-center"
        >
          <h2 className="text-gold-400 mb-3 font-mono text-sm tracking-[0.3em] uppercase">
            OUR SPECIALTIES
          </h2>
          <h3 className="font-serif text-4xl text-white md:text-5xl">
            Treatments Available for Tourists
          </h3>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                to={s.href}
                className="group hover:border-gold-400/30 relative block h-72 overflow-hidden rounded-2xl border border-white/5 transition-all"
              >
                <img
                  src={s.img}
                  alt={s.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-40 transition-all duration-700 group-hover:scale-110 group-hover:opacity-60"
                  loading="lazy"
                />
                <div className="from-dark-950 via-dark-950/60 absolute inset-0 bg-gradient-to-t to-transparent" />
                <div className="absolute right-0 bottom-0 left-0 z-10 p-5">
                  <div className="bg-gold-400/10 border-gold-400/20 group-hover:bg-gold-400/20 mb-3 flex h-10 w-10 items-center justify-center rounded-lg border transition-colors">
                    <s.icon className="text-gold-400 h-5 w-5" />
                  </div>
                  <h4 className="group-hover:text-gold-300 mb-1 font-serif text-lg font-bold text-white transition-colors">
                    {s.title}
                  </h4>
                  <p className="text-xs text-gray-400">{s.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
