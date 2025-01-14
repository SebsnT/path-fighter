import type { Creature } from "./creature";

type FieldType = "number" | "string" | "markdown_string" | "dropdown";

export interface Column {
  key: keyof Creature & string;
  label: string;
  sortable?: boolean;
  width?: string;
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
