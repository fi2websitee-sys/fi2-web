import Link from 'next/link';
import { GraduationCap, BookOpen, Users, FileText, Calendar } from 'lucide-react';
import HeroBanner from '@/components/ui/HeroBanner';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { majors } from '@/data/majors';

export default function Home() {
  const bachelorMajors = majors.filter((major) => major.level === 'bachelor');

  return (
    <>
      {/* Hero Section */}
      <HeroBanner
        title="FI2 STUDENT COMMITTEE"
        titleAr="الهيئة الطلابية كلية في الإعلام الفرع الثاني"
        subtitle="Welcome to the Faculty of Information II at Lebanese University"
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Welcome Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* About Card */}
            <Card
              title="About the Faculty"
              titleColor="primary"
              accent
              className="reveal reveal-1"
            >
              <p className="text-gray-600 leading-relaxed mb-4">
                The Faculty of Information II is a leading institution in Lebanon,
                offering comprehensive programs in journalism, marketing, public relations,
                information management, and data science.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our mission is to prepare students for successful careers in the rapidly
                evolving media and information landscape through rigorous academic programs
                and hands-on professional experience.
              </p>
              <Link href="/about">
                <Button variant="primary">Learn More</Button>
              </Link>
            </Card>

            {/* Quick Links Card */}
            <Card
              title="Quick Access"
              titleColor="primary"
              accent
              className="reveal reveal-2"
            >
              <div className="space-y-3">
                <Link
                  href="/entrance-exams"
                  className="flex items-center p-3 bg-off-white hover:bg-primary/5 rounded-lg transition-smooth group"
                >
                  <FileText className="w-5 h-5 text-primary mr-3 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-800 font-medium">Entrance Exams</span>
                </Link>
                <Link
                  href="/previous-exams"
                  className="flex items-center p-3 bg-off-white hover:bg-primary/5 rounded-lg transition-smooth group"
                >
                  <BookOpen className="w-5 h-5 text-primary mr-3 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-800 font-medium">Previous Exams</span>
                </Link>
                <Link
                  href="/contract-sheets"
                  className="flex items-center p-3 bg-off-white hover:bg-primary/5 rounded-lg transition-smooth group"
                >
                  <FileText className="w-5 h-5 text-primary mr-3 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-800 font-medium">Contract Sheets</span>
                </Link>
                <Link
                  href="/news"
                  className="flex items-center p-3 bg-off-white hover:bg-primary/5 rounded-lg transition-smooth group"
                >
                  <Calendar className="w-5 h-5 text-primary mr-3 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-800 font-medium">News & Events</span>
                </Link>
              </div>
            </Card>
          </div>
        </section>

        {/* Majors Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary mb-4 reveal reveal-1">
              Our Programs
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto reveal reveal-2">
              Choose from our diverse range of bachelor and master programs designed
              to prepare you for the future of media and information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bachelorMajors.map((major, index) => (
              <Card
                key={major.id}
                hover
                className={`reveal reveal-${Math.min(index + 3, 6)}`}
              >
                <div className="flex items-start mb-3">
                  <GraduationCap className="w-8 h-8 text-primary mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-heading font-bold text-gray-800 mb-1">
                      {major.name}
                    </h3>
                    <p className="text-sm text-gray-600 font-arabic" dir="rtl">
                      {major.nameAr}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {major.description}
                </p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 reveal reveal-6">
            <Link href="/contract-sheets">
              <Button variant="secondary" size="lg">
                View All Programs
              </Button>
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-primary/5 rounded-2xl p-12 reveal reveal-scale">
          <Users className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-4">
            Join Our Community
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Have questions or need assistance? The FI2 Student Committee is here to help.
            Reach out to us for support with academics, events, and more.
          </p>
          <Link href="/contact">
            <Button variant="primary" size="lg">
              Contact Us
            </Button>
          </Link>
        </section>
      </div>
    </>
  );
}
