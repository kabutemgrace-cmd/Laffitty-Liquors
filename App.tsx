
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import SpiritFacts from './components/SpiritFacts';
import { PRODUCTS, CATEGORIES } from './constants';
import { Product, CartItem } from './types';
import { Instagram, Facebook, Phone, Mail, MessageCircle, MapPin, Twitter, ArrowLeft, Search, X } from 'lucide-react';

type View = 'home' | 'inventory';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('laffitty-cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showAgeGate, setShowAgeGate] = useState(true);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating' | 'name'>('default');
  const [priceRange, setPriceRange] = useState<'all' | 'under-2k' | '2k-5k' | 'over-5k'>('all');

  useEffect(() => {
    const verified = localStorage.getItem('age-verified');
    if (verified === 'true') setShowAgeGate(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('laffitty-cart', JSON.stringify(cart));
  }, [cart]);

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

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => item.id === id ? { ...item, quantity: item.quantity + delta } : item)
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const filteredProducts = useMemo(() => {
    const priceMap = {
      'all':       (_: number) => true,
      'under-2k':  (p: number) => p < 2000,
      '2k-5k':     (p: number) => p >= 2000 && p <= 5000,
      'over-5k':   (p: number) => p > 5000,
    };

    const filtered = PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            p.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory ? p.category === activeCategory : true;
      const matchesPrice = priceMap[priceRange](p.price);
      return matchesSearch && matchesCategory && matchesPrice;
    });

    switch (sortBy) {
      case 'price-asc':  return [...filtered].sort((a, b) => a.price - b.price);
      case 'price-desc': return [...filtered].sort((a, b) => b.price - a.price);
      case 'rating':     return [...filtered].sort((a, b) => b.rating - a.rating);
      case 'name':       return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      default:           return filtered;
    }
  }, [searchTerm, activeCategory, sortBy, priceRange]);

  const topHits = useMemo(() => PRODUCTS.slice(0, 4), []);

  const handleSectionClick = (catId: string) => {
    setActiveCategory(catId);
    setView('inventory');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setView('home');
    setActiveCategory(null);
    setSearchTerm('');
    setSortBy('default');
    setPriceRange('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <div className="bg-white min-h-screen text-slate-900 selection:bg-primary-gold selection:text-black font-sans overflow-x-hidden fun-mesh">
      {showAgeGate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white p-6 text-center">
          <div className="max-w-md w-full space-y-8">
            <h3 className="text-4xl sm:text-5xl font-bold font-heading tracking-tight">
              Laffitty <br/> <span className="text-primary-gold italic">18+</span>
            </h3>
            <p className="text-slate-400 font-medium text-sm leading-relaxed">
              Alcohol consumption is injurious to health. Not for persons under 18 years.
            </p>
            <div className="flex flex-col gap-4">
              <button
                onClick={handleVerifyAge}
                className="bg-black text-white font-semibold py-4 uppercase text-xs tracking-widest rounded-2xl shadow-2xl hover:bg-primary-gold hover:text-black transition-all"
              >
                I am of Age
              </button>
              <button
                onClick={() => window.location.href = 'https://google.com'}
                className="text-slate-300 font-medium py-3 text-sm hover:text-laffitty-red transition-colors"
              >
                Leave Site
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
            <Hero onBrowseClick={() => setView('inventory')} />

            <div id="shop" className="bg-white relative z-40 rounded-t-[40px] md:rounded-t-[60px] -mt-12 sm:-mt-10 shadow-[0_-30px_100px_rgba(0,0,0,0.05)]">
               <Categories onCategorySelect={handleSectionClick} />
            </div>

            <section className="px-6 md:px-12 py-16 sm:py-24 max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center mb-12 sm:mb-16 gap-8 text-center md:text-left">
                <div>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading tracking-tight leading-tight">
                    Weekend <span className="text-laffitty-red italic">Essentials</span>
                  </h3>
                  <p className="text-slate-400 text-sm mt-3 font-normal">Top picks this week</p>
                </div>
                <button
                  onClick={() => setView('inventory')}
                  className="px-8 py-4 rounded-xl bg-black text-white text-sm font-semibold tracking-wide hover:bg-primary-gold transition-colors shadow-xl"
                >
                  Full Inventory
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
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading tracking-tight">
                      {cat.name}
                    </h3>
                    <button
                      onClick={() => handleSectionClick(cat.id)}
                      className="text-sm font-medium text-slate-400 hover:text-primary-gold transition-colors"
                    >
                      Browse all →
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

            {/* Header */}
            <div className="mb-8 sm:mb-10">
              <button
                onClick={handleGoHome}
                className="flex items-center gap-2 mb-5 text-sm font-medium text-slate-400 hover:text-black transition-colors"
              >
                <ArrowLeft size={14} /> Back to Home
              </button>
              <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading tracking-tight">
                The <span className="text-primary-gold italic">Stash</span>
              </h3>
            </div>

            {/* Search bar */}
            <div className="relative mb-6 sm:mb-8">
              <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search for a spirit, wine, beer, vape..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border-2 border-slate-200 focus:border-primary-gold rounded-2xl pl-12 pr-12 py-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-300 shadow-sm focus:shadow-md"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 pb-6 border-b border-slate-100">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                  !activeCategory
                    ? 'bg-black text-white border-black shadow-lg'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:text-black'
                }`}
              >
                All
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                    activeCategory === cat.id
                      ? 'bg-primary-gold text-black border-primary-gold shadow-lg'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:text-black'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Price range + Sort row */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-10 sm:mb-14">

              {/* Price range presets */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Price Range</span>
                <div className="flex flex-wrap gap-2">
                  {([
                    { key: 'all',      label: 'All Prices' },
                    { key: 'under-2k', label: 'Under KSh 2,000' },
                    { key: '2k-5k',    label: 'KSh 2,000 – 5,000' },
                    { key: 'over-5k',  label: 'KSh 5,000+' },
                  ] as const).map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setPriceRange(key)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                        priceRange === key
                          ? 'bg-black text-white border-black shadow-md'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:text-black'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort options */}
              <div className="flex flex-col gap-2 sm:items-end">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Sort By</span>
                <div className="flex flex-wrap gap-2">
                  {([
                    { key: 'default',    label: 'Featured' },
                    { key: 'price-asc',  label: 'Price: Low → High' },
                    { key: 'price-desc', label: 'Price: High → Low' },
                    { key: 'rating',     label: 'Top Rated' },
                    { key: 'name',       label: 'Name A–Z' },
                  ] as const).map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setSortBy(key)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                        sortBy === key
                          ? 'bg-primary-gold text-black border-primary-gold shadow-md'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:text-black'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

             {filteredProducts.length > 0 ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 animate-in fade-in duration-700">
                  {filteredProducts.map(p => <ProductCard key={p.id} product={p} onAddToCart={addToCart} />)}
               </div>
             ) : (
               <div className="py-24 text-center">
                 <p className="text-xl font-medium text-slate-300">No products match your filters.</p>
                 <button
                   onClick={() => { setActiveCategory(null); setSearchTerm(''); setPriceRange('all'); setSortBy('default'); }}
                   className="mt-6 text-primary-gold font-semibold text-sm hover:underline"
                 >
                   Clear all filters
                 </button>
               </div>
             )}
          </section>
        )}
      </main>

      <footer className="bg-slate-900 pt-20 pb-12 px-6 text-white border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-20">
          <div className="lg:col-span-2 space-y-8 text-center sm:text-left">
            <h3 className="text-3xl font-bold font-heading tracking-tight">
              Laffitty <span className="text-primary-gold italic">Liquors.</span>
            </h3>
            <p className="text-slate-400 text-sm font-normal leading-relaxed max-w-md mx-auto sm:mx-0">
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
            <h4 className="text-xs font-semibold uppercase tracking-widest text-primary-gold">Shop</h4>
            <ul className="space-y-3 text-sm font-normal text-slate-400">
              {['Premium Whiskey', 'Vodka', 'Agave Tequila', 'Vapes & Mods', 'Velo Nicotine'].map((item, i) => (
                <li key={i}><button className="hover:text-primary-gold transition-colors">{item}</button></li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 text-center sm:text-left">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-primary-gold">Contact</h4>
            <ul className="space-y-5 text-sm font-normal text-slate-300">
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

        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-normal text-slate-500 text-center">
           <p>© 2024 Laffitty Liquors Group. Nairobi, Kenya.</p>
           <div className="flex flex-wrap justify-center gap-6">
             <a href="#" className="hover:text-white transition-colors">Responsible Drinking</a>
             <a href="#" className="hover:text-white transition-colors">18+ Only</a>
             <span className="text-primary-gold">Est. 2024</span>
           </div>
        </div>
      </footer>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onOrderComplete={() => setCart([])}
        onGoToInventory={() => { setIsCartOpen(false); setView('inventory'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
      />
    </div>
  );
}
