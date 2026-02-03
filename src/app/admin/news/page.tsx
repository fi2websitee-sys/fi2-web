import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Newspaper } from 'lucide-react';

export const revalidate = 0;

export default async function AdminNewsPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
          News & Events
        </h1>
        <p className="text-gray-600">
          Manage news articles and events
        </p>
      </div>

      <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
        <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Coming Soon</h3>
        <p className="text-gray-600">
          News & Events management will be available soon.
        </p>
      </div>
    </div>
  );
}
