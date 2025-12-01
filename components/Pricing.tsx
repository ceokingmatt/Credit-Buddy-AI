
import React, { useState } from 'react';
import { Check, X, Crown, Zap, ShieldCheck, HelpCircle, ArrowRight, Users, User, ScanLine, Loader2, Star, ThumbsUp } from 'lucide-react';
import { Button } from './Button';

interface PricingProps {
  onGetStarted: (plan: 'free' | 'pro') => void;
}

export const Pricing: React.FC<PricingProps> = ({ onGetStarted }) => {
  const [isLoadingPro, setIsLoadingPro] = useState(false);

  const handleProClick = () => {
    setIsLoadingPro(true);
    // Open in new tab to avoid iframe blocking
    window.open("https://buy.stripe.com/4gM7sEcpAa1P5nm13TcZa00", "_blank");
    setTimeout(() => setIsLoadingPro(false), 2000);
  };

  return (
    <div className="min-h-screen pt-20 pb-24 px-4 animate-in fade-in duration-500 bg-gray-50 font-sans">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                Simple, Transparent Pricing.
            </h1>
            <p className="text-xl text-gray-500">
                Choose the path that fits your goals. No hidden fees. Cancel anytime.
            </p>
        </div>

        {/* Pricing Grid - Dispute Beast Style (High Contrast) */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
            
            {/* CARD 1: DIY (White) */}
            <div className="bg-white rounded-[2rem] p-10 border border-gray-200 shadow-xl flex flex-col relative">
                <div className="mb-8">
                    <div className="inline-block bg-gray-100 rounded-lg px-3 py-1 text-xs font-bold text-gray-600 mb-4 uppercase tracking-wider">
                        Free Account
                    </div>
                    <h3 className="text-3xl font-black text-gray-900 mb-2">Do It Yourself</h3>
                    <p className="text-gray-500 font-medium">You control the process manually.</p>
                </div>

                <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-5xl font-black text-gray-900">$0</span>
                    <span className="text-gray-400 font-bold">/ month</span>
                </div>

                <div className="space-y-5 mb-10 flex-1">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0"><Check size={14} strokeWidth={3} /></div>
                        <span className="text-gray-700 font-bold">Full Credit Report Audit</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0"><Check size={14} strokeWidth={3} /></div>
                        <span className="text-gray-700 font-bold">AI Dispute Logic</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0"><Check size={14} strokeWidth={3} /></div>
                        <span className="text-gray-700 font-bold">DIY Letter Downloads</span>
                    </div>
                    
                    {/* Excluded Items */}
                    <div className="border-t border-gray-100 my-4"></div>
                    
                    <div className="flex items-center gap-3 opacity-50">
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 shrink-0"><X size={14} strokeWidth={3} /></div>
                        <span className="text-gray-500 line-through">Certified Mail Service</span>
                    </div>
                    <div className="flex items-center gap-3 opacity-50">
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 shrink-0"><X size={14} strokeWidth={3} /></div>
                        <span className="text-gray-500 line-through">Automated Re-Disputes</span>
                    </div>
                    <div className="flex items-center gap-3 opacity-50">
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 shrink-0"><X size={14} strokeWidth={3} /></div>
                        <span className="text-gray-500 line-through">Real-Time Monitoring</span>
                    </div>
                </div>

                <Button 
                    onClick={() => onGetStarted('free')} 
                    variant="secondary" 
                    className="w-full h-14 text-lg font-bold border-2 border-gray-200 hover:border-gray-900 hover:bg-white text-gray-900"
                >
                    Create Free Account
                </Button>
                <p className="text-center text-xs text-gray-400 mt-4 font-bold">Pay per letter ($5) + postage</p>
            </div>

            {/* CARD 2: PRO (Black / Beast Mode) */}
            <div className="bg-gray-900 rounded-[2rem] p-10 border-2 border-gray-900 shadow-2xl flex flex-col relative transform md:-translate-y-6 md:scale-105 z-10 text-white">
                
                {/* Popular Badge */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-neon text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-lg shadow-red-900/40">
                    Most Popular
                </div>

                <div className="mb-8">
                    <div className="inline-block bg-white/10 rounded-lg px-3 py-1 text-xs font-bold text-brand-neon mb-4 uppercase tracking-wider border border-white/5">
                        Fully Automated
                    </div>
                    <h3 className="text-3xl font-black text-white mb-2">Credit Buddy Pro</h3>
                    <p className="text-gray-400 font-medium">We handle everything for you.</p>
                </div>

                <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-5xl font-black text-white">$29</span>
                    <span className="text-gray-500 font-bold">/ month</span>
                </div>

                <div className="space-y-5 mb-10 flex-1">
                     <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-brand-neon flex items-center justify-center text-white shrink-0 shadow-lg shadow-red-900/50"><Check size={14} strokeWidth={3} /></div>
                        <span className="text-white font-bold">Unlimited Disputes & Scans</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-brand-neon flex items-center justify-center text-white shrink-0 shadow-lg shadow-red-900/50"><Check size={14} strokeWidth={3} /></div>
                        <span className="text-white font-bold">USPS Certified Mail INCLUDED</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-brand-neon flex items-center justify-center text-white shrink-0 shadow-lg shadow-red-900/50"><Check size={14} strokeWidth={3} /></div>
                        <span className="text-white font-bold">3-Bureau Monitoring (Real-Time)</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-brand-neon flex items-center justify-center text-white shrink-0 shadow-lg shadow-red-900/50"><Check size={14} strokeWidth={3} /></div>
                        <span className="text-white font-bold">Smart Re-Disputes (Rounds 2, 3, 4)</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-brand-neon flex items-center justify-center text-white shrink-0 shadow-lg shadow-red-900/50"><Check size={14} strokeWidth={3} /></div>
                        <span className="text-white font-bold">Live Dispute Status Tracking</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-brand-neon flex items-center justify-center text-white shrink-0 shadow-lg shadow-red-900/50"><Check size={14} strokeWidth={3} /></div>
                        <span className="text-white font-bold">Score Simulator & Projections</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-brand-neon flex items-center justify-center text-white shrink-0 shadow-lg shadow-red-900/50"><Check size={14} strokeWidth={3} /></div>
                        <span className="text-white font-bold">Priority Expert Support</span>
                    </div>
                </div>

                <Button 
                    onClick={handleProClick} 
                    className="w-full h-14 text-lg font-bold bg-brand-neon hover:bg-red-600 text-white shadow-lg shadow-red-900/30 border-none"
                    disabled={isLoadingPro}
                >
                    {isLoadingPro ? (
                        <span className="flex items-center gap-2"><Loader2 className="animate-spin" size={20} /> Loading Stripe...</span>
                    ) : (
                        "Get Started Now"
                    )}
                </Button>
                <div className="text-center mt-4 flex items-center justify-center gap-2 text-xs text-gray-500 font-bold">
                    <ShieldCheck size={14} className="text-green-500" /> 30-Day Money Back Guarantee
                </div>
            </div>

        </div>

        {/* Bottom Trust Strip */}
        <div className="mt-24 border-t border-gray-200 pt-16">
             <div className="grid md:grid-cols-3 gap-8 text-center">
                 <div>
                     <div className="w-12 h-12 bg-white rounded-2xl border border-gray-200 flex items-center justify-center text-gray-900 mx-auto mb-4 shadow-sm">
                         <Zap size={24} />
                     </div>
                     <h3 className="font-bold text-gray-900 mb-2">Fast Results</h3>
                     <p className="text-sm text-gray-500 max-w-xs mx-auto">Most users see their first deletions within 35-45 days of mailing.</p>
                 </div>
                 <div>
                     <div className="w-12 h-12 bg-white rounded-2xl border border-gray-200 flex items-center justify-center text-gray-900 mx-auto mb-4 shadow-sm">
                         <ShieldCheck size={24} />
                     </div>
                     <h3 className="font-bold text-gray-900 mb-2">Secure & Private</h3>
                     <p className="text-sm text-gray-500 max-w-xs mx-auto">Your data is encrypted with 256-bit SSL and never sold to third parties.</p>
                 </div>
                 <div>
                     <div className="w-12 h-12 bg-white rounded-2xl border border-gray-200 flex items-center justify-center text-gray-900 mx-auto mb-4 shadow-sm">
                         <ThumbsUp size={24} />
                     </div>
                     <h3 className="font-bold text-gray-900 mb-2">Expert Support</h3>
                     <p className="text-sm text-gray-500 max-w-xs mx-auto">Our team of credit experts is available via chat to help you strategize.</p>
                 </div>
             </div>
        </div>

      </div>
    </div>
  );
};
