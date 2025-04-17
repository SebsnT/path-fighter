import type { FilterValue } from "./filterValue";
import type { SelectionOption } from "./selectionOptions";

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

type FieldType = "number" | "string" | "dropdown" | "range";

type SelectionType = "single" | "multiple";

export interface Filter {
  key: string;
  label: string;
  type: FieldType;
  matchMode?: MatchMode;
  select?: SelectionType;
  containsMultipleValues?: boolean;
  selectionOptions?: SelectionOption[];
  minValue?: number;
  maxValue?: number;
  getUniqueValues?: boolean;
}
