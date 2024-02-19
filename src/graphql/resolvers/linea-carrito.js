import Producto from "../../db/models/producto.js";
import LineaCarrito from "./../../db/models/linea_carrito.js";

export default {
  Query: {
    lineasCarrito: (parent, args, { req }) =>
      LineaCarrito.findAll({
        where: { carrito_id: req.usuario.id },
        include: {
          model: Producto,
          as: "producto",
          include: "imagenes",
        },
      }),
    lineaCarrito: (parent, args, { req }) =>
      LineaCarrito.findOne({
        where: { carrito_id: req.usuario.id, producto_id: args.productoId },
        include: "producto",
      }),
  },

  Mutation: {
    createLineaCarrito: (parent, args, { req }) =>
      LineaCarrito.create({ ...args.input, carritoId: req.usuario.id }),
    updateLineaCarrito: (parent, args) =>
      LineaCarrito.update(args.input, { where: { id: args.id } }),
    deleteLineaCarrito: (parent, args, { req }) =>
      LineaCarrito.destroy({
        where: { carrito_id: req.usuario.id, producto_id: args.productoId },
      }),
    deleteLineasCarrito: (parent, args, { req }) =>
      LineaCarrito.destroy({
        where: { carrito_id: req.usuario.id },
      }),
  },
};
