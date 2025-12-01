
import React, { useState } from 'react';
import { Gift, Copy, Check, Users, Share2, Sparkles, ArrowLeft, Wallet, Heart } from 'lucide-react';
import { Button } from './Button';

interface ReferralProgramProps {
  onBack: () => void;
}

export const ReferralProgram: React.FC<ReferralProgramProps> = ({ onBack }) => {
  const [copied, setCopied] = useState(false);
  const referralCode = "BUDDY-JON-882";
  const referralLink = `https://creditbuddy.ai/join/${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-24 font-sans animate-in fade-in duration-500">
      
      {/* Header / Hero */}
      <div className="bg-white border-b border-gray-200 pt-8 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
            <button 
                onClick={onBack}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-6 font-bold text-sm group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Dispute Center
            </button>

            <div className="text-center max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-brand-neon text-xs font-bold mb-6">
                    <Heart size={12} className="animate-pulse fill-brand-neon" /> SPREAD THE LOVE
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
                    Friends don't let friends <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neon to-black">have bad credit.</span>
                </h1>
                <p className="text-xl text-gray-500">
                    Know someone stressing over their score? Hook them up. I'll give them a discount, and I'll drop <strong>$15 in your wallet</strong> too. Win-win.
                </p>
            </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-8">
        
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-red-100 p-8 mb-8 relative overflow-hidden ring-4 ring-red-50/50">
            {/* Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-red-50 to-transparent rounded-bl-full -z-0 opacity-60"></div>

            <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                        Your "Buddy" Link <Sparkles size={16} className="text-brand-neon" />
                    </h3>
                    <p className="text-sm text-gray-500 mb-6">Copy this and drop it in the group chat. I'll handle the rest.</p>
                    
                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl p-2 focus-within:border-brand-neon focus-within:ring-1 focus-within:ring-brand-neon transition-all">
                        <div className="flex-1 px-3 py-2 text-sm font-mono text-gray-600 truncate select-all">
                            {referralLink}
                        </div>
                        <Button 
                            onClick={handleCopy}
                            className={`h-10 px-6 text-sm font-bold transition-all ${copied ? 'bg-gray-900 text-white border-transparent' : 'bg-white border-gray-200 text-gray-900 hover:border-gray-300 shadow-sm'}`}
                        >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                            {copied ? 'Copied!' : 'Copy'}
                        </Button>
                    </div>

                    <div className="flex gap-4 mt-6">
                         <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition-colors font-bold text-sm">
                            <Share2 size={16} /> Post to X
                         </button>
                         <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors font-bold text-sm border border-red-100">
                             Email Friend
                         </button>
                    </div>
                </div>

                <div className="bg-gray-900 rounded-2xl p-6 text-white relative border border-gray-800 shadow-2xl shadow-gray-900/20">
                     <div className="flex items-center gap-3 mb-6">
                         <div className="p-2 bg-white/10 rounded-lg">
                             <Wallet size={20} className="text-brand-neon" />
                         </div>
                         <div>
                             <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Your Stash</p>
                             <p className="text-2xl font-black text-white">$45.00</p>
                         </div>
                     </div>
                     
                     <div className="space-y-4">
                        <div className="flex justify-between text-sm items-center">
                            <span className="text-gray-400">Friends Helped</span>
                            <span className="font-bold bg-gray-800 px-2 py-0.5 rounded text-white">2</span>
                        </div>
                        <div className="flex justify-between text-sm items-center">
                            <span className="text-gray-400">Lifetime Earnings</span>
                            <span className="font-bold text-brand-neon">$135.00</span>
                        </div>
                     </div>
                     
                     <div className="mt-6 pt-6 border-t border-gray-800">
                        <Button className="w-full shadow-none bg-brand-neon text-white font-bold h-10 border-none hover:bg-red-600">
                            Use Credits for Dispute
                        </Button>
                     </div>
                </div>
            </div>
        </div>

        {/* Steps - UPDATED TO BUDDY VOICE */}
        <div className="grid md:grid-cols-3 gap-6">
            {[
                { 
                    icon: <Share2 size={24} />, 
                    title: "1. You send the invite", 
                    desc: "Don't let them suffer with high interest rates. Send them your link and I'll get to work on their file." 
                },
                { 
                    icon: <Users size={24} />, 
                    title: "2. I give them a deal", 
                    desc: "Since they're with you, I'll automatically apply a discount to their first dispute round. VIP treatment." 
                },
                { 
                    icon: <Gift size={24} />, 
                    title: "3. I fill your wallet", 
                    desc: "Boom. I'll drop $15 credit in your stash instantly. Your next round is on me." 
                }
            ].map((step, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center group hover:border-red-200 hover:shadow-lg hover:shadow-red-900/5 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500/0 to-transparent group-hover:via-brand-neon transition-all duration-500"></div>
                    <div className="w-16 h-16 rounded-2xl bg-red-50 text-brand-neon flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-neon group-hover:text-white transition-colors duration-300 group-hover:rotate-3 shadow-sm border border-red-100 group-hover:border-transparent">
                        {step.icon}
                    </div>
                    <h3 className="font-black text-gray-900 mb-2 text-lg">{step.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};
