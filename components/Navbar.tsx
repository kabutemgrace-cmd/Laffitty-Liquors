
import React, { useState, useEffect } from 'react';
import { ShoppingCart, MapPin, Beer, Maximize, Minimize } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onHomeClick: () => void;
}

export default function Navbar({ cartCount, onCartClick, onHomeClick }: NavbarProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="fixed top-0 w-full z-50">
      <div className="bg-primary-gold py-1 sm:py-1.5 text-center">
        <p className="text-[7px] sm:text-[9px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-black text-black flex items-center justify-center gap-1.5 sm:gap-2">
          <Beer size={10} className="sm:w-3 sm:h-3" /> LAFFITTY EXPRESS: <span className="underline">20-30 MINS DELIVERY</span>
        </p>
      </div>

      <nav className="bg-white/80 backdrop-blur-md px-4 md:px-12 py-3 sm:py-4 flex justify-between items-center border-b border-slate-100 shadow-sm">
        <div 
          onClick={onHomeClick}
          className="text-xl sm:text-2xl font-black tracking-tighter font-heading text-black cursor-pointer hover:text-primary-gold transition-all uppercase"
        >
          Laffitty <span className="text-primary-gold italic">Liquors.</span>
        </div>
        
        <div className="hidden lg:flex items-center space-x-3 bg-slate-50 border border-slate-200 px-5 py-2 rounded-full group cursor-pointer hover:border-primary-gold transition-all duration-300">
          <MapPin size={14} className="text-laffitty-red" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-slate-900 transition-colors">NGONG RD • KILIMANI • ADAMS</span>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <button 
            onClick={toggleFullscreen}
            className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-500 hover:text-black hidden sm:flex"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>

          <button className="relative cursor-pointer group p-2 sm:p-2.5 hover:bg-slate-100 rounded-full transition-all" onClick={onCartClick}>
            <ShoppingCart className="text-slate-900 w-5 h-5 sm:w-5 sm:h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-laffitty-red text-white text-[8px] sm:text-[9px] font-black px-1.5 sm:px-2 py-0.5 rounded-full ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>
    </div>
  );
}
