import Header from "@/components/Header";
import HomePage from "@/components/HomePage";
import LoginPage from "@/components/LogInPage";
import SignUpPage from "@/components/SignUpPage";

export default function Home() {
  const authUser = true;

  return (
    <main>
      <body>{authUser ? <HomePage /> : <LoginPage />}</body>
    </main>
  );
}
