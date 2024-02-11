import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class Pago extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        mpId: {
          type: DataTypes.BIGINT,
          field: "mp_id",
          allowNull: false,
        },
        fechaAprobacion: {
          type: DataTypes.DATEONLY,
          field: "fecha_aprobacion",
          allowNull: true,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        metodo: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        monto: {
          type: DataTypes.REAL,
          allowNull: false,
        },
        montoPercibido: {
          type: DataTypes.REAL,
          field: "monto_percibido",
          allowNull: false,
        },
        tarifaMp: {
          type: DataTypes.REAL,
          field: "tarifa_mp",
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "pago",
        schema: "public",
        timestamps: false,
        indexes: [
          {
            name: "pago_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
  }
}
