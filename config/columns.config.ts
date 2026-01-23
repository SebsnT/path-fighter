import type { Column } from "~/models/column";

export const encounterColumns: Column[] = [
  {
    key: "count",
    label: "Number",
  },
  {
    key: "xp",
    label: "Xp",
  },
  {
    key: "name",
    label: "Name",
    sortable: true,
  },
  {
    key: "challenge_type",
    label: "Type",
  },
  {
    key: "action",
    label: "Action",
  },
];

export const columns: Column[] = [
  {
    key: "action",
    label: "Add",
    width: "5%",
    filterable: false,
  },
  {
    key: "name",
    label: "Name",
    width: "25%",
    sortable: true,
    filterable: true,
  },
  {
    key: "level",
    label: "Level",
    width: "5%",
    sortable: true,
    filterable: true,
  },
  {
    key: "creature_family",
    markdownField: "creature_family_markdown",
    label: "Family",
    width: "200px",
    sortable: true,
    filterable: true,
  },
  {
    key: "trait_raw",
    markdownField: "trait_markdown",
    label: "Traits",
    width: "250px",
    sortable: true,
    filterable: true,
  },
  {
    key: "alignment",
    label: "Alignment",
    width: "5%",
    sortable: true,
    filterable: true,
  },
];
