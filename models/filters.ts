import type { SelectionOption } from "./column";

export type FilterValue = string | string[] | number | null;

export interface Filters {
  [key: string]: {
    value: FilterValue;
    matchMode: string;
    containsMultipleValues?: boolean;
    selectionOptions?: SelectionOption[];
  };
}
