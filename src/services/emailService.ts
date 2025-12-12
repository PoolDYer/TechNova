import { Order } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

export const sendOrderConfirmationEmail = async (order: Order): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/send-order-confirmation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customer: order.customer,
        orderId: order.id,
        items: order.items,
        total: order.total,
        paymentMethod: order.paymentMethod,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Error al enviar correo:', data.error);
      return false;
    }

    console.log('✅ Correo enviado exitosamente:', data.messageId);
    return true;
  } catch (error) {
    console.error('❌ Error al conectar con el servidor de email:', error);
    return false;
  }
};
