import { ServiceRecordsFirstPage } from '@/app/components/services/ServiceRecordsFirstPage';
import type { ServiceRecordsFirstContent } from '@/app/components/services/ServiceRecordsFirstPage';
import { SEO } from '@/lib/seo';

const content: ServiceRecordsFirstContent = {
  seo: SEO.clearAligners,
  breadcrumbLabel: 'Clear Aligners',
  heading: 'Clear Aligner Records Review in Cairo',
  introduction:
    'A records-first starting point for adults considering clinician-led tooth movement. Existing photographs, dental images, scans, and dental history can help organise questions before an examination.',
  clinicalBoundary:
    'Digital geometry and clearance records can support planning, but they do not confirm gum, root, jaw joint, or bite health. Clear aligner suitability and any tooth movement decision require clinician review and examination.',
  records: [
    {
      title: 'Smile and bite photographs',
      description: 'Clear front, side, smile, and biting views if you can take them comfortably.',
    },
    {
      title: 'Existing dental images',
      description: 'Recent dental X-rays only if they are already available to you.',
    },
    {
      title: 'Scans or models',
      description: 'A previous digital scan, model, or orthodontic summary if available.',
    },
    {
      title: 'Dental and health history',
      description: 'Previous orthodontics, gum care, jaw symptoms, conditions, and medicines.',
    },
  ],
  faqs: [
    {
      question: 'Can photographs confirm that clear aligners are suitable for me?',
      answer:
        'No. Photographs can support a preliminary discussion, but suitability requires examination and appropriate review of the teeth, roots, gums, bite, and jaw health.',
    },
    {
      question: 'Can the clinic promise my final tooth position from records alone?',
      answer:
        'No. Digital planning supports clinician review, but biological response and clinical findings vary. No final result can be guaranteed from an online records review.',
    },
    {
      question: 'Can I receive a fixed aligner timeline online?',
      answer:
        'No. Timing depends on examination findings, movement goals, monitoring needs, and individual response. The preliminary review cannot set a fixed timeline.',
    },
  ],
};

export default function ClearAligners() {
  return <ServiceRecordsFirstPage content={content} />;
}
