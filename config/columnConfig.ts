import type { Creature } from "../types/creature";

export interface Column<Creature> {
  key: keyof Creature & string;
  label: string;
  sortable?: boolean;
  isArray?: boolean;
  containsMarkdown?: boolean;
  filterable?: boolean;
}

export const encounterColumns: Column<Creature>[] = [
  {
    key: "count",
    label: "Number",
  },
  {
    key: "name",
    label: "Name",
    sortable: true,
  },
  {
    key: "action",
    label: "Action",
  },
];

export const columns: Column<Creature>[] = [
  {
    key: "name",
    label: "Name",
    sortable: true,
    filterable: true,
  },
  {
    key: "level",
    label: "Level",
    sortable: true,
    filterable: true,
  },
  {
    key: "ac",
    label: "AC",
    sortable: true,
    filterable: true,
  },
  {
    key: "hp",
    label: "HP",
    sortable: true,
    filterable: true,
  },
  {
    key: "alignment",
    label: "Alignment",
    filterable: true,
  },
  /*{{
    key: "size",
    label: "Size",
    sortable: true,
    isArray: true,
  },

    key: "creature_family_markdown",
    label: "Family",
    sortable: true,
    containsMarkdown: true,
  },
  {
    key: "trait_markdown",
    label: "Traits",
    isArray: true,
    containsMarkdown: true,
  }, */
  {
    key: "action",
    label: "Action",
    filterable: false,
  },
];
