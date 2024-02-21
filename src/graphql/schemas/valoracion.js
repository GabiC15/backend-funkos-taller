import gql from "graphql-tag";

export default gql`
  type Valoracion {
    id: Int!
    texto: String
    fecha: String
    cantidadEstrellas: Int
    producto: Producto
    usuario: Usuario
  }

  extend type Query {
    valoraciones(productoId: Int): [Valoracion]
    valoracion(productoId: Int!, usuarioId: Int!): Valoracion
    promedioValoraciones(productoId: Int!): Int
  }

  extend type Mutation {
    createValoracion(input: ValoracionInput!): Valoracion
    updateValoracion(id: Int!, input: ValoracionInput!): Valoracion
    deleteValoracion(id: Int!): Boolean
  }

  input ValoracionInput {
    productoId: Int!
    texto: String!
    cantidadEstrellas: Int!
  }
`;
