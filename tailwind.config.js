/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-blue": "#004AAD",
        "main-yellow": "#FFDE59",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
