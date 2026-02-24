
import React from 'react';
import { Product } from '../types';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group flex flex-col bg-white border border-slate-100 rounded-[32px] overflow-hidden hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-700 hover:-translate-y-2">
      <div className="aspect-square p-8 flex items-center justify-center relative bg-slate-50/50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700 filter drop-shadow-2xl"
        />
        <div className="absolute top-4 right-4">
           <span className="text-[9px] font-black uppercase bg-white/90 px-3 py-1.5 rounded-full shadow-sm text-slate-500 border border-slate-100 backdrop-blur-sm">
             {product.category}
           </span>
        </div>
      </div>
      
      <div className="p-8 flex flex-col space-y-4">
        <h3 className="font-black text-sm uppercase tracking-tight text-slate-800 leading-tight min-h-[2.5rem]">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between">
          <p className="text-black font-black text-lg">
            <span className="text-[10px] text-slate-400 mr-1 font-bold">KSH</span>
            {product.price.toLocaleString()}
          </p>
          <button 
            onClick={() => onAddToCart(product)}
            className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center transition-all duration-300 hover:bg-primary-gold hover:text-black shadow-lg"
          >
            <Plus size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
