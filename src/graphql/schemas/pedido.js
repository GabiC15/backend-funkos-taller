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

  extend type Query {
    pedidos: [Pedido]
    pedido(id: Int!): Pedido
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
    envio_id: Int
  }
`;
