# Sistema de Envío de Correos - TechNova Solutions

## ✅ Configuración Completada

El sistema de envío de correos electrónicos ha sido integrado exitosamente con el proceso de checkout.

## 📧 Cómo Funciona

1. **Cuando un cliente completa una compra:**
   - Ingresa sus datos personales (incluyendo email)
   - Selecciona método de pago
   - Confirma la compra

2. **Automáticamente se envía un correo con:**
   - ✅ Confirmación del pedido
   - 📦 Número de orden
   - 🛒 Lista detallada de productos comprados
   - 💰 Total de la compra
   - 📍 Información de entrega
   - 💳 Método de pago utilizado

## 🚀 Cómo Ejecutar

### Opción 1: Ejecutar todo junto
```bash
npm run dev:full
```
Esto iniciará ambos servidores simultáneamente:
- Frontend (webpack): http://localhost:3000
- Backend (email): http://localhost:3001

### Opción 2: Ejecutar por separado

**Terminal 1 - Frontend:**
```bash
npm start
```

**Terminal 2 - Backend de Email:**
```bash
npm run server
```

## 📋 Requisitos

### Variables de Entorno (.env)
El archivo `.env` ya está configurado con:
```env
# Gmail Configuration
GMAIL_USER=fudjsidirjxyfjf@gmail.com
GMAIL_APP_PASSWORD=ulvm myld whfd fhqd

# Supabase & OpenRouter
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
OPENROUTER_API_KEY=...
```

### Contraseña de Aplicación de Gmail
La contraseña `GMAIL_APP_PASSWORD` es una **contraseña de aplicación** de Gmail, NO tu contraseña normal. 

Si necesitas generar una nueva:
1. Ve a https://myaccount.google.com/security
2. Activa la verificación en 2 pasos
3. Ve a "Contraseñas de aplicaciones"
4. Genera una nueva contraseña para "Correo"
5. Copia la contraseña (sin espacios) en el `.env`

## 🔧 Archivos Creados/Modificados

### Nuevos Archivos:
- `server.js` - Servidor Express para envío de emails
- `src/services/emailService.ts` - Servicio frontend para comunicarse con el servidor

### Archivos Modificados:
- `src/components/CheckoutModal.tsx` - Integración de envío de email
- `package.json` - Nuevas dependencias y scripts
- `.env` - Variables de Gmail configuradas

## 📦 Nuevas Dependencias Instaladas

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "nodemailer": "^6.9.7",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "concurrently": "^8.2.2",
    "@types/nodemailer": "^6.4.14"
  }
}
```

## 🎨 Diseño del Email

El correo de confirmación incluye:
- ✨ Diseño profesional con colores de marca (TechNova)
- 📊 Tabla detallada de productos
- 🎯 Información de entrega
- 🔒 Datos de seguridad
- 📱 Responsive (se ve bien en móviles)

## 🧪 Prueba del Sistema

1. Abre http://localhost:3000
2. Agrega productos al carrito
3. Haz clic en "Terminar Compra"
4. Completa el formulario con tu email real
5. Selecciona método de pago y confirma
6. **¡Revisa tu bandeja de entrada!** 📬

## ⚠️ Notas Importantes

- Ambos servidores deben estar corriendo (puerto 3000 y 3001)
- El email se envía después de confirmar el pago
- Si no llega el correo, revisa la carpeta de spam
- Los logs del servidor muestran si el email se envió correctamente

## 🐛 Troubleshooting

**Error: "connect EADDRINUSE"**
- El puerto ya está en uso. Cierra otros procesos o cambia el puerto.

**Email no se envía:**
- Verifica que el servidor backend esté corriendo en puerto 3001
- Revisa que las credenciales de Gmail sean correctas
- Verifica los logs del servidor con `npm run server`

**Pantalla en blanco:**
- Asegúrate que el archivo `.env` tenga las variables correctas
- Reinicia ambos servidores
- Limpia caché: Ctrl + Shift + R

## 📞 Soporte

Si tienes problemas, revisa:
1. Consola del navegador (F12)
2. Logs del servidor backend
3. Variables de entorno en `.env`

---

**¡El sistema está listo para usar!** 🎉
