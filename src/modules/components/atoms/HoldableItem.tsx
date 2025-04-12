import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

interface HoldableListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
  onHold: () => void;
  holdTime?: number; // opcional: tiempo en ms para considerar como "presionado"
}

export const HoldableItem: React.FC<HoldableListItemProps> = ({
  children,
  onHold,
  holdTime = 500,
  className,
  ...props
}) => {
  const [hold, setHold] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startHold = () => {
    timerRef.current = setTimeout(() => {
      setHold(true);
    }, holdTime);
  };

  const cancelHold = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
      setHold(false);
    }
  };

  useEffect(() => {
    if (hold) {
      onHold();
    }
  }, [hold]);

  return (
    <li
      onMouseDown={startHold}
      onMouseUp={cancelHold}
      onMouseLeave={cancelHold}
      onTouchStart={startHold}
      onTouchEnd={cancelHold}
      className={clsx(
        "cursor-pointer select-none rounded-xl hover:bg-gray-100 dark:hover:bg-default-200",
        className,
      )}
      {...props}
    >
      {children}
    </li>
  );
};
