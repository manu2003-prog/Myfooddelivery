
import React, { useEffect, useState } from 'react';
import { Check, ChefHat, Bike, Home, Clock } from 'lucide-react';
import { Order } from '../types';

interface OrderTrackingProps {
  order: Order;
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ order }) => {
  const [currentStep, setCurrentStep] = useState(0);

  // Simulate progress
  useEffect(() => {
    // Determine step based on status string (mock logic for demo)
    // In a real app, status comes from backend
    const statuses = ['placed', 'preparing', 'out_for_delivery', 'delivered'];
    let step = statuses.indexOf(order.status);
    
    // For demo: auto advance if just placed
    if (step === 0) {
       const timer1 = setTimeout(() => setCurrentStep(1), 3000); // Move to preparing
       const timer2 = setTimeout(() => setCurrentStep(2), 8000); // Move to out for delivery
       return () => { clearTimeout(timer1); clearTimeout(timer2); };
    } else {
        setCurrentStep(step);
    }
  }, [order.status]);

  const steps = [
    { icon: Check, label: 'Order Placed', time: 'Just now' },
    { icon: ChefHat, label: 'Preparing', time: '10 mins' },
    { icon: Bike, label: 'Out for Delivery', time: '20 mins' },
    { icon: Home, label: 'Delivered', time: '30 mins' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Order #{order.id.slice(-6)}</h2>
          <p className="text-gray-500 text-sm">{order.restaurantName}</p>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
            <Clock size={12} /> Live Tracking
          </span>
          {order.scheduledTime && (
            <div className="text-xs text-orange-600 font-semibold mt-1">
              Scheduled: {new Date(order.scheduledTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>
          )}
        </div>
      </div>

      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-100 z-0">
          <div 
            className="absolute top-0 left-0 w-full bg-orange-500 transition-all duration-1000 ease-in-out"
            style={{ height: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>

        <div className="space-y-8 relative z-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index <= currentStep;
            const isCompleted = index < currentStep;

            return (
              <div key={index} className="flex items-start gap-4">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-500 flex-shrink-0 bg-white
                    ${isActive ? 'border-orange-500 text-orange-500' : 'border-gray-200 text-gray-300'}
                    ${isCompleted ? 'bg-orange-500 border-orange-500 text-white' : ''}
                  `}
                >
                  <Icon size={16} />
                </div>
                <div className={`flex-1 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                  <h4 className="font-bold text-gray-900 text-sm">{step.label}</h4>
                  <p className="text-xs text-gray-500">{isActive ? 'In Progress' : 'Pending'}</p>
                </div>
                <div className="text-xs font-semibold text-gray-400">
                  {step.time}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100">
        <h3 className="font-bold text-sm text-gray-900 mb-3">Order Items</h3>
        <div className="space-y-2">
          {order.items.map((item, idx) => (
             <div key={idx} className="flex justify-between text-sm">
                <div className="flex gap-2">
                   <span className="text-green-600 font-bold">{item.quantity}x</span>
                   <span className="text-gray-700">
                      {item.name}
                      {item.cookingRequest && <span className="block text-xs text-gray-400 italic">Note: {item.cookingRequest}</span>}
                   </span>
                </div>
                <span className="text-gray-900 font-medium">₹{item.price * item.quantity}</span>
             </div>
          ))}
        </div>
        <div className="flex justify-between mt-4 pt-4 border-t border-dashed border-gray-200 font-bold text-lg">
           <span>Total Paid</span>
           <span>₹{order.total}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
