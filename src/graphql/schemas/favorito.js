import gql from "graphql-tag";

export default gql`
  type Favorito {
    id: Int!
    usuario: Usuario
    producto: Producto
  }

  extend type Query {
    favoritos: [Favorito]
    favorito(productoId: Int!): Favorito
  }

  extend type Mutation {
    createFavorito(productoId: Int!): Favorito
    deleteFavorito(productoId: Int!): Boolean
  }
`;
