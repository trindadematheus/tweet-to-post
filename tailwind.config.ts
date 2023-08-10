/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/containers/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["night"],
  },
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
  },
};
