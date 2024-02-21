import gql from "graphql-tag";

export default gql`
  type Notificacion {
    id: Int!
    fecha: Date
    mensaje: String
    usuario: Usuario
    pedido: Pedido
    producto: Producto
  }

  extend type Query {
    notificaciones: [Notificacion]
    notificacion(id: Int!): Notificacion
    totalNotificaciones: Int
  }

  extend type Mutation {
    createNotificacion(input: PedidoInput!): Notificacion
    updateNotificacion(id: Int!, input: NotificacionInput!): Notificacion
    deleteNotificacion(id: Int!): Boolean
  }

  # input NotificacionQueryInput {
  #   limite: Int = 20
  # }


  input NotificacionInput {
    fecha: String
    mensaje: String
    usuarioId: Int
    pedidoId: Int
    productoId: Int
  }

`;

