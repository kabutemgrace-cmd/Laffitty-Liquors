
import React, { useState, useEffect } from 'react';
import { Loader2, BookOpen, RefreshCw } from 'lucide-react';
import { getSpiritFact } from '../services/geminiService';

export default function SpiritFacts() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ fact: string; spiritType: string } | null>(null);

  const fetchFact = async () => {
    setLoading(true);
    const result = await getSpiritFact();
    if (result) setData(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchFact();
  }, []);

  return (
    <section className="py-6 px-6 md:px-12 bg-black border-t border-white/[0.05] relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white/[0.03] border border-white/[0.1] rounded-2xl p-4 md:px-8 md:py-5 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          
          <div className="flex items-center gap-6 flex-1">
            <div className="p-2.5 bg-primary-gold/10 rounded-xl border border-primary-gold/20 hidden sm:block">
              <BookOpen className="text-primary-gold" size={16} />
            </div>
            
            <div className="text-center md:text-left">
              <span className="text-primary-gold text-[8px] font-black uppercase tracking-[0.4em] block mb-1 opacity-70">
                LAFFITTY HISTORIAN {data?.spiritType && `• ${data.spiritType}`}
              </span>
              
              <div className="min-h-[24px] flex items-center justify-center md:justify-start">
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin text-primary-gold" size={12} />
                    <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest">UNCORKING TRUTH...</span>
                  </div>
                ) : data ? (
                  <p className="text-[12px] md:text-sm font-medium text-white/80 leading-relaxed animate-in fade-in slide-in-from-bottom-1 duration-700">
                    "{data.fact}"
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <button 
            onClick={fetchFact}
            disabled={loading}
            className="group relative flex items-center gap-3 bg-primary-gold hover:bg-white text-black px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 active:scale-95 disabled:opacity-50 shadow-[0_10px_20px_rgba(255,215,0,0.15)]"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-500" />}
            <span>NEXT POUR</span>
          </button>
        </div>
      </div>

      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary-gold/5 blur-[120px] pointer-events-none rounded-full" />
    </section>
  );
}
