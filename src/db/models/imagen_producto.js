import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ImagenProducto extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    path: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'producto',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'imagen_producto',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "imagen_producto_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
