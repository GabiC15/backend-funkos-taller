import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class Cupon extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        nombre: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        porcentaje: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            max: 100,
            min: 0,
          },
        },
        validoDesde: {
          type: DataTypes.DATEONLY,
          field: "valido_desde",
          allowNull: false,
        },
        validoHasta: {
          type: DataTypes.DATEONLY,
          field: "valido_hasta",
          allowNull: false,
        },
        estado: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "cupon",
        schema: "public",
        timestamps: false,
        indexes: [
          {
            name: "cupon_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
  }
}
