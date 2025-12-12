import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Product, CartItem, StoreContextType, ProductCategory, Order } from '../types';
import { MOCK_PRODUCTS } from '../constants';

import { supabase } from '../services/supabaseClient';

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Auth State
  const [user, setUser] = useState<any>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);

  const [categoryFilter, setCategoryFilter] = useState<ProductCategory | 'ALL' | 'OFFERS'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Handle Auth Session
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const toggleChat = () => setIsChatOpen(!isChatOpen);
  const toggleOrders = () => setIsOrdersOpen(!isOrdersOpen);

  const toggleAuth = () => setIsAuthOpen(!isAuthOpen);

  const logout = async () => {
    await supabase.auth.signOut();
    setOrders([]); // Clear orders on logout if they were user specific (optional)
  };

  return (
    <StoreContext.Provider value={{
      products,
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      isCartOpen,
      toggleCart,
      isChatOpen,
      toggleChat,
      isCheckoutOpen,
      setCheckoutOpen,
      categoryFilter,
      setCategoryFilter,
      searchQuery,
      setSearchQuery,
      orders,
      addOrder,
      isOrdersOpen,
      toggleOrders,
      // Auth values
      user,
      isAuthOpen,
      toggleAuth,
      logout
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
