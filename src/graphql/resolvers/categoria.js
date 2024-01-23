import Categoria from "./../../db/models/categoria.js";

export default {
  Query: {
    categorias: () =>
      Categoria.findAll({ include: "padre", where: { padre_id: null } }),
    categoria: (parent, args) =>
      Categoria.findByPk(args.id, { include: "padre" }),
    subcategorias: (_, args) =>
      Categoria.findAll({
        include: "padre",
        where: { padre_id: args.categoriaId },
      }),
  },
};
