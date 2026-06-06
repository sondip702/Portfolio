import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

const severityColor = {
  CRITICAL: "#ff2a2a",
  WARN: "#facc15",
  INFO: "#00aaff",
};

export default function ThreatMonitor() {
  const containerRef = useRef(null);
  const [threats, setThreats] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:4000/api/threats");
    ws.onmessage = (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.event === "threat" || msg.event === "connected") {
        setThreats((prev) => [msg.data, ...prev].slice(0, 40));
      }
    };
    return () => ws.close();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 6, 8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const nodeCount = 80;
    const positions = new Float32Array(nodeCount * 3);
    const colors = new Float32Array(nodeCount * 3);
    const sizes = new Float32Array(nodeCount);
    const phases = new Float32Array(nodeCount);

    for (let i = 0; i < nodeCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      colors[i * 3] = 0;
      colors[i * 3 + 1] = 1;
      colors[i * 3 + 2] = 0.9;
      sizes[i] = 0.15 + Math.random() * 0.25;
      phases[i] = Math.random() * Math.PI * 2;
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geom.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        uniform float uTime;
        void main() {
          vColor = color;
          vec3 pos = position;
          float pulse = 1.0 + 0.3 * sin(uTime * 2.0 + position.x * 3.0);
          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * pulse * (300.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float glow = 1.0 - smoothstep(0.2, 0.5, d);
          gl_FragColor = vec4(vColor, glow * 0.9);
        }
      `,
      transparent: true,
      depthWrite: false,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geom, mat);
    scene.add(points);

    let raf;
    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      mat.uniforms.uTime.value = t;
      for (let i = 0; i < nodeCount; i++) {
        const y = Math.sin(t * 1.5 + phases[i]) * 0.4;
        positions[i * 3 + 1] = y;
      }
      geom.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section id="threats" className="py-24 max-w-7xl mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-orbitron text-3xl md:text-4xl text-cyan mb-12"
      >
        LIVE THREAT MONITOR
      </motion.h2>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 relative h-96 bg-card border border-cyan-900/30 rounded overflow-hidden">
          <div ref={containerRef} className="absolute inset-0" />
          <div className="absolute top-3 left-3 font-mono text-[10px] text-cyan/70 bg-[#050a10]/80 px-2 py-1 rounded border border-cyan-900/30">
            NODE GRAPH // REALTIME
          </div>
        </div>

        <div className="bg-card border border-cyan-900/30 rounded p-4 h-96 overflow-hidden flex flex-col">
          <div className="font-mono text-xs text-eblue/70 mb-3 tracking-wider">THREAT FEED</div>
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {threats.map((t) => (
              <div key={t.id} className="border-l-2 pl-3 py-1" style={{ borderColor: severityColor[t.severity] || "#00aaff" }}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px]" style={{ color: severityColor[t.severity] || "#00aaff" }}>
                    {t.severity}
                  </span>
                  <span className="font-mono text-[10px] text-eblue/40">{t.id}</span>
                </div>
                <div className="font-mono text-xs text-eblue/80 mt-0.5">{t.message}</div>
                <div className="font-mono text-[10px] text-eblue/40 mt-0.5">{t.source}</div>
              </div>
            ))}
            {threats.length === 0 && (
              <div className="font-mono text-xs text-eblue/40">Waiting for telemetry...</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
