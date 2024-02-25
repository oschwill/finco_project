import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-linear": "linear-gradient(180deg, #44BBFE 0%, #1E78FE 100%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: { settingsBG : "rgba(var(--account-bg))", textColor: "rgba(var(--text-color))", iconColor: "rgba(var(--icon-color))",}
    },
  },
  plugins: [require("daisyui")],
};
export default config;
