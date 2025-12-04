
import React, { useEffect } from 'react';
import { X, MessageSquare, Mail } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'sms' | 'email';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 8000); // Visible for 8 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 right-4 z-[100] max-w-sm w-full animate-in slide-in-from-right-full duration-500">
      <div className="bg-white/95 backdrop-blur-sm border-l-4 border-orange-600 shadow-2xl rounded-lg p-4 flex items-start gap-4">
        <div className={`p-2 rounded-full flex-shrink-0 ${type === 'sms' ? 'bg-blue-100' : 'bg-red-100'}`}>
          {type === 'sms' ? (
            <MessageSquare size={20} className="text-blue-600" />
          ) : (
            <Mail size={20} className="text-red-600" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900 text-sm mb-0.5 flex justify-between">
            {type === 'sms' ? 'Messages • Now' : 'Gmail • Now'}
          </p>
          <p className="text-gray-700 text-sm font-medium leading-snug">{message}</p>
          <p className="text-xs text-gray-400 mt-2">Simulated Notification</p>
        </div>
        <button 
          onClick={onClose} 
          className="text-gray-400 hover:text-gray-600 transition-colors -mt-1 -mr-1"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
