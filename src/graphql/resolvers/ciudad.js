import Ciudad from "./../../db/models/ciudad.js";

export default {
  Query: {
    ciudades: () => Ciudad.findAll(),
    ciudad: (parent, args) =>
      Ciudad.findByPk(args.id, { include: "provincia" }),
  },
};
