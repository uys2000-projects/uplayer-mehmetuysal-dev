/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,ts}"],
  theme: {
    extend: {
      screens: {
        /*
        tall: {
          raw: `only screen and (max-height: 960px) and (max-width: 480px)`,
        },
        */
        wide: {
          raw: `only screen and (max-height: 480px) and (max-width: 960px)`,
        },
        /*
        portrait: {
          raw: "(orientation: portrait)",
        },
        landscape: {
          raw: "(orientation: landscape)",
        },
        tallOrWideAndPortrait: {
          raw: `only screen and ((max-height: 960px) and (max-width: 480px) or (max-height: 480px) and (max-width: 960px)) and (orientation: portrait)`,
        },
        tallOrWideAndLandscape: {
          raw: `only screen and ((max-height: 960px) and (max-width: 480px) or (max-height: 480px) and (max-width: 960px)) and (orientation: landscape)`,
        },
        */
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],

  daisyui: {
    themes: true,
  },
};
