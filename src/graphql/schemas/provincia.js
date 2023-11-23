import gql from "graphql-tag";

export default gql`
  type Provincia {
    id: Int!
    nombre: String!
    pais: Pais!
  }

  extend type Query {
    provincias: [Provincia]
    provincia(id: Int!): Provincia
  }
`;