import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Ciudad extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(70),
      allowNull: true
    },
    provincia_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'provincia',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'ciudad',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "ciudad_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
