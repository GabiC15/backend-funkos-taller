export const operationsRoles = {
  // Queries
  carrito: ["CLIENTE", "ADMIN"],
  totalCarrito: ["CLIENTE", "ADMIN"],
  categorias: ["ALL"],
  categoria: ["ALL"],
  subcategorias: ["ALL"],
  ciudades: ["ALL"],
  ciudad: ["ALL"],
  envios: ["CLIENTE", "ADMIN"],
  envio: ["CLIENTE", "ADMIN"],
  controlDeEnvios: ["ADMIN"],
  precioEnvio: ["CLIENTE", "ADMIN"],
  imagenesProducto: ["ALL"],
  imagenProducto: ["ALL"],
  itemPedidos: ["CLIENTE", "ADMIN"],
  itemPedido: ["CLIENTE", "ADMIN"],
  itemsMasPedidos: ["ADMIN"],
  volumenItemsPedidos: ["ADMIN"],
  lineasCarrito: ["CLIENTE", "ADMIN"],
  lineaCarrito: ["CLIENTE", "ADMIN"],
  pais: ["ALL"],
  pedidos: ["CLIENTE", "ADMIN"],
  pedido: ["CLIENTE", "ADMIN"],
  totalPedidosPagos: ["ADMIN"],
  totalVentasPorAnio: ["ADMIN"],
  totalVentasPorMes: ["ADMIN"],
  totalPedidos: ["ADMIN"],
  productos: ["ALL"],
  producto: ["ALL"],
  totalProductos: ["ADMIN"],
  provincias: ["ALL"],
  provincia: ["ALL"],
  roles: ["ADMIN"],
  rol: ["ADMIN"],
  usuarios: ["ADMIN"],
  usuario: ["CLIENTE", "ADMIN"],
  totalUsuarios: ["ADMIN"],
  login: ["ALL"],
  valoracion: ["CLIENTE", "ADMIN"],
  valoraciones: ["ALL"],
  favorito: ["CLIENTE", "ADMIN"],
  favoritos: ["CLIENTE", "ADMIN"],
  notificaciones: ["ADMIN"],
  notificacion: ["ADMIN"],
  totalNotificaciones: ["ADMIN"],
  cupones: ["ADMIN"],
  cupon: ["CLIENTE", "ADMIN"],
  cuponPorNombre: ["CLIENTE", "ADMIN"],
  pago: ["CLIENTE", "ADMIN"],
  caracteristicas: ["ALL"],
  caracteristica: ["ALL"],

  // Mutations
  createCarrito: ["ADMIN"],
  updateCarrito: ["CLIENTE", "ADMIN"],
  cleanCarrito: ["CLIENTE", "ADMIN"],
  createEnvio: ["CLIENTE", "ADMIN"],
  updateEnvio: ["CLIENTE", "ADMIN"],
  deleteEnvio: ["CLIENTE", "ADMIN"],
  createImagenProducto: ["ADMIN"],
  updateImagenProducto: ["ADMIN"],
  deleteImagenProducto: ["ADMIN"],
  createItemPedido: ["CLIENTE", "ADMIN"],
  updateItemPedido: ["CLIENTE", "ADMIN"],
  deleteItemPedido: ["CLIENTE", "ADMIN"],
  createLineaCarrito: ["CLIENTE", "ADMIN"],
  updateLineaCarrito: ["CLIENTE", "ADMIN"],
  deleteLineaCarrito: ["CLIENTE", "ADMIN"],
  deleteLineasCarrito: ["CLIENTE", "ADMIN"],
  createPedido: ["CLIENTE", "ADMIN"],
  updatePedido: ["CLIENTE", "ADMIN"],
  deletePedido: ["CLIENTE", "ADMIN"],
  createProducto: ["ADMIN"],
  updateProducto: ["ADMIN"],
  deleteProducto: ["ADMIN"],
  createUsuario: ["ALL"],
  updateUsuario: ["CLIENTE", "ADMIN"],
  deleteUsuario: ["ADMIN"],
  logout: ["ALL"],
  createValoracion: ["CLIENTE", "ADMIN"],
  updateValoracion: ["CLIENTE", "ADMIN"],
  deleteValoracion: ["CLIENTE", "ADMIN"],
  createFavorito: ["CLIENTE", "ADMIN"],
  deleteFavorito: ["CLIENTE", "ADMIN"],
  createNotificacion: ["CLIENTE", "ADMIN"],
  updateNotificacion: ["CLIENTE", "ADMIN"],
  deleteNotificacion: ["CLIENTE", "ADMIN"],
  createCupon: ["ADMIN"],
  updateCupon: ["ADMIN"],
  deleteCupon: ["ADMIN"],
};
