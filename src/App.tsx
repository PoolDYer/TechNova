import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';
import ChatBot from './components/ChatBot';
import CheckoutModal from './components/CheckoutModal';
import OrdersModal from './components/OrdersModal';
import AuthModal from './components/AuthModal';
import { StoreProvider } from './context/StoreContext';
import { ChevronRight } from 'lucide-react';

const AppContent: React.FC = () => {
  const [highlightedProducts, setHighlightedProducts] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-slate-100 relative font-sans">
      <Navbar />
      <main className="pb-24">
        {/* Retail Style Banner Slider */}
        <div className="relative w-full h-[300px] md:h-[400px] bg-slate-900 overflow-hidden">
          {/* Background Image / Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-green-900">
            <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center mix-blend-overlay"></div>
          </div>

          <div className="relative max-w-7xl mx-auto h-full px-4 flex flex-col justify-center items-start z-10">
            <span className="bg-[#A3CD39] text-slate-900 text-xs font-black px-3 py-1 rounded mb-4 tracking-widest uppercase">Cyber Days</span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-2 leading-tight">
              TECHNOVA <br /> <span className="text-[#A3CD39]">REVOLUTION</span>
            </h1>
            <p className="text-slate-300 text-lg mb-6 max-w-lg">
              Hasta 40% de descuento en Laptops Gamer y Componentes de Alto Rendimiento.
            </p>
            <button className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-[#A3CD39] transition-colors flex items-center gap-2">
              Ver Ofertas <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Benefits Strip */}
        <div className="bg-white border-b border-slate-200 py-4 shadow-sm mb-6">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-x divide-slate-100">
            <div>
              <p className="font-bold text-slate-800 text-sm">Retiro en Tienda</p>
              <p className="text-xs text-slate-500">Gratis en +20 puntos</p>
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm">Envío Gratis</p>
              <p className="text-xs text-slate-500">Por compras sobre $200</p>
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm">Garantía Extendida</p>
              <p className="text-xs text-slate-500">Protege tu equipo</p>
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm">Devoluciones</p>
              <p className="text-xs text-slate-500">Fáciles y rápidas</p>
            </div>
          </div>
        </div>

        <ProductList
          highlightedIds={highlightedProducts}
          onClearHighlights={() => setHighlightedProducts([])}
        />
      </main>

      <CartSidebar />
      <OrdersModal />
      <CheckoutModal />
      <AuthModal />
      <ChatBot setHighlightedProducts={setHighlightedProducts} />
    </div>
  );
}

const App: React.FC = () => {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
};

export default App;
