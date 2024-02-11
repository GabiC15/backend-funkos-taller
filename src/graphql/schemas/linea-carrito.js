import gql from "graphql-tag";

export default gql`
  type LineaCarrito {
    id: Int!
    cantidad: Int
    carrito: Carrito
    producto: Producto
  }

  extend type Query {
    lineasCarrito: [LineaCarrito]
    lineaCarrito(productoId: Int!): LineaCarrito
  }

  extend type Mutation {
    createLineaCarrito(input: LineaCarritoInput!): LineaCarrito
    updateLineaCarrito(id: Int!, input: LineaCarritoInput!): LineaCarrito
    deleteLineaCarrito(productoId: Int!): Boolean
    deleteLineasCarrito: Boolean
  }

  input LineaCarritoInput {
    cantidad: Int
    productoId: Int
  }
`;
