import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./typeDefs/index.js";
import { resolvers } from "./resolvers/index.js";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import http from "http";
import express from "express";
import dotenv from "dotenv";

const SERVER_PORT = 3001;

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

// instance before passing the instance to `expressMiddleware`
app.use(
  "/",
  cors(),
  express.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  })
);

// Modified server startup
await new Promise((resolve) =>
  httpServer.listen({ port: SERVER_PORT }, resolve)
);

console.log(`🚀 Server ready at http://localhost:${SERVER_PORT}/`);
