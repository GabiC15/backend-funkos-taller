import ImagenProducto from "../../db/models/imagen_producto.js";
import Producto from "../../db/models/producto.js";
import Favorito from "./../../db/models/favorito.js";


export default {
  Query: {
    favoritos: () => Favorito.findAll({ include: ["usuario", {
      model: Producto,
      as: "producto",
      include: {
        model: ImagenProducto,
        as: "imagenes"
      }
    }] }),
  },

  Mutation: {
    createFavorito: (parent, args) => Favorito.create(args.input),
/*     updateFavorito: async (parent, args) => {
      const favorito = await Favorito.update(args.input, {
        where: { id: args.id },
        returning: true,
      });
      return favorito[1][0];
    }, */
    deleteFavorito: (parent, args) =>
      Favorito.destroy({ where: { id: args.id } }),
  },
};
