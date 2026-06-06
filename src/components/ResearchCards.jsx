import { motion } from "framer-motion";

const cards = [
  { id: "RES-001", title: "Adversarial ML Defense", status: "ACTIVE", desc: "Robustness certification for neural networks under adaptive attacks." },
  { id: "RES-002", title: "Zero-Knowledge TLS", status: "NEW", desc: "Post-quantum handshake protocols with minimal round-trip overhead." },
  { id: "RES-003", title: "Memory-Safe Crypto", status: "REVIEW", desc: "Reimplementation of legacy primitives in Rust with formal verification." },
  { id: "RES-004", title: "Supply Chain Integrity", status: "ACTIVE", desc: "Attestation frameworks for CI/CD artifact provenance." },
  { id: "RES-005", title: "WASM Fuzzing Engine", status: "NEW", desc: "Coverage-guided mutation strategies for WebAssembly runtimes." },
  { id: "RES-006", title: "Side-Channel Mitigation", status: "REVIEW", desc: "Constant-time transformations with compiler-assisted proofs." },
];

const statusColors = {
  ACTIVE: "text-cyan border-cyan/40 bg-cyan/10",
  NEW: "text-purple border-purple/40 bg-purple/10",
  REVIEW: "text-eblue border-eblue/40 bg-eblue/10",
};

export default function ResearchCards() {
  return (
    <section id="research" className="py-24 max-w-7xl mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-orbitron text-3xl md:text-4xl text-cyan mb-12"
      >
        RESEARCH TRACKS
      </motion.h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group relative bg-card border border-cyan-900/30 rounded p-6 hover:border-cyan transition-all hover:-translate-y-1"
          >
            <div className="absolute left-0 top-6 bottom-6 w-1 bg-cyan/20 group-hover:bg-cyan transition-colors rounded-r" />
            <div className="flex items-center justify-between mb-4 pl-3">
              <span className="font-mono text-xs text-eblue/70">{c.id}</span>
              <span className={`font-mono text-[10px] tracking-wider px-2 py-1 rounded border ${statusColors[c.status]}`}>
                {c.status}
              </span>
            </div>
            <h3 className="font-orbitron text-lg text-eblue mb-2 pl-3">{c.title}</h3>
            <p className="font-mono text-sm text-eblue/60 leading-relaxed pl-3">{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
