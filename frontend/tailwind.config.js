/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        spaceblack: "#030712",
        darkbg: "#030712",
        darkcard: "#0B1120",
        darksurface: "#111827",
        lightbg: "#F8FAFC",
        lightcard: "#FFFFFF",
        lightsurface: "#F1F5F9",
        violetGlow: "#8B5CF6",
        cyanGlow: "#06B6D4",
        cosmicBlue: "#3B82F6",
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        display: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'glow-indigo': '0 0 25px -5px rgba(99, 102, 241, 0.4)',
        'glow-purple': '0 0 30px -5px rgba(139, 92, 246, 0.45)',
        'glow-cyan': '0 0 30px -5px rgba(6, 182, 212, 0.45)',
        'glow-cosmic': '0 0 40px -10px rgba(139, 92, 246, 0.3), 0 0 30px -5px rgba(6, 182, 212, 0.3)',
        'neon-card': '0 8px 32px 0 rgba(0, 0, 0, 0.45), inset 0 0 0 1px rgba(255, 255, 255, 0.08)',
      },
    },
  },
  plugins: [],
};
