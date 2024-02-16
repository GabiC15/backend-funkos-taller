import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class Valoracion extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        texto: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        fecha: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        cantidadEstrellas: {
          type: DataTypes.INTEGER,
          field: "cantidad_estrellas",
          allowNull: true,
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
        usuarioId: {
          type: DataTypes.INTEGER,
          field: "usuario_id",
          allowNull: true,
          references: {
            model: "usuario",
            key: "id",
          },
        },
      },
      {
        sequelize,
        tableName: "valoracion",
        schema: "public",
        timestamps: false,
        indexes: [
          {
            name: "valoracion_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
  }
}
