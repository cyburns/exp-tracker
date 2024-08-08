import Header from "@/components/Header";

export default function Home() {
  const authUser = true;

  return <main>{authUser && <Header />}</main>;
}
