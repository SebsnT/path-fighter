import type { FilterValue } from "./filterValue";
import type { SelectionOption } from "./selectionOptions";

export interface Filters {
  [key: string]: {
    value: FilterValue;
    matchMode: string;
    containsMultipleValues?: boolean;
    selectionOptions?: SelectionOption[];
  };
}
