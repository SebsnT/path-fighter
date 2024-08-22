import type { Creature } from "../types/creature";

export interface Column {
  key: keyof Creature;
  label: string;
  sortable?: boolean;
  isArray?: boolean;
  containsMarkdown?: boolean;
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
    key: "creature_family_markdown",
    label: "Family",
    sortable: true,
    containsMarkdown: true,
  },
  {
    key: "size",
    label: "Size",
    sortable: true,
    isArray: true,
  },
  {
    key: "trait_markdown",
    label: "Traits",
    isArray: true,
    containsMarkdown: true,
  },

  {
    key: "immunity_markdown",
    label: "Immunities",
    isArray: true,
    containsMarkdown: true,
  },
];
