import Producto from "./../../db/models/producto.js";
import Sequelize from "sequelize";
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
          caracteristicaId,
          precioMaximo,
          precioMinimo,
          estado,
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
          ...(caracteristicaId
            ? [{ caracteristica_id: caracteristicaId }]
            : []),
          ...(estado !== undefined ? [{ estado: estado }] : []),
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
          "caracteristica",
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
    // maxProductoId: async () => {
    //   const prodId = await Producto.findOne({
    //     attributes: [[Sequelize.fn("max", Sequelize.col("id")), "maxId"]],
    //   });
    //   return prodId.dataValues;
    // },
  },

  Mutation: {
    createProducto: (parent, args) => Producto.create(args.input),
    updateProducto: async (parent, args) => {
      try {
        await Producto.update(args.input, { where: { id: args.id } });
        return true; // or some other Boolean value indicating success
      } catch (error) {
        console.error(error);
        return false; // or some other Boolean value indicating failure
      }
    },
    deleteProducto: (parent, args) =>
      Producto.destroy({ where: { id: args.id } }),
  },
};
