
import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle2, Shield, FileText, X, ChevronRight, Lock, AlertTriangle } from 'lucide-react';
import { Button } from './Button';
import { UploadedDocs } from '../types';

interface OnboardingProps {
  onComplete: (docs: UploadedDocs) => void;
  onSkip: () => void; // Optional skip if they want to mail themselves
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete, onSkip }) => {
  const [idFile, setIdFile] = useState<{name: string, data: string} | null>(null);
  const [addressFile, setAddressFile] = useState<{name: string, data: string} | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'id' | 'address') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result as string;
        const fileData = { name: file.name, data: result };
        if (type === 'id') setIdFile(fileData);
        else setAddressFile(fileData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContinue = () => {
    onComplete({
      identity: idFile?.data,
      address: addressFile?.data
    });
  };

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col items-center justify-center p-4 font-sans animate-in fade-in duration-500">
      
      <div className="max-w-2xl w-full">
        
        {/* Header */}
        <div className="text-center mb-10">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-brand-neon text-xs font-bold mb-6 border border-red-100">
               <Shield size={12} className="fill-brand-neon" /> IDENTITY PROTECTION
           </div>
           <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
             Don't let them ignore you.
           </h1>
           <p className="text-lg text-gray-500 max-w-lg mx-auto leading-relaxed">
             The bureaus love to throw out disputes by claiming they "can't verify your identity." Let's attach your proof right now so they have <strong>zero excuses</strong>.
           </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
            
            <div className="p-8 space-y-8">
                
                {/* Upload 1: ID */}
                <div className={`p-6 rounded-2xl border-2 transition-all duration-300 ${idFile ? 'border-green-500 bg-green-50/30' : 'border-dashed border-gray-300 hover:border-brand-neon hover:bg-gray-50'}`}>
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${idFile ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                {idFile ? <CheckCircle2 size={20} /> : '1'}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Photo ID</h3>
                                <p className="text-xs text-gray-500">Driver's License, Passport, or State ID</p>
                            </div>
                        </div>
                        {idFile && (
                            <button onClick={() => setIdFile(null)} className="text-gray-400 hover:text-red-500"><X size={18} /></button>
                        )}
                    </div>

                    {!idFile ? (
                        <div className="relative">
                            <input 
                                type="file" 
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                accept="image/*,.pdf"
                                onChange={(e) => handleFileChange(e, 'id')}
                            />
                            <div className="flex items-center justify-center gap-2 py-8 text-sm font-bold text-brand-neon bg-white rounded-xl border border-gray-100 shadow-sm cursor-pointer group-hover:scale-[1.02] transition-transform">
                                <UploadCloud size={18} /> Upload ID
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-sm text-green-700 font-bold bg-white px-3 py-2 rounded-lg border border-green-200 inline-block">
                            <FileText size={14} /> {idFile.name}
                        </div>
                    )}
                </div>

                {/* Upload 2: Address */}
                <div className={`p-6 rounded-2xl border-2 transition-all duration-300 ${addressFile ? 'border-green-500 bg-green-50/30' : 'border-dashed border-gray-300 hover:border-brand-neon hover:bg-gray-50'}`}>
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${addressFile ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                {addressFile ? <CheckCircle2 size={20} /> : '2'}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Proof of Address</h3>
                                <p className="text-xs text-gray-500">Utility Bill, Bank Statement, or Insurance Card</p>
                            </div>
                        </div>
                        {addressFile && (
                            <button onClick={() => setAddressFile(null)} className="text-gray-400 hover:text-red-500"><X size={18} /></button>
                        )}
                    </div>

                    {!addressFile ? (
                         <div className="relative">
                            <input 
                                type="file" 
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                accept="image/*,.pdf"
                                onChange={(e) => handleFileChange(e, 'address')}
                            />
                            <div className="flex items-center justify-center gap-2 py-8 text-sm font-bold text-brand-neon bg-white rounded-xl border border-gray-100 shadow-sm cursor-pointer group-hover:scale-[1.02] transition-transform">
                                <UploadCloud size={18} /> Upload Proof
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-sm text-green-700 font-bold bg-white px-3 py-2 rounded-lg border border-green-200 inline-block">
                            <FileText size={14} /> {addressFile.name}
                        </div>
                    )}
                </div>

            </div>

            <div className="bg-gray-50 px-8 py-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                    <Lock size={12} /> Documents encrypted & auto-deleted after mailing.
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <button onClick={onSkip} className="text-xs font-bold text-gray-400 hover:text-gray-600">
                        I'll attach them myself
                    </button>
                    <Button 
                        onClick={handleContinue} 
                        disabled={!idFile || !addressFile}
                        className="h-12 px-8 shadow-lg shadow-green-900/10"
                        icon={<ChevronRight size={18} />}
                    >
                        Attach & Continue
                    </Button>
                </div>
            </div>

        </div>

        <div className="mt-8 bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3 text-blue-800 text-xs leading-relaxed">
            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
            <p>
                <strong>Buddy Tip:</strong> 40% of disputes fail because the bureau claims they "don't know who you are." Attaching these two documents makes that excuse impossible.
            </p>
        </div>

      </div>
    </div>
  );
};
