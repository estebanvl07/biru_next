import React from "react";
import { format } from "date-fns";
import { capitalize } from "lodash";
import { Book } from "@prisma/client";

import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import Link from "next/link";

const BookCard = ({ name, createdAt, description, id }: Book) => {
  return (
    <Card className="border border-divider shadow-sm">
      <CardHeader className="border-b">
        <aside className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-default-100"></div>
          <div>
            <h4 className="text-base font-semibold">{capitalize(name)}</h4>
            <p className="text-sm">{format(createdAt, "dd/MM/yyyy")}</p>
          </div>
        </aside>
      </CardHeader>
      <CardBody>
        <p>{description}</p>
      </CardBody>
      <CardFooter className="flex items-center gap-2 pt-0">
        <Button as={Link} href={`/app/${id}`} size="sm" color="primary">
          Abrir Workspace
        </Button>
        <Button size="sm">Editar Workspace</Button>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
