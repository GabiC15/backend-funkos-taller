import gql from "graphql-tag";

export default gql`
  type ItemPedido {
    id: Int!
    cantidad: Int
    pedido: Pedido
    producto: Producto
  }

  type ItemsMasPedidos {
    productoId: Int
    productoTitulo: String
    cantidad: Int
  }

  extend type Query {
    itemPedidos: [ItemPedido]
    itemPedido(id: Int!): ItemPedido
    itemsMasPedidos: [ItemsMasPedidos]
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
