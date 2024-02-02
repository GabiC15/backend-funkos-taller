import Pedido from "./../../db/models/pedido.js";
import { Op } from "sequelize";

export default {
  Query: {
    pedidos: () => Pedido.findAll({ include: "item_pedidos" }),
    pedido: (parent, args) => Pedido.findByPk(args.id),
    totalPedidos: () => Pedido.findAndCountAll().then((result) => result.count),
    totalVentasPorAnio: async (parent, args ) => {
      // const years = [];
      const {startYear, endYear } = args.input;
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
      // console.log(pedidos)
      // const total = pedidos.reduce((acc, pedido) => acc + pedido.total, 0);
      // return total;
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
        const cardCommission = pedido.total * 0.05
        const operationalCost = (getRandomInt(3) +1) * (getRandomInt(3) +1);
        const commissionCost = pedido.total - cardCommission * operationalCost;

        if (!acc[month]) {
          acc[month] = { month, brutto: 0, commission: 0 };
        }
        acc[month].brutto += pedido.total;
        // console.log(pedido.commission_cost)
        // acc[month].commission += pedido.total - commissionCost;
        acc[month].commission +=  pedido.commission_cost || (pedido.total - commissionCost);
        return acc;
      }, {});
      

      return Object.entries(ventasPorMes)
      .sort((a, b) => {
        return new Date(`${year}-${a[0]}-01`) - new Date(`${year}-${b[0]}-01`);
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
    createPedido: (parent, args) => Pedido.create(args.input),
    updatePedido: (parent, args) =>
      Pedido.update(args.input, { where: { id: args.id } }),
    deletePedido: (parent, args) => Pedido.destroy({ where: { id: args.id } }),
  },
};
