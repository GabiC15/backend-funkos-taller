import Envio from "./../../db/models/envio.js";
import Pedido from "./../../db/models/pedido.js";
import Usuario from "./../../db/models/usuario.js";

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
