import LineaCarrito from "../../db/models/linea_carrito.js";
import Producto from "../../db/models/producto.js";
import Carrito from "./../../db/models/carrito.js";

export default {
  Query: {
    carrito: (parent, args) =>
      Carrito.findByPk(args.id, {
        include: [
          "usuario",
          {
            model: LineaCarrito,
            as: "lineas_carrito",
            include: [{ model: Producto, as: "producto" }],
          },
        ],
      }),
  },

  Mutation: {
    createCarrito: (parent, args) =>
      Carrito.create({ usuario_id: args.usuario_id }),
    updateCarrito: async (parent, args) => {
      const carrito = await Carrito.update(
        { usuario_id: args.usuario_id },
        {
          where: { id: args.id },
          returning: true,
        }
      );
      return carrito[1][0];
    },
    cleanCarrito: async (parent, args) => {
      const carrito = await Carrito.findByPk(args.id);

      for (let linea of carrito.lineas_carrito) {
        await linea.destroy();
      }

      return true;
    },
  },
};
