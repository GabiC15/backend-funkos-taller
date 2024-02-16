import axios from "axios";

const CorreoArgentino = {
  getPrecioEnvio: async ({
    codigoPostalOrigen,
    codigoPostalDestino,
    provinciaOrigen,
    provinciaDestino,
    peso,
  }) => {
    const options = {
      method: "POST",
      url: "https://correo-argentino1.p.rapidapi.com/calcularPrecio",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "7304510393msh5502a8c51f7577ep1e29dbjsnda57813c473d",
        "X-RapidAPI-Host": "correo-argentino1.p.rapidapi.com",
      },
      data: {
        cpOrigen: `${codigoPostalOrigen}`,
        cpDestino: `${codigoPostalDestino}`,
        provinciaOrigen: provinciaOrigen,
        provinciaDestino: provinciaDestino,
        peso: `${peso}`,
      },
    };

    const response = await axios.request(options);

    return response.data.paqarClasico.aDomicilio;
  },
};

export default CorreoArgentino;
