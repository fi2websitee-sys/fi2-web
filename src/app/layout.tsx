import type { Metadata } from 'next';
import { Syne, DM_Sans, IBM_Plex_Sans_Arabic } from 'next/font/google';
import Sidebar from '@/components/layout/Sidebar';
import MobileNav from '@/components/layout/MobileNav';
import Footer from '@/components/layout/Footer';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FI2 Student Committee | Lebanese University',
  description:
    'Official website of the Faculty of Information II Student Committee at Lebanese University. Find information about entrance exams, contract sheets, faculty rules, and more.',
  keywords: [
    'Lebanese University',
    'FI2',
    'Faculty of Information',
    'Student Committee',
    'Journalism',
    'Marketing',
    'Public Relations',
    'Information Management',
    'Data Science',
  ],
  authors: [{ name: 'FI2 Student Committee' }],
  openGraph: {
    title: 'FI2 Student Committee | Lebanese University',
    description:
      'Official website of the Faculty of Information II Student Committee at Lebanese University',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${ibmPlexArabic.variable}`}
    >
      <body>
        {/* Skip to content link for accessibility */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>

        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Mobile Navigation */}
        <MobileNav />

        {/* Main Content */}
        <div className="lg:ml-64 min-h-screen flex flex-col">
          {/* Add padding top for mobile header */}
          <div className="lg:hidden h-16" />

          <main id="main-content" className="flex-grow">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
