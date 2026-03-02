
import React, { useState, useEffect } from 'react';
import { PartyPopper, Zap, ChevronDown } from 'lucide-react';

interface HeroProps {
  onBrowseClick: () => void;
}

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1527281405159-eb1f44d6824b?auto=format&fit=crop&q=80&w=1600",
];

export default function Hero({ onBrowseClick }: HeroProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] sm:min-h-[100vh] w-full flex items-center justify-center overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/70 z-10" />
        {HERO_IMAGES.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={`Hero Background ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover animate-ken-burns scale-110 transition-opacity duration-[2000ms] ease-in-out ${
              activeImageIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute top-[15%] right-[5%] w-[15rem] h-[15rem] sm:w-[35rem] sm:h-[35rem] bg-laffitty-blue/20 blur-[100px] sm:blur-[150px] rounded-full animate-pulse z-20" />
        <div className="absolute bottom-[10%] left-[5%] w-[15rem] h-[15rem] sm:w-[30rem] sm:h-[30rem] bg-primary-gold/15 blur-[100px] sm:blur-[150px] rounded-full animate-pulse z-20" />
      </div>

      <div className="relative z-30 flex flex-col items-center text-center max-w-4xl px-4 sm:px-6 w-full -mt-10 sm:-mt-20">
        <div className="mb-6 sm:mb-8 inline-flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2 sm:px-6 sm:py-2.5 rounded-full shadow-2xl">
          <Zap className="text-primary-gold w-3.5 h-3.5" />
          <span className="text-white text-xs font-medium tracking-wide">Ngong Road's Premium Plug</span>
          <PartyPopper className="text-laffitty-red w-3.5 h-3.5" />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight font-heading mb-6 sm:mb-8 drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
          Laffitty <br/>
          <span className="text-primary-gold italic">Liquors.</span>
        </h1>

        <p className="text-white/90 text-sm sm:text-base max-w-lg font-normal mb-10 sm:mb-12 drop-shadow-xl leading-relaxed px-4">
          Life's too short for warm beers. Cold spirits, smokes & snacks delivered in{' '}
          <span className="text-primary-gold font-semibold underline decoration-laffitty-red underline-offset-4 decoration-2">20 minutes.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-md px-4">
          <button
            onClick={onBrowseClick}
            className="flex-1 bg-primary-gold text-black px-8 py-4 font-semibold text-sm tracking-wide transition-all duration-300 shadow-[0_15px_30px_rgba(212,175,55,0.25)] rounded-2xl hover:bg-white active:scale-95"
          >
            Order Now
          </button>
          <button
            onClick={onBrowseClick}
            className="flex-1 bg-white/10 backdrop-blur-2xl text-white border-2 border-white/40 px-8 py-4 font-semibold text-sm tracking-wide transition-all duration-300 rounded-2xl hover:bg-white hover:text-black active:scale-95"
          >
            View Collection
          </button>
        </div>
      </div>

      <div className="absolute bottom-12 sm:bottom-20 left-1/2 -translate-x-1/2 z-40 animate-bounce text-white/50 hidden md:block">
        <ChevronDown size={32} />
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] h-12 sm:h-20 z-40">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-full fill-white">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86C260.6,73.57,211.77,106.13,168,111c-61,6.88-116.69-4.68-168-15.2V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
        </svg>
      </div>
    </section>
  );
}
