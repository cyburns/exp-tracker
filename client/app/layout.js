"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ApolloProvider client={client}>
        <body className={inter.className}>{children}</body>
      </ApolloProvider>
    </html>
  );
}
