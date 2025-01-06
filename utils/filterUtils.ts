import type { InputNumberInputEvent } from "primevue/inputnumber";
import type { Column } from "~/models/column";

/**
 * generates Filters from column config
 * @param columns of column config
 * @returns filters with value and matchMode
 */
export function generateFilters(columns: Column[]) {
  const filters: {
    [key: string]: { value: string | number | null; matchMode: string };
  } = {
    global: { value: null, matchMode: "contains" },
  };
  columns.forEach((col) => {
    filters[col.key] = {
      value:
        col.type === "number"
          ? (null as number | null)
          : (null as string | null),
      matchMode: "contains",
    };
  });
  return filters;
}

/**
 * Updates Input of InputNumebr immidiatly
 *
 * @param event is a {@link InputNumberInputEvent}
 */
export function onNumberInput(event: InputNumberInputEvent) {
  //refocus the input to update it
  const target = event.originalEvent.target as HTMLElement;
  target.blur();
  target.focus();
}
