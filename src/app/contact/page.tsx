'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, AlertCircle } from 'lucide-react';
import HeroBanner from '@/components/ui/HeroBanner';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Failed to send message');
      }

      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <HeroBanner
        title="CONTACT US"
        titleAr="اتصل بنا"
        subtitle="Get in touch with the FI2 Student Committee"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card accent className="reveal reveal-1">
              <div className="flex items-start mb-4">
                <MapPin className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-bold text-gray-800 mb-2">
                    Address
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Jdeideh - Al Ossaily Street
                    <br />
                    Near Mayen Orient Bakery
                  </p>
                </div>
              </div>
            </Card>

            <Card accent className="reveal reveal-2">
              <div className="flex items-start mb-4">
                <Phone className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-bold text-gray-800 mb-2">
                    Phone
                  </h3>
                  <p className="text-gray-600 text-sm">
                    +961 76 782 943
                  </p>
                </div>
              </div>
            </Card>

            <Card accent className="reveal reveal-3">
              <div className="flex items-start mb-4">
                <Mail className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-bold text-gray-800 mb-2">
                    Email
                  </h3>
                  <a
                    href="mailto:media.lufi2@gmail.com"
                    className="text-primary hover:text-primary-dark text-sm transition-smooth"
                  >
                    media.lufi2@gmail.com
                  </a>
                </div>
              </div>
            </Card>

            <Card accent className="reveal reveal-4">
              <h3 className="font-heading font-bold text-gray-800 mb-3">
                Office Hours
              </h3>
              <div className="text-gray-600 text-sm space-y-1">
                <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                <p>Saturday: 9:00 AM - 1:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card accent className="reveal reveal-2">
              <h2 className="text-2xl font-heading font-bold text-primary mb-6">
                Send Us a Message
              </h2>

              {/* Success Message */}
              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    Thank you for your message! We will get back to you soon.
                  </p>
                </div>
              )}

              {/* Error Message */}
              {submitError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">{submitError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Name <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-off-white border border-gray-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent focus-visible:bg-white transition-smooth"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email <span className="text-error">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-off-white border border-gray-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent focus-visible:bg-white transition-smooth"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-off-white border border-gray-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent focus-visible:bg-white transition-smooth"
                    placeholder="What is this regarding?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message <span className="text-error">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-off-white border border-gray-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent focus-visible:bg-white transition-smooth resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
