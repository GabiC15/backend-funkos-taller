import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class Caracteristica extends Model {
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
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "caracteristica_especial",
        schema: "public",
        timestamps: false,
        indexes: [
          {
            name: "caracteristica_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
  }
}
