
import React from 'react';
import { X, Shield, Scale, FileText, Lock } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  type: 'terms' | 'privacy' | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalProps> = ({ isOpen, type, onClose }) => {
  if (!isOpen || !type) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 border border-gray-200">
                {type === 'terms' ? <Scale size={20} /> : <Lock size={20} />}
             </div>
             <div>
                <h2 className="text-xl font-black text-gray-900 tracking-tight">
                    {type === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
                </h2>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Last Updated: Oct 2023</p>
             </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-8 overflow-y-auto font-sans text-sm text-gray-600 leading-relaxed space-y-6">
            
            {type === 'terms' ? (
                <>
                    <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex gap-3 text-red-800">
                        <Shield size={20} className="shrink-0 mt-0.5" />
                        <div>
                            <p className="font-bold mb-1">Disclaimer: Not Legal Advice</p>
                            <p className="text-xs opacity-90">
                                Credit Buddy AI is a software platform, not a law firm or credit repair organization. We provide automated tools for you to manage your own dispute process. Use of our software does not guarantee specific results.
                            </p>
                        </div>
                    </div>

                    <section>
                        <h3 className="font-bold text-gray-900 mb-2">1. Acceptance of Terms</h3>
                        <p>By accessing and using Credit Buddy AI ("the Service"), you accept and agree to be bound by the terms and provision of this agreement.</p>
                    </section>
                    
                    <section>
                        <h3 className="font-bold text-gray-900 mb-2">2. User Responsibilities</h3>
                        <p>You agree that you will not use the Service for any illegal purposes. You are responsible for ensuring that all information you provide, including identification documents and credit reports, is accurate and belongs to you.</p>
                    </section>

                    <section>
                        <h3 className="font-bold text-gray-900 mb-2">3. Subscription & Cancellation</h3>
                        <p>Pro Memberships are billed monthly. You may cancel your subscription at any time via the User Portal. Refunds are processed on a case-by-case basis within 7 days of billing.</p>
                    </section>

                    <section>
                        <h3 className="font-bold text-gray-900 mb-2">4. Limitation of Liability</h3>
                        <p>In no event shall Credit Buddy AI be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>
                    </section>
                </>
            ) : (
                <>
                     <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex gap-3 text-blue-800">
                        <Lock size={20} className="shrink-0 mt-0.5" />
                        <div>
                            <p className="font-bold mb-1">Your Data is Encrypted</p>
                            <p className="text-xs opacity-90">
                                We use bank-level AES-256 encryption. We do not sell your personal data to third-party marketing agencies.
                            </p>
                        </div>
                    </div>

                    <section>
                        <h3 className="font-bold text-gray-900 mb-2">1. Information We Collect</h3>
                        <p>We collect information you provide directly to us, such as your name, email address, postal address, phone number, credit report data, and payment information.</p>
                    </section>

                    <section>
                        <h3 className="font-bold text-gray-900 mb-2">2. How We Use Information</h3>
                        <p>We use your information to: generate dispute letters on your behalf, process transactions, send you technical notices, and detect, investigate and prevent fraudulent transactions.</p>
                    </section>

                    <section>
                        <h3 className="font-bold text-gray-900 mb-2">3. Data Retention</h3>
                        <p>Uploaded credit reports are processed in memory and are automatically deleted from our servers after the analysis session is complete, unless you specifically opt-in to "Document Locker" storage.</p>
                    </section>

                    <section>
                        <h3 className="font-bold text-gray-900 mb-2">4. Third-Party Services</h3>
                        <p>We use Stripe for payment processing and Lob/USPS API for mail delivery. These parties have access to specific data needed to perform their functions but may not use it for other purposes.</p>
                    </section>
                </>
            )}

            <div className="pt-8 mt-8 border-t border-gray-100 text-center">
                 <p className="text-xs text-gray-400 mb-4">By continuing to use Credit Buddy AI, you acknowledge that you have read and understood these terms.</p>
                 <button 
                    onClick={onClose}
                    className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-black transition-colors"
                 >
                    I Understand
                 </button>
            </div>
        </div>
      </div>
    </div>
  );
};
