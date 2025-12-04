
import React, { useState } from 'react';
import { User, Heart, ShoppingBag, MapPin, LogOut, ChevronRight } from 'lucide-react';
import { Order, Restaurant } from '../types';
import OrderTracking from './OrderTracking';

interface UserProfileProps {
  user: { name: string; email: string };
  orders: Order[];
  favorites: string[];
  restaurants: Restaurant[]; // To show favorite details
  onLogout: () => void;
  onBack: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, orders, favorites, restaurants, onLogout, onBack }) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'favorites' | 'addresses'>('orders');

  const favoriteRestaurants = restaurants.filter(r => favorites.includes(r.id));

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Profile Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
         <div className="max-w-4xl mx-auto px-4 py-8">
            <button onClick={onBack} className="text-sm text-gray-500 hover:text-orange-600 mb-6 flex items-center gap-1 font-medium">
              ← Back to Home
            </button>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-4xl font-bold border-4 border-white shadow-lg">
                {user.name.charAt(0)}
              </div>
              <div className="text-center md:text-left flex-1">
                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-500">{user.email}</p>
                <div className="flex gap-4 mt-4 justify-center md:justify-start">
                   <div className="text-center px-4 py-2 bg-gray-50 rounded-lg">
                      <div className="text-xl font-bold text-gray-900">{orders.length}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">Orders</div>
                   </div>
                   <div className="text-center px-4 py-2 bg-gray-50 rounded-lg">
                      <div className="text-xl font-bold text-gray-900">{favorites.length}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">Favorites</div>
                   </div>
                </div>
              </div>
              <button 
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
         </div>
         
         {/* Navigation Tabs */}
         <div className="max-w-4xl mx-auto px-4 mt-4">
           <div className="flex gap-8 border-b border-gray-200">
             <button 
               onClick={() => setActiveTab('orders')}
               className={`pb-4 px-2 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'orders' ? 'border-orange-600 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
             >
               <ShoppingBag size={18} /> Orders
             </button>
             <button 
               onClick={() => setActiveTab('favorites')}
               className={`pb-4 px-2 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'favorites' ? 'border-orange-600 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
             >
               <Heart size={18} /> Favorites
             </button>
             <button 
               onClick={() => setActiveTab('addresses')}
               className={`pb-4 px-2 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'addresses' ? 'border-orange-600 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
             >
               <MapPin size={18} /> Addresses
             </button>
           </div>
         </div>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-bold text-gray-900">No orders yet</h3>
                <p className="text-gray-500">Go ahead and explore delicious food!</p>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50">
                    <div>
                      <span className="font-bold text-gray-900">{order.restaurantName}</span>
                      <p className="text-xs text-gray-500">{new Date(order.date).toLocaleString()}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase">
                      {order.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="p-4">
                     <div className="space-y-2 mb-4">
                       {order.items.map((item, idx) => (
                         <div key={idx} className="flex justify-between text-sm text-gray-600">
                           <span>{item.quantity} x {item.name}</span>
                           <span>₹{item.price * item.quantity}</span>
                         </div>
                       ))}
                     </div>
                     <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        <span className="font-bold text-gray-900">Total Paid: ₹{order.total}</span>
                        <button className="text-orange-600 text-sm font-bold flex items-center gap-1 hover:text-orange-700">
                          Reorder <ChevronRight size={16} />
                        </button>
                     </div>
                     
                     {/* If order is recent, show tracking */}
                     {order.status !== 'delivered' && (
                       <div className="mt-4 pt-4 border-t border-gray-100">
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Live Tracking</h4>
                          <OrderTracking order={order} />
                       </div>
                     )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* FAVORITES TAB */}
        {activeTab === 'favorites' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {favoriteRestaurants.length === 0 ? (
               <div className="col-span-full text-center py-12 bg-white rounded-xl shadow-sm">
                 <Heart size={48} className="mx-auto text-gray-300 mb-4" />
                 <h3 className="text-lg font-bold text-gray-900">No favorites yet</h3>
                 <p className="text-gray-500">Heart your favorite spots to see them here.</p>
               </div>
            ) : (
               favoriteRestaurants.map(restaurant => (
                 <div key={restaurant.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex">
                    <img src={restaurant.image} className="w-32 h-32 object-cover" alt={restaurant.name} />
                    <div className="p-4 flex-1 flex flex-col justify-center">
                       <h3 className="font-bold text-gray-900">{restaurant.name}</h3>
                       <p className="text-sm text-gray-500 mb-2">{restaurant.cuisine}</p>
                       <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 self-start px-2 py-1 rounded">
                          {restaurant.rating} ★
                       </div>
                    </div>
                 </div>
               ))
            )}
          </div>
        )}

        {/* ADDRESSES TAB */}
        {activeTab === 'addresses' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
             <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
             <h3 className="text-lg font-bold text-gray-900">Saved Addresses</h3>
             <p className="text-gray-500 mb-6">Manage your delivery locations.</p>
             <button className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 font-bold hover:border-orange-500 hover:text-orange-600 transition-colors">
               + Add New Address
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
