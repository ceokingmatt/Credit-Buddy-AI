
import React, { useState, useEffect } from 'react';
import { Truck, CreditCard as CardIcon, ShieldCheck, Smartphone, AlertCircle, CheckCircle2, Crown } from 'lucide-react';
import { Button } from './Button';
import { GeneratedLetter } from '../types';
import confetti from 'canvas-confetti';

interface CheckoutProps {
  letters: GeneratedLetter[];
  onComplete: (plan: 'one-time' | 'subscription') => void;
}

// ==============================================================================
// 🔑 STRIPE CONFIGURATION (LIVE MODE)
// ==============================================================================
const STRIPE_PUBLISHABLE_KEY = "pk_live_51SVqIm5kukuMMNOzI8bhGfcTGNOgc5mIt3H1WMcW7cXKRFJOHFPn8QxtiS4GaNEMlYIRZscXeYQ8julSkHpHKFdL00DeaU0KUr"; 
const STRIPE_SUBSCRIPTION_PRICE_ID = "price_1234567890"; // PASTE YOUR STRIPE PRICE ID FOR $29 PLAN HERE
// ==============================================================================

declare global {
  interface Window {
    Stripe?: any;
  }
}

export const Checkout: React.FC<CheckoutProps> = ({ letters = [], onComplete }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple'>('card');
  const [stripeError, setStripeError] = useState<string | null>(null);
  
  // Plan Selection State: 'one-time' or 'subscription'
  const [selectedPlan, setSelectedPlan] = useState<'one-time' | 'subscription'>('one-time');
  
  // Compliance State
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  // Form State
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [zip, setZip] = useState('');

  // Pricing Calculation
  const PRICE_PER_LETTER = 5.00;
  const SUBSCRIPTION_PRICE = 29.00;
  
  const oneTimeTotal = letters.length * PRICE_PER_LETTER;
  
  // Logic: If subscription is selected, letters are INCLUDED (Free), so total is just $29.00
  const totalDue = selectedPlan === 'subscription' ? SUBSCRIPTION_PRICE : oneTimeTotal;

  useEffect(() => {
    if (window.Stripe && !STRIPE_PUBLISHABLE_KEY.includes('PASTE_YOUR')) {
        console.log("Stripe configured with live key.");
    }
  }, []);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 16);
    const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (value.length >= 3) {
      setExpiry(`${value.substring(0, 2)} / ${value.substring(2)}`);
    } else {
      setExpiry(value);
    }
  };

  const handlePayment = async () => {
    if (!termsAccepted) return;

    setIsProcessing(true);
    setStripeError(null);

    try {
        // Simulation of API Call to your backend
        console.log(`Processing ${selectedPlan} payment for $${totalDue}...`);
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        triggerSuccessConfetti();
        // Pass the selected plan back to the parent so we can set Pro status
        onComplete(selectedPlan);
    } catch (error: any) {
        setStripeError(error.message || "Payment failed.");
    } finally {
        setIsProcessing(false);
    }
  };

  const triggerSuccessConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    // Updated Colors: Red, Black, Dark Grey
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100, colors: ['#FF3B30', '#111827', '#4B5563'] };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  return (
    <div className="max-w-5xl mx-auto w-full animate-in zoom-in duration-500 pt-8 pb-20 px-4">
      
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Checkout</h2>
        <p className="text-gray-500 text-sm">
          Select your plan to process your letters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Plan Selection & Summary */}
        <div className="lg:col-span-7 space-y-6">
           
           {/* Plan Selection */}
           <div className="space-y-3">
               {/* Option 1: Subscription */}
               <div 
                  onClick={() => setSelectedPlan('subscription')}
                  className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                      selectedPlan === 'subscription' 
                      ? 'bg-gray-900 border-gray-900 shadow-xl transform scale-[1.02]' 
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
               >
                   {selectedPlan === 'subscription' && (
                       <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-neon text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                           <Crown size={12} fill="currentColor" /> BEST VALUE
                       </div>
                   )}
                   <div className="flex justify-between items-center">
                       <div className="flex items-center gap-4">
                           <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${selectedPlan === 'subscription' ? 'border-brand-neon bg-brand-neon text-white' : 'border-gray-300 bg-white'}`}>
                               {selectedPlan === 'subscription' && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                           </div>
                           <div>
                               <h3 className={`font-bold ${selectedPlan === 'subscription' ? 'text-white' : 'text-gray-900'}`}>Pro Membership</h3>
                               <p className={`text-xs ${selectedPlan === 'subscription' ? 'text-gray-400' : 'text-gray-500'}`}>Includes letters, monitoring, & advanced tracking.</p>
                           </div>
                       </div>
                       <div className="text-right">
                           <p className={`text-xl font-black ${selectedPlan === 'subscription' ? 'text-white' : 'text-gray-900'}`}>$29<span className="text-xs font-medium opacity-60">/mo</span></p>
                       </div>
                   </div>
                   {/* Included badge */}
                   {selectedPlan === 'subscription' && (
                       <div className="mt-4 pt-4 border-t border-gray-800 flex items-center gap-2 text-brand-neon text-xs font-bold">
                           <CheckCircle2 size={14} /> Letter Fees Waived (Save ${oneTimeTotal.toFixed(0)})
                       </div>
                   )}
               </div>

               {/* Option 2: One-Time */}
               <div 
                  onClick={() => setSelectedPlan('one-time')}
                  className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                      selectedPlan === 'one-time' 
                      ? 'bg-white border-gray-900 shadow-md ring-1 ring-gray-900' 
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
               >
                   <div className="flex justify-between items-center">
                       <div className="flex items-center gap-4">
                           <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${selectedPlan === 'one-time' ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white'}`}>
                               {selectedPlan === 'one-time' && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                           </div>
                           <div>
                               <h3 className="font-bold text-gray-900">Pay Per Letter</h3>
                               <p className="text-xs text-gray-500">One-time payment for this round only.</p>
                           </div>
                       </div>
                       <div className="text-right">
                           <p className="text-xl font-black text-gray-900">${oneTimeTotal.toFixed(0)}</p>
                       </div>
                   </div>
               </div>
           </div>

           {/* Order Summary */}
           <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                  <Truck size={12} /> Order Summary
              </div>
              
              <div className="space-y-3">
                  {letters.map((letter) => (
                    <div key={letter.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-3">
                         <div className={`w-8 h-8 rounded-md flex items-center justify-center text-white font-bold text-[10px] shadow-sm ${
                            letter.bureau === 'Experian' ? 'bg-blue-700' :
                            letter.bureau === 'TransUnion' ? 'bg-cyan-500' :
                            'bg-red-600'
                        }`}>
                            {letter.bureau.substring(0,2).toUpperCase()}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${
                                    letter.bureau === 'Experian' ? 'bg-blue-700' :
                                    letter.bureau === 'TransUnion' ? 'bg-cyan-500' :
                                    'bg-red-600'
                                }`}></span>
                                <p className="text-sm font-bold text-gray-900">{letter.bureau} Dispute</p>
                            </div>
                            <p className="text-[10px] text-gray-500">USPS Certified Tracking</p>
                        </div>
                      </div>
                      <div className="text-right">
                          {selectedPlan === 'subscription' ? (
                              <span className="text-sm font-bold text-brand-neon">INCLUDED</span>
                          ) : (
                              <span className="text-sm font-bold text-gray-900">${PRICE_PER_LETTER.toFixed(2)}</span>
                          )}
                      </div>
                    </div>
                  ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-end">
                  <span className="text-sm text-gray-500 font-medium">Total Due Today</span>
                  <div className="text-right">
                      <span className="text-2xl font-black text-gray-900 tracking-tight">${totalDue.toFixed(2)}</span>
                      {selectedPlan === 'subscription' && (
                          <p className="text-[10px] text-gray-400 font-medium">Renews at $29/mo</p>
                      )}
                  </div>
              </div>
           </div>
        </div>

        {/* Right Column: Compact Payment Form */}
        <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-200 overflow-hidden sticky top-24">
                
                {/* Setup Banner */}
                {STRIPE_PUBLISHABLE_KEY.includes('PASTE_YOUR') && (
                    <div className="bg-red-50 text-red-600 text-[10px] font-bold text-center py-1.5 border-b border-red-100">
                        Test Mode
                    </div>
                )}

                <div className="p-6">
                    
                    {/* Compact Toggle */}
                    <div className="flex p-1 bg-gray-100 rounded-lg mb-6">
                        <button 
                            onClick={() => setPaymentMethod('card')}
                            className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-xs font-bold transition-all ${paymentMethod === 'card' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <CardIcon size={14} /> Card
                        </button>
                        <button 
                            onClick={() => setPaymentMethod('apple')}
                            className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-xs font-bold transition-all ${paymentMethod === 'apple' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <Smartphone size={14} /> Pay
                        </button>
                    </div>

                    {paymentMethod === 'card' ? (
                        <div className="space-y-4 animate-in fade-in duration-300">
                             
                             {/* Email Field */}
                             <div>
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email address" 
                                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all placeholder-gray-400" 
                                />
                             </div>

                             {/* Unified Card Input Group */}
                             <div className="border border-gray-200 rounded-lg overflow-hidden bg-white focus-within:ring-1 focus-within:ring-brand-neon focus-within:border-brand-neon transition-all shadow-sm">
                                <div className="relative border-b border-gray-200">
                                    <input 
                                        type="text" 
                                        value={cardNumber}
                                        onChange={handleCardNumberChange}
                                        placeholder="Card number" 
                                        className="w-full px-3 py-2.5 text-sm outline-none pl-9" 
                                    />
                                    <CardIcon className="absolute left-3 top-3 text-gray-400" size={14} />
                                </div>
                                <div className="flex divide-x divide-gray-200">
                                    <input 
                                        type="text" 
                                        value={expiry}
                                        onChange={handleExpiryChange}
                                        placeholder="MM / YY" 
                                        className="w-1/3 px-3 py-2.5 text-sm outline-none text-center" 
                                    />
                                    <input 
                                        type="text" 
                                        value={cvc}
                                        onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').substring(0,3))}
                                        placeholder="CVC" 
                                        className="w-1/3 px-3 py-2.5 text-sm outline-none text-center" 
                                    />
                                    <input 
                                        type="text" 
                                        value={zip}
                                        onChange={(e) => setZip(e.target.value)}
                                        placeholder="ZIP" 
                                        className="w-1/3 px-3 py-2.5 text-sm outline-none text-center" 
                                    />
                                </div>
                             </div>
                        </div>
                    ) : (
                        <div className="py-8 text-center space-y-3 animate-in fade-in">
                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-400 border border-gray-100">
                                <Smartphone size={24} />
                            </div>
                            <p className="text-xs text-gray-500 font-medium">Proceed on your device</p>
                        </div>
                    )}

                    {stripeError && (
                        <div className="mt-4 p-2.5 bg-red-50 text-red-600 text-xs rounded-lg border border-red-100 font-medium flex items-center gap-2">
                            <AlertCircle size={12} /> {stripeError}
                        </div>
                    )}
                    
                    {/* Compliance Checkbox */}
                    <div className="mt-6 flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="relative flex items-center">
                            <input 
                                type="checkbox" 
                                id="terms"
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all checked:border-brand-neon checked:bg-brand-neon"
                            />
                            <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 peer-checked:opacity-100">
                                <CheckCircle2 size={12} strokeWidth={4} />
                            </div>
                        </div>
                        <label htmlFor="terms" className="text-xs text-gray-500 cursor-pointer select-none">
                            I agree to the <span className="text-gray-900 font-bold underline">Terms of Service</span>. I authorize Credit Buddy AI to charge my card 
                            {selectedPlan === 'subscription' ? ' $29.00 each month' : ' a one-time fee'} until I cancel.
                        </label>
                    </div>

                    <div className="pt-4">
                        <Button 
                            onClick={handlePayment} 
                            disabled={!termsAccepted}
                            isLoading={isProcessing}
                            className={`w-full h-12 text-sm rounded-xl font-bold transition-all ${
                                !termsAccepted || isProcessing 
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                : 'bg-brand-neon hover:bg-red-600 text-white shadow-lg shadow-red-900/20'
                            }`}
                        >
                            {isProcessing ? 'Processing...' : `Pay $${totalDue.toFixed(2)}`}
                        </Button>
                    </div>
                    
                    <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400 font-medium text-center pt-4 opacity-80">
                        <ShieldCheck size={10} className="text-green-500" />
                        Encrypted by Stripe
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};
