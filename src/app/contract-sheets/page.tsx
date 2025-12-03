import Link from 'next/link';
import { FileText, GraduationCap } from 'lucide-react';
import HeroBanner from '@/components/ui/HeroBanner';
import Card from '@/components/ui/Card';

export default function ContractSheetsPage() {
  const programs = [
    {
      id: 'bachelor-journalism',
      name: 'Bachelor - Journalism',
      nameAr: 'إجازة - صحافة',
      level: 'Bachelor',
    },
    {
      id: 'bachelor-marketing',
      name: 'Bachelor - Marketing & Advertising',
      nameAr: 'إجازة - تسويق وإعلان',
      level: 'Bachelor',
    },
    {
      id: 'bachelor-pr',
      name: 'Bachelor - Public Relations',
      nameAr: 'إجازة - علاقات عامة',
      level: 'Bachelor',
    },
    {
      id: 'bachelor-info-management',
      name: 'Bachelor - Information Management',
      nameAr: 'إجازة - إدارة المعلومات',
      level: 'Bachelor',
    },
    {
      id: 'bachelor-data-science',
      name: 'Bachelor - Data Science',
      nameAr: 'إجازة - علم البيانات',
      level: 'Bachelor',
    },
    {
      id: 'master-journalism',
      name: 'Master - Journalism',
      nameAr: 'ماجستير - صحافة',
      level: 'Master',
    },
    {
      id: 'master-marketing',
      name: 'Master - Marketing & Advertising',
      nameAr: 'ماجستير - تسويق وإعلان',
      level: 'Master',
    },
    {
      id: 'master-pr',
      name: 'Master - Public Relations',
      nameAr: 'ماجستير - علاقات عامة',
      level: 'Master',
    },
    {
      id: 'master-info-management',
      name: 'Master - Information Management',
      nameAr: 'ماجستير - إدارة المعلومات',
      level: 'Master',
    },
  ];

  return (
    <>
      <HeroBanner
        title="CONTRACT SHEETS"
        titleAr="صحائف العقود"
        subtitle="Download course requirements and curriculum for each program"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Bachelor Programs */}
        <section className="mb-12">
          <h2 className="text-3xl font-heading font-bold text-primary mb-8 reveal reveal-1">
            Bachelor Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs
              .filter((p) => p.level === 'Bachelor')
              .map((program, index) => (
                <Link key={program.id} href={`/contract-sheets/${program.id}`}>
                  <Card
                    hover
                    className={`reveal reveal-${Math.min(index + 2, 6)} cursor-pointer`}
                  >
                    <div className="flex items-start mb-3">
                      <FileText className="w-8 h-8 text-primary mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-heading font-bold text-gray-800 mb-1">
                          {program.name}
                        </h3>
                        <p className="text-sm text-gray-600 font-arabic" dir="rtl">
                          {program.nameAr}
                        </p>
                      </div>
                    </div>
                    <p className="text-primary font-medium text-sm">View Details →</p>
                  </Card>
                </Link>
              ))}
          </div>
        </section>

        {/* Master Programs */}
        <section>
          <h2 className="text-3xl font-heading font-bold text-primary mb-8 reveal reveal-1">
            Master Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs
              .filter((p) => p.level === 'Master')
              .map((program, index) => (
                <Link key={program.id} href={`/contract-sheets/${program.id}`}>
                  <Card
                    hover
                    className={`reveal reveal-${Math.min(index + 2, 6)} cursor-pointer`}
                  >
                    <div className="flex items-start mb-3">
                      <GraduationCap className="w-8 h-8 text-primary mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-heading font-bold text-gray-800 mb-1">
                          {program.name}
                        </h3>
                        <p className="text-sm text-gray-600 font-arabic" dir="rtl">
                          {program.nameAr}
                        </p>
                      </div>
                    </div>
                    <p className="text-primary font-medium text-sm">View Details →</p>
                  </Card>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </>
  );
}
