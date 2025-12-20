'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  LayoutDashboard,
  Newspaper,
  FileText,
  GraduationCap,
  FileSpreadsheet,
  MessageSquare,
  LogOut,
  User
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useState } from 'react';

const navItems = [
  {
    href: '/admin',
    label: 'Dashboard',
    icon: LayoutDashboard
  },
  {
    href: '/admin/news',
    label: 'News & Events',
    icon: Newspaper
  },
  {
    href: '/admin/exams',
    label: 'Previous Exams',
    icon: FileText
  },
  {
    href: '/admin/entrance-exams',
    label: 'Entrance Exams',
    icon: GraduationCap
  },
  {
    href: '/admin/contract-sheets',
    label: 'Contract Sheets',
    icon: FileSpreadsheet
  },
  {
    href: '/admin/contacts',
    label: 'Contact Messages',
    icon: MessageSquare
  },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/admin" className="flex items-center gap-3">
          <Image
            src="/images/fi2-logo.svg"
            alt="FI2 Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <div>
            <h1 className="text-lg font-heading font-bold text-primary">FI2 Admin</h1>
            <p className="text-xs text-gray-600">Content Management</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <Link
          href="/admin/profile"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
        >
          <User className="w-5 h-5" />
          <span className="font-medium">Profile</span>
        </Link>

        <button
          onClick={handleLogout}
          disabled={loading}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all disabled:opacity-50"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">
            {loading ? 'Logging out...' : 'Logout'}
          </span>
        </button>
      </div>
    </aside>
  );
}
