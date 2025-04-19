import React, { useState } from "react";
import { useTemplate } from "../Templates/hooks/useTemplate";
import { Button, Chip, Select, SelectItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { TemplatesIncludes } from "~/types/templates/templates";
import { Templates } from "@prisma/client";
import clsx from "clsx";

interface TemplateSectionProps {
  onChange: (template: Templates | null) => void;
}

const TemplatesSection = ({ onChange }: TemplateSectionProps) => {
  const [templateSelected, setTemplateSelected] = useState<Templates | null>(
    null,
  );
  const { templates } = useTemplate();

  if (templates.length === 0) return null;

  return (
    <div className="flex w-full justify-start">
      <Select
        items={templates}
        size="sm"
        placeholder="Plantillas"
        aria-label="Plantillas"
        className="w-48"
        radius="full"
        title={templateSelected?.name || "Plantillas"}
        classNames={{
          trigger: "pl-1 border dark:border-white/10",
        }}
        // className="w-48"
        onChange={(template) => {
          const value = template.target.value;
          const templateFound = templates.find(
            (template) => template.id === Number(value),
          );
          if (templateFound) {
            onChange(templateFound);
            setTemplateSelected(templateFound);
          } else {
            onChange(null);
            setTemplateSelected(null);
          }
        }}
        startContent={
          <Chip
            className={clsx(
              "flex h-6 w-6 items-center justify-center rounded-full bg-default-300",
              {
                "bg-primary": templateSelected?.icon,
              },
            )}
          >
            <Icon
              icon={
                templateSelected
                  ? templateSelected.icon ||
                    "fluent:calendar-template-20-regular"
                  : "fluent:calendar-template-20-regular"
              }
              width={14}
            />
          </Chip>
        }
      >
        {(template) => (
          <SelectItem
            className="font-montserrat"
            key={template.id}
            startContent={<Icon icon={template.icon || ""} width={16} />}
          >
            {template.name}
          </SelectItem>
        )}
      </Select>
    </div>
  );
};

export default TemplatesSection;
