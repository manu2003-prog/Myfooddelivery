
import React from 'react';
import { Star, Clock, Heart } from 'lucide-react';
import { Restaurant } from '../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: (restaurant: Restaurant) => void;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent, restaurantId: string) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onClick, isFavorite, onToggleFavorite }) => {
  return (
    <div 
      className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl border border-gray-100 overflow-hidden cursor-pointer transition-all duration-300 transform hover:-translate-y-2 relative"
      onClick={() => onClick(restaurant)}
    >
      <div className="relative h-52 overflow-hidden">
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
        
        {/* Discount Badge - Only if hasOffer is true */}
        {restaurant.hasOffer && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-3 py-1 rounded-md text-xs font-bold shadow-md uppercase tracking-wider animate-pulse">
             50% OFF
          </div>
        )}

        <button 
          onClick={(e) => onToggleFavorite(e, restaurant.id)}
          className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-white transition-colors z-10"
        >
          <Heart size={18} className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"} />
        </button>

        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-gray-800 shadow-sm flex items-center gap-1.5">
          <Clock size={12} className="text-orange-600" />
          {restaurant.deliveryTime}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-1">
            {restaurant.name}
          </h3>
          <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-0.5 rounded-md text-xs font-bold shadow-sm">
            {restaurant.rating} <Star size={10} fill="currentColor" />
          </div>
        </div>
        
        <p className="text-sm text-gray-500 mb-4 line-clamp-1 font-medium">{restaurant.cuisine}</p>
        
        <div className="flex items-center text-xs text-gray-400 gap-2 mb-4">
          <span className="truncate max-w-[200px]">{restaurant.address}</span>
        </div>

        <div className="border-t border-gray-100 pt-3 flex items-center justify-between text-xs font-medium">
           <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded">Free delivery</span>
           <span className="text-gray-400">Min order ₹100</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
