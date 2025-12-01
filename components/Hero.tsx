
import React from 'react';
import { ArrowRight, Check, Zap, FileText, TrendingUp, Lock, Mail, CheckCircle2, AlertTriangle, Search, Clock, Sparkles, Database, Scale, ShieldCheck, History, FileWarning, Ban, Gavel, School, AlertOctagon, XCircle, Star, Calendar, Tag, ArrowUpRight, User, Play, PlayCircle } from 'lucide-react';
import { Button } from './Button';

interface HeroProps {
  onStart: () => void;
  onGoToBlog: () => void;
  mascotSrc?: string;
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
  onOpenAdmin?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart, onGoToBlog, mascotSrc, onOpenTerms, onOpenPrivacy, onOpenAdmin }) => {
  const recentPosts = [
    {
      title: "The End of 'Template' Disputes",
      excerpt: "Why credit bureaus are flagging generic templates and how AI-generated unique disputes are achieving 40% higher deletion rates.",
      date: "Oct 15, 2023",
      tag: "AI Strategy",
      imageGrad: "from-red-500/20 to-gray-900/20"
    },
    {
      title: "Mastering Metro 2 Compliance",
      excerpt: "A deep dive into the data format used by e-OSCAR. Learn how to spot 'Header Record' errors.",
      date: "Oct 08, 2023",
      tag: "Technical",
      imageGrad: "from-gray-700/20 to-gray-900/20"
    },
    {
      title: "CFPB Updates for 2024",
      excerpt: "New regulations are shifting the burden of proof heavily onto data furnishers. Here is how to leverage the new rules.",
      date: "Sep 22, 2023",
      tag: "Regulation",
      imageGrad: "from-gray-500/20 to-gray-800/20"
    }
  ];

  return (
    <div className="min-h-screen font-sans overflow-x-hidden relative bg-transparent">
      
      {/* Ambient Lighting - Red/Grey Theme */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-brand-neon/5 rounded-full mix-blend-multiply filter blur-[120px] animate-pulse-slow"></div>
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-gray-200/50 rounded-full mix-blend-multiply filter blur-[100px]"></div>
      </div>

      {/* 🟢 SECTION 1: HERO + 3D VISUAL */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-16 text-center">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-900 border border-gray-800 text-[10px] font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 mx-auto shadow-lg">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                </span>
                <span>AI-Powered Credit Sweep Engine</span>
            </div>
            
            {/* Headline - Scaled Down */}
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 leading-[1.1] mb-6 max-w-4xl mx-auto">
                Fix Your Credit <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neon to-gray-900">Smarter. Faster. Automatic.</span>
            </h1>
            
            {/* Subheadline - Scaled Down */}
            <p className="text-base md:text-lg text-gray-500 leading-relaxed font-medium max-w-2xl mx-auto mb-8">
                Stop using generic templates. Your Credit Buddy scans your report, finds the real problems, and helps you knock those negatives off the right way.
            </p>

            {/* Trusted User Stack - Compact */}
            <div className="flex items-center justify-center gap-3 mb-8">
                <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-gray-500">
                        <User size={16} />
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center text-gray-600">
                         <User size={16} />
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-400 flex items-center justify-center text-gray-100">
                         <User size={16} />
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-900 text-white flex items-center justify-center text-[10px] font-bold">+2k</div>
                </div>
                <div className="text-left">
                    <div className="flex text-yellow-500">
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                    </div>
                    <p className="text-[10px] font-bold text-gray-500">Trusted by 2,400+ users</p>
                </div>
            </div>

            {/* Buttons - Compact Height (h-12 instead of h-16) */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 w-full sm:w-auto mb-12">
                <Button onClick={onStart} className="px-6 py-3 text-sm h-12 rounded-xl shadow-xl shadow-red-900/10 text-white font-bold w-full sm:w-auto bg-gray-900 hover:bg-black border-none ring-0">
                Start Free Scan <ArrowRight className="ml-2" size={16} />
                </Button>
                <button onClick={onGoToBlog} className="px-6 py-3 text-sm h-12 rounded-xl border-2 border-gray-200 text-gray-600 font-bold hover:border-gray-900 hover:text-gray-900 transition-all w-full sm:w-auto bg-white/50 backdrop-blur-sm">
                  View Demo
                </button>
            </div>

            {/* 🟢 3D Visual (The "Picture") - Scaled Down */}
            <div className="relative w-full max-w-2xl mx-auto mt-6 perspective-1000">
                {/* Main Glass Card */}
                <div className="relative bg-white rounded-2xl border border-gray-200 shadow-2xl transform rotate-x-[5deg] transition-transform duration-500 hover:rotate-0 z-20 flex flex-col overflow-hidden mx-auto">
                    <div className="h-10 border-b border-gray-100 bg-gray-50 flex items-center px-4 gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-gray-400"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                    </div>
                    <div className="flex-1 p-6 bg-white relative text-left">
                         <div className="grid md:grid-cols-2 gap-6 items-center">
                            {/* Score Visual */}
                            <div className="text-center">
                                <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-1">TransUnion Score</p>
                                <div className="text-5xl font-black text-gray-900 flex items-center justify-center gap-2">
                                    762
                                    <span className="text-sm font-bold text-white bg-green-600 px-1.5 py-0.5 rounded shadow-sm">+124</span>
                                </div>
                                <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full w-[85%] bg-gradient-to-r from-red-600 to-green-600"></div>
                                </div>
                            </div>
                            {/* Items List */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1 bg-white border border-gray-200 rounded text-gray-900"><Check size={12} strokeWidth={3} /></div>
                                        <span className="font-bold text-xs text-gray-800">Chase Bank Removed</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-900 bg-gray-200 px-1.5 py-0.5 rounded">DELETED</span>
                                </div>
                                <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1 bg-white border border-gray-200 rounded text-gray-900"><Check size={12} strokeWidth={3} /></div>
                                        <span className="font-bold text-xs text-gray-800">Midland Credit Removed</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-900 bg-gray-200 px-1.5 py-0.5 rounded">DELETED</span>
                                </div>
                                <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-gray-100 opacity-60">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1 bg-gray-100 rounded text-gray-500"><Clock size={12} /></div>
                                        <span className="font-bold text-xs text-gray-800">Capital One</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-brand-neon">DISPUTING...</span>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -right-4 lg:-right-8 top-12 bg-gray-900 text-white p-3 rounded-xl shadow-xl z-30 animate-float border border-gray-700 hidden md:block">
                    <div className="flex items-center gap-2">
                        <div className="bg-brand-neon p-1.5 rounded-md">
                            <Zap size={16} className="text-white" fill="currentColor" />
                        </div>
                        <div className="text-left">
                            <p className="text-[10px] text-gray-400 font-bold">Speed</p>
                            <p className="text-xs font-black text-white">Under 60s</p>
                        </div>
                    </div>
                </div>

                {/* Background Blobs behind visual */}
                <div className="absolute inset-0 bg-gradient-to-tr from-gray-200 to-gray-300 opacity-30 blur-3xl -z-10 rounded-full transform scale-90"></div>
            </div>

            {/* 🏦 LOGO STRIP - Reduced Margin */}
            <div className="mt-16 pt-8 border-t border-gray-100">
                <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">As featured in</p>
                <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                    <span className="text-lg font-serif font-bold text-gray-900">Forbes</span>
                    <span className="text-lg font-sans font-black text-gray-900 italic">YAHOO! <span className="font-light not-italic">FINANCE</span></span>
                    <span className="text-lg font-mono font-bold text-gray-900">Business Insider</span>
                    <span className="text-lg font-serif font-bold text-gray-900">CNBC</span>
                </div>
            </div>
      </div>

      {/* 🟢 SECTION 1.5: VIDEO DEMO - Tightened Padding */}
      <div className="bg-white py-16 border-y border-gray-100">
          <div className="max-w-4xl mx-auto px-4 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-brand-neon text-[10px] font-bold mb-4 border border-red-100">
                  <PlayCircle size={12} className="fill-brand-neon" /> SEE IT IN ACTION
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-8">
                  Don't take my word for it. <br/> Watch me work.
              </h2>
              
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200 group cursor-pointer aspect-video bg-gray-900 max-w-3xl mx-auto">
                  {/* Placeholder Image / Thumbnail */}
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-50 group-hover:opacity-40 transition-opacity duration-500"></div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-brand-neon text-white flex items-center justify-center shadow-lg shadow-red-900/40 transform group-hover:scale-110 transition-all duration-300">
                          <Play size={24} fill="currentColor" className="ml-1" />
                      </div>
                  </div>
                  
                  <div className="absolute bottom-6 left-6 text-left">
                      <p className="text-white font-bold text-base">Full Platform Demo</p>
                      <p className="text-gray-300 text-xs">2:14 • 4K Quality</p>
                  </div>
              </div>
          </div>
      </div>

      {/* 🟢 SECTION 2: HOW IT WORKS (ROADMAP STYLE) - Tightened */}
      <div className="bg-white py-20 border-b border-gray-100">
         <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-black text-gray-900 mb-3">System Logic</h2>
                <p className="text-gray-500 text-base">From upload to dispute in 4 automated steps.</p>
            </div>

            {/* ROADMAP CONTAINER */}
            <div className="relative">
                
                {/* Desktop Connecting Line (Horizontal) */}
                <div className="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-gray-100 rounded-full">
                    {/* Animated Pulse Line */}
                    <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-500 to-transparent w-full opacity-50 animate-pulse"></div>
                </div>

                {/* Mobile Connecting Line (Vertical) */}
                <div className="md:hidden absolute top-0 left-6 h-full w-0.5 bg-gray-100 rounded-full">
                    <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-red-500 to-transparent h-1/2 opacity-50"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 relative z-10">
                    {[
                        { 
                            icon: <Search size={24} />, 
                            title: "Deep Scan", 
                            desc: "AI reads the code behind your report.",
                            step: "01"
                        },
                        { 
                            icon: <AlertTriangle size={24} />, 
                            title: "Identify", 
                            desc: "Pinpoints every Metro 2 violation.",
                            step: "02"
                        },
                        { 
                            icon: <FileText size={24} />, 
                            title: "Challenge", 
                            desc: "Generates factual legal challenges.",
                            step: "03"
                        },
                        { 
                            icon: <Mail size={24} />, 
                            title: "Mail", 
                            desc: "Sent via USPS Certified Mail.",
                            step: "04"
                        }
                    ].map((step, i) => (
                        <div key={i} className="flex md:flex-col items-start md:items-center gap-6 md:gap-0 group">
                            
                            {/* Icon Node */}
                            <div className="relative shrink-0">
                                <div className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-white border-4 border-gray-100 group-hover:border-brand-neon transition-colors duration-500 flex items-center justify-center relative z-10 shadow-lg md:mb-6">
                                    <div className="w-9 h-9 md:w-14 md:h-14 rounded-full bg-gray-50 group-hover:bg-brand-neon transition-colors duration-500 flex items-center justify-center text-gray-400 group-hover:text-white">
                                        {step.icon}
                                    </div>
                                    {/* Step Number Badge */}
                                    <div className="absolute -top-1 -right-1 bg-gray-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                                        {step.step}
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="pt-1 md:text-center">
                                <h3 className="text-lg font-black text-gray-900 mb-1 group-hover:text-brand-neon transition-colors">{step.title}</h3>
                                <p className="text-gray-500 text-xs leading-relaxed max-w-[180px] md:mx-auto">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="text-center mt-12">
                <Button onClick={onStart} variant="secondary" className="px-6 h-10 text-sm">Run Diagnostics Check</Button>
            </div>
         </div>
      </div>

      {/* 🟢 SECTION 3: DETAILED BENEFITS GRID - Compact */}
      <div className="bg-gray-50 py-20 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-200 text-gray-900 text-[10px] font-bold mb-4">
                    <Sparkles size={12} fill="currentColor" /> POWERFUL FEATURES
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Everything you need to win.</h2>
                <p className="text-lg text-gray-500 max-w-xl mx-auto">
                    We've automated the expensive process of hiring a credit attorney.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Feature 1 */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 hover:border-red-100 transition-all duration-300 group">
                    <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-brand-neon mb-4 group-hover:bg-brand-neon group-hover:text-white transition-colors">
                        <Database size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Metro 2® Analysis</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        We don't just read the PDF. We analyze the raw data format (Metro 2) used by e-OSCAR.
                    </p>
                </div>
                {/* Feature 2 */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 hover:border-red-100 transition-all duration-300 group">
                    <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-brand-neon mb-4 group-hover:bg-brand-neon group-hover:text-white transition-colors">
                        <Scale size={20} /> 
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Legal Citations</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Our AI references specific sections of the FCRA (15 U.S.C. § 1681) and FDCPA.
                    </p>
                </div>
                {/* Feature 3 */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 hover:border-red-100 transition-all duration-300 group">
                    <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-brand-neon mb-4 group-hover:bg-brand-neon group-hover:text-white transition-colors">
                        <ShieldCheck size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Identity Theft Shield</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Suspicious account? We generate specialized "Not Mine" affidavits and fraud alerts.
                    </p>
                </div>
                {/* Feature 4 */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 hover:border-red-100 transition-all duration-300 group">
                    <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-brand-neon mb-4 group-hover:bg-brand-neon group-hover:text-white transition-colors">
                        <Zap size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Smart Round Logic</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        If a bureau replies with a "verified" letter, our AI reads it and generates a specific procedural challenge.
                    </p>
                </div>
                {/* Feature 5 */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 hover:border-red-100 transition-all duration-300 group">
                    <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-brand-neon mb-4 group-hover:bg-brand-neon group-hover:text-white transition-colors">
                        <Lock size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Bank-Level Security</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Your SSN and DOB are encrypted with AES-256 bit encryption. We never sell your data.
                    </p>
                </div>
                {/* Feature 6 */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 hover:border-red-100 transition-all duration-300 group">
                    <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-brand-neon mb-4 group-hover:bg-brand-neon group-hover:text-white transition-colors">
                        <Mail size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Certified Mail Integration</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Skip the post office. We print, fold, and mail your letters via USPS Certified Mail®.
                    </p>
                </div>
            </div>
        </div>
      </div>

      {/* 🟢 SECTION 3.5: WHAT WE CHALLENGE (NEW) - Compact */}
      <div className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-gray-900 mb-2">We Challenge Everything.</h2>
                <p className="text-lg text-gray-500 max-w-xl mx-auto">
                    If it's inaccurate, unverifiable, or unfair, it doesn't belong on your report.
                </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                    { label: "Late Payments", icon: <History size={20} /> },
                    { label: "Collections", icon: <FileWarning size={20} /> },
                    { label: "Charge Offs", icon: <XCircle size={20} /> },
                    { label: "Bankruptcies", icon: <AlertOctagon size={20} /> },
                    { label: "Repossessions", icon: <Ban size={20} /> },
                    { label: "Hard Inquiries", icon: <Search size={20} /> },
                    { label: "Student Loans", icon: <School size={20} /> },
                    { label: "Judgments", icon: <Gavel size={20} /> },
                ].map((item, i) => (
                     <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col items-center justify-center gap-2 hover:bg-gray-900 hover:text-white transition-all group">
                        <div className="text-gray-400 group-hover:text-white transition-colors">{item.icon}</div>
                        <span className="font-bold text-sm text-gray-900 group-hover:text-white">{item.label}</span>
                     </div>
                ))}
            </div>
        </div>
      </div>

      {/* 🟢 SECTION 3.6: THE STATS / PROBLEM (NEW) - Compact */}
      <div className="bg-gray-900 py-16 text-white relative overflow-hidden">
         <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
             <div className="inline-block mb-4 p-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <AlertTriangle size={20} className="text-red-500" />
             </div>
             <h2 className="text-3xl md:text-5xl font-black mb-4">
                79% of credit reports <br/>contain errors.
             </h2>
             <p className="text-lg text-gray-400 max-w-xl mx-auto mb-8">
                The bureaus process billions of data points. Mistakes happen. Unfortunately, a simple "typo" in their system can cost you thousands in interest rates.
             </p>
             <Button onClick={onStart} className="px-8 py-3 text-base h-12 rounded-xl bg-white text-gray-900 hover:bg-gray-100 shadow-none">Check My Report For Errors</Button>
         </div>
         {/* Decorative BG */}
         <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black"></div>
      </div>

      {/* 🟢 SECTION 4: COMPARISON - Compact */}
      <div className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-black text-gray-900 mb-2">Why We Win</h2>
                <p className="text-gray-500 text-base">Stop wasting time with "Repair Guys" and generic templates.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Column 1: The Old Way */}
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm opacity-70 hover:opacity-100 transition-opacity">
                    <h3 className="text-lg font-bold text-gray-400 mb-4">Generic Templates</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-center gap-2 text-gray-500">
                            <XCircle className="text-red-400 shrink-0" size={16} /> One size fits all
                        </li>
                        <li className="flex items-center gap-2 text-gray-500">
                            <XCircle className="text-red-400 shrink-0" size={16} /> Easily flagged by e-OSCAR
                        </li>
                        <li className="flex items-center gap-2 text-gray-500">
                            <XCircle className="text-red-400 shrink-0" size={16} /> No legal citations
                        </li>
                        <li className="flex items-center gap-2 text-gray-500">
                            <XCircle className="text-red-400 shrink-0" size={16} /> Ignored by bureaus
                        </li>
                    </ul>
                </div>

                {/* Column 2: Credit Repair Agencies */}
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm opacity-70 hover:opacity-100 transition-opacity">
                    <h3 className="text-lg font-bold text-gray-400 mb-4">Repair Agencies</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-center gap-2 text-gray-500">
                            <XCircle className="text-red-400 shrink-0" size={16} /> Monthly fees ($100+)
                        </li>
                        <li className="flex items-center gap-2 text-gray-500">
                            <XCircle className="text-red-400 shrink-0" size={16} /> Slow drip disputes
                        </li>
                        <li className="flex items-center gap-2 text-gray-500">
                            <XCircle className="text-red-400 shrink-0" size={16} /> They want you to stay subscribed
                        </li>
                        <li className="flex items-center gap-2 text-gray-500">
                            <XCircle className="text-red-400 shrink-0" size={16} /> Gatekeep your info
                        </li>
                    </ul>
                </div>

                {/* Column 3: Credit Buddy (Winner) */}
                <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-2xl relative transform scale-105 z-10 text-white">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-neon text-white font-bold px-4 py-1 rounded-full text-[10px] uppercase tracking-widest shadow-lg flex items-center justify-center text-center">
                        <span className="flex items-center justify-center w-full">The New Standard</span>
                    </div>
                    <h3 className="text-xl font-black text-white mb-4 mt-2">Credit Buddy AI</h3>
                    <ul className="space-y-3 text-sm">
                         <li className="flex items-center gap-2 text-white font-bold">
                            <CheckCircle2 className="text-brand-neon shrink-0" size={16} fill="currentColor" /> 100% Personalized & Humanized
                        </li>
                         <li className="flex items-center gap-2 text-white font-bold">
                            <CheckCircle2 className="text-brand-neon shrink-0" size={16} fill="currentColor" /> Metro 2 & FCRA Compliance
                        </li>
                         <li className="flex items-center gap-2 text-white font-bold">
                            <CheckCircle2 className="text-brand-neon shrink-0" size={16} fill="currentColor" /> Flexible Pricing (No Sub Option)
                        </li>
                         <li className="flex items-center gap-2 text-white font-bold">
                            <CheckCircle2 className="text-brand-neon shrink-0" size={16} fill="currentColor" /> 2-Minute Process
                        </li>
                         <li className="flex items-center gap-2 text-white font-bold">
                            <CheckCircle2 className="text-brand-neon shrink-0" size={16} fill="currentColor" /> 1-Click USPS Certified Mail
                        </li>
                    </ul>
                    <div className="mt-6">
                         <Button onClick={onStart} className="w-full bg-brand-neon text-white border-none h-10 text-sm">Get Started Free</Button>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* 🟢 SECTION 4.5: SECURITY STRIP - Compact */}
      <div className="bg-black py-12 border-b border-gray-900">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center text-gray-200">
                        <Lock size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Bank-Level Security</h3>
                        <p className="text-sm text-gray-400">256-bit SSL Encryption. We never sell your data.</p>
                    </div>
                </div>
                <div className="flex items-center gap-6 opacity-50 grayscale">
                    {/* Mock Security Badges */}
                    <span className="text-white font-mono font-bold text-lg">McAfee SECURE</span>
                    <span className="text-white font-serif font-bold text-lg">Norton</span>
                </div>
            </div>
      </div>

      {/* 🟢 SECTION 5: RESULTS / PROOF - Compact */}
      <div className="bg-white py-20 text-gray-900 relative overflow-hidden border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-900 text-[10px] font-bold mb-4">
                        <Zap size={12} fill="currentColor" /> REAL USER RESULTS
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black mb-6">
                        Results You Can <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neon to-gray-900">Actually See.</span>
                    </h2>
                    <p className="text-gray-500 text-base mb-6">
                        We don't promise magic. We execute the law. When the credit bureaus can't verify the debt (and they usually can't), they MUST delete it.
                    </p>
                    <div className="flex gap-8">
                        <div>
                            <p className="text-3xl font-black text-gray-900">3.2M+</p>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Deletions</p>
                        </div>
                         <div>
                            <p className="text-3xl font-black text-gray-900">48hr</p>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Turnaround</p>
                        </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                    {/* Testimonial Card 1 */}
                    <div className="bg-white border border-gray-100 shadow-xl p-5 rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                             <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-bold overflow-hidden border border-gray-200">
                                   <User size={16} />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 text-sm">Marcus J.</p>
                                    <p className="text-[10px] text-gray-400">Verified User</p>
                                </div>
                             </div>
                             <div className="flex text-yellow-400 gap-0.5">
                                <Star size={12} fill="currentColor" />
                                <Star size={12} fill="currentColor" />
                                <Star size={12} fill="currentColor" />
                                <Star size={12} fill="currentColor" />
                                <Star size={12} fill="currentColor" />
                             </div>
                        </div>
                        <p className="text-gray-600 text-xs leading-relaxed">
                            "I tried Lex*ngton Law for 6 months and got nothing. Used Credit Buddy for one week and saw 3 collections drop off my TransUnion. Insane."
                        </p>
                    </div>

                    {/* Testimonial Card 2 */}
                    <div className="bg-white border border-gray-100 shadow-xl p-5 rounded-xl opacity-80 scale-95">
                        <div className="flex items-center justify-between mb-3">
                             <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-bold overflow-hidden border border-gray-200">
                                   <User size={16} />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 text-sm">Sarah K.</p>
                                    <p className="text-[10px] text-gray-400">Verified User</p>
                                </div>
                             </div>
                             <div className="flex text-yellow-400 gap-0.5">
                                <Star size={12} fill="currentColor" />
                                <Star size={12} fill="currentColor" />
                                <Star size={12} fill="currentColor" />
                                <Star size={12} fill="currentColor" />
                                <Star size={12} fill="currentColor" />
                             </div>
                        </div>
                        <p className="text-gray-600 text-xs leading-relaxed">
                            "The interface is so easy. I just uploaded my PDF and it found errors I didn't even know were there. Highly recommend."
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* 🟢 SECTION 6: FAQ - Compact */}
      <div className="bg-gray-50 py-20 border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-gray-900 mb-2">FAQ</h2>
                <p className="text-gray-500 text-base">Common questions about the process.</p>
            </div>
            
            <div className="space-y-3">
                {[
                    { q: "Is this legal?", a: "Yes. The Fair Credit Reporting Act (FCRA) gives you the right to dispute any inaccurate, unverifiable, or incomplete information on your credit report." },
                    { q: "How long does it take?", a: "The bureaus have 30-45 days to investigate your dispute. We usually see results in the first 35 days." },
                    { q: "Does it work for collections?", a: "Yes. Collections are one of the most common items removed because collection agencies often lack the original documentation required to verify the debt." },
                    { q: "Can I cancel?", a: "There is no subscription to cancel. We operate on a pay-per-letter or lifetime access model. You are in control." }
                ].map((item, i) => (
                    <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 text-base mb-1">{item.q}</h3>
                        <p className="text-gray-500 text-sm">{item.a}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* 🟢 SECTION 7: LATEST INTELLIGENCE (BLOG) - Compact */}
      <div className="bg-white py-20 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 mb-2">Latest Intelligence</h2>
                    <p className="text-gray-500 text-base max-w-xl">Expert strategies to maximize your score and understanding of the law.</p>
                </div>
                <Button onClick={onGoToBlog} variant="secondary" className="h-10 border-gray-200 text-gray-900 text-sm" icon={<ArrowUpRight size={16} />}>
                    View All Articles
                </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {recentPosts.map((post, i) => (
                     <div key={i} onClick={onGoToBlog} className="group cursor-pointer">
                        <div className={`h-40 rounded-xl mb-4 bg-gradient-to-br ${post.imageGrad} border border-gray-100 relative overflow-hidden`}>
                             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                             <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] font-bold text-gray-900 flex items-center gap-1 shadow-sm">
                                <Tag size={10} className="text-brand-neon" /> {post.tag}
                             </div>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-brand-neon transition-colors leading-tight">
                            {post.title}
                        </h3>
                        <p className="text-gray-500 text-xs mb-3 line-clamp-2">
                            {post.excerpt}
                        </p>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                            <Calendar size={10} /> {post.date}
                        </div>
                     </div>
                ))}
            </div>
        </div>
      </div>

      {/* 🟢 CTA - Compact */}
      <div className="bg-white py-24 text-center px-4">
        <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">Ready to fix your score?</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button onClick={onStart} className="px-10 py-4 text-lg h-auto shadow-2xl shadow-red-900/20 bg-brand-neon hover:bg-red-600 border-none">
                    Analyze My Report For Free
                </Button>
            </div>
            <p className="mt-4 text-xs text-gray-400 font-medium">No credit card required for analysis.</p>
        </div>
      </div>

       {/* FOOTER - Compact */}
       <div className="bg-white py-8 border-t border-gray-200">
           <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-[10px] text-gray-400 uppercase font-bold tracking-wider">
               <p>© 2023 Credit Buddy AI.</p>
               <div className="flex gap-4">
                   <button onClick={onOpenPrivacy} className="hover:text-gray-600">Privacy Policy</button>
                   <button onClick={onOpenTerms} className="hover:text-gray-600">Terms of Service</button>
                   {/* Admin Link */}
                   <button 
                     onClick={onOpenAdmin}
                     className="hover:text-brand-neon transition-colors"
                   >
                     Admin Login
                   </button>
               </div>
           </div>
       </div>

    </div>
  );
};
