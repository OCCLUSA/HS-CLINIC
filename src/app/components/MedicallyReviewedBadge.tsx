import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

interface MedicallyReviewedBadgeProps {
  doctorName?: string;
  profileLink?: string;
  lastUpdated?: string;
}

/**
 * MedicallyReviewedBadge — E-E-A-T trust signal for YMYL pages.
 * Shows "Medically Reviewed By" badge linking to the doctor's profile.
 */
export function MedicallyReviewedBadge({
  doctorName = 'Dr. Haitham Sharshar',
  profileLink = '/about',
  lastUpdated,
}: MedicallyReviewedBadgeProps) {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 backdrop-blur-sm">
      <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-400" />
      <span className="text-sm text-gray-300">
        Medically Reviewed By{' '}
        <Link
          to={profileLink}
          className="text-gold-400 decoration-gold-400/30 hover:text-gold-300 font-medium underline underline-offset-2 transition-colors"
        >
          {doctorName}
        </Link>
        {lastUpdated && <span className="ml-2 text-gray-400">| Updated: {lastUpdated}</span>}
      </span>
    </div>
  );
}
