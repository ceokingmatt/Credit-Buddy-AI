
import React, { useState } from 'react';
import { X, CheckCircle2, Crown, Zap, Shield, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from './Button';

interface UpgradeModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({ onClose, onConfirm }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = () => {
    setIsLoading(true);
    
    // DIRECT REDIRECT TO PAYMENT LINK ($29 PLAN)
    window.open("https://buy.stripe.com/4gM7sEcpAa1P5nm13TcZa00", "_blank");

    // Simulate brief loading/cleanup before closing or triggering parent action
    setTimeout(() => {
        setIsLoading(false);
        onConfirm();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        
        {/* Header Image / Gradient */}
        <div className="relative h-32 bg-gray-900 overflow-hidden shrink-0">
             <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-neon/20 blur-3xl rounded-full -mr-10 -mt-20"></div>
             
             <button 
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors z-10"
             >
                <X size={18} />
             </button>

             <div className="absolute bottom-6 left-8 flex items-center gap-3">
                 <div className="w-12 h-12 rounded-xl bg-brand-neon flex items-center justify-center text-white shadow-lg shadow-red-900/30">
                     <Crown size={24} fill="currentColor" />
                 </div>
                 <div>
                     <p className="text-brand-neon font-bold text-xs uppercase tracking-wider mb-0.5">Recommended</p>
                     <h2 className="text-2xl font-black text-white tracking-tight">Upgrade to Pro</h2>
                 </div>
             </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-8 overflow-y-auto">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Why upgrade?</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                    Manual disputes are slow. Pro members get <span className="text-gray-900 font-bold">fully automated round processing</span>. I watch your report daily and mail the next round the second it's needed.
                </p>
            </div>

            <div className="space-y-4 mb-8">
                {[
                    { 
                        icon: Zap, 
                        title: "Automated Round Logic", 
                        desc: "I auto-generate Round 2, 3, & 4 letters the moment the bureaus respond.",
                        color: "text-brand-neon"
                    },
                    { 
                        icon: Mail, 
                        title: "Certified Mail Included", 
                        desc: "Stop paying $5/letter. I print, fold, and mail everything for free.",
                        color: "text-blue-600"
                    },
                    { 
                        icon: Shield, 
                        title: "Daily Credit Monitoring", 
                        desc: "I watch your report 24/7. If a deletion hits or your score jumps, I'll ping you immediately.",
                        color: "text-green-600"
                    },
                    { 
                        icon: Crown, 
                        title: "Priority Processing", 
                        desc: "You skip the line. I process your letters before everyone else so they hit the mail faster.",
                        color: "text-purple-600"
                    }
                ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                        <div className={`mt-1 shrink-0 ${item.color}`}>
                            <item.icon size={20} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
                            <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center">
                <p className="text-xs font-bold text-gray-400 uppercase mb-2">Total Value</p>
                <div className="flex items-end justify-center gap-1 mb-1">
                    <span className="text-4xl font-black text-gray-900">$29</span>
                    <span className="text-sm font-bold text-gray-500 mb-1.5">/ month</span>
                </div>
                <p className="text-xs text-gray-400">Cancel anytime. 30-day money back guarantee.</p>
            </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 shrink-0">
            <Button 
                onClick={handleConfirm} 
                className="w-full h-12 text-base font-bold shadow-lg shadow-red-900/10"
                isLoading={isLoading}
                icon={!isLoading ? <ArrowRight size={18} /> : undefined}
            >
                {isLoading ? 'Opening Secure Checkout...' : 'Activate Pro Benefits'}
            </Button>
        </div>

      </div>
    </div>
  );
};
