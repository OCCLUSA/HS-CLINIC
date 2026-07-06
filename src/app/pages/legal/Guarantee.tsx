import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, CheckCircle2 } from 'lucide-react';
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_TYPE,
  DEFAULT_OG_IMAGE_WIDTH,
  SEO,
  SITE_NAME,
} from '@/lib/seo';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const guaranteeItems = [
  {
    treatment: 'Dental Implants (Titanium Posts)',
    term: 'Written Fixture Coverage',
    details:
      'Coverage eligibility for implant fixture concerns is reviewed under written terms, clinical records, and aftercare history.',
  },
  {
    treatment: 'Zirconia Crowns & Bridges',
    term: 'Written Restoration Coverage',
    details:
      'Coverage terms for zirconia restorations are reviewed before treatment and depend on material, bite forces, and aftercare.',
  },
  {
    treatment: 'Porcelain & E-max Veneers',
    term: 'Written Veneer Coverage',
    details: 'Coverage terms for veneers are reviewed before treatment and depend on bonding conditions, bite forces, and maintenance.',
  },
  {
    treatment: 'Full-Arch Prosthetics (All-on-4/6)',
    term: 'Written Prosthetic Coverage',
    details:
      'Coverage terms for the prosthetic framework and replaceable components are reviewed before treatment.',
  },
  {
    treatment: 'Clear Aligners',
    term: 'Refinement Review Terms',
    details:
      'Refinement aligner eligibility is reviewed during treatment and depends on compliance, biology, and clinician assessment.',
  },
  {
    treatment: 'TMD/TMJ Splint Therapy',
    term: 'Appliance Coverage Terms',
    details:
      'Splint structural concerns are reviewed under written appliance terms. Symptom changes require clinician reassessment.',
  },
];

export default function Guarantee() {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
      className="relative min-h-screen py-24 sm:py-32"
    >
      <Helmet>
        <title>{SEO.guarantee.title}</title>
        <meta name="description" content={SEO.guarantee.description} />
        <link rel="canonical" href={SEO.guarantee.canonical} />
        <meta property="og:title" content={SEO.guarantee.title} />
        <meta property="og:description" content={SEO.guarantee.description} />
        <meta property="og:url" content={SEO.guarantee.canonical} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:alt" content={DEFAULT_OG_IMAGE_ALT} />
        <meta property="og:image:type" content={DEFAULT_OG_IMAGE_TYPE} />
        <meta property="og:image:width" content={String(DEFAULT_OG_IMAGE_WIDTH)} />
        <meta property="og:image:height" content={String(DEFAULT_OG_IMAGE_HEIGHT)} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.guarantee.title} />
        <meta name="twitter:description" content={SEO.guarantee.description} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:image:alt" content={DEFAULT_OG_IMAGE_ALT} />
      </Helmet>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} className="mb-16 text-center">
          <Award className="text-gold-400 mx-auto mb-4 h-12 w-12" />
          <h1 className="font-mono text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Treatment Coverage Terms
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Written coverage terms are reviewed before treatment. Eligibility depends on clinical
            findings, materials, aftercare, maintenance visits, and documented patient records.
          </p>
        </motion.div>

        {/* Guarantee Cards */}
        <div className="grid gap-6 sm:grid-cols-2">
          {guaranteeItems.map((item) => (
            <motion.div
              key={item.treatment}
              variants={fadeUp}
              className="group hover:border-gold-400/20 rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm transition-colors"
            >
              <div className="mb-3 flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                <div>
                  <h2 className="font-semibold text-white">{item.treatment}</h2>
                  <p className="text-gold-400 mt-1 text-sm font-medium">{item.term}</p>
                </div>
              </div>
              <p className="pl-8 text-sm text-gray-400">{item.details}</p>
            </motion.div>
          ))}
        </div>

        {/* Conditions */}
        <motion.div variants={fadeUp} className="mt-16 space-y-8">
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm">
            <h2 className="mb-4 text-lg font-semibold text-white">Coverage Conditions</h2>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex gap-2">
                <span className="text-gold-400 shrink-0">•</span>
                All coverage terms require adherence to the prescribed aftercare protocol and attendance
                at recommended follow-up appointments.
              </li>
              <li className="flex gap-2">
                <span className="text-gold-400 shrink-0">•</span>
                Regular dental check-ups (every 6 months) and professional cleanings are required to
                maintain coverage eligibility.
              </li>
              <li className="flex gap-2">
                <span className="text-gold-400 shrink-0">•</span>
                Damage resulting from trauma, accidents, bruxism without prescribed night guard use,
                or neglect of oral hygiene is excluded.
              </li>
              <li className="flex gap-2">
                <span className="text-gold-400 shrink-0">•</span>
                International patients: follow-up can be conducted via our virtual consultation
                platform. If in-clinic work is needed, travel costs are the patient&apos;s
                responsibility.
              </li>
            </ul>
          </div>

          {/* International Patient Assurance */}
          <div className="rounded-xl border border-emerald-400/10 bg-emerald-400/5 p-6">
            <h2 className="mb-3 text-lg font-semibold text-white">
              International Patient Assurance
            </h2>
            <p className="text-sm text-gray-300">
              For medical tourism patients: if a covered restoration requires repair or
              replacement, the written terms define whether clinical repair or replacement fees are waived.
              We can coordinate with
              our tourism partners to assist with return trip logistics.
            </p>
          </div>

          <div className="text-center">
            <p className="mb-6 text-sm text-gray-500">
              Have questions about our coverage terms? We can discuss specifics for your
              treatment plan.
            </p>
            <Link
              to="/contact"
              className="bg-gold-500 hover:bg-gold-400 hover:shadow-gold-500/20 inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold text-slate-950 transition-all hover:shadow-lg"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
