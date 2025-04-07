"use client";

import type React from "react";

import { Briefcase, Home, PlusIcon, Users } from "lucide-react";
import { useState } from "react";
import { Button } from "@heroui/button";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Input,
  RadioGroup,
} from "@heroui/react";
import { CustomRadio } from "~/pages/overview/settings/account";
import { BOOKS } from "~/types/book/book.types";
import { useForm } from "react-hook-form";
import { createBook, type CreateBook } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { toast } from "sonner";

export function CreateBookButton() {
  const [open, setOpen] = useState(false);
  const [workspaceType, setWorkspaceType] = useState("personal");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<CreateBook>({
    resolver: zodResolver(createBook),
  });

  const booksRefresh = api.useUtils().books;

  const { mutateAsync: CreateBookMutation } =
    api.books.createBook.useMutation();
  {
  }

  const onSubmit = (data: CreateBook) => {
    toast("Esta seguro de realizar esta acción", {
      action: {
        label: "Crear",
        onClick: () => {
          toast.promise(
            CreateBookMutation(data, {
              onSuccess(data) {
                booksRefresh.invalidate();
                reset();
              },
            }),
            {
              loading: "Creando Libro de Finanzas...",
              success: "El Libro se ha creado con éxito.",
              error: "Hubo un error, intente de nuevo",
            },
          );
        },
      },
    });
  };

  return (
    <>
      <Button
        className="w-full"
        onPress={() => setOpen(true)}
        color="primary"
        startContent={<PlusIcon className="h-4 w-4" />}
      >
        Crear Nuevo Libro
      </Button>
      <Drawer isOpen={open} onOpenChange={setOpen}>
        <DrawerContent className="font-montserrat">
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col">
                <h2>Crear Nuevo Libro</h2>
                <p className="text-sm font-normal">
                  Crea un nuevo espacio para gestionar tus finanzas de forma
                  separada.
                </p>
              </DrawerHeader>
              <DrawerBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid gap-4 pb-4">
                    <div className="grid gap-2">
                      <Input
                        id="name"
                        label="Nombre"
                        classNames={{}}
                        placeholder="Ej: Personal, Mi Negocio, Familia"
                        isRequired
                        {...register("name")}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Input
                        id="description"
                        label="Descripción (opcional)"
                        placeholder="Describe el propósito de este workspace"
                        {...register("description")}
                      />
                    </div>
                    <div className="grid gap-2">
                      <RadioGroup
                        defaultValue="personal"
                        value={workspaceType}
                        onValueChange={(value) => {
                          setValue("type", Number(value));
                          setWorkspaceType(value);
                        }}
                        orientation="horizontal"
                        className=""
                        classNames={{
                          wrapper:
                            "grid grid-cols-3 [&>label]:col-span-1 [&>label]:border-divider",
                        }}
                      >
                        <CustomRadio
                          className="border"
                          value={String(BOOKS.PERSONAL)}
                        >
                          <div className="hover:bg-muted flex flex-col items-center space-y-4 rounded-md p-4">
                            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-500">
                              <Home />
                            </div>
                            <p className="font-medium">Personal</p>
                          </div>
                        </CustomRadio>
                        <CustomRadio value={String(BOOKS.BUSINESS)}>
                          <div className="hover:bg-muted flex flex-col items-center space-y-2 rounded-md p-4">
                            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-500">
                              <Briefcase />
                            </div>
                            <p>Negocio</p>
                          </div>
                        </CustomRadio>
                        <CustomRadio value={String(BOOKS.FAMILY)}>
                          <div className="hover:bg-muted flex flex-col items-center space-y-2 rounded-md p-4">
                            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-500">
                              <Users />
                            </div>
                            <p>Familia</p>
                          </div>
                        </CustomRadio>
                      </RadioGroup>
                    </div>
                    <Button type="submit" color="primary">
                      Crear Libro
                    </Button>
                  </div>
                </form>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
