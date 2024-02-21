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
    totalPagosPorMes: async (parent, args) => {
      const date = new Date();
      date.setMonth(date.getMonth() + 1);
      const actualDate = new Date();
      actualDate.setMonth(date.getMonth())
      const passedDate = new Date();
      passedDate.setFullYear(date.getFullYear());
      passedDate.setMonth(date.getMonth() - 11);
      date.setFullYear(date.getFullYear() - 1);
      const actualDateFormat = `${actualDate.getFullYear()}-${actualDate.getMonth() < 10 ? `0${actualDate.getMonth()}` : actualDate.getMonth()}-${actualDate.getDate() < 10 ? `0${actualDate.getDate()}` : actualDate.getDate()}`;
      const passedDateFormat = `${passedDate.getFullYear()}-${passedDate.getMonth() < 10? `0${passedDate.getMonth()}` : passedDate.getMonth()}-01`;

      const pagos = await Pago.findAll({
        where: {
          fechaAprobacion: {
            [Op.between]: [
              passedDateFormat,
              actualDateFormat,
            ],
          },
          status: "approved",
        },
        order: [["fechaAprobacion", "ASC"]],
      });
      const pagosPorMes = pagos.reduce((acc, pago) => {
        const month = pago.dataValues.fechaAprobacion.split("-")[1];
        const year = pago.dataValues.fechaAprobacion.split("-")[0];
        if (!acc[month]) {
          acc[month] = { month, year, brutto: 0, netto: 0 };
        }
        acc[month].brutto += pago.monto;
        acc[month].netto += pago.montoPercibido;

        return acc;
      }, {});

      return Object.entries(pagosPorMes)
        .sort((a, b) => {
          return (
            new Date(`${b[1]}-${b[0]}-01`) - new Date(`${a[1]}-${a[0]}-01`) 
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
      // const { startYear, endYear } = args.input;
      const date = new Date();
      const startYear = date.getFullYear() - 5;
      const endYear = date.getFullYear();
      date.setMonth(date.getMonth() + 1);
      const endDate = `${date.getFullYear()}-${date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;

      const pagos = await Pago.findAll({
        where: {
          fechaAprobacion: {
            [Op.between]: [`${startYear}-01-01`, `${endDate}`],
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
