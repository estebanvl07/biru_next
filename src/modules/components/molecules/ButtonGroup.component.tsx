import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";

type ButtonOptions = {
  id?: number;
  label: string;
  icon?: string;
  title?: string;
  iconClass?: string;
  onClick: () => void;
  colorSelected?: string;
};

type ButtonGroupProps = {
  buttonClass?: string;
  defaultSelected?: number;
  options: ButtonOptions[];
  containerClassName?: string;
};

const ButtonGroup = ({
  options,
  buttonClass,
  defaultSelected,
  containerClassName,
}: ButtonGroupProps) => {
  const [buttonSelected, setButtonSelected] = useState<number | undefined>();

  useEffect(() => {
    setButtonSelected(defaultSelected);
  }, [defaultSelected]);

  return (
    <div
      className={clsx(
        "flex overflow-hidden rounded-xl border border-divider shadow-sm dark:border-white/10",
        containerClassName,
      )}
      role="group"
    >
      {options.map((option, index) => (
        <button
          key={option.id}
          type="button"
          className={clsx(
            "flex w-fit flex-1 items-center justify-center gap-2 whitespace-nowrap bg-white px-6 py-2.5 text-sm font-medium dark:border-white/10 dark:bg-default-100 dark:text-white dark:hover:bg-default-200",
            buttonClass,
            {
              "border border-primary !bg-primary !text-primary-foreground dark:border-white dark:!bg-white":
                !option.colorSelected && buttonSelected === option.id,
              "border-r": index !== options.length - 1,
              [option.colorSelected as string]:
                option.colorSelected && buttonSelected === option.id,
            },
          )}
          onClick={() => {
            setButtonSelected(option.id);
            option.onClick();
          }}
          title={option.title}
        >
          {option.icon && (
            <Icon
              icon={option.icon ?? ""}
              width={18}
              className={option.iconClass}
            />
          )}
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
