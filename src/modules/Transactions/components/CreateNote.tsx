import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import clsx from "clsx";
import React, { useState } from "react";
import { TransactionIncludes } from "~/types/transactions";
import { api } from "~/utils/api";
import { useTransactions } from "../hook";
import { TransactionNotes } from "@prisma/client";

interface CreateNoteProps {
  transaction: TransactionIncludes;
  onPushNote: (note: TransactionNotes) => void;
}

const CreateNote = ({ transaction, onPushNote }: CreateNoteProps) => {
  const [note, setNote] = useState("");

  const { mutate: createNoteMutation } = api.transaction.createNote.useMutation(
    {
      onSuccess: (note) => {
        onPushNote(note);
      },
    },
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createNoteMutation({
      id: transaction.id,
      note,
    });
    setNote("");
  };

  return (
    <div className="grid grid-cols-3">
      <form
        onSubmit={handleSubmit}
        className="col-span-3 px-0 py-4 md:col-span-1 md:col-start-3"
      >
        <div className="flex flex-col gap-2">
          <Textarea
            classNames={{
              inputWrapper: "border-divider bg-white  dark:bg-default-100",
            }}
            labelPlacement="outside"
            isClearable
            onClear={() => setNote("")}
            label="Escribe una Nota"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></Textarea>
          <Button
            className={clsx("transition-all duration-300", {
              hidden: note === "",
            })}
            color="primary"
            type="submit"
          >
            Guardar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateNote;
