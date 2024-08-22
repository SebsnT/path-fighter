import type { Creature } from "../types/creature";

export interface Column {
  key: keyof Creature;
  label: string;
  sortable?: boolean;
  isArray?: boolean;
}

export const columns: Column[] = [
  {
    key: "name",
    label: "Name",
    sortable: true,
  },
  {
    key: "level",
    label: "Level",
    sortable: true,
  },
  {
    key: "ac",
    label: "AC",
    sortable: true,
  },
  {
    key: "hp",
    label: "HP",
    sortable: true,
  },
  {
    key: "creature_family",
    label: "Family",
    sortable: true,
  },
  {
    key: "size",
    label: "Size",
    sortable: true,
    isArray: true,
  },
  {
    key: "trait",
    label: "Traits",
    isArray: true,
  },
  {
    key: "trait",
    label: "Traits",
    isArray: true,
  },
];
