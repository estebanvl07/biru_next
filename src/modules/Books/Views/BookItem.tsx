import React from "react";
import { format } from "date-fns";
import { capitalize } from "lodash";
import { Book } from "@prisma/client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { es } from "date-fns/locale";
import { Briefcase, Ellipsis, Home, OptionIcon, Users } from "lucide-react";
import { BOOK_TYPE, DASHBOARD_MAIN_PATH } from "~/lib/constants/config";
import Link from "next/link";
import { useParams } from "next/navigation";

const BookItem = ({
  name,
  createdAt,
  description,
  id,
  lastAccess,
  type,
}: Book) => {
  const params = useParams();

  return (
    <div className="flex flex-col gap-2">
      <p>
        Ultima Modificación -{" "}
        {capitalize(format(createdAt, "PPPP", { locale: es }))}
      </p>
      <div className="flex items-center justify-between rounded-lg border border-divider bg-white p-4 shadow-sm dark:bg-default-50">
        <aside>
          <aside className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-default-100 dark:bg-default-200">
              {type === 1 ? (
                <Home size={20} />
              ) : type === 3 ? (
                <Users size={20} />
              ) : (
                type === 2 && <Briefcase size={20} />
              )}
            </div>
            <div className="flex flex-col">
              <Link
                href={{
                  pathname: `/${DASHBOARD_MAIN_PATH}/[bookId]`,
                  query: { bookId: id },
                }}
                className="mb-1 pl-1 font-medium hover:underline"
              >
                {capitalize(name)}
              </Link>
              <Chip
                size="sm"
                variant="flat"
                color="primary"
                className="!text-primary dark:!text-indigo-300"
              >
                {BOOK_TYPE[type as keyof typeof BOOK_TYPE]}
              </Chip>
            </div>
          </aside>
        </aside>
        <div>
          <p>{description}</p>
        </div>
        <aside className="flex items-center gap-2 pt-0">
          <Dropdown>
            <DropdownTrigger>
              <button>
                <Ellipsis />
              </button>
            </DropdownTrigger>
            <DropdownMenu className="font-montserrat" color="primary">
              <DropdownItem
                as={Link}
                href={`/${DASHBOARD_MAIN_PATH}/${id}`}
                key={"create"}
              >
                Abrir Libro
              </DropdownItem>
              <DropdownItem
                as={Link}
                href={`/${DASHBOARD_MAIN_PATH}/${id}/settings`}
                key={"analytics"}
              >
                Configuración
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </aside>
      </div>
    </div>
  );
};

export default BookItem;
