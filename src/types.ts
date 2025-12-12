export enum ProductCategory {
  LAPTOP = 'Laptop',
  DESKTOP = 'Desktop',
  COMPONENT = 'Componente',
  MONITOR = 'Monitor',
  ACCESSORY = 'Accesorio'
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  description: string;
  specs: string; // Simplified for AI consumption
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: Date;
  items: CartItem[];
  total: number;
  customer: CustomerData;
  status: 'Procesando' | 'Enviado' | 'Entregado';
  paymentMethod: string;
}

export interface ExternalRecommendation {
  name: string;
  price: string;
  reason: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  recommendedProductIds?: string[]; // IDs of products the AI recommends
  externalRec?: ExternalRecommendation; // Recommendation from outside the store
}

export interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  dni: string;
  address: string;
  city: string;
  phone: string;
}

export enum PaymentMethod {
  CARD = 'CARD',
  YAPE = 'YAPE'
}

export interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  isChatOpen: boolean;
  toggleChat: () => void;
  isCheckoutOpen: boolean;
  setCheckoutOpen: (isOpen: boolean) => void;
  categoryFilter: ProductCategory | 'ALL' | 'OFFERS';
  setCategoryFilter: (category: ProductCategory | 'ALL' | 'OFFERS') => void;

  // Search Logic
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // New Order History Logic
  orders: Order[];
  addOrder: (order: Order) => void;
  isOrdersOpen: boolean;
  toggleOrders: () => void;

  // Authentication Logic
  user: any; // Using any to avoid complex Supabase types import for now, or import User
  isAuthOpen: boolean;
  toggleAuth: () => void;
  logout: () => void;
}
