import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./typeDefs/index.js";
import { resolvers } from "./resolvers/index.js";
import { expressMiddleware } from "@apollo/server/express4";
import { connectToDB } from "./db/connect.js";
import cors from "cors";
import http from "http";
import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import ConnectMongo from "connect-mongodb-session";
import { buildContext } from "graphql-passport";
import { passportConfig } from "./passport/passport.js";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

dotenv.config();

await passportConfig();

const SERVER_PORT = 4000;
const app = express();
const httpServer = http.createServer(app);

// Connect to the database before starting the server
await connectToDB();
const MongoDBStore = ConnectMongo(session);

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    httpOnly: true,
  },
  store,
});

app.use(
  session({
    secret: "your-secret-key", // replace with a strong secret
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

await server.start();

app.use(
  "/graphql",
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
  express.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async ({ req, res }) => buildContext({ req, res }),
  })
);

app.use("/*", (_, res) => res.status(404).send("Page not found"));

// Start the HTTP server after the Apollo Server is set up
await new Promise((resolve) =>
  httpServer.listen({ port: SERVER_PORT }, resolve)
);

console.log(`🚀 Server ready at http://localhost:${SERVER_PORT}/`);
