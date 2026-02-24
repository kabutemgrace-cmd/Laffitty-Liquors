
import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
}

export default function CartDrawer({ isOpen, onClose, items, onRemove }: CartDrawerProps) {
  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[60] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] transition-transform duration-500 shadow-2xl flex flex-col rounded-l-[40px] border-l border-slate-100 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 flex justify-between items-center">
          <div className="space-y-1">
            <h2 className="text-3xl font-black tracking-tighter uppercase font-heading">
              The <span className="text-primary-gold">Stash.</span>
            </h2>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">You have {items.length} items</p>
          </div>
          <button onClick={onClose} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-full transition-all text-slate-400 hover:text-black">
            <X size={20} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-8 space-y-6 no-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-300 space-y-6">
              <div className="p-10 bg-slate-50 rounded-full">
                <ShoppingBag size={64} className="opacity-20" />
              </div>
              <p className="uppercase tracking-widest text-[10px] font-black">Your stash is dry.</p>
              <button 
                onClick={onClose}
                className="bg-black text-white px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary-gold hover:text-black transition-all"
              >
                RESTOCK NOW
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-6 group animate-in slide-in-from-right-4">
                <div className="w-24 h-24 bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-grow flex flex-col justify-center">
                  <h4 className="font-black text-xs uppercase tracking-tight text-slate-900 mb-1">{item.name}</h4>
                  <p className="text-vibrant-amber font-black text-sm">KSh {item.price.toLocaleString()}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-slate-400">Qty: {item.quantity}</span>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="p-2 text-slate-300 hover:text-laffitty-red transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-8 bg-slate-50/50 rounded-tl-[40px] space-y-6 border-t border-slate-100">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <span className="text-slate-400 uppercase text-[10px] font-black tracking-widest">Grand Total</span>
            </div>
            <span className="text-3xl font-black text-black">KSh {total.toLocaleString()}</span>
          </div>
          <button 
            disabled={items.length === 0}
            className="w-full bg-black text-white font-black py-5 uppercase text-xs tracking-widest hover:bg-primary-gold hover:text-black transition-all active:scale-95 disabled:opacity-50 disabled:grayscale shadow-2xl rounded-2xl"
          >
            ORDER THE VIBE
          </button>
          <p className="text-[9px] text-slate-400 text-center uppercase tracking-[0.2em] font-bold">Delivery to Ngong Rd / Kilimani in 22 mins</p>
        </div>
      </div>
    </>
  );
}
