
import React, { useState, useEffect } from 'react';
import { X, Banknote, CheckCircle, Loader2, MapPin, Tag, ArrowRight, Bike, Calendar } from 'lucide-react';
import { CartItem, Order } from '../types';
import { getAddressFromCoordinates } from '../services/geminiService';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  total: number;
  onOrderSuccess: (order: Order) => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, cart, total: initialTotal, onOrderSuccess }) => {
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [loading, setLoading] = useState(false);
  
  // Form States
  const [address, setAddress] = useState('');
  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const [phone, setPhone] = useState('');
  
  // Scheduling
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledTime, setScheduledTime] = useState('');
  
  // Coupon State
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const finalTotal = Math.max(0, initialTotal - discount);

  // Auto-detect location when modal opens
  useEffect(() => {
    if (isOpen && step === 'details') {
      detectLocation();
      // Reset states
      setCouponCode('');
      setDiscount(0);
      setCouponMessage(null);
      setIsScheduled(false);
      setScheduledTime('');
    }
  }, [isOpen, step]);

  const detectLocation = () => {
    if (!navigator.geolocation) return;
    
    setIsAddressLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const addressText = await getAddressFromCoordinates(latitude, longitude);
          setAddress(addressText);
        } catch (error) {
          console.error("Failed to detect location address", error);
        } finally {
          setIsAddressLoading(false);
        }
      },
      (error) => {
        console.error("Geolocation error", error);
        setIsAddressLoading(false);
      }
    );
  };

  const handleApplyCoupon = () => {
    if (!couponCode) return;
    
    if (couponCode.toUpperCase() === 'WELCOME50') {
      const discountAmount = Math.ceil(initialTotal * 0.5); // 50% off
      setDiscount(discountAmount);
      setCouponMessage({ type: 'success', text: 'Success! 50% OFF applied.' });
    } else {
      setDiscount(0);
      setCouponMessage({ type: 'error', text: 'Invalid coupon code' });
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      items: [...cart],
      total: finalTotal,
      status: 'placed',
      restaurantName: cart[0]?.restaurantName || "Unknown Restaurant",
      restaurantId: cart[0]?.restaurantId || "",
      restaurantImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000", // Fallback or fetch real image
      date: new Date().toISOString(),
      scheduledTime: isScheduled ? scheduledTime : undefined,
    };

    // Simulate Order Processing
    setTimeout(() => {
      setLoading(false);
      setStep('success');
      // Auto close after delay
      setTimeout(() => {
        onOrderSuccess(newOrder);
        setStep('details');
        setAddress('');
        setPhone('');
      }, 5000);
    }, 2000);
  };

  if (!isOpen) return null;

  if (step === 'success') {
    return (
      <div className="fixed inset-0 z-[60] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-gray-900 bg-opacity-90 transition-opacity backdrop-blur-sm" onClick={onClose}></div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          
          <div className="relative inline-block align-bottom bg-white rounded-3xl p-10 text-center shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full overflow-hidden border border-gray-100">
            
            {/* Success Animation */}
            <div className="relative mx-auto h-32 w-32 mb-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75"></div>
              <div className="relative z-10 bg-gradient-to-tr from-green-500 to-green-400 p-6 rounded-full shadow-lg flex items-center justify-center">
                 <Bike size={48} className="text-white animate-pulse" />
              </div>
            </div>

            <h3 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">Order is booked!</h3>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed font-medium">
              You will get it in <br/>
              <span className="text-orange-600 font-bold text-2xl">{isScheduled ? 'Scheduled Time' : '20 to 30 min'}</span>
            </p>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-6">
              <div className="flex justify-between items-center text-sm mb-1">
                 <span className="text-gray-500">Amount to Pay</span>
                 <span className="font-bold text-gray-900 text-lg">₹{finalTotal}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-400">
                 <span>Payment Method</span>
                 <span>Cash on Delivery</span>
              </div>
            </div>

            <div className="text-xs text-gray-400 font-medium tracking-wide uppercase animate-pulse">
              Redirecting to tracking...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity backdrop-blur-sm" onClick={onClose}></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        <div className="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
              <h3 className="text-xl leading-6 font-bold text-gray-900">Secure Checkout</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500 transition-colors bg-gray-100 p-1.5 rounded-full">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handlePlaceOrder}>
              {/* Delivery Details */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Delivery Details</h4>
                <div className="space-y-4">
                  
                  {/* Phone Input */}
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="Mobile Number"
                      className="block w-full border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm p-3 bg-gray-50 focus:bg-white transition-all"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  {/* Address Input */}
                  <div className="relative">
                    <div className="absolute top-3 right-3 z-10">
                       {isAddressLoading ? (
                         <div className="flex items-center text-orange-600 text-xs gap-1 bg-orange-50 px-2 py-1 rounded-full animate-pulse border border-orange-100">
                           <Loader2 size={12} className="animate-spin" /> Detecting...
                         </div>
                       ) : (
                         <button 
                           type="button" 
                           onClick={detectLocation}
                           className="flex items-center text-gray-500 hover:text-orange-600 text-xs gap-1 bg-white border border-gray-200 hover:bg-orange-50 px-2 py-1 rounded-full transition-colors shadow-sm"
                         >
                           <MapPin size={12} /> Detect
                         </button>
                       )}
                    </div>
                    <textarea
                      required
                      rows={3}
                      placeholder="Full Address (House No, Street, Landmark)"
                      className={`block w-full border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm p-3 transition-colors ${isAddressLoading ? 'bg-gray-50 text-gray-400' : 'bg-gray-50 focus:bg-white'}`}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      disabled={isAddressLoading}
                    ></textarea>
                  </div>

                  {/* Scheduling Option */}
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                       <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                         <input 
                           type="checkbox" 
                           checked={isScheduled} 
                           onChange={(e) => setIsScheduled(e.target.checked)}
                           className="rounded text-orange-600 focus:ring-orange-500"
                         />
                         <Calendar size={16} /> Schedule Order
                       </label>
                    </div>
                    {isScheduled && (
                      <div className="mt-2 animate-in slide-in-from-top-2">
                         <input 
                           type="datetime-local" 
                           className="block w-full border border-gray-300 rounded-md shadow-sm text-sm p-2"
                           value={scheduledTime}
                           onChange={(e) => setScheduledTime(e.target.value)}
                           required={isScheduled}
                         />
                         <p className="text-xs text-gray-500 mt-1">Select a time at least 45 mins from now</p>
                      </div>
                    )}
                  </div>

                </div>
              </div>

              {/* Coupon Section */}
              <div className="mb-6">
                 <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Offers & Benefits</h4>
                 <div className="flex gap-2">
                   <div className="relative flex-1">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Tag size={16} className="text-gray-400" />
                      </div>
                     <input 
                      type="text"
                      placeholder="Enter Code (WELCOME50)"
                      className="block w-full pl-10 border border-gray-200 rounded-lg text-sm p-2.5 bg-gray-50 focus:bg-white focus:ring-1 focus:ring-orange-500 uppercase"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                     />
                   </div>
                   <button 
                    type="button"
                    onClick={handleApplyCoupon}
                    className="bg-gray-900 text-white px-4 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors"
                   >
                     APPLY
                   </button>
                 </div>
                 {couponMessage && (
                   <div className={`mt-2 text-xs font-bold ${couponMessage.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                     {couponMessage.text}
                   </div>
                 )}
              </div>

              {/* Payment Summary */}
              <div className="mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex justify-between items-center mb-2 text-sm text-gray-600">
                   <span>Item Total</span>
                   <span>₹{initialTotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between items-center mb-2 text-sm text-green-600 font-medium">
                     <span>Discount (WELCOME50)</span>
                     <span>- ₹{discount}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 my-2 pt-2 flex justify-between items-center">
                   <span className="font-bold text-gray-900">To Pay</span>
                   <span className="font-bold text-gray-900 text-lg">₹{finalTotal}</span>
                </div>
                
                <div className="mt-3 flex items-center gap-3 p-3 border border-orange-200 bg-white rounded-lg">
                  <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 flex-shrink-0">
                    <Banknote size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">Cash on Delivery</p>
                    <p className="text-[10px] text-gray-500">Pay accurately to the driver</p>
                  </div>
                  <CheckCircle size={16} className="text-orange-600 ml-auto" />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || isAddressLoading}
                className="w-full flex justify-center items-center gap-2 rounded-xl border border-transparent shadow-lg px-4 py-3.5 bg-orange-600 text-base font-bold text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5"
              >
                {loading && <Loader2 className="animate-spin" size={20} />}
                {loading ? 'Booking Order...' : (
                  <>
                    <span>Confirm Order</span>
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
