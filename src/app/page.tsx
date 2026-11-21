import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ResearchDomains from "@/components/ResearchDomains";
import VoiceFocus from "@/components/VoiceFocus";
import HowWeTackle from "@/components/HowWeTackle";
import Pilot from "@/components/Pilot";
import Updates from "@/components/Updates";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";

export default function Home() {
  return (
    <main className="relative">
      <Preloader />
      <Navbar />
      <Hero />
      <ResearchDomains />
      <VoiceFocus />
      <HowWeTackle />
      <Pilot />
      <Updates />
      <Footer />
    </main>
  );
}