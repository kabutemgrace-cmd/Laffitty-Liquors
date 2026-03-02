
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
    <section className="py-8 px-6 md:px-12 bg-black border-t border-white/[0.05] relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white/[0.03] border border-white/[0.1] rounded-2xl px-6 py-5 md:px-10 md:py-6 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">

          <div className="flex items-center gap-5 flex-1">
            <div className="p-2.5 bg-primary-gold/10 rounded-xl border border-primary-gold/20 hidden sm:block">
              <BookOpen className="text-primary-gold" size={16} />
            </div>

            <div className="text-center md:text-left">
              <span className="text-primary-gold text-xs font-medium tracking-wide block mb-1 opacity-70">
                Laffitty Historian {data?.spiritType && `· ${data.spiritType}`}
              </span>

              <div className="min-h-[24px] flex items-center justify-center md:justify-start">
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin text-primary-gold" size={12} />
                    <span className="text-xs text-white/40 font-normal">Uncorking a truth...</span>
                  </div>
                ) : data ? (
                  <p className="text-sm font-normal text-white/80 leading-relaxed animate-in fade-in slide-in-from-bottom-1 duration-700 italic">
                    "{data.fact}"
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <button
            onClick={fetchFact}
            disabled={loading}
            className="group flex items-center gap-2 bg-primary-gold hover:bg-white text-black px-5 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 active:scale-95 disabled:opacity-50 shadow-[0_10px_20px_rgba(212,175,55,0.15)]"
          >
            {loading ? <Loader2 size={13} className="animate-spin" /> : <RefreshCw size={13} className="group-hover:rotate-180 transition-transform duration-500" />}
            <span>Next fact</span>
          </button>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary-gold/5 blur-[120px] pointer-events-none rounded-full" />
    </section>
  );
}
