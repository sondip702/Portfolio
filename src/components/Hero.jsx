import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import HeroScene from "./HeroScene.jsx";

function useCountUp(target, duration = 2000) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return val;
}

export default function Hero() {
  const vulns = useCountUp(10);
  const papers = useCountUp(2);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <HeroScene />
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-mono text-cyan text-sm tracking-[0.2em] mb-4">// CYBERSECURITY RESEARCH DIVISION</p>
            <h1 className="font-orbitron text-4xl md:text-6xl font-bold leading-tight mb-6">
              <span className="text-cyan">Sondip </span>
              <span className="text-eblue">Day</span>
            </h1>
            <p className="font-mono text-eblue/80 text-base md:text-lg max-w-xl mb-8 leading-relaxed">
              Offensive security research, vulnerability discovery, and threat intelligence at the edge of what is possible.
            </p>
            <div className="flex flex-wrap gap-6">
              <Stat label="VULNERABILITIES" value={vulns} />
              <Stat label="PAPERS" value={papers} />
            </div>
          </motion.div>
        </div>
        <div className="hidden md:block" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050a10] to-transparent z-10" />
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-card border border-cyan-900/30 px-5 py-4 rounded hover:border-cyan transition-all hover:-translate-y-1">
      <div className="font-orbitron text-2xl md:text-3xl text-cyan">{value}</div>
      <div className="font-mono text-[10px] tracking-widest text-eblue/70 mt-1">{label}</div>
    </div>
  );
}
