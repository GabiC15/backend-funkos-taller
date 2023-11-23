import Valoracion from "../../db/models/valoracion.js";

export default {
  Query: {
    valoraciones: () => Valoracion.findAll(),
    valoracion: (parent, args) => Valoracion.findByPk(args.id),
  },

  Mutation: {
    createValoracion: (parent, args) => Valoracion.create(args.input),
    updateValoracion: (parent, args) =>
      Valoracion.update(args.input, { where: { id: args.id } }),
    deleteValoracion: (parent, args) =>
      Valoracion.destroy({ where: { id: args.id } }),
  },
};
