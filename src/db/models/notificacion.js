import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class Notificacion extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        fecha: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        mensaje: {
          type: DataTypes.TEXT,
          allowNull: true,
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
        pedidoId: {
          field: "pedido_id",
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "pedido",
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
        cuponId: {
          field: "cupon_id",
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "cupon",
            key: "id",
          },
        },
      },
      {
        sequelize,
        tableName: "notificacion",
        schema: "public",
        timestamps: false,
        indexes: [
          {
            name: "notificacion_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
  }
}
