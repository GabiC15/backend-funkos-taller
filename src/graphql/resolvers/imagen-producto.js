import ImagenProducto from "./../../db/models/imagen_producto.js";

export default {
  Query: {
    imagenesProducto: () => ImagenProducto.findAll(),
    imagenProducto: (parent, args) => ImagenProducto.findByPk(args.id),
  },

  Mutation: {
    createImagenProducto: (parent, args) => ImagenProducto.create(args.input),
    updateImagenProducto: (parent, args) =>
      ImagenProducto.update(args.input, { where: { id: args.id } }),
    deleteImagenProducto: (parent, args) =>
      ImagenProducto.destroy({ where: { id: args.id } }),
  },
};
