import gql from "graphql-tag";

export default gql`
  type Pedido {
    id: Int!
    fecha: Date
    total: Float
    pagado: Boolean
    usuario: Usuario
    envio: Envio
  }

  type YearlySales {
  year: String
  total: Int
}

  type MonthlySales {
    month: String
    brutto: Int
    commission: Int
  }

  extend type Query {
    pedidos: [Pedido]
    pedido(id: Int!): Pedido
    totalPedidosPagos: Int
    totalVentasPorAnio(input: VentasPorAnioInput!): [YearlySales]
    totalVentasPorMes(year: Int): [MonthlySales]
    totalPedidos: Int
  }

  extend type Mutation {
    createPedido(input: PedidoInput!): Pedido
    updatePedido(id: Int!, input: PedidoInput!): Pedido
    deletePedido(id: Int!): Boolean
  }

  input PedidoInput {
    fecha: String
    total: Float
    pagado: Boolean
    usuario_id: Int
  }

  input VentasPorAnioInput {
    startYear: Int!
    endYear: Int!
  }

`;

