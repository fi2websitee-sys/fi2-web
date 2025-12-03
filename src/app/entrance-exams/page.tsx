import { Download, FileText, CheckCircle } from 'lucide-react';
import HeroBanner from '@/components/ui/HeroBanner';
import Card from '@/components/ui/Card';
import { entranceExams } from '@/data/entranceExams';

export default function EntranceExamsPage() {
  return (
    <>
      <HeroBanner
        title="ENTRANCE EXAMS"
        titleAr="امتحانات الدخول"
        subtitle="Requirements and past entrance examination papers"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Requirements Section */}
        <section className="mb-12">
          <Card accent className="reveal reveal-1">
            <h2 className="text-2xl font-heading font-bold text-primary mb-6">
              Entrance Exam Requirements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-heading font-semibold text-gray-800 mb-4">
                  Bachelor Programs
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Lebanese Baccalaureate (Part II) or equivalent
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Pass the entrance examination
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Submit required documentation
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-heading font-semibold text-gray-800 mb-4">
                  Master Programs
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Bachelor&apos;s degree in relevant field
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Minimum GPA requirements
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Interview and/or written examination
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* Past Exams Section */}
        <section>
          <h2 className="text-3xl font-heading font-bold text-primary mb-8 text-center reveal reveal-1">
            Past Entrance Examinations
          </h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden reveal reveal-2">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary/5">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                      Academic Year
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                      Major
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                      Download
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {entranceExams.map((exam, index) => (
                    <tr
                      key={exam.id}
                      className={`hover:bg-gray-50 transition-smooth ${
                        index % 2 === 0 ? 'bg-white' : 'bg-off-white'
                      }`}
                    >
                      <td className="px-6 py-4 text-gray-800 font-semibold">
                        {exam.academicYear}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-gray-800">{exam.major}</p>
                          {exam.majorAr && (
                            <p className="text-sm text-gray-600 font-arabic" dir="rtl">
                              {exam.majorAr}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{exam.date}</td>
                      <td className="px-6 py-4">
                        <a
                          href={exam.pdfUrl}
                          download
                          className="inline-flex items-center px-3 py-2 text-sm text-primary hover:text-white hover:bg-primary rounded-lg transition-smooth"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download PDF
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
