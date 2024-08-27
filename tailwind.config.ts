import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
      colors: {
        "custom-yellow": "#F3C937",
        "custom-gray": "#C1B7A3",
        "custom-lighter-gray": "#EEE9DF",
        "custom-black": "#29241F",
      },
    },
  },
  plugins: [],
};
export default config;
