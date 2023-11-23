import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Envio extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    costo: {
      type: DataTypes.REAL,
      allowNull: true
    },
    entregado: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    codigo_seguimiento: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pedido_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'pedido',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'envio',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "envio_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
