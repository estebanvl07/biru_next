"use client";
import { useState, useEffect } from "react";
import { Button } from "~/modules/components";
import { Icon } from "@iconify/react";
import clsx from "clsx";

const getDarkMode = (): boolean => {
  try {
    const darkMode = localStorage.getItem("darkMode");
    return darkMode ? JSON.parse(darkMode) : false;
  } catch {
    return false;
  }
};

const DarkMode = ({ className }: { className?: string }) => {
  const [darkMode, setDarkMode] = useState<boolean>(getDarkMode());

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    darkMode
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark");
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <button className={clsx("!m-0 !p-0", className)} onClick={handleDarkMode}>
      {darkMode ? (
        <Icon
          icon="akar-icons:sun-fill"
          height="1.5rem"
          className="text-primary-lighter"
        />
      ) : (
        <Icon
          icon="akar-icons:moon-fill"
          height="1.5rem"
          className="text-primary"
        />
      )}
    </button>
  );
};

export default DarkMode;
