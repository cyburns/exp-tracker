import HomePage from "@/components/HomePage";
import LoginPage from "@/components/LogInPage";

export default function Home() {
  const authUser = true;

  return (
    <main>
      <body>{authUser ? <HomePage /> : <LoginPage />}</body>
    </main>
  );
}
