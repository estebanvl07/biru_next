import React, { useCallback, useState } from "react";
import DataList from "../components/molecules/DataList/DataList";
import { useParams } from "next/navigation";
import { useDisclosure } from "@heroui/modal";
import { useTemplate } from "./hooks/useTemplate";
import { TemplatesIncludes } from "~/types/templates/templates";
import { DASHBOARD_MAIN_PATH } from "~/lib/constants/config";
import CustomDrawer from "../components/molecules/CustomDrawer";
import CreateTemplate from "./CreateTemplate";

const TemplateList = () => {
  const [templateSelected, setTemplateSelected] = useState<TemplatesIncludes>(
    {} as TemplatesIncludes,
  );

  const params = useParams();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: openCreate,
    onClose: onCloseCreate,
    onOpen: onOpenCreate,
  } = useDisclosure();
  const { templates, isLoading } = useTemplate();

  const renderContent = useCallback(
    (template: TemplatesIncludes) => {
      const { name, description } = template;

      return (
        <>
          <aside>
            <h4>{name}</h4>
            <p>{description}</p>
          </aside>
        </>
      );
    },
    [params, templates],
  );

  return (
    <>
      <CreateTemplate isOpen={openCreate} onClose={onCloseCreate} />
      <DataList
        data={templates as TemplatesIncludes[]}
        content={renderContent}
        setDataSelected={setTemplateSelected}
        dataSelected={templateSelected}
        onNew={onOpenCreate}
        newButtonText="Crear Plantilla"
      />
    </>
  );
};

export default TemplateList;
