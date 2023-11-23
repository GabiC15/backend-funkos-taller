import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Usuario extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombres: {
      type: DataTypes.STRING,
      allowNull: true
    },
    apellidos: {
      type: DataTypes.STRING,
      allowNull: true
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    dni: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    ciudad_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'ciudad',
        key: 'id'
      }
    },
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'rol',
        key: 'id'
      }
    },
    carrito_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'carrito',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'usuario',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "usuario_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
