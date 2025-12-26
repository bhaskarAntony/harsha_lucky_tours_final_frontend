import React from 'react';
import { Shield, Lock, Eye, Users, FileText, Phone } from 'lucide-react';

const PrivacyPolicy = () => {
  const sections = [
    {
      title: 'Information We Collect',
      icon: FileText,
      content: [
        'Personal identification information (Name, email address, phone number, etc.)',
        'Demographic information such as postcode, preferences and interests',
        'Other information relevant to customer surveys and/or offers',
        'Payment and billing information for package bookings',
        'Travel preferences and requirements'
      ]
    },
    {
      title: 'How We Use This Information',
      icon: Users,
      content: [
        'Internal record keeping and customer management',
        'Improving our products and services based on customer feedback',
        'Sending promotional emails about new packages, special offers, and travel updates',
        'Processing bookings and managing membership programs',
        'Contacting customers for research purposes via email, phone, or mail'
      ]
    },
    {
      title: 'Data Security',
      icon: Lock,
      content: [
        'We implement appropriate security measures to protect against unauthorized access',
        'Physical, electronic and administrative safeguards to protect personal information',
        'Secure servers and encrypted data transmission for payment processing',
        'Limited access to personal information on a need-to-know basis',
        'Regular security audits and updates to our systems'
      ]
    },
    {
      title: 'Information Sharing',
      icon: Shield,
      content: [
        'We do not sell, distribute or lease personal information to third parties',
        'Information may be shared with travel partners for booking purposes only',
        'We may share information when required by law or legal process',
        'Service providers who assist in our operations under strict confidentiality agreements',
        'Emergency situations where sharing information may prevent harm'
      ]
    }
  ];

  return (
    <>
      {/* <Helmet>
        <title>Privacy Policy | Harsha Lucky Tours | Data Protection & Privacy</title>
        <meta name="description" content="Read Harsha Lucky Tours privacy policy. Learn how we collect, use, and protect your personal information and data." />
        <meta name="keywords" content="privacy policy, data protection, harsha lucky tours privacy, customer information security" />
      </Helmet> */}

      <div className="py-20 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-4 rounded-full shadow-lg">
                <Shield className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              At Harsha Lucky Tours, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This policy explains how we collect, use, and safeguard your data.
            </p>
            <div className="mt-8 bg-blue-50 rounded-xl p-6 max-w-3xl mx-auto">
              <p className="text-gray-700">
                <strong>Last Updated:</strong> January 2025<br />
                <strong>Effective Date:</strong> January 1, 2025
              </p>
            </div>
          </div>

          {/* Policy Sections */}
          <div className="space-y-12 mb-16">
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-blue-100 to-teal-100 p-3 rounded-lg mr-4">
                      <IconComponent className="h-8 w-8 text-blue-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800">{section.title}</h2>
                  </div>
                  <ul className="space-y-4">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-600 leading-relaxed">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Additional Sections */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Cookies Policy */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                  <Eye className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Cookie Policy</h3>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  We use cookies to enhance your browsing experience and provide personalized content. 
                  Cookies help us understand your preferences and improve our services.
                </p>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Types of Cookies We Use:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Essential cookies for website functionality</li>
                    <li>• Analytics cookies to understand user behavior</li>
                    <li>• Marketing cookies for personalized advertisements</li>
                    <li>• Preference cookies to remember your settings</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Your Rights */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Your Rights</h3>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  You have several rights regarding your personal information. 
                  We respect these rights and provide easy ways to exercise them.
                </p>
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">You Have the Right To:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Access your personal data we hold</li>
                    <li>• Correct any inaccurate information</li>
                    <li>• Request deletion of your data</li>
                    <li>• Object to data processing</li>
                    <li>• Data portability</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-12 text-white text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white bg-opacity-20 p-4 rounded-full">
                <Phone className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-4">Questions About Our Privacy Policy?</h3>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              If you have any questions about this privacy policy, our data practices, or want to exercise your rights, 
              please don't hesitate to contact us.
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white bg-opacity-10 rounded-xl p-6">
                <h4 className="font-bold mb-2">Email Us</h4>
                <p className="opacity-90">privacy@harshaluckytours.com</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-xl p-6">
                <h4 className="font-bold mb-2">Call Us</h4>
                <p className="opacity-90">+91 98765 43210</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-xl p-6">
                <h4 className="font-bold mb-2">Visit Us</h4>
                <p className="opacity-90">123, MG Road, Bangalore</p>
              </div>
            </div>
          </div>

          {/* Updates and Changes */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Policy Updates</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">How We Notify You</h4>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We may update this privacy policy from time to time. When we make significant changes, 
                  we will notify you through:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    <span>Email notifications to registered users</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    <span>Website banner announcements</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    <span>SMS notifications for important changes</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Your Consent</h4>
                <p className="text-gray-600 leading-relaxed">
                  By using our website and services, you consent to the collection and use of information 
                  as outlined in this privacy policy. Continued use of our services after policy updates 
                  constitutes acceptance of the new terms.
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Note:</strong> You can withdraw your consent at any time by contacting us directly. 
                    However, this may limit your ability to use certain services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;