import AdminNav from '@/components/admin/AdminNav';

export const metadata = {
  title: 'Admin Dashboard - FI2 Student Committee',
  description: 'Manage content for FI2 Student Committee website',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminNav />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
