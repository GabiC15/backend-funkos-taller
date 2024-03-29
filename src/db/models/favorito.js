import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class Favorito extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        usuarioId: {
          type: DataTypes.INTEGER,
          field: "usuario_id",
          allowNull: true,
          references: {
            model: "usuario",
            key: "id",
          },
        },
        productoId: {
          type: DataTypes.INTEGER,
          field: "producto_id",
          allowNull: true,
          references: {
            model: "producto",
            key: "id",
          },
        },
      },
      {
        sequelize,
        tableName: "favorito",
        schema: "public",
        timestamps: false,
        indexes: [
          {
            name: "favorito_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
  }
}
