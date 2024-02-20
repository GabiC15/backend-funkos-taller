import gql from "graphql-tag";

export default gql`
  type Pedido {
    id: Int!
    fecha: String
    total: Float
    pagado: Boolean
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

#   type YearlySales {
#   year: String
#   total: Int
# }

#   type MonthlySales {
#     month: String
#     brutto: Int
#     commission: Int
#   }

  extend type Query {
    pedidos: [Pedido]
    pedido(id: Int!): Pedido
    totalPedidosPagos: Int
    # totalVentasPorAnio(input: VentasPorAnioInput!): [YearlySales]
    # totalVentasPorMes(year: Int): [MonthlySales]
    totalPedidos: Int
  }

  extend type Mutation {
    createPedido(input: PedidoInput!): PedidoCreateResponse
    updatePedido(id: Int!, input: PedidoInput!): Pedido
    deletePedido(id: Int!): Boolean
  }

  input PedidoInput {
    envio: EnvioPedidoInput
    cuponId: Int
  }

  input EnvioPedidoInput {
    codigoPostal: Int!
    provinciaId: Int!
    ciudad: String!
    calle: String!
    numero: Int!
    piso: Int
  }

  # input VentasPorAnioInput {
  #   startYear: Int!
  #   endYear: Int!
  # }

`;

