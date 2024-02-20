import Pago from "../../db/models/pago.js";
import { Op } from "sequelize";


// query GET_PAGOS {
//   pagos {
//     id
//     fechaAprobacion
//     monto
//     montoPercibido
//     status
//   }
// }


export default {
  Query: {
    pago: (parent, args) => Pago.findByPk(args.id),
    pagos: () => Pago.findAll(),
    totalPagosPorMes: async (_, { year }) => {
      const pagos = await Pago.findAll({
        where: {
          fechaAprobacion: {
            [Op.between]: [`${year}-01-01`, `${year}-12-31`],
          },
          status: "approved",
        },
        order: [["fechaAprobacion", "ASC"]],
      });

      const pagosPorMes = pagos.reduce((acc, pago) => {
        const month = pago.dataValues.fechaAprobacion.split("-")[1];
        if (!acc[month]) {
          acc[month] = { month, brutto: 0, netto: 0 };
        }
        acc[month].brutto += pago.monto;
        // console.log(pedido.commission_cost)
        // acc[month].commission += pedido.total - commissionCost;
        acc[month].netto +=  pago.montoPercibido;
        return acc;
      }, {});

      return Object.entries(pagosPorMes)
        .sort((a, b) => {
          return (
            new Date(`${year}-${a[0]}-01`) - new Date(`${year}-${b[0]}-01`)
          );
        })
        .map(([month, { brutto, netto }]) => ({
          month,
          brutto,
          netto,
        }));
    },
    totalPagosPorAnio: async (parent, args) => {
      // const years = [];
      const { startYear, endYear } = args.input;
      const pagos = await Pago.findAll({
        where: {
          fechaAprobacion: {
            [Op.between]: [`${startYear}-01-01`, `${endYear}-12-31`],
          },
        },
        order: [["fechaAprobacion", "ASC"]],
      });

      const pagosPorAnio = pagos.reduce((acc, pago) => {
        const year = pago.dataValues.fechaAprobacion.split("-")[0];

        if (!acc[year]) {
          acc[year] = { year, total: 0 };
        }
        acc[year].total += pago.montoPercibido;
        return acc;
      }, {});

      return Object.entries(pagosPorAnio).map(([year, { total }]) => ({
        year,
        total,
      }));
    },
  },
};
