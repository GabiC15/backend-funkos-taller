import Notificacion from "./../../db/models/notificacion.js";
import Pedido from "../../db/models/pedido.js";
import Producto from "../../db/models/producto.js";
import Usuario from "../../db/models/usuario.js";
import Cupon from "../../db/models/cupon.js";

export default {
  Query: {
    notificaciones: () =>
      Notificacion.findAll({
        limit: 25,
        include: [
          {
            model: Usuario,
            as: "usuario",
            attributes: ["id", "nombres", "email"],
          },
          {
            model: Pedido,
            as: "pedido",
            attributes: ["id", "fecha"],
            include: "pago",
          },
          {
            model: Producto,
            as: "producto",
            attributes: ["id", "titulo", "descripcion", "precio", "stock"],
          },
          {
            model: Cupon,
            as: "cupon",
            attributes: ["id"],
          },
        ],
        order: [["id", "DESC"]],
      }),
    notificacion: (parent, args) => Notificacion.findByPk(args.id),
    totalNotificaciones: () =>
      Notificacion.findAndCountAll().then((result) => result.count),
  },

  Mutation: {
    createNotificacion: (parent, args) => Notificacion.create(args.input),
    updateNotificacion: (parent, args) =>
      Notificacion.update(args.input, { where: { id: args.id } }),
    deleteNotificacion: (parent, args) =>
      Notificacion.destroy({ where: { id: args.id } }),
  },
};
