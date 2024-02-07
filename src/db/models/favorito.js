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
          field: "usuario_id",
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "usuario",
            key: "id",
          },
        },
        productoId: {
          field: "producto_id",
          type: DataTypes.INTEGER,
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
