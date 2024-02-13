import Provincia from "./../../db/models/provincia.js";

export default {
  Query: {
    provincias: () =>
      Provincia.findAll({
        order: [["nombre", "ASC"]],
      }),
    provincia: (parent, args) =>
      Provincia.findByPk(args.id, { include: "ciudades" }),
  },
};
