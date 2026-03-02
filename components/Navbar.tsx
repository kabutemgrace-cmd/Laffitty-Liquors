
import React from 'react';
import { ShoppingCart, Beer } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onHomeClick: () => void;
}

export default function Navbar({ cartCount, onCartClick, onHomeClick }: NavbarProps) {
  return (
    <div className="fixed top-0 w-full z-50">
      <div className="bg-primary-gold py-1.5 text-center">
        <p className="text-xs font-medium text-black flex items-center justify-center gap-2">
          <Beer size={12} /> Laffitty Express — <span className="font-semibold">20–30 min delivery</span>
        </p>
      </div>

      <nav className="bg-white/80 backdrop-blur-md px-4 md:px-12 py-3 sm:py-4 flex justify-between items-center border-b border-slate-100 shadow-sm">
        <div
          onClick={onHomeClick}
          className="text-xl sm:text-2xl font-bold font-heading tracking-tight text-black cursor-pointer hover:text-primary-gold transition-all"
        >
          Laffitty <span className="text-primary-gold italic">Liquors.</span>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <button
            className="relative cursor-pointer group p-2 sm:p-2.5 hover:bg-slate-100 rounded-full transition-all"
            onClick={onCartClick}
          >
            <ShoppingCart className="text-slate-900 w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-laffitty-red text-white text-[9px] font-semibold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>
    </div>
  );
}
