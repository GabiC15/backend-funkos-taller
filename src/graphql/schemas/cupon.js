import gql from "graphql-tag";

export default gql`
  type Cupon {
    id: Int!
    nombre: String!
    porcentaje: Int!
    validoDesde: String!
    validoHasta: String!
    estado: Boolean!
  }

  extend type Query {
    cupones: [Cupon]
    cupon(id: Int!): Cupon
    cuponPorNombre(nombre: String!): Cupon
  }

  extend type Mutation {
    createCupon(input: CuponInput!): Cupon
    updateCupon(id: Int!, input: CuponUpdateInput!): Boolean
    deleteCupon(id: Int!): Boolean
  }

  input CuponInput {
    nombre: String!
    porcentaje: Int!
    validoDesde: String!
    validoHasta: String!
  }
  
  input CuponUpdateInput {
    nombre: String
    porcentaje: Int
    validoDesde: String
    validoHasta: String
    estado: Boolean
  }
`;
