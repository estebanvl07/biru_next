import { useEffect, useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedPrefs = window.localStorage.getItem("theme");
      if (typeof storedPrefs === "string") {
        return storedPrefs as "light" | "dark";
      }

      const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
      if (userMedia.matches) {
        return "dark";
      }
    }

    return "light";
  });
  const [isDarkMode, setIsDarkMode] = useState<boolean>();

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "dark") {
      setIsDarkMode(true);
      root.classList.add("dark");
    } else {
      setIsDarkMode(false);
      root.classList.remove("dark");
    }

    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme", theme);
    }
  }, [theme]);

  useEffect(() => {
    const handleThemeChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleThemeChange);

    return () => mediaQuery.removeEventListener("change", handleThemeChange);
  }, []);

  return {
    isDark: isDarkMode,
    setTheme,
    mode: theme,
  };
};
