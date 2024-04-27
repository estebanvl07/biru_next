import { nextui } from "@nextui-org/theme";
import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: [
    "./src/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/components/(button|input|listbox|pagination|table|ripple|spinner|divider|checkbox|spacer).js"
  ],
  darkMode: "class",
  theme: {
    extend: {
      height: {
        "calc-64": "calc(100vh - 64px)",
        "calc-48": "calc(100vh - 48px)",
      },
      minHeight: {
        "calc-64": "calc(100vh - 64px)",
        "calc-48": "calc(100vh - 48px)",
      },
      colors: {
        primary: "#3E1FE9",
        "primary-light": "#A7B5F6",
        "primary-lighter": "#E1E7FD",
      },
      fontFamily: {
        encode: ["Encode Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [nextui({})],
} satisfies Config;
