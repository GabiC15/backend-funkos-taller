import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class ItemPedido extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        cantidad: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        precioProducto: {
          type: DataTypes.REAL,
          field: "precio_producto",
          allowNull: false,
        },
        pedidoId: {
          type: DataTypes.INTEGER,
          field: "pedido_id",
          allowNull: true,
          references: {
            model: "pedido",
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
        tableName: "item_pedido",
        schema: "public",
        timestamps: false,
        indexes: [
          {
            name: "item_pedido_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
  }
}
