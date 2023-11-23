import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Pedido extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    total: {
      type: DataTypes.REAL,
      allowNull: true
    },
    pagado: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'usuario',
        key: 'id'
      }
    },
    envio_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'envio',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'pedido',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pedido_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
