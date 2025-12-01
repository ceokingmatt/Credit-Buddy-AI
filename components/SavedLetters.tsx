
import React, { useState } from 'react';
import { GeneratedLetter, ClientInfo } from '../types';
import { FileText, Plus, Clock, CheckCircle2, Send, LayoutDashboard, ArrowUpRight, Users, Trash2, RefreshCw, ShieldAlert, ChevronRight, User, Gift, Wallet, CalendarDays, Search, TrendingUp, Activity, BarChart3, UploadCloud, Mail, Bell, Crown, Eye, Lock, Shield, Check, AlertCircle, FolderOpen, Flag, Trophy, Zap, X, CreditCard, Settings, BellRing, MailCheck, Smartphone, ToggleRight, ToggleLeft, Phone, LogOut } from 'lucide-react';
import { Button } from './Button';
import { UpgradeModal } from './UpgradeModal';

interface SavedLettersProps {
  letters: GeneratedLetter[];
  clientInfo?: ClientInfo;
  isPro?: boolean;
  onView: (letter: GeneratedLetter) => void;
  onNew: () => void;
  onUpgrade: () => void;
  onLogout: () => void;
  mascotSrc?: string;
}

// Client Data Structure
interface ClientProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  score: number;
  scoreChange: number;
  itemsDeleted: number;
  itemsUpdated: number;
  isPro?: boolean;
  totalAccounts: number;
  creditAge: string;
  inquiries: number;
  usage: number;
  paymentHistory: number;
  currentRound: number; // Added to track progress
}

export const SavedLetters: React.FC<SavedLettersProps> = ({ letters = [], clientInfo, isPro = false, onView, onNew, onUpgrade, onLogout, mascotSrc }) => {
  
  const activeTabState = useState<'overview' | 'disputes' | 'mailing' | 'documents' | 'settings'>('overview');
  const activeTab = activeTabState[0];
  const setActiveTab = activeTabState[1];
  
  // State for Upgrade Modal
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const displayLetters = letters; 
  // Show next steps if there are ANY active letters in the portal (Ready or Mailed)
  const activeDisputes = displayLetters.length;

  // Calculate current round based on letters, default to 1 if new
  const calculatedRound = displayLetters.length > 0 
    ? Math.max(...displayLetters.map(l => l.round)) 
    : 1;
  
  // Single Client Profile (Main User)
  const activeClient: ClientProfile = { 
      id: 'user-1', 
      name: clientInfo?.fullName || 'My Profile', 
      email: clientInfo?.email || 'user@example.com',
      phone: clientInfo?.phone || '(555) 000-0000',
      score: 524, 
      scoreChange: 0, 
      itemsDeleted: 0, 
      itemsUpdated: 0,
      isPro: isPro, 
      totalAccounts: 17, 
      creditAge: '4y 2m',
      inquiries: 3,
      usage: 12,
      paymentHistory: 98,
      currentRound: calculatedRound 
  };

  // State for Settings Form
  const [contactEmail, setContactEmail] = useState(activeClient.email);
  const [contactPhone, setContactPhone] = useState(activeClient.phone);

  // Mock Active Accounts - Compact Data
  const activeAccounts = [
    { id: 'acc-1', creditor: 'CHASE BANK NA', accountNum: '4400-8812-9102', status: 'In Dispute', type: 'Charge Off', bureaus: ['TU', 'EX', 'EQ'] },
    { id: 'acc-2', creditor: 'MIDLAND CREDIT', accountNum: '8989-1223-4567', status: 'In Dispute', type: 'Collection', bureaus: ['TU', 'EQ'] },
    { id: 'acc-3', creditor: 'CAPITAL ONE', accountNum: '5178-0099-1234', status: 'In Dispute', type: 'Late Payment', bureaus: ['EX'] }
  ];

  // Mock Document State
  const [documents, setDocuments] = useState<{
    id: { name: string; date: string } | null;
    address: { name: string; date: string } | null;
    ssn: { name: string; date: string } | null;
    results: { name: string; date: string }[] | null;
  }>({
    id: null,
    address: null,
    ssn: null,
    results: []
  });

  // Notification Preferences State
  const [notifications, setNotifications] = useState({
    rounds: true,
    score: true,
    billing: true,
    marketing: false
  });
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [lastSentTime, setLastSentTime] = useState<string | null>(null);

  const handleDocUpload = (type: 'id' | 'address' | 'ssn' | 'results', e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const newDoc = { name: file.name, date: new Date().toLocaleDateString() };
        
        if (type === 'results') {
            setDocuments(prev => ({
                ...prev,
                results: prev.results ? [...prev.results, newDoc] : [newDoc]
            }));
        } else {
            setDocuments(prev => ({
                ...prev,
                [type]: newDoc
            }));
        }
    }
  };

  const handleDeleteDoc = (type: 'id' | 'address' | 'ssn' | 'results', index?: number) => {
      if (type === 'results' && index !== undefined) {
          setDocuments(prev => ({
              ...prev,
              results: prev.results ? prev.results.filter((_, i) => i !== index) : []
          }));
      } else {
          setDocuments(prev => ({ ...prev, [type]: null }));
      }
  };
  
  const handleUpgradeClick = () => {
    setShowUpgradeModal(true);
  };

  const handleSendTestEmail = () => {
    setIsSendingTest(true);
    setTimeout(() => {
        setIsSendingTest(false);
        setLastSentTime(new Date().toLocaleTimeString());
    }, 1500);
  };

  const toggleNotification = (key: keyof typeof notifications) => {
      setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getRoadmapSteps = (currentRound: number) => {
      if (currentRound <= 3) {
          return [
            { num: 0, title: 'Analysis', desc: 'Scan & Strategy', icon: Search },
            { num: 1, title: 'Round 1', desc: 'Factual Disputes', icon: Send },
            { num: 2, title: 'Round 2', desc: 'Procedural Demand', icon: RefreshCw },
            { num: 3, title: 'Round 3', desc: 'Legal Enforcement', icon: ShieldAlert },
            { num: 999, title: 'Victory', desc: 'Clean Report', icon: Trophy },
          ];
      } 
      
      return [
          { num: 0, title: 'Analysis', desc: 'Scan & Strategy', icon: Search },
          { num: currentRound - 1, title: `Round ${currentRound - 1}`, desc: 'Previous Round', icon: RefreshCw },
          { num: currentRound, title: `Round ${currentRound}`, desc: 'Current Dispute', icon: ShieldAlert },
          { num: currentRound + 1, title: `Round ${currentRound + 1}`, desc: 'Next Escalation', icon: Send },
          { num: 999, title: 'Victory', desc: 'Clean Report', icon: Trophy },
      ];
  };

  const roadmapSteps = getRoadmapSteps(activeClient.currentRound);
  const currentStepIndex = roadmapSteps.findIndex(s => s.num === activeClient.currentRound);
  const totalSteps = roadmapSteps.length;
  const progressPercent = activeClient.currentRound >= 999 ? 100 : ((currentStepIndex) / (totalSteps - 1)) * 100;


  return (
    <div className="w-full animate-in fade-in duration-500 bg-gray-50/50 min-h-screen font-sans">
      
      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <UpgradeModal 
          onClose={() => setShowUpgradeModal(false)} 
          onConfirm={() => {
            setShowUpgradeModal(false);
            onUpgrade();
          }} 
        />
      )}
      
      {/* Top Header Section */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-30">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-0.5">
                        <div className="inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-red-50 text-brand-neon text-[10px] font-bold uppercase border border-red-100">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-neon animate-pulse"></div>
                            Portal Online
                        </div>
                        <span className="text-gray-300 text-[10px]">•</span>
                        <span className="text-gray-500 text-[10px] font-medium">Last updated: Just now</span>
                    </div>
                    <h1 className="text-xl font-black text-gray-900 tracking-tight">Dispute Center</h1>
                </div>
            </div>

            <div className="flex items-center gap-2">
                 <Button 
                    onClick={onNew} 
                    variant="secondary"
                    className="h-8 text-xs border-gray-200 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300"
                    icon={<UploadCloud size={14} />}
                 >
                    Update Report
                 </Button>
                 <Button onClick={onNew} icon={<Plus size={14} />} className="h-8 text-xs shadow-brand-neon/20">
                    New Dispute Round
                 </Button>
            </div>
          </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT SIDEBAR navigation */}
        <div className="lg:col-span-3 space-y-4">
            
            {/* User Profile Card */}
            <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-100">
                <div className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                   <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold border border-gray-200 overflow-hidden">
                          <User size={16} className="text-gray-500" />
                      </div>
                      <div className="text-left">
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Welcome Back</p>
                          <p className="text-sm font-bold text-gray-900">{activeClient.name}</p>
                      </div>
                   </div>
                </div>
            </div>

            {/* Navigation Menu */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <nav className="flex flex-col p-1.5">
                    {[
                        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                        { id: 'disputes', label: 'Dispute Center', icon: ShieldAlert },
                        { id: 'mailing', label: 'Mailing History', icon: Send },
                        { id: 'documents', label: 'My Documents', icon: FileText },
                        { id: 'settings', label: 'Settings', icon: Settings },
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id as any)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-all ${
                                activeTab === item.id 
                                ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20' 
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                        >
                            <item.icon size={16} className={activeTab === item.id ? "text-brand-neon" : ""} />
                            {item.label}
                        </button>
                    ))}
                    
                    {!activeClient.isPro && (
                        <div className="px-1 pt-1">
                            <button 
                                onClick={handleUpgradeClick}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-all bg-gray-900 text-white border border-gray-800 hover:shadow-lg hover:shadow-gray-900/20 hover:scale-[1.02] group"
                            >
                                <Crown size={16} className="text-brand-neon group-hover:text-white transition-colors" />
                                Upgrade to Pro
                            </button>
                        </div>
                    )}
                    
                    <div className="my-1 border-t border-gray-100"></div>
                     <button
                        onClick={onLogout}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all w-full text-left"
                    >
                        <LogOut size={16} />
                        Log Out
                    </button>
                </nav>
            </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="lg:col-span-9 space-y-4">
            
            {/* TAB: OVERVIEW */}
            {activeTab === 'overview' && (
                <>
                    {/* 🏆 DISPUTE JOURNEY ROADMAP - Compact */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-5 md:p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-3">
                            <div>
                                <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
                                    <Flag size={18} className="text-brand-neon" /> 
                                    Dispute Journey
                                </h3>
                                <p className="text-gray-500 text-xs">You are currently in <span className="text-gray-900 font-bold">Round {activeClient.currentRound}</span>. Keep pushing.</p>
                            </div>
                            <div className="bg-gray-50 px-3 py-1.5 rounded border border-gray-100 flex items-center gap-2">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Est. Completion</span>
                                <span className="text-xs font-bold text-gray-900">Nov 2025</span>
                            </div>
                        </div>

                        <div className="relative mb-2">
                             {/* Progress Bar Background */}
                             <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 rounded-full -translate-y-1/2 z-0"></div>
                             {/* Active Progress */}
                             <div 
                                className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-red-600 to-brand-neon rounded-full -translate-y-1/2 z-0 transition-all duration-1000"
                                style={{ width: `${progressPercent}%` }}
                             ></div>

                             {/* Steps */}
                             <div className="relative z-10 flex justify-between items-center w-full">
                                {roadmapSteps.map((step) => {
                                    const isVictory = step.num === 999;
                                    const isCompleted = isVictory ? false : activeClient.currentRound > step.num;
                                    const isCurrent = activeClient.currentRound === step.num;
                                    
                                    return (
                                        <div key={step.num} className="flex flex-col items-center group">
                                            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500 shadow-sm ${
                                                isCompleted ? 'bg-gray-900 border-gray-900 text-white' :
                                                isCurrent ? 'bg-white border-brand-neon text-brand-neon scale-110 shadow-lg shadow-red-900/20' :
                                                'bg-white border-gray-200 text-gray-300'
                                            }`}>
                                                {isCompleted ? <Check size={14} strokeWidth={4} /> : <step.icon size={isCurrent ? 18 : 14} />}
                                            </div>
                                            <div className="mt-2 text-center hidden md:block">
                                                <p className={`text-[10px] font-bold ${isCurrent ? 'text-gray-900' : 'text-gray-400'}`}>{step.title}</p>
                                                {isCurrent && <p className="text-[9px] text-brand-neon font-bold animate-pulse">In Progress</p>}
                                            </div>
                                        </div>
                                    )
                                })}
                             </div>
                        </div>
                    </div>

                    {/* Next Steps Card - Compact */}
                    {activeDisputes > 0 && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
                            <div className="h-1 w-full bg-gradient-to-r from-brand-neon via-gray-900 to-black"></div>
                            <div className="p-5 md:p-6">
                                <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="p-1 bg-blue-50 text-blue-600 rounded"><Bell size={14} /></div>
                                            <h3 className="text-base font-black text-gray-900">Next Steps: The 30-Day Watch</h3>
                                        </div>
                                        <p className="text-gray-500 text-xs leading-relaxed mb-4">
                                            The bureaus legally have <strong>30 business days</strong> to investigate and respond.
                                        </p>
                                        <div className="space-y-2">
                                            <div className="flex items-start gap-2">
                                                <div className="mt-0.5 w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600">1</div>
                                                <p className="text-xs text-gray-700"><strong>Check your mailbox.</strong> Responses will come via physical mail.</p>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <div className="mt-0.5 w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600">2</div>
                                                <p className="text-xs text-gray-700"><strong>Upload results here.</strong> When you get a letter, hit "Update Report".</p>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <div className="mt-0.5 w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600">3</div>
                                                <p className="text-xs text-gray-700"><strong>Start Round {activeClient.currentRound + 1}.</strong> If they didn't delete it, we hit them again.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-64 shrink-0">
                                        {activeClient.isPro ? (
                                            <div className="bg-green-50 rounded-lg p-4 border border-green-100 text-center h-full flex flex-col justify-center">
                                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-green-600 mx-auto mb-2 shadow-sm"><Eye size={20} /></div>
                                                <h4 className="font-bold text-green-900 text-sm mb-0.5">We're Watching For You</h4>
                                                <p className="text-[10px] text-green-700/80 leading-relaxed">Since you're Pro, our AI checks your file daily.</p>
                                            </div>
                                        ) : (
                                            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 text-center h-full flex flex-col justify-center relative overflow-hidden group">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-neon/10 blur-2xl rounded-full"></div>
                                                <div className="relative z-10">
                                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-brand-neon mx-auto mb-2 border border-white/5"><Crown size={20} /></div>
                                                    <h4 className="font-bold text-white text-sm mb-1">Tired of checking the mail?</h4>
                                                    <p className="text-[10px] text-gray-400 leading-relaxed mb-3">Upgrade to Pro and let Buddy track your responses.</p>
                                                    <button onClick={handleUpgradeClick} className="w-full py-2 bg-brand-neon hover:bg-red-600 text-white text-[10px] font-bold rounded transition-colors shadow-lg shadow-red-900/20">Upgrade ($29/mo)</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Score Cards - Compact */}
                    <div className="grid md:grid-cols-4 gap-4">
                        <div className="md:col-span-2 bg-white p-5 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden group hover:border-brand-neon/30 transition-all">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Credit Score</p>
                                    <h3 className="text-2xl font-black text-gray-900 mt-0.5">{activeClient.score}</h3>
                                </div>
                                {activeClient.scoreChange !== 0 && (
                                  <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold ${activeClient.scoreChange > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                      <TrendingUp size={12} />
                                      {activeClient.scoreChange > 0 ? '+' : ''}{activeClient.scoreChange}
                                  </div>
                                )}
                            </div>
                            <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-brand-neon rounded-full" 
                                    style={{ width: `${(activeClient.score / 850) * 100}%` }}
                                ></div>
                            </div>
                            <p className="text-[9px] text-gray-400 mt-2 font-medium">TransUnion • Updated Today</p>
                        </div>

                        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden group hover:border-brand-neon/30 transition-all">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Deletions</p>
                                    <h3 className="text-2xl font-black text-gray-900 mt-0.5">{activeClient.itemsDeleted}</h3>
                                </div>
                                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-neon">
                                    <Trash2 size={16} />
                                </div>
                            </div>
                            <p className="text-[10px] text-gray-500 font-medium"><span className="text-gray-900 font-bold">{activeClient.itemsUpdated}</span> items repaired</p>
                        </div>

                        <div onClick={onNew} className="bg-gray-900 p-5 rounded-xl shadow-lg border border-gray-800 relative overflow-hidden group cursor-pointer hover:bg-gray-800 transition-all">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-brand-neon/10 blur-2xl rounded-full group-hover:bg-brand-neon/20 transition-all"></div>
                            <div className="flex flex-col h-full justify-between relative z-10">
                                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white mb-2"><UploadCloud size={16} /></div>
                                <div>
                                    <h3 className="text-white font-bold text-sm leading-tight mb-0.5">Upload New Report</h3>
                                    <p className="text-gray-400 text-[10px] font-medium">Refresh score & data</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Account Health - Compact */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2"><BarChart3 size={16} className="text-gray-400" /> Account Health</h3>
                        </div>
                        <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="text-center border-r border-gray-100 last:border-0">
                                <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">Total Accounts</p>
                                <p className="text-xl font-black text-gray-900">{activeClient.totalAccounts}</p>
                            </div>
                            <div className="text-center border-r border-gray-100 last:border-0">
                                <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">Credit Age</p>
                                <p className="text-xl font-black text-gray-900">{activeClient.creditAge}</p>
                            </div>
                            <div className="text-center border-r border-gray-100 last:border-0">
                                <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">Hard Inquiries</p>
                                <p className={`text-xl font-black ${activeClient.inquiries > 4 ? 'text-red-600' : 'text-gray-900'}`}>{activeClient.inquiries}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">Utilization</p>
                                <p className="text-xl font-black text-gray-900">{activeClient.usage}%</p>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* TAB: DOCUMENTS (Compact) */}
            {activeTab === 'documents' && (
                <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex gap-3 text-blue-900 text-xs">
                        <Shield size={18} className="shrink-0 text-blue-600" />
                        <div>
                            <p className="font-bold mb-0.5">Document Locker</p>
                            <p className="text-blue-700/80 text-[10px] leading-relaxed">
                                Upload your identification to prevent frivolous rejections, and store your dispute results here to track progress.
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
                        {[
                            { key: 'id' as const, label: 'Photo ID', desc: "Driver's License or Passport", icon: User },
                            { key: 'address' as const, label: 'Proof of Address', desc: "Utility Bill or Bank Statement", icon: Mail },
                            { key: 'ssn' as const, label: 'SSN Card', desc: "Social Security Card", icon: Lock },
                            { key: 'results' as const, label: 'Upload Document', desc: "Bureau Responses & Letters", icon: FolderOpen }
                        ].map((doc) => (
                            <div key={doc.key} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 relative overflow-hidden group">
                                {doc.key === 'results' ? (
                                    <>
                                        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 mb-3 group-hover:bg-brand-neon/10 group-hover:text-brand-neon transition-colors">
                                            <doc.icon size={20} />
                                        </div>
                                        <h3 className="font-bold text-gray-900 mb-1 text-sm">{doc.label}</h3>
                                        <div className="min-h-[50px] mb-3">
                                            {documents.results && documents.results.length > 0 ? (
                                                <ul className="space-y-1">
                                                    {documents.results.map((file, idx) => (
                                                        <li key={idx} className="flex items-center justify-between text-[10px] bg-gray-50 p-1.5 rounded border border-gray-100">
                                                            <span className="truncate max-w-[100px] text-gray-700">{file.name}</span>
                                                            <button onClick={() => handleDeleteDoc('results', idx)} className="text-red-400 hover:text-red-600"><X size={12} /></button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-[10px] text-gray-500">{doc.desc}</p>
                                            )}
                                        </div>
                                        
                                        <label className="w-full flex items-center justify-center gap-2 py-2 bg-gray-900 text-white text-[10px] font-bold rounded cursor-pointer hover:bg-black transition-colors shadow-lg shadow-gray-900/10">
                                            <Plus size={12} /> Add File
                                            <input type="file" className="hidden" accept="image/*,.pdf" onChange={(e) => handleDocUpload(doc.key, e)} />
                                        </label>
                                    </>
                                ) : (
                                    documents[doc.key] ? (
                                        <>
                                            <div className="absolute top-3 right-3 text-green-500">
                                                <CheckCircle2 size={20} fill="#ecfdf5" />
                                            </div>
                                            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600 mb-3">
                                                <doc.icon size={20} />
                                            </div>
                                            <h3 className="font-bold text-gray-900 mb-0.5 text-sm">{doc.label}</h3>
                                            <p className="text-[10px] text-green-600 font-medium mb-4">Uploaded on {documents[doc.key]?.date}</p>
                                            <div className="flex gap-2">
                                                <button className="flex-1 py-1.5 text-[10px] font-bold border border-gray-200 rounded text-gray-600 hover:bg-gray-50">View</button>
                                                <button 
                                                    onClick={() => handleDeleteDoc(doc.key)}
                                                    className="px-2 py-1.5 text-red-500 hover:bg-red-50 rounded border border-transparent hover:border-red-100"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 mb-3 group-hover:bg-brand-neon/10 group-hover:text-brand-neon transition-colors">
                                                <doc.icon size={20} />
                                            </div>
                                            <h3 className="font-bold text-gray-900 mb-0.5 text-sm">{doc.label}</h3>
                                            <p className="text-[10px] text-gray-500 mb-4">{doc.desc}</p>
                                            
                                            <label className="w-full flex items-center justify-center gap-2 py-2 bg-gray-900 text-white text-[10px] font-bold rounded cursor-pointer hover:bg-black transition-colors shadow-lg shadow-gray-900/10">
                                                <UploadCloud size={12} /> Upload File
                                                <input type="file" className="hidden" accept="image/*,.pdf" onChange={(e) => handleDocUpload(doc.key, e)} />
                                            </label>
                                        </>
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* TAB: DISPUTES - NEW SECTION: ACTIVE ACCOUNTS */}
            {activeTab === 'disputes' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-4">
                    <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
                            <CreditCard size={16} className="text-gray-500" /> Accounts in Dispute
                        </h3>
                        <div className="flex items-center gap-2">
                             <span className="flex h-1.5 w-1.5 rounded-full bg-brand-neon animate-pulse"></span>
                             <span className="text-[10px] font-bold text-gray-500">Live Updates</span>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {activeAccounts.map((acc) => (
                             <div key={acc.id} className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600">
                                        <CreditCard size={16} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">{acc.creditor}</h4>
                                        <div className="flex items-center gap-2 text-[10px] text-gray-500">
                                            <span className="font-mono">{acc.accountNum}</span>
                                            <span className="px-1.5 py-0.5 rounded bg-red-50 text-red-600 font-bold uppercase">{acc.type}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                     <div className="flex -space-x-1.5">
                                        {acc.bureaus.includes('TU') && <div className="w-5 h-5 rounded-full bg-cyan-500 border border-white text-[7px] font-bold text-white flex items-center justify-center shadow-sm" title="TransUnion">TU</div>}
                                        {acc.bureaus.includes('EX') && <div className="w-5 h-5 rounded-full bg-blue-600 border border-white text-[7px] font-bold text-white flex items-center justify-center shadow-sm" title="Experian">EX</div>}
                                        {acc.bureaus.includes('EQ') && <div className="w-5 h-5 rounded-full bg-red-600 border border-white text-[7px] font-bold text-white flex items-center justify-center shadow-sm" title="Equifax">EQ</div>}
                                     </div>
                                     <div className="px-2 py-0.5 rounded-full bg-yellow-50 text-yellow-700 text-[10px] font-bold border border-yellow-100 flex items-center gap-1">
                                         <div className="w-1 h-1 rounded-full bg-yellow-500 animate-pulse"></div>
                                         {acc.status}
                                     </div>
                                </div>
                             </div>
                        ))}
                    </div>
                </div>
            )}

            {/* SHARED: Recent Activity List */}
            {(activeTab === 'disputes' || activeTab === 'mailing') && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
                            {activeTab === 'disputes' ? <ShieldAlert size={16} /> : <Send size={16} />}
                            {activeTab === 'disputes' ? 'Dispute Letters' : 'Mailing History'}
                        </h3>
                        <div className="flex gap-2">
                            <button className="p-1.5 hover:bg-white rounded text-gray-400 hover:text-gray-900 transition-colors"><Search size={14} /></button>
                        </div>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {displayLetters.length === 0 ? (
                            <div className="p-8 text-center">
                                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-300"><FileText size={24} /></div>
                                <h3 className="text-gray-900 font-bold mb-0.5 text-sm">No history found</h3>
                                <p className="text-gray-500 text-xs mb-4">Start a scan to generate new records.</p>
                                <Button onClick={onNew} className="mx-auto h-8 px-4 text-xs">Start New Scan</Button>
                            </div>
                        ) : (
                            displayLetters.map((letter) => (
                                <div key={letter.id} className="p-3 hover:bg-gray-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3 group">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black shadow-sm ${
                                            letter.bureau === 'Experian' ? 'bg-blue-50 text-blue-600' :
                                            letter.bureau === 'TransUnion' ? 'bg-cyan-50 text-cyan-600' :
                                            'bg-red-50 text-red-600'
                                        }`}>
                                            {letter.bureau.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-xs">{letter.bureau} Dispute - Round {letter.round}</p>
                                            <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-0.5">
                                                <span className="font-mono">{new Date(letter.createdAt).toLocaleDateString()}</span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1">
                                                    {letter.status === 'mailed' ? (
                                                        <span className="text-green-600 font-bold flex items-center gap-1"><CheckCircle2 size={10} /> Mailed</span>
                                                    ) : (
                                                        <span className="text-orange-500 font-bold flex items-center gap-1"><Clock size={10} /> Ready</span>
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3">
                                        <button 
                                          onClick={() => onView(letter)}
                                          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-[10px] font-bold rounded-lg hover:border-gray-300 hover:text-gray-900 transition-all shadow-sm group-hover:shadow-md"
                                        >
                                            View Letter
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
            
            {/* TAB: SETTINGS & NOTIFICATIONS - Compact */}
            {activeTab === 'settings' && (
                <div className="space-y-4">
                    {/* NEW: Contact Info Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2 bg-gray-50/50">
                            <User size={16} className="text-gray-900" />
                            <div>
                                <h3 className="font-bold text-gray-900 text-sm">Contact Information</h3>
                                <p className="text-[10px] text-gray-500">Where should we send your results?</p>
                            </div>
                        </div>
                        <div className="p-5 grid md:grid-cols-2 gap-5">
                            <div>
                                <label className="text-[10px] font-bold text-gray-500 mb-1 block">Account Email</label>
                                <div className="relative">
                                    <input 
                                        type="email" 
                                        value={contactEmail}
                                        onChange={(e) => setContactEmail(e.target.value)}
                                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 pl-9 text-sm font-bold text-gray-900 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all"
                                    />
                                    <Mail className="absolute left-3 top-2.5 text-gray-400" size={14} />
                                    <div className="absolute right-2 top-2.5 flex items-center gap-1 text-[9px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full border border-green-100">
                                        <CheckCircle2 size={10} /> Verified
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-gray-500 mb-1 block">Mobile Phone</label>
                                <div className="relative">
                                    <input 
                                        type="tel" 
                                        value={contactPhone}
                                        onChange={(e) => setContactPhone(e.target.value)}
                                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 pl-9 text-sm font-bold text-gray-900 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all"
                                    />
                                    <Phone className="absolute left-3 top-2.5 text-gray-400" size={14} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2 bg-gray-50/50">
                            <BellRing size={16} className="text-gray-900" />
                            <div>
                                <h3 className="font-bold text-gray-900 text-sm">Email Notifications</h3>
                                <p className="text-[10px] text-gray-500">Manage what alerts you receive.</p>
                            </div>
                        </div>
                        <div className="p-5 space-y-4">
                            {[
                                { 
                                    key: 'rounds', 
                                    label: 'Dispute Round Updates', 
                                    desc: 'Get notified when letters are mailed or delivered.', 
                                    icon: MailCheck 
                                },
                                { 
                                    key: 'score', 
                                    label: 'Score Watch', 
                                    desc: 'Alert me when my credit score changes by 5+ points.', 
                                    icon: TrendingUp 
                                },
                                { 
                                    key: 'billing', 
                                    label: 'Payment Reminders', 
                                    desc: 'Receive invoices and upcoming charge notices.', 
                                    icon: CreditCard 
                                }
                            ].map((item) => (
                                <div key={item.key} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                                            <item.icon size={16} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-xs">{item.label}</p>
                                            <p className="text-[10px] text-gray-500">{item.desc}</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => toggleNotification(item.key as keyof typeof notifications)}
                                        className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-200 flex items-center ${
                                            notifications[item.key as keyof typeof notifications] 
                                            ? 'bg-brand-neon justify-end' 
                                            : 'bg-gray-200 justify-start'
                                        }`}
                                    >
                                        <div className="w-4 h-4 rounded-full bg-white shadow-sm"></div>
                                    </button>
                                </div>
                            ))}
                        </div>
                        
                        <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                            <p className="text-[10px] font-bold text-gray-400">Settings auto-save on change.</p>
                            <Button 
                                onClick={handleSendTestEmail} 
                                disabled={isSendingTest}
                                variant="secondary" 
                                className="h-8 text-[10px] border-gray-200"
                                icon={isSendingTest ? undefined : <Smartphone size={12} />}
                            >
                                {isSendingTest ? 'Sending...' : 'Send Test Notification'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

        </div>
      </div>
    </div>
  );
};
