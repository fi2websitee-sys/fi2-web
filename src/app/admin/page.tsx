import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import {
  Newspaper,
  FileText,
  GraduationCap,
  FileSpreadsheet,
  MessageSquare,
  TrendingUp
} from 'lucide-react';
import { logger } from '@/lib/utils/logger';

export const revalidate = 0; // Disable caching for admin pages

async function getStats() {
  const supabase = createClient();

  try {
    // Get counts from all tables
    const [newsCount, examsCount, entranceExamsCount, contractSheetsCount, contactsCount] = await Promise.all([
      supabase.from('news_items').select('*', { count: 'exact', head: true }),
      supabase.from('previous_exams').select('*', { count: 'exact', head: true }),
      supabase.from('entrance_exams').select('*', { count: 'exact', head: true }),
      supabase.from('contract_sheets').select('*', { count: 'exact', head: true }),
      supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
    ]);

    return {
      news: newsCount.count || 0,
      previousExams: examsCount.count || 0,
      entranceExams: entranceExamsCount.count || 0,
      contractSheets: contractSheetsCount.count || 0,
      contacts: contactsCount.count || 0,
    };
  } catch (error) {
    logger.error('Error fetching admin stats', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return {
      news: 0,
      previousExams: 0,
      entranceExams: 0,
      contractSheets: 0,
      contacts: 0,
    };
  }
}

export default async function AdminDashboard() {
  const supabase = createClient();

  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const stats = await getStats();

  const statCards = [
    {
      title: 'News & Events',
      value: stats.news,
      icon: Newspaper,
      href: '/admin/news',
      color: 'bg-blue-500',
      lightBg: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Previous Exams',
      value: stats.previousExams,
      icon: FileText,
      href: '/admin/exams',
      color: 'bg-green-500',
      lightBg: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Entrance Exams',
      value: stats.entranceExams,
      icon: GraduationCap,
      href: '/admin/entrance-exams',
      color: 'bg-purple-500',
      lightBg: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Contract Sheets',
      value: stats.contractSheets,
      icon: FileSpreadsheet,
      href: '/admin/contract-sheets',
      color: 'bg-orange-500',
      lightBg: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    {
      title: 'Contact Messages',
      value: stats.contacts,
      icon: MessageSquare,
      href: '/admin/contacts',
      color: 'bg-pink-500',
      lightBg: 'bg-pink-50',
      textColor: 'text-pink-600'
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back! Here&apos;s an overview of your content.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <a
              key={card.title}
              href={card.href}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {card.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {card.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${card.lightBg} group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${card.textColor}`} />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-sm text-gray-500">
                <TrendingUp className="w-4 h-4" />
                <span>Manage {card.title.toLowerCase()}</span>
              </div>
            </a>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-heading font-bold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="/admin/news/new"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
          >
            <Newspaper className="w-5 h-5 text-primary" />
            <span className="font-medium text-gray-700">Add News Article</span>
          </a>
          <a
            href="/admin/exams/new"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
          >
            <FileText className="w-5 h-5 text-primary" />
            <span className="font-medium text-gray-700">Upload Exam PDF</span>
          </a>
          <a
            href="/admin/contacts"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
          >
            <MessageSquare className="w-5 h-5 text-primary" />
            <span className="font-medium text-gray-700">View Messages</span>
          </a>
        </div>
      </div>
    </div>
  );
}
