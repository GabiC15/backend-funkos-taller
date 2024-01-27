import gql from "graphql-tag";

export default gql`
  type Envio {
    id: Int!
    direccion: String
    costo: Float
    entregado: Boolean
    codigoSeguimiento: String
    pedido: Pedido
  }

  type ControlDeEnvios {
    id: Int
    costo: Float
    entregado: Boolean
    fecha: Date
    usuarioId: Int
    pedido: Pedido
  }

  extend type Query {
    envios: [Envio]
    envio(id: Int!): Envio
    controlDeEnvios: [ControlDeEnvios]
  }

  extend type Mutation {
    createEnvio(input: EnvioInput!): Envio
    updateEnvio(id: Int!, input: EnvioInput!): Envio
    deleteEnvio(id: Int!): Boolean
  }

  input EnvioInput {
    direccion: String
    costo: Float
    entregado: Boolean
    codigoSeguimiento: String
    pedido_id: Int
  }
`;
