import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroScene() {
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const particleCount = 300;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 12;
    }
    const particlesGeom = new THREE.BufferGeometry();
    particlesGeom.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
      color: 0x00aaff,
      size: 0.03,
      transparent: true,
      opacity: 0.7,
    });
    const particles = new THREE.Points(particlesGeom, particlesMat);
    scene.add(particles);

    const icoGeom = new THREE.IcosahedronGeometry(1.6, 1);
    const edges = new THREE.EdgesGeometry(icoGeom);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x00ffe7, transparent: true, opacity: 0.85 });
    const wireframe = new THREE.LineSegments(edges, lineMat);
    scene.add(wireframe);

    const satCount = 40;
    const satPos = new Float32Array(satCount * 3);
    for (let i = 0; i < satCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.2 + Math.random() * 0.8;
      satPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      satPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      satPos[i * 3 + 2] = r * Math.cos(phi);
    }
    const satGeom = new THREE.BufferGeometry();
    satGeom.setAttribute("position", new THREE.BufferAttribute(satPos, 3));
    const satMat = new THREE.PointsMaterial({ color: 0x7f00ff, size: 0.05, transparent: true, opacity: 0.9 });
    const satellites = new THREE.Points(satGeom, satMat);
    scene.add(satellites);

    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      wireframe.rotation.y += 0.003;
      wireframe.rotation.x += 0.0015;
      satellites.rotation.y -= 0.002;
      particles.rotation.y += 0.0005;
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

  return <div ref={containerRef} className="absolute inset-0 z-0" />;
}
