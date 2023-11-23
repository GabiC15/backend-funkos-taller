import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Provincia extends Model {
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
    },
    pais_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'pais',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'provincia',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "provincia_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
