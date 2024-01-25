import Pedido from "./../../db/models/pedido.js";
import { Op } from "sequelize";

export default {
  Query: {
    pedidos: () => Pedido.findAll({ include: "item_pedidos" }),
    pedido: (parent, args) => Pedido.findByPk(args.id),
    totalPedidos: () => Pedido.findAndCountAll().then((result) => result.count),
    totalVentasPorAnio: async (_, { startYear, endYear }) => {
      // const years = [];
      const pedidos = await Pedido.findAll({
        where: {
          fecha: {
            [Op.between]: [`${startYear}-01-01`, `${endYear}-12-31`],
          },
        }, order: [['fecha', 'ASC']],
      })

      const ventasPorAnio = pedidos.reduce((acc, pedido) => {
        const year = pedido.dataValues.fecha.split('-')[0];
        
        if (!acc[year]) {
          acc[year] = { year, total: 0 };
        }
        acc[year].total += pedido.total;
        return acc;
      }, {});
    
      return Object.entries(ventasPorAnio).map(([year, { total }]) => ({ year, total }));
      // console.log(pedidos)
      // const total = pedidos.reduce((acc, pedido) => acc + pedido.total, 0);
      // return total;
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
