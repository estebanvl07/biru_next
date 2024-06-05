import { FILTERS } from "~/types/transactions";

type optionsType = {
  value: FILTERS;
  name: string;
};

export const options: optionsType[] = [
  {
    value: 0,
    name: "Ninguno",
  },
  {
    value: 1,
    name: "1 Dia (Por defecto)",
  },
  {
    value: 2,
    name: "1 Mes",
  },
  {
    value: 3,
    name: "6 Meses",
  },
  {
    value: 4,
    name: "1 Año",
  },
  {
    value: 5,
    name: "Personalizado",
  },
];
