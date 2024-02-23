import gql from "graphql-tag";

export default gql`
  type Pedido {
    id: Int!
    fecha: String
    total: Float
    pagado: Boolean
    despachado: Boolean
    usuario: Usuario
    envio: Envio
    pago: Pago
    cupon: Cupon
    itemsPedido: [ItemPedido]
  }

  type PedidoCreateResponse {
    pedidoId: Int!
    checkoutUrl: String!
  }

  extend type Query {
    pedidos: [Pedido]
    pedido(id: Int!): Pedido
    totalPedidosPagos: Int
    totalPedidos: Int
  }

  extend type Mutation {
    createPedido(input: PedidoInput!): PedidoCreateResponse
    updatePedido(id: Int!, input: PedidoInput!): Boolean
    deletePedido(id: Int!): Boolean
  }

  input PedidoInput {
    envio: EnvioPedidoInput
    cuponId: Int
    despachado: Boolean
    fecha: String
  }

  input EnvioPedidoInput {
    codigoPostal: Int!
    provinciaId: Int!
    ciudad: String!
    calle: String!
    numero: Int!
    piso: Int
  }

`;

