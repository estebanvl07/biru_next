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
} from "@heroui/react";
import Link from "next/link";
import { BOOK_TYPE, DASHBOARD_MAIN_PATH } from "~/lib/constants/config";
import { es } from "date-fns/locale";
import { Briefcase, Home, PlusIcon, Users } from "lucide-react";

const BookCard = ({
  name,
  createdAt,
  description,
  lastAccess,
  id,
  type,
}: Book) => {
  return (
    <Link
      href={{
        pathname: `${DASHBOARD_MAIN_PATH}/[bookId]/`,
        query: {
          bookId: id,
        },
      }}
      className="h-full"
    >
      <Card className="h-full cursor-pointer border border-divider px-4 py-2 shadow-sm">
        <CardHeader>
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
            <div>
              <h4 className="font-medium">{capitalize(name)}</h4>
              <p>{BOOK_TYPE[type as keyof typeof BOOK_TYPE]}</p>
            </div>
          </aside>
        </CardHeader>
        <CardBody>
          <Chip
            size="sm"
            variant="flat"
            color="primary"
            className="!text-primary dark:!text-indigo-300"
          >
            {description}
          </Chip>
        </CardBody>
        <CardFooter className="flex flex-col items-start pt-0">
          <p>
            Último acceso:{" "}
            {format(lastAccess ?? new Date(), "PPP", { locale: es })}
          </p>
          <p>Creado: {format(createdAt, "PPP", { locale: es })}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BookCard;
