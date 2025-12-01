
import React, { useState, useEffect } from 'react';
import { AppStep, DisputeItem, DisputeStrategy, ClientInfo, GeneratedLetter, ScanInput, UploadedDocs } from './types';
import { extractDisputeItems, generateLetterContent } from './services/gemini';
import { Hero } from './components/Hero';
import { Scanner } from './components/Scanner';
import { Dashboard } from './components/Dashboard';
import { LetterPreview } from './components/LetterPreview';
import { Checkout } from './components/Checkout';
import { SavedLetters } from './components/SavedLetters';
import { SignUp } from './components/SignUp';
import { Blog } from './components/Blog';
import { Pricing } from './components/Pricing';
import { Onboarding } from './components/Onboarding';
import { AdminDashboard } from './components/AdminDashboard';
import { LegalModals } from './components/LegalModals';
import { SupportWidget } from './components/SupportWidget';
import { LayoutDashboard, UserCircle, Sparkles, Menu, X } from 'lucide-react';

// Mock User Data for Demo
const DEFAULT_CLIENT: ClientInfo = {
  fullName: "Johnathan Doe",
  email: "john.doe@example.com",
  phone: "(555) 123-4567",
  address: "1234 Cyber Avenue, Apt 404",
  city: "Neo Tokyo",
  state: "NV",
  zip: "89011",
  dob: "05/15/1985",
  ssnLast4: "6789"
};

// Custom Stacked Red Logo SVG - SLANTED / ROTATED - CENTERED TEXT
const LOGO_SRC = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0Ij4KICA8ZyB0cmFuc2Zvcm09InJvdGF0ZSgtMTAgMTIwIDUwKSI+CiAgICA8dGV4dCB4PSIxMjAiIHk9IjQ1IiBmb250LWZhbWlseT0iQXJpYWwgQmxhY2ssIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI5MDAiIGZvbnQtc3R5bGU9Iml0YWxpYyIgZm9udC1zaXplPSIzOCIgZmlsbD0iI0ZGM0IzMCIgbGV0dGVyLXNwYWNpbmc9Ii0xIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5DUkVESVQ8L3RleHQ+CiAgICA8dGV4dCB4PSIxMjAiIHk9Ijg1IiBmb250LWZhbWlseT0iQXJpYWwgQmxhY2ssIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI5MDAiIGZvbnQtc3R5bGU9Iml0YWxpYyIgZm9udC1zaXplPSIzOCIgZmlsbD0iI0ZGM0IzMCIgbGV0dGVyLXNwYWNpbmc9Ii0xIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5CVUREWSBBSTwvdGV4dD4KICA8L2c+PC9zdmc+";

// --- NEW GENERATOR LOADING COMPONENT ---
const GeneratorStep: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "Hang tight! I'm scanning your report for factual errors...",
    "Checking account balances, dates, and payment history...",
    "Identifying violations under the FCRA and FDCPA...",
    "Drafting custom legal arguments for TransUnion...",
    "Creating a firm demand letter for Experian...",
    "Ensuring Equifax has the burden of proof...",
    "Finalizing your unique dispute strategy..."
  ];

  useEffect(() => {
    // Simulate progress bar
    const duration = 8000; // Increased to 8 seconds to match slower reading speed
    const intervalTime = 50;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 98) {
          return 98; // Hold at 98 until complete
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Rotate messages every 4s (Slower for readability)
    const messageInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % messages.length);
    }, 4000);

    return () => clearInterval(messageInterval);
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-8 max-w-lg mx-auto animate-in fade-in duration-700">
       
       {/* Animated Visual */}
       <div className="relative w-32 h-32 mb-10">
          <div className="absolute inset-0 border-4 border-brand-neon/20 rounded-full animate-ping"></div>
          <div className="absolute inset-0 border-4 border-t-brand-neon border-r-brand-neon border-b-gray-200 border-l-gray-200 rounded-full animate-spin"></div>
          <div className="absolute inset-2 bg-white rounded-full shadow-lg flex items-center justify-center">
             <Sparkles size={40} className="text-brand-neon animate-pulse" />
          </div>
       </div>
       
       <h2 className="text-5xl font-black text-gray-900 mb-6 tabular-nums tracking-tight">
         {Math.round(progress)}%
       </h2>
       
       {/* Dynamic Buddy Message */}
       <div className="h-20 flex items-center justify-center px-4">
          <p className="text-xl text-gray-800 font-bold transition-all duration-500 ease-in-out transform leading-relaxed">
            "{messages[messageIndex]}"
          </p>
       </div>
       
       {/* Progress Bar */}
       <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden mt-8 border border-gray-200">
          <div 
            className="h-full bg-gradient-to-r from-brand-neon to-red-600 transition-all duration-100 ease-out shadow-[0_0_10px_rgba(220,38,38,0.5)]"
            style={{ width: `${progress}%` }}
          ></div>
       </div>
       
       <p className="text-gray-400 text-sm mt-6 font-medium bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
         Credit Buddy is working on it! Don't close this window.
       </p>
    </div>
  );
};

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.LANDING);
  const [items, setItems] = useState<DisputeItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Store generated letters (Array for multiple bureaus)
  const [generatedLetters, setGeneratedLetters] = useState<GeneratedLetter[]>([]);
  
  // Store history
  const [savedLetters, setSavedLetters] = useState<GeneratedLetter[]>([]);
  
  // Store content locally if edited during preview, so we can save it after checkout
  const [tempLetters, setTempLetters] = useState<GeneratedLetter[]>([]);
  
  // Store uploaded documents
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDocs>({});
  
  // User Plan State
  const [userPlan, setUserPlan] = useState<'free' | 'pro'>('free');
  
  // Modal State
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  // Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Legal Modal State
  const [legalModalType, setLegalModalType] = useState<'terms' | 'privacy' | null>(null);
  
  // Global Mascot - Placeholder (User to replace)
  const MASCOT_SRC = "https://cdn.dribbble.com/users/1787323/screenshots/11327170/media/c03378393526bc59f8a3299763784192.png?resize=400x300&vertical=center";

  // --- PERSISTENCE LOGIC (ENHANCED) ---
  useEffect(() => {
    // Load state from localStorage on mount
    const savedData = localStorage.getItem('credit_buddy_data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Restore Letter History
        if (parsed.savedLetters) setSavedLetters(parsed.savedLetters);
        
        // Restore Active Session Data
        if (parsed.items) setItems(parsed.items);
        if (parsed.generatedLetters) setGeneratedLetters(parsed.generatedLetters);
        if (parsed.uploadedDocs) setUploadedDocs(parsed.uploadedDocs);
        if (parsed.tempLetters) setTempLetters(parsed.tempLetters);
        if (parsed.userPlan) setUserPlan(parsed.userPlan);
        
        // Restore Step (if not volatile)
        if (parsed.currentStep && parsed.currentStep !== AppStep.GENERATOR && parsed.currentStep !== AppStep.ADMIN) {
            setStep(parsed.currentStep);
        }
      } catch (e) {
        console.error("Failed to load saved state", e);
      }
    }
  }, []);

  useEffect(() => {
    // Save EVERYTHING to localStorage on change
    const stateToSave = {
      savedLetters,
      items,
      generatedLetters,
      uploadedDocs,
      tempLetters,
      userPlan,
      currentStep: step === AppStep.ADMIN || step === AppStep.GENERATOR ? AppStep.DASHBOARD : step // Fallback to Dashboard if in volatile state
    };
    localStorage.setItem('credit_buddy_data', JSON.stringify(stateToSave));
  }, [savedLetters, items, generatedLetters, uploadedDocs, tempLetters, step, userPlan]);
  // -------------------------

  const handleScan = async (input: ScanInput) => {
    setIsProcessing(true);
    try {
      const extracted = await extractDisputeItems(input);
      
      // Transform extracted partials into full DisputeItems
      const mappedItems: DisputeItem[] = extracted.map((item, index) => ({
        id: `item-${index}-${Date.now()}`,
        creditorName: item.creditorName || "Unknown Creditor",
        accountNumber: item.accountNumber || "Unknown",
        reason: item.reason || "Review Required",
        amount: item.amount || "N/A",
        status: item.status || "Unknown",
        selected: true,
        strategy: DisputeStrategy.AI_OPTIMIZED // Default strategy
      }));

      setItems(mappedItems);
      setStep(AppStep.DASHBOARD);
    } catch (error) {
      alert("Failed to extract data. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddItem = (newItem: DisputeItem) => {
    setItems(prev => [...prev, newItem]);
  };

  const handleToggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  const handleToggleAll = (selected: boolean) => {
    setItems(items.map(item => ({ ...item, selected })));
  };

  const handleUpdateStrategy = (id: string, strategy: DisputeStrategy) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, strategy } : item
    ));
  };

  const handleGenerate = async () => {
    const selectedItems = items.filter(i => i.selected);
    if (selectedItems.length === 0) return;

    setIsProcessing(true);
    setStep(AppStep.GENERATOR);

    try {
      // Generate for all 3 bureaus
      const bureaus = ['Experian', 'Equifax', 'TransUnion'] as const;
      
      // Calculate round based on saved history (Every 3 letters = 1 round roughly, or logic could be more complex)
      // Default to Round 1 if no history.
      const currentRound = Math.floor(savedLetters.length / 3) + 1;

      const results = await Promise.all(bureaus.map(async (bureau) => {
          const content = await generateLetterContent(DEFAULT_CLIENT, selectedItems, bureau, currentRound);
          return {
            id: `letter-${bureau}-${Date.now()}`,
            bureau: bureau,
            content: content,
            status: 'generated' as const,
            createdAt: Date.now(),
            round: currentRound
          };
      }));
      
      setGeneratedLetters(results);
      setStep(AppStep.PREVIEW);
    } catch (error) {
      console.error(error);
      alert("Error generating letters");
      setStep(AppStep.DASHBOARD);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveLetters = (lettersToSave: GeneratedLetter[], status: 'ready' | 'mailed') => {
    const updatedLetters = lettersToSave.map(l => ({
        ...l,
        status: status
    }));

    setSavedLetters(prev => [...updatedLetters, ...prev]);
    setStep(AppStep.SAVED_LETTERS);
  };

  // Called when user clicks "Mail Letter" in Preview
  const handleProceedToCheckout = (editedLetters: GeneratedLetter[]) => {
    setTempLetters(editedLetters);
    
    // Check if docs are uploaded. If not, go to Onboarding first.
    if (!uploadedDocs.identity || !uploadedDocs.address) {
        setStep(AppStep.ONBOARDING);
    } else {
        setStep(AppStep.CHECKOUT);
    }
  };

  // Called after Onboarding complete
  const handleOnboardingComplete = (docs: UploadedDocs) => {
      setUploadedDocs(docs);
      setStep(AppStep.CHECKOUT);
  };

  // Called when user successfully pays/mails in Checkout
  const handleCheckoutComplete = (plan: 'one-time' | 'subscription') => {
    // If they bought a subscription, upgrade them to Pro
    if (plan === 'subscription') {
      setUserPlan('pro');
    }

    // Save as 'mailed' (Active Dispute)
    if (tempLetters.length > 0) {
      handleSaveLetters(tempLetters, 'mailed');
    }
  };

  const handleStartAuth = () => {
    setShowAuthModal(true);
  };

  const handleAuthComplete = () => {
    setShowAuthModal(false);
    // If we were on landing/pricing, go to dashboard/scanner
    if (step === AppStep.LANDING || step === AppStep.PRICING) {
      setStep(AppStep.SCANNER);
    }
  };

  const renderStep = () => {
    if (step === AppStep.ADMIN) {
      return <AdminDashboard onLogout={() => setStep(AppStep.LANDING)} />;
    }

    switch (step) {
      case AppStep.LANDING:
        return (
          <Hero 
            onStart={handleStartAuth} 
            onGoToBlog={() => setStep(AppStep.BLOG)} 
            mascotSrc={MASCOT_SRC} 
            onOpenTerms={() => setLegalModalType('terms')}
            onOpenPrivacy={() => setLegalModalType('privacy')}
            onOpenAdmin={() => setStep(AppStep.ADMIN)}
          />
        );
      
      case AppStep.BLOG:
        return <Blog onBack={() => setStep(AppStep.LANDING)} />;
      
      case AppStep.PRICING:
        return <Pricing onGetStarted={handleStartAuth} />;

      case AppStep.SIGN_UP:
        return (
          <Hero 
            onStart={handleStartAuth} 
            onGoToBlog={() => setStep(AppStep.BLOG)} 
            mascotSrc={MASCOT_SRC} 
            onOpenTerms={() => setLegalModalType('terms')}
            onOpenPrivacy={() => setLegalModalType('privacy')}
            onOpenAdmin={() => setStep(AppStep.ADMIN)}
          />
        );

      case AppStep.SCANNER:
        return <Scanner onScan={handleScan} isAnalyzing={isProcessing} mascotSrc={MASCOT_SRC} />;
      
      case AppStep.DASHBOARD:
        return (
          <Dashboard 
            items={items} 
            onToggleItem={handleToggleItem} 
            onToggleAll={handleToggleAll}
            onUpdateStrategy={handleUpdateStrategy}
            onContinue={handleGenerate}
            onAddItem={handleAddItem}
            mascotSrc={MASCOT_SRC}
          />
        );
      
      case AppStep.GENERATOR:
        return <GeneratorStep />;

      case AppStep.PREVIEW:
        if (generatedLetters.length === 0) {
             return (
                 <div className="min-h-screen pt-32 pb-12 px-4 flex flex-col items-center justify-center text-center animate-in fade-in">
                     <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
                         <Sparkles size={32} />
                     </div>
                     <h2 className="text-2xl font-black text-gray-900 mb-2">No Letters Ready</h2>
                     <p className="text-gray-500 mb-8 max-w-md">You haven't generated any dispute letters yet. Select items from the dashboard to get started.</p>
                     <button onClick={() => setStep(AppStep.DASHBOARD)} className="px-8 py-3 bg-brand-neon text-white rounded-xl font-bold shadow-lg hover:bg-red-600 transition-colors">Go to Dashboard</button>
                 </div>
             );
        }
        return (
          <LetterPreview 
            letters={generatedLetters} 
            clientInfo={DEFAULT_CLIENT}
            onBack={() => setStep(AppStep.DASHBOARD)}
            onProceed={handleProceedToCheckout}
            onSave={(letters) => handleSaveLetters(letters, 'ready')}
          />
        );

      case AppStep.ONBOARDING:
        return (
            <Onboarding 
                onComplete={handleOnboardingComplete}
                onSkip={() => setStep(AppStep.CHECKOUT)}
            />
        );

      case AppStep.CHECKOUT:
        return <Checkout letters={tempLetters} onComplete={handleCheckoutComplete} />;
        
      case AppStep.SAVED_LETTERS:
        return (
          <SavedLetters 
            letters={savedLetters} 
            clientInfo={DEFAULT_CLIENT}
            isPro={userPlan === 'pro'}
            onView={(letter) => {
              setGeneratedLetters([letter]);
              setStep(AppStep.PREVIEW);
            }}
            onNew={() => {
              setItems([]);
              setStep(AppStep.SCANNER);
            }}
            onUpgrade={() => setStep(AppStep.PRICING)}
            onLogout={() => setStep(AppStep.LANDING)}
            mascotSrc={MASCOT_SRC}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen text-gray-900 selection:bg-brand-neon/30 selection:text-black font-sans relative">
      {/* Navbar (Hidden in Admin Mode for immersion) */}
      {step !== AppStep.ADMIN && (
        <nav className="border-b border-gray-200/60 bg-white/60 backdrop-blur-xl sticky top-0 z-50 supports-[backdrop-filter]:bg-white/60">
          <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
            
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer group hover:opacity-90 transition-opacity"
              onClick={() => setStep(AppStep.LANDING)}
            >
              <img 
                src={LOGO_SRC} 
                alt="Credit Buddy AI" 
                className="h-16 w-auto object-contain"
              />
            </div>
            
            {/* Desktop Nav */}
            {(step === AppStep.LANDING || step === AppStep.BLOG || step === AppStep.PRICING) && (
              <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                <button onClick={() => setStep(AppStep.LANDING)} className="hover:text-brand-neon transition-colors">Features</button>
                <button onClick={() => setStep(AppStep.BLOG)} className={`hover:text-brand-neon transition-colors ${step === AppStep.BLOG ? 'text-brand-neon' : ''}`}>Blog</button>
                <button onClick={() => setStep(AppStep.PRICING)} className={`hover:text-brand-neon transition-colors ${step === AppStep.PRICING ? 'text-brand-neon' : ''}`}>Pricing</button>
              </div>
            )}

            {/* Right Side Actions & Mobile Menu Toggle */}
            <div className="flex items-center gap-4">
              
              {/* Admin Toggle (Desktop Only) */}
              <button 
                onClick={() => setStep(AppStep.ADMIN)}
                className="text-[10px] font-bold text-gray-400 hover:text-gray-900 uppercase tracking-widest mr-4 hidden md:block"
              >
                Admin Demo
              </button>

              {/* Sign In (Desktop) */}
              {(step === AppStep.LANDING || step === AppStep.BLOG || step === AppStep.PRICING) && (
                <button 
                  onClick={handleStartAuth}
                  className="hidden md:flex items-center gap-2 text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 px-4 py-2 rounded-full transition-all border border-gray-200 shadow-sm"
                >
                  <UserCircle size={16} />
                  Sign In
                </button>
              )}

              {/* Authenticated Nav (Desktop) */}
              {step !== AppStep.LANDING && step !== AppStep.BLOG && step !== AppStep.PRICING && (
                <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
                  <div className="hidden md:flex items-center gap-6">
                      <button 
                        onClick={() => setStep(AppStep.SCANNER)} 
                        className={`transition-colors duration-200 ${step === AppStep.SCANNER ? "text-brand-neon font-extrabold" : "hover:text-gray-900"}`}
                      >
                        1. Scan
                      </button>
                      <button 
                        onClick={() => setStep(AppStep.DASHBOARD)} 
                        className={`transition-colors duration-200 ${step === AppStep.DASHBOARD ? "text-brand-neon font-extrabold" : "hover:text-gray-900"}`}
                      >
                        2. Select
                      </button>
                      <button 
                        onClick={() => setStep(AppStep.PREVIEW)} 
                        className={`transition-colors duration-200 ${step === AppStep.PREVIEW ? "text-brand-neon font-extrabold" : "hover:text-gray-900"}`}
                      >
                        3. Review
                      </button>
                  </div>
                  
                  <div className="h-6 w-px bg-gray-300 hidden md:block"></div>

                  <button 
                    onClick={() => setStep(AppStep.SAVED_LETTERS)}
                    className={`hidden md:flex items-center gap-2 transition-all px-4 py-2 rounded-lg font-bold ${
                      step === AppStep.SAVED_LETTERS
                        ? 'bg-red-50 text-red-700 border border-red-100 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <LayoutDashboard size={18} className={step === AppStep.SAVED_LETTERS ? "text-red-600" : "text-gray-500"} />
                    Portal ({savedLetters.length})
                  </button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

            </div>
          </div>
          
          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-200 shadow-xl animate-in slide-in-from-top-4 duration-200 z-40">
                <div className="p-4 space-y-3">
                   {step === AppStep.LANDING || step === AppStep.BLOG || step === AppStep.PRICING ? (
                       <>
                           <button onClick={() => {setStep(AppStep.LANDING); setMobileMenuOpen(false)}} className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 font-bold">Features</button>
                           <button onClick={() => {setStep(AppStep.BLOG); setMobileMenuOpen(false)}} className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 font-bold">Blog</button>
                           <button onClick={() => {setStep(AppStep.PRICING); setMobileMenuOpen(false)}} className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 font-bold">Pricing</button>
                           <button onClick={() => {handleStartAuth(); setMobileMenuOpen(false)}} className="w-full text-left px-4 py-3 rounded-xl bg-gray-900 text-white font-bold">Sign In</button>
                       </>
                   ) : (
                       <>
                          <button onClick={() => {setStep(AppStep.SCANNER); setMobileMenuOpen(false)}} className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 font-bold flex items-center justify-between">1. Scan Report {step === AppStep.SCANNER && <Sparkles size={16} className="text-brand-neon" />}</button>
                          <button onClick={() => {setStep(AppStep.DASHBOARD); setMobileMenuOpen(false)}} className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 font-bold flex items-center justify-between">2. Select Disputes {step === AppStep.DASHBOARD && <Sparkles size={16} className="text-brand-neon" />}</button>
                          <button onClick={() => {setStep(AppStep.PREVIEW); setMobileMenuOpen(false)}} className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 font-bold flex items-center justify-between">3. Review & Mail {step === AppStep.PREVIEW && <Sparkles size={16} className="text-brand-neon" />}</button>
                          <div className="h-px bg-gray-100 my-2"></div>
                          <button onClick={() => {setStep(AppStep.SAVED_LETTERS); setMobileMenuOpen(false)}} className="w-full text-left px-4 py-3 rounded-xl bg-red-50 text-red-600 font-bold flex items-center justify-between">
                              My Portal
                              <span className="bg-white text-xs px-2 py-0.5 rounded-full shadow-sm">{savedLetters.length}</span>
                          </button>
                       </>
                   )}
                   <div className="h-px bg-gray-100 my-2"></div>
                   <button onClick={() => {setStep(AppStep.ADMIN); setMobileMenuOpen(false)}} className="w-full text-left px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                       Admin Demo
                   </button>
                </div>
            </div>
          )}
        </nav>
      )}

      <main className="relative">
        {renderStep()}
        
        {showAuthModal && (
          <SignUp 
            onComplete={handleAuthComplete}
            onClose={() => setShowAuthModal(false)}
          />
        )}

        {/* Global Legal Modals */}
        <LegalModals 
            isOpen={!!legalModalType} 
            type={legalModalType} 
            onClose={() => setLegalModalType(null)} 
        />

        {/* Global Support Widget - Always visible except in Admin */}
        {step !== AppStep.ADMIN && <SupportWidget />}

      </main>
    </div>
  );
};

export default App;
