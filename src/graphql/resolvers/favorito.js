import ImagenProducto from "../../db/models/imagen_producto.js";
import Producto from "../../db/models/producto.js";
import Favorito from "./../../db/models/favorito.js";

export default {
  Query: {
    favoritos: (parent, args, { req }) =>
      Favorito.findAll({
        where: req.usuario && {
          usuarioId: req.usuario?.id,
        },
        include: [
          "usuario",
          {
            model: Producto,
            as: "producto",
            include: {
              model: ImagenProducto,
              as: "imagenes",
            },
          },
        ],
      }),
    favorito: (parent, args, { req }) =>
      Favorito.findOne({
        where: {
          productoId: args.productoId,
          usuarioId: req.usuario.id,
        },
      }),
  },

  Mutation: {
    createFavorito: (parent, args) => Favorito.create(args.input),
    deleteFavorito: (parent, args) =>
      Favorito.destroy({ where: { id: args.id } }),
  },
};
