import gql from "graphql-tag";

export default gql`
  type Carrito {
    id: Int!
    usuario: Usuario
    lineas_carrito: [LineaCarrito]
  }

  extend type Query {
    carrito(id: Int!): Carrito
    totalCarrito(cuponId: Int): TotalCarrito
  }

  extend type Mutation {
    createCarrito(usuario_id: Int!): Carrito
    updateCarrito(id: Int!, usuario_id: Int!): Carrito
    cleanCarrito(id: Int!): Boolean
  }

  type TotalCarrito {
    descuento: Float
    subtotal: Float!
    total: Float!
  }
`;
