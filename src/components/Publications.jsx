import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const typeColors = {
  JOURNAL: "text-cyan border-cyan/40 bg-cyan/10",
  CONFERENCE: "text-purple border-purple/40 bg-purple/10",
  PREPRINT: "text-eblue border-eblue/40 bg-eblue/10",
};

export default function Publications() {
  const [papers, setPapers] = useState([]);
  useEffect(() => {
    fetch("/api/publications")
      .then((r) => r.json())
      .then(setPapers)
      .catch(() => setPapers([]));
  }, []);

  return (
    <section id="publications" className="py-24 max-w-7xl mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-orbitron text-3xl md:text-4xl text-cyan mb-12"
      >
        PUBLICATIONS
      </motion.h2>

      <div className="space-y-4">
        {papers.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="group flex flex-col md:flex-row md:items-center gap-3 md:gap-6 bg-card border border-cyan-900/30 rounded p-5 hover:border-cyan transition-all hover:-translate-y-0.5"
          >
            <div className="font-mono text-cyan text-sm min-w-[3.5rem]">{p.year}</div>
            <div className="flex-1">
              <div className="font-orbitron text-base text-eblue mb-1">{p.title}</div>
              <div className="font-mono text-xs text-eblue/50">{p.venue}</div>
            </div>
            <span className={`font-mono text-[10px] tracking-wider px-2 py-1 rounded border self-start md:self-auto ${typeColors[p.type] || typeColors.PREPRINT}`}>
              {p.type}
            </span>
          </motion.div>
        ))}
        {papers.length === 0 && (
          <div className="font-mono text-sm text-eblue/40">Loading publications...</div>
        )}
      </div>
    </section>
  );
}
