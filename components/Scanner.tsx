
import React, { useState, useRef, useCallback } from 'react';
import { UploadCloud, FileText, AlertCircle, File as FileIcon, X, Image as ImageIcon, ScanLine, Sparkles, ExternalLink, Shield } from 'lucide-react';
import { Button } from './Button';
import { ScanInput } from '../types';

interface ScannerProps {
  onScan: (input: ScanInput) => void;
  isAnalyzing: boolean;
  mascotSrc?: string;
}

const SAMPLE_REPORT = `
CREDIT REPORT - TRANSUNION
Date: 10/15/2023

ACCOUNTS
-------------------------
CHASE BANK NA
Account #: 44008812****
Status: Charge Off
Balance: $1,250
Opened: 01/2019
Remarks: Payment after charge off/collection

MIDLAND CREDIT MGMT
Account #: 898912****
Status: Collection
Balance: $450
Original Creditor: T-Mobile
Opened: 05/2021
Remarks: Placed for collection

CAPITAL ONE
Account #: 517800****
Status: 30 Days Past Due
Balance: $125
Opened: 03/2020
`;

export const Scanner: React.FC<ScannerProps> = ({ onScan, isAnalyzing, mascotSrc }) => {
  const [text, setText] = useState('');
  const [fileData, setFileData] = useState<{ name: string, type: string, data: string } | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLoadSample = () => {
    setText(SAMPLE_REPORT.trim());
    setFileData(null);
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const processFile = (file: File) => {
    if (file.type.startsWith('image/') || file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        const base64Data = result.split(',')[1];
        setFileData({
          name: file.name,
          type: file.type,
          data: base64Data
        });
        setText('');
      };
      reader.readAsDataURL(file);
    } else if (file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setText(e.target?.result as string);
        setFileData(null);
      };
      reader.readAsText(file);
    } else {
      alert("Unsupported file type. Please upload a PDF, Image (JPG, PNG), or Text file.");
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleInitializeScan = () => {
    if (fileData) {
      onScan({
        type: 'file',
        value: fileData.data,
        mimeType: fileData.type
      });
    } else if (text) {
      onScan({
        type: 'text',
        value: text
      });
    }
  };

  const clearFile = () => {
    setFileData(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const getIconForFile = (type: string) => {
    if (type === 'application/pdf') return <FileText size={20} />;
    if (type.startsWith('image/')) return <ImageIcon size={20} />;
    return <FileIcon size={20} />;
  };

  return (
    <div className="max-w-3xl mx-auto w-full animate-in fade-in slide-in-from-bottom-8 duration-500 pt-8 px-4 mb-20">
      <div className="bg-white rounded-2xl overflow-hidden shadow-2xl relative border border-gray-200 ring-4 ring-gray-100">
        {/* Glow decoration */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-neon via-gray-900 to-brand-neon"></div>

        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <ScanLine size={20} className="text-brand-neon" />
                Scan Credit Report
            </h2>
            <p className="text-gray-500 text-xs mt-1">
                Upload PDF or image to detect errors.
            </p>
          </div>
        </div>

        <div className="p-6 space-y-6 bg-white">
          
          {/* HELP: Report Resources Banner */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden group">
             <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-900 shadow-sm group-hover:scale-110 transition-transform">
                   <Shield size={18} className="text-brand-neon" />
                </div>
                <div>
                   <h3 className="text-sm font-black text-gray-900">Need your credit report?</h3>
                   <p className="text-[10px] text-gray-500 font-medium mt-0.5">Download it officially to start scanning.</p>
                </div>
             </div>
             
             <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto relative z-10">
                 <a 
                   href="https://www.annualcreditreport.com" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="w-full sm:w-auto text-[10px] font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                 >
                   Official Free Report <ExternalLink size={10} />
                 </a>
                 <a
                    href="#" 
                    onClick={(e) => e.preventDefault()}
                    className="w-full sm:w-auto text-[10px] font-bold text-white bg-gray-900 hover:bg-black px-3 py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-gray-900/10 cursor-pointer"
                 >
                    Get 3-Bureau Monitoring <ExternalLink size={10} />
                 </a>
             </div>
          </div>

          {/* Drag & Drop Zone - Compact */}
          {!fileData ? (
            <div 
              className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 text-center cursor-pointer group relative
                ${dragActive 
                  ? 'border-brand-neon bg-red-50 scale-[1.01]' 
                  : 'border-gray-300 bg-gray-50 hover:border-brand-neon hover:bg-gray-50'
                }`}
              onDragEnter={handleDrag} 
              onDragLeave={handleDrag} 
              onDragOver={handleDrag} 
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                ref={fileInputRef}
                type="file" 
                className="hidden" 
                accept="image/png, image/jpeg, image/webp, application/pdf, .txt"
                onChange={handleChange}
              />
              
              <div className="flex flex-row items-center justify-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 ${dragActive ? 'text-brand-neon border-brand-neon' : 'text-gray-400'}`}>
                  <UploadCloud size={20} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-900">
                    Drop file here or click to browse
                  </p>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    PDF, JPG, PNG, or TXT
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="border border-gray-200 bg-gray-50 rounded-xl p-3 flex items-center justify-between animate-in fade-in">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-brand-neon shadow-sm border border-gray-200">
                  {getIconForFile(fileData.type)}
                </div>
                <div>
                  <p className="text-gray-900 font-bold text-sm">{fileData.name}</p>
                  <p className="text-[10px] text-gray-500 uppercase font-mono font-bold tracking-wider">
                    {fileData.type === 'application/pdf' ? 'PDF DOCUMENT' : 'IMAGE FILE'}
                  </p>
                </div>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); clearFile(); }}
                className="w-6 h-6 flex items-center justify-center hover:bg-gray-200 rounded-full transition-colors text-gray-400 hover:text-red-500"
              >
                <X size={14} />
              </button>
            </div>
          )}

          <div className="relative flex items-center py-1">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-3 text-gray-300 text-[10px] font-bold uppercase tracking-widest">Or Manual Entry</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => { setText(e.target.value); setFileData(null); }}
              placeholder="Paste credit report text here..."
              disabled={!!fileData}
              className={`w-full h-20 bg-gray-50 text-gray-900 border rounded-xl p-3 font-mono text-xs outline-none transition-all resize-none
                ${fileData ? 'opacity-50 border-gray-200 cursor-not-allowed' : 'border-gray-200 focus:border-brand-neon focus:ring-1 focus:ring-brand-neon/50 focus:bg-white'}`}
            />
            {!text && !fileData && (
              <div className="absolute bottom-2 right-2">
                 <button 
                  onClick={handleLoadSample}
                  className="text-[10px] font-bold flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors bg-white border border-gray-200 px-2 py-1 rounded shadow-sm"
                >
                  <Sparkles size={10} /> Auto-Fill Sample
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-start gap-1.5 text-[10px] text-gray-400 max-w-xs">
              <AlertCircle size={12} className="shrink-0 mt-0.5 text-gray-300" />
              <p>Encrypted session. Data is auto-deleted.</p>
            </div>
            <Button 
              onClick={handleInitializeScan} 
              disabled={(!text && !fileData) || isAnalyzing}
              isLoading={isAnalyzing}
              className="w-full sm:w-auto h-10 text-sm px-6 shadow-lg shadow-red-900/10"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Report'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
