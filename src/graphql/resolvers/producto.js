import Producto from "./../../db/models/producto.js";
import Categoria from "./../../db/models/categoria.js";
import ImagenProducto from "./../../db/models/imagen_producto.js";
import { Op } from "sequelize";

export default {
  Query: {
    productos: (
      _,
      { input: { limite, pagina, busqueda, categoriaId, subcategoriaId } }
    ) => {
      return Producto.findAll({
        limit: limite,
        offset: limite * (pagina - 1),
        where: {
          ...(busqueda ? { titulo: { [Op.like]: `%${busqueda}%` } } : {}),
          ...(subcategoriaId ? { categoria_id: subcategoriaId } : {}),
        },
        include: [
          {
            model: Categoria,
            as: "categoria",
            include: {
              model: Categoria,
              as: "padre",
              where: categoriaId && {
                id: categoriaId,
              },
            },
          },
          {
            model: ImagenProducto,
            as: "imagenes",
          },
        ],
      });
    },
    producto: async (_, args) => {
      return Producto.findByPk(args.id, {
        include: [
          {
            model: Categoria,
            as: "categoria",
            include: {
              model: Categoria,
              as: "padre",
            },
          },
          {
            model: ImagenProducto,
            as: "imagenes",
          },
        ],
      });
    },
  },

  Mutation: {
    createProducto: (parent, args) => Producto.create(args.input),
    updateProducto: (parent, args) =>
      Producto.update(args.input, { where: { id: args.id } }),
    deleteProducto: (parent, args) =>
      Producto.destroy({ where: { id: args.id } }),
  },
};