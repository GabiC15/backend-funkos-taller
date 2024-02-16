import sequelize from "./../../db/config/sequelize.js";
import LineaCarrito from "../../db/models/linea_carrito.js";
import Pedido from "./../../db/models/pedido.js";
import ItemPedido from "./../../db/models/item_pedido.js";
import Envio from "./../../db/models/envio.js";
import { getPrecioEnvio } from "../../utils/get-precio-envio.js";
import { Preference } from "mercadopago";
import Cupon from "../../db/models/cupon.js";
import Producto from "../../db/models/producto.js";
import client from "../../services/mercadopago.js";
import { Op } from "sequelize";

export default {
  Query: {
    pedidos: async (parent, args, { req }) =>
      Pedido.findAll({
        where:
          req.usuario.rol === "CLIENTE"
            ? {
                usuarioId: req.usuario.id,
              }
            : {},
        order: [["fecha", "DESC"]],
        include: [
          "usuario",
          "pago",
          "cupon",
          {
            model: Envio,
            as: "envio",
            include: "provincia",
          },
          {
            model: ItemPedido,
            as: "itemsPedido",
            include: {
              model: Producto,
              as: "producto",
              include: "imagenes",
            },
          },
        ],
      }),
    pedido: (parent, args, { req }) =>
      Pedido.findOne({
        where: [
          { id: args.id },
          req.usuario.rol === "CLIENTE" ? { usuario_id: req.usuario.id } : {},
        ],
        include: [
          "pago",
          "cupon",
          {
            model: Envio,
            as: "envio",
            include: "provincia",
          },
          {
            model: ItemPedido,
            as: "itemsPedido",
            include: {
              model: Producto,
              as: "producto",
              include: "imagenes",
            },
          },
        ],
      }),
    totalPedidos: () => Pedido.findAndCountAll().then((result) => result.count),
    totalVentasPorAnio: async (parent, args) => {
      // const years = [];
      const { startYear, endYear } = args.input;
      const pedidos = await Pedido.findAll({
        where: {
          fecha: {
            [Op.between]: [`${startYear}-01-01`, `${endYear}-12-31`],
          },
        },
        order: [["fecha", "ASC"]],
      });

      const ventasPorAnio = pedidos.reduce((acc, pedido) => {
        const year = pedido.dataValues.fecha.split("-")[0];

        if (!acc[year]) {
          acc[year] = { year, total: 0 };
        }
        acc[year].total += pedido.total;
        return acc;
      }, {});

      return Object.entries(ventasPorAnio).map(([year, { total }]) => ({
        year,
        total,
      }));
    },
    totalVentasPorMes: async (_, { year }) => {
      const pedidos = await Pedido.findAll({
        where: {
          fecha: {
            [Op.between]: [`${year}-01-01`, `${year}-12-31`],
          },
        },
        order: [["fecha", "ASC"]],
      });

      function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

      const ventasPorMes = pedidos.reduce((acc, pedido) => {
        const month = pedido.dataValues.fecha.split("-")[1];
        const cardCommission = pedido.total * 0.05;
        const operationalCost = (getRandomInt(3) + 1) * (getRandomInt(3) + 1);
        const commissionCost = pedido.total - cardCommission * operationalCost;

        if (!acc[month]) {
          acc[month] = { month, brutto: 0, commission: 0 };
        }
        acc[month].brutto += pedido.total;
        acc[month].commission += pedido.total - commissionCost;
        return acc;
      }, {});

      return Object.entries(ventasPorMes)
        .sort((a, b) => {
          return (
            new Date(`${year}-${a[0]}-01`) - new Date(`${year}-${b[0]}-01`)
          );
        })
        .map(([month, { brutto, commission }]) => ({
          month,
          brutto,
          commission,
        }));
    },
    totalPedidosPagos: () =>
      Pedido.findAndCountAll({ where: { pagado: true } }).then(
        (result) => result.count
      ),
  },
  Mutation: {
    createPedido: async (parent, args, { req }) => {
      const { pedido, url } = await sequelize.transaction(async (t) => {
        const lineasCarrito = await LineaCarrito.findAll({
          where: {
            carritoId: req.usuario.id,
          },
          include: "producto",
          transaction: t,
        });

        let cupon;
        let porcDescuento = 0;
        if (args.input.cuponId) {
          cupon = await Cupon.findByPk(args.input.cuponId);
          porcDescuento = cupon.porcentaje;
        }

        const pedido = await Pedido.create(
          {
            fecha: new Date(),
            usuarioId: req.usuario.id,
            cuponId: cupon?.id,
          },
          { transaction: t }
        );

        let envio;
        if (args.input.envio) {
          const { codigoPostal, provinciaId, ciudad, calle, numero, piso } =
            args.input.envio;
          const precioEnvio = await getPrecioEnvio({
            codigoPostalDestino: codigoPostal,
            provinciaIdDestino: provinciaId,
          });

          envio = await Envio.create(
            {
              codigoPostal,
              provinciaId,
              ciudad,
              costo: precioEnvio,
              direccion: `${calle} ${numero}${piso ? ` piso: ${piso}` : ""} `,
              pedidoId: pedido.id,
            },
            { transaction: t }
          );
        }

        const preference = new Preference(client);
        const data = await preference.create({
          body: {
            statement_descriptor: "FunkoPlanet",
            back_urls: {
              failure: `${process.env.FRONTEND_URL}/usuario/historial/${pedido.id}`,
              success: `${process.env.FRONTEND_URL}/usuario/historial/${pedido.id}`,
              pending: `${process.env.FRONTEND_URL}/usuario/historial/${pedido.id}`,
            },
            external_reference: `${pedido.id}`,
            shipments: envio && {
              cost: envio.costo,
              receiver_address: {
                city_name: envio.ciudad,
                street_name: envio.calle,
                street_number: envio.numero,
                zip_code: envio.codigoPostal,
              },
            },
            items: lineasCarrito.map((lc) => ({
              id: lc.producto.id,
              title: lc.producto.titulo,
              quantity: lc.cantidad,
              unit_price:
                lc.producto.precio - (porcDescuento / 100) * lc.producto.precio,
              description: lc.producto.descripcion,
            })),
          },
        });

        await ItemPedido.bulkCreate(
          lineasCarrito.map((lc) => ({
            pedidoId: pedido.id,
            productoId: lc.producto.id,
            cantidad: lc.cantidad,
            precioProducto: lc.producto.precio,
          })),
          { transaction: t }
        );

        await LineaCarrito.destroy({
          where: {
            id: lineasCarrito.map((lc) => lc.id),
          },
          transaction: t,
        });

        return { pedido, url: data.init_point };
      });

      return {
        pedidoId: pedido.id,
        checkoutUrl: url,
      };
    },
    updatePedido: (parent, args) =>
      Pedido.update(args.input, { where: { id: args.id } }),
    deletePedido: (parent, args) => Pedido.destroy({ where: { id: args.id } }),
  },
};
