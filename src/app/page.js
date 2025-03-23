import { CheckerWindow, Footer, Header } from "@/components";

export default async function Home() {

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <CheckerWindow />
      <Footer />
    </div>
  );
}
