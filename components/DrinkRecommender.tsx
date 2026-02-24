
import React, { useState } from 'react';
import { Sparkles, Loader2, Wine, PartyPopper, Moon, ChevronRight, Zap } from 'lucide-react';
import { getDrinkRecommendation } from '../services/geminiService';
import { RecommendationResponse } from '../types';

export default function DrinkRecommender() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecommendationResponse | null>(null);

  const handleRecommend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;
    setLoading(true);
    const res = await getDrinkRecommendation(prompt);
    setResult(res);
    setLoading(false);
  };

  const quickPrompts = [
    { label: "Quiet Night In", icon: <Moon size={12} /> },
    { label: "Birthday Party", icon: <PartyPopper size={12} /> },
    { label: "Fine Dining", icon: <Wine size={12} /> }
  ];

  return (
    <section className="bg-white py-20 sm:py-32 px-6 md:px-12 border-t border-slate-100 overflow-hidden relative">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 sm:gap-20 items-center relative z-10">
        <div className="space-y-8 sm:space-y-12">
          <div className="inline-flex items-center space-x-3 px-4 py-1.5 sm:px-6 sm:py-2 bg-slate-50 rounded-full border border-slate-100 shadow-sm">
            <Zap size={14} className="text-primary-gold" />
            <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-black"> AI CONCIERGE SERVICE</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black font-heading leading-[0.9] uppercase tracking-tighter">
            Match Your <br/> <span className="text-primary-gold italic">Vibe.</span>
          </h2>
          
          <p className="text-slate-400 text-[11px] sm:text-sm leading-relaxed max-w-sm font-bold uppercase tracking-widest">
            Don't know what to pop? Describe your mood and let the concierge curate your night.
          </p>
          
          <form onSubmit={handleRecommend} className="relative group max-w-lg">
            <input 
              type="text" 
              placeholder="E.G. A LOUD SUNDOWNER..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-100 p-6 sm:p-8 pr-16 sm:pr-20 focus:outline-none focus:border-primary-gold transition-all text-[10px] sm:text-[12px] uppercase tracking-[0.2em] font-black placeholder:text-slate-300 text-black rounded-2xl sm:rounded-[32px] shadow-sm"
            />
            <button 
              type="submit"
              disabled={loading}
              className="absolute right-3 top-3 bottom-3 sm:right-4 sm:top-4 sm:bottom-4 aspect-square bg-black text-white flex items-center justify-center hover:bg-primary-gold hover:text-black transition-all rounded-xl sm:rounded-2xl disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <ChevronRight size={24} />}
            </button>
          </form>

          <div className="flex flex-wrap gap-2 sm:gap-4">
            {quickPrompts.map((qp) => (
              <button 
                key={qp.label}
                onClick={() => setPrompt(qp.label)}
                className="px-4 py-3 sm:px-6 sm:py-4 bg-white border border-slate-100 rounded-xl sm:rounded-2xl text-[8px] sm:text-[10px] uppercase font-black text-slate-400 hover:text-primary-gold hover:border-primary-gold transition-all flex items-center gap-2 sm:gap-3 shadow-sm"
              >
                {qp.icon}
                <span>{qp.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative min-h-[350px] sm:min-h-[450px] flex items-center justify-center">
          {loading ? (
            <div className="flex flex-col items-center space-y-6 sm:space-y-8">
               <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl sm:rounded-[32px] bg-slate-50 border border-primary-gold flex items-center justify-center shadow-2xl animate-pulse">
                 <Sparkles className="text-primary-gold" size={32} />
               </div>
               <p className="text-[10px] sm:text-[12px] uppercase tracking-[0.5em] sm:tracking-[1em] text-primary-gold font-black">CURATING VIBES</p>
            </div>
          ) : result ? (
            <div className="w-full bg-slate-50 p-8 sm:p-12 md:p-16 border border-slate-200 rounded-[32px] sm:rounded-[48px] relative animate-in zoom-in duration-700 shadow-2xl">
               <div className="flex justify-between items-center mb-6 sm:mb-10">
                 <span className="text-[10px] sm:text-[12px] font-black uppercase text-primary-gold tracking-[0.3em] sm:tracking-[0.5em]">{result.vibe}</span>
                 <Zap size={20} className="text-slate-200" />
               </div>
               <h3 className="text-3xl sm:text-4xl md:text-6xl font-black font-heading mb-6 sm:mb-10 uppercase leading-none tracking-tighter text-black">{result.recommendation}</h3>
               <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-8 sm:mb-12 font-bold border-l-4 border-primary-gold pl-6 sm:pl-8 italic">
                 "{result.reasoning}"
               </p>
               <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-200 pt-8 sm:pt-10 gap-6 sm:gap-8">
                 <div className="text-center sm:text-left">
                   <span className="text-slate-300 block uppercase font-black text-[8px] tracking-[0.3em] mb-1">PICKED FOR YOU</span>
                   <span className="font-black text-lg sm:text-2xl text-black uppercase tracking-tight">{result.suggestedProduct}</span>
                 </div>
                 <button className="w-full sm:w-auto bg-black text-white px-8 py-4 sm:px-12 sm:py-6 rounded-2xl sm:rounded-3xl text-[9px] sm:text-[11px] font-black uppercase tracking-widest hover:bg-primary-gold hover:text-black transition-all shadow-2xl active:scale-95">
                   ADD TO STASH
                 </button>
               </div>
            </div>
          ) : (
            <div className="w-full bg-slate-50/50 border-2 sm:border-4 border-dashed border-slate-100 rounded-[32px] sm:rounded-[48px] p-12 sm:p-20 text-center flex flex-col items-center justify-center space-y-6 sm:space-y-10">
               <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-white flex items-center justify-center border border-slate-100 shadow-sm">
                 <Wine size={32} className="text-slate-100 sm:w-12 sm:h-12" />
               </div>
               <div className="space-y-3">
                 <p className="text-[10px] sm:text-[12px] uppercase tracking-[0.5em] sm:tracking-[0.8em] font-black text-slate-200">Awaiting Your Call</p>
                 <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.2em] font-bold text-slate-100">Our concierge is ready to recommend</p>
               </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
