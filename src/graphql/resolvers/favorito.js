import ImagenProducto from "../../db/models/imagen_producto.js";
import Producto from "../../db/models/producto.js";
import Favorito from "./../../db/models/favorito.js";

export default {
  Query: {
    favoritos: (parent, args, { req }) =>
      Favorito.findAll({
        where: {
          usuarioId: req.usuario.id,
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
    createFavorito: (parent, args, { req }) =>
      Favorito.create({
        productoId: args.productoId,
        usuarioId: req.usuario.id,
      }),
    deleteFavorito: (parent, args, { req }) =>
      Favorito.destroy({
        where: { productoId: args.productoId, usuarioId: req.usuario.id },
      }),
  },
};
