
import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

const SupportWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{sender: 'user' | 'bot', text: string}[]>([
    { sender: 'bot', text: 'Hi! How can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: inputValue }]);
    setInputValue('');

    // Simulate bot reply
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Thanks for reaching out! A support agent will be with you shortly. (This is a demo)' }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-5 duration-300 flex flex-col h-[400px]">
          {/* Header */}
          <div className="bg-orange-600 p-4 text-white flex justify-between items-center">
            <div>
              <h3 className="font-bold">Customer Support</h3>
              <p className="text-xs text-orange-100 opacity-90">Usually replies in 5 mins</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-orange-700 p-1 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-orange-600 text-white rounded-br-none' 
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input 
              type="text" 
              placeholder="Type a message..." 
              className="flex-1 bg-gray-100 border-0 rounded-full px-4 text-sm focus:ring-1 focus:ring-orange-500 outline-none"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button 
              type="submit" 
              className="bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700 transition-colors shadow-sm disabled:opacity-50"
              disabled={!inputValue.trim()}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-orange-600 text-white p-4 rounded-full shadow-lg hover:bg-orange-700 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 group"
      >
        <MessageSquare size={24} />
        {!isOpen && <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-bold whitespace-nowrap">Help</span>}
      </button>
    </div>
  );
};

export default SupportWidget;
