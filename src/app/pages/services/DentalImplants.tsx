import { ServiceRecordsFirstPage } from '@/app/components/services/ServiceRecordsFirstPage';
import type { ServiceRecordsFirstContent } from '@/app/components/services/ServiceRecordsFirstPage';
import { SEO } from '@/lib/seo';

const content: ServiceRecordsFirstContent = {
  seo: SEO.dentalImplants,
  breadcrumbLabel: 'Dental Implants',
  heading: 'Dental Implant Records Review in Cairo',
  introduction:
    'A records-first starting point for adults considering replacement of missing teeth. Existing dental images, photographs, health information, and previous treatment notes can help organise questions before an in-person examination.',
  clinicalBoundary:
    'This is a preliminary screening suggestion only. Implant suitability, anatomy, bone and gum findings, risks, alternatives, and any treatment plan require clinician review, examination, and appropriate diagnostics.',
  records: [
    {
      title: 'Existing dental images',
      description: 'A panoramic X-ray or CBCT only if you already have one.',
    },
    {
      title: 'Mouth photographs',
      description: 'Clear views of your smile, teeth, and the area you want reviewed.',
    },
    {
      title: 'Health information',
      description: 'Relevant conditions, medicines, allergies, and smoking history.',
    },
    {
      title: 'Previous treatment notes',
      description: 'Implant cards, crown details, or a recent dentist summary if available.',
    },
  ],
  faqs: [
    {
      question: 'Can my records confirm that I can have a dental implant?',
      answer:
        'No. Records can support a preliminary discussion, but implant suitability requires examination and appropriate diagnostic review by a clinician.',
    },
    {
      question: 'Do I need a new CBCT before contacting the clinic?',
      answer:
        'No. Send only imaging you already have. A clinician can advise whether additional imaging is appropriate after reviewing your history and examination needs.',
    },
    {
      question: 'Is the preliminary review a treatment plan or final estimate?',
      answer:
        'No. It can organise questions and possible visit stages. A final plan and estimate depend on examination, diagnostic findings, and clinician review.',
    },
  ],
};

export default function DentalImplants() {
  return <ServiceRecordsFirstPage content={content} />;
}
