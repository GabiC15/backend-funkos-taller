import "./config.js";
import "../src/db/config/sequelize.js";
import "./firebase/init-firebase.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import typeDefs from "./graphql/schemas/index.js";
import resolvers from "./graphql/resolvers/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userMiddleware from "./middlewares/user.js";
import authMiddleware from "./middlewares/auth.js";
import { Payment } from "mercadopago";
import client from "./services/mercadopago.js";
import Pago from "./db/models/pago.js";
import Pedido from "./db/models/pedido.js";

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers,
});

await server.start();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  "/graphql",
  userMiddleware,
  // authMiddleware,
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      return { req, res };
    },
  })
);

app.post("/payments/", async (req, res) => {
  console.log(req.query);

  const pago = new Payment(client);

  const pagoData = await pago.get({ id: req.query.id });

  console.log(pagoData);
  const [pagoDb] = await Pago.findOrCreate({
    where: {
      mpId: pagoData.id,
    },
    defaults: {
      mpId: pagoData.id,
      fechaAprobacion: pagoData.date_approved,
      status: pagoData.status,
      metodo: pagoData.payment_method_id,
      monto: pagoData.transaction_details.total_paid_amount,
      montoPercibido: pagoData.transaction_details.net_received_amount,
      tarifaMp: pagoData.fee_details[0]?.amount,
    },
  });

  const pedido = await Pedido.findByPk(pagoData.external_reference);
  await pedido.update({
    pagoId: pagoDb.id,
  });

  res.sendStatus(200);
});

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000/graphql`)
);
