import HeroBanner from '@/components/ui/HeroBanner';
import PreviousExamsClient from '@/components/ui/PreviousExamsClient';
import { previousExams as staticPreviousExams } from '@/data/previousExams';
import { PreviousExam } from '@/types';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/utils/logger';

export const revalidate = 0;

async function getPreviousExams(): Promise<PreviousExam[]> {
  // If Supabase is not configured, fall back to static data
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return staticPreviousExams;
  }

  const supabase = createClient();

  const { data, error } = await supabase
    .from('previous_exams')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) {
    if (error) {
      logger.error('Error fetching previous exams from Supabase', {
        error: error.message,
        code: error.code,
      });
    }
    return staticPreviousExams;
  }

  // Map Supabase rows into the strongly-typed PreviousExam shape
  const mapped: PreviousExam[] = data.map((exam: any) => {
    let yearLevel: PreviousExam['yearLevel'] = exam.year_level;

    if (typeof exam.year_level === 'string') {
      if (exam.year_level === '1' || exam.year_level === '2' || exam.year_level === '3') {
        yearLevel = Number(exam.year_level) as 1 | 2 | 3;
      } else {
        yearLevel = exam.year_level;
      }
    }

    return {
      id: exam.id,
      courseName: exam.course_name,
      courseNameAr: exam.course_name_ar ?? undefined,
      major: exam.major,
      yearLevel,
      semester: exam.semester,
      academicYear: exam.academic_year,
      examType: exam.exam_type,
      pdfUrl: exam.pdf_url,
    };
  });

  // If database is empty, preserve the demo data experience
  return mapped.length > 0 ? mapped : staticPreviousExams;
}

export default async function PreviousExamsPage() {
  const exams = await getPreviousExams();

  return (
    <>
      <HeroBanner
        title="PREVIOUS EXAMS"
        titleAr="الامتحانات سابقة"
        subtitle="Browse and download previous exams"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PreviousExamsClient exams={exams} />
      </div>
    </>
  );
}
