import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class LineaCarrito extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    carrito_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'carrito',
        key: 'id'
      }
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
    tableName: 'linea_carrito',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "linea_carrito_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
