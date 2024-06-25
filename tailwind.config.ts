import { nextui } from "@nextui-org/theme";

import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
  darkMode: "selector",
  content: [
    "./src/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/components/(accordion|badge|button|calendar|input|listbox|modal|pagination|progress|radio|select|skeleton|spinner|table|tabs|user|divider|ripple|popover|scroll-shadow|checkbox|spacer|avatar).js",
  ],
  theme: {
    extend: {
      padding: {
        content: "14px",
      },
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
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            default: {
              DEFAULT: "#e2e8f0",
              50: "#f8fafc",
              100: "#f1f5f9",
              200: "#e2e8f0",
              300: "#cbd5e1",
            },
          },
        },
        dark: {
          colors: {
            content1: "#0f172a",
            default: {
              DEFAULT: "#1e293b",
              50: "#1e293b",
              100: "#1e293b",
              200: "#0f172a",
              300: "#020617",
            },
          },
        },
      },
    }),
  ],
} satisfies Config;

export default config;
