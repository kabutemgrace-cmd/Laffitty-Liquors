
import { Product } from './types';

export const CATEGORIES = [
  { id: 'whiskey', name: 'Whiskey', iconUrl: 'https://images.unsplash.com/photo-1599940828174-da7d356c3677?auto=format&fit=crop&q=80&w=400', color: 'text-amber-600' },
  { id: 'vodka', name: 'Vodka', iconUrl: 'https://images.unsplash.com/photo-1614313511387-1436a4480ebb?auto=format&fit=crop&q=80&w=400', color: 'text-blue-500' },
  { id: 'tequila', name: 'Tequila', iconUrl: 'https://images.unsplash.com/photo-1516535750143-ef8821ee2b4d?auto=format&fit=crop&q=80&w=400', color: 'text-yellow-500' },
  { id: 'gin', name: 'Gins', iconUrl: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?auto=format&fit=crop&q=80&w=400', color: 'text-emerald-500' },
  { id: 'wine', name: 'Wine', iconUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=400', color: 'text-rose-500' },
  { id: 'beer', name: 'Beer', iconUrl: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?auto=format&fit=crop&q=80&w=400', color: 'text-orange-500' },
  { id: 'brandy', name: 'Brandy', iconUrl: 'https://images.unsplash.com/photo-1594498653385-d5172b532c00?auto=format&fit=crop&q=80&w=400', color: 'text-amber-800' },
  { id: 'mixers', name: 'Mixers', iconUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400', color: 'text-cyan-500' },
  { id: 'vapes', name: 'Vapes', iconUrl: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&q=80&w=400', color: 'text-purple-500' },
  { id: 'cigarettes', name: 'Cigarettes', iconUrl: 'https://images.unsplash.com/photo-1628144511210-6712852277c7?auto=format&fit=crop&q=80&w=400', color: 'text-slate-700' },
  { id: 'velo', name: 'Velo', iconUrl: 'https://images.unsplash.com/photo-1635326444740-485ad576dca1?auto=format&fit=crop&q=80&w=400', color: 'text-red-600' },
  { id: 'snacks', name: 'Snacks', iconUrl: 'https://images.unsplash.com/photo-1599490659213-e2b9527bb087?auto=format&fit=crop&q=80&w=400', color: 'text-yellow-600' },
  { id: 'cognac', name: 'Cognac', iconUrl: 'https://images.unsplash.com/photo-1516743618411-2073df051ea3?auto=format&fit=crop&q=80&w=400', color: 'text-stone-700' },
];

export const PRODUCTS: Product[] = [
  // Whiskey
  { id: 'w1', name: 'Jameson Black Barrel', price: 4800, category: 'whiskey', image: 'https://images.unsplash.com/photo-1527281405159-eb1f44d6824b?auto=format&fit=crop&q=80&w=500', description: 'Twice charred for richness.', rating: 4.9 },
  { id: 'w2', name: 'Glenfiddich 12 Year', price: 7800, category: 'whiskey', image: 'https://images.unsplash.com/photo-1569701813229-33284b643e3c?auto=format&fit=crop&q=80&w=500', description: 'World\'s best-selling single malt.', rating: 4.8 },
  { id: 'w3', name: 'Johnnie Walker Black Label', price: 5200, category: 'whiskey', image: 'https://images.unsplash.com/photo-1614313511387-1436a4480ebb?auto=format&fit=crop&q=80&w=500', description: 'Iconic blended scotch.', rating: 4.7 },
  { id: 'w4', name: 'Jack Daniels Old No. 7', price: 3900, category: 'whiskey', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=500', description: 'Classic Tennessee whiskey.', rating: 4.6 },

  // Vodka
  { id: 'v1', name: 'Belvedere Pure Vodka', price: 5800, category: 'vodka', image: 'https://images.unsplash.com/photo-1550985543-f47f38aee65e?auto=format&fit=crop&q=80&w=500', description: 'Super premium vodka.', rating: 4.9 },
  { id: 'v2', name: 'Ciroc Pineapple', price: 6500, category: 'vodka', image: 'https://images.unsplash.com/photo-1614313511387-1436a4480ebb?auto=format&fit=crop&q=80&w=500', description: 'French vodka distilled from grapes.', rating: 4.8 },
  { id: 'v3', name: 'Grey Goose Original', price: 6200, category: 'vodka', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=500', description: 'The worlds best tasting vodka.', rating: 4.9 },
  { id: 'v4', name: 'Absolut Blue', price: 2800, category: 'vodka', image: 'https://images.unsplash.com/photo-1595981267035-210427ec7cf4?auto=format&fit=crop&q=80&w=500', description: 'Iconic Swedish vodka.', rating: 4.5 },

  // Tequila
  { id: 't1', name: 'Don Julio 1942', price: 32000, category: 'tequila', image: 'https://images.unsplash.com/photo-1516535750143-ef8821ee2b4d?auto=format&fit=crop&q=80&w=500', description: 'Iconic luxury Tequila Añejo.', rating: 5.0 },
  { id: 't2', name: 'Casamigos Reposado', price: 12500, category: 'tequila', image: 'https://images.unsplash.com/photo-1632245889029-e406fbddad3e?auto=format&fit=crop&q=80&w=500', description: 'Smooth and refined.', rating: 4.9 },
  { id: 't3', name: 'Patron Silver', price: 8500, category: 'tequila', image: 'https://images.unsplash.com/photo-1614313511387-1436a4480ebb?auto=format&fit=crop&q=80&w=500', description: 'Crystal clear and smooth.', rating: 4.8 },
  { id: 't4', name: 'Clase Azul Reposado', price: 45000, category: 'tequila', image: 'https://images.unsplash.com/photo-1516535750143-ef8821ee2b4d?auto=format&fit=crop&q=80&w=500', description: 'Ultra premium artisan tequila.', rating: 5.0 },

  // Gin
  { id: 'g1', name: 'Bombay Sapphire', price: 3800, category: 'gin', image: 'https://images.unsplash.com/photo-1606767341142-b0625345719f?auto=format&fit=crop&q=80&w=500', description: 'Aromatic and balanced.', rating: 4.8 },
  { id: 'g2', name: 'Hendrick\'s Gin', price: 5500, category: 'gin', image: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?auto=format&fit=crop&q=80&w=500', description: 'Infused with cucumber and rose.', rating: 4.9 },
  { id: 'g3', name: 'Tanqueray No. Ten', price: 4200, category: 'gin', image: 'https://images.unsplash.com/photo-1635326444740-485ad576dca1?auto=format&fit=crop&q=80&w=500', description: 'Small batch premium gin.', rating: 4.8 },
  { id: 'g4', name: 'Monkey 47', price: 8800, category: 'gin', image: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?auto=format&fit=crop&q=80&w=500', description: 'Schwarzwald dry gin.', rating: 5.0 },

  // Wine
  { id: 'wi1', name: 'Simonsig Chenin Blanc', price: 2400, category: 'wine', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=500', description: 'South African crisp white wine.', rating: 4.8 },
  { id: 'wi2', name: 'Casillero del Diablo', price: 1800, category: 'wine', image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b0ca7df?auto=format&fit=crop&q=80&w=500', description: 'Chilean Cabernet Sauvignon.', rating: 4.6 },
  { id: 'wi3', name: 'Nederburg Shiraz', price: 2100, category: 'wine', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=500', description: 'Smooth, bold red.', rating: 4.7 },
  { id: 'wi4', name: 'Moet & Chandon Imperial', price: 9500, category: 'wine', image: 'https://images.unsplash.com/photo-1594498653385-d5172b532c00?auto=format&fit=crop&q=80&w=500', description: 'Classic French Champagne.', rating: 4.9 },

  // Beer
  { id: 'be1', name: 'Tusker Lager (6 Pack)', price: 1350, category: 'beer', image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?auto=format&fit=crop&q=80&w=500', description: 'Kenya\'s pride since 1922.', rating: 4.9 },
  { id: 'be2', name: 'White Cap Crisp (6 Pack)', price: 1450, category: 'beer', image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?auto=format&fit=crop&q=80&w=500', description: 'Refreshing premium lager.', rating: 4.8 },
  { id: 'be3', name: 'Heineken (6 Pack)', price: 1600, category: 'beer', image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?auto=format&fit=crop&q=80&w=500', description: 'International premium beer.', rating: 4.7 },
  { id: 'be4', name: 'Guinness Foreign Extra (6 Pack)', price: 1500, category: 'beer', image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?auto=format&fit=crop&q=80&w=500', description: 'Bold and rich stout.', rating: 4.8 },

  // Velo
  { id: 'vl1', name: 'Velo Polar Mint', price: 650, category: 'velo', image: 'https://images.unsplash.com/photo-1635326444740-485ad576dca1?auto=format&fit=crop&q=80&w=500', description: 'Icy nicotine pouches.', rating: 5.0 },
  { id: 'vl2', name: 'Velo Ruby Berry', price: 650, category: 'velo', image: 'https://images.unsplash.com/photo-1635326444740-485ad576dca1?auto=format&fit=crop&q=80&w=500', description: 'Sweet berry flavor.', rating: 4.9 },
  { id: 'vl3', name: 'Velo Urban Vibe', price: 650, category: 'velo', image: 'https://images.unsplash.com/photo-1635326444740-485ad576dca1?auto=format&fit=crop&q=80&w=500', description: 'Cherry and berry mix.', rating: 4.8 },
  { id: 'vl4', name: 'Velo Freeze Max', price: 750, category: 'velo', image: 'https://images.unsplash.com/photo-1635326444740-485ad576dca1?auto=format&fit=crop&q=80&w=500', description: 'Extra strong menthol.', rating: 4.9 },

  // Vapes
  { id: 'vp1', name: 'Yuoto 3000 Mango', price: 1500, category: 'vapes', image: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&q=80&w=500', description: 'Sweet mango vape.', rating: 4.7 },
  { id: 'vp2', name: 'Tugboat Super Ice', price: 1800, category: 'vapes', image: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&q=80&w=500', description: 'Cooling menthol pods.', rating: 4.8 },
  { id: 'vp3', name: 'Aroma King 5000', price: 2200, category: 'vapes', image: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&q=80&w=500', description: 'Premium long-lasting vape.', rating: 4.9 },
  { id: 'vp4', name: 'Elf Bar 1500', price: 1200, category: 'vapes', image: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&q=80&w=500', description: 'Classic disposable.', rating: 4.6 }
];
