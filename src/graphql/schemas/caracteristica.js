import gql from "graphql-tag";

export default gql`
  type Caracteristica {
    id: Int!
    nombre: String
  }

  extend type Query {
    caracteristicas: [Caracteristica]
    caracteristica(id: Int!): Caracteristica
  }
`;
