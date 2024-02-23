import Cupon from "../../db/models/cupon.js";

export default {
  Query: {
    cupones: () => Cupon.findAll({ where: { estado: true } }),
    cupon: (parent, args) => Cupon.findByPk(args.id),
    cuponPorNombre: async (parent, args) => {
      const date = new Date();
      date.setMonth(date.getMonth() + 1);
      const cupon = await Cupon.findOne({
        where: {
          nombre: args.nombre,
          estado: true,
        },
      });
      const validoDesde = cupon.dataValues.validoDesde;
      const validoHasta = cupon.dataValues.validoHasta;
      const actualDate = `${date.getFullYear()}-${
        date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()
      }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
      if (
        new Date(validoDesde).getTime() <= new Date(actualDate).getTime() &&
        new Date(actualDate) <= new Date(validoHasta).getTime()
      ) {
        return cupon;
      }
      return null;
    },
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
