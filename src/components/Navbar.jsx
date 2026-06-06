import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const links = [
  { label: "Research", href: "#research" },
  { label: "Terminal", href: "#terminal" },
  { label: "Threats", href: "#threats" },
  { label: "Publications", href: "#publications" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-[#050a10]/90 backdrop-blur border-b border-cyan-900/30" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <span className="w-8 h-8 rounded bg-cyan/10 border border-cyan/40 flex items-center justify-center text-cyan font-mono text-sm group-hover:shadow-[0_0_12px_#00ffe7]">
            SD
          </span>
          <span className="font-orbitron text-lg tracking-widest text-cyan uppercase">
            Sondip Day
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-mono text-sm tracking-wide text-eblue/80 hover:text-cyan transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="font-mono text-sm px-5 py-2 bg-cyan/10 border border-cyan/40 text-cyan hover:bg-cyan/20 hover:shadow-[0_0_16px_#00ffe7] transition-all clip-cta"
          >
            INITIATE
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
