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
      gridTemplateColumns: {
        "128-auto": "repeat(auto-fit, minmax(128px, 1fr))",
        "300-auto": "repeat(auto-fit, minmax(300px, 1fr))",
      },
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
              DEFAULT: "#f3f4f6",
              50: "#fafafa",
              100: "#fff",
              200: "#e5e5e5",
              300: "#d4d4d4",
            },
          },
        },
        dark: {
          colors: {
            content1: "#0f172a",
            default: {
              DEFAULT: "#18181b",
              50: "#020617",
              100: "#0f172a",
              200: "#1e293b",
              300: "#334155",
            },
          },
        },
      },
    }),
  ],
} satisfies Config;

export default config;
