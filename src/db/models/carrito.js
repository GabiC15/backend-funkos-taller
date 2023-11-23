import _sequelize from "sequelize";
import { DataTypes } from "@sequelize/core";
const { Model, Sequelize } = _sequelize;

export default class Carrito extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        usuario_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "usuario",
            key: "id",
          },
        },
      },
      {
        sequelize,
        tableName: "carrito",
        schema: "public",
        timestamps: false,
        indexes: [
          {
            name: "carrito_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
  }
}
