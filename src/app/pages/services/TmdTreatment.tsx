import { ServiceRecordsFirstPage } from '@/app/components/services/ServiceRecordsFirstPage';
import type { ServiceRecordsFirstContent } from '@/app/components/services/ServiceRecordsFirstPage';
import { SEO } from '@/lib/seo';

const content: ServiceRecordsFirstContent = {
  seo: SEO.tmdTreatment,
  breadcrumbLabel: 'TMJ and TMD Screening',
  heading: 'TMJ and Bite Screening Records Review',
  introduction:
    'A records-first discussion for jaw joint, muscle, bite, or movement concerns. Symptoms, history, and existing records can help a clinician decide what needs in-person examination.',
  clinicalBoundary:
    'Jaw tracking, EMG, and bite data are adjunct screening inputs. They do not diagnose TMD or prove causation. Symptoms, history, examination, and appropriate records must be interpreted together by a clinician.',
  records: [
    {
      title: 'Symptom history',
      description: 'When symptoms began, what changes them, and any previous care or injury.',
    },
    {
      title: 'Existing images or reports',
      description: 'Dental or medical reports and imaging only if you already have them.',
    },
    {
      title: 'Jaw and bite records',
      description: 'Jaw tracking, EMG, or bite data only if they were already recorded.',
    },
    {
      title: 'Health information',
      description: 'Relevant conditions, medicines, sleep concerns, and pain history.',
    },
  ],
  faqs: [
    {
      question: 'Can jaw tracking or EMG diagnose TMD?',
      answer:
        'No. Jaw tracking and EMG are adjunct screening inputs. They must be interpreted with symptoms, history, examination, and other appropriate records.',
    },
    {
      question: 'Can bite data prove what caused my symptoms?',
      answer:
        'No. Bite data alone does not prove causation, and occlusion alone cannot establish why a symptom developed. Clinician review is required.',
    },
    {
      question: 'Is an online records review a treatment recommendation?',
      answer:
        'No. It is a preliminary screening discussion that can prepare questions for an examination. It is not a diagnosis or treatment decision.',
    },
  ],
};

export default function TmdTreatment() {
  return <ServiceRecordsFirstPage content={content} />;
}
