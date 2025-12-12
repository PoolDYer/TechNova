import React, { useState } from 'react';
import { X, CreditCard, Smartphone, CheckCircle, Lock, Truck, User, MapPin } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PaymentMethod, CustomerData, Order } from '../types';
import { sendOrderConfirmationEmail } from '../services/emailService';

const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setCheckoutOpen, cart, clearCart, addOrder } = useStore();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [isLoadingDNI, setIsLoadingDNI] = useState(false);
  const [dniError, setDniError] = useState<string>('');
  
  const [formData, setFormData] = useState<CustomerData>({
    firstName: '',
    lastName: '',
    dni: '',
    email: '',
    phone: '',
    address: '',
    city: ''
  });

  const [yapeData, setYapeData] = useState({
    phone: '',
    code: ''
  });

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isCheckoutOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    // Limpiar error de DNI cuando el usuario edita
    if (e.target.name === 'dni' && dniError) {
      setDniError('');
    }
  };

  const handleDNIBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const dni = e.target.value.trim();
    
    // Validar que sea un DNI peruano de 8 dígitos
    if (!/^\d{8}$/.test(dni)) {
      if (dni.length > 0) {
        setDniError('El DNI debe tener 8 dígitos');
      }
      return;
    }

    setIsLoadingDNI(true);
    setDniError('');

    try {
      const response = await fetch(`http://localhost:3001/api/dni/${dni}`);
      const result = await response.json();

      if (result.success && result.data) {
        // Autocompletar nombres
        setFormData(prev => ({
          ...prev,
          firstName: result.data.nombres || '',
          lastName: `${result.data.apellidoPaterno || ''} ${result.data.apellidoMaterno || ''}`.trim()
        }));
        console.log('✅ Datos autocompletos para DNI:', dni);
      } else {
        setDniError(result.error || 'No se encontraron datos para este DNI');
      }
    } catch (error) {
      console.error('Error al consultar DNI:', error);
      setDniError('No se pudo verificar el DNI en este momento');
    } finally {
      setIsLoadingDNI(false);
    }
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🛒 Procesando pago...', { email: formData.email, total });
    
    // Create the order object
    const newOrder: Order = {
        id: Math.floor(100000 + Math.random() * 900000).toString(), // Random 6 digit ID
        date: new Date(),
        items: [...cart],
        total: total,
        customer: formData,
        status: 'Procesando',
        paymentMethod: paymentMethod || 'Desconocido'
    };

    console.log('📦 Orden creada:', { orderId: newOrder.id, email: newOrder.customer.email });

    // Simulate Processing
    setTimeout(async () => {
        addOrder(newOrder); // Save to history
        setStep(3);
        clearCart();
        
        // Enviar correo de confirmación
        console.log('📧 Intentando enviar correo a:', formData.email);
        try {
            const emailSent = await sendOrderConfirmationEmail(newOrder);
            if (emailSent) {
                console.log('✅ Correo de confirmación enviado exitosamente a:', formData.email);
            } else {
                console.warn('⚠️ No se pudo enviar el correo de confirmación');
            }
        } catch (error) {
            console.error('❌ Error al enviar correo:', error);
        }
    }, 1500);
  };

  const closeCheckout = () => {
    setCheckoutOpen(false);
    setStep(1);
    setPaymentMethod(null);
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div className="fixed inset-0 bg-slate-900/75 transition-opacity" onClick={closeCheckout} />

        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
          {/* Header */}
          <div className="bg-[#A3CD39] px-4 py-3 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg font-bold leading-6 text-slate-900 flex items-center gap-2">
              {step === 1 && <User className="h-5 w-5" />}
              {step === 2 && <CreditCard className="h-5 w-5" />}
              {step === 3 && <CheckCircle className="h-5 w-5" />}
              {step === 1 ? 'Datos Personales' : step === 2 ? 'Método de Pago' : '¡Pedido Confirmado!'}
            </h3>
            {step !== 3 && (
                <button onClick={closeCheckout} className="text-slate-800 hover:text-white transition-colors">
                <X className="h-6 w-6" />
                </button>
            )}
          </div>

          <div className="px-4 py-5 sm:p-6">
            {/* Step 1: Personal Data */}
            {step === 1 && (
              <form onSubmit={handleNextStep} className="space-y-4">
                <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Nombre {isLoadingDNI && <span className="text-xs text-green-600">(buscando...)</span>}
                    </label>
                    <input 
                      required 
                      type="text" 
                      name="firstName" 
                      value={formData.firstName} 
                      onChange={handleInputChange}
                      disabled={isLoadingDNI}
                      className={`mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm ${isLoadingDNI ? 'bg-slate-100' : ''}`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Apellidos</label>
                    <input 
                      required 
                      type="text" 
                      name="lastName" 
                      value={formData.lastName} 
                      onChange={handleInputChange}
                      disabled={isLoadingDNI}
                      className={`mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm ${isLoadingDNI ? 'bg-slate-100' : ''}`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      DNI <span className="text-xs text-slate-500">(autocompletará tu nombre)</span>
                    </label>
                    <div className="relative">
                      <input 
                        required 
                        type="text" 
                        name="dni" 
                        value={formData.dni} 
                        onChange={handleInputChange}
                        onBlur={handleDNIBlur}
                        maxLength={8}
                        pattern="\d{8}"
                        placeholder="12345678"
                        disabled={isLoadingDNI}
                        className={`mt-1 block w-full rounded-md border ${dniError ? 'border-red-500' : 'border-slate-300'} px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm ${isLoadingDNI ? 'bg-slate-100' : ''}`}
                      />
                      {isLoadingDNI && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5">
                          <div className="animate-spin h-4 w-4 border-2 border-green-500 border-t-transparent rounded-full"></div>
                        </div>
                      )}
                    </div>
                    {dniError && (
                      <p className="mt-1 text-xs text-red-600">{dniError}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Celular</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700">Email</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700">Dirección de Entrega</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center rounded-l-md border border-r-0 border-slate-300 bg-slate-50 px-3 text-slate-500">
                            <MapPin className="h-4 w-4" />
                        </span>
                        <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="block w-full flex-1 rounded-none rounded-r-md border border-slate-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" placeholder="Av. Principal 123, Dpto 4" />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                     <label className="block text-sm font-medium text-slate-700">Ciudad / Distrito</label>
                     <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
                  </div>
                </div>

                <div className="mt-6">
                  <button type="submit" className="flex w-full justify-center rounded-md border border-transparent bg-slate-900 py-3 px-4 text-sm font-bold text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                    Continuar al Pago
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <form onSubmit={handlePayment} className="space-y-6">
                <div className="space-y-4">
                    <label className="text-base font-semibold text-slate-900">Selecciona tu método de pago:</label>
                    
                    {/* Payment Options */}
                    <div className="grid grid-cols-2 gap-4">
                        <div 
                            onClick={() => setPaymentMethod(PaymentMethod.CARD)}
                            className={`cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition-all ${paymentMethod === PaymentMethod.CARD ? 'border-green-500 bg-green-50 text-green-700' : 'border-slate-200 hover:border-slate-300'}`}
                        >
                            <CreditCard className="h-8 w-8" />
                            <span className="font-bold text-sm">Tarjeta Débito/Crédito</span>
                        </div>
                        <div 
                            onClick={() => setPaymentMethod(PaymentMethod.YAPE)}
                            className={`cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition-all ${paymentMethod === PaymentMethod.YAPE ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-slate-200 hover:border-slate-300'}`}
                        >
                            <Smartphone className="h-8 w-8" />
                            <span className="font-bold text-sm">Yape</span>
                        </div>
                    </div>
                </div>

                {/* Conditional Inputs */}
                {paymentMethod === PaymentMethod.CARD && (
                     <div className="rounded-md bg-slate-50 p-4 border border-slate-200 animate-fade-in space-y-3">
                        <div>
                            <label className="block text-xs font-medium text-slate-700">Número de Tarjeta</label>
                            <input required type="text" placeholder="0000 0000 0000 0000" className="mt-1 block w-full rounded border-slate-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-xs font-medium text-slate-700">Vencimiento (MM/YY)</label>
                                <input required type="text" placeholder="MM/YY" className="mt-1 block w-full rounded border-slate-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
                            </div>
                            <div className="w-24">
                                <label className="block text-xs font-medium text-slate-700">CVV</label>
                                <input required type="text" placeholder="123" className="mt-1 block w-full rounded border-slate-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
                            </div>
                        </div>
                        <div>
                             <label className="block text-xs font-medium text-slate-700">Titular de la Tarjeta</label>
                             <input required type="text" placeholder="COMO APARECE EN LA TARJETA" className="mt-1 block w-full rounded border-slate-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
                        </div>
                     </div>
                )}

                {paymentMethod === PaymentMethod.YAPE && (
                    <div className="rounded-md bg-purple-50 p-4 border border-purple-200 animate-fade-in space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-purple-100">
                             <div className="h-10 w-10 bg-purple-600 rounded flex items-center justify-center text-white font-bold text-xs">QR</div>
                             <div className="text-sm text-slate-600">Escanea el QR o ingresa tu número para aprobar el pago.</div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-purple-900">Número de Celular registrado en Yape</label>
                            <input 
                                required 
                                type="tel" 
                                value={yapeData.phone}
                                onChange={(e) => setYapeData({...yapeData, phone: e.target.value})}
                                placeholder="999 999 999" 
                                className="mt-1 block w-full rounded border-purple-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-purple-900">Código de Aprobación (6 dígitos)</label>
                            <input 
                                required 
                                type="text" 
                                maxLength={6}
                                value={yapeData.code}
                                onChange={(e) => setYapeData({...yapeData, code: e.target.value})}
                                placeholder="123456" 
                                className="mt-1 block w-full rounded border-purple-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm tracking-widest text-center" 
                            />
                            <p className="text-[10px] text-purple-700 mt-1">Ingresa el código que aparece en tu app.</p>
                        </div>
                    </div>
                )}

                <div className="mt-6 flex flex-col gap-3">
                    <div className="flex justify-between text-sm font-bold text-slate-900 border-t pt-4">
                        <span>Total a Pagar</span>
                        <span>S/. {total.toLocaleString()}</span>
                    </div>
                    <button 
                        type="submit" 
                        disabled={!paymentMethod}
                        className="flex w-full justify-center rounded-md border border-transparent bg-[#A3CD39] py-3 px-4 text-sm font-bold text-slate-900 shadow-sm hover:brightness-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <Lock className="h-4 w-4 mr-2" />
                        Pagar Ahora
                    </button>
                    <button type="button" onClick={() => setStep(1)} className="text-sm text-slate-500 hover:text-slate-800 underline">
                        Volver a Datos Personales
                    </button>
                </div>
              </form>
            )}

            {/* Step 3: Success */}
            {step === 3 && (
                <div className="text-center py-8">
                    <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
                        <CheckCircle className="h-12 w-12 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">¡Gracias por tu compra, {formData.firstName}!</h3>
                    <p className="text-slate-500 mb-6">Hemos enviado la confirmación a <strong>{formData.email}</strong>.</p>
                    
                    <div className="bg-slate-50 rounded-lg p-4 text-left text-sm text-slate-600 mb-8 max-w-xs mx-auto border border-slate-200">
                        <div className="flex items-start gap-3">
                            <Truck className="h-5 w-5 text-slate-400 mt-0.5" />
                            <div>
                                <p className="font-bold text-slate-900">Entrega Estimada</p>
                                <p>Llega mañana a {formData.address}</p>
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={closeCheckout}
                        className="inline-flex justify-center rounded-full border border-transparent bg-slate-900 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-slate-800 focus:outline-none"
                    >
                        Seguir Comprando
                    </button>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;