import Valoracion from "../../db/models/valoracion.js";

export default {
  Query: {
    valoraciones: (parent, args) =>
      Valoracion.findAll({
        where: {
          producto_id: args.productoId,
        },
      }),
    valoracion: (parent, args) =>
      Valoracion.findOne({
        where: {
          productoId: args.productoId,
        },
      }),
  },

  Mutation: {
    createValoracion: (parent, args, { req }) =>
      Valoracion.create({
        ...args.input,
        usuarioId: req.usuario.id,
      }),
    updateValoracion: (parent, args) =>
      Valoracion.update(args.input, { where: { id: args.id } }),
    deleteValoracion: (parent, args) =>
      Valoracion.destroy({ where: { id: args.id } }),
  },
};
