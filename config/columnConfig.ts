import type { Creature } from "../types/creature";

type FieldType = "number" | "string" | "dropdown";

export interface Column {
  key: keyof Creature & string;
  label: string;
  sortable?: boolean;
  isArray?: boolean;
  containsMarkdown?: boolean;
  filterable?: boolean;
  type?: FieldType;
  minValue?: number;
  maxValue?: number;
  options?: {
    label: string;
    value: string;
  }[];
}

export const encounterColumns: Column[] = [
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

export const columns: Column[] = [
  {
    key: "name",
    label: "Name",
    sortable: true,
    filterable: true,
    type: "string",
  },
  {
    key: "level",
    label: "Level",
    sortable: true,
    filterable: true,
    type: "number",
    minValue: -1,
    maxValue: 25,
  },
  {
    key: "ac",
    label: "AC",
    sortable: true,
    filterable: true,
    type: "number",
    minValue: 0,
    maxValue: 54,
  },
  {
    key: "hp",
    label: "HP",
    sortable: true,
    filterable: true,
    type: "number",
    minValue: 0,
    maxValue: 600,
  },
  {
    key: "alignment",
    label: "Alignment",
    filterable: true,
    type: "dropdown",
    options: [
      { label: "Lawful Good", value: "LG" },
      { label: "Lawful Neutral", value: "LN" },
      { label: "Lawful Evil", value: "LE" },
      { label: "Neutral Good", value: "NG" },
      { label: "True Neutral", value: "NG" },
      { label: "Neutral Evil", value: "NE" },
      { label: "Chaotic Good", value: "CG" },
      { label: "Chaotic Neutral", value: "CE" },
      { label: "Chaotic Evil", value: "CE" },
    ],
  },
  {
    key: "action",
    label: "Action",
    filterable: false,
  },
];
