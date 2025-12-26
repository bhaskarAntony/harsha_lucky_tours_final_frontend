import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-2 rounded-lg">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Harsha Lucky Tours</h3>
                <p className="text-sm text-gray-300">Travel Lucky Draw</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6">
              Making travel dreams come true through exciting lucky draws. Join us for an adventure of a lifetime!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-blue-400 rounded-full hover:bg-blue-500 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-pink-600 rounded-full hover:bg-pink-700 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/packages/member" className="text-gray-300 hover:text-white transition-colors">
                  Member Packages
                </Link>
              </li>
              <li>
                <Link to="/packages/non-member" className="text-gray-300 hover:text-white transition-colors">
                  Non-Member Packages
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3 text-gray-300">
              <li>Lucky Draw Tours</li>
              <li>Member Packages</li>
              <li>Non-Member Tours</li>
              <li>Group Travel</li>
              <li>Customized Packages</li>
              <li>Travel Insurance</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                <div className="text-gray-300">
                  <p>123, MG Road, Bangalore</p>
                  <p>Karnataka - 560001</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <a href="tel:+919876543210" className="text-gray-300 hover:text-white transition-colors">
                  +91 9019997133 / +91 9611581384
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <a href="mailto:info@harshaluckytours.com" className="text-gray-300 hover:text-white transition-colors">
                  Harshaluckytours4565@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2025 Harsha Lucky Tours. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/sitemap" className="text-gray-400 hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;