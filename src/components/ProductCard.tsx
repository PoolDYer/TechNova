import React from 'react';
import { Plus, Check, Star } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
  highlight?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, highlight }) => {
  const { addToCart } = useStore();

  return (
    <div className={`group relative bg-white rounded-lg shadow-sm border transition-all duration-300 hover:shadow-xl flex flex-col overflow-hidden ${highlight ? 'ring-2 ring-indigo-500 scale-[1.02] z-10' : 'border-slate-200'}`}>
      {highlight && (
        <div className="absolute top-0 left-0 w-full bg-indigo-600 text-white text-[10px] font-bold text-center py-1 z-20">
          RECOMENDADO POR NOVA AI
        </div>
      )}
      
      {/* Badges similar to Retail */}
      {!highlight && (
          <div className="absolute top-2 left-2 z-20 flex flex-col gap-1">
             <span className="bg-[#A3CD39] text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded">ENVÍO RÁPIDO</span>
             {product.price > 4000 && <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">-15% DCTO</span>}
          </div>
      )}
      
      <div className="aspect-[1/1] overflow-hidden bg-white p-4 relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow border-t border-slate-100">
        <div className="mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase">{product.category}</span>
            <h3 className="text-sm font-bold text-slate-900 leading-tight min-h-[40px] mt-1 group-hover:text-green-700 transition-colors">{product.name}</h3>
        </div>

        {/* Rating Mock */}
        <div className="flex items-center gap-1 mb-2">
            <div className="flex text-yellow-400">
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
            </div>
            <span className="text-xs text-slate-400">(24)</span>
        </div>

        <div className="mt-auto">
            <div className="flex flex-col mb-3">
                <span className="text-xs text-slate-400 line-through">Normal: S/. {(product.price * 1.2).toFixed(0)}</span>
                <span className="text-xl font-bold text-red-600">S/. {product.price.toLocaleString()}</span>
            </div>
            
            <button 
            onClick={() => addToCart(product)}
            className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-green-700 text-white py-2.5 rounded-full transition-colors font-bold text-xs uppercase tracking-wide"
            >
            <Plus className="h-4 w-4" />
            Agregar a la bolsa
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;