'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Trash2, FileText, Download, Loader2 } from 'lucide-react';
import { logger } from '@/lib/utils/logger';

interface Exam {
  id: string;
  course_name: string;
  course_name_ar: string | null;
  major: string;
  year_level: string;
  semester: string;
  academic_year: string;
  exam_type: string;
  pdf_url: string;
  file_size: number | null;
  created_at: string;
}

interface ExamsListProps {
  exams: Exam[];
}

export default function ExamsList({ exams: initialExams }: ExamsListProps) {
  const [exams, setExams] = useState(initialExams);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async (exam: Exam) => {
    if (!confirm(`Are you sure you want to delete "${exam.course_name}"?`)) {
      return;
    }

    setDeletingId(exam.id);

    try {
      // Delete file from storage
      if (exam.pdf_url) {
        const fileName = exam.pdf_url.split('/').pop();
        if (fileName) {
          const { error: storageError } = await supabase.storage
            .from('documents')
            .remove([`exams/${fileName}`]);

          if (storageError) {
            logger.error('Error deleting file from storage', {
              error: storageError.message,
              // Don't log file paths or user info
            });
          }
        }
      }

      // Delete from database
      const { error: dbError } = await supabase
        .from('previous_exams')
        .delete()
        .eq('id', exam.id);

      if (dbError) {
        throw dbError;
      }

      // Update local state
      setExams(exams.filter(e => e.id !== exam.id));

      router.refresh();
    } catch (error) {
      logger.error('Error deleting exam', {
        error: error instanceof Error ? error.message : 'Unknown error',
        examId: exam.id.substring(0, 8) + '...', // Partial ID only
      });
      alert('Failed to delete exam. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  const formatBytes = (bytes: number | null) => {
    if (!bytes) return 'Unknown size';
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  };

  const majorLabels: Record<string, string> = {
    'journalism': 'Journalism',
    'pr': 'Public Relations',
    'marketing': 'Marketing & Advertising',
    'info-management': 'Information Management',
    'data-science': 'Data Science',
    'common': 'Common Courses'
  };

  const semesterLabels: Record<string, string> = {
    'semester1': 'Semester 1',
    'semester2': 'Semester 2'
  };

  const examTypeLabels: Record<string, string> = {
    'midterm': 'Midterm',
    'final': 'Final',
    'quiz': 'Quiz'
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Course
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Major
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Year
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Semester
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Type
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Academic Year
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                File Size
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {exams.map((exam) => (
              <tr key={exam.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-900">{exam.course_name}</p>
                    {exam.course_name_ar && (
                      <p className="text-sm text-gray-500 font-arabic" dir="rtl">
                        {exam.course_name_ar}
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {majorLabels[exam.major] || exam.major}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  Year {exam.year_level}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {semesterLabels[exam.semester] || exam.semester}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    {examTypeLabels[exam.exam_type] || exam.exam_type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {exam.academic_year}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {formatBytes(exam.file_size)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <a
                      href={exam.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                      title="Download PDF"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => handleDelete(exam)}
                      disabled={deletingId === exam.id}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
                      title="Delete exam"
                    >
                      {deletingId === exam.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
