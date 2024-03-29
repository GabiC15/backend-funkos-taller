import gql from "graphql-tag";
import carritoTypes from "./carrito.js";
import categoriaTypes from "./categoria.js";
import ciudadTypes from "./ciudad.js";
import dateTypes from "./date.js";
import envioTypes from "./envio.js";
import imagenProductoTypes from "./imagen-producto.js";
import itemPedidoTypes from "./item-pedido.js";
import lineaCarritoTypes from "./linea-carrito.js";
import paisTypes from "./pais.js";
import pedidoTypes from "./pedido.js";
import productoTypes from "./producto.js";
import provinciaTypes from "./provincia.js";
import rolTypes from "./rol.js";
import usuarioTypes from "./usuario.js";
import valoracionTypes from "./valoracion.js";
import favoritoTypes from "./favorito.js";
import notificationTypes from "./notificacion.js";
import cuponTypes from "./cupon.js";
import pagoTypes from "./pago.js";
import caracteristicaTypes from "./caracteristica.js";

const typeDef = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

export default [
  typeDef,
  carritoTypes,
  categoriaTypes,
  ciudadTypes,
  dateTypes,
  envioTypes,
  imagenProductoTypes,
  itemPedidoTypes,
  lineaCarritoTypes,
  paisTypes,
  pedidoTypes,
  productoTypes,
  provinciaTypes,
  rolTypes,
  usuarioTypes,
  valoracionTypes,
  favoritoTypes,
  notificationTypes,
  cuponTypes,
  pagoTypes,
  caracteristicaTypes,
];
