import Producto from "./../../db/models/producto.js";
import Categoria from "./../../db/models/categoria.js";
import ImagenProducto from "./../../db/models/imagen_producto.js";
import { Op } from "sequelize";

const orderEnum = {
  RECIENTES: ["id", "ASC"],
  PRECIO_DESC: ["precio", "DESC"],
  PRECIO_ASC: ["precio", "ASC"],
};

export default {
  Query: {
    totalProductos: () =>
      Producto.findAndCountAll().then((result) => result.count),
    productos: (
      _,
      {
        input: {
          limite,
          pagina,
          busqueda,
          order,
          categoriaId,
          subcategoriaId,
          precioMaximo,
          precioMinimo,
        },
      }
    ) => {
      return Producto.findAll({
        limit: limite,
        offset: limite * (pagina - 1),
        order: order && [orderEnum[order]],
        where: [
          ...(busqueda ? [{ titulo: { [Op.iLike]: `%${busqueda}%` } }] : []),
          ...(subcategoriaId ? [{ categoria_id: subcategoriaId }] : []),
          ...(precioMinimo ? [{ precio: { [Op.gte]: precioMinimo } }] : []),
          ...(precioMaximo ? [{ precio: { [Op.lte]: precioMaximo } }] : []),
        ],
        include: [
          {
            model: Categoria,
            as: "categoria",
            where: categoriaId && {
              padre_id: categoriaId,
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
