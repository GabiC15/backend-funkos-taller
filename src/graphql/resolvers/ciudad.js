import { Op, col, fn, where } from "sequelize";
import Ciudad from "./../../db/models/ciudad.js";

export default {
  Query: {
    ciudades: (parent, args) =>
      Ciudad.findAll({
        limit: 30,
        where:
          args.busqueda &&
          where(
            fn("CONCAT", col("Ciudad.nombre"), ", ", col("provincia.nombre")),
            {
              [Op.iLike]: `%${args.busqueda}%`,
            }
          ),

        include: "provincia",
      }),
    ciudad: (parent, args) =>
      Ciudad.findByPk(args.id, { include: "provincia" }),
  },
};
