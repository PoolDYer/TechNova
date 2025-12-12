import { consultarDNI, consultarRUC } from "./api-consultas.js";

const COMPROBANTES = {
  DNI: "BOLETA ELECTRÓNICA",
  RUC: "FACTURA ELECTRÓNICA",
};

export const generarComprobante = async (tipoDocumento, numeroDocumento) => {
  if (!tipoDocumento || !numeroDocumento) {
    throw new Error("Se requieren tipo y número de documento.");
  }

  const tipoNormalizado = tipoDocumento.trim().toUpperCase();

  if (tipoNormalizado === "RUC") {
    const datosRUC = await consultarRUC(numeroDocumento);
    const estado = datosRUC.estado?.toUpperCase();
    const condicion = datosRUC.condicion?.toUpperCase();

    if (estado !== "ACTIVO" || condicion !== "HABIDO") {
      throw new Error(
        `El RUC ${numeroDocumento} no está habilitado (estado: ${estado}, condición: ${condicion}).`
      );
    }

    return {
      tipoComprobante: COMPROBANTES.RUC,
      cliente: {
        ruc: datosRUC.ruc,
        razonSocial: datosRUC.razonSocial,
        direccion: datosRUC.direccion,
        estado,
        condicion,
      },
      mensaje: "Factura lista para emitirse.",
    };
  }

  if (tipoNormalizado === "DNI") {
    const datosDNI = await consultarDNI(numeroDocumento);
    return {
      tipoComprobante: COMPROBANTES.DNI,
      cliente: {
        dni: datosDNI.dni,
        nombres: datosDNI.nombres,
        apellidoPaterno: datosDNI.apellidoPaterno,
        apellidoMaterno: datosDNI.apellidoMaterno,
      },
      mensaje: "Boleta lista para emitirse.",
    };
  }

  throw new Error(
    `Tipo de documento ${tipoDocumento} no soportado. Use DNI o RUC.`
  );
};

// Ejemplo simple de uso directo del módulo (manual sanity check)
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const [tipo, numero] = process.argv.slice(2);
  generarComprobante(tipo, numero)
    .then((resultado) => {
      console.log("Comprobante generado:", resultado);
    })
    .catch((error) => {
      console.error("Error al generar comprobante:", error.message);
    });
}

