import { Mail, Phone, User } from 'lucide-react';
import HeroBanner from '@/components/ui/HeroBanner';
import Card from '@/components/ui/Card';
import { presidents } from '@/data/presidents';

export default function AboutPage() {
  const currentPresident = presidents.find((p) => p.isCurrent);
  const formerPresidents = presidents.filter((p) => !p.isCurrent);

  return (
    <>
      <HeroBanner
        title="ABOUT US"
        titleAr="من نحن"
        subtitle="Learn more about the FI2 Student Committee and our mission"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mission Statement */}
        <section className="mb-16">
          <Card accent className="reveal reveal-1">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              Our Mission
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>
                The Faculty of Information II Student Committee serves as the voice and
                representative body for all students at FI2. We are dedicated to enhancing
                the student experience through advocacy, support, and engagement.
              </p>
              <p>
                Our mission is to bridge the gap between students and faculty administration,
                ensuring that student concerns are heard and addressed. We organize academic
                support initiatives, cultural events, and professional development opportunities
                to enrich the university experience.
              </p>
              <p>
                We believe in fostering a vibrant, inclusive community where every student
                can thrive academically, socially, and professionally. Through collaboration
                and dedication, we strive to make FI2 a place where students feel supported,
                empowered, and inspired.
              </p>
            </div>
          </Card>
        </section>

        {/* Current President */}
        {currentPresident && (
          <section className="mb-16">
            <h2 className="text-3xl font-heading font-bold text-primary mb-8 text-center reveal reveal-1">
              Current President
            </h2>
            <div className="max-w-2xl mx-auto">
              <Card accent hover={false} className="reveal reveal-2">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-16 h-16 text-primary" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-2xl font-heading font-bold text-gray-800 mb-2">
                      {currentPresident.name}
                    </h3>
                    <p className="text-lg font-arabic text-gray-600 mb-3" dir="rtl">
                      {currentPresident.nameAr}
                    </p>
                    <p className="text-accent font-semibold mb-4">
                      {currentPresident.period}
                    </p>

                    {currentPresident.contact && (
                      <div className="space-y-2">
                        {currentPresident.contact.email && (
                          <div className="flex items-center justify-center sm:justify-start text-gray-600">
                            <Mail className="w-4 h-4 mr-2 text-primary" />
                            <a
                              href={`mailto:${currentPresident.contact.email}`}
                              className="hover:text-primary transition-smooth"
                            >
                              {currentPresident.contact.email}
                            </a>
                          </div>
                        )}
                        {currentPresident.contact.phone && (
                          <div className="flex items-center justify-center sm:justify-start text-gray-600">
                            <Phone className="w-4 h-4 mr-2 text-primary" />
                            <span>{currentPresident.contact.phone}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Former Presidents */}
        <section>
          <h2 className="text-3xl font-heading font-bold text-primary mb-8 text-center reveal reveal-1">
            Successive Presidents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formerPresidents.map((president, index) => (
              <Card
                key={president.id}
                hover
                className={`reveal reveal-${Math.min(index + 2, 6)}`}
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-gray-800 mb-1">
                    {president.name}
                  </h3>
                  <p className="text-sm font-arabic text-gray-600 mb-2" dir="rtl">
                    {president.nameAr}
                  </p>
                  <p className="text-sm text-accent font-semibold">
                    {president.period}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
