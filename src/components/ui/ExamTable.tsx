import { Download, FileText } from 'lucide-react';
import { PreviousExam } from '@/types';
import Button from './Button';

interface ExamTableProps {
  exams: PreviousExam[];
}

export default function ExamTable({ exams }: ExamTableProps) {
  const getMajorLabel = (major: string) => {
    const labels: Record<string, string> = {
      common: 'Common',
      journalism: 'Journalism',
      pr: 'Public Relations',
      marketing: 'Marketing & Advertising',
      'info-management': 'Information Management',
      'data-science': 'Data Science',
    };
    return labels[major] || major;
  };

  const getYearLabel = (year: number | string) => {
    if (year === 'master1') return 'Master 1';
    if (year === 'master2') return 'Master 2';
    return `Year ${year}`;
  };

  const getSemesterLabel = (semester: string) => {
    return semester.charAt(0).toUpperCase() + semester.slice(1);
  };

  const getExamTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const getMajorBadgeColor = (major: string) => {
    const colors: Record<string, string> = {
      common: 'bg-gray-100 text-gray-800',
      journalism: 'bg-blue-100 text-blue-800',
      pr: 'bg-purple-100 text-purple-800',
      marketing: 'bg-pink-100 text-pink-800',
      'info-management': 'bg-teal-100 text-teal-800',
      'data-science': 'bg-orange-100 text-orange-800',
    };
    return colors[major] || 'bg-gray-100 text-gray-800';
  };

  if (exams.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-heading font-bold text-gray-800 mb-2">
          No Exams Found
        </h3>
        <p className="text-gray-600">
          Try adjusting your filters to see more results.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Mobile Card View */}
      <div className="lg:hidden">
        {exams.map((exam, index) => (
          <div
            key={exam.id}
            className={`p-4 ${index !== exams.length - 1 ? 'border-b border-gray-200' : ''}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-1">
                  {exam.courseName}
                </h4>
                {exam.courseNameAr && (
                  <p className="text-sm text-gray-600 font-arabic mb-2" dir="rtl">
                    {exam.courseNameAr}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              <span
                className={`px-2 py-1 text-xs font-medium rounded ${getMajorBadgeColor(exam.major)}`}
              >
                {getMajorLabel(exam.major)}
              </span>
              <span className="px-2 py-1 text-xs font-medium rounded bg-primary/10 text-primary">
                {getYearLabel(exam.yearLevel)}
              </span>
              <span className="px-2 py-1 text-xs font-medium rounded bg-accent/10 text-accent-dark">
                {getSemesterLabel(exam.semester)} {exam.academicYear}
              </span>
              <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700">
                {getExamTypeLabel(exam.examType)}
              </span>
            </div>

            <a
              href={exam.pdfUrl}
              download
              className="inline-flex items-center text-sm text-primary hover:text-primary-dark font-medium transition-smooth"
            >
              <Download className="w-4 h-4 mr-1" />
              Download
            </a>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-primary/5">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                Course Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                Major
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                Year
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                Semester
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                Type
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                Download
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {exams.map((exam) => (
              <tr key={exam.id} className="hover:bg-primary/[0.03] transition-smooth">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-800">{exam.courseName}</p>
                    {exam.courseNameAr && (
                      <p className="text-sm text-gray-600 font-arabic mt-1" dir="rtl">
                        {exam.courseNameAr}
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded ${getMajorBadgeColor(exam.major)}`}
                  >
                    {getMajorLabel(exam.major)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {getYearLabel(exam.yearLevel)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <div>
                    <p>{getSemesterLabel(exam.semester)}</p>
                    <p className="text-xs text-gray-500">{exam.academicYear}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {getExamTypeLabel(exam.examType)}
                </td>
                <td className="px-6 py-4">
                  <a
                    href={exam.pdfUrl}
                    download
                    className="inline-flex items-center px-3 py-2 text-sm text-primary hover:text-white hover:bg-primary rounded-lg transition-smooth active:scale-[0.97]"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
