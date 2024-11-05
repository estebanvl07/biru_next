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
    light: {
      color: {
        primary: "#0c0a09",
        "primary-light": "#44403c",
        "primary-lighter": "#a8a29e",
      },
    },
    dark: {
      color: {
        primary: "#fff",
        "primary-light": "#44403c",
        "primary-lighter": "#a8a29e",
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
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#0c0a09",
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
              DEFAULT: "#fff",
              foreground: "#000",
            },
            content1: "#080808",
            default: {
              DEFAULT: "#18181b",
              50: "#080808",
              100: "#171717",
              200: "#262626",
              300: "#404040",
            },
          },
        },
      },
    }),
    require("tailwindcss-animated"),
  ],
} satisfies Config;

export default config;
