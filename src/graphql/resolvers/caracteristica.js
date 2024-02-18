import Caracteristica from "../../db/models/caracteristica.js";

export default {
  Query: {
    caracteristicas: () => Caracteristica.findAll(),
    caracteristica: (parent, args) => Caracteristica.findByPk(args.id),
  },
};
