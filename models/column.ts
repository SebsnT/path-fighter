import type { Creature } from "./creature";

type FieldType = "number" | "string" | "dropdown";

type SelectionType = "single" | "multiple";

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
  getUniqueValues?: boolean;
  minValue?: number;
  maxValue?: number;
  options?: {
    label: string;
    value: string;
  }[];
}
