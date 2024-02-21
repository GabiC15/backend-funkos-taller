import env from "./config.js";
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
import paymentsRouter from "./routes/payments.js";

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
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  "/graphql",
  userMiddleware,
  authMiddleware,
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      return { req, res };
    },
  })
);

app.use(paymentsRouter);

app.listen({ port: env.PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${env.PORT}/graphql`)
);
