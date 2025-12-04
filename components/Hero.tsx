
import React from 'react';
import { ArrowRight, Tag } from 'lucide-react';

interface HeroProps {
  userName?: string;
}

const Hero: React.FC<HeroProps> = ({ userName }) => {
  const getGreeting = () => {
    if (!userName) return "Hungry?";
    return `Hi ${userName.split(' ')[0]}, what are you eating today?`;
  };

  return (
    <div className="relative bg-orange-600 overflow-hidden">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-20"
          src="https://images.unsplash.com/photo-1587574293340-e0011c4e8ecf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
          alt="Food background"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-700 to-orange-500 mix-blend-multiply" />
      </div>
      <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 lg:py-20">
        <div className="md:w-3/4 lg:w-2/3 text-white">
          <div className="flex flex-wrap gap-2 mb-6">
             <span className="inline-flex items-center gap-1 py-1.5 px-4 rounded-full bg-yellow-400 text-orange-900 text-base font-bold shadow-lg animate-bounce">
               <Tag size={16} /> CODE: WELCOME50
             </span>
             <span className="inline-block py-1.5 px-4 rounded-full bg-orange-800 bg-opacity-40 text-orange-100 text-sm font-semibold border border-orange-400 border-opacity-30">
              Venkatagiri's Fastest Delivery
             </span>
          </div>
          
          <h2 className="text-4xl tracking-tight font-extrabold sm:text-5xl lg:text-6xl mb-6 leading-tight">
            {getGreeting()}
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-orange-100 mb-8 font-medium">
            Get <span className="text-yellow-300 font-extrabold text-2xl">FLAT 50% OFF</span> on selected items! Check out the Family Packs at Supreme Restaurant.
          </p>
          <div className="flex gap-4">
            <button className="bg-white text-orange-600 hover:bg-gray-50 px-8 py-4 rounded-xl font-bold shadow-xl transition-all transform hover:-translate-y-1 hover:shadow-2xl flex items-center gap-2 text-lg">
              Order Now <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
