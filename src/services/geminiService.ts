import { Product, ExternalRecommendation } from "../types";
import { MOCK_PRODUCTS } from "../constants";

const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = process.env.OPENROUTER_API_KEY || "";

// We cache the conversation history to maintain context
type MessageRole = "user" | "assistant" | "system";
interface ChatMessage {
  role: MessageRole;
  content: string;
}
let conversationHistory: ChatMessage[] = [];

const createSystemInstruction = (products: Product[]): string => {
  const inventoryString = products.map(p =>
    `ID: "${p.id}" | Nombre: "${p.name}" | Categoría: "${p.category}" | Precio: S/.${p.price} | Specs: ${p.specs} | Desc: ${p.description}`
  ).join('\n');

  return `
    Eres "Nova", el Asesor Técnico Senior de "TechNova". Tu objetivo NO es despachar rápido, sino asegurarte que el cliente compre la pieza de hardware EXACTA para su necesidad técnica.

    INVENTARIO DISPONIBLE (SOLO VENDEMOS ESTO):
    ${inventoryString}

    PROTOCOLO DE VENTA CONSULTIVA (Sigue estos pasos en orden):

    PASO 1: DIAGNÓSTICO (CRÍTICO)
    - Si el usuario pide algo genérico (ej: "Quiero una laptop" o "Busco monitor"), **NO RECOMIENDES AÚN**.
    - **PREGUNTA**: Debes indagar el uso específico.
      - Para Laptops: ¿Es para Gaming, Diseño Gráfico, Programación o uso de Oficina?
      - Para Monitores: ¿Priorizas Alta Resolución (4K para diseño) o Tasa de Refresco (Hz para eSports)?
      - Para Componentes: ¿Qué tipo de carga de trabajo tendrás?
    - *Solo salta este paso si el usuario ya fue específico (ej: "Quiero una laptop para renderizar 3D").*

    PASO 2: RECOMENDACIÓN TÉCNICA (INTERNA)
    - Una vez tengas claro el uso, selecciona el producto del INVENTARIO que mejor se adapte.
    - **ARGUMENTA**: Explica por qué esas specs específicas sirven para su caso.
      - Ej: "Para diseño, te sugiero la ZenBook (ID 1) no por potencia bruta, sino porque su pantalla OLED te dará fidelidad de color real, a diferencia de un panel IPS común."
    - **ACCIÓN DE SISTEMA**: Debes incluir el bloque "PRODUCT_IDS" al final para que la página web muestre el producto al usuario.

    PASO 3: REFERENCIA DE MERCADO (COMPARATIVA)
    - Busca en internet 1 producto similar que NO tengamos.
    - Compáralo honestamente: "Existe el [Externo], pero el nuestro [Interno] gana en [Característica/Garantía/Precio]".

    FORMATO DE RESPUESTA OBLIGATORIO:
    
    [Tu respuesta conversacional, técnica y amable aquí]

    (Solo si estás recomendando un producto concreto, añade estos metadatos al final. Si estás haciendo preguntas, NO los pongas):
    PRODUCT_IDS: ["ID_DEL_PRODUCTO"]
    EXTERNAL: {Nombre Externo} | {Precio} | {Razón técnica de la comparación}

    EJEMPLO DE INTERACCIÓN 1 (Faltan datos):
    User: "Quiero un monitor."
    Nova: "Claro. Para darte la mejor opción, ¿qué priorizas? Si editas fotos te conviene nuestra opción 6K, pero si juegas shooters necesitas fluidez de Hz. ¿Cuál es tu caso?"
    (Nota: Aquí NO se ponen metadatos porque aún no hay recomendación).

    EJEMPLO DE INTERACCIÓN 2 (Datos completos):
    User: "Soy editor de video, necesito color preciso."
    Nova: "Entonces olvida los paneles gamer. Tu mejor opción es el **Dell UltraSharp 32** (ID: 9).
    Su resolución 6K y tecnología IPS Black te darán negros puros y un espectro de color que una pantalla normal no alcanza. Es vital para tu colorización."
    
    PRODUCT_IDS: ["9"]
    EXTERNAL: Apple Studio Display | S/. 7,000 | El Dell tiene mayor resolución (6K vs 5K) por casi mitad de precio.
  `;
};

export const getChatResponse = async (message: string, currentProducts: Product[]): Promise<{ text: string; recommendedIds: string[]; externalRec?: ExternalRecommendation }> => {
  try {
    // Add system instruction at the beginning if this is the first message
    if (conversationHistory.length === 0) {
      conversationHistory.push({
        role: "system",
        content: createSystemInstruction(currentProducts)
      });
    }

    // Add user message to history
    conversationHistory.push({
      role: "user",
      content: message
    });

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "HTTP-Referer": window.location.origin, // For OpenRouter rankings
        "X-Title": "TechNova", // For OpenRouter rankings
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "google/gemini-2.0-flash-001",
        "messages": conversationHistory
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenRouter API Error:", errorData);
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    // Extract content from OpenRouter/OpenAI compatible response structure
    const messageContent = data.choices?.[0]?.message?.content;
    const assistantMessage = typeof messageContent === "string"
      ? messageContent
      : "Hubo un error de conexión con la matriz. ¿Me repites?";

    // Add assistant response to history
    conversationHistory.push({
      role: "assistant",
      content: assistantMessage
    });

    let text: string = assistantMessage;

    // 1. Parse Internal Product IDs
    let recommendedIds: string[] = [];
    // Regex allows specific ID string format
    const idRegex = /PRODUCT_IDS:?\s*\[([^\]]*)\]/i;
    const matchIds = text.match(idRegex);

    if (matchIds && matchIds[1]) {
      const idsString = matchIds[1];
      recommendedIds = idsString
        .split(',')
        .map(id => id.trim().replace(/['"]/g, ''))
        .filter(id => id.length > 0 && currentProducts.some(p => p.id === id));

      // Clean metadata from visible text
      text = text.replace(idRegex, '').trim();
    }

    // 2. Parse External Recommendation
    let externalRec: ExternalRecommendation | undefined;
    const externalRegex = /EXTERNAL:\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+)/i;
    const matchExt = text.match(externalRegex);

    if (matchExt) {
      externalRec = {
        name: matchExt[1].trim(),
        price: matchExt[2].trim(),
        reason: matchExt[3].trim()
      };
      text = text.replace(externalRegex, '').trim();
    }

    return { text, recommendedIds, externalRec };
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return {
      text: "Estoy recalibrando mis sensores. Por favor, pregúntame nuevamente sobre el hardware.",
      recommendedIds: []
    };
  }
};

export const resetChat = () => {
  conversationHistory = [];
};
