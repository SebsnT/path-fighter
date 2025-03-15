import type { SelectionOption } from "./column";

export interface Filters {
  [key: string]: {
    value: string | number | null;
    matchMode: string;
    options?: SelectionOption[];
  };
}
