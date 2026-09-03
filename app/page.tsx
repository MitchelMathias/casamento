import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import PageShell from "@/components/PageShell";

export default function Home() {
  return (
    <PageShell>
      <div id="inicio" className="min-h-screen bg-[#FAFAF7]">
        <Header />
        <Hero />
        <Footer />
      </div>
    </PageShell>
  );
}
