import Producto from "./../../db/models/producto.js";
import Categoria from "./../../db/models/categoria.js";
import ImagenProducto from "./../../db/models/imagen_producto.js";

export default {
  Query: {
    productos: () => Producto.findAll(),
    producto: async (_, args, __, info) => {
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
