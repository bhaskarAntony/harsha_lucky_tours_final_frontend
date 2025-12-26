import React from 'react';
import { Link } from 'react-router-dom';
// import { Helmet } from 'react-helmet-async';
import { ArrowRight, Gift, Users, Clock, Star, Shield, MapPin, Phone } from 'lucide-react';
import { memberPackages } from '../../data/packages';
import { nonMemberPackages } from '../../data/nonMembers';
import Pack from './Pack';
import { giftCatalogue } from '../../data/gifts';

const Home = () => {
  const featuredMemberPackages = memberPackages.slice(0, 3);
  const featuredNonMemberPackages = nonMemberPackages.slice(0, 3);

  return (
    <>
      {/* <Helmet>
        <title>Harsha Lucky Tours | Bangalore Travel Lucky Draw | Karnataka Tours</title>
        <meta name="description" content="Join Harsha Lucky Tours for exciting travel lucky draws! Pay monthly installments and win amazing travel packages across India and abroad. Based in Bangalore, Karnataka." />
        <meta name="keywords" content="Bangalore travel lucky draw, Karnataka tours, Harsha Lucky Tours, travel packages, lucky draw tours, monthly installment travel, Bangalore tours" />
      </Helmet> */}

      {/* Hero Section */}
   <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  <div className="absolute inset-0">
    <img 
      src="https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080" 
      alt="Travel destination" 
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
  </div>
  
  <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
    <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
      Travel Lucky Draw
      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
        Dreams Come True
      </span>
    </h1>
    
    {/* PRICE HIGHLIGHT ADDED */}
    <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl px-8 py-4 mb-8 inline-block shadow-lg">
      <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">Just ₹1000/month</div>
      <p className="text-lg md:text-xl text-white font-medium">Enter exclusive lucky draws</p>
    </div>
    
    <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
      Pay monthly installments, enter lucky draws, and win incredible travel experiences across India and abroad!
    </p>
    
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <Link 
        to="/packages/member" 
        className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center"
      >
        Explore Packages
        <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
      <Link 
        to="/about" 
        className="border-2 border-white hover:bg-white hover:text-gray-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
      >
        Learn More
      </Link>
    </div>
  </div>
</section>


      {/* How Lucky Draw Works */}
    <section className="py-20 bg-gradient-to-b from-white via-blue-50/30 to-teal-50/30">
  <div className="container mx-auto px-4">
    {/* SECTION HEADER */}
    <div className="text-center mb-20">
      <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-full mb-6">
        <span className="text-sm mr-2">🎟️</span>
        <span className="font-medium text-sm">Simple • Transparent • Rewarding</span>
      </div>
      <h2 className="text-4xl md:text-5xl font-normal text-gray-800 mb-4">
        How Our Lucky Draw Works
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Join our 3-step journey from registration to your free dream vacation.
      </p>
    </div>

    {/* STEPS GRID */}
    <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
      {/* STEP 1 */}
      <div className="text-center group">
        <div className="bg-gradient-to-br from-blue-100 to-teal-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
          <Users className="h-12 w-12 text-blue-600" />
        </div>
        <h3 className="text-xl font-normal text-gray-800 mb-3">
          Step 1 – Become a Member
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">
          Select your desired travel package and register online. Membership ensures access
          to our monthly lucky draws and guaranteed rewards.
        </p>
      </div>

      {/* STEP 2 */}
      <div className="text-center group">
        <div className="bg-gradient-to-br from-teal-100 to-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
          <Clock className="h-12 w-12 text-teal-600" />
        </div>
        <h3 className="text-xl font-normal text-gray-800 mb-3">
          Step 2 – Pay Monthly Installments
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">
          Pay just ₹1000 per month—every payment secures your entry for that month’s 
          lucky draw and brings you closer to an assured reward.
        </p>
      </div>

      {/* STEP 3 */}
      <div className="text-center group">
        <div className="bg-gradient-to-br from-green-100 to-yellow-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
          <Gift className="h-12 w-12 text-emerald-600" />
        </div>
        <h3 className="text-xl font-normal text-gray-800 mb-3">
          Step 3 – Win or Earn a Reward
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">
          Winners are chosen transparently every month through a live draw. 
          Didn’t win? Don’t worry—complete your term to receive 
          <span className="text-emerald-700 font-medium"> guaranteed trips or gifts.</span>
        </p>
      </div>
    </div>

    {/* END MESSAGE */}
    <div className="text-center mt-20 max-w-3xl mx-auto">
      <p className="text-base text-gray-700 leading-relaxed mb-6">
        Every participant is a winner at Harsha Lucky Tours – either through an unforgettable
        trip or an assured home gift. No luck wasted, only rewards gained.
      </p>
      <Link 
        to="/register"
        className="inline-flex items-center bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-medium text-sm px-8 py-3 rounded-full transition-all duration-300"
      >
        Register Now
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  </div>
</section>

      {/* About Us Section */}
   <section className="py-20 bg-gradient-to-br from-blue-50 via-teal-50 to-green-50">
  <div className="container mx-auto px-4">
    <div className="grid lg:grid-cols-2 gap-14 items-center">
      {/* LEFT CONTENT */}
      <div>
        <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-teal-600 text-white px-5 py-2 rounded-full mb-6">
          <span className="text-sm mr-2">🌍</span>
          <span className="text-sm font-medium">About Harsha Lucky Tours</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-normal text-gray-800 mb-6 leading-tight">
          Turning Your Travel Dreams Into Reality
        </h2>
        <p className="text-base text-gray-600 mb-5 leading-relaxed">
          Welcome to <span className="text-blue-600 font-medium">Harsha Lucky Tours</span>, where
          wanderlust meets opportunity! ✈️ We are India’s first-of-its-kind{" "}
          <span className="text-teal-600 font-medium">draw-based travel experience</span> — making
          luxury vacations possible for everyone.
        </p>
        <p className="text-base text-gray-600 mb-5 leading-relaxed">
          Every month, members participate in a transparent lucky draw that rewards winners
          with fully sponsored holidays across India and abroad. Even those who don’t win
          receive guaranteed rewards, including exciting travel plans or premium home gifts.
        </p>
        <p className="text-base text-gray-600 mb-8 leading-relaxed">
          We believe travel should be joyful, accessible, and unforgettable. That’s why our
          mission is simple — <span className="text-teal-700 font-medium">
          No one leaves empty-handed.</span> Every member’s loyalty turns into a reward.
        </p>

        <Link
          to="/about"
          className="inline-flex items-center bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-7 py-3 rounded-lg text-sm font-medium transition-all duration-300"
        >
          Learn More
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>

      {/* RIGHT STATS GRID */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white border border-gray-100 p-6 rounded-xl hover:bg-blue-50/40 transition-all duration-200">
          <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-lg text-gray-800 mb-1">500+ Active Members</h3>
          <p className="text-sm text-gray-600 leading-snug">
            Thriving community of travelers and dreamers who joined our draw.
          </p>
        </div>

        <div className="bg-white border border-gray-100 p-6 rounded-xl hover:bg-teal-50/40 transition-all duration-200">
          <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
            <MapPin className="h-6 w-6 text-teal-600" />
          </div>
          <h3 className="text-lg text-gray-800 mb-1">50+ Dream Destinations</h3>
          <p className="text-sm text-gray-600 leading-snug">
            Breathtaking places across India & international getaways.
          </p>
        </div>

        <div className="bg-white border border-gray-100 p-6 rounded-xl hover:bg-green-50/40 transition-all duration-200">
          <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
            <Gift className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg text-gray-800 mb-1">100+ Lucky Winners</h3>
          <p className="text-sm text-gray-600 leading-snug">
            Over a hundred winners have already lived their dream vacations.
          </p>
        </div>

        <div className="bg-white border border-gray-100 p-6 rounded-xl hover:bg-yellow-50/40 transition-all duration-200">
          <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
            <Star className="h-6 w-6 text-yellow-600" />
          </div>
          <h3 className="text-lg text-gray-800 mb-1">4.9 / 5 Satisfaction</h3>
          <p className="text-sm text-gray-600 leading-snug">
            Trusted by our members for transparency, support, and excitement!
          </p>
        </div>
      </div>
    </div>

    {/* CTA FOOTER */}
    <div className="text-center mt-20">
      <p className="text-base text-gray-700 mb-5 leading-relaxed">
        Join us today and make every month an opportunity for adventure. 
        Because at <span className="font-medium text-blue-600">Harsha Lucky Tours</span>, 
        <span className="text-teal-700 font-medium"> everyone wins!</span>
      </p>
      <Link
        to="/register"
        className="inline-flex items-center bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-medium text-sm px-8 py-3 rounded-full transition-all duration-300"
      >
        Become a Member
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  </div>
</section>


      {/* Featured Packages */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
         <div className="text-center mb-20">
    <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-full mb-6 mx-auto max-w-max">
      <span className="text-sm mr-2">🎯</span>
      <span className="font-medium">Dream Scheme by Harsha Lucky Tours</span>
    </div>
    <h2 className="text-4xl md:text-5xl font-normal text-gray-800 mb-4 leading-tight">
      Win Dream Vacations or Premium Gifts
    </h2>
    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
      Just ₹1000/month unlocks luxury tours for your family OR valuable home gifts. 
      Every member wins - either through lucky draw or our guaranteed reward system!
    </p>
  </div>

  {/* MEMBER PACKAGES */}
  <div className="mb-20">
    <div className="flex justify-between items-center mb-12">
      <div>
        <h3 className="text-2xl text-gray-800 font-normal mb-1">Live Lucky Draw Packages</h3>
        <p className="text-sm text-gray-600">Join now and participate in monthly draws</p>
      </div>
      <Link 
        to="/member/packages" 
        className="text-blue-600 hover:text-blue-700 text-sm flex items-center font-medium"
      >
        View All Packages
        <ArrowRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
    <Pack/>
  </div>

          {/* Non-Member Packages */}
        <div>
         <div className="max-w-6xl mx-auto px-4 py-12">
  {/* Header */}
  <div className="text-center mb-16">
    <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
      Guaranteed Rewards for Loyal Members
    </h2>
    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
      Complete your Dream Scheme without winning? Choose any premium tour OR home gift.
    </p>
  </div>

  {/* Tour Packages */}
  <section className="mb-16">
    <div className="flex justify-between items-center mb-8">
      <h3 className="text-2xl font-medium text-gray-900">Premium Tour Options</h3>
      <Link to="/tours" className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
        View All <ArrowRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
    
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {nonMemberPackages.map((pkg) => (
        <div key={pkg.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-300">
          <div className="h-48 w-full rounded-xl overflow-hidden mb-6">
            <img 
              src={pkg.images[0]} 
              alt={pkg.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          <h4 className="text-xl font-medium text-gray-900 mb-3 line-clamp-2">{pkg.name}</h4>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{pkg.description}</p>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              {pkg.duration}
            </div>
            <div className="flex flex-wrap gap-2">
              {pkg.inclusions.slice(0,3).map((item, i) => (
                <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                  {item}
                </span>
              ))}
            </div>
          </div>
          
          {/* <button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white text-sm font-medium py-3 px-4 rounded-xl transition-all duration-300">
            Select Tour
          </button> */}
        </div>
      ))}
    </div>
  </section>

  {/* Gift Catalogue */}
  <section>
    <div className="flex justify-between items-center mb-8">
      <h3 className="text-2xl font-medium text-gray-900">Premium Home Gifts</h3>
      <span className="text-sm text-gray-500">12 options - doorstep delivery</span>
    </div>
    
    <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {giftCatalogue.map((gift) => (
        <div key={gift.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300 group">
          <div className="h-32 w-full rounded-lg overflow-hidden mb-4 group-hover:scale-105 transition-transform duration-300">
            <img 
              src={gift.image} 
              alt={gift.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h5 className="font-medium text-sm text-gray-900 mb-2 line-clamp-1">{gift.name}</h5>
          <p className="text-xs text-gray-600 mb-4 line-clamp-1">{gift.benefit}</p>
          {/* <button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white text-xs font-medium py-2 px-3 rounded-lg transition-all duration-300">
            Choose Gift
          </button> */}
        </div>
      ))}
    </div>
  </section>

</div>




</div>

        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Why Choose Harsha Lucky Tours
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make dream vacations accessible and exciting for everyone
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Transparent Process</h3>
              <p className="text-gray-600 leading-relaxed">
                Our lucky draw process is completely transparent with live draws and verified results. No hidden charges or conditions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Affordable Monthly Plans</h3>
              <p className="text-gray-600 leading-relaxed">
                Pay in small monthly installments instead of huge upfront costs. Make your dream vacation financially manageable.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Quality Packages</h3>
              <p className="text-gray-600 leading-relaxed">
                Carefully curated travel packages with premium accommodations, guided tours, and all major inclusions covered.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Expert Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Dedicated customer support team to assist you throughout your journey from registration to your travel experience.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Multiple Destinations</h3>
              <p className="text-gray-600 leading-relaxed">
                Wide variety of destinations across India and international locations to suit every traveler's preferences.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gift className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Surprise & Excitement</h3>
              <p className="text-gray-600 leading-relaxed">
                Experience the thrill of winning and the joy of unexpected travel adventures. Every month brings new possibilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of happy travelers who have made their dream vacations come true through our lucky draw system. 
            Your next adventure is just one registration away!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/contact" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center"
            >
              <Phone className="mr-2 h-5 w-5" />
              Contact Us Now
            </Link>
            <Link 
              to="/packages/member" 
              className="border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
            >
              View All Packages
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;