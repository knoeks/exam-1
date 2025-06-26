/** @type {import('tailwindcss').Config} */
import form from "@tailwindcss/forms";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "creamy-orange": "#f2af61",
        "dark-orange": "#b78a50",
      },
    },
  },
  plugins: [form],
};
