
import React, { useState } from 'react';
import { MessageCircle, X, Search, ChevronRight, HelpCircle } from 'lucide-react';

export const SupportWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      
      {/* Widget Content */}
      <div 
        className={`bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 mb-4 overflow-hidden transition-all duration-300 origin-bottom-right pointer-events-auto
        ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10 pointer-events-none h-0'}`}
      >
          <div className="bg-gray-900 p-4 text-white flex justify-between items-start">
              <div>
                  <h3 className="font-bold">Credit Buddy Support</h3>
                  <p className="text-xs text-gray-400 mt-1">We usually reply in under 5 minutes.</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white"><X size={18} /></button>
          </div>
          
          <div className="p-4 bg-gray-50 border-b border-gray-100">
              <div className="bg-white border border-gray-200 rounded-lg flex items-center px-3 py-2 gap-2 shadow-sm">
                  <Search size={14} className="text-gray-400" />
                  <input type="text" placeholder="Search for help..." className="text-sm bg-transparent outline-none w-full placeholder-gray-400" />
              </div>
          </div>

          <div className="p-2">
              <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors text-left group">
                  <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-neon/10 flex items-center justify-center text-brand-neon">
                          <MessageCircle size={16} />
                      </div>
                      <div>
                          <p className="text-sm font-bold text-gray-900">Chat with us</p>
                          <p className="text-xs text-gray-500">Start a new conversation</p>
                      </div>
                  </div>
                  <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-600" />
              </button>
              
              <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors text-left group">
                  <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                          <HelpCircle size={16} />
                      </div>
                      <div>
                          <p className="text-sm font-bold text-gray-900">Common Questions</p>
                          <p className="text-xs text-gray-500">How do disputes work?</p>
                      </div>
                  </div>
                  <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-600" />
              </button>
          </div>

          <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
              <p className="text-[10px] text-gray-400">Powered by Credit Buddy AI</p>
          </div>
      </div>

      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-brand-neon hover:bg-red-600 text-white rounded-full shadow-lg shadow-red-900/30 flex items-center justify-center transition-all hover:scale-110 pointer-events-auto"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

    </div>
  );
};
