import React from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from './ProductCard';
import { Sparkles, X, Search, Tag } from 'lucide-react';

interface ProductListProps {
  highlightedIds: string[];
  onClearHighlights: () => void;
}

const ProductList: React.FC<ProductListProps> = ({ highlightedIds, onClearHighlights }) => {
  const { products, categoryFilter, searchQuery, setSearchQuery } = useStore();

  const filteredProducts = products.filter(p => {
    // 0. Priority Override: If highlighted, always show it regardless of filter, 
    // BUT we usually reset filters in ChatBot. This is a safety net.
    if (highlightedIds.includes(p.id)) return true;

    // 1. Check Category or Offer Status
    let matchesCategory = false;
    if (categoryFilter === 'ALL') {
      matchesCategory = true;
    } else if (categoryFilter === 'OFFERS') {
      matchesCategory = p.price > 4000;
    } else {
      matchesCategory = p.category === categoryFilter;
    }
    
    // 2. Check Search Query (Case Insensitive)
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesSearch = 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.specs.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  // Sort: Highlighted items first
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const aHigh = highlightedIds.includes(a.id) ? 1 : 0;
    const bHigh = highlightedIds.includes(b.id) ? 1 : 0;
    return bHigh - aHigh; // Descending
  });

  const hasHighlights = highlightedIds.length > 0;
  const isSearching = searchQuery.trim().length > 0;

  const getTitle = () => {
    if (hasHighlights) return 'Recomendado por Nova';
    if (isSearching) return `Resultados para "${searchQuery}"`;
    if (categoryFilter === 'OFFERS') return 'Ofertas Exclusivas';
    if (categoryFilter === 'ALL') return 'Recomendados para ti';
    return `${categoryFilter}s`;
  };

  const getSubtitle = () => {
    if (hasHighlights) return 'Hemos filtrado la mejor opción para tus necesidades.';
    if (isSearching) return `Encontrados ${sortedProducts.length} productos.`;
    if (categoryFilter === 'OFFERS') return 'Aprovecha estos descuentos por tiempo limitado.';
    if (categoryFilter === 'ALL') return 'Lo mejor en tecnología lo encuentras aquí.';
    return `Explora nuestra selección de ${categoryFilter.toLowerCase()}s.`;
  };

  return (
    <div id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Active Filter Banner (AI) */}
      {hasHighlights && (
        <div className="mb-8 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-lg p-4 flex items-center justify-between text-white shadow-xl animate-pulse-slow border border-indigo-400">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full backdrop-blur-md">
               <Sparkles className="h-6 w-6 text-yellow-300" />
            </div>
            <div>
              <p className="font-bold text-lg leading-tight">¡Sugerencia Inteligente Activa!</p>
              <p className="text-indigo-100 text-sm">Nova ha resaltado el producto ideal en tu pantalla.</p>
            </div>
          </div>
          <button 
            onClick={onClearHighlights}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all"
          >
            Ver catálogo completo <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-end mb-6 gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase flex items-center gap-2">
             {categoryFilter === 'OFFERS' && <Tag className="h-6 w-6 text-red-600" />}
             {getTitle()}
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            {getSubtitle()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sortedProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            highlight={highlightedIds.includes(product.id)}
          />
        ))}
      </div>
      
      {sortedProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg border border-dashed border-slate-300 mt-4 text-center">
            <div className="bg-slate-100 p-4 rounded-full mb-4">
                <Search className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No encontramos lo que buscas</h3>
            <p className="text-slate-500 mb-6 max-w-sm">Intenta con otra palabra clave o navega por nuestras categorías.</p>
            <button 
                onClick={() => setSearchQuery('')}
                className="text-indigo-600 font-bold hover:underline"
            >
                Limpiar búsqueda
            </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;