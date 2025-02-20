/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderWidth: {
        1: "1px",
        3: "3px",
        5: "5px",
      },
      screens: {
        short: { raw: "(max-height: 720px)" },
        shorter: { raw: "(max-height: 500px)" },
        ml: "842px",
        mh: "992px",
      },
    },
  },
};
