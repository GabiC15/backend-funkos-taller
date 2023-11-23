import Pais from "./../../db/models/pais.js";

export default {
  Query: {
    pais: (parent, args) => Pais.findByPk(args.id),
  },
};
