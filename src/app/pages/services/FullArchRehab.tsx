import { ServiceRecordsFirstPage } from '@/app/components/services/ServiceRecordsFirstPage';
import type { ServiceRecordsFirstContent } from '@/app/components/services/ServiceRecordsFirstPage';
import { SEO } from '@/lib/seo';

const content: ServiceRecordsFirstContent = {
  seo: SEO.fullArchRehab,
  breadcrumbLabel: 'Full Arch Rehabilitation',
  heading: 'Full Arch Rehabilitation Records Review',
  introduction:
    'A records-first starting point for adults with many missing or heavily treated teeth, or an existing denture. Current records can help organise questions before a clinician examines the teeth, gums, bone, bite, and general health.',
  clinicalBoundary:
    'Records can help prepare questions, but they cannot determine whether teeth should be removed, whether implants are suitable, implant number or position, prosthesis design, or treatment sequence. These decisions require clinician examination and appropriate diagnostics.',
  records: [
    {
      title: 'Existing dental images',
      description: 'A panoramic X-ray or CBCT only if you already have one.',
    },
    {
      title: 'Smile and mouth photographs',
      description: 'Clear views with and without any removable denture, when comfortable.',
    },
    {
      title: 'Denture or implant details',
      description: 'Existing denture information, implant cards, or prosthetic notes if available.',
    },
    {
      title: 'Health information',
      description: 'Relevant conditions, medicines, allergies, smoking, and previous surgery.',
    },
  ],
  faqs: [
    {
      question: 'Can an online review confirm that my remaining teeth need removal?',
      answer:
        'No. That decision requires an examination, appropriate imaging, periodontal and restorative assessment, and a clinician-led discussion of alternatives.',
    },
    {
      question: 'Can records alone confirm an implant-supported full arch plan?',
      answer:
        'No. Records can support preliminary questions, but implant suitability, anatomy, prosthetic space, bite, risks, and alternatives require in-person clinician review.',
    },
    {
      question: 'Can the clinic promise a temporary or final fixed prosthesis?',
      answer:
        'No. Temporary and final prosthesis decisions are case-dependent and cannot be promised from records alone. Examination and appropriate diagnostics are required.',
    },
  ],
};

export default function FullArchRehab() {
  return <ServiceRecordsFirstPage content={content} />;
}
