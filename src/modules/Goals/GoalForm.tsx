import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Accordion,
  AccordionItem,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
  User,
} from "@nextui-org/react";
import { IconSearcher } from "~/modules/Category/IconSelector";
import { ButtonGroup, InputDate } from "~/modules/components";
import { Alert } from "~/modules/components/molecules/Alert.component";

import { useOnActive } from "~/lib/hooks";
import { createGoal } from "~/modules/Goals/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAlert } from "~/lib/hooks/useAlert";
import { api } from "~/utils/api";
import { amountFormatter } from "~/utils/formatters";
import { GoalsIncludes } from "~/types/goal/goal.types";
import { useEntity } from "../Entities/hook/entities.hook";
import { accordionItemAnimate } from "../animations";
import { Toaster, toast } from "sonner";

interface GoalFormProps {
  hasEdit?: boolean;
  goalDefault?: GoalsIncludes;
}

const GoalForm = ({ hasEdit, goalDefault }: GoalFormProps) => {
  const [goalAmount, setGoalAmount] = useState("");

  const router = useRouter();
  const { entities } = useEntity();

  const { isActive, onActive, onDisabled } = useOnActive();
  const { mutateAsync: createGoalgMutation, isPending } =
    api.goals.create.useMutation();
  const { mutateAsync: updateGoalMutation } = api.goals.update.useMutation();

  const {
    setValue,
    register,
    getValues,
    formState: { errors },
    watch,
    reset,
  } = useForm<createGoal>({
    resolver: zodResolver(createGoal),
  });

  const defaultEntity =
  entities && goalDefault && goalDefault.entityId
    ? [String(goalDefault.entityId)]
    : undefined;

  const alertConfig: any = {
    type: "quest",
    cancel: true,
    confirm: true,
    confirmProps: {
      onClick: () => onSubmit(),
    },
  };

  const { isOpen, onClose, props, onOpen, setProps } = useAlert(alertConfig);

  const icon = watch("icon") || "ph:target";

  const onSubmit = () => {
    onClose();
    const payload = getValues();
    if (hasEdit) {
      toast.promise(
        updateGoalMutation({ ...payload, id: String(goalDefault!.id) }),
        {
          loading: "Editando Meta...",
          success: "La meta se ha editado con éxito.",
          error: "Hubo un error intente de nuevo",
        },
      );
      return;
    }
    toast.promise(
      createGoalgMutation(
        {
          ...payload,
          goal: Number(payload.goal),
        },
        {
          onSuccess() {
            reset();
            setInitialValues();
          },
        },
      ),
      {
        loading: "Creando Meta...",
        success: "La meta se ha creado con éxito.",
        error: "Hubo un error intente de nuevo",
      },
    );
  };

  const setInitialValues = () => {
    if (goalDefault) {
      setValue("name", goalDefault.name);
      setValue("description", goalDefault.description || "");

      const { formatted: goalFormatted, raw: rawGoal } = amountFormatter(
        String(goalDefault.goal),
      );

      setGoalAmount(goalFormatted);
      setValue("goal", rawGoal!);
      setValue("type", goalDefault.type!);

      goalDefault.goalDate &&
        setValue("goalDate", new Date(goalDefault.goalDate));
      setValue("icon", goalDefault.icon || "");
    } else {
      setValue("type", 1);
    }
  };

  useEffect(() => {
    setInitialValues();
  }, []);

  return (
    <>
      <Alert isOpen={isOpen} onClose={onClose} {...props} />
      <form
        className="flex max-w-[32rem] flex-col gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          setProps(alertConfig);
          onOpen();
        }}
      >
        <label>
          Tipo <span className="text-danger">*</span>
          <ButtonGroup
            containerClassName="w-fit"
            buttonClass="text-xs !py-1.5"
            defaultSelected={1}
            options={[
              {
                id: 1,
                label: "Ingreso",
                title: "Ingreso",
                icon: "ph:trend-up",
                onClick: () => {
                  setValue("type", 1);
                },
                colorSelected:
                  "!bg-green-500 border border-green-500 text-white",
              },
              {
                id: 2,
                icon: "ph:trend-down",
                label: "Egreso",
                title: "Egreso",
                onClick: () => {
                  setValue("type", 2);
                },
                colorSelected: "!bg-red-500 border border-red-500 text-white",
              },
            ]}
          />
        </label>
        <Input
          required
          isRequired
          label="Nombre"
          placeholder="Vacaciones, Prestamo, Compras"
          isInvalid={Boolean(errors.name)}
          errorMessage={errors.name?.message}
          {...register("name")}
        />
        <Input
          isRequired
          label="Monto de meta"
          placeholder="0.00"
          className="!appearance-none"
          value={goalAmount}
          onValueChange={(val) => {
            const { formatted, raw } = amountFormatter(val);
            setValue("goal", Number(raw));
            setGoalAmount(formatted);
          }}
          inputMode="numeric"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-small text-default-400">$</span>
            </div>
          }
          isInvalid={Boolean(errors?.goal)}
          errorMessage={errors?.goal?.message}
        />
        <Accordion defaultExpandedKeys="1" motionProps={accordionItemAnimate}>
          <AccordionItem
            key="1"
            title="Información Adicional"
            subtitle="Agrega más información acerca de tu meta"
            aria-label="Informacion opcional de meta"
            classNames={{
              content: "flex flex-col gap-2",
            }}
          >
            <Select
              items={entities ?? []}
              placeholder="Seleccionar entidad"
              label="Entidad"
              defaultSelectedKeys={defaultEntity}
              classNames={{
                label: "group-data-[filled=true]:-translate-y-5",
                trigger: "min-h-[70px]",
                listboxWrapper: "max-h-[200px]",
              }}
              renderValue={(items) => {
                return items.map(({ data: entity }) => (
                  <div
                    key={entity?.id}
                    className="py-1 font-montserrat dark:text-white"
                  >
                    <User
                      name={entity?.name}
                      description={
                        entity?.description !== "" ? entity?.description : "N/A"
                      }
                      avatarProps={{
                        src: entity?.avatar ?? undefined,
                        size: "sm",
                        name: entity?.name,
                        color: "primary",
                      }}
                    />
                  </div>
                ));
              }}
              isInvalid={Boolean(errors?.entityId)}
              errorMessage={errors?.entityId?.message ?? ""}
            >
              {(entity) => {
                return (
                  <SelectItem
                    color="primary"
                    variant="solid"
                    onClick={() => {
                      setValue("entityId", entity.id);
                    }}
                    key={entity.id}
                    className="py-1 font-montserrat dark:text-white"
                    textValue={entity.name}
                  >
                    <p>{entity.name}</p>
                    <span className="!text-xs opacity-60">
                      {entity.description !== "" ? entity.description : "N/A"}
                    </span>
                  </SelectItem>
                );
              }}
            </Select>
            <InputDate
              label="Fecha limite"
              placeholder="Seleccionar fecha de meta"
              minValueToday
              defaultValue={
                goalDefault?.goalDate ? goalDefault.goalDate : undefined
              }
              changeValue={(date) => setValue("goalDate", date)}
            />
            <Input
              readOnly
              label="Icono"
              onClick={() => onActive()}
              startContent={
                <Icon icon={icon} className="dark:text-slate-200" width={18} />
              }
              placeholder="Gastos de la universidad"
              value={icon}
              {...register("icon")}
              isInvalid={Boolean(errors?.icon)}
              errorMessage={errors.icon?.message}
            />
            <Textarea
              label="Descripción"
              placeholder="-  ¿Para que es esta meta?"
              rows={1}
              {...register("description")}
              isInvalid={Boolean(errors?.description)}
              errorMessage={errors.description?.message}
            />
          </AccordionItem>
        </Accordion>
        <div className="mt-2 flex gap-2">
          <Button color="primary" type="submit">
            {hasEdit ? "Actualizar Meta" : "Crear Meta"}
          </Button>
          <Button className="bg-default-100" onClick={() => router.back()}>
            Cancelar
          </Button>
        </div>
      </form>
      <IconSearcher
        selected={(icon) => setValue("icon", icon)}
        onClose={() => onDisabled()}
        isOpen={isActive}
      />
    </>
  );
};

export default GoalForm;
