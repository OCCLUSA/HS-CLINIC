import { motion, useReducedMotion } from 'framer-motion';
import { Activity, Scan, Maximize, ClipboardList } from 'lucide-react';

// --- SUB-COMPONENTS ---

function FaceScanner({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="bg-dark-900/50 group relative h-64 w-full overflow-hidden rounded-xl border border-white/10">
      <div className="absolute inset-0 grid place-items-center opacity-30">
        {/* Simple Face Silhouette SVG */}
        <svg viewBox="0 0 200 200" className="stroke-gold-400 h-48 w-48 fill-none stroke-[0.5]">
          <path d="M100,20 C60,20 30,50 30,100 C30,160 60,190 100,190 C140,190 170,160 170,100 C170,50 140,20 100,20 Z" />
          <path d="M60,90 Q80,90 100,90 Q120,90 140,90" className="opacity-50" />
          <path d="M90,120 L110,120" className="opacity-50" />
          <path d="M80,150 Q100,160 120,150" className="opacity-50" />

          {/* 3D Net Effect */}
          <circle
            cx="100"
            cy="100"
            r="80"
            strokeDasharray="4 4"
            className="opacity-20"
          />
        </svg>
      </div>

      {/* Scanning Laser */}
      <motion.div
        initial={{ y: 0 }}
        whileInView={reduceMotion ? { y: 0 } : { y: [0, 252, 0] }}
        viewport={{ amount: 0.4 }}
        transition={{
          duration: reduceMotion ? 0 : 5,
          repeat: reduceMotion ? 0 : Infinity,
          ease: 'linear',
        }}
        className="bg-gold-400/50 absolute top-0 left-0 z-10 h-1 w-full shadow-[0_0_20px_rgba(212,175,55,0.8)]"
      />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(197,165,90,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(197,165,90,0.08)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] bg-[size:2rem_2rem]" />

      <div className="bg-dark-950/80 text-gold-400 border-gold-400/30 absolute bottom-4 left-4 flex items-center gap-2 rounded border px-3 py-1 text-xs font-medium">
        <Scan className="h-3 w-3" />
        Smile scan preview
      </div>
    </div>
  );
}

function EmgMonitor({ reduceMotion }: { reduceMotion: boolean }) {
  const barHeights = [22, 38, 58, 34, 76, 48, 88, 54, 68, 42, 62, 30];

  return (
    <div className="bg-dark-900/50 relative flex h-64 w-full flex-col justify-end overflow-hidden rounded-xl border border-white/10 p-6">
      <div className="text-gold-500 absolute top-4 left-4 flex items-center gap-2 text-xs font-medium">
        <Activity className="h-3 w-3" />
        Muscle activity review
      </div>

      <motion.div
        initial={reduceMotion ? { opacity: 1, scaleY: 1 } : { opacity: 1, scaleY: 0.92 }}
        whileInView={
          reduceMotion
            ? { opacity: 1, scaleY: 1 }
            : { opacity: [0.65, 1, 0.65], scaleY: [0.92, 1, 0.92] }
        }
        viewport={{ amount: 0.4 }}
        transition={{
          duration: reduceMotion ? 0 : 4,
          repeat: reduceMotion ? 0 : Infinity,
          ease: 'easeInOut',
        }}
        className="flex h-32 origin-bottom items-end justify-between gap-1"
      >
        {barHeights.map((height, index) => (
          <div
            key={`${height}-${index}`}
            className="from-gold-600/20 to-gold-400 w-full rounded-t-sm bg-gradient-to-t"
            style={{ height: `${height}%` }}
          />
        ))}
      </motion.div>
      <div className="mt-2 h-px w-full bg-white/20" />
      <div className="mt-1 flex justify-between font-mono text-[10px] text-gray-400">
        <span>0ms</span>
        <span>50ms</span>
        <span>100ms</span>
      </div>
    </div>
  );
}

function JawTracker({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="bg-dark-900/50 relative grid h-64 w-full place-items-center overflow-hidden rounded-xl border border-white/10">
      <div className="text-gold-300 absolute top-4 left-4 flex items-center gap-2 text-xs font-medium">
        <Maximize className="h-3 w-3" />
        Jaw movement review
      </div>

      {/* Abstract Jaw SVG */}
      <div className="relative h-40 w-40">
        {/* Upper Jaw (Fixed) */}
        <svg
          viewBox="0 0 100 60"
          className="absolute top-10 left-0 w-full fill-current text-gray-600 opacity-50"
        >
          <path d="M10,40 Q50,-10 90,40" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M20,40 L20,50 M80,40 L80,50" className="stroke-white" />
        </svg>

        {/* Lower Jaw (Animated) */}
        <motion.div
          initial={{ y: 0, rotateX: 0, rotateZ: 0 }}
          whileInView={
            reduceMotion
              ? { y: 0, rotateX: 0, rotateZ: 0 }
              : {
                  y: [0, 15, 0],
                  rotateX: [0, 10, 0],
                  rotateZ: [0, -2, 2, 0],
                }
          }
          viewport={{ amount: 0.4 }}
          transition={{
            duration: reduceMotion ? 0 : 6,
            repeat: reduceMotion ? 0 : Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-16 left-0 h-20 w-full"
        >
          <svg
            viewBox="0 0 100 60"
            className="text-gold-400 h-full w-full fill-none stroke-current stroke-2"
          >
            <path d="M15,10 Q50,60 85,10" />
            {/* Condyles */}
            <circle cx="15" cy="10" r="3" className="fill-gold-400" />
            <circle cx="85" cy="10" r="3" className="fill-gold-400" />
          </svg>

          {/* Tracking Dots */}
          <div className="absolute bottom-0 left-1/2 h-2 w-2 rounded-full bg-white shadow-[0_0_10px_white]" />
        </motion.div>
      </div>

      {/* Data readout */}
      <div className="text-gold-400 absolute top-1/2 right-4 space-y-1 text-right text-[10px] font-medium">
        <div>Photos</div>
        <div>Scans</div>
        <div>Bite records</div>
      </div>
    </div>
  );
}

export function ClinicalSimulation() {
  const reduceMotion = useReducedMotion() === true;

  return (
    <section className="bg-dark-950 relative overflow-hidden py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="text-gold-400 border-gold-400/20 mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium">
            <ClipboardList className="h-4 w-4" />
            Digital planning workflow
          </div>
          <h2 className="mb-6 font-serif text-3xl text-white md:text-5xl">
            Records, scans, and bite review
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            Photographs, scans, bite records, and examination findings can support clinician review
            when they are relevant to the individual case.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <FaceScanner reduceMotion={reduceMotion} />
          <JawTracker reduceMotion={reduceMotion} />
          <EmgMonitor reduceMotion={reduceMotion} />
        </div>
      </div>
    </section>
  );
}
