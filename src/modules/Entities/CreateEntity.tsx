import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useResize } from "~/lib/hooks/useResize";
import { useGoals } from "~/modules/Goals/hook/goal.hook";

import { Tab, Tabs } from "@heroui/react";
import TransactionForm from "~/modules/Transactions/TransactionForm";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Card, Empty } from "~/modules/components";
import { Transaction } from "@prisma/client";
import Dialog from "../components/molecules/Dialog.component";
import EntityForm from "./EntityForm";

interface CreateEntityProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateEntity = ({ isOpen, onClose }: CreateEntityProps) => {
  return (
    <Dialog
      title="Crear Entidad"
      subtitle="Añade tus contactos para mantener un control mas detallado de tus finanzas"
      isOpen={isOpen}
      onClose={onClose}
    >
      <EntityForm />
    </Dialog>
  );
};

export default CreateEntity;
