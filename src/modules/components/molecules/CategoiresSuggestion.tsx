import React, { FormEvent, useState } from "react";
import Modal from "../atoms/Modal.component";
import clsx from "clsx";
import { SystemCategories } from "~/lib/resource/system-catetories";
import { useOnActive } from "~/lib/hooks";

import { Button, Chip } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { api } from "~/utils/api";
import { CreateCategory } from "~/modules/category/schema";

interface CategoriesSuggestion extends CreateCategory {
  id: number;
}

const CategoiresSuggestion = () => {
  const [saved, setSaved] = useState(false);
  const { onDisabled } = useOnActive(true);
  const [categories, setCategories] = useState<CategoriesSuggestion[]>([]);

  const CategoryMutation = api.category.createDefaults.useMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const categoriesFormatter = categories.map((category) => {
      const { id, ...rest } = category;
      return rest;
    });

    CategoryMutation.mutateAsync(categoriesFormatter, {
      onSuccess() {
        setSaved(true);
        onDisabled();
      },
      onError(error) {
        console.log(error);
      },
    });
  };

  return (
    <>
      {!saved && (
        <Modal
          isOpen={true}
          onClose={onDisabled}
          size="xl"
          title="Seleccionar categorías"
        >
          <form className="mb-4 font-montserrat" onSubmit={handleSubmit}>
            <p className="">
              Selecciona algunas categorías para comenzar a crear tus
              transacciones
            </p>
            <section className="my-6 flex flex-wrap items-center gap-x-4 gap-y-2">
              {SystemCategories.map((props) => (
                <SuggestionItem
                  {...props}
                  key={props.id}
                  onSelected={(isSelected: boolean) => {
                    if (isSelected) {
                      setCategories((prev) =>
                        prev ? [...prev, props] : [props],
                      );
                    } else {
                      const newCategories = categories?.filter(
                        (cat) => cat.id !== props.id,
                      );

                      setCategories(newCategories);
                    }
                  }}
                />
              ))}
            </section>

            <footer className="">
              <Button color="primary" type="submit">
                Crear Categorias
              </Button>
            </footer>
          </form>
        </Modal>
      )}
    </>
  );
};

const SuggestionItem = ({ icon, name, onSelected }: any) => {
  const [currentSelected, setCurrentSelected] = useState(false);

  return (
    <Chip
      color="default"
      variant="bordered"
      className={clsx("cursor-pointer", {
        "bg-indigo-600/45 text-white transition-all": currentSelected,
      })}
      size="lg"
      onClick={() => {
        onSelected(!currentSelected);
        setCurrentSelected(!currentSelected);
      }}
    >
      <div className="flex items-center gap-2">
        {name}
        <Icon icon={icon} />
      </div>
    </Chip>
  );
};

export default CategoiresSuggestion;
