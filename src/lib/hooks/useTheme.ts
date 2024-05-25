import { useEffect, useState } from "react";

const getDarkMode = (): boolean => {
  try {
    const darkMode = localStorage.getItem("darkMode");
    return darkMode ? JSON.parse(darkMode) : false;
  } catch {
    return false;
  }
};

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>();
  const [mode, setMode] = useState("");

  const validateDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark);
    setMode(isDark ? "dark" : "light");
    localStorage.setItem("darkMode", JSON.stringify(isDark));
  };

  const onChangeMode = () => {
    validateDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    validateDarkMode(getDarkMode());
  }, []);

  return {
    isDark: isDarkMode,
    onChangeMode,
    mode,
  };
};
