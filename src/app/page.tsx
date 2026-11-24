import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ResearchDomains from "@/components/ResearchDomains";
import VoiceFocus from "@/components/VoiceFocus";
import HowWeTackle from "@/components/HowWeTackle";
import Pilot from "@/components/Pilot";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import BlogsAndUpdates from "@/components/BlogsAndUpdates";

export default function Home() {
  return (
    <main className="relative">
      <Preloader />
      <Hero />
      <ResearchDomains />
      <VoiceFocus />
      <HowWeTackle />
      <Pilot />
      <BlogsAndUpdates />
      <Footer />
    </main>
  );
}