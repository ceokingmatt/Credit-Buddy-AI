
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Mail, TrendingUp, Search, Bell, Download, Filter, MoreHorizontal, CheckCircle2, XCircle, Clock, Shield, DollarSign, ArrowUpRight, FileText, CreditCard, ChevronDown, Crown, User, ArrowLeft, MapPin, Phone, Calendar, Image as ImageIcon, Lock, Trash2, Eye, X, Printer, Copy, Settings, Globe, Check, AlertTriangle, RefreshCw, Server, HelpCircle, UploadCloud } from 'lucide-react';
import { Button } from './Button';

interface AdminDashboardProps {
  onLogout: () => void;
}

// Mock Types for Detail View
interface LetterHistoryItem {
  id: string;
  bureau: string;
  round: number;
  status: string;
  date: string;
  content: string; // Added content field
}

interface UserDetail {
  id: number;
  name: string;
  email: string;
  plan: string;
  amount: string;
  status: string;
  joined: string;
  phone: string;
  address: string;
  score: number;
  totalSpent: string;
  lettersSent: number;
  documents: { name: string; type: string; date: string }[];
  history: LetterHistoryItem[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'mail' | 'results' | 'settings'>('overview');
  const [userFilter, setUserFilter] = useState<'All' | 'Pro' | 'Free'>('All');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null);
  
  // State for viewing a specific letter
  const [viewingLetter, setViewingLetter] = useState<LetterHistoryItem | null>(null);
  
  // State for Deployment Guide
  const [showDeploymentGuide, setShowDeploymentGuide] = useState(false);

  // Settings State - Persistent
  const [domainName, setDomainName] = useState(() => {
      const saved = localStorage.getItem('admin_domain_name');
      return saved || '';
  });
  const [isDomainSaved, setIsDomainSaved] = useState(() => {
      return localStorage.getItem('admin_domain_saved') === 'true';
  });
  
  // Verification State
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'checking' | 'active'>('pending');
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  // MOCK DATA
  const stats = [
    { label: 'Total Revenue', value: '$124,592', change: '+12.5%', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Pro Users (Paid)', value: '842', change: '+18.2%', icon: Crown, color: 'text-brand-neon', bg: 'bg-red-50' },
    { label: 'Free Users', value: '1,563', change: '+5.4%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Letters Sent', value: '18,902', change: '+23.1%', icon: Mail, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const recentUsers = [
    { id: 1, name: 'Sarah Connor', email: 'sarah.c@example.com', plan: 'Pro', amount: '$29/mo', status: 'Active', joined: '2 hours ago' },
    { id: 2, name: 'James Howlett', email: 'logan@xmen.org', plan: 'Free', amount: '$0', status: 'Pending', joined: '5 hours ago' },
    { id: 3, name: 'Tony Stark', email: 'tony@stark.com', plan: 'Pro', amount: '$29/mo', status: 'Active', joined: '1 day ago' },
    { id: 4, name: 'Bruce Wayne', email: 'bruce@wayne.com', plan: 'Pro', amount: '$29/mo', status: 'Active', joined: '1 day ago' },
    { id: 5, name: 'Peter Parker', email: 'spidey@queens.nyc', plan: 'Free', amount: '$0', status: 'Inactive', joined: '2 days ago' },
    { id: 6, name: 'Clark Kent', email: 'kalel@dailyplanet.com', plan: 'Free', amount: '$0', status: 'Active', joined: '3 days ago' },
    { id: 7, name: 'Diana Prince', email: 'diana@themyscira.gov', plan: 'Pro', amount: '$29/mo', status: 'Active', joined: '3 days ago' },
  ];

  // Filter Logic
  const filteredUsers = userFilter === 'All' 
    ? recentUsers 
    : recentUsers.filter(u => u.plan === userFilter);

  const mailLog = [
    { id: 'LTR-9921', user: 'Sarah Connor', bureau: 'TransUnion', round: 1, status: 'Delivered', tracking: '9400 1000 0000 0000 0001', date: 'Oct 24, 2023' },
    { id: 'LTR-9922', user: 'Sarah Connor', bureau: 'Experian', round: 1, status: 'In Transit', tracking: '9400 1000 0000 0000 0002', date: 'Oct 24, 2023' },
    { id: 'LTR-9923', user: 'Tony Stark', bureau: 'Equifax', round: 2, status: 'Processing', tracking: 'Pending', date: 'Oct 25, 2023' },
    { id: 'LTR-9924', user: 'Bruce Wayne', bureau: 'TransUnion', round: 1, status: 'Delivered', tracking: '9400 1000 0000 0000 0004', date: 'Oct 20, 2023' },
    { id: 'LTR-9925', user: 'Clark Kent', bureau: 'Experian', round: 3, status: 'Failed', tracking: 'N/A', date: 'Oct 19, 2023' },
  ];

  const deletions = [
    { id: 1, user: 'Tony Stark', creditor: 'CHASE BANK', amount: '$15,000', scoreImpact: '+45 pts', date: 'Oct 24, 2023' },
    { id: 2, user: 'Bruce Wayne', creditor: 'LEX CORP', amount: '$2,500', scoreImpact: '+22 pts', date: 'Oct 23, 2023' },
    { id: 3, user: 'Sarah Connor', creditor: 'SKYNET SYSTEMS', amount: '$850', scoreImpact: '+15 pts', date: 'Oct 22, 2023' },
    { id: 4, user: 'Steve Rogers', creditor: 'HYDRA COLL', amount: '$1,200', scoreImpact: '+35 pts', date: 'Oct 21, 2023' },
  ];

  // Helper to generate mock letter content
  const generateMockLetterContent = (bureau: string, round: number, name: string) => {
    const date = new Date().toLocaleDateString();
    
    let body = "";
    if (round === 1) {
        body = `I am writing to dispute the following information in my file. I have reviewed my credit report and identified items that are inaccurate, incomplete, or unverifiable.\n\nI do not recognize the accounts listed below. Please investigate these items and delete them from my credit report immediately if they cannot be verified.`;
    } else if (round === 2) {
        body = `I previously wrote to you regarding the items listed below. You have failed to remove them or provide adequate proof of verification.\n\nPursuant to FCRA Section 611 (15 U.S.C. § 1681i), I am demanding the "Method of Verification" used to validate these debts. Who did you contact? What is their name and phone number?`;
    } else {
        body = `FINAL NOTICE.\n\nYou are knowingly reporting inaccurate information in violation of the Fair Credit Reporting Act. I have already filed a complaint with the CFPB. If these items are not deleted within 5 days, I will be forced to pursue litigation for statutory damages of $1,000 per violation under FCRA Section 616.`;
    }

    return `
${name}
123 Cyber Lane
Tech City, NV 89011

${date}

${bureau} Dispute Resolution Center
P.O. Box 2000
Chester, PA 19016

RE: Dispute of Inaccurate Information - Round ${round}

To Whom It May Concern:

${body}

DISPUTED ITEMS:
1. CHASE BANK (Account #4400****) - Inaccurate Balance
2. MIDLAND CREDIT (Account #8989****) - Not Mine

Please provide me with a corrected copy of my credit report after your investigation is complete.

Sincerely,

${name}
    `.trim();
  };

  const handleUserClick = (basicUser: typeof recentUsers[0]) => {
      // Simulate fetching full details
      const fullDetails: UserDetail = {
          ...basicUser,
          phone: '(555) 123-4567',
          address: '123 Cyber Lane, Tech City, NV 89011',
          score: 642,
          totalSpent: basicUser.plan === 'Pro' ? '$87.00' : '$15.00',
          lettersSent: basicUser.plan === 'Pro' ? 12 : 3,
          documents: [
              { name: 'drivers_license_front.jpg', type: 'ID', date: 'Oct 15, 2023' },
              { name: 'utility_bill.pdf', type: 'Address', date: 'Oct 15, 2023' },
              { name: 'tu_results_oct.pdf', type: 'Result', date: 'Oct 28, 2023' },
          ],
          history: [
              { id: 'LTR-881', bureau: 'TransUnion', round: 1, status: 'Mailed', date: 'Oct 15, 2023', content: generateMockLetterContent('TransUnion', 1, basicUser.name) },
              { id: 'LTR-882', bureau: 'Experian', round: 1, status: 'Mailed', date: 'Oct 15, 2023', content: generateMockLetterContent('Experian', 1, basicUser.name) },
              { id: 'LTR-883', bureau: 'Equifax', round: 1, status: 'Mailed', date: 'Oct 15, 2023', content: generateMockLetterContent('Equifax', 1, basicUser.name) },
              { id: 'LTR-905', bureau: 'TransUnion', round: 2, status: 'Ready', date: 'Nov 12, 2023', content: generateMockLetterContent('TransUnion', 2, basicUser.name) },
          ]
      };
      setSelectedUser(fullDetails);
  };

  const handleSaveDomain = () => {
      setIsDomainSaved(true);
      setVerificationStatus('pending'); // Reset verification on new save
      localStorage.setItem('admin_domain_name', domainName);
      localStorage.setItem('admin_domain_saved', 'true');
  };

  const handleVerifyDNS = () => {
      setVerificationStatus('checking');
      // Simulate API Check
      setTimeout(() => {
          setVerificationStatus('active');
      }, 2000);
  };

  const copyToClipboard = (text: string) => {
      navigator.clipboard.writeText(text);
      setCopiedValue(text);
      setTimeout(() => setCopiedValue(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex animate-in fade-in duration-500 relative">
      
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex-shrink-0 hidden md:flex flex-col">
         <div className="h-20 flex items-center px-6 border-b border-gray-800">
            <h1 className="text-xl font-black italic tracking-tighter text-white">
                ADMIN <span className="text-brand-neon">PANEL</span>
            </h1>
         </div>

         <nav className="flex-1 p-4 space-y-2">
            {[
                { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
                { id: 'users', label: 'User Management', icon: Users },
                { id: 'mail', label: 'Mailroom Log', icon: Mail },
                { id: 'results', label: 'Deletions & Results', icon: TrendingUp },
                { id: 'settings', label: 'Settings', icon: Settings },
            ].map(item => (
                <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id as any); setSelectedUser(null); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                        activeTab === item.id 
                        ? 'bg-brand-neon text-white shadow-lg shadow-red-900/40' 
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                >
                    <item.icon size={18} />
                    {item.label}
                </button>
            ))}
         </nav>

         <div className="p-4 border-t border-gray-800">
            <div className="bg-gray-800 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-xs">A</div>
                    <div>
                        <p className="text-sm font-bold">Admin User</p>
                        <p className="text-xs text-gray-400">Super Admin</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-green-400">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    System Operational
                </div>
            </div>
            <button onClick={onLogout} className="w-full py-2 text-xs font-bold text-gray-500 hover:text-white transition-colors">
                Sign Out
            </button>
         </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
         
         {/* Top Header */}
         <div className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 flex-shrink-0">
             <h2 className="text-xl font-bold text-gray-900 capitalize">
                {selectedUser ? 'Customer Profile' : (
                    activeTab === 'mail' ? 'Mailroom Operations' : 
                    activeTab === 'users' ? 'User Management' : 
                    activeTab === 'settings' ? 'Platform Settings' : activeTab
                )}
             </h2>
             <div className="flex items-center gap-4">
                 <div className="relative">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                     <input 
                        type="text" 
                        placeholder="Search records..." 
                        className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-neon w-64"
                     />
                 </div>
                 <button className="relative p-2 text-gray-400 hover:text-gray-900">
                     <Bell size={20} />
                     <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                 </button>
             </div>
         </div>

         {/* Scrollable Area */}
         <div className="flex-1 overflow-y-auto p-8">
            
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
                <div className="space-y-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
                                <div className="flex justify-between items-start mb-4 relative z-10">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                                        <stat.icon size={24} />
                                    </div>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full bg-gray-50 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                        {stat.change}
                                    </span>
                                </div>
                                <p className="text-gray-500 text-sm font-medium relative z-10">{stat.label}</p>
                                <h3 className="text-3xl font-black text-gray-900 relative z-10">{stat.value}</h3>
                                {/* Decor */}
                                <div className={`absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-10 ${stat.bg.replace('bg-', 'bg-')}`}></div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Live Activity Feed */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-gray-900">Live Activity Feed</h3>
                                <button className="text-xs font-bold text-brand-neon">View All</button>
                            </div>
                            <div className="space-y-6">
                                {[
                                    { user: 'Sarah C.', action: 'Upgraded to Pro', time: '2 mins ago', icon: DollarSign, color: 'bg-green-100 text-green-600' },
                                    { user: 'Mike R.', action: 'Generated 3 Letters', time: '15 mins ago', icon: FileText, color: 'bg-blue-100 text-blue-600' },
                                    { user: 'Jenny T.', action: 'Reported Deletion (Chase)', time: '1 hour ago', icon: CheckCircle2, color: 'bg-red-100 text-brand-neon' },
                                    { user: 'System', action: 'Daily Backup Complete', time: '3 hours ago', icon: Shield, color: 'bg-gray-100 text-gray-600' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.color}`}>
                                            <item.icon size={16} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-gray-900">{item.user} <span className="font-normal text-gray-500">{item.action}</span></p>
                                            <p className="text-xs text-gray-400">{item.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Signups - Quick View */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-gray-900">Newest Members</h3>
                                <div className="flex gap-2">
                                     <button className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-900 transition-colors"><Filter size={16} /></button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="text-xs text-gray-400 uppercase border-b border-gray-100">
                                            <th className="pb-3 font-bold">User</th>
                                            <th className="pb-3 font-bold">Plan</th>
                                            <th className="pb-3 font-bold">Joined</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {recentUsers.slice(0, 4).map(user => (
                                            <tr key={user.id} onClick={() => { setActiveTab('users'); handleUserClick(user); }} className="group hover:bg-gray-50 transition-colors cursor-pointer">
                                                <td className="py-3">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600">
                                                            {user.name.charAt(0)}
                                                        </div>
                                                        <span className="font-bold text-gray-900 group-hover:text-brand-neon">{user.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3">
                                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${user.plan === 'Pro' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}>
                                                        {user.plan}
                                                    </span>
                                                </td>
                                                <td className="py-3 text-gray-500 text-xs">
                                                    {user.joined}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* USERS TAB */}
            {activeTab === 'users' && !selectedUser && (
                <div className="space-y-6">
                    {/* User Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase">Total Database</p>
                                <p className="text-3xl font-black text-gray-900 mt-1">2,405</p>
                            </div>
                            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                                <Users size={24} />
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between relative overflow-hidden group">
                             <div className="absolute top-0 right-0 w-20 h-20 bg-brand-neon/5 rounded-bl-full group-hover:bg-brand-neon/10 transition-colors"></div>
                             <div>
                                <p className="text-xs font-bold text-brand-neon uppercase">Pro Members</p>
                                <p className="text-3xl font-black text-gray-900 mt-1">{stats[1].value}</p>
                            </div>
                            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-brand-neon shadow-sm">
                                <Crown size={24} />
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
                             <div>
                                <p className="text-xs font-bold text-blue-600 uppercase">Free Users</p>
                                <p className="text-3xl font-black text-gray-900 mt-1">{stats[2].value}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                                <User size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden min-h-[500px]">
                        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <h3 className="font-bold text-gray-900">User Database</h3>
                                
                                {/* Filter Dropdown */}
                                <div className="relative">
                                    <button 
                                        onClick={() => setShowFilterMenu(!showFilterMenu)}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        <Filter size={14} /> 
                                        Filter: <span className="text-brand-neon">{userFilter}</span>
                                        <ChevronDown size={14} />
                                    </button>
                                    
                                    {showFilterMenu && (
                                        <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 z-10 overflow-hidden animate-in fade-in zoom-in-95">
                                            <button onClick={() => { setUserFilter('All'); setShowFilterMenu(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 font-medium">All Users</button>
                                            <button onClick={() => { setUserFilter('Pro'); setShowFilterMenu(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 font-medium text-brand-neon">Pro Users</button>
                                            <button onClick={() => { setUserFilter('Free'); setShowFilterMenu(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 font-medium text-gray-600">Free Users</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <Button className="h-9 text-xs">Add Manual User</Button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-gray-500 font-bold text-xs uppercase">
                                    <tr>
                                        <th className="px-6 py-4">Customer</th>
                                        <th className="px-6 py-4">Plan</th>
                                        <th className="px-6 py-4">Revenue</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Joined</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredUsers.map(user => (
                                        <tr 
                                            key={user.id} 
                                            className="hover:bg-gray-50 cursor-pointer transition-colors"
                                            onClick={() => handleUserClick(user)}
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900">{user.name}</p>
                                                        <p className="text-xs text-gray-500">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.plan === 'Pro' ? (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-900 text-white shadow-sm">
                                                        <Crown size={10} className="text-brand-neon" /> Pro
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-600 border border-gray-200">
                                                        <User size={10} /> Free
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 font-mono text-xs text-gray-600">
                                                {user.amount}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${user.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500">{user.joined}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-gray-400 hover:text-gray-900 bg-white hover:bg-gray-100 p-1.5 rounded-lg border border-transparent hover:border-gray-200 transition-all"><Eye size={16} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {filteredUsers.length === 0 && (
                                <div className="p-12 text-center text-gray-500">
                                    No users found with this filter.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* SELECTED USER DETAIL VIEW */}
            {activeTab === 'users' && selectedUser && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                    <button 
                        onClick={() => setSelectedUser(null)}
                        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold text-sm mb-4"
                    >
                        <ArrowLeft size={16} /> Back to Users
                    </button>

                    {/* Profile Header */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                             <div className="flex items-center gap-6">
                                 <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-3xl font-black text-gray-400 border-2 border-white shadow-lg">
                                     {selectedUser.name.charAt(0)}
                                 </div>
                                 <div>
                                     <h2 className="text-2xl font-black text-gray-900">{selectedUser.name}</h2>
                                     <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                         <span className="flex items-center gap-1.5"><Mail size={14} /> {selectedUser.email}</span>
                                         <span className="flex items-center gap-1.5"><Phone size={14} /> {selectedUser.phone}</span>
                                     </div>
                                     <div className="flex items-center gap-2 mt-4">
                                         <span className={`text-xs font-bold px-3 py-1 rounded-full ${selectedUser.plan === 'Pro' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}>
                                            {selectedUser.plan} Member
                                         </span>
                                         <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-100">
                                            Active
                                         </span>
                                     </div>
                                 </div>
                             </div>
                             <div className="flex gap-3">
                                 <Button variant="secondary" className="h-9 text-xs">Reset Password</Button>
                                 <Button variant="secondary" className="h-9 text-xs text-red-600 border-red-100 bg-red-50 hover:bg-red-100">Ban User</Button>
                             </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column: Stats */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                                <h3 className="font-bold text-gray-900 mb-4">Client Overview</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                        <span className="text-xs text-gray-500 font-bold uppercase">Credit Score</span>
                                        <span className="font-black text-gray-900 text-lg">{selectedUser.score}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                        <span className="text-xs text-gray-500 font-bold uppercase">Total Spend</span>
                                        <span className="font-black text-gray-900 text-lg">{selectedUser.totalSpent}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                        <span className="text-xs text-gray-500 font-bold uppercase">Letters Sent</span>
                                        <span className="font-black text-gray-900 text-lg">{selectedUser.lettersSent}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-xs text-gray-500 font-bold uppercase">Member Since</span>
                                        <span className="font-medium text-gray-900 text-sm">Oct 2023</span>
                                    </div>
                                </div>
                            </div>

                             <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                                <h3 className="font-bold text-gray-900 mb-4">Contact Details</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-start gap-3 text-gray-600">
                                        <MapPin size={16} className="mt-0.5 shrink-0" />
                                        {selectedUser.address}
                                    </div>
                                    <div className="flex items-start gap-3 text-gray-600">
                                        <Phone size={16} className="mt-0.5 shrink-0" />
                                        {selectedUser.phone}
                                    </div>
                                    <div className="flex items-start gap-3 text-gray-600">
                                        <Mail size={16} className="mt-0.5 shrink-0" />
                                        {selectedUser.email}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Middle/Right: Documents & History */}
                        <div className="lg:col-span-2 space-y-6">
                            
                            {/* Uploaded Documents */}
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Lock size={16} className="text-gray-400" /> Document Locker
                                </h3>
                                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {selectedUser.documents.map((doc, i) => (
                                        <div key={i} className="p-4 border border-gray-100 rounded-xl bg-gray-50 hover:bg-white hover:border-brand-neon/30 hover:shadow-sm transition-all cursor-pointer group">
                                            <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 mb-3 group-hover:text-brand-neon">
                                                {doc.type === 'ID' || doc.type === 'Address' ? <ImageIcon size={20} /> : <FileText size={20} />}
                                            </div>
                                            <p className="font-bold text-gray-900 text-sm truncate">{doc.name}</p>
                                            <p className="text-xs text-gray-500">{doc.date}</p>
                                        </div>
                                    ))}
                                    <div className="p-4 border border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors cursor-pointer min-h-[120px]">
                                        <ArrowUpRight size={20} className="mb-2" />
                                        <span className="text-xs font-bold">Upload File</span>
                                    </div>
                                </div>
                            </div>

                            {/* Letter History */}
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-gray-200">
                                    <h3 className="font-bold text-gray-900">Letter History</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-gray-50 text-gray-500 font-bold text-xs uppercase">
                                            <tr>
                                                <th className="px-6 py-4">ID</th>
                                                <th className="px-6 py-4">Bureau</th>
                                                <th className="px-6 py-4">Round</th>
                                                <th className="px-6 py-4">Status</th>
                                                <th className="px-6 py-4">Content</th>
                                                <th className="px-6 py-4 text-right">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {selectedUser.history.map((letter) => (
                                                <tr key={letter.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 font-mono text-xs text-gray-600">{letter.id}</td>
                                                    <td className="px-6 py-4 font-bold text-gray-900">{letter.bureau}</td>
                                                    <td className="px-6 py-4 text-gray-600">{letter.round}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${letter.status === 'Mailed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                            {letter.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <button 
                                                            onClick={() => setViewingLetter(letter)}
                                                            className="text-xs font-bold text-brand-neon hover:text-red-700 border border-red-100 bg-red-50 px-2 py-1 rounded hover:bg-red-100 transition-colors"
                                                        >
                                                            View Content
                                                        </button>
                                                    </td>
                                                    <td className="px-6 py-4 text-right text-gray-500 text-xs">{letter.date}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            {/* LETTER VIEWER MODAL */}
            {viewingLetter && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                     <div 
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
                        onClick={() => setViewingLetter(null)}
                     ></div>
                     <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
                         {/* Header */}
                         <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                             <div>
                                 <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                     <FileText size={16} /> Letter Content: {viewingLetter.id}
                                 </h3>
                                 <p className="text-xs text-gray-500 mt-0.5">{viewingLetter.bureau} • Round {viewingLetter.round} • {viewingLetter.date}</p>
                             </div>
                             <button onClick={() => setViewingLetter(null)} className="p-1 text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors">
                                 <X size={20} />
                             </button>
                         </div>
                         
                         {/* Content */}
                         <div className="p-8 overflow-y-auto bg-white">
                             <div className="bg-white border border-gray-100 p-8 shadow-sm min-h-[500px]">
                                <pre className="font-mono text-xs md:text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                                    {viewingLetter.content}
                                </pre>
                             </div>
                         </div>

                         {/* Footer Actions */}
                         <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                             <Button variant="secondary" className="h-9 text-xs" icon={<Copy size={14} />}>Copy Text</Button>
                             <Button className="h-9 text-xs" icon={<Printer size={14} />}>Print Letter</Button>
                         </div>
                     </div>
                </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
                <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center text-white">
                                <Settings size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-gray-900">Platform Settings</h2>
                                <p className="text-sm text-gray-500">Configure your white-label instance.</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Domain Card */}
                            <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-neon/5 rounded-bl-full"></div>
                                
                                <div className="flex items-start justify-between mb-4 relative z-10">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white rounded-lg border border-gray-200 text-brand-neon">
                                            <Globe size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-sm">Custom Domain</h3>
                                            <p className="text-xs text-gray-500">Connect your own URL to the portal.</p>
                                        </div>
                                    </div>
                                    {/* Connection Status Badge */}
                                    <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1.5 
                                        ${verificationStatus === 'active' ? 'bg-green-100 text-green-700 border-green-200' : 
                                          verificationStatus === 'checking' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                                          isDomainSaved ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                                        
                                        {verificationStatus === 'active' && <Check size={10} strokeWidth={4} />}
                                        {verificationStatus === 'checking' && <RefreshCw size={10} className="animate-spin" />}
                                        
                                        {verificationStatus === 'active' ? 'Live' : 
                                         verificationStatus === 'checking' ? 'Verifying...' : 
                                         isDomainSaved ? 'Waiting for DNS...' : 'Not Set'}
                                    </div>
                                </div>
                                
                                <div className="flex gap-3 mb-4 relative z-10">
                                    <input 
                                        type="text" 
                                        value={domainName} 
                                        onChange={(e) => { setDomainName(e.target.value); setIsDomainSaved(false); setVerificationStatus('pending'); }}
                                        className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon"
                                        placeholder="e.g. www.creditbuddy.ai"
                                    />
                                    <Button onClick={handleSaveDomain} className="h-10 px-6 text-sm">Save</Button>
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="flex gap-3 mb-4 relative z-10">
                                    {isDomainSaved && verificationStatus !== 'active' && (
                                        <Button 
                                            onClick={handleVerifyDNS} 
                                            variant="secondary" 
                                            className="flex-1 h-9 text-xs bg-white border-dashed border-gray-300 hover:border-brand-neon hover:text-brand-neon"
                                            disabled={verificationStatus === 'checking'}
                                        >
                                            {verificationStatus === 'checking' ? 'Pinging DNS...' : 'Verify Connection'}
                                        </Button>
                                    )}
                                    <Button 
                                        onClick={() => setShowDeploymentGuide(true)} 
                                        variant="secondary" 
                                        className="h-9 text-xs bg-white border-gray-200 text-gray-500 hover:text-gray-900"
                                        icon={<HelpCircle size={14} />}
                                    >
                                        How to Go Live
                                    </Button>
                                </div>
                                
                                {isDomainSaved && (
                                    <div className="space-y-3 animate-in fade-in slide-in-from-top-2 relative z-10">
                                        {verificationStatus !== 'active' && (
                                            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex gap-2 text-xs text-blue-800">
                                                <AlertTriangle size={16} className="shrink-0" />
                                                <span>
                                                    <strong>Action Required:</strong> You must purchase this domain (GoDaddy/Namecheap) and update the DNS records below to make it live.
                                                </span>
                                            </div>
                                        )}
                                        
                                        {/* Success Message */}
                                        {verificationStatus === 'active' && (
                                             <div className="bg-green-50 border border-green-100 rounded-lg p-3 flex gap-2 text-xs text-green-800 animate-in zoom-in-95">
                                                <CheckCircle2 size={16} className="shrink-0 text-green-600" />
                                                <span>
                                                    <strong>Success!</strong> Your domain is connected and propagating. It may take up to 48 hours to be visible globally.
                                                </span>
                                            </div>
                                        )}

                                        <div className="text-xs text-gray-500 bg-white p-4 rounded-lg border border-gray-200 font-mono">
                                            <div className="grid grid-cols-5 gap-4 mb-2 pb-2 border-b border-gray-100 font-bold text-gray-400">
                                                <span>Type</span>
                                                <span className="col-span-1">Name / Host</span>
                                                <span className="col-span-2">Value</span>
                                                <span className="text-right">TTL</span>
                                            </div>
                                            
                                            {/* A Record */}
                                            <div className="grid grid-cols-5 gap-4 py-2 border-b border-gray-50 items-center">
                                                <span className="font-bold text-gray-700"><span className="bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">A</span></span>
                                                <span className="text-gray-600">@</span>
                                                <div className="col-span-2 flex items-center gap-2">
                                                    <span className="text-gray-900 font-bold">76.76.21.21</span>
                                                    <button onClick={() => copyToClipboard('76.76.21.21')} className="text-gray-300 hover:text-brand-neon"><Copy size={12} /></button>
                                                </div>
                                                <span className="text-right text-gray-400">Auto</span>
                                            </div>
                                            
                                            {/* CNAME Record */}
                                            <div className="grid grid-cols-5 gap-4 py-2 items-center">
                                                <span className="font-bold text-gray-700"><span className="bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">CNAME</span></span>
                                                <span className="text-gray-600">www</span>
                                                <div className="col-span-2 flex items-center gap-2">
                                                    <span className="text-gray-900 font-bold">cname.vercel-dns.com</span>
                                                    <button onClick={() => copyToClipboard('cname.vercel-dns.com')} className="text-gray-300 hover:text-brand-neon"><Copy size={12} /></button>
                                                </div>
                                                <span className="text-right text-gray-400">Auto</span>
                                            </div>
                                        </div>
                                        
                                        {copiedValue && (
                                            <div className="flex justify-center">
                                                <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full animate-in fade-in slide-in-from-bottom-1">
                                                    Copied: {copiedValue}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* General Config */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">Site Name</label>
                                    <input type="text" defaultValue="Credit Buddy AI" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-bold text-gray-900" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">Support Email</label>
                                    <input type="email" defaultValue="help@creditbuddy.ai" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-bold text-gray-900" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* DEPLOYMENT GUIDE MODAL */}
            {showDeploymentGuide && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                     <div 
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
                        onClick={() => setShowDeploymentGuide(false)}
                     ></div>
                     <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
                         {/* Header */}
                         <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                             <div>
                                 <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                     <UploadCloud size={18} className="text-brand-neon" /> How to Go Live
                                 </h3>
                                 <p className="text-xs text-gray-500 mt-0.5">Follow these steps to connect your domain.</p>
                             </div>
                             <button onClick={() => setShowDeploymentGuide(false)} className="p-1 text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors">
                                 <X size={20} />
                             </button>
                         </div>
                         
                         {/* Content */}
                         <div className="p-8 overflow-y-auto bg-white space-y-8">
                             
                             <div className="flex gap-4">
                                 <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 shrink-0">1</div>
                                 <div>
                                     <h4 className="font-bold text-gray-900">Purchase a Domain</h4>
                                     <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                                         If you haven't already, buy your domain (e.g., <strong>{domainName || 'yourdomain.com'}</strong>) from a registrar like <span className="font-bold text-gray-800">GoDaddy</span>, <span className="font-bold text-gray-800">Namecheap</span>, or <span className="font-bold text-gray-800">Google Domains</span>.
                                     </p>
                                 </div>
                             </div>

                             <div className="flex gap-4">
                                 <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 shrink-0">2</div>
                                 <div>
                                     <h4 className="font-bold text-gray-900">Deploy Code to Vercel</h4>
                                     <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                                         You need a host for your code. We recommend Vercel.
                                     </p>
                                     <ol className="list-decimal pl-5 mt-2 space-y-1 text-sm text-gray-600">
                                         <li>Go to <a href="https://vercel.com" target="_blank" className="text-blue-600 underline">Vercel.com</a> and create a free account.</li>
                                         <li>Import your GitHub repository containing this code.</li>
                                         <li>Click <strong>Deploy</strong>.</li>
                                     </ol>
                                 </div>
                             </div>

                             <div className="flex gap-4">
                                 <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 shrink-0">3</div>
                                 <div>
                                     <h4 className="font-bold text-gray-900">Add Domain in Vercel</h4>
                                     <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                                         Tell Vercel you own the domain.
                                     </p>
                                     <ol className="list-decimal pl-5 mt-2 space-y-1 text-sm text-gray-600">
                                         <li>In Vercel, go to <strong>Settings</strong> &gt; <strong>Domains</strong>.</li>
                                         <li>Type <strong>{domainName || 'yourdomain.com'}</strong> and click Add.</li>
                                         <li>Vercel will give you the <strong>DNS Records</strong> (A Record and CNAME).</li>
                                     </ol>
                                 </div>
                             </div>

                             <div className="flex gap-4">
                                 <div className="w-8 h-8 rounded-full bg-brand-neon flex items-center justify-center font-bold text-white shrink-0 shadow-lg shadow-red-900/30">4</div>
                                 <div>
                                     <h4 className="font-bold text-gray-900">Update DNS (The Final Step)</h4>
                                     <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                                         Log in to your Registrar (GoDaddy/Namecheap) and find the <strong>DNS Management</strong> page.
                                     </p>
                                     <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mt-3">
                                         <p className="text-xs font-bold text-gray-700 mb-2">Copy these values:</p>
                                         <div className="space-y-2 font-mono text-xs">
                                             <div className="flex justify-between border-b border-gray-200 pb-1">
                                                 <span className="text-gray-500">A Record (Host: @)</span>
                                                 <span className="font-bold">76.76.21.21</span>
                                             </div>
                                             <div className="flex justify-between">
                                                 <span className="text-gray-500">CNAME (Host: www)</span>
                                                 <span className="font-bold">cname.vercel-dns.com</span>
                                             </div>
                                         </div>
                                     </div>
                                     <p className="text-xs text-gray-400 mt-2 italic">Note: It can take up to 48 hours for changes to propagate.</p>
                                 </div>
                             </div>

                         </div>

                         {/* Footer */}
                         <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 text-center">
                             <Button onClick={() => setShowDeploymentGuide(false)} className="h-10 px-8 text-sm">Got it</Button>
                         </div>
                     </div>
                </div>
            )}

            {/* MAIL TAB */}
            {activeTab === 'mail' && (
                 <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                     <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
                        <div>
                            <h3 className="font-bold text-gray-900">Mail Queue & Tracking</h3>
                            <p className="text-xs text-gray-500 mt-1">Real-time status from USPS Certified Mail API.</p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="secondary" className="h-9 text-xs bg-white">Export CSV</Button>
                        </div>
                     </div>
                     <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-white text-gray-500 font-bold text-xs uppercase border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4">Letter ID</th>
                                    <th className="px-6 py-4">Recipient</th>
                                    <th className="px-6 py-4">Round</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Tracking Number</th>
                                    <th className="px-6 py-4 text-right">Sent Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {mailLog.map(mail => (
                                    <tr key={mail.id} className="hover:bg-gray-50 group">
                                        <td className="px-6 py-4 font-mono text-xs font-bold text-gray-500">{mail.id}</td>
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-gray-900">{mail.user}</p>
                                            <p className="text-xs text-gray-500">{mail.bureau}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                                                {mail.round}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                             {mail.status === 'Delivered' && <span className="text-green-600 font-bold flex items-center gap-1 text-xs"><CheckCircle2 size={14} /> Delivered</span>}
                                             {mail.status === 'In Transit' && <span className="text-blue-600 font-bold flex items-center gap-1 text-xs"><Clock size={14} /> In Transit</span>}
                                             {mail.status === 'Processing' && <span className="text-orange-500 font-bold flex items-center gap-1 text-xs"><Loader2 size={14} className="animate-spin" /> Processing</span>}
                                             {mail.status === 'Failed' && <span className="text-red-500 font-bold flex items-center gap-1 text-xs"><XCircle size={14} /> Failed</span>}
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs text-gray-600">
                                            {mail.tracking !== 'N/A' && mail.tracking !== 'Pending' ? (
                                                <a href="#" className="text-blue-500 hover:underline flex items-center gap-1">
                                                    {mail.tracking} <ArrowUpRight size={10} />
                                                </a>
                                            ) : (
                                                <span className="text-gray-400">{mail.tracking}</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right text-gray-500 text-xs font-medium">{mail.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                     </div>
                </div>
            )}

            {/* RESULTS TAB */}
            {activeTab === 'results' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center">
                             <p className="text-xs font-bold text-gray-400 uppercase">Total Deletions</p>
                             <p className="text-4xl font-black text-brand-neon mt-2">4,203</p>
                         </div>
                         <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center">
                             <p className="text-xs font-bold text-gray-400 uppercase">Avg Score Increase</p>
                             <p className="text-4xl font-black text-gray-900 mt-2">+42 pts</p>
                         </div>
                         <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center">
                             <p className="text-xs font-bold text-gray-400 uppercase">Total Debt Removed</p>
                             <p className="text-4xl font-black text-green-600 mt-2">$8.4M</p>
                         </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="font-bold text-gray-900">Deletion Log</h3>
                        </div>
                        <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-500 font-bold text-xs uppercase">
                                <tr>
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Removed Item</th>
                                    <th className="px-6 py-4">Amount Waived</th>
                                    <th className="px-6 py-4">Score Impact</th>
                                    <th className="px-6 py-4 text-right">Date Verified</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {deletions.map((del, i) => (
                                    <tr key={i} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-bold text-gray-900">{del.user}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 rounded bg-red-50 text-red-600 text-xs font-bold border border-red-100">
                                                {del.creditor}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-gray-600">{del.amount}</td>
                                        <td className="px-6 py-4">
                                            <span className="text-green-600 font-bold">{del.scoreImpact}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right text-gray-500 text-xs">{del.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                     </div>
                    </div>
                </div>
            )}

         </div>
      </div>

    </div>
  );
};

// Helper for icons
function Loader2({ size, className }: { size: number, className?: string }) {
    return <svg className={`animate-spin ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
}
