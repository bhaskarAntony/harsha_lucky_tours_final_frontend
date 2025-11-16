import React from 'react';
import { Link } from 'react-router-dom';
// import { Helmet } from 'react-helmet-async';
import { Home, Package, Users, Phone, FileText, Shield, ExternalLink } from 'lucide-react';

const Sitemap = () => {
  const pages = [
    {
      title: 'Home',
      path: '/',
      icon: Home,
      description: 'Main landing page with hero section and featured packages'
    },
    {
      title: 'Member Packages',
      path: '/packages/member',
      icon: Package,
      description: 'Exclusive travel packages for members with lucky draw system'
    },
    {
      title: 'Non-Member Packages', 
      path: '/packages/non-member',
      icon: Package,
      description: 'Direct booking packages with fixed pricing'
    },
    {
      title: 'About Us',
      path: '/about',
      icon: Users,
      description: 'Learn about Harsha Lucky Tours and our mission'
    },
    {
      title: 'Contact Us',
      path: '/contact',
      icon: Phone,
      description: 'Get in touch for inquiries and support'
    },
    {
      title: 'Sitemap',
      path: '/sitemap',
      icon: FileText,
      description: 'Complete site structure and navigation'
    },
    {
      title: 'Privacy Policy',
      path: '/privacy',
      icon: Shield,
      description: 'Privacy policy and data protection information'
    }
  ];

  const packageCategories = [
    {
      title: 'Member Travel Packages',
      items: [
        'Shirdi Bheema Shankara Package',
        'Kerala Backwaters Paradise',
        'Goa Beach Carnival',
        'Mysore Palace Heritage Tour',
        'Coorg Coffee Plantation Retreat',
        'Hampi Historical Adventure'
      ]
    },
    {
      title: 'Non-Member Travel Packages',
      items: [
        'Ooty Hill Station Escape',
        'Andaman Island Paradise',
        'Rajasthan Royal Heritage',
        'Kashmir Valley Beauty',
        'Manali Adventure Getaway',
        'Thailand Bangkok Pattaya'
      ]
    }
  ];

  return (
    <>
      {/* <Helmet>
        <title>Sitemap | Harsha Lucky Tours | Complete Site Navigation</title>
        <meta name="description" content="Complete sitemap of Harsha Lucky Tours website. Find all pages, travel packages, and information easily." />
        <meta name="keywords" content="sitemap, harsha lucky tours navigation, website structure, travel packages index" />
      </Helmet> */}

      <div className="py-20 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Website Sitemap
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Navigate through all pages and sections of Harsha Lucky Tours website. 
              Find everything you need quickly and easily.
            </p>
          </div>

          {/* Main Pages */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Main Pages</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pages.map((page, index) => {
                const IconComponent = page.icon;
                return (
                  <Link
                    key={index}
                    to={page.path}
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-gradient-to-r from-blue-100 to-teal-100 p-3 rounded-lg group-hover:from-blue-200 group-hover:to-teal-200 transition-all duration-300">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                          {page.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {page.description}
                        </p>
                        <div className="flex items-center text-blue-600 text-sm mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>Visit Page</span>
                          <ExternalLink className="h-4 w-4 ml-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Package Categories */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Travel Packages</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {packageCategories.map((category, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <Package className="h-6 w-6 mr-3 text-blue-600" />
                    {category.title}
                  </h3>
                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full"></div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    to={category.title.includes('Member') && !category.title.includes('Non') ? '/member/packages' : '/non-member/packages'}
                    className="inline-flex items-center mt-6 text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    View All Packages
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Quick Actions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl p-6 text-white text-center">
                <Package className="h-8 w-8 mx-auto mb-4" />
                <h4 className="font-bold mb-2">Browse Packages</h4>
                <p className="text-sm opacity-90 mb-4">Explore all travel packages</p>
                <Link to="/member/packages" className="bg-white text-blue-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors">
                  View Packages
                </Link>
              </div>

              <div className="bg-gradient-to-r from-teal-600 to-green-600 rounded-xl p-6 text-white text-center">
                <Users className="h-8 w-8 mx-auto mb-4" />
                <h4 className="font-bold mb-2">Learn About Us</h4>
                <p className="text-sm opacity-90 mb-4">Discover our story</p>
                <Link to="/about" className="bg-white text-teal-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors">
                  Read More
                </Link>
              </div>

              <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white text-center">
                <Phone className="h-8 w-8 mx-auto mb-4" />
                <h4 className="font-bold mb-2">Contact Us</h4>
                <p className="text-sm opacity-90 mb-4">Get in touch today</p>
                <Link to="/contact" className="bg-white text-green-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors">
                  Contact Now
                </Link>
              </div>

              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white text-center">
                <Home className="h-8 w-8 mx-auto mb-4" />
                <h4 className="font-bold mb-2">Go Home</h4>
                <p className="text-sm opacity-90 mb-4">Back to homepage</p>
                <Link to="/" className="bg-white text-purple-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors">
                  Home Page
                </Link>
              </div>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Website Structure</h2>
            <div className="grid md:grid-cols-3 gap-8 text-sm">
              <div>
                <h4 className="font-bold text-gray-800 mb-3">Main Navigation</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Home Page</li>
                  <li>• Travel Packages</li>
                  <li>• About Company</li>
                  <li>• Contact Information</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-3">Package Types</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Member Lucky Draw Packages</li>
                  <li>• Non-Member Direct Booking</li>
                  <li>• Domestic Destinations</li>
                  <li>• International Tours</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-3">Support Pages</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Privacy Policy</li>
                  <li>• Terms & Conditions</li>
                  <li>• Site Navigation</li>
                  <li>• Customer Support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sitemap;