import React from 'react';
import { ShoppingCart, Menu, Search, User, MapPin } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCategory } from '../types';

const Navbar: React.FC = () => {
  const { cart, toggleCart, setCategoryFilter, toggleOrders, searchQuery, setSearchQuery, user, toggleAuth, logout } = useStore();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleFilterClick = (filter: ProductCategory | 'ALL' | 'OFFERS') => {
    setCategoryFilter(filter);
    // Smooth scroll to products if on homepage
    const productSection = document.getElementById('products-section');
    if (productSection) {
      productSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    // If user types, we likely want to search across ALL categories
    if (query.trim() !== '') {
      setCategoryFilter('ALL');
      const productSection = document.getElementById('products-section');
      if (productSection) {
        productSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-[#A3CD39] border-b-4 border-slate-100 shadow-md">
      {/* Top Bar (Falabella style) */}
      <div className="bg-slate-900 text-white text-xs py-1 px-4 hidden md:flex justify-between">
        <div className="flex gap-4">
          <span>Solo en TechNova</span>
          <span>Venta Telefónica: 600 390 6500</span>
        </div>
        <div className="flex gap-4">
          <span>Servicio al Cliente</span>
          <span>Seguimiento de orden</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">

          {/* Logo & Hamburger */}
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-1 text-slate-800">
              <Menu className="h-7 w-7" />
            </button>
            <div
              className="flex flex-col items-start leading-none cursor-pointer"
              onClick={() => {
                handleFilterClick('ALL');
                setSearchQuery(''); // Clear search on logo click
              }}
            >
              <span className="text-2xl font-black text-slate-900 tracking-tight">Tech<span className="text-white">Nova</span></span>
              <span className="text-[10px] font-bold text-slate-800 uppercase tracking-widest">Falabella Group</span>
            </div>
          </div>

          {/* Search Bar (Retailer Style) */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Buscar en TechNova..."
                className="w-full h-11 pl-4 pr-12 rounded-full border-none focus:ring-2 focus:ring-slate-900 text-sm shadow-sm"
              />
              <button className="absolute right-0 top-0 h-11 w-11 bg-slate-900 rounded-full flex items-center justify-center hover:bg-slate-800 transition-colors">
                <Search className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-2 md:gap-6">
            <div
              className="hidden md:flex flex-col items-center text-slate-900 cursor-pointer opacity-80 hover:opacity-100 relative group"
            >
              <div
                onClick={() => !user && toggleAuth()}
                className="flex flex-col items-center"
              >
                <User className="h-6 w-6 mb-0.5" />
                <span className="text-xs font-bold truncate max-w-[100px]">
                  {user ? (user.user_metadata?.full_name || user.email?.split('@')[0]) : 'Iniciar Sesión'}
                </span>
              </div>

              {/* Dropdown Menu for Logged In User (Simplified - Info Only) */}
              {user && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-100 overflow-hidden hidden group-hover:block z-50">
                  <div className="px-4 py-3 bg-slate-50">
                    <p className="text-xs text-slate-500">Conectado como</p>
                    <p className="text-sm font-bold text-slate-900 truncate">{user.email}</p>
                  </div>
                </div>
              )}
            </div>

            <div
              onClick={toggleOrders}
              className="hidden md:flex flex-col items-center text-slate-900 cursor-pointer opacity-80 hover:opacity-100"
            >
              <MapPin className="h-6 w-6 mb-0.5" />
              <span className="text-xs font-bold">Mis Compras</span>
            </div>

            <div className="h-8 w-px bg-slate-900/20 hidden md:block"></div>

            <button
              onClick={toggleCart}
              className="relative p-2 text-slate-900 hover:bg-white/20 transition-colors rounded-full flex flex-col items-center"
            >
              <ShoppingCart className="h-7 w-7" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full border-2 border-[#A3CD39]">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Explicit Logout Button */}
            {user && (
              <button
                onClick={logout}
                className="hidden md:flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors uppercase tracking-wide border border-transparent hover:border-red-100"
              >
                Cerrar Sesión
              </button>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Buscar..."
              className="w-full h-10 pl-4 pr-10 rounded-full border-none text-sm"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="hidden lg:block bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex gap-8 text-sm font-medium text-slate-600 py-3">
            <li
              onClick={() => handleFilterClick('ALL')}
              className="hover:text-green-600 cursor-pointer flex items-center gap-1"
            >
              <Menu className="w-4 h-4" /> Todas las Categorías
            </li>
            <li
              onClick={() => handleFilterClick('ALL')}
              className="hover:text-green-600 cursor-pointer text-green-700 font-bold"
            >
              Cyber Tech
            </li>
            <li
              onClick={() => handleFilterClick(ProductCategory.LAPTOP)}
              className="hover:text-green-600 cursor-pointer"
            >
              Laptops
            </li>
            <li
              onClick={() => handleFilterClick(ProductCategory.COMPONENT)}
              className="hover:text-green-600 cursor-pointer"
            >
              Componentes
            </li>
            <li
              onClick={() => handleFilterClick(ProductCategory.MONITOR)}
              className="hover:text-green-600 cursor-pointer"
            >
              Monitores
            </li>
            <li
              onClick={() => handleFilterClick(ProductCategory.ACCESSORY)}
              className="hover:text-green-600 cursor-pointer"
            >
              Accesorios
            </li>
            <li
              onClick={() => handleFilterClick('OFFERS')}
              className="hover:text-green-600 cursor-pointer text-red-600 font-bold"
            >
              Ofertas
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;