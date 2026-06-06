import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import ResearchCards from "./components/ResearchCards.jsx";
import TerminalSection from "./components/TerminalSection.jsx";
import ThreatMonitor from "./components/ThreatMonitor.jsx";
import Publications from "./components/Publications.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-dark selection:bg-cyan/20 selection:text-cyan">
      <Navbar />
      <Hero />
      <ResearchCards />
      <TerminalSection />
      <ThreatMonitor />
      <Publications />
      <Footer />
    </div>
  );
}
