import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Plus, FileText } from 'lucide-react';
import ExamsList from '@/components/admin/ExamsList';

export const revalidate = 0;

export default async function AdminExamsPage() {
  const supabase = createClient();

  // Check authentication
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  // Fetch all exams
  const { data: exams, error } = await supabase
    .from('previous_exams')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching exams:', error);
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            Previous Exams
          </h1>
          <p className="text-gray-600">
            Manage exam PDFs for students
          </p>
        </div>
        <Link
          href="/admin/exams/new"
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Upload Exam</span>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Exams</p>
              <p className="text-2xl font-bold text-gray-900">{exams?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Exams List */}
      {exams && exams.length > 0 ? (
        <ExamsList exams={exams} />
      ) : (
        <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No exams yet</h3>
          <p className="text-gray-600 mb-6">
            Upload your first exam PDF to get started
          </p>
          <Link
            href="/admin/exams/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Upload Exam</span>
          </Link>
        </div>
      )}
    </div>
  );
}
