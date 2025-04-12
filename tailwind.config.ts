import { heroui } from "@heroui/theme";

import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
  darkMode: "selector",
  content: [
    "./src/**/*.tsx",
    "./node_modules/@heroui/theme/dist/components/(accordion|badge|button|calendar|checkbox|input|listbox|modal|pagination|progress|radio|select|skeleton|spinner|toggle|table|tabs|user|divider|ripple|form|popover|scroll-shadow|spacer|avatar|drawer).js",
  ],
  theme: {
    light: {
      colors: {
        primary: "#3E1FE9",
        "primary-light": "#A7B5F6",
        "primary-lighter": "#E1E7FD",
      },
      // color: {
      //   primary: "#0c0a09",
      //   "primary-light": "#44403c",
      //   "primary-lighter": "#a8a29e",
      // },
    },
    dark: {
      color: {
        primary: "#fff",
        "primary-light": "#A7B5F6",
        "primary-lighter": "#E1E7FD",
      },
    },
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
      animation: {
        meteor: "meteor 5s linear infinite",
        ripple: "ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite",
      },
      keyframes: {
        ripple: {
          "0%, 100%": {
            transform: "translate(-50%, -50%) scale(1)",
          },
          "50%": {
            transform: "translate(-50%, -50%) scale(0.9)",
          },
        },
        meteor: {
          "0%": {
            transform: "rotate(var(--angle)) translateX(0)",
            opacity: "1",
          },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(var(--angle)) translateX(-500px)",
            opacity: "0",
          },
        },
      },
      // colors: {

      //   primary: "#0c0a09",
      //   "primary-light": "#44403c",
      //   "primary-lighter": "#a8a29e",
      // },
      // colors: {
      //   primary: "#3E1FE9",
      //   "primary-light": "#A7B5F6",
      //   "primary-lighter": "#E1E7FD",
      // },
      fontFamily: {
        encode: ["Encode Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#3E1FE9",
            },
            default: {
              DEFAULT: "#fafaf9",
              50: "#f5f5f4",
              100: "#f5f5f4",
              200: "#e5e5e5",
              300: "#d4d4d4",
            },
          },
        },
        dark: {
          colors: {
            foreground: "#fff",
            primary: {
              DEFAULT: "#4f46e5",
              foreground: "#fff",
            },
            content1: "#0f172a",
            content2: "#1e293b",
            default: {
              DEFAULT: "#0f172a",
              50: "#0f172a",
              100: "#0f172a",
              200: "#1e293b",
              300: "#334155",
            },
          },
        },
      },
    }),
    require("tailwindcss-animated"),
  ],
} satisfies Config;

export default config;
