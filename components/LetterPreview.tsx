import React, { useState, useEffect } from 'react';
import { ClientInfo, GeneratedLetter } from '../types';
import { Button } from './Button';
import { Printer, Send, ArrowLeft, Save, FileText, CheckCircle2, Sparkles, MapPin, ShieldCheck, ChevronRight, PenTool } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LetterPreviewProps {
  letters: GeneratedLetter[];
  clientInfo: ClientInfo;
  onBack: () => void;
  onProceed: (updatedLetters: GeneratedLetter[]) => void;
  onSave: (updatedLetters: GeneratedLetter[]) => void;
}

export const LetterPreview: React.FC<LetterPreviewProps> = ({ 
  letters, 
  clientInfo, 
  onBack, 
  onProceed,
  onSave
}) => {
  const [activeLetterId, setActiveLetterId] = useState<string>('');
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  
  // Signature State
  const [signatureName, setSignatureName] = useState(clientInfo.fullName);

  // Initialize edits with original content
  useEffect(() => {
    const initialEdits: Record<string, string> = {};
    letters.forEach(l => {
      if (!edits[l.id]) {
        initialEdits[l.id] = l.content;
      }
    });
    setEdits(prev => ({ ...initialEdits, ...prev }));
    
    // Ensure we set an active letter if none is selected, defaulting to first
    if (letters.length > 0 && (!activeLetterId || !letters.find(l => l.id === activeLetterId))) {
      setActiveLetterId(letters[0].id);
    }
  }, [letters, activeLetterId]);

  const activeLetter = letters.find(l => l.id === activeLetterId) || letters[0];
  const activeContent = edits[activeLetterId] || activeLetter?.content || '';

  const handleContentChange = (newContent: string) => {
    setEdits(prev => ({
      ...prev,
      [activeLetterId]: newContent
    }));
  };

  const getUpdatedLetters = () => {
    return letters.map(l => ({
      ...l,
      content: edits[l.id] || l.content
    }));
  };

  const handlePrint = () => {
    // This triggers the browser's print dialog, which allows "Save as PDF"
    window.print();
  };

  const handleSave = () => {
    setIsSaving(true);
    const duration = 1000;
    const animationEnd = Date.now() + duration;
    // Red, Black, Grey confetti
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100, colors: ['#FF3B30', '#111827', '#E5E7EB'] };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    setTimeout(() => {
      onSave(getUpdatedLetters());
      setIsSaving(false);
    }, 1200);
  };

  if (!activeLetter) return null;

  return (
    <div className="min-h-screen bg-gray-50/50 pb-24 pt-8 px-4 md:px-8 font-sans">
      
      {/* 🟢 HIDDEN PRINT CONTAINER (Visible only when Printing/Saving as PDF) */}
      <div className="hidden printable-document">
        <div>{activeContent}</div>
        
        {/* Render Digital Signature in Print Mode */}
        <div style={{ marginTop: '40px' }}>
             <div className="signature-font" style={{ fontFamily: '"Dancing Script", cursive', fontSize: '24pt' }}>
                 {signatureName}
             </div>
             <p style={{ fontSize: '12pt', marginTop: '5px' }}>{clientInfo.fullName}</p>
        </div>
      </div>
      
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 w-full md:w-auto">
            <button 
              onClick={onBack}
              className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-all shadow-sm"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                 Review Dispute
              </h1>
              <p className="text-sm text-gray-500 font-medium">
                {activeLetter.bureau} • Round {activeLetter.round}
              </p>
            </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
            <Button 
              onClick={handleSave} 
              variant="secondary" 
              className="flex-1 md:flex-none h-10 text-sm font-bold border-gray-200 text-gray-700"
              icon={isSaving ? <CheckCircle2 size={16} /> : <Save size={16} />}
            >
              {isSaving ? 'Saved!' : 'Save Draft'}
            </Button>
            <Button 
              onClick={handlePrint} 
              variant="secondary" 
              className="flex-1 md:flex-none h-10 text-sm font-bold border-gray-200 text-gray-700 hover:border-gray-900 hover:bg-gray-50 transition-colors"
              icon={<Printer size={16} />}
            >
              Print PDF
            </Button>
            <Button 
              onClick={() => onProceed(getUpdatedLetters())}
              className="flex-1 md:flex-none h-10 text-sm font-bold bg-brand-neon hover:bg-red-600 border-none shadow-lg shadow-red-900/20"
              icon={<Send size={16} />}
            >
              Mail Letter
            </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Editor */}
        <div className="lg:col-span-8 space-y-4">
             {/* Tabs */}
             <div className="bg-gray-100/50 p-1 rounded-xl inline-flex w-full md:w-auto">
                {letters.map(letter => (
                    <button
                        key={letter.id}
                        onClick={() => setActiveLetterId(letter.id)}
                        className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 justify-center ${
                            activeLetterId === letter.id 
                            ? 'bg-white text-gray-900 shadow-sm ring-1 ring-black/5' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        {/* Bureau Dot */}
                        <span className={`w-2 h-2 rounded-full ${
                            letter.bureau === 'TransUnion' ? 'bg-cyan-500' :
                            letter.bureau === 'Experian' ? 'bg-blue-700' :
                            'bg-red-600'
                        }`}></span>
                        {letter.bureau}
                    </button>
                ))}
             </div>

             {/* Paper */}
             <div className="bg-white rounded-xl shadow-2xl shadow-gray-200/50 border border-gray-200 min-h-[600px] p-8 md:p-12 relative overflow-hidden flex flex-col">
                {/* Watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] select-none">
                    <ShieldCheck size={400} />
                </div>

                <textarea
                    value={activeContent}
                    onChange={(e) => handleContentChange(e.target.value)}
                    className="w-full flex-grow min-h-[500px] resize-none outline-none font-sans text-sm leading-relaxed text-gray-800 bg-transparent relative z-10"
                    spellCheck={false}
                />
                
                {/* Visual Signature Field (Bottom of Letter) */}
                <div className="mt-8 pt-6 border-t border-gray-100 relative z-10">
                    <p className="text-xs font-bold text-gray-400 uppercase mb-2">Digital Signature</p>
                    <div className="flex items-end gap-4">
                        <div className="font-signature text-3xl text-gray-800" style={{ fontFamily: 'Dancing Script, cursive' }}>
                            {signatureName}
                        </div>
                    </div>
                </div>
             </div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
            
            {/* Signature Tool */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                        <PenTool size={20} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Sign Your Letter</p>
                        <p className="font-bold text-gray-900">Digital Signature</p>
                    </div>
                </div>
                <div>
                     <label className="text-xs font-bold text-gray-500 mb-2 block">Type your name to sign:</label>
                     <input 
                        type="text" 
                        value={signatureName}
                        onChange={(e) => setSignatureName(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-lg font-signature text-gray-900 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon"
                        style={{ fontFamily: 'Dancing Script, cursive' }}
                     />
                     <p className="text-[10px] text-gray-400 mt-2">
                        This signature will be appended to the bottom of all letters in this round.
                     </p>
                </div>
            </div>
            
            {/* Bureau Info Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-900 border border-gray-100">
                        <MapPin size={20} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Recipient</p>
                        <p className="font-bold text-gray-900">{activeLetter.bureau} Dispute Center</p>
                    </div>
                </div>
                <div className="space-y-3">
                     <div className="p-3 bg-gray-50 rounded-xl text-xs font-medium text-gray-600 border border-gray-100">
                        <p className="font-bold text-gray-900 mb-1">Mailing Address:</p>
                        {activeLetter.bureau === 'TransUnion' && (
                            <>P.O. Box 2000<br/>Chester, PA 19016</>
                        )}
                        {activeLetter.bureau === 'Experian' && (
                            <>P.O. Box 4500<br/>Allen, TX 75013</>
                        )}
                        {activeLetter.bureau === 'Equifax' && (
                            <>P.O. Box 740256<br/>Atlanta, GA 30374</>
                        )}
                     </div>
                </div>
            </div>

            {/* AI Analysis Card */}
            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-neon/20 blur-2xl rounded-full"></div>
                
                <div className="flex items-center gap-2 mb-4 relative z-10">
                    <Sparkles size={16} className="text-brand-neon" />
                    <h3 className="font-bold text-white">AI Strategy</h3>
                </div>
                
                <p className="text-sm text-gray-400 leading-relaxed relative z-10">
                    This letter uses <strong>FCRA Section 611</strong> to demand a method of verification. We've also included specific anti-stall language to prevent generic rejection letters.
                </p>

                <div className="mt-6 pt-4 border-t border-gray-800 flex items-center gap-2 relative z-10">
                    <div className="flex -space-x-2">
                         <div className="w-6 h-6 rounded-full bg-gray-700 border border-gray-900"></div>
                         <div className="w-6 h-6 rounded-full bg-gray-600 border border-gray-900"></div>
                         <div className="w-6 h-6 rounded-full bg-gray-500 border border-gray-900"></div>
                    </div>
                    <span className="text-xs font-bold text-gray-400">Verified by 3 Agents</span>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};