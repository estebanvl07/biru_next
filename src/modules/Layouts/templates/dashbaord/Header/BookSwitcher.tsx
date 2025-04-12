import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useDisclosure } from "@heroui/modal";
import { Avatar } from "@heroui/react";
import { Briefcase, Home, Inbox, Search, Split, Users } from "lucide-react";
import Link from "next/link";
import React from "react";
import { DASHBOARD_MAIN_PATH } from "~/lib/constants/config";
import { useOutsideClick, useSearch } from "~/lib/hooks";
import { useBooks } from "~/modules/Books/hooks/useBooks.hook";
import { motion } from "framer-motion";

const BookSwitcher = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const divEle = useOutsideClick<HTMLDivElement>(onClose);
  const { books } = useBooks();

  const { newList, query, onSearch, refreshList } = useSearch({
    data: books,
    keys: ["name", "description"],
  });

  return (
    <div ref={divEle} className="relative z-50">
      <Button
        className="border border-divider/10 shadow-none"
        isIconOnly
        onPress={() => (isOpen ? onClose() : onOpen())}
      >
        <Inbox width={20} />
      </Button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 top-12 flex w-72 flex-col overflow-hidden rounded-xl border border-divider bg-white shadow-xl dark:bg-default-100"
        >
          <div className="flex items-center gap-3 border-b border-divider p-4 ">
            <Search />
            <input
              placeholder="Buscar"
              value={query}
              onChange={(e) => onSearch(e.target.value)}
              className="border-none text-base outline-none dark:bg-transparent"
            />
          </div>
          <div className="px-2 py-2">
            <h5 className="mb-2 px-2 font-medium">Libros</h5>
            {newList.map(({ name, id, type }) => (
              <Link
                className=" flex cursor-pointer items-center gap-3 rounded-lg px-4 py-2 hover:bg-default-100 dark:hover:bg-default-200"
                href={{
                  pathname: `${DASHBOARD_MAIN_PATH}/[bookId]`,
                  query: { bookId: id },
                }}
                onClick={() => {
                  onSearch("");
                  onClose();
                }}
                key={id}
              >
                {type === 1 ? (
                  <Home size={20} />
                ) : type === 3 ? (
                  <Users size={20} />
                ) : (
                  type === 2 && <Briefcase size={20} />
                )}
                {name}
              </Link>
            ))}

            {newList.length === 0 && query !== "" && (
              <div className="col-span-3 flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl border-divider px-4 py-6 text-center">
                <h3 className="leading-5">No se encontraron resultados</h3>
                <p>
                  No encontramos libros que coincidan con la búsqueda "{" "}
                  <span>{query?.slice(0, 10)}</span> "
                </p>
              </div>
            )}
          </div>
          <footer className="p-2">
            <Button as={Link} href={`/overview`} fullWidth color="primary">
              Ver Todos
            </Button>
          </footer>
        </motion.div>
      )}
    </div>
  );
};

export default BookSwitcher;
