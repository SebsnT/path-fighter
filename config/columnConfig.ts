import type { Creature } from "../types/creature";

export interface Column<Creature> {
  key: keyof Creature & string;
  label: string;
  sortable?: boolean;
  isArray?: boolean;
  containsMarkdown?: boolean;
}
export interface EncounterColumn {
  count: number;
  name: string;
  action: unknown;
}

export const encounterColumns: Column<EncounterColumn>[] = [
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
    key: "alignment",
    label: "Alignment",
    sortable: true,
  },
  {
    key: "size",
    label: "Size",
    sortable: true,
    isArray: true,
  },
  /*{
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
  },
];
