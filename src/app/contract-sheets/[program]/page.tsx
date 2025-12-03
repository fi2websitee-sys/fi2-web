import { notFound } from 'next/navigation';
import { Download } from 'lucide-react';
import HeroBanner from '@/components/ui/HeroBanner';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const programData: Record<
  string,
  { name: string; nameAr: string; level: string }
> = {
  'bachelor-journalism': {
    name: 'Bachelor - Journalism',
    nameAr: 'إجازة - صحافة',
    level: 'Bachelor',
  },
  'bachelor-marketing': {
    name: 'Bachelor - Marketing & Advertising',
    nameAr: 'إجازة - تسويق وإعلان',
    level: 'Bachelor',
  },
  'bachelor-pr': {
    name: 'Bachelor - Public Relations',
    nameAr: 'إجازة - علاقات عامة',
    level: 'Bachelor',
  },
  'bachelor-info-management': {
    name: 'Bachelor - Information Management',
    nameAr: 'إجازة - إدارة المعلومات',
    level: 'Bachelor',
  },
  'bachelor-data-science': {
    name: 'Bachelor - Data Science',
    nameAr: 'إجازة - علم البيانات',
    level: 'Bachelor',
  },
  'master-journalism': {
    name: 'Master - Journalism',
    nameAr: 'ماجستير - صحافة',
    level: 'Master',
  },
  'master-marketing': {
    name: 'Master - Marketing & Advertising',
    nameAr: 'ماجستير - تسويق وإعلان',
    level: 'Master',
  },
  'master-pr': {
    name: 'Master - Public Relations',
    nameAr: 'ماجستير - علاقات عامة',
    level: 'Master',
  },
  'master-info-management': {
    name: 'Master - Information Management',
    nameAr: 'ماجستير - إدارة المعلومات',
    level: 'Master',
  },
};

export default function ContractSheetDetailPage({
  params,
}: {
  params: { program: string };
}) {
  const program = programData[params.program];

  if (!program) {
    notFound();
  }

  return (
    <>
      <HeroBanner title={program.name} titleAr={program.nameAr} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card accent className="reveal reveal-1">
          <h2 className="text-2xl font-heading font-bold text-primary mb-6">
            Program Contract Sheet
          </h2>

          <div className="prose max-w-none text-gray-700 mb-6">
            <p className="leading-relaxed">
              This document contains the complete curriculum and course requirements
              for the {program.name} program. It includes all required courses, electives,
              credit hours, and prerequisites.
            </p>
          </div>

          <div className="bg-off-white rounded-lg p-6 mb-6">
            <h3 className="font-heading font-semibold text-gray-800 mb-4">
              Document Information
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Program:</span> {program.name}
              </p>
              <p>
                <span className="font-semibold">Level:</span> {program.level}
              </p>
              <p>
                <span className="font-semibold">Format:</span> PDF
              </p>
              <p>
                <span className="font-semibold">Language:</span> English / Arabic
              </p>
            </div>
          </div>

          <a
            href={`/documents/contract-sheets/${params.program}.pdf`}
            download
            className="inline-block"
          >
            <Button variant="primary" size="lg">
              <Download className="w-5 h-5 mr-2" />
              Download Contract Sheet
            </Button>
          </a>
        </Card>
      </div>
    </>
  );
}

export function generateStaticParams() {
  return Object.keys(programData).map((program) => ({
    program,
  }));
}
