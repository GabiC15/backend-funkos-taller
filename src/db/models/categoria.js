import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Categoria extends Model {
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
    },
    padre_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categoria',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'categoria',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "categoria_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
