import React, { useMemo } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useCurrentBook } from "~/modules/Books/hooks/useBooks.hook";
import { DASHBOARD_MAIN_PATH } from "~/lib/constants/config";
import { OptionsProps } from "./options";
import { Accordion, AccordionItem } from "@heroui/accordion";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@heroui/react";

const OptionItem = React.memo(
  ({
    item,
    showIcon,
    isExpanded,
  }: {
    item: OptionsProps;
    isExpanded: boolean;
    showIcon?: boolean;
  }) => {
    const pathname = usePathname();
    const params = useParams<{ bookId: string }>();
    const { book: currentBook } = useCurrentBook();

    const href = useMemo(() => {
      if (item.cleanPath) {
        return item.href;
      }

      if (currentBook) {
        return `${DASHBOARD_MAIN_PATH}/${currentBook.id}${item.href}`;
      }

      return `${DASHBOARD_MAIN_PATH}/[bookId]${item.href}`;
    }, [item, currentBook, params]);

    if (item.options && item.options?.length > 0) {
      return (
        <>
          {isExpanded ? (
            <Accordion
              className="px-0"
              itemClasses={{
                trigger: "py-1",
                heading:
                  "hover:pl-3 px-2 transition-all hover:bg-default-200/30 rounded-lg",
                content: "border-l border-divider py-2 ml-5 mt-1 px-2 mb-2",
                indicator: "[&>svg]:w-4",
              }}
            >
              <AccordionItem
                key="menu"
                textValue={item.name}
                title={
                  <div className="flex w-full items-center gap-2 px-1 text-sm">
                    {showIcon && (
                      <Icon
                        icon={item.icon ?? ""}
                        width={isExpanded ? 18 : 20}
                      />
                    )}
                    <p className="max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap font-normal">
                      {item.name}
                    </p>
                  </div>
                }
              >
                {item.options.map((option) => (
                  <OptionItem
                    key={option.id}
                    showIcon={false}
                    item={option}
                    isExpanded={isExpanded}
                  />
                ))}
              </AccordionItem>
            </Accordion>
          ) : (
            <Dropdown
              placement="right"
              classNames={{
                trigger: "justify-center py-2",
              }}
            >
              <DropdownTrigger>
                <span className="flex items-center gap-2 px-1 text-sm">
                  {showIcon && (
                    <Icon icon={item.icon ?? ""} width={isExpanded ? 18 : 20} />
                  )}
                </span>
              </DropdownTrigger>
              <DropdownMenu>
                {item.options.map((option) => (
                  <DropdownItem
                    className="font-montserrat"
                    key={option.id}
                    as={Link}
                    href={href}
                    textValue={option.name}
                  >
                    {option.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          )}
        </>
      );
    }

    return (
      <Link
        href={href}
        className={clsx(
          "flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-normal transition-all hover:bg-default-200/30 dark:text-foreground-300",
          {
            "font-semibold text-primary dark:bg-default-300/40 dark:font-normal dark:text-white":
              pathname === href,
            "mx-auto w-fit hover:scale-105": !isExpanded,
            "w-full hover:pl-4": isExpanded,
          },
        )}
      >
        {showIcon && (
          <Icon icon={item.icon ?? ""} width={isExpanded ? 18 : 20} />
        )}
        {isExpanded && (
          <p className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
            {item.name}
          </p>
        )}
      </Link>
    );
  },
);

export default OptionItem;
