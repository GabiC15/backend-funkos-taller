import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class Pedido extends Model {
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
        // total: {
        //   type: DataTypes.REAL,
        //   allowNull: true,
        // },
        preferenceId: {
          type: DataTypes.STRING,
          field: "preference_id",
          allowNull: true,
        },
        pagado: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        commissionCost: {
          type: DataTypes.REAL,
          field: "commission_cost",
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
        cuponId: {
          field: "cupon_id",
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "cupon",
            key: "id",
          },
        },
        pagoId: {
          field: "pago_id",
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "pago",
            key: "id",
          },
        },
      },
      {
        sequelize,
        tableName: "pedido",
        schema: "public",
        timestamps: false,
        indexes: [
          {
            name: "pedido_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
  }
}
