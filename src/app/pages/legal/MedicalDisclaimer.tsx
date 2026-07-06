import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
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

export default function MedicalDisclaimer() {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      className="relative min-h-screen py-24 sm:py-32"
    >
      <Helmet>
        <title>{SEO.medicalDisclaimer.title}</title>
        <meta name="description" content={SEO.medicalDisclaimer.description} />
        <link rel="canonical" href={SEO.medicalDisclaimer.canonical} />
        <meta name="robots" content="noindex" />
        <meta property="og:title" content={SEO.medicalDisclaimer.title} />
        <meta property="og:description" content={SEO.medicalDisclaimer.description} />
        <meta property="og:url" content={SEO.medicalDisclaimer.canonical} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:alt" content={DEFAULT_OG_IMAGE_ALT} />
        <meta property="og:image:type" content={DEFAULT_OG_IMAGE_TYPE} />
        <meta property="og:image:width" content={String(DEFAULT_OG_IMAGE_WIDTH)} />
        <meta property="og:image:height" content={String(DEFAULT_OG_IMAGE_HEIGHT)} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.medicalDisclaimer.title} />
        <meta name="twitter:description" content={SEO.medicalDisclaimer.description} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:image:alt" content={DEFAULT_OG_IMAGE_ALT} />
      </Helmet>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} className="mb-12 text-center">
          <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-amber-400" />
          <h1 className="font-mono text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Medical Disclaimer
          </h1>
          <p className="mt-4 text-gray-400">Last updated: February 2026</p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="prose prose-invert prose-gold max-w-none space-y-8 text-gray-300"
        >
          {/* Prominent disclaimer box */}
          <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-6">
            <p className="text-base font-medium text-amber-300">
              The information provided on this website is for{' '}
              <strong>general educational and informational purposes only</strong> and does not
              constitute professional medical or dental advice, diagnosis, or treatment.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-semibold text-white">
              Not a Substitute for Professional Advice
            </h2>
            <p>
              The content on drhaithamsharshar.com — including text, graphics, images,
              before-and-after photos, and videos — is intended to inform and educate visitors about
              dental procedures and treatments. It should <strong>not</strong> be used as a
              substitute for:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>An in-person clinical examination by a licensed dentist.</li>
              <li>Professional dental diagnosis and treatment planning.</li>
              <li>Emergency dental or medical care.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">Individual Results May Vary</h2>
            <p>
              Before-and-after images and patient testimonials shown on this website represent
              individual cases. <strong>Results vary</strong> based on individual health conditions,
              bone density, compliance with aftercare, biological healing factors, and other
              variables. The outcomes depicted should not be interpreted as a guarantee of similar
              results.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">Treatment Information Accuracy</h2>
            <p>
              While we make every effort to ensure the accuracy of the information presented, dental
              science evolves continuously. Treatment options, technologies, and recommended
              protocols may change. All treatment descriptions, timelines, and pricing are provided
              as general guidance and may differ from your specific clinical situation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">Online Consultations</h2>
            <p>
              Any virtual consultation, photo assessment, or preliminary treatment estimate provided
              through this website is <strong>not a definitive medical diagnosis</strong>. A
              comprehensive diagnosis and final treatment plan require a physical examination with
              appropriate clinical and radiographic assessment.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">Emergency Situations</h2>
            <p>
              If you are experiencing a dental emergency, do <strong>not</strong> rely on this
              website for treatment guidance. Please contact your nearest emergency dental provider
              or hospital immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">Questions</h2>
            <p>
              If you have specific dental concerns or questions about your oral health, please{' '}
              <Link to="/contact" className="text-gold-400 underline">
                schedule a consultation
              </Link>{' '}
              with Dr. Haitham Sharshar for personalized professional advice.
            </p>
          </section>
        </motion.div>
      </div>
    </motion.section>
  );
}
