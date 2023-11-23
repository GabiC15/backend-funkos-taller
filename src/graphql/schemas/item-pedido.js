import gql from "graphql-tag";

export default gql`
  type ItemPedido {
    id: Int!
    cantidad: Int
    pedido: Pedido
    producto: Producto
  }

  extend type Query {
    itemPedidos: [ItemPedido]
    itemPedido(id: Int!): ItemPedido
  }

  extend type Mutation {
    createItemPedido(input: ItemPedidoInput!): ItemPedido
    updateItemPedido(id: Int!, input: ItemPedidoInput!): ItemPedido
    deleteItemPedido(id: Int!): Boolean
  }

  input ItemPedidoInput {
    cantidad: Int
    pedido_id: Int
    producto_id: Int
  }
`;
