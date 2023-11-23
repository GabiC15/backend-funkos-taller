import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Producto extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    precio: {
      type: DataTypes.REAL,
      allowNull: true
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    categoria_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categoria',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'producto',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "producto_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
