import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { Send, Upload, CheckCircle, Loader2 } from 'lucide-react';

export function ConsultationForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const formDataObj = new FormData(form);
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formDataObj as unknown as Record<string, string>).toString(),
    })
      .then(() => setStatus('sent'))
      .catch((err) => {
        console.error('Form submission error:', err);
        setStatus('idle');
      });
  };

  return (
    <section className="relative overflow-hidden border-t border-white/5 px-4 py-24 sm:px-6 lg:px-8">
      <div className="bg-gold-400/5 absolute top-0 right-0 h-[500px] w-[500px] rounded-full blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="border-gold-400/20 overflow-hidden rounded-2xl border">
              <img
                src="/images/tourism/pyramids with dental tourism.webp"
                alt="Dental tourism in Cairo with pyramids"
                className="h-80 w-full object-cover lg:h-[480px]"
                loading="lazy"
              />
              <div className="from-dark-950 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
            </div>
            <div className="absolute right-6 bottom-6 left-6">
              <div className="bg-dark-950/80 border-gold-400/20 rounded-xl border p-4 backdrop-blur">
                <div className="text-gold-400 mb-1 font-mono text-xs">📍 CLINIC ADDRESS</div>
                <div className="text-sm text-white">
                  8/63, 10th District, Zahraa El Maadi, Cairo, Egypt
                </div>
                <a
                  href="https://api.whatsapp.com/send/?phone=201101010599"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-400 hover:text-gold-300 mt-2 inline-block text-xs"
                >
                  +20 110 101 0599 (WhatsApp) →
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}>
            <h2 className="text-gold-400 mb-3 font-mono text-sm tracking-[0.3em] uppercase">
              VIRTUAL CASE REVIEW
            </h2>
            <h3 className="mb-2 font-serif text-3xl text-white md:text-4xl">
              Start Your Journey Today
            </h3>
            <p className="mb-8 text-sm text-gray-400">
              Send your case details so the clinic can review your records and explain next planning
              steps.
            </p>

            {status === 'sent' ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="py-16 text-center"
              >
                <CheckCircle className="text-gold-400 mx-auto mb-4 h-16 w-16" />
                <h4 className="mb-2 font-serif text-2xl text-white">Request Received!</h4>
                <p className="text-gray-400">We&apos;ll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
                aria-label="Virtual case review request"
                name="consultation"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
              >
                <input type="hidden" name="form-name" value="consultation" />
                <p className="hidden">
                  <label>
                    Don&apos;t fill this out: <input name="bot-field" />
                  </label>
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="consult-name" className="sr-only">
                      Full Name
                    </label>
                    <input
                      id="consult-name"
                      name="name"
                      required
                      aria-required="true"
                      placeholder="Full Name"
                      className="bg-dark-900/50 focus:border-gold-400/50 focus:ring-gold-400/30 w-full rounded-lg border border-white/10 px-4 py-3 text-sm text-white transition-all placeholder:text-gray-500 focus:ring-1 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="consult-email" className="sr-only">
                      Email Address
                    </label>
                    <input
                      id="consult-email"
                      name="email"
                      type="email"
                      required
                      aria-required="true"
                      placeholder="Email Address"
                      className="bg-dark-900/50 focus:border-gold-400/50 focus:ring-gold-400/30 w-full rounded-lg border border-white/10 px-4 py-3 text-sm text-white transition-all placeholder:text-gray-500 focus:ring-1 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="consult-whatsapp" className="sr-only">
                      WhatsApp Number
                    </label>
                    <input
                      id="consult-whatsapp"
                      name="whatsapp"
                      required
                      aria-required="true"
                      placeholder="WhatsApp Number"
                      className="bg-dark-900/50 focus:border-gold-400/50 focus:ring-gold-400/30 w-full rounded-lg border border-white/10 px-4 py-3 text-sm text-white transition-all placeholder:text-gray-500 focus:ring-1 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="consult-treatment" className="sr-only">
                      Treatment Interest
                    </label>
                    <select
                      id="consult-treatment"
                      name="treatment"
                      required
                      aria-required="true"
                      className="bg-dark-900/50 focus:border-gold-400/50 focus:ring-gold-400/30 w-full rounded-lg border border-white/10 px-4 py-3 text-sm text-white transition-all focus:ring-1 focus:outline-none"
                    >
                      <option value="" className="bg-dark-900">
                        Treatment Interest
                      </option>
                      <option value="implants" className="bg-dark-900">
                        Dental Implants
                      </option>
                      <option value="hollywood" className="bg-dark-900">
                        Hollywood Smile / Veneers
                      </option>
                      <option value="allon4" className="bg-dark-900">
                        All-on-4 Full Arch
                      </option>
                      <option value="tmj" className="bg-dark-900">
                        TMJ / Jaw Pain
                      </option>
                      <option value="whitening" className="bg-dark-900">
                        Teeth Whitening
                      </option>
                      <option value="other" className="bg-dark-900">
                        Other
                      </option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="consult-message" className="sr-only">
                    Case Description
                  </label>
                  <textarea
                    id="consult-message"
                    name="message"
                    rows={3}
                    placeholder="Describe your case (optional)"
                    className="bg-dark-900/50 focus:border-gold-400/50 focus:ring-gold-400/30 w-full resize-none rounded-lg border border-white/10 px-4 py-3 text-sm text-white transition-all placeholder:text-gray-500 focus:ring-1 focus:outline-none"
                  />
                </div>

                {/* Photo upload */}
                <div
                  role="button"
                  aria-label="Upload X-ray or smile photos"
                  tabIndex={0}
                  onClick={() => fileRef.current?.click()}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      fileRef.current?.click();
                    }
                  }}
                  className="hover:border-gold-400/30 group cursor-pointer rounded-lg border border-dashed border-white/10 p-4 text-center transition-colors"
                >
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*,application/pdf"
                    className="hidden"
                    onChange={(e) => setFileName(e.target.files?.[0]?.name || null)}
                  />
                  <Upload className="group-hover:text-gold-400 mx-auto mb-1 h-5 w-5 text-gray-500 transition-colors" />
                  <p className="text-xs text-gray-500 group-hover:text-gray-400">
                    {fileName ? (
                      <span className="text-gold-400">{fileName}</span>
                    ) : (
                      'Upload X-ray or smile photos (optional)'
                    )}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="bg-gold-400 text-dark-950 flex w-full items-center justify-center gap-2 rounded-lg py-4 font-bold transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] disabled:opacity-60"
                >
                  {status === 'sending' ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                  {status === 'sending' ? 'Sending…' : 'Send Case Details'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
