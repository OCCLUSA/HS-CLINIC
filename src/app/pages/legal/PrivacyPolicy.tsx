import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
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

export default function PrivacyPolicy() {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      className="relative min-h-screen py-24 sm:py-32"
    >
      <Helmet>
        <title>{SEO.privacyPolicy.title}</title>
        <meta name="description" content={SEO.privacyPolicy.description} />
        <link rel="canonical" href={SEO.privacyPolicy.canonical} />
        <meta name="robots" content="noindex" />
        <meta property="og:title" content={SEO.privacyPolicy.title} />
        <meta property="og:description" content={SEO.privacyPolicy.description} />
        <meta property="og:url" content={SEO.privacyPolicy.canonical} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:alt" content={DEFAULT_OG_IMAGE_ALT} />
        <meta property="og:image:type" content={DEFAULT_OG_IMAGE_TYPE} />
        <meta property="og:image:width" content={String(DEFAULT_OG_IMAGE_WIDTH)} />
        <meta property="og:image:height" content={String(DEFAULT_OG_IMAGE_HEIGHT)} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.privacyPolicy.title} />
        <meta name="twitter:description" content={SEO.privacyPolicy.description} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:image:alt" content={DEFAULT_OG_IMAGE_ALT} />
      </Helmet>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} className="mb-12 text-center">
          <Shield className="text-gold-400 mx-auto mb-4 h-12 w-12" />
          <h1 className="font-mono text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-gray-400">Last updated: February 2026</p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="prose prose-invert prose-gold max-w-none space-y-8 text-gray-300"
        >
          <section>
            <h2 className="text-xl font-semibold text-white">1. Information We Collect</h2>
            <p>
              When you contact us through our website, consultation forms, or WhatsApp, we may
              collect:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                <strong>Personal Information:</strong> Name, email address, phone number, and
                country of residence.
              </li>
              <li>
                <strong>Health Information:</strong> Dental concerns, medical history, and clinical
                images you voluntarily share for consultation purposes.
              </li>
              <li>
                <strong>Technical Data:</strong> Browser type, IP address, and pages visited (via
                anonymized analytics).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">2. How We Use Your Information</h2>
            <ul className="list-disc space-y-1 pl-6">
              <li>To respond to your inquiries and schedule consultations.</li>
              <li>To provide personalized treatment recommendations.</li>
              <li>To communicate appointment reminders and follow-up care instructions.</li>
              <li>To improve our website and services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">3. Data Protection & Security</h2>
            <p>
              All patient data is stored using encrypted, secure systems. We implement physical,
              electronic, and procedural safeguards to protect your information. Health data shared
              for consultations is handled with medical-grade confidentiality.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">4. Third-Party Sharing</h2>
            <p>
              We do <strong>not</strong> sell, trade, or rent your personal information. We may
              share data only with:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Partner laboratories for prosthetic fabrication (anonymized where possible).</li>
              <li>
                Tourism coordination partners (hotel, transport) — only with your explicit consent.
              </li>
              <li>Legal authorities when required by Egyptian law.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">5. Cookies</h2>
            <p>
              This website uses essential cookies for functionality. No advertising or tracking
              cookies are used. Third-party embeds (YouTube) may set their own cookies — we use
              privacy-enhanced mode to minimize this.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Request access to your personal data.</li>
              <li>Request correction or deletion of your data.</li>
              <li>Withdraw consent at any time.</li>
              <li>Lodge a complaint with the relevant data protection authority.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">7. Contact</h2>
            <p>
              For privacy-related inquiries, please{' '}
              <Link to="/contact" className="text-gold-400 underline">
                contact us
              </Link>{' '}
              directly.
            </p>
          </section>
        </motion.div>
      </div>
    </motion.section>
  );
}
