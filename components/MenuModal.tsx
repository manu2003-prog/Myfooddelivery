
import React, { useState } from 'react';
import { X, Plus, Clock, Star, MapPin, MessageSquarePlus } from 'lucide-react';
import { Restaurant, MenuItem } from '../types';

interface MenuModalProps {
  restaurant: Restaurant | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, restaurant: Restaurant, note?: string) => void;
}

const MenuModal: React.FC<MenuModalProps> = ({ restaurant, onClose, onAddToCart }) => {
  // Store notes per item ID
  const [notes, setNotes] = useState<Record<string, string>>({});

  if (!restaurant) return null;

  // Group items by category
  const categories = restaurant.menu.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const handleNoteChange = (id: string, value: string) => {
    setNotes(prev => ({ ...prev, [id]: value }));
  };

  const handleAdd = (item: MenuItem) => {
    onAddToCart(item, restaurant, notes[item.id]);
    // Optionally clear note after adding
    setNotes(prev => ({ ...prev, [item.id]: '' }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Background backdrop */}
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm" aria-hidden="true" onClick={onClose}></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        {/* Modal Panel */}
        <div className="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full animate-in zoom-in-95 duration-200">
          
          {/* Header Image */}
          <div className="relative h-56 sm:h-72">
             <img 
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white transition-colors backdrop-blur-md z-10"
            >
              <X size={24} />
            </button>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 text-white w-full">
              <h2 className="text-4xl font-bold mb-2 tracking-tight">{restaurant.name}</h2>
              <div className="flex flex-wrap items-center gap-6 text-sm font-medium opacity-90">
                <span className="bg-green-600 px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  {restaurant.rating} <Star size={14} fill="currentColor" />
                </span>
                <span className="flex items-center gap-2"><Clock size={16} className="text-orange-400" /> {restaurant.deliveryTime}</span>
                <span className="flex items-center gap-2"><MapPin size={16} className="text-orange-400" /> {restaurant.address}</span>
              </div>
              <p className="mt-3 text-base text-gray-200 font-light">{restaurant.cuisine}</p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="bg-gray-50 h-[60vh] overflow-y-auto custom-scrollbar">
            {Object.entries(categories).map(([category, items]) => (
              <div key={category} className="mb-2 bg-white pb-4">
                 <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-100 shadow-sm flex items-center justify-between">
                   <h3 className="text-xl font-bold text-gray-800">{category}</h3>
                   <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{items.length} Items</span>
                 </div>
                 
                 <div className="px-6 py-2 space-y-6 mt-4">
                   {items.map((item) => (
                    <div key={item.id} className="group relative flex justify-between gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`w-4 h-4 flex items-center justify-center border ${item.isVeg ? 'border-green-600' : 'border-red-600'} rounded-sm p-[2px]`}>
                            <div className={`w-full h-full rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
                          </span>
                          {/* If item has originalPrice, it's on offer */}
                          {item.originalPrice && (
                            <span className="text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-blue-500 px-2 py-0.5 rounded-full shadow-sm">
                              50% OFF
                            </span>
                          )}
                          {item.id.includes('best') && <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full">Bestseller</span>}
                        </div>
                        <h4 className="font-bold text-lg text-gray-800 group-hover:text-orange-600 transition-colors">{item.name}</h4>
                        
                        {/* Price Display */}
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-semibold text-gray-900 text-lg">₹{item.price}</span>
                          {item.originalPrice && (
                            <span className="text-sm text-gray-400 line-through decoration-gray-400 decoration-2">₹{item.originalPrice}</span>
                          )}
                        </div>

                        <p className="text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed">{item.description}</p>
                        
                        {/* Customization Input */}
                        <div className="mt-4 flex items-center gap-2">
                          <MessageSquarePlus size={14} className="text-gray-400" />
                          <input 
                            type="text"
                            placeholder="Add cooking note (e.g. less spicy, extra cheese)..."
                            className="text-xs border-b border-gray-300 focus:border-orange-500 focus:outline-none bg-transparent w-full py-1 text-gray-600"
                            value={notes[item.id] || ''}
                            onChange={(e) => handleNoteChange(item.id, e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="relative w-32 h-28 flex-shrink-0">
                        {/* Dynamic Food Image based on Item Name */}
                        <img 
                          src={`https://image.pollinations.ai/prompt/${encodeURIComponent(item.name)}?width=200&height=200&nologo=true`}
                          className="w-full h-full object-cover rounded-xl shadow-md"
                          alt={item.name}
                          loading="lazy"
                        />
                        <button 
                          onClick={() => handleAdd(item)}
                          className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white text-green-600 border border-gray-200 shadow-lg font-bold text-sm px-6 py-2 rounded-lg hover:bg-green-50 uppercase flex items-center gap-1 transition-all active:scale-95 hover:-translate-y-0.5"
                        >
                          ADD <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                 </div>
              </div>
            ))}
            <div className="h-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
