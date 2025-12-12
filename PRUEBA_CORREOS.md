# 🔍 Guía de Verificación - Sistema de Correos

## ✅ Estado Actual de Servidores

### Servidor Backend (Puerto 3001)
```
🚀 Servidor de email escuchando en puerto 3001
📧 Email configurado: fudjsidirjxyfjf@gmail.com
```
✅ **CORRIENDO**

### Servidor Frontend (Puerto 3000)
```
webpack 5.103.0 compiled successfully
http://localhost:3000/
```
✅ **CORRIENDO**

---

## 🧪 PASOS PARA PROBAR EL ENVÍO DE CORREOS

### 1. Abrir la Aplicación
- Ve a: **http://localhost:3000**
- Deberías ver la tienda TechNova

### 2. Agregar Productos al Carrito
- Click en cualquier producto
- Click en "Agregar al Carrito"
- Repite con 2-3 productos

### 3. Ir al Checkout
- Click en el ícono del carrito (arriba a la derecha)
- Click en "Terminar Compra"

### 4. Completar Datos Personales
**IMPORTANTE:** Usa un **email real tuyo** para recibir el correo

Ejemplo:
```
DNI: 12345678 (8 dígitos)
Nombre: [Se autocompleta si el DNI existe en RENIEC]
Apellidos: [Se autocompleta si el DNI existe en RENIEC]
Celular: 999999999
Email: TU_EMAIL_REAL@gmail.com  ← IMPORTANTE
Dirección: Av. Principal 123
Ciudad: Lima
```

### 5. Seleccionar Método de Pago
- Elige "Tarjeta" o "Yape"
- Completa los datos del método de pago
- Click en "Pagar Ahora"

### 6. Verificar en la Consola del Navegador
Abre la consola (F12) y busca estos mensajes:

```javascript
🛒 Procesando pago... {email: "tu@email.com", total: 1234}
📦 Orden creada: {orderId: "123456", email: "tu@email.com"}
📧 Intentando enviar correo a: tu@email.com
✅ Correo de confirmación enviado exitosamente a: tu@email.com
```

### 7. Verificar en el Servidor Backend
En la terminal donde corre `node server.js` deberías ver:

```
✅ Correo de confirmación enviado: <mensaje-id>
```

### 8. Revisar tu Email
- Abre tu bandeja de entrada
- Busca un correo de: **TechNova Solutions**
- Asunto: **✅ Confirmación de Pedido #123456 - TechNova**
- Si no lo ves, revisa **SPAM** o **Promociones**

---

## 🐛 TROUBLESHOOTING

### ❌ Problema: No se envía el correo

#### Solución 1: Verificar que ambos servidores estén corriendo
```powershell
# Verificar puerto 3000 (frontend)
Test-NetConnection -ComputerName localhost -Port 3000

# Verificar puerto 3001 (backend)
Test-NetConnection -ComputerName localhost -Port 3001
```

Si alguno no responde:
```powershell
# Reiniciar backend
node server.js

# Reiniciar frontend
npm start
```

#### Solución 2: Verificar la consola del navegador
1. Presiona F12
2. Ve a la pestaña "Console"
3. Busca errores en rojo
4. Si ves error "Failed to fetch" o "CORS", el backend no está corriendo

#### Solución 3: Verificar las variables de entorno
```env
# En el archivo .env debe estar:
GMAIL_USER=fudjsidirjxyfjf@gmail.com
GMAIL_APP_PASSWORD=ulvm myld whfd fhqd
```

#### Solución 4: Verificar la consola del servidor backend
En la terminal donde corre `node server.js` busca:
- ✅ Mensaje de confirmación
- ❌ Errores de autenticación de Gmail

---

## 📧 Configuración del Email

### Correo Emisor
```
De: TechNova Solutions <fudjsidirjxyfjf@gmail.com>
```

### Plantilla del Email
El correo incluye:
- ✅ Logo y branding de TechNova
- 📦 Número de orden
- 🛒 Lista de productos comprados
- 💰 Total a pagar
- 📍 Dirección de entrega
- 💳 Método de pago
- 🚚 Información de envío

---

## 🧪 PRUEBA RÁPIDA (5 minutos)

1. **Abre** http://localhost:3000
2. **Agrega** 1 producto al carrito
3. **Click** "Terminar Compra"
4. **Llena** el formulario con TU email real
5. **Selecciona** método de pago
6. **Click** "Pagar Ahora"
7. **Abre** F12 y revisa la consola
8. **Revisa** tu email en 30 segundos

---

## 📊 Logs Importantes

### Frontend (Consola del Navegador)
```javascript
🛒 Procesando pago...
📦 Orden creada
📧 Intentando enviar correo
✅ Correo enviado / ⚠️ Error
```

### Backend (Terminal)
```
✅ Correo de confirmación enviado: <id>
❌ Error al enviar correo: <mensaje>
```

---

## ⚡ Comandos Rápidos

### Reiniciar Todo
```powershell
# Terminal 1 - Backend
Ctrl+C  # Detener
node server.js  # Reiniciar

# Terminal 2 - Frontend
Ctrl+C  # Detener
npm start  # Reiniciar
```

### Ver Logs en Tiempo Real
```powershell
# Backend (mantén esta terminal visible)
node server.js

# Verás:
# 🚀 Servidor de email escuchando en puerto 3001
# ✅ Correo enviado  (cuando se envía)
```

---

## 🎯 Checklist Final

Antes de hacer una compra de prueba, verifica:

- [ ] Servidor backend corriendo en puerto 3001
- [ ] Servidor frontend corriendo en puerto 3000
- [ ] Variables de entorno GMAIL_USER y GMAIL_APP_PASSWORD configuradas
- [ ] Usar un email REAL tuyo en el formulario
- [ ] Consola del navegador abierta (F12)
- [ ] Terminal del backend visible para ver logs

---

## 📞 Si Aún No Funciona

1. **Captura de pantalla** de la consola del navegador (F12)
2. **Captura de pantalla** de la terminal del backend
3. **Copia** el email que usaste
4. **Revisa** la carpeta de SPAM
5. **Espera** 1-2 minutos (puede haber delay)

---

## ✨ Resultado Esperado

Cuando todo funcione correctamente:

1. ✅ Compra procesada en la web
2. ✅ Logs en consola del navegador
3. ✅ Logs en terminal del backend
4. ✅ **Email recibido en tu bandeja** con:
   - Diseño profesional de TechNova
   - Detalles completos de la compra
   - Información de entrega
   - Formato HTML responsive

---

**¡Ahora prueba haciendo una compra!** 🚀
