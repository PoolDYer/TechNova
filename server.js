require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS Configuration - Allow all origins in production
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Configurar transporter de nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

// Endpoint para enviar correo de confirmación de compra
app.post('/api/send-order-confirmation', async (req, res) => {
    try {
        const { customer, orderId, items, total, paymentMethod } = req.body;

        if (!customer || !customer.email) {
            return res.status(400).json({ 
                success: false, 
                error: 'Email del cliente es requerido' 
            });
        }

        // Generar HTML del correo con los productos
        const itemsHTML = items.map(item => `
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">
                    ${item.name}
                </td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: center;">
                    ${item.quantity}
                </td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: right;">
                    S/. ${item.price.toLocaleString()}
                </td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: bold;">
                    S/. ${(item.price * item.quantity).toLocaleString()}
                </td>
            </tr>
        `).join('');

        const emailHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f3f4f6;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td style="padding: 40px 0; text-align: center;">
                <table role="presentation" style="width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="color: #A3CD39; margin: 0; font-size: 32px; font-weight: bold;">
                                TECHNOVA
                            </h1>
                            <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 14px;">
                                Tu pedido ha sido confirmado
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Success Message -->
                    <tr>
                        <td style="padding: 40px 30px; text-align: center; background-color: #f0fdf4;">
                            <div style="width: 60px; height: 60px; margin: 0 auto 20px; background-color: #22c55e; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;">
                                <span style="color: white; font-size: 30px;">✓</span>
                            </div>
                            <h2 style="color: #16a34a; margin: 0 0 10px 0; font-size: 24px;">
                                ¡Gracias por tu compra, ${customer.firstName}!
                            </h2>
                            <p style="color: #64748b; margin: 0; font-size: 14px;">
                                Tu pedido #${orderId} ha sido recibido y está siendo procesado
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Order Details -->
                    <tr>
                        <td style="padding: 0 30px 30px 30px;">
                            <h3 style="color: #1e293b; margin: 0 0 20px 0; font-size: 18px; border-bottom: 2px solid #A3CD39; padding-bottom: 10px;">
                                Resumen de tu Pedido
                            </h3>
                            
                            <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                                <thead>
                                    <tr style="background-color: #f1f5f9;">
                                        <th style="padding: 12px 10px; text-align: left; font-size: 12px; color: #64748b; font-weight: 600;">
                                            PRODUCTO
                                        </th>
                                        <th style="padding: 12px 10px; text-align: center; font-size: 12px; color: #64748b; font-weight: 600;">
                                            CANT.
                                        </th>
                                        <th style="padding: 12px 10px; text-align: right; font-size: 12px; color: #64748b; font-weight: 600;">
                                            PRECIO
                                        </th>
                                        <th style="padding: 12px 10px; text-align: right; font-size: 12px; color: #64748b; font-weight: 600;">
                                            SUBTOTAL
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${itemsHTML}
                                    <tr>
                                        <td colspan="3" style="padding: 20px 10px 10px; text-align: right; font-size: 16px; font-weight: bold; color: #1e293b;">
                                            TOTAL:
                                        </td>
                                        <td style="padding: 20px 10px 10px; text-align: right; font-size: 20px; font-weight: bold; color: #A3CD39;">
                                            S/. ${total.toLocaleString()}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Customer Info -->
                    <tr>
                        <td style="padding: 0 30px 30px 30px;">
                            <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; border-left: 4px solid #A3CD39;">
                                <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 16px;">
                                    📦 Información de Entrega
                                </h3>
                                <p style="margin: 5px 0; color: #475569; font-size: 14px;">
                                    <strong>Cliente:</strong> ${customer.firstName} ${customer.lastName}
                                </p>
                                <p style="margin: 5px 0; color: #475569; font-size: 14px;">
                                    <strong>DNI:</strong> ${customer.dni}
                                </p>
                                <p style="margin: 5px 0; color: #475569; font-size: 14px;">
                                    <strong>Teléfono:</strong> ${customer.phone}
                                </p>
                                <p style="margin: 5px 0; color: #475569; font-size: 14px;">
                                    <strong>Dirección:</strong> ${customer.address}, ${customer.city}
                                </p>
                                <p style="margin: 5px 0; color: #475569; font-size: 14px;">
                                    <strong>Método de Pago:</strong> ${paymentMethod}
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Delivery Info -->
                    <tr>
                        <td style="padding: 0 30px 30px 30px;">
                            <div style="background-color: #eff6ff; border-radius: 8px; padding: 20px; text-align: center; border: 2px dashed #3b82f6;">
                                <p style="margin: 0; color: #1e40af; font-size: 14px; font-weight: 600;">
                                    🚚 Tu pedido llegará mañana
                                </p>
                                <p style="margin: 5px 0 0 0; color: #3b82f6; font-size: 12px;">
                                    Te enviaremos un mensaje cuando esté en camino
                                </p>
                            </div>
                        </td>
                    </tr>

                    <!-- CTA Button -->
                    <tr>
                        <td style="padding: 30px; text-align: center;">
                            <a href="https://technova-electronica.netlify.app/" style="display: inline-block; background: linear-gradient(135deg, #A3CD39 0%, #8bb926 100%); color: #1e293b; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 6px rgba(163, 205, 57, 0.3);">
                                Ir a TechNova
                            </a>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #1e293b; padding: 30px; text-align: center;">
                            <p style="margin: 0 0 10px 0; color: #94a3b8; font-size: 12px;">
                                ¿Necesitas ayuda? Contáctanos en
                            </p>
                            <p style="margin: 0; color: #A3CD39; font-size: 14px; font-weight: bold;">
                                soporte@technova.com | +51 999 999 999
                            </p>
                            <p style="margin: 20px 0 0 0; color: #64748b; font-size: 11px;">
                                © ${new Date().getFullYear()} TechNova Solutions. Todos los derechos reservados.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
        `;

        const mailOptions = {
            from: `TechNova Solutions <${process.env.GMAIL_USER}>`,
            to: customer.email,
            subject: `✅ Confirmación de Pedido #${orderId} - TechNova`,
            html: emailHTML
        };

        const info = await transporter.sendMail(mailOptions);
        
        console.log('✅ Correo de confirmación enviado:', info.messageId);
        res.json({ 
            success: true, 
            messageId: info.messageId,
            message: 'Correo enviado exitosamente'
        });

    } catch (error) {
        console.error('❌ Error al enviar correo:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Endpoint para consultar DNI en RENIEC
app.get('/api/dni/:dni', async (req, res) => {
    const { dni } = req.params;
    
    if (!/^\d{8}$/.test(dni)) {
        return res.status(400).json({ 
            success: false, 
            error: 'DNI inválido, debe tener 8 dígitos numéricos' 
        });
    }

    try {
        const API_BASE_URL = process.env.API_BASE_URL;
        const API_TOKEN = process.env.API_TOKEN;

        if (!API_BASE_URL || !API_TOKEN) {
            return res.status(500).json({ 
                success: false, 
                error: 'Configuración de API incompleta' 
            });
        }

        const baseUrl = API_BASE_URL.replace(/\/+$/, '')
            .replace(/\/dni$/, '')
            .replace(/\/ruc$/, '');
        
        const endpoint = `${baseUrl}/dni/${dni}`;
        const response = await axios.get(endpoint, { 
            params: { token: API_TOKEN },
            timeout: 10000
        });

        if (!response.data || !response.data.dni) {
            return res.status(404).json({ 
                success: false, 
                error: 'No se encontraron datos para este DNI' 
            });
        }

        console.log('✅ DNI consultado exitosamente:', dni);
        res.json({ 
            success: true, 
            data: {
                dni: response.data.dni,
                nombres: response.data.nombres,
                apellidoPaterno: response.data.apellidoPaterno,
                apellidoMaterno: response.data.apellidoMaterno
            }
        });

    } catch (error) {
        console.error('❌ Error al consultar DNI:', error.message);
        
        if (error.response) {
            return res.status(error.response.status).json({ 
                success: false, 
                error: `Error en la API: ${error.response.data?.message || 'No disponible'}` 
            });
        }
        
        if (error.code === 'ECONNABORTED') {
            return res.status(504).json({ 
                success: false, 
                error: 'Tiempo de espera agotado al consultar RENIEC' 
            });
        }

        res.status(500).json({ 
            success: false, 
            error: 'No se pudo consultar el DNI en este momento' 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Servidor de email funcionando' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor de email escuchando en puerto ${PORT}`);
    console.log(`📧 Email configurado: ${process.env.GMAIL_USER}`);
});
