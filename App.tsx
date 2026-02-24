
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import SpiritFacts from './components/SpiritFacts';
import { PRODUCTS, CATEGORIES } from './constants';
import { Product, CartItem } from './types';
import { Instagram, Facebook, Phone, Mail, MessageCircle, MapPin, Twitter, ArrowLeft } from 'lucide-react';

type View = 'home' | 'inventory';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showAgeGate, setShowAgeGate] = useState(true);

  useEffect(() => {
    const verified = localStorage.getItem('age-verified');
    if (verified === 'true') setShowAgeGate(false);
  }, []);

  const handleVerifyAge = () => {
    localStorage.setItem('age-verified', 'true');
    setShowAgeGate(false);
  };

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           p.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory ? p.category === activeCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  const topHits = useMemo(() => PRODUCTS.slice(0, 4), []);

  const handleSectionClick = (catId: string) => {
    setActiveCategory(catId);
    setView('inventory');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setView('home');
    setActiveCategory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white min-h-screen text-slate-900 selection:bg-primary-gold selection:text-black font-sans overflow-x-hidden fun-mesh">
      {showAgeGate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white p-6 text-center">
          <div className="max-w-md w-full space-y-8">
            <h3 className="text-4xl sm:text-5xl font-black font-heading tracking-tighter">
              LAFFITTY <br/> <span className="text-primary-gold italic">18+</span>
            </h3>
            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] leading-loose">
              Alcohol consumption is injurious to health. Not for persons under 18 years.
            </p>
            <div className="flex flex-col gap-4">
              <button 
                onClick={handleVerifyAge} 
                className="bg-black text-white font-black py-5 uppercase text-[10px] tracking-[0.3em] rounded-2xl shadow-2xl hover:bg-primary-gold hover:text-black transition-all"
              >
                I AM OF AGE
              </button>
              <button 
                onClick={() => window.location.href = 'https://google.com'} 
                className="text-slate-300 font-black py-4 text-[9px] tracking-widest uppercase hover:text-laffitty-red"
              >
                LEAVE SITE
              </button>
            </div>
          </div>
        </div>
      )}

      <Navbar 
        cartCount={cart.length} 
        onCartClick={() => setIsCartOpen(true)} 
        onHomeClick={handleGoHome} 
      />
      
      <main className="pt-0 relative">
        {view === 'home' ? (
          <>
            <Hero onSearch={setSearchTerm} searchTerm={searchTerm} onBrowseClick={() => setView('inventory')} />
            
            <div id="shop" className="bg-white relative z-40 rounded-t-[40px] md:rounded-t-[60px] -mt-12 sm:-mt-10 shadow-[0_-30px_100px_rgba(0,0,0,0.05)]">
               <Categories onCategorySelect={handleSectionClick} />
            </div>
            
            <section className="px-6 md:px-12 py-16 sm:py-24 max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center mb-12 sm:mb-16 gap-8 text-center md:text-left">
                <div>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tighter uppercase leading-[1]">
                    Weekend <br/><span className="text-laffitty-red">Essentials.</span>
                  </h3>
                  <p className="text-slate-400 text-[9px] sm:text-[10px] mt-4 font-bold uppercase tracking-[0.3em]">Top Picks This Week</p>
                </div>
                <button 
                  onClick={() => setView('inventory')} 
                  className="px-8 py-4 rounded-xl bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-primary-gold transition-colors shadow-xl"
                >
                  FULL INVENTORY
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-12">
                {topHits.map(p => <ProductCard key={p.id} product={p} onAddToCart={addToCart} />)}
              </div>
            </section>

            {CATEGORIES.slice(0, 3).map((cat) => {
              const categoryProducts = PRODUCTS.filter(p => p.category === cat.id).slice(0, 4);
              if (categoryProducts.length === 0) return null; 
              
              return (
                <section key={cat.id} className="px-6 md:px-12 py-16 sm:py-20 max-w-7xl mx-auto border-t border-slate-50">
                  <div className="flex flex-row justify-between items-end mb-10 sm:mb-12">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading tracking-tighter uppercase">
                      {cat.name}
                    </h3>
                    <button 
                      onClick={() => handleSectionClick(cat.id)}
                      className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary-gold"
                    >
                      Browse All →
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
                    {categoryProducts.map(p => <ProductCard key={p.id} product={p} onAddToCart={addToCart} />)}
                  </div>
                </section>
              );
            })}
            
            <SpiritFacts />
          </>
        ) : (
          <section className="px-6 md:px-12 py-24 sm:py-32 max-w-7xl mx-auto min-h-screen pt-32 sm:pt-40">
             <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-12 sm:mb-16">
               <div>
                 <button 
                   onClick={handleGoHome}
                   className="flex items-center gap-2 mb-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-black transition-colors"
                 >
                   <ArrowLeft size={14} /> Back To Home
                 </button>
                 <h3 className="text-4xl sm:text-5xl md:text-6xl font-black font-heading uppercase tracking-tighter">THE <br/><span className="text-primary-gold italic">STASH.</span></h3>
               </div>
               <div className="flex flex-wrap gap-2 sm:gap-3">
                 <button 
                   onClick={() => setActiveCategory(null)} 
                   className={`px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${!activeCategory ? 'bg-black text-white shadow-xl' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                 >
                   All
                 </button>
                 {CATEGORIES.map(cat => (
                   <button 
                     key={cat.id} 
                     onClick={() => setActiveCategory(cat.id)} 
                     className={`px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeCategory === cat.id ? 'bg-primary-gold text-black shadow-xl' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                   >
                     {cat.name}
                   </button>
                 ))}
               </div>
             </div>
             
             {filteredProducts.length > 0 ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 animate-in fade-in duration-700">
                  {filteredProducts.map(p => <ProductCard key={p.id} product={p} onAddToCart={addToCart} />)}
               </div>
             ) : (
               <div className="py-24 text-center">
                 <p className="text-2xl font-black text-slate-200 uppercase tracking-tighter">No Vibes Found In This Stash.</p>
                 <button onClick={() => setActiveCategory(null)} className="mt-8 text-primary-gold font-black uppercase tracking-widest text-[10px]">Clear Filters</button>
               </div>
             )}
          </section>
        )}
      </main>

      <footer className="bg-slate-900 pt-20 pb-12 px-6 text-white border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-20">
          <div className="lg:col-span-2 space-y-8 text-center sm:text-left">
            <h3 className="text-3xl font-black tracking-tighter font-heading uppercase">
              Laffitty <span className="text-primary-gold">Liquors.</span>
            </h3>
            <p className="text-slate-400 text-xs font-semibold leading-relaxed max-w-md tracking-tight mx-auto sm:mx-0">
              Kilimani, Ngong Road and Adams Arcade's premium drink plug. Fast, cold, and always on. 24/7 delivery for the sophisticated night owl.
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-4">
              {[Instagram, Twitter, Facebook, MessageCircle].map((Icon, i) => (
                <a key={i} href="#" className="p-4 bg-white/5 rounded-2xl hover:bg-primary-gold transition-all group">
                  <Icon size={18} className="text-white group-hover:text-black" />
                </a>
              ))}
            </div>
          </div>
          
          <div className="space-y-6 text-center sm:text-left">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-gold">Shop Stash</h4>
            <ul className="space-y-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
              {['Premium Whiskey', 'Vodka Stash', 'Agave Tequila', 'Vapes & Mods', 'Velo Nicotine'].map((item, i) => (
                <li key={i}><button className="hover:text-primary-gold transition-colors">{item}</button></li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 text-center sm:text-left">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-gold">Concierge</h4>
            <ul className="space-y-6 text-[9px] font-black uppercase tracking-[0.1em] text-slate-200">
              <li className="flex flex-col sm:flex-row items-center gap-3">
                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-laffitty-red"><Phone size={14} /></div>
                +254 700 000 000
              </li>
              <li className="flex flex-col sm:flex-row items-center gap-3">
                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-laffitty-blue"><Mail size={14} /></div>
                orders@laffitty.ke
              </li>
              <li className="flex flex-col sm:flex-row items-center gap-3">
                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-primary-gold"><MapPin size={14} /></div>
                Ngong Road, Nairobi
              </li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[8px] font-black uppercase tracking-[0.3em] text-slate-500 text-center">
           <p>© 2024 LAFFITTY LIQUORS GROUP. NAIROBI, KE.</p>
           <div className="flex flex-wrap justify-center gap-6">
             <a href="#" className="hover:text-white">RESPONSIBLE DRINKING</a>
             <a href="#" className="hover:text-white">18+ ONLY</a>
             <span className="text-primary-gold">EST. 2024</span>
           </div>
        </div>
      </footer>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cart} onRemove={removeFromCart} />
    </div>
  );
}
