
import React, { useState, useEffect } from 'react';
import { ShoppingBag, MapPin, Search, User, LogOut, Loader2, Navigation, Bell } from 'lucide-react';
import { getAddressFromCoordinates } from '../services/geminiService';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onLogoutClick: () => void;
  onProfileClick: () => void;
  user: { name: string; email: string } | null;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart, onLogoutClick, onProfileClick, user }) => {
  const [location, setLocation] = useState<string>("Venkatagiri, 524132");
  const [isLocating, setIsLocating] = useState(false);

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        // Optionally update UI immediately with coords
        setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        
        // Fetch meaningful address using Gemini
        const address = await getAddressFromCoordinates(latitude, longitude);
        setLocation(address);
        setIsLocating(false);
      },
      (error) => {
        console.error("Error getting location", error);
        alert("Unable to retrieve your location. Please check permissions.");
        setIsLocating(false);
      }
    );
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Location */}
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
              <span className="bg-orange-600 text-white p-2 rounded-lg">
                <ShoppingBag size={20} fill="currentColor" />
              </span>
              <h1 className="text-xl font-bold tracking-tight text-gray-900 hidden sm:block">Venkatagiri<span className="text-orange-600">Eats</span></h1>
            </div>
            
            <button 
              onClick={handleDetectLocation}
              className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-full text-sm hover:bg-gray-100 transition-colors cursor-pointer group border border-gray-200 max-w-[150px] sm:max-w-xs"
              title="Detect my location"
            >
              {isLocating ? (
                <Loader2 size={16} className="text-orange-600 animate-spin" />
              ) : (
                <Navigation size={16} className="text-orange-600" />
              )}
              <div className="flex flex-col items-start overflow-hidden text-left">
                <span className="font-bold text-[10px] text-gray-500 uppercase tracking-wider">Delivery to</span>
                <span className="font-medium text-gray-900 truncate w-full leading-tight text-xs sm:text-sm">{location}</span>
              </div>
            </button>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input 
              type="text" 
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 sm:text-sm"
              placeholder="Search for restaurants..."
            />
          </div>

          {/* Cart & Profile */}
          <div className="flex items-center gap-3 sm:gap-4">
            {user && (
               <div className="flex items-center gap-2 sm:gap-3">
                 <button className="relative p-2 text-gray-400 hover:bg-gray-50 rounded-full hover:text-orange-600 transition-colors">
                   <Bell size={20} />
                   <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                 </button>

                 <button 
                   onClick={onProfileClick}
                   className="flex items-center gap-2 hover:bg-orange-50 p-1 pr-3 rounded-full transition-colors border border-transparent hover:border-orange-100"
                 >
                   <div className="h-8 w-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center border border-orange-200 font-bold">
                     {user.name.charAt(0)}
                   </div>
                   <div className="hidden sm:flex flex-col items-start">
                     <span className="text-xs text-gray-500 leading-none">Hello,</span>
                     <span className="text-sm font-bold text-gray-800 leading-none">{user.name.split(' ')[0]}</span>
                   </div>
                 </button>
               </div>
            )}

            <button 
              onClick={onOpenCart}
              className="relative p-2 text-gray-600 hover:bg-orange-50 rounded-full transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-orange-600 rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Search - Visible only on small screens */}
      <div className="lg:hidden px-4 pb-3">
        <div className="relative">
           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
          <input 
            type="text" 
            className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            placeholder="Search for food..."
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
