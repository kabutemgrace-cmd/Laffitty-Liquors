
import React from 'react';
import { CATEGORIES } from '../constants';

interface CategoriesProps {
  onCategorySelect?: (id: string) => void;
}

export default function Categories({ onCategorySelect }: CategoriesProps) {
  return (
    <div className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-16 gap-8">
           <div className="text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-black font-heading tracking-tighter uppercase mb-4">
                Shop the <span className="text-primary-gold underline decoration-laffitty-blue decoration-2 underline-offset-4">Mood.</span>
              </h3>
              <p className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] md:tracking-[0.4em]">24/7 Premium Stash Access</p>
           </div>
           <div className="flex gap-4 hidden sm:flex">
              <div className="w-12 md:w-16 h-1 bg-laffitty-red rounded-full"></div>
              <div className="w-32 md:w-40 h-1 bg-primary-gold rounded-full"></div>
           </div>
        </div>

        {/* Realistic Grid - Fluid and Responsive */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
          {CATEGORIES.map((cat) => (
            <div 
              key={cat.id} 
              onClick={() => onCategorySelect?.(cat.id)}
              className="group cursor-pointer relative"
            >
              <div className="aspect-[1/1] rounded-[30px] md:rounded-[40px] overflow-hidden relative border-2 md:border-4 border-white shadow-xl transition-all duration-700 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)] group-hover:-translate-y-2 sm:group-hover:-translate-y-4">
                 <img 
                   src={cat.iconUrl} 
                   alt={cat.name} 
                   className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125" 
                   loading="lazy"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                 
                 {/* Floating Label */}
                 <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                    <p className={`text-sm sm:text-xl font-black uppercase tracking-widest text-white transition-all duration-500 ${cat.color}`}>
                      {cat.name}
                    </p>
                 </div>
                 
                 {/* Shop Now Badge */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md px-4 py-2 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-2xl scale-90 group-hover:scale-100 hidden sm:block">
                    <span className="text-black text-[8px] sm:text-[10px] font-black uppercase tracking-[0.4em]">Shop Now</span>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Background Decorative Text */}
      <div className="absolute -right-20 top-60 text-[18rem] font-black text-slate-50 pointer-events-none select-none -rotate-12 z-0 opacity-40 hidden xl:block">
        LAFFITTY
      </div>
    </div>
  );
}
