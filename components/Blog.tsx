import React from 'react';
import { ArrowLeft, Calendar, User, Tag, ArrowRight } from 'lucide-react';

interface BlogProps {
  onBack: () => void;
}

export const Blog: React.FC<BlogProps> = ({ onBack }) => {
  const posts = [
    {
      id: 1,
      title: "The End of 'Template' Disputes",
      excerpt: "Why credit bureaus are flagging generic templates and how AI-generated unique disputes are achieving 40% higher deletion rates.",
      date: "October 15, 2023",
      author: "Sarah Chen, Head of Legal Eng",
      tags: ["AI", "Strategy"],
      imageGrad: "from-red-500/20 to-gray-900/20"
    },
    {
      id: 2,
      title: "Mastering Metro 2 Compliance",
      excerpt: "A deep dive into the data format used by e-OSCAR. Learn how to spot 'Header Record' errors that most credit repair agencies miss.",
      date: "October 08, 2023",
      author: "Mike Ross, Senior Analyst",
      tags: ["Technical", "Metro 2"],
      imageGrad: "from-gray-700/20 to-gray-900/20"
    },
    {
      id: 3,
      title: "CFPB Updates for 2024",
      excerpt: "New regulations are shifting the burden of proof heavily onto data furnishers. Here is how to leverage the new rules.",
      date: "September 22, 2023",
      author: "Legal Team",
      tags: ["Regulation", "News"],
      imageGrad: "from-gray-500/20 to-gray-800/20"
    },
    {
      id: 4,
      title: "How to Remove Hard Inquiries",
      excerpt: "Hard inquiries can drop your score by 5-10 points. If they aren't tied to an open account, they might be removable.",
      date: "September 10, 2023",
      author: "System",
      tags: ["Guides", "Beginner"],
      imageGrad: "from-red-400/20 to-gray-900/20"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      
      <div className="mb-16">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>
        
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neon to-gray-900">Intelligence</span> Log
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl">
          Insights, engineering updates, and legal strategies for financial sovereignty.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <div 
            key={post.id} 
            className="glass-card rounded-3xl p-8 group cursor-pointer hover:border-gray-900/30 transition-all duration-300 hover:-translate-y-1 bg-white border border-gray-200 shadow-sm"
          >
            <div className={`h-48 rounded-2xl mb-8 bg-gradient-to-br ${post.imageGrad} border border-gray-100 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            </div>
            
            <div className="flex items-center gap-4 mb-4 text-xs font-bold uppercase tracking-wider text-gray-400">
              <span className="flex items-center gap-1 text-brand-neon"><Tag size={12} /> {post.tags[0]}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-brand-neon transition-colors">
              {post.title}
            </h2>
            
            <p className="text-gray-500 leading-relaxed mb-8">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between border-t border-gray-100 pt-6">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                   <User size={12} />
                </div>
                {post.author}
              </div>
              <span className="text-brand-neon font-bold text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
                Read Article <ArrowRight size={14} />
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <div className="inline-block p-1 rounded-full bg-gray-100 border border-gray-200">
           <button className="px-6 py-2 rounded-full bg-gray-900 text-white font-bold text-sm transition-colors">1</button>
           <button className="px-6 py-2 rounded-full text-gray-500 font-bold text-sm hover:text-gray-900">2</button>
           <button className="px-6 py-2 rounded-full text-gray-500 font-bold text-sm hover:text-gray-900">3</button>
        </div>
      </div>

    </div>
  );
};