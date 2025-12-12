import React from 'react';
import { X, Trash2, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const CartSidebar: React.FC = () => {
  const { cart, isCartOpen, toggleCart, removeFromCart, setCheckoutOpen, user, toggleAuth } = useStore();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    if (!user) {
      alert("Debes iniciar sesión para continuar con la compra.");
      toggleAuth();
      // Optionally close cart to focus on auth modal, or keep it open.
      // Closing cart makes sense if the auth modal is centered.
      // toggleCart(); 
      return;
    }
    toggleCart();
    setCheckoutOpen(true);
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={toggleCart}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full animate-slide-in-right">

          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-green-600" /> Bolsa de Compras
            </h2>
            <button onClick={toggleCart} className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-200 rounded-full transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                <ShoppingBag className="h-20 w-20 opacity-20" />
                <p className="font-medium text-lg">Tu bolsa está vacía.</p>
                <button onClick={toggleCart} className="text-green-600 hover:underline font-medium">
                  Ver productos destacados
                </button>
              </div>
            ) : (
              <ul className="space-y-4">
                {cart.map(item => (
                  <li key={item.id} className="flex gap-4 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-slate-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex justify-between text-base font-bold text-slate-900">
                          <h3 className="line-clamp-2 leading-tight">{item.name}</h3>
                          <p className="ml-4 whitespace-nowrap text-green-700">S/. {(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                        <p className="mt-1 text-xs text-slate-500 uppercase font-semibold">{item.category}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-slate-300 rounded-md">
                          <span className="px-3 py-1 text-sm font-medium text-slate-600">x{item.quantity}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="font-medium text-red-500 hover:text-red-700 flex items-center gap-1 text-xs uppercase tracking-wide"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Eliminar
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t border-slate-200 p-6 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
              <div className="flex items-center justify-center gap-2 text-green-700 text-sm mb-4 bg-green-50 p-2 rounded-md border border-green-100">
                <ShieldCheck className="h-4 w-4" />
                <span className="font-semibold">Compra 100% Segura</span>
              </div>
              <div className="flex justify-between text-base font-medium text-slate-600 mb-2">
                <p>Subtotal</p>
                <p>S/. {total.toLocaleString()}</p>
              </div>
              <div className="flex justify-between text-xl font-bold text-slate-900 mb-6">
                <p>Total</p>
                <p>S/. {total.toLocaleString()}</p>
              </div>

              <button
                onClick={handleCheckout}
                className="flex w-full items-center justify-center rounded-full bg-[#A3CD39] hover:brightness-95 px-6 py-4 text-base font-bold text-slate-900 shadow-md transition-all hover:scale-[1.02]"
              >
                IR A PAGAR
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;