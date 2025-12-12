import express from "express";
import dotenv from "dotenv";
import { consultarDNI } from "./api-consultas.js";

dotenv.config();

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const renderPage = ({ dni = "", persona, error } = {}) => `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <title>Consulta DNI | Sistema Premium</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
      :root {
        --primary: #6366f1;
        --primary-dark: #4f46e5;
        --accent: #8b5cf6;
        --background: #0f172a;
        --surface: rgba(255, 255, 255, 0.08);
        --surface-highlight: rgba(255, 255, 255, 0.12);
        --text: #f8fafc;
        --text-secondary: #94a3b8;
        --error: #ef4444;
        --success: #10b981;
      }

      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      body {
        font-family: 'Outfit', sans-serif;
        background-color: var(--background);
        background-image: 
          radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), 
          radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), 
          radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%);
        color: var(--text);
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        overflow-x: hidden;
      }

      .glass-card {
        background: var(--surface);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 24px;
        padding: 2.5rem;
        width: 100%;
        max-width: 480px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      }

      @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }

      header {
        text-align: center;
        margin-bottom: 2rem;
      }

      h1 {
        font-size: 2rem;
        font-weight: 700;
        background: linear-gradient(to right, #c084fc, #6366f1);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 0.5rem;
        letter-spacing: -0.02em;
      }

      .subtitle {
        color: var(--text-secondary);
        font-size: 0.95rem;
      }

      .input-group {
        position: relative;
        margin-bottom: 1.5rem;
      }

      input {
        width: 100%;
        background: rgba(0, 0, 0, 0.2);
        border: 2px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        padding: 1rem 1.25rem;
        color: white;
        font-size: 1.1rem;
        font-family: inherit;
        transition: all 0.3s ease;
        outline: none;
      }

      input:focus {
        border-color: var(--primary);
        background: rgba(0, 0, 0, 0.3);
        box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
      }

      input::placeholder {
        color: rgba(255, 255, 255, 0.3);
      }

      button {
        width: 100%;
        background: linear-gradient(135deg, var(--primary), var(--accent));
        color: white;
        border: none;
        padding: 1rem;
        border-radius: 16px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }

      button:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3);
        filter: brightness(1.1);
      }

      button:active {
        transform: translateY(0);
      }

      .result-card {
        margin-top: 2rem;
        background: rgba(16, 185, 129, 0.1);
        border: 1px solid rgba(16, 185, 129, 0.2);
        border-radius: 16px;
        padding: 1.5rem;
        animation: fadeIn 0.4s ease-out;
      }

      .error-card {
        margin-top: 2rem;
        background: rgba(239, 68, 68, 0.1);
        border: 1px solid rgba(239, 68, 68, 0.2);
        border-radius: 16px;
        padding: 1rem;
        color: #fca5a5;
        text-align: center;
        animation: fadeIn 0.4s ease-out;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
      }

      .person-name {
        font-size: 1.25rem;
        font-weight: 600;
        color: white;
        margin-bottom: 0.25rem;
        text-align: center;
      }

      .person-dni {
        color: var(--success);
        font-size: 0.9rem;
        text-align: center;
        font-weight: 500;
        letter-spacing: 0.05em;
      }

      .meta-info {
        margin-top: 2rem;
        text-align: center;
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.3);
      }

      .loader {
        display: none;
        justify-content: center;
        margin-top: 1rem;
      }
      
      .loader::after {
        content: "";
        width: 24px;
        height: 24px;
        border: 3px solid rgba(255,255,255,0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      form.loading button {
        opacity: 0.7;
        pointer-events: none;
        font-size: 0;
      }
      
      form.loading button::after {
        content: "";
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 2px solid rgba(255,255,255,0.5);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }

    </style>
  </head>
  <body>
    <main class="glass-card">
      <header>
        <h1>Consulta DNI</h1>
        <p class="subtitle">Sistema de verificación de identidad</p>
      </header>

      <form method="post" action="/consultar-dni" onsubmit="this.classList.add('loading')">
        <div class="input-group">
          <input
            type="text"
            name="dni"
            minlength="8"
            maxlength="8"
            pattern="\\d{8}"
            placeholder="Ingrese número de DNI"
            value="${dni}"
            required
            autocomplete="off"
            autofocus
          />
        </div>
        <button type="submit">Consultar Reniec</button>
      </form>

      ${
        persona
          ? `<div class="result-card">
              <div class="person-name">
                ${persona.nombres ?? ""} ${persona.apellidoPaterno ?? ""} ${persona.apellidoMaterno ?? ""}
              </div>
              <div class="person-dni">DNI: ${persona.dni ?? "N/D"}</div>
            </div>`
          : ""
      }

      ${
        error
          ? `<div class="error-card">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>${error}</span>
            </div>`
          : ""
      }

      <div class="meta-info">
        Conectado a ApisPeru • Secure Connection
      </div>
    </main>
  </body>
</html>`;

app.get("/", (req, res) => {
  res.send(renderPage());
});

app.post("/consultar-dni", async (req, res) => {
  const { dni = "" } = req.body;
  const dniLimpio = dni.trim();

  if (!/^\d{8}$/.test(dniLimpio)) {
    return res.status(400).send(
      renderPage({
        dni: dniLimpio,
        error: "Debe ingresar un DNI válido de 8 dígitos.",
      })
    );
  }

  try {
    const persona = await consultarDNI(dniLimpio);
    return res.send(renderPage({ dni: dniLimpio, persona }));
  } catch (error) {
    return res.status(502).send(
      renderPage({
        dni: dniLimpio,
        error: error.message ?? "No se pudo completar la consulta.",
      })
    );
  }
});

app.get("/api/dni/:dni", async (req, res) => {
  const { dni } = req.params;
  if (!/^\d{8}$/.test(dni)) {
    return res.status(400).json({ message: "DNI inválido, debe tener 8 dígitos." });
  }

  try {
    const persona = await consultarDNI(dni);
    return res.json({ ok: true, data: persona });
  } catch (error) {
    return res.status(502).json({ ok: false, message: error.message });
  }
});

app.listen(Number(PORT), () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

