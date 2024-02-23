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
        usuarioId: {
          type: DataTypes.INTEGER,
          field: "usuario_id",
          allowNull: true,
          references: {
            model: "usuario",
            key: "id",
          },
        },
        cuponId: {
          type: DataTypes.INTEGER,
          field: "cupon_id",
          allowNull: true,
          references: {
            model: "cupon",
            key: "id",
          },
        },
        pagoId: {
          type: DataTypes.INTEGER,
          field: "pago_id",
          allowNull: true,
          references: {
            model: "pago",
            key: "id",
          },
        },
        despachado: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
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
