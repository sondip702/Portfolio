import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-cyan-900/30 bg-[#050a10]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-orbitron text-2xl text-cyan mb-4">CIPHERLAB</h2>
          <p className="font-mono text-sm text-eblue/60 max-w-lg mx-auto mb-8">
            Encrypted communications only. No plaintext after dark.
          </p>
          <div className="font-mono text-xs text-eblue/30 tracking-[0.3em]">
            7B 22 73 74 61 74 75 73 22 3A 20 22 73 65 63 75 72 65 22 7D
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
