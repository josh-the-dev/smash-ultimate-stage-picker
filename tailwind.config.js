/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "birthday-brawl": {
          orange: {
            100: "#d17435",
            200: "#8d3703",
          },
        },
      },
      width: {
        "9/10": "90%",
      },
      fontFamily: {
        eras: ["eras"],
      },
    },
  },
  plugins: [],
};
