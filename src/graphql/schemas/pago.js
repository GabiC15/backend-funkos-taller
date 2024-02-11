import gql from "graphql-tag";

export default gql`
  type Pago {
    id: Int!
    mpId: Float
    fechaAprobacion: String
    status: String
    metodo: String
    monto: Float
    montoPercibido: Float
    tarifaMp: Float
  }

  extend type Query {
    pago(id: Int!): Pago
  }
`;
