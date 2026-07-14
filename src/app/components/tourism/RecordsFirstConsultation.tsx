import { FileCheck2, MessageCircle, ShieldCheck } from 'lucide-react';
import { trackWhatsAppClick } from '@/lib/analytics';

const WHATSAPP_RECORDS_URL = `https://api.whatsapp.com/send/?phone=201101010599&text=${encodeURIComponent(
  'Hello HS Clinic. I would like guidance on which dental records may be useful for a preliminary review.'
)}`;

export function RecordsFirstConsultation() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 px-4 py-24 sm:px-6 lg:px-8">
      <div className="bg-gold-400/5 absolute top-0 right-0 h-[500px] w-[500px] rounded-full blur-[150px]" />
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border-gold-400/20 bg-dark-900/70 rounded-3xl border p-7 sm:p-9">
          <FileCheck2 className="text-gold-400 h-9 w-9" />
          <h2 className="mt-5 font-serif text-3xl text-white">Records that may help</h2>
          <ul className="mt-6 space-y-4 text-sm leading-6 text-gray-300">
            <li>Recent panoramic X-ray or CBCT, if already available.</li>
            <li>Clear smile and bite photographs only when the clinic requests them.</li>
            <li>Relevant dental notes, medication, allergy, and health information.</li>
          </ul>
          <p className="mt-6 text-xs leading-5 text-gray-400">
            Do not delay urgent local care for swelling, bleeding, trauma, or breathing and
            swallowing difficulty.
          </p>
        </div>

        <div>
          <div className="text-gold-300 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em]">
            <ShieldCheck className="h-4 w-4" />
            Records first step
          </div>
          <h2 className="mt-4 font-serif text-4xl text-white md:text-5xl">
            Send records by WhatsApp
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-300">
            This website does not upload or store X-rays, photographs, or medical details. Start
            with a general WhatsApp message and the clinic will explain what is useful for a
            preliminary records review.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-400">
            Online review is a screening step, not a diagnosis or final treatment plan. Examination
            and clinician review are required before treatment decisions.
          </p>
          <a
            href={WHATSAPP_RECORDS_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('tourism_records_first')}
            className="bg-gold-400 text-dark-950 mt-8 inline-flex min-h-12 items-center gap-3 rounded-xl px-6 py-3 font-bold transition duration-200 hover:bg-white active:scale-[0.98]"
          >
            <MessageCircle className="h-5 w-5" />
            Continue in WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
