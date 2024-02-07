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
    createFavorito(input: FavoritoInput!): Favorito
    deleteFavorito(id: Int!): Boolean
  }

  input FavoritoInput {
    id: Int
    usuario_id: Int
    producto_id: Int
  }
`;
