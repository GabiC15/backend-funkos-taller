import Envio from "./../../db/models/envio.js";

export default {
  Query: {
    envios: () => Envio.findAll(),
    envio: (parent, args) => Envio.findByPk(args.id, { include: "pedido" }),
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
