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
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      return { req, res };
    },
  })
);

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000/graphql`)
);
