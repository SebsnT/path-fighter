import type { InputNumberInputEvent } from "primevue/inputnumber";
import type { Column } from "~/config/columnConfig";

let filters: globalThis.Ref<
  { [key: string]: { value: unknown; matchMode: string } },
  { [key: string]: { value: unknown; matchMode: string } }
> | null = null;

/**
 * generates Filters from column config
 * @param columns of column config
 * @returns filters with value and matchMode
 */
export function generateFilters(columns: Column[]) {
  const filters: { [key: string]: { value: unknown; matchMode: string } } = {
    global: { value: null, matchMode: "contains" },
  };
  columns.forEach((col) => {
    filters[col.key] = { value: null, matchMode: "contains" };
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

// Function to clear all filters
export function clearFilters() {
  // Reset the filters to their initial state

  for (const key in filters?.value) {
    filters.value[key].value = null;
  }
}

export function useFilters(columns = null) {
  if (!filters && columns) {
    // Initialize filters if not already set
    filters = ref(generateFilters(columns));
  }

  return filters;
}
