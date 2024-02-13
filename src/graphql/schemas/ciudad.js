import gql from "graphql-tag";

export default gql`
  type Ciudad {
    id: Float!
    nombre: String!
    provincia: Provincia
  }

  extend type Query {
    ciudades(busqueda: String): [Ciudad]
    ciudad(id: Int!): Ciudad
  }
`;
