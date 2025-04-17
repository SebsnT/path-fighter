import type { Creature } from "./creature";

export interface Column {
  key: keyof Creature & string;
  label: string;
  sortable?: boolean;
  width?: string;
  isArray?: boolean;
  filterable?: boolean;
  markdownField?: string;
}
