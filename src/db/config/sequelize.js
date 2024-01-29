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
