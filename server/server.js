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
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

dotenv.config();

const SERVER_PORT = 3001;
const app = express();
const httpServer = http.createServer(app);

// Connect to the database before starting the server
await connectToDB();
const MongoDBStore = ConnectMongo(session);

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

store.on("error", (error) => console.error(error));

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

app.use(passport.initialize());
app.use(passport.session());

await server.start();

// Set up middleware after the server has started
app.use(
  "/",
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => ({ token: req.headers.token, req, res }),
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
  })
);

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware",
    status: 500,
    message: { err: "An error occurred" },
  };

  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj);
});

app.use("/*", (req, res) => res.status(404).send("Page not found"));

// Start the HTTP server after the Apollo Server is set up
await new Promise((resolve) =>
  httpServer.listen({ port: SERVER_PORT }, resolve)
);

console.log(`🚀 Server ready at http://localhost:${SERVER_PORT}/`);
