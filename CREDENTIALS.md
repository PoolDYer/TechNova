# Configuración de Credenciales OpenRouter

## Variables de Entorno

El archivo `.env.local` contiene las credenciales necesarias para el funcionamiento del asistente:

```env
VITE_OPENROUTER_API_KEY=tu-clave-api-aqui
VITE_SUPABASE_URL=tu-url-supabase-aqui
VITE_SUPABASE_ANON_KEY=tu-clave-supabase-aqui
```

## API de OpenRouter

El asistente "Nova" ahora utiliza **OpenRouter** como intermediario para acceder a los modelos de IA:

- **Modelo**: `google/gemini-2.0-flash-exp:free`
- **Proveedor**: OpenRouter (https://openrouter.ai)
- **API Key**: Configurada en `VITE_OPENROUTER_API_KEY`

## Cambios Realizados

1. ✅ Reemplazado `@google/genai` por `@openrouter/sdk`
2. ✅ Actualizado el manejo de credenciales para usar `import.meta.env` (compatible con Vite)
3. ✅ Creado archivo `vite-env.d.ts` para tipado correcto de las variables de entorno
4. ✅ Actualizado el historial de conversación para mantener el contexto del chat
5. ✅ Removida dependencia innecesaria de `dotenv` en el código del navegador

## Verificación

El servidor está corriendo correctamente en: **http://localhost:3001/**

El asistente está listo para responder consultas técnicas sobre productos de hardware.
