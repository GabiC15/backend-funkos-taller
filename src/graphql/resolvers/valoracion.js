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
          producto_id: args.productoId,
          usuario_id: args.usuarioId,
        },
      }),
    promedioValoraciones: async (parent, args) => {
      const valoraciones = await Valoracion.findAll({
        where: {
          producto_id: args.productoId,
        },
      });

      return (
        valoraciones
          .map((v) => v.cantidadEstrellas)
          .reduce((acc, cur) => acc + cur) / valoraciones.length
      );
    },
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
