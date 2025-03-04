import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Adjust paths as needed
  theme: {
    extend: {},
  },
  plugins: [daisyui],
};
