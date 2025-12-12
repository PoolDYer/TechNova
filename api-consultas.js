import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const { API_BASE_URL, API_TOKEN } = process.env;

if (!API_BASE_URL || !API_TOKEN) {
  throw new Error(
    "Variables de entorno API_BASE_URL y API_TOKEN son obligatorias."
  );
}

const http = axios.create({
  baseURL: API_BASE_URL.replace(/\/+$/, "")
    .replace(/\/dni$/, "")
    .replace(/\/ruc$/, ""),
  timeout: 10_000,
});

const normalizeError = (error, contextMessage) => {
  if (error.response) {
    const { status, data } = error.response;
    return new Error(
      `${contextMessage}. Código HTTP ${status}. Detalle: ${data?.message ?? JSON.stringify(data)
      }`
    );
  }

  if (error.request) {
    return new Error(`${contextMessage}. No se recibió respuesta del servicio.`);
  }

  return new Error(`${contextMessage}. Detalle: ${error.message}`);
};

export const consultarDNI = async (numeroDNI) => {
  if (!numeroDNI) {
    throw new Error("El número de DNI es obligatorio.");
  }

  try {
    const endpoint = `/dni/${numeroDNI}`;
    const { data } = await http.get(endpoint, { params: { token: API_TOKEN } });

    if (!data || !data.dni) {
      throw new Error("La respuesta del servicio no contiene datos de DNI.");
    }

    return {
      dni: data.dni,
      nombres: data.nombres,
      apellidoPaterno: data.apellidoPaterno,
      apellidoMaterno: data.apellidoMaterno,
      codVerifica: data.codVerifica,
    };
  } catch (error) {
    throw normalizeError(
      error,
      `No se pudo consultar el DNI ${numeroDNI}`
    );
  }
};

export const consultarRUC = async (numeroRUC) => {
  if (!numeroRUC) {
    throw new Error("El número de RUC es obligatorio.");
  }

  try {
    const endpoint = `/ruc/${numeroRUC}`;
    const { data } = await http.get(endpoint, { params: { token: API_TOKEN } });

    if (!data || !data.ruc) {
      throw new Error("La respuesta del servicio no contiene datos de RUC.");
    }

    return {
      ruc: data.ruc,
      razonSocial: data.razonSocial,
      direccion: data.direccion,
      estado: data.estado,
      condicion: data.condicion,
    };
  } catch (error) {
    throw normalizeError(
      error,
      `No se pudo consultar el RUC ${numeroRUC}`
    );
  }
};

