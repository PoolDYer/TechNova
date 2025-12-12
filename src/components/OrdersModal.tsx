import React from 'react';
import { X, Package, Calendar, MapPin, CreditCard, Smartphone, Check, Truck, Home, ClipboardCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PaymentMethod } from '../types';

const OrdersModal: React.FC = () => {
  const { isOrdersOpen, toggleOrders, orders } = useStore();

  if (!isOrdersOpen) return null;

  // Helper to determine active step based on status string
  const getProgressStep = (status: string) => {
    switch (status) {
      case 'Procesando': return 1; // 0: Recibido, 1: Preparando
      case 'Enviado': return 2;    // 2: En Camino
      case 'Entregado': return 3;  // 3: Entregado
      default: return 0;
    }
  };

  const steps = [
    { label: 'Confirmado', icon: ClipboardCheck },
    { label: 'Preparando', icon: Package },
    { label: 'En Camino', icon: Truck },
    { label: 'Entregado', icon: Home },
  ];

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={toggleOrders}
      />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-2xl bg-slate-50 shadow-2xl flex flex-col h-full animate-slide-in-right">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 bg-white">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Package className="h-6 w-6 text-indigo-600" /> Mis Compras
            </h2>
            <button onClick={toggleOrders} className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-full transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
            {orders.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                <div className="bg-slate-100 p-6 rounded-full">
                    <Package className="h-16 w-16 opacity-30" />
                </div>
                <p className="font-medium text-lg">Aún no has realizado compras.</p>
                <button onClick={toggleOrders} className="text-indigo-600 hover:underline font-bold">
                  Explorar catálogo
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {orders.map(order => {
                  const currentStep = getProgressStep(order.status);
                  
                  return (
                    <div key={order.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md">
                      {/* Order Header */}
                      <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex flex-wrap justify-between items-center gap-4">
                          <div>
                              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Pedido #{order.id}</p>
                              <div className="flex items-center gap-2 mt-1">
                                  <Calendar className="h-3 w-3 text-slate-400" />
                                  <span className="text-sm text-slate-700 font-medium">
                                      {order.date.toLocaleDateString()} - {order.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                              </div>
                          </div>
                          <div className="text-right">
                               <p className="text-xs text-slate-500 mb-1">Total Pagado</p>
                               <span className="text-lg font-bold text-slate-900">S/. {order.total.toLocaleString()}</span>
                          </div>
                      </div>

                      {/* Tracking Timeline */}
                      <div className="px-6 pt-8 pb-4">
                        <h4 className="font-bold text-sm text-slate-900 mb-6 flex items-center gap-2">
                           <Truck className="h-4 w-4 text-indigo-600" /> Seguimiento del envío
                        </h4>
                        <div className="relative flex items-center justify-between w-full">
                            {/* Connecting Line background */}
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 z-0 rounded-full"></div>
                            
                            {/* Active Line (Progress) */}
                            <div 
                                className="absolute top-1/2 left-0 h-1 bg-green-500 -translate-y-1/2 z-0 rounded-full transition-all duration-1000"
                                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                            ></div>

                            {/* Steps */}
                            {steps.map((step, index) => {
                                const isCompleted = index <= currentStep;
                                const isCurrent = index === currentStep;
                                
                                return (
                                    <div key={index} className="relative z-10 flex flex-col items-center group">
                                        <div 
                                            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                                                isCompleted 
                                                ? 'bg-green-500 border-green-500 text-white scale-110' 
                                                : 'bg-white border-slate-300 text-slate-300'
                                            }`}
                                        >
                                            {isCompleted ? <Check className="h-4 w-4" /> : <step.icon className="h-4 w-4" />}
                                        </div>
                                        <span className={`text-[10px] md:text-xs font-bold mt-2 absolute -bottom-6 w-24 text-center ${
                                            isCompleted ? 'text-green-600' : 'text-slate-400'
                                        }`}>
                                            {step.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                      </div>

                      {/* Order Details Accordion-like structure (Expanded by default here) */}
                      <div className="p-6 mt-4 border-t border-slate-100 bg-slate-50/30">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm text-slate-600">
                              <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                                  <p className="font-bold text-slate-900 flex items-center gap-2 mb-1 text-xs uppercase tracking-wide">
                                      <MapPin className="h-3 w-3 text-indigo-500" /> Entrega
                                  </p>
                                  <p className="text-slate-800 font-medium">{order.customer.address}</p>
                                  <p className="text-xs">{order.customer.city}, Perú</p>
                              </div>
                              <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                                  <p className="font-bold text-slate-900 flex items-center gap-2 mb-1 text-xs uppercase tracking-wide">
                                      {order.paymentMethod === PaymentMethod.CARD ? <CreditCard className="h-3 w-3 text-indigo-500"/> : <Smartphone className="h-3 w-3 text-indigo-500"/>}
                                      Pago
                                  </p>
                                  <p className="text-slate-800 font-medium">{order.paymentMethod === PaymentMethod.CARD ? 'Tarjeta Débito/Crédito' : 'Yape'}</p>
                                  <p className="text-xs text-green-600 font-bold">Pagado con éxito</p>
                              </div>
                          </div>

                          {/* Product Mini List */}
                          <div className="space-y-3">
                              {order.items.map((item, idx) => (
                                  <div key={idx} className="flex items-center gap-4 bg-white p-2 rounded-lg border border-slate-100">
                                      <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded border border-slate-100">
                                          <img
                                              src={item.image}
                                              alt={item.name}
                                              className="h-full w-full object-cover"
                                          />
                                      </div>
                                      <div className="flex-1">
                                          <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{item.name}</h3>
                                          <p className="text-xs text-slate-500">Cant: {item.quantity}</p>
                                      </div>
                                      <div className="text-sm font-bold text-slate-700">
                                          S/. {(item.price * item.quantity).toLocaleString()}
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersModal;