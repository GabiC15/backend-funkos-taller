import Envio from "./../../db/models/envio.js";
import Pedido from "./../../db/models/pedido.js";
import Usuario from "./../../db/models/usuario.js";
import { getPrecioEnvio } from "../../utils/get-precio-envio.js";

export default {
  Query: {
    envios: () => Envio.findAll(),
    envio: (parent, args) => Envio.findByPk(args.id, { include: "pedido" }),
    controlDeEnvios: () =>
      Envio.findAll({
        attributes: ["id", "entregado", "costo"],
        include: [
          {
            model: Pedido,
            as: "pedido",
            attributes: ["fecha"],
            include: [
              {
                model: Usuario,
                as: "usuario",
                attributes: ["id", "nombres", "apellidos", "email"],
              },
            ],
            order: [["fecha", "ASC"]],
          },
        ],
      }),
    precioEnvio: async (parent, args) => {
      const { codigoPostalDestino, provinciaIdDestino } = args.input;
      const precio = getPrecioEnvio({
        codigoPostalDestino,
        provinciaIdDestino,
      });

      return precio;
    },
  },

  Mutation: {
    createEnvio: (parent, args) => Envio.create(args.input),
    updateEnvio: async (parent, args) => {
      const envio = await Envio.update(args.input, {
        where: { id: args.id },
        returning: true,
      });
      return envio[1][0];
    },
    deleteEnvio: (parent, args) => Envio.destroy({ where: { id: args.id } }),
  },
};
