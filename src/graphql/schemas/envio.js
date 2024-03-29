import gql from "graphql-tag";

export default gql`
  type Envio {
    id: Int!
    codigoPostal: String
    provincia: Provincia
    ciudad: String
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
    direccion: String
    provincia: Provincia
    fecha: Date
    usuarioId: Int
    pedido: Pedido
  }

  extend type Query {
    envios: [Envio]
    envio(id: Int!): Envio
    controlDeEnvios: [ControlDeEnvios]
    precioEnvio(input: PrecioEnvioInput!): Float
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

  input PrecioEnvioInput {
    codigoPostalDestino: Int!
    provinciaIdDestino: Int!
  }
`;
