import Categoria from "./../../db/models/categoria.js";

export default {
  Query: {
    categorias: () => Categoria.findAll({ include: "padre" }),
    categoria: (parent, args) =>
      Categoria.findByPk(args.id, { include: "padre" }),
  },
};
