import LineaCarrito from "./../../db/models/linea_carrito.js";

export default {
  Query: {
    lineasCarrito: () => LineaCarrito.findAll(),
    lineaCarrito: (parent, args, contextValue, info) => {
      return LineaCarrito.findByPk(args.id, { include: "producto" });
    },
  },

  Mutation: {
    createLineaCarrito: (parent, args) => LineaCarrito.create(args.input),
    updateLineaCarrito: (parent, args) =>
      LineaCarrito.update(args.input, { where: { id: args.id } }),
    deleteLineaCarrito: (parent, args) =>
      LineaCarrito.destroy({ where: { id: args.id } }),
  },
};
