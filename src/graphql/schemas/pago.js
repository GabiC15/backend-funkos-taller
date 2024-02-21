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

  type PagosPorMes {
    month: String
    brutto: Float
    netto: Float
  }

  type PagosPorAnio {
    year: String
    total: Float
  }

  extend type Query {
    pago(id: Int!): Pago
    pagos: [Pago]
    totalPagosPorMes: [PagosPorMes]
    totalPagosPorAnio: [PagosPorAnio]
  }
`;
