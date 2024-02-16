import { provinciasISO } from "./provincias-iso.js";
import CorreoArgentino from "./../services/correo-argentino.js";

export const getPrecioEnvio = async ({
  provinciaIdDestino,
  codigoPostalDestino,
}) => {
  const provinciaIdOrigen = 30;
  const codigoPostalOrigen = 3260;
  const provinciaOrigen = provinciasISO[provinciaIdOrigen];
  const provinciaDestino = provinciasISO[provinciaIdDestino];

  return CorreoArgentino.getPrecioEnvio({
    codigoPostalOrigen,
    codigoPostalDestino,
    provinciaOrigen: provinciaOrigen,
    provinciaDestino: provinciaDestino,
    peso: 5,
  });
};
