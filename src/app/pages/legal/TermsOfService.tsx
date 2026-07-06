import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
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

export default function TermsOfService() {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      className="relative min-h-screen py-24 sm:py-32"
    >
      <Helmet>
        <title>{SEO.termsOfService.title}</title>
        <meta name="description" content={SEO.termsOfService.description} />
        <link rel="canonical" href={SEO.termsOfService.canonical} />
        <meta name="robots" content="noindex" />
        <meta property="og:title" content={SEO.termsOfService.title} />
        <meta property="og:description" content={SEO.termsOfService.description} />
        <meta property="og:url" content={SEO.termsOfService.canonical} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:alt" content={DEFAULT_OG_IMAGE_ALT} />
        <meta property="og:image:type" content={DEFAULT_OG_IMAGE_TYPE} />
        <meta property="og:image:width" content={String(DEFAULT_OG_IMAGE_WIDTH)} />
        <meta property="og:image:height" content={String(DEFAULT_OG_IMAGE_HEIGHT)} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.termsOfService.title} />
        <meta name="twitter:description" content={SEO.termsOfService.description} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:image:alt" content={DEFAULT_OG_IMAGE_ALT} />
      </Helmet>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} className="mb-12 text-center">
          <FileText className="text-gold-400 mx-auto mb-4 h-12 w-12" />
          <h1 className="font-mono text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-gray-400">Last updated: February 2026</p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="prose prose-invert prose-gold max-w-none space-y-8 text-gray-300"
        >
          <section>
            <h2 className="text-xl font-semibold text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the HS Clinic website, you accept and agree to be bound by
              these Terms of Service. If you do not agree, please do not use this website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">2. Services Description</h2>
            <p>
              HS Clinic provides dental services including but not limited to dental implants,
              TMJ/TMD treatment, cosmetic dentistry, orthodontics, and dental tourism coordination.
              All services are provided by licensed dental professionals in Cairo, Egypt.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">3. Online Consultations</h2>
            <p>
              Virtual consultations and assessments provided through this website are{' '}
              <strong>preliminary only</strong> and do not constitute a formal diagnosis. A
              definitive treatment plan requires an in-person clinical examination and appropriate
              diagnostic imaging.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">4. Treatment Consent</h2>
            <p>
              All dental treatments require written informed consent prior to commencement. Patients
              will receive detailed information about procedures, risks, alternatives, and expected
              outcomes before any treatment begins.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">5. Pricing & Payment</h2>
            <p>
              Prices quoted on this website and in consultations are estimates based on standard
              cases. Final pricing may vary based on clinical findings, complexity, and materials
              required. Full cost breakdowns are provided before treatment begins.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">6. Medical Tourism Packages</h2>
            <p>
              Tourism coordination services (airport transfers, accommodation, city tours) are
              facilitated by HS Clinic through trusted third-party partners. HS Clinic is not
              directly liable for third-party service quality, though we maintain standards through
              regular partner audits.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">7. Intellectual Property</h2>
            <p>
              All content on this website — including text, images, clinical photography, logos, and
              design elements — is the property of HS Clinic and Dr. Haitham Sharshar. Reproduction
              without written permission is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">8. Limitation of Liability</h2>
            <p>
              While we aim for careful clinical outcomes, dentistry involves inherent risks. Individual
              results vary based on patient health, compliance, and biological factors. HS Clinic
              shall not be liable for outcomes beyond the standard of care.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">9. Governing Law</h2>
            <p>
              These terms are governed by the laws of the Arab Republic of Egypt. Any disputes shall
              be resolved under Egyptian jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">10. Contact</h2>
            <p>
              For questions about these terms, please{' '}
              <Link to="/contact" className="text-gold-400 underline">
                contact us
              </Link>
              .
            </p>
          </section>
        </motion.div>
      </div>
    </motion.section>
  );
}
