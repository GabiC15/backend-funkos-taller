import Sequelize from "sequelize";
import initModels from "./init-models.js";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_URL,
    dialect: "postgres",
    logging: false,
  }
);

initModels(sequelize);

await sequelize.sync();

export default sequelize;

// const res = await Carrito.create({
//   id: 40,
//   usuario_id: 5,
// });

// const res = await Carrito.findAll({ include: "usuario" });

// console.log(res.map((c) => c.toJSON()));

// const [results, metadata] = await sequelize.query("select * from usuario");

// console.log(results);

// console.log(Producto.table.tableName);
