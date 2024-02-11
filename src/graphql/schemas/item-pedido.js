import gql from "graphql-tag";

export default gql`
  type ItemPedido {
    id: Int!
    cantidad: Int
    precioProducto: Float
    pedido: Pedido
    producto: Producto
  }

  type ItemsMasPedidos {
    productoId: Int
    productoTitulo: String
    cantidad: Int
  }

  type VolumenItemsPedidos {
    productoId: Int
    productoTitulo: String
    cantidadItem: Int,
    cantidadTotal: Int
  }

  extend type Query {
    itemPedidos: [ItemPedido]
    itemPedido(id: Int!): ItemPedido
    itemsMasPedidos: [ItemsMasPedidos]
    volumenItemsPedidos: [VolumenItemsPedidos]

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
