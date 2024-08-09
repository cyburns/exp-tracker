"use client";

import HomePage from "@/components/HomePage";
import LoginPage from "@/components/LogInPage";
import { useQuery } from "@apollo/client";
import { GET_AUTH_USER } from "@/graphql/queries/user-queries";
import Header from "@/components/Header";

export default function Home() {
  const { loading, error, data } = useQuery(GET_AUTH_USER);

  if (loading)
    return (
      <main className="h-screen w-full flex justify-center items-center">
        <div className="w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin" />
      </main>
    );

  if (error)
    return (
      <main className="h-screen w-full flex justify-center items-center">
        <p>Error: {error.message}</p>
      </main>
    );

  return (
    <main>
      <Header />
      <div>{data.authUser ? <HomePage /> : <LoginPage />}</div>
    </main>
  );
}
