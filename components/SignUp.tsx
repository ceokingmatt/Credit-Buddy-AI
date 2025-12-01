
import React, { useState } from 'react';
import { Button } from './Button';
import { User, Mail, Lock, ArrowRight, CheckCircle2, X, PlayCircle, LogIn } from 'lucide-react';

interface SignUpProps {
  onComplete: () => void;
  onClose: () => void;
}

// Custom Stacked Red Logo SVG
const LOGO_SRC = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0Ij4KICA8ZyB0cmFuc2Zvcm09InJvdGF0ZSgtMTAgMTIwIDUwKSI+CiAgICA8dGV4dCB4PSIxMjAiIHk9IjQ1IiBmb250LWZhbWlseT0iQXJpYWwgQmxhY2ssIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI5MDAiIGZvbnQtc3R5bGU9Iml0YWxpYyIgZm9udC1zaXplPSIzOCIgZmlsbD0iI0ZGM0IzMCIgbGV0dGVyLXNwYWNpbmc9Ii0xIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5DUkVESVQ8L3RleHQ+CiAgICA8dGV4dCB4PSIxMjAiIHk9Ijg1IiBmb250LWZhbWlseT0iQXJpYWwgQmxhY2ssIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI5MDAiIGZvbnQtc3R5bGU9Iml0YWxpYyIgZm9udC1zaXplPSIzOCIgZmlsbD0iI0ZGM0IzMCIgbGV0dGVyLXNwYWNpbmc9Ii0xIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5CVUREWSBBSTwvdGV4dD4KICA8L2c+PC9zdmc+";

export const SignUp: React.FC<SignUpProps> = ({ onComplete, onClose }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onComplete();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white border border-gray-200 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 scale-100">
        
        {/* Header Gradient Line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-brand-neon via-gray-900 to-black"></div>

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <img src={LOGO_SRC} alt="Credit Buddy AI" className="h-16 mx-auto mb-4 object-contain" />
            
            {/* Toggle Switch */}
            <div className="inline-flex bg-gray-100 p-1 rounded-full mb-2">
                <button 
                    onClick={() => setIsLogin(false)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${!isLogin ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Create Account
                </button>
                <button 
                    onClick={() => setIsLogin(true)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${isLogin ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Log In
                </button>
            </div>
            
            <p className="text-gray-500 text-sm">
                {isLogin ? 'Welcome back, Buddy.' : 'Start your 750+ credit journey.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
                <div className="space-y-1.5 animate-in slide-in-from-top-2 duration-300">
                <div className="relative group">
                    <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-2xl px-4 py-3.5 pl-10 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all placeholder-gray-400 text-sm"
                    placeholder="Full Name"
                    />
                    <User className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-brand-neon transition-colors" size={18} />
                </div>
                </div>
            )}

            <div className="space-y-1.5">
              <div className="relative group">
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-2xl px-4 py-3.5 pl-10 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all placeholder-gray-400 text-sm"
                  placeholder="Email Address"
                />
                <Mail className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-brand-neon transition-colors" size={18} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="relative group">
                <input 
                  type="password" 
                  required
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-2xl px-4 py-3.5 pl-10 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all placeholder-gray-400 text-sm"
                  placeholder="Password"
                />
                <Lock className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-brand-neon transition-colors" size={18} />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full py-3.5 text-sm font-bold mt-4 shadow-lg shadow-red-900/10 text-white border-none"
              isLoading={isLoading}
              icon={!isLoading ? (isLogin ? <LogIn size={18} /> : <ArrowRight size={18} />) : undefined}
            >
              {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Get Started Free')}
            </Button>
          </form>

          {!isLogin && (
             <>
                <div className="relative flex items-center py-6">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-bold uppercase">OR</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                </div>

                <button 
                    type="button"
                    onClick={onComplete}
                    className="w-full py-3.5 rounded-full border border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2 text-sm font-bold group"
                >
                    <PlayCircle size={18} className="text-brand-neon group-hover:scale-110 transition-transform" />
                    Demo Mode (Skip Auth)
                </button>
             </>
          )}
        </div>
      </div>
    </div>
  );
};
