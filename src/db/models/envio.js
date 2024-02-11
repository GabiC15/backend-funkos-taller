import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class Envio extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        codigoPostal: {
          type: DataTypes.STRING,
          field: "codigo_postal",
          allowNull: false,
        },
        ciudad: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        direccion: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        costo: {
          type: DataTypes.REAL,
          allowNull: false,
        },
        entregado: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        codigo_seguimiento: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        provinciaId: {
          field: "provincia_id",
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "provincia",
            key: "id",
          },
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
      },
      {
        sequelize,
        tableName: "envio",
        schema: "public",
        timestamps: false,
        indexes: [
          {
            name: "envio_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
  }
}
