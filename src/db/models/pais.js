import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Pais extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(70),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pais',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pais_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
