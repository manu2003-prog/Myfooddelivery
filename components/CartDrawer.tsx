import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cart, onUpdateQuantity, onCheckout }) => {
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = 30;
  const platformFee = 5;
  const finalTotal = total + (total > 0 ? deliveryFee + platformFee : 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          onClick={onClose}
          aria-hidden="true"
        ></div>
        
        <div className="fixed inset-y-0 right-0 max-w-full flex">
          <div className="w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl">
              
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-6 bg-white border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <ShoppingBag className="text-orange-600" /> Your Cart
                </h2>
                <button 
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-100"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 bg-gray-50">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <img src="https://picsum.photos/seed/emptycart/200/200" className="w-48 h-48 rounded-full opacity-50 grayscale" alt="Empty Cart" />
                    <h3 className="text-xl font-medium text-gray-900">Your cart is empty</h3>
                    <p className="text-gray-500 max-w-xs">Looks like you haven't added anything to your cart yet. Go ahead and explore top restaurants in Venkatagiri.</p>
                    <button 
                      onClick={onClose}
                      className="mt-4 bg-orange-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-orange-700 font-medium"
                    >
                      Browse Restaurants
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Items List */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                       {cart.map((item) => (
                        <div key={`${item.id}-${item.restaurantId}`} className="p-4 border-b border-gray-100 last:border-0 flex items-center gap-4">
                           <div className={`w-3 h-3 rounded-full flex-shrink-0 ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
                           <div className="flex-1">
                             <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                             <p className="text-xs text-gray-500">₹{item.price}</p>
                           </div>
                           <div className="flex items-center border border-gray-200 rounded-lg">
                             <button 
                               onClick={() => onUpdateQuantity(item.id, -1)}
                               className="p-1 px-2 hover:bg-gray-100 text-gray-600"
                             >
                               <Minus size={14} />
                             </button>
                             <span className="text-sm font-semibold w-6 text-center text-green-700">{item.quantity}</span>
                             <button 
                               onClick={() => onUpdateQuantity(item.id, 1)}
                               className="p-1 px-2 hover:bg-gray-100 text-gray-600"
                             >
                               <Plus size={14} />
                             </button>
                           </div>
                           <div className="text-sm font-medium text-gray-900 w-12 text-right">
                             ₹{item.price * item.quantity}
                           </div>
                        </div>
                       ))}
                    </div>

                    {/* Bill Details */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-2 text-sm">
                      <h3 className="font-bold text-gray-900 mb-3">Bill Details</h3>
                      <div className="flex justify-between text-gray-600">
                        <span>Item Total</span>
                        <span>₹{total}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Delivery Fee</span>
                        <span>₹{deliveryFee}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Platform Fee</span>
                        <span>₹{platformFee}</span>
                      </div>
                      <div className="border-t border-gray-100 my-2 pt-2 flex justify-between font-bold text-gray-900 text-base">
                        <span>To Pay</span>
                        <span>₹{finalTotal}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              {cart.length > 0 && (
                <div className="border-t border-gray-100 px-4 py-6 sm:px-6 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                  <div className="flex justify-between items-center mb-4">
                     <div className="text-xs text-gray-500">Total</div>
                     <div className="text-xl font-bold text-gray-900">₹{finalTotal}</div>
                  </div>
                  <button 
                    onClick={onCheckout}
                    className="w-full bg-green-600 border border-transparent rounded-lg shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex justify-between items-center"
                  >
                    <span>Proceed to Pay</span>
                    <span className="bg-green-800 bg-opacity-30 px-2 py-0.5 rounded text-sm">₹{finalTotal}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;