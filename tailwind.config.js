/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Sohne: ["Sohne", "sans-serif"],
      },

      colors: {
        orange: {
          1: "#FFDDCD",
          2: "#FF5403",
        },
        gray: {
          0: "#EFF1F6",
          1: "#4D5760",
          2: "#31373D",
        },
        black: {
          1: "#131316",
        },
      },
    },
  },
  plugins: [],
};
