"use client";

import HomePage from "@/components/HomePage";
import LoginPage from "@/components/LogInPage";
import { useQuery } from "@apollo/client";
import { GET_AUTH_USER } from "@/graphql/queries/user-queries";

export default function Home() {
  const { loading, error, data } = useQuery(GET_AUTH_USER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main>
      <div>{data.authUser ? <HomePage /> : <LoginPage />}</div>
    </main>
  );
}
