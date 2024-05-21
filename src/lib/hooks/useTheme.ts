import { useEffect, useState } from "react";

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mode, setMode] = useState("");

  const validateDarkMode = (isDark: boolean) => {
    if (isDark) {
      setIsDarkMode(true);
      setMode("dark");
    } else {
      setIsDarkMode(false);
      setMode("light");
    }
  };

  useEffect(() => {
    const isDark = document.body.classList.contains("dark");
    validateDarkMode(isDark);
  }, []);

  return {
    isDark: isDarkMode,
    mode,
  };
};
