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
    updateCupon: async (parent, args) => {
      try {
        await Cupon.update(args.input, { where: { id: args.id } });
        return true; // or some other Boolean value indicating success
      } catch (error) {
        console.error(error);
        return false; // or some other Boolean value indicating failure
      }
    },
    deleteCupon: (parent, args) => Cupon.destroy({ where: { id: args.id } }),
  },
};
