import React, { useState } from 'react';
// import { Helmet } from 'react-helmet-async';
import { Phone, Mail, MapPin, Send, CheckCircle, Clock, Building2 } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* <Helmet>
        <title>Contact Us | Harsha Lucky Tours | Bangalore Travel Lucky Draw</title>
        <meta name="description" content="Reach out to Harsha Lucky Tours for travel packages, membership, or lucky draw inquiries. Bangalore-based startup. Call +91 98765 43210." />
        <meta name="keywords" content="contact harsha lucky tours, bangalore travel company, lucky draw inquiry, package booking" />
      </Helmet> */}

      {/* SMALL HERO BANNER - 250px */}
      <section className="relative h-64 md:h-72 bg-gradient-to-br from-blue-900 via-blue-700 to-teal-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url("https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg")' }}
        ></div>

        <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Get in Touch</h1>
            <p className="text-lg md:text-xl opacity-90">We’re here to help you plan your dream trip</p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">

            {/* CONTACT FORM */}
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Send Us a Message</h2>

              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800 p-5 rounded-xl mb-6 flex items-center">
                  <CheckCircle className="h-6 w-6 mr-3 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Message Sent!</p>
                    <p className="text-sm">We'll get back to you within 24 hours.</p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-5 rounded-xl mb-6">
                  <p className="font-semibold">Oops! Something went wrong.</p>
                  <p className="text-sm">Please try again or call us directly.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your travel plans, package interest, or any questions..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="animate-spin h-5 w-5 mr-3" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-3" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* CONTACT INFO + HOURS */}
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Building2 className="h-7 w-7 mr-3 text-blue-600" />
                  Contact Information
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Call Us</p>
                      <p className="text-gray-600">+91 98765 43210</p>
                      <p className="text-gray-600">+91 80 1234 5678</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-teal-100 p-3 rounded-xl">
                      <Mail className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Email Us</p>
                      <p className="text-gray-600">info@harshaluckytours.com</p>
                      <p className="text-gray-600">support@harshaluckytours.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-xl">
                      <MapPin className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Visit Us</p>
                      <p className="text-gray-600 leading-relaxed">
                        123, MG Road<br />
                        Bangalore, Karnataka 560001<br />
                        India
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-3xl p-8 md:p-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Business Hours</h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between">
                    <span>Monday – Friday</span>
                    <span className="font-bold text-blue-600">9:00 AM – 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-bold text-blue-600">9:00 AM – 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-bold text-blue-600">10:00 AM – 4:00 PM</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-white rounded-xl">
                  <p className="text-sm text-gray-600">
                    <strong>Emergency Support:</strong> 24/7 during your travel
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA BANNER */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-3xl p-10 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Win Your Dream Vacation?
            </h3>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Join thousands of members paying small monthly installments for a chance to travel free.
            </p>
            <a
              href="/packages/member"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105"
            >
              View Packages
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;