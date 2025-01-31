import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import { useOutsideClick } from "~/lib/hooks";
import { useWebSocket } from "~/lib/hooks/useWebSocket";
import { motion } from "framer-motion";
import { Badge } from "@nextui-org/badge";
import { Avatar, Chip } from "@nextui-org/react";
import { useNotification } from "~/lib/hooks/useNotification";

const NotificationMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { notifications, isLoading } = useNotification();
  const { isConnected } = useWebSocket();
  const element = useOutsideClick<HTMLDivElement>(() => onHideMenu());

  const onHideMenu = () => {
    setShowMenu(false);
  };

  return (
    <div ref={element} className="relative">
      <Badge
        content={notifications?.length || 0}
        classNames={{
          badge: notifications?.length === 0 && "hidden",
        }}
        color="primary"
      >
        <Button isIconOnly radius="full" onClick={() => setShowMenu(!showMenu)}>
          {" "}
          <Icon icon="flowbite:bell-outline" width={24} />{" "}
        </Button>
      </Badge>
      {showMenu && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="absolute left-0 top-12 max-h-[32rem] w-[24rem] overflow-y-auto rounded-xl border bg-default-100/80 px-3 py-4 shadow-2xl backdrop-blur-xl scrollbar-hide dark:border-white/10"
        >
          <header className="mb-2 flex items-center justify-between px-4">
            <h2 className="whitespace-nowrap text-lg">Tus Notificaciones</h2>
            {/* <Button variant='ghost'>Marcar como leídas</Button> */}
          </header>
          {isConnected ? <p>Conectado </p> : <p>Descontectado</p>}
          <nav className="mb-2 flex items-center gap-2 px-4">
            <Chip color="primary">Todas</Chip>
            <Chip className="bg-default-200">No Leídas</Chip>
          </nav>
          <ul className="flex flex-col gap-y-1">
            <li className="flex items-center justify-between gap-4 rounded-lg px-4 py-2 hover:bg-default-300">
              <aside>
                <Avatar color="primary" name="Eladia" size="md" />
              </aside>
              <div>
                <h4 className="text-base font-medium">Transaccion Exitosa</h4>
                <p className="text-xs">
                  Has realizado una transaccion por $ 20.000 a la cuenta de
                  Eladia Barraza
                </p>
              </div>
              <aside className="flex h-full flex-col items-end justify-between gap-4">
                <div>
                  <span className="block h-3 w-3 rounded-full bg-primary"></span>
                </div>
                <span className="whitespace-nowrap text-xs font-medium">
                  Hace 10 mns
                </span>
              </aside>
            </li>
            <li className="flex items-center justify-between gap-4 rounded-lg px-4 py-2 hover:bg-default-300">
              <aside>
                <Avatar color="primary" name="Biru" size="md" />
              </aside>
              <div>
                <h4 className="text-base font-medium">Movimiento Pendiente</h4>
                <p className="text-xs">
                  Tienes un movimiento pendiente por $ 250.000 en tu meta de
                  ahorro
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <Button size="sm" color="primary">
                    Realizar
                  </Button>
                  <Button size="sm" variant="bordered" color="primary">
                    Ver
                  </Button>
                </div>
              </div>
              <aside className="flex h-full flex-col items-end justify-between gap-4">
                <div>
                  <span className="block h-3 w-3 rounded-full bg-primary"></span>
                </div>
                <span className="whitespace-nowrap text-xs font-medium">
                  Hace 10 mns
                </span>
              </aside>
            </li>
            <li className="flex items-center justify-between gap-4 rounded-lg px-4 py-2 hover:bg-default-300">
              <aside>
                <Avatar color="primary" name="Eladia" size="md" />
              </aside>
              <div>
                <h4 className="text-base font-medium">Transaccion Exitosa</h4>
                <p className="text-xs">
                  Has realizado una transaccion por $ 20.000 a la cuenta de
                  Eladia Barraza
                </p>
              </div>
              <aside className="flex h-full flex-col items-end justify-between gap-4">
                <div>
                  <span className="block h-3 w-3 rounded-full bg-primary"></span>
                </div>
                <span className="whitespace-nowrap text-xs font-medium">
                  Hace 10 mns
                </span>
              </aside>
            </li>
            <li className="flex items-center justify-between gap-4 rounded-lg px-4 py-2 hover:bg-default-300">
              <aside>
                <Avatar color="primary" name="Eladia" size="md" />
              </aside>
              <div>
                <h4 className="text-base font-medium">Transaccion Exitosa</h4>
                <p className="text-xs">
                  Has realizado una transaccion por $ 20.000 a la cuenta de
                  Eladia Barraza
                </p>
              </div>
              <aside className="flex h-full flex-col items-end justify-between gap-4">
                <div>
                  <span className="hidden h-3 w-3 rounded-full bg-primary"></span>
                </div>
                <span className="whitespace-nowrap text-xs">Hace 10 mns</span>
              </aside>
            </li>
            <li className="flex items-center justify-between gap-4 rounded-lg px-4 py-2 hover:bg-default-300">
              <aside>
                <Avatar color="primary" name="Eladia" size="md" />
              </aside>
              <div>
                <h4 className="text-base font-medium">Transaccion Exitosa</h4>
                <p className="text-xs">
                  Has realizado una transaccion por $ 20.000 a la cuenta de
                  Eladia Barraza
                </p>
              </div>
              <aside className="flex h-full flex-col items-end justify-between gap-4">
                <div>
                  <span className="block h-3 w-3 rounded-full bg-primary"></span>
                </div>
                <span className="whitespace-nowrap text-xs font-medium">
                  Hace 10 mns
                </span>
              </aside>
            </li>
            <li className="flex items-center justify-between gap-4 rounded-lg px-4 py-2 hover:bg-default-300">
              <aside>
                <Avatar color="primary" name="Eladia" size="md" />
              </aside>
              <div>
                <h4 className="text-base font-medium">Transaccion Exitosa</h4>
                <p className="text-xs">
                  Has realizado una transaccion por $ 20.000 a la cuenta de
                  Eladia Barraza
                </p>
              </div>
              <aside className="flex h-full flex-col items-end justify-between gap-4">
                <div>
                  <span className="block h-3 w-3 rounded-full bg-primary"></span>
                </div>
                <span className="whitespace-nowrap text-xs font-medium">
                  Hace 10 mns
                </span>
              </aside>
            </li>
            <li className="flex items-center justify-between gap-4 rounded-lg px-4 py-2 hover:bg-default-300">
              <aside>
                <Avatar color="primary" name="Eladia" size="md" />
              </aside>
              <div>
                <h4 className="text-base font-medium">Transaccion Exitosa</h4>
                <p className="text-xs">
                  Has realizado una transaccion por $ 20.000 a la cuenta de
                  Eladia Barraza
                </p>
              </div>
              <aside className="flex h-full flex-col items-end justify-between gap-4">
                <div>
                  <span className="block h-3 w-3 rounded-full bg-primary"></span>
                </div>
                <span className="whitespace-nowrap text-xs font-medium">
                  Hace 10 mns
                </span>
              </aside>
            </li>
            <li className="flex items-center justify-between gap-4 rounded-lg px-4 py-2 hover:bg-default-300">
              <aside>
                <Avatar color="primary" name="Eladia" size="md" />
              </aside>
              <div>
                <h4 className="text-base font-medium">Transaccion Exitosa</h4>
                <p className="text-xs">
                  Has realizado una transaccion por $ 20.000 a la cuenta de
                  Eladia Barraza
                </p>
              </div>
              <aside className="flex h-full flex-col items-end justify-between gap-4">
                <div>
                  <span className="block h-3 w-3 rounded-full bg-primary"></span>
                </div>
                <span className="whitespace-nowrap text-xs font-medium">
                  Hace 10 mns
                </span>
              </aside>
            </li>
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default NotificationMenu;
