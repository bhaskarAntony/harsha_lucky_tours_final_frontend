import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { nonMemberPackages } from '../../data/nonMembers';
import { giftCatalogue } from '../../data/gifts';

const NonMemberPackages = () => {
  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* HEADER */}
      

        {/* TOURS GRID */}
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
       <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-xl mx-auto">
            <div className="flex items-center justify-center mb-3">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-sm font-medium text-gray-800">Your Reward is Guaranteed</span>
            </div>
            <p className="text-xs text-gray-600 text-center">
              Pick tour OR gift • No loss • Full value assured
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

        {/* GIFT OPTION */}
  
        {/* WHY CHOOSE */}
        <div className="text-center mb-16">
          <div className="bg-white border border-gray-200 rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-normal text-gray-800 mb-6">
              Your Loyalty is Rewarded
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-medium text-gray-800 mb-2 text-sm">No Risk</h4>
                <p className="text-xs text-gray-600">100% guaranteed reward</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-medium text-gray-800 mb-2 text-sm">Flexible Choice</h4>
                <p className="text-xs text-gray-600">Tour OR gift - you choose</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-teal-600" />
                </div>
                <h4 className="font-medium text-gray-800 mb-2 text-sm">Family Package</h4>
                <p className="text-xs text-gray-600">Complete 4-person vacation</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        {/* <div className="text-center">
          <Link 
            to="/claim-reward"
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-medium px-10 py-4 rounded-xl text-sm transition-all duration-300"
          >
            Claim Your Reward
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default NonMemberPackages;
