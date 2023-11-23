import Provincia from "./../../db/models/provincia.js";

export default {
  Query: {
    provincias: () => Provincia.findAll(),
    provincia: (parent, args) =>
      Provincia.findByPk(args.id, { include: "ciudades" }),
  },
};
