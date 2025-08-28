/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'orbitron': ['Orbitron', 'monospace'],
        'exo': ['Exo 2', 'sans-serif'],
      },
      colors: {
        'neon': '#00ff41',
        'neon-orange': '#ff6b00',
        'neon-pink': '#ff0080',
        'neon-yellow': '#ffff00',
        'sport-blue': '#2196f3',
        'sport-red': '#ff1744',
      },
    },
  },
  plugins: [],
};

export default config;
