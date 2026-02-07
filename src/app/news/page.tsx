import { Calendar, Clock } from 'lucide-react';
import HeroBanner from '@/components/ui/HeroBanner';
import Card from '@/components/ui/Card';

export default function NewsPage() {
  // Sample news data - in production, this would come from a CMS or database
  const newsItems = [
    {
      id: '1',
      title: 'New Academic Year Orientation',
      titleAr: 'توجيه العام الأكاديمي الجديد',
      excerpt:
        'Join us for the orientation session for new students. Learn about campus facilities, academic programs, and student life.',
      date: '2024-09-15',
      image: '/images/news/orientation.jpg',
    },
    {
      id: '2',
      title: 'Journalism Workshop Series',
      titleAr: 'سلسلة ورش عمل الصحافة',
      excerpt:
        'Professional journalists will lead hands-on workshops covering investigative reporting, digital journalism, and multimedia storytelling.',
      date: '2024-10-01',
      image: '/images/news/workshop.jpg',
    },
    {
      id: '3',
      title: 'Annual Career Fair 2024',
      titleAr: 'معرض الوظائف السنوي 2024',
      excerpt:
        'Meet with leading companies and explore career opportunities in media, marketing, PR, and information technology.',
      date: '2024-11-10',
      image: '/images/news/career-fair.jpg',
    },
    {
      id: '4',
      title: 'Student Research Symposium',
      titleAr: 'ندوة الأبحاث الطلابية',
      excerpt:
        'Showcase your research projects and learn from fellow students. Awards will be given for outstanding presentations.',
      date: '2024-12-05',
      image: '/images/news/research.jpg',
    },
    {
      id: '5',
      title: 'Media Ethics Lecture',
      titleAr: 'محاضرة أخلاقيات الإعلام',
      excerpt:
        'Renowned media ethicist Dr. Sarah Johnson will discuss contemporary challenges in journalism and responsible reporting.',
      date: '2024-10-20',
      image: '/images/news/lecture.jpg',
    },
    {
      id: '6',
      title: 'Digital Marketing Masterclass',
      titleAr: 'ماستر كلاس التسويق الرقمي',
      excerpt:
        'Learn advanced digital marketing strategies from industry experts. Topics include SEO, social media, and analytics.',
      date: '2024-11-15',
      image: '/images/news/marketing.jpg',
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <HeroBanner
        title="NEWS & EVENTS"
        titleAr="أخبار وفعاليات"
        subtitle="Stay updated with the latest happenings at FI2"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <Card
              key={item.id}
              hover
              className={`reveal reveal-${Math.min(index + 1, 6)} overflow-hidden p-0`}
            >
              {/* Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center img-zoom">
                <Calendar className="w-16 h-16 text-primary/40" />
              </div>

              <div className="p-6">
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{formatDate(item.date)}</span>
                </div>

                <h3 className="text-xl font-heading font-bold text-gray-800 mb-2">
                  {item.title}
                </h3>

                {item.titleAr && (
                  <p className="text-sm text-gray-600 font-arabic mb-3" dir="rtl">
                    {item.titleAr}
                  </p>
                )}

                <p className="text-gray-700 leading-relaxed mb-4">{item.excerpt}</p>

                <button className="text-primary hover:text-primary-dark font-medium text-sm transition-smooth">
                  Read More →
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
