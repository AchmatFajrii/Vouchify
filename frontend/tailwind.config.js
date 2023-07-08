/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#270F59",
        secondary: "#6732D9",
        third: "#854AD9",
        fourth: "#ED85FF",
        fifth: "#4BE2F2",
        footer: "#150930",
      },
      lineHeight: {
        90: "90px",
      },
      fontSize: {
        xs: "0.5rem",
        sm: "0.6rem",
        base: "0.8rem",
        lg: "1rem",
        xl: "1.300rem",
        "2xl": "1.800rem",
        "3xl": "2.500rem",
        "4xl": "3rem",
      },
      margin: {
        m110: "-110px",
        m90: "-90px",
      },
    },
  },
  plugins: [],
};
