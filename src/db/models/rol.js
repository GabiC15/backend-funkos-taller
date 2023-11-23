import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Rol extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'rol',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "rol_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
