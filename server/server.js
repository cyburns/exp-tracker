import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./typeDefs/index.js";
import { resolvers } from "./resolvers/index.js";
import { expressMiddleware } from "@apollo/server/express4";
import { connectToDB } from "./db/connect.js";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import http from "http";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const SERVER_PORT = 3001;
const app = express();
const httpServer = http.createServer(app);

// Connect to the database before starting the server
await connectToDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

// Set up middleware after the server has started
app.use(
  "/",
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  })
);

// Start the HTTP server after the Apollo Server is set up
await new Promise((resolve) =>
  httpServer.listen({ port: SERVER_PORT }, resolve)
);

console.log(`🚀 Server ready at http://localhost:${SERVER_PORT}/`);
