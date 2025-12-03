import { Facebook, Instagram, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="dark-atmosphere text-white mt-20 relative">
      {/* Red accent bar at top of footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[2px] bg-red-primary" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div className="reveal reveal-1">
            <h3 className="text-lg font-heading font-bold mb-4 text-accent">
              Lebanese University
            </h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Faculty of Information II
              <br />
              Student Committee
            </p>
          </div>

          {/* Contact Info */}
          <div className="reveal reveal-2">
            <h3 className="text-lg font-heading font-bold mb-4 text-accent">
              Contact Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-start text-white/80 text-sm">
                <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0 text-primary-light" />
                <span>
                  Jdeideh - Al Ossaily Street
                  <br />
                  Near Mayen Orient Bakery
                </span>
              </div>
              <div className="flex items-center text-white/80 text-sm">
                <Phone className="w-4 h-4 mr-2 flex-shrink-0 text-primary-light" />
                <span>+961 1 870 627 ext: 114</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="reveal reveal-3">
            <h3 className="text-lg font-heading font-bold mb-4 text-accent">
              Follow Us
            </h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-primary-light rounded-lg transition-smooth hover-lift"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-primary-light rounded-lg transition-smooth hover-lift"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-center text-white/60 text-sm">
            © {currentYear} FI2 Student Committee. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
