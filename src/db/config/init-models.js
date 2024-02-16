import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _carrito from "../models/carrito.js";
import _categoria from "../models/categoria.js";
import _ciudad from "../models/ciudad.js";
import _envio from "../models/envio.js";
import _imagen_producto from "../models/imagen_producto.js";
import _item_pedido from "../models/item_pedido.js";
import _linea_carrito from "../models/linea_carrito.js";
import _pais from "../models/pais.js";
import _pedido from "../models/pedido.js";
import _producto from "../models/producto.js";
import _provincia from "../models/provincia.js";
import _rol from "../models/rol.js";
import _usuario from "../models/usuario.js";
import _valoracion from "../models/valoracion.js";
import _favorito from "../models/favorito.js";
import _notificacion from "../models/notificacion.js";
import _cupon from "../models/cupon.js";
import _pago from "../models/pago.js";

export default function initModels(sequelize) {
  const carrito = _carrito.init(sequelize, DataTypes);
  const categoria = _categoria.init(sequelize, DataTypes);
  const ciudad = _ciudad.init(sequelize, DataTypes);
  const envio = _envio.init(sequelize, DataTypes);
  const imagen_producto = _imagen_producto.init(sequelize, DataTypes);
  const item_pedido = _item_pedido.init(sequelize, DataTypes);
  const linea_carrito = _linea_carrito.init(sequelize, DataTypes);
  const pais = _pais.init(sequelize, DataTypes);
  const pedido = _pedido.init(sequelize, DataTypes);
  const producto = _producto.init(sequelize, DataTypes);
  const provincia = _provincia.init(sequelize, DataTypes);
  const rol = _rol.init(sequelize, DataTypes);
  const usuario = _usuario.init(sequelize, DataTypes);
  const valoracion = _valoracion.init(sequelize, DataTypes);
  const favorito = _favorito.init(sequelize, DataTypes);
  const notificacion = _notificacion.init(sequelize, DataTypes);

  const cupon = _cupon.init(sequelize, DataTypes);
  const pago = _pago.init(sequelize, DataTypes);

  linea_carrito.belongsTo(carrito, { as: "carrito", foreignKey: "carrito_id" });
  carrito.hasMany(linea_carrito, {
    as: "lineas_carrito",
    foreignKey: "carrito_id",
  });
  // usuario.belongsTo(carrito, {
  //   as: "carrito_carrito",
  //   foreignKey: "carrito_id",
  // });
  // carrito.hasMany(usuario, {
  //   as: "carrito_usuarios",
  //   foreignKey: "carrito_id",
  // });
  categoria.belongsTo(categoria, { as: "padre", foreignKey: "padre_id" });
  categoria.hasMany(categoria, { as: "categoria", foreignKey: "padre_id" });
  producto.belongsTo(categoria, {
    as: "categoria",
    foreignKey: "categoria_id",
  });
  categoria.hasMany(producto, { as: "productos", foreignKey: "categoria_id" });
  usuario.belongsTo(ciudad, { as: "ciudad", foreignKey: "ciudad_id" });
  ciudad.hasMany(usuario, { as: "usuarios", foreignKey: "ciudad_id" });
  // pedido.belongsTo(envio, { as: "envio", foreignKey: "envio_id" });
  // envio.hasMany(pedido, { as: "envio_pedidos", foreignKey: "envio_id" });
  provincia.belongsTo(pais, { as: "pais", foreignKey: "pais_id" });
  pais.hasMany(provincia, { as: "provincia", foreignKey: "pais_id" });
  envio.belongsTo(pedido, { as: "pedido", foreignKey: "pedido_id" });
  pedido.hasOne(envio, { as: "envio", foreignKey: "pedido_id" });
  item_pedido.belongsTo(pedido, { as: "pedido", foreignKey: "pedido_id" });
  pedido.hasMany(item_pedido, { as: "itemsPedido", foreignKey: "pedido_id" });
  imagen_producto.belongsTo(producto, {
    as: "producto",
    foreignKey: "producto_id",
  });
  producto.hasMany(imagen_producto, {
    as: "imagenes",
    foreignKey: "producto_id",
  });

  item_pedido.belongsTo(producto, {
    as: "producto",
    foreignKey: "producto_id",
  });
  producto.hasMany(item_pedido, {
    as: "itemsPedido",
    foreignKey: "producto_id",
  });

  favorito.belongsTo(producto, { as: "producto", foreignKey: "producto_id" });
  producto.hasMany(favorito, { as: "favoritos", foreignKey: "producto_id" });
  favorito.belongsTo(usuario, {
    as: "usuario",
    foreignKey: "usuario_id",
  });
  usuario.hasMany(favorito, {
    as: "favoritos",
    foreignKey: "usuario_id",
  });

  linea_carrito.belongsTo(producto, {
    as: "producto",
    foreignKey: "producto_id",
  });
  producto.hasMany(linea_carrito, {
    as: "linea_carritos",
    foreignKey: "producto_id",
  });
  valoracion.belongsTo(producto, { as: "producto", foreignKey: "producto_id" });
  producto.hasMany(valoracion, {
    as: "valoraciones",
    foreignKey: "producto_id",
  });
  ciudad.belongsTo(provincia, { as: "provincia", foreignKey: "provincia_id" });
  provincia.hasMany(ciudad, { as: "ciudades", foreignKey: "provincia_id" });
  usuario.belongsTo(rol, { as: "rol", foreignKey: "rol_id" });
  rol.hasMany(usuario, { as: "usuarios", foreignKey: "rol_id" });
  carrito.belongsTo(usuario, { as: "usuario", foreignKey: "usuario_id" });
  usuario.hasMany(carrito, { as: "carritos", foreignKey: "usuario_id" });
  pedido.belongsTo(usuario, { as: "usuario", foreignKey: "usuario_id" });
  usuario.hasOne(pedido, { as: "pedido", foreignKey: "usuario_id" });
  valoracion.belongsTo(usuario, { as: "usuario", foreignKey: "usuario_id" });
  usuario.hasMany(valoracion, { as: "valoraciones", foreignKey: "usuario_id" });
  // usuario.belongsTo(notificacion, { as: "usuario", foreignKey: "usuario_id" });
  // notificacion.belongsTo(usuario, { as: "usuario", foreignKey: "usuario_id" });
  // usuario.hasMany(notificacion, { as: "notificaciones", foreignKey: "usuario_id" });

  // notificacion.belongsTo(usuario, { as: "usuario", foreignKey: "usuarioId" });
  // usuario.hasMany(notificacion, {
  //   as: "notificaciones",
  //   foreignKey: "usuarioId",
  // });
  notificacion.belongsTo(pedido, { as: "pedido", foreignKey: "pedidoId" });
  pedido.hasMany(notificacion, {
    as: "notificaciones",
    foreignKey: "pedidoId",
  });
  notificacion.belongsTo(producto, {
    as: "producto",
    foreignKey: "productoId",
  });
  producto.hasMany(notificacion, {
    as: "notificaciones",
    foreignKey: "productoId",
  });

  // producto.belongsTo(categoria, {
  //   as: "categoria",
  //   foreignKey: "categoria_id",
  // });
  // categoria.hasMany(producto, { as: "productos", foreignKey: "categoria_id" });
  // notificacion.hasOne(usuario, {as: "usuario", foreignKey: "usuario_id"});
  // notificacion.hasOne(producto, {as: "producto", foreignKey: "producto_id"});
  // notificacion.hasOne(pedido, {as: "pedido", foreignKey: "pedido_id"});

  // // Define the Pedido, Producto, and Usuario models and their associations
  // // ...

  // // Define the associations for the Producto model
  // producto.hasMany(notificacion, { foreignKey: "producto_id" });
  cupon.hasMany(pedido, { as: "pedido", foreignKey: "cupon_id" });
  pedido.belongsTo(cupon, { as: "cupon", foreignKey: "cupon_id" });
  pago.hasOne(pedido, { as: "pedido", foreignKey: "pago_id" });
  pedido.belongsTo(pago, { as: "pago", foreignKey: "pago_id" });
  provincia.hasOne(envio, { as: "envio", foreignKey: "provincia_id" });
  envio.belongsTo(provincia, { as: "provincia", foreignKey: "provincia_id" });

  return {
    carrito,
    categoria,
    ciudad,
    envio,
    imagen_producto,
    item_pedido,
    linea_carrito,
    pais,
    pedido,
    producto,
    provincia,
    rol,
    usuario,
    valoracion,
    favorito,
    notificacion,
    cupon,
    pago,
  };
}
