import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const skills = [
  { name: "Reverse Engineering", level: 92 },
  { name: "Cryptanalysis", level: 85 },
  { name: "Malware Analysis", level: 88 },
  { name: "Network Exploitation", level: 90 },
  { name: "Formal Verification", level: 78 },
  { name: "Fuzzing & Coverage", level: 95 },
];

const lines = [
  { text: "[OK]   Kernel module integrity verified", color: "text-cyan" },
  { text: "[WARN] Anomalous syscall sequence detected", color: "text-yellow-400" },
  { text: "[ERR]  Heap corruption in sandbox-07", color: "text-red-400" },
  { text: "[OK]   Patch delta applied successfully", color: "text-cyan" },
  { text: "[INFO] Scanning 2,847 signatures...", color: "text-eblue" },
  { text: "[OK]   Signature database updated", color: "text-cyan" },
  { text: "[WARN] Deprecated cipher suite in use", color: "text-yellow-400" },
  { text: "[ERR]  Authentication bypass attempt logged", color: "text-red-400" },
  { text: "[OK]   Honeypot telemetry normalized", color: "text-cyan" },
];

export default function TerminalSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setVisibleLines((v) => (v < lines.length ? v + 1 : v));
    }, 350);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section id="terminal" className="py-24 max-w-7xl mx-auto px-6" ref={ref}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-orbitron text-3xl md:text-4xl text-cyan mb-12"
      >
        SYSTEM DIAGNOSTICS
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {skills.map((s, i) => (
            <div key={s.name}>
              <div className="flex justify-between mb-2 font-mono text-sm">
                <span className="text-eblue">{s.name}</span>
                <span className="text-cyan">{s.level}%</span>
              </div>
              <div className="h-2 bg-cyan-900/30 rounded overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${s.level}%` } : { width: 0 }}
                  transition={{ duration: 1.2, delay: i * 0.12, ease: "easeOut" }}
                  className="h-full bg-cyan"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card border border-cyan-900/30 rounded p-5 font-mono text-sm min-h-[320px]">
          <div className="flex items-center gap-2 mb-4 border-b border-cyan-900/30 pb-3">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <span className="w-3 h-3 rounded-full bg-cyan/80" />
            <span className="ml-2 text-eblue/60 text-xs">cipherlab@node-01:~</span>
          </div>
          <div className="space-y-2">
            {lines.slice(0, visibleLines).map((l, idx) => (
              <div key={idx} className={l.color}>
                {l.text}
              </div>
            ))}
            <div className="text-cyan mt-2">
              <span className="text-eblue">$</span>{" "}
              <span className="cursor-blink inline-block w-2 h-4 bg-cyan align-middle" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
