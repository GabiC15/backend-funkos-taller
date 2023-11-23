import gql from "graphql-tag";

export default gql`
  type Rol {
    id: Int!
    nombre: String
  }

  extend type Query {
    roles: [Rol]
    rol(id: Int!): Rol
  }
`;
