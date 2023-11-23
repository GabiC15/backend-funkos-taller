import gql from "graphql-tag";

export default gql`
  type Pais {
    id: Int!
    nombre: String!
  }

  extend type Query {
    pais(id: Int!): Pais
  }
`;