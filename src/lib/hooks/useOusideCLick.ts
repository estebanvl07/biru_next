import { useEffect, useRef } from "react";

export const useOutsideClick = <T>(onClickOutside: () => void) => {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const node = elementRef.current as HTMLElement;
      if (node && !node.contains(event.target as Node)) {
        onClickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClickOutside]);

  return elementRef;
};
