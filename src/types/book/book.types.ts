import { Book, User } from "@prisma/client";

export enum BOOKS {
  "PERSONAL" = 1,
  "BUSINESS" = 2,
  "FAMILY" = 3,
}

export interface BooksWithIncludes extends Book {
  user?: User;
}
