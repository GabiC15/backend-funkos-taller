import gql from "graphql-tag";

export default gql`
  type Valoracion {
    id: Int!
    texto: String
    fecha: Date
    cantidadEstrellas: Int
    producto: Producto
    usuario: Usuario
  }

  extend type Query {
    valoraciones(productoId: Int): [Valoracion]
    valoracion(id: Int!): Valoracion
  }

  extend type Mutation {
    createValoracion(input: ValoracionInput!): Valoracion
    updateValoracion(id: Int!, input: ValoracionInput!): Valoracion
    deleteValoracion(id: Int!): Boolean
  }

  input ValoracionInput {
    texto: String
    fecha: String
    cantidadEstrellas: Int
    producto_id: Int
    usuario_id: Int
  }
`;
