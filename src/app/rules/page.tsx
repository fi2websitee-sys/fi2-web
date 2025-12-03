import HeroBanner from '@/components/ui/HeroBanner';
import Accordion from '@/components/ui/Accordion';

export default function RulesPage() {
  return (
    <>
      <HeroBanner
        title="FACULTY RULES & REGULATIONS"
        titleAr="نظام وقوانين الكلية"
        subtitle="Academic and administrative regulations governing the Faculty of Information II"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="reveal reveal-1">
          <Accordion title="Chapter 1: General Provisions" defaultOpen>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Article 1</h4>
                <p className="text-gray-700 leading-relaxed">
                  The Faculty of Information II operates under the regulations set forth
                  by the Lebanese University and adheres to all national educational standards.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Article 2</h4>
                <p className="text-gray-700 leading-relaxed">
                  All students enrolled in the faculty must maintain academic integrity
                  and comply with the code of conduct.
                </p>
              </div>
            </div>
          </Accordion>
        </div>

        <div className="reveal reveal-2">
          <Accordion title="Chapter 2: Admission Requirements">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Article 3</h4>
                <p className="text-gray-700 leading-relaxed">
                  Admission to bachelor programs requires successful completion of
                  secondary education and passing the entrance examination.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Article 4</h4>
                <p className="text-gray-700 leading-relaxed">
                  Master program admission requires a bachelor&apos;s degree with a minimum
                  GPA as specified by each program.
                </p>
              </div>
            </div>
          </Accordion>
        </div>

        <div className="reveal reveal-3">
          <Accordion title="Chapter 3: Academic Regulations">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Article 5</h4>
                <p className="text-gray-700 leading-relaxed">
                  Students must complete all required coursework and maintain a minimum
                  GPA to remain in good academic standing.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Article 6</h4>
                <p className="text-gray-700 leading-relaxed">
                  Attendance is mandatory for all courses. Students must attend at least
                  75% of classes to be eligible for final examinations.
                </p>
              </div>
            </div>
          </Accordion>
        </div>

        <div className="reveal reveal-4">
          <Accordion title="Chapter 4: Examination Regulations">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Article 7</h4>
                <p className="text-gray-700 leading-relaxed">
                  Final examinations are held at the end of each semester. Students must
                  achieve a minimum passing grade to earn credit for a course.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Article 8</h4>
                <p className="text-gray-700 leading-relaxed">
                  Academic dishonesty including plagiarism and cheating will result in
                  disciplinary action up to and including expulsion.
                </p>
              </div>
            </div>
          </Accordion>
        </div>

        <div className="reveal reveal-5">
          <Accordion title="Chapter 5: Student Rights and Responsibilities">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Article 9</h4>
                <p className="text-gray-700 leading-relaxed">
                  Students have the right to access academic resources, receive fair
                  evaluation, and participate in student activities.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Article 10</h4>
                <p className="text-gray-700 leading-relaxed">
                  Students are responsible for knowing and adhering to all faculty
                  regulations and maintaining professional conduct at all times.
                </p>
              </div>
            </div>
          </Accordion>
        </div>

        <div className="reveal reveal-6">
          <Accordion title="Chapter 6: Graduation Requirements">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Article 11</h4>
                <p className="text-gray-700 leading-relaxed">
                  Students must complete all required credits, maintain minimum GPA
                  requirements, and fulfill any additional program-specific requirements
                  to be eligible for graduation.
                </p>
              </div>
            </div>
          </Accordion>
        </div>
      </div>
    </>
  );
}
