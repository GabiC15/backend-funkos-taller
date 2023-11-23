import gql from "graphql-tag";

export default gql`
  type Categoria {
    id: Int!
    nombre: String
    padre: Categoria
  }

  extend type Query {
    categorias: [Categoria]
    categoria(id: Int!): Categoria
  }
`;