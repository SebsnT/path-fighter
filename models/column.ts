import type { Creature } from "./creature";
import type { SelectionOption } from "./selectionOptions";

type FieldType = "number" | "string" | "dropdown";

type SelectionType = "single" | "multiple";

type MatchMode =
  | "startsWith"
  | "contains"
  | "notContains"
  | "endsWith"
  | "equals"
  | "notEquals"
  | "in"
  | "lt"
  | "lte"
  | "gt"
  | "gte"
  | "between";

export interface Column {
  key: keyof Creature & string;
  label: string;
  sortable?: boolean;
  width?: string;
  isArray?: boolean;
  filterable?: boolean;
  type?: FieldType;
  select?: SelectionType;
  matchMode?: MatchMode;
  getUniqueValues?: boolean;
  minValue?: number;
  maxValue?: number;
  markdownField?: string;
  selectionOptions?: SelectionOption[];
  containsMultipleValues?: boolean;
}
