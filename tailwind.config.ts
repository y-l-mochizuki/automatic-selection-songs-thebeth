import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const colorsScheme = {
  colors: {
    primary: {
      DEFAULT: "#ffc81e",
      foreground: "#232323",
    },
  },
} as const;

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        dark: colorsScheme,
        light: colorsScheme,
      },
    }),
  ],
  darkMode: "class",
};
export default config;
