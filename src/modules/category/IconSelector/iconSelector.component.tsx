import React from "react";
import { Icon } from "@iconify/react";
import { Button, Input } from "~/modules/components";
import IconItem from "./iconItem.component";
import { useGetIcons } from "./useGetIcons";

interface IconSearchResult {
  selected: (icon: string) => void;
  onHideModal: () => void;
}

const IconSelector: React.FC<IconSearchResult> = ({
  selected,
  onHideModal,
}) => {
  const { query, results, iconSelected, setIconSelected, setQuery } =
    useGetIcons();

  const onSelected = (icon: string) => {
    setIconSelected(icon);
  };

  return (
    <div className="w-full overflow-auto rounded-lg bg-white px-6 py-4 dark:border dark:border-white/10 dark:bg-slate-900 dark:backdrop-blur-lg">
      <h2 className="mb-0 text-2xl font-semibold">Escoge el icono adecuado</h2>
      <p className="mb-4 text-sm">
        Por favor, utilize el idioma ingles en su busqueda
      </p>

      <Input
        containerClassName="mb-4"
        mainClassName="!h-auto"
        label="Icono:"
        placeholder="Work, Food"
        type="text"
        iconPath="solar:ghost-smile-linear"
        onChange={(e) => setQuery(e.target.value)}
      />

      {iconSelected && (
        <div className="mb-4 flex w-full flex-col items-center justify-center">
          <Icon icon={iconSelected} width={64} />
          <p>{iconSelected}</p>
        </div>
      )}
      <section className="max-h-64 overflow-auto">
        <ul className="grid grid-cols-6 place-items-center gap-2 overflow-hidden md:grid-cols-8">
          {results.map((result: any, index) => {
            return (
              <IconItem
                key={`${index}-${result.path}`}
                path={result}
                setIcon={onSelected}
              />
            );
          })}
        </ul>
      </section>
      {results.length === 0 && (
        <div className="flex w-full flex-col items-center justify-center gap-2 py-4">
          <Icon
            icon="octicon:alert-16"
            width={32}
            className="mr-2 text-gray-400"
          />
          <span>
            {query.trim() !== "" ? (
              <p>No se encontrarón iconos con el término "{query}"</p>
            ) : (
              <>
                <p>Introduzca algún párametro de busqueda</p>
              </>
            )}
          </span>
        </div>
      )}
      {results.length > 0 && (
        <footer className="mt-4 flex justify-center gap-2">
          <Button
            onClick={() => {
              selected(iconSelected);
              onHideModal();
            }}
          >
            Seleccionar
          </Button>
          <Button variantStyle="outline" onClick={onHideModal}>
            Cancelar
          </Button>
        </footer>
      )}
    </div>
  );
};

export default IconSelector;
