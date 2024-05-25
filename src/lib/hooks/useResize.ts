import { useEffect, useState } from "react";

const getBreakpoint = (width: number) => {
  if (width >= 1536) return "2xl";
  if (width >= 1280) return "xl";
  if (width >= 1024) return "lg";
  if (width >= 768) return "md";
  if (width >= 640) return "sm";
  return "xs";
};

export const useResize = () => {
  const [isDesktop, setIsDesktop] = useState<boolean>();
  const [size, setSize] = useState<number>();
  const [breakpoint, setBreakpoint] = useState<string>("md");

  const isMobile = Boolean(size && size <= 768);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleWindowResize = () => {
        if (window.innerWidth > 1024) {
          setIsDesktop(true);
        } else {
          setIsDesktop(false);
        }
        setSize(window.innerWidth);
        setBreakpoint(getBreakpoint(window.innerWidth));
      };

      handleWindowResize();

      window.addEventListener("resize", handleWindowResize);

      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    }
  }, []);

  return {
    isDesktop,
    size,
    breakpoint,
    isMobile,
  };
};
