import Cupon from "../../db/models/cupon.js";

export default {
  Query: {
    cupones: () => Cupon.findAll(),
    cupon: (parent, args) => Cupon.findByPk(args.id),
    cuponPorNombre: (parent, args) =>
      Cupon.findOne({
        where: {
          nombre: args.nombre,
        },
      }),
  },

  Mutation: {
    createCupon: (parent, args) => Cupon.create(args.input),
    deleteCupon: (parent, args) => Cupon.destroy({ where: { id: args.id } }),
  },
};
