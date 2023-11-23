import gql from "graphql-tag";

export default gql`
  type Ciudad {
    id: Int!
    nombre: String!
    provincia: Provincia
  }

  extend type Query {
    ciudades: [Ciudad]
    ciudad(id: Int!): Ciudad
  }
`;
