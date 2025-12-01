
import React, { useState } from 'react';
import { DisputeItem, DisputeStrategy } from '../types';
import { AlertTriangle, CheckCircle2, ChevronRight, TrendingUp, ShieldCheck, Wallet, Activity, CreditCard, Cpu, AlertOctagon, Hash, ChevronDown, CheckSquare, Square, Circle, Check, Plus, X } from 'lucide-react';
import { Button } from './Button';

interface DashboardProps {
  items: DisputeItem[];
  onToggleItem: (id: string) => void;
  onToggleAll: (selected: boolean) => void;
  onUpdateStrategy: (id: string, strategy: DisputeStrategy) => void;
  onContinue: () => void;
  mascotSrc?: string;
  onAddItem: (item: DisputeItem) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  items, 
  onToggleItem, 
  onToggleAll,
  onUpdateStrategy,
  onContinue,
  mascotSrc,
  onAddItem
}) => {
  
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItem, setNewItem] = useState({ creditor: '', account: '', status: 'Collection' });

  const selectedCount = items.filter(i => i.selected).length;
  const allSelected = items.length > 0 && items.every(i => i.selected);

  // Mock Data 
  const positiveCount = 14; 
  const totalAccounts = positiveCount + items.length;
  
  const scores = [
    { bureau: 'TransUnion', score: 524, scoreColor: 'text-red-500', dotColor: 'bg-cyan-500' },
    { bureau: 'Experian', score: 518, scoreColor: 'text-red-500', dotColor: 'bg-blue-700' },
    { bureau: 'Equifax', score: 530, scoreColor: 'text-yellow-500', dotColor: 'bg-red-600' },
  ];

  const radius = 24; // REDUCED RADIUS (Was 30)
  const circumference = 2 * Math.PI * radius;

  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('charge') || s.includes('collection')) return 'bg-red-50 text-red-800 border-red-100 font-bold';
    if (s.includes('late')) return 'bg-gray-100 text-gray-800 border-gray-200 font-bold';
    return 'bg-gray-50 text-gray-800 border-gray-200 font-medium';
  };

  const handleManualAdd = () => {
    if (!newItem.creditor) return;
    
    const manualItem: DisputeItem = {
      id: `manual-${Date.now()}`,
      creditorName: newItem.creditor,
      accountNumber: newItem.account || 'Unknown',
      reason: 'Manual Entry',
      status: newItem.status,
      amount: 'N/A',
      selected: true,
      strategy: DisputeStrategy.AI_OPTIMIZED
    };
    
    onAddItem(manualItem);
    
    setIsAddingItem(false);
    setNewItem({ creditor: '', account: '', status: 'Collection' });
  };

  return (
    <div className="max-w-6xl mx-auto w-full space-y-4 animate-in fade-in duration-500 pt-6 pb-12">
      
      {/* Credit Scores & Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        
        {/* Scores - Compact */}
        <div className="md:col-span-8 grid grid-cols-3 gap-3">
            {scores.map((s) => (
                <div key={s.bureau} className="bg-white rounded-xl p-3 flex flex-col items-center justify-center relative overflow-hidden border border-gray-200 hover:border-red-300 transition-colors shadow-sm">
                    <div className="flex items-center justify-between w-full mb-1">
                        <div className="flex items-center gap-1.5">
                           {/* Bureau Identity Dot */}
                           <span className={`w-2 h-2 rounded-full ${s.dotColor}`}></span>
                           <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{s.bureau}</p>
                        </div>
                    </div>
                    
                    <div className="relative flex items-center justify-center">
                        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
                            <circle 
                              cx="50" cy="50" r={radius} 
                              stroke="currentColor" strokeWidth="5" 
                              fill="transparent" 
                              className="text-gray-100" 
                            />
                            <circle 
                              cx="50" cy="50" r={radius} 
                              stroke="currentColor" strokeWidth="5" 
                              fill="transparent" 
                              strokeDasharray={circumference} 
                              strokeDashoffset={circumference - (circumference * (s.score / 850))} 
                              strokeLinecap="round"
                              className={`${s.scoreColor} transition-all duration-1000 ease-out`} 
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                             <span className="text-lg font-black text-gray-900 tracking-tight">{s.score}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Account Stats - Compact Vertical Stack */}
        <div className="md:col-span-4 grid grid-cols-1 gap-2">
            <div className="bg-white rounded-xl px-4 py-2.5 flex items-center justify-between hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm">
                <div>
                    <p className="text-gray-400 text-[10px] font-bold uppercase">Total Accounts</p>
                    <p className="text-base font-bold text-gray-900">{totalAccounts}</p>
                </div>
                <Wallet size={16} className="text-gray-400" />
            </div>
            <div className="bg-white rounded-xl px-4 py-2.5 flex items-center justify-between hover:bg-green-50/50 transition-colors border border-gray-200 shadow-sm">
                <div>
                    <p className="text-gray-400 text-[10px] font-bold uppercase">Positive Accounts</p>
                    <p className="text-base font-bold text-green-600">{positiveCount}</p>
                </div>
                <ShieldCheck size={16} className="text-green-600" />
            </div>
             <div className="bg-white rounded-xl px-4 py-2.5 flex items-center justify-between hover:bg-red-50/50 transition-colors border border-gray-200 shadow-sm">
                <div>
                    <p className="text-gray-400 text-[10px] font-bold uppercase">Negative Items</p>
                    <p className="text-base font-bold text-red-600">{items.length}</p>
                </div>
                <AlertTriangle size={16} className="text-red-500" />
            </div>
        </div>
      </div>

      {/* Projection Banner - Compact */}
       <div className="bg-gradient-to-r from-brand-neon to-gray-900 rounded-xl p-3 flex items-center gap-3 shadow-lg shadow-gray-900/10">
          <div className="p-1.5 bg-white/20 rounded-lg text-white shrink-0 backdrop-blur-sm">
            <TrendingUp size={16} strokeWidth={2.5} />
          </div>
          <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-white">
             <div>
                <h3 className="text-xs font-bold">AI Score Projection</h3>
                <p className="text-[10px] font-medium opacity-90">Disputing <span className="font-bold">{items.length} items</span> could boost score by <span className="font-bold text-white">+40-100 pts</span>.</p>
             </div>
          </div>
       </div>

      {/* Items List */}
      <div>
        {/* Updated Header with Select All */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 px-1 gap-2">
            <div className="flex items-center gap-3">
                <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <Activity size={16} className="text-gray-700" />
                    Detected Negatives
                    <span className="text-[10px] bg-gray-100 text-gray-900 px-1.5 py-0.5 rounded border border-gray-200 font-mono font-bold">{items.length} FOUND</span>
                </h2>
                
                {/* Select All Button */}
                <button 
                  onClick={() => onToggleAll(!allSelected)}
                  className="text-[10px] font-bold text-gray-600 hover:text-gray-900 flex items-center gap-1 bg-white border border-gray-200 px-2 py-1 rounded shadow-sm transition-all"
                >
                  <div className={`w-2.5 h-2.5 rounded-sm border flex items-center justify-center ${allSelected ? 'bg-gray-900 border-gray-900' : 'border-gray-300'}`}>
                     {allSelected && <Check size={8} className="text-white" />}
                  </div>
                  {allSelected ? 'Deselect All' : 'Select All'}
                </button>
            </div>

            {/* Manual Add Button */}
             <button 
               onClick={() => setIsAddingItem(true)}
               className="text-[10px] font-bold text-brand-neon hover:text-red-700 flex items-center gap-1 px-2.5 py-1 rounded bg-red-50 hover:bg-red-100 border border-red-100 transition-all"
             >
               <Plus size={12} /> Add Manual Item
             </button>
        </div>

        {/* Manual Entry Form - Compact */}
        {isAddingItem && (
             <div className="mb-3 bg-white border border-brand-neon/50 rounded-xl p-3 shadow-lg shadow-red-900/5 animate-in slide-in-from-top-2">
                 <div className="flex justify-between items-center mb-2">
                     <h3 className="text-xs font-bold text-gray-900">Add Missing Item</h3>
                     <button onClick={() => setIsAddingItem(false)} className="text-gray-400 hover:text-gray-900"><X size={14} /></button>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                     <div>
                         <label className="text-[10px] font-bold text-gray-500 block mb-1">Creditor Name</label>
                         <input 
                            type="text" 
                            value={newItem.creditor}
                            onChange={(e) => setNewItem({...newItem, creditor: e.target.value})}
                            className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:border-brand-neon" 
                            placeholder="e.g. Chase Bank"
                            autoFocus
                         />
                     </div>
                     <div>
                         <label className="text-[10px] font-bold text-gray-500 block mb-1">Account # (Optional)</label>
                         <input 
                            type="text" 
                            value={newItem.account}
                            onChange={(e) => setNewItem({...newItem, account: e.target.value})}
                            className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:border-brand-neon" 
                            placeholder="e.g. 12345678"
                         />
                     </div>
                     <div>
                         <label className="text-[10px] font-bold text-gray-500 block mb-1">Status</label>
                         <select 
                            value={newItem.status}
                            onChange={(e) => setNewItem({...newItem, status: e.target.value})}
                            className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:border-brand-neon bg-white"
                         >
                             <option value="Collection">Collection</option>
                             <option value="Charge Off">Charge Off</option>
                             <option value="Late Payment">Late Payment</option>
                             <option value="Bankruptcy">Bankruptcy</option>
                             <option value="Inquiry">Hard Inquiry</option>
                         </select>
                     </div>
                 </div>
                 <div className="flex justify-end">
                     <Button onClick={handleManualAdd} className="h-8 text-[10px] px-3">Add Item</Button>
                 </div>
             </div>
        )}

        <div className="space-y-2">
          {/* Desktop Header Row */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-3 py-1.5 items-center text-[10px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-200 mb-2 bg-white/40 rounded-t-lg backdrop-blur-sm">
              <div className="col-span-4 flex items-center gap-3">
                  <span className="pl-8">Creditor / Account</span>
              </div>
              <div className="col-span-3">Status</div>
              <div className="col-span-5">Dispute Strategy</div>
          </div>

          {items.map((item) => (
            <div 
              key={item.id} 
              onClick={() => onToggleItem(item.id)}
              className={`group rounded-xl border transition-all duration-200 cursor-pointer ${
                item.selected 
                  ? 'bg-red-50 border-red-200 ring-1 ring-red-100 shadow-sm z-10' 
                  : 'bg-white/60 border-gray-200 hover:border-gray-300 hover:bg-white hover:shadow-sm'
              }`}
            >
              <div className="flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-4 p-2.5 md:items-center">
                
                {/* Creditor Info */}
                <div className="col-span-4 flex items-center gap-3">
                    {/* Checkmark */}
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all shrink-0 ${
                      item.selected 
                        ? 'bg-white border-gray-900 text-gray-900'
                        : 'bg-white border-gray-300 text-transparent group-hover:border-gray-400'
                    }`}>
                        <Check size={10} strokeWidth={4} />
                    </div>
                    
                    <div className="min-w-0">
                        <h3 className={`font-bold text-xs truncate ${item.selected ? 'text-gray-900' : 'text-gray-600'}`}>{item.creditorName}</h3>
                        <div className="flex items-center gap-1 text-[10px] text-gray-500 font-mono font-bold">
                            <Hash size={9} /> {item.accountNumber}
                        </div>
                    </div>
                </div>

                {/* Status */}
                <div className="col-span-3">
                     <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] border uppercase tracking-wide whitespace-nowrap ${getStatusColor(item.status)}`}>
                            <AlertOctagon size={10} /> {item.status}
                        </span>
                     </div>
                </div>

                {/* Strategy Selector - Compact */}
                <div className="col-span-5" onClick={(e) => e.stopPropagation()}>
                    <div className="relative">
                        <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
                            <Cpu size={12} />
                        </div>
                        <select
                            value={item.strategy}
                            onChange={(e) => onUpdateStrategy(item.id, e.target.value as DisputeStrategy)}
                            className="w-full appearance-none bg-white border border-gray-200 hover:border-gray-300 text-gray-900 text-[10px] font-bold rounded pl-7 pr-6 py-1.5 focus:border-brand-neon focus:ring-1 focus:ring-brand-neon outline-none cursor-pointer transition-all shadow-sm"
                            >
                            {Object.values(DisputeStrategy).map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
                    </div>
                </div>

              </div>
            </div>
          ))}

          {items.length === 0 && (
            <div className="p-6 text-center text-sm text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
              No negative items found.
            </div>
          )}
        </div>

        <div className="mt-4 p-3 bg-gray-900 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-3 shadow-lg">
          <div className="text-white flex items-center gap-3">
             <div className="p-1.5 bg-white/10 rounded-lg"><Activity size={14} /></div>
             <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase">Selection Summary</div>
                <div className="text-xs font-medium">
                    Generating <span className="font-bold text-brand-neon">{selectedCount} disputes</span>
                </div>
             </div>
          </div>
          <Button 
            onClick={onContinue} 
            disabled={selectedCount === 0}
            className="w-full sm:w-auto h-9 text-xs shadow-none bg-white text-gray-900 hover:bg-brand-neon hover:text-white border-none px-4 font-bold"
            icon={<ChevronRight size={14} />}
          >
            Generate Letters
          </Button>
        </div>
      </div>
    </div>
  );
};
