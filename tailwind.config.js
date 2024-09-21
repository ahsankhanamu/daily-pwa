module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // Enables class-based dark mode
  theme: {
    extend: {
      colors: {
        darkBg: "#1e293b", // Dark background color
        darkCard: "#334155", // Darker card background
        lightText: "#f1f5f9", // Light text for dark mode
        accent: "#0ea5e9", // Accent color for buttons and highlights
        hoverAccent: "#0284c7", // Hover color for accent
      },
    },
  },
  plugins: [],
};
