import type { Creature } from "./creature";

type FieldType = "number" | "string" | "dropdown";

type SelectionType = "single" | "multiple";

type MatchMode = "contains" | "in";

export interface SelectionOption {
  label: string;
  value: string;
}

export interface MardownLink {
  label: string;
  link?: string;
}

export interface Column {
  key: keyof Creature & string;
  label: string;
  sortable?: boolean;
  width?: string;
  isArray?: boolean;
  containsMarkdown?: boolean;
  filterable?: boolean;
  type?: FieldType;
  select?: SelectionType;
  matchMode?: MatchMode;
  getUniqueValues?: boolean;
  minValue?: number;
  maxValue?: number;
  selectionOptions?: SelectionOption[];
}
