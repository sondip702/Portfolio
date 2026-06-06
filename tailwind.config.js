/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        mono: ["Share Tech Mono", "monospace"],
      },
      colors: {
        cyan: "#00ffe7",
        eblue: "#00aaff",
        purple: "#7f00ff",
        dark: "#050a10",
        card: "#0a1520",
      },
    },
  },
  plugins: [],
};
