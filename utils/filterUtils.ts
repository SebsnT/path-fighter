import type { InputNumberInputEvent } from "primevue/inputnumber";
import type { Column, SelectionOption } from "~/models/column";
import type { Creature } from "~/models/creature";

interface Filters {
  [key: string]: {
    value: string | number | null;
    matchMode: string;
  };
}

/**
 * generates Filters from column config
 *
 * @param columns of column config
 * @returns filters with value and matchMode
 */
export function generateFilters(columns: Column[]): Filters {
  const filters: Filters = {
    global: { value: null, matchMode: "contains" },
  };
  columns.forEach((col) => {
    filters[col.key] = {
      value:
        col.type === "number"
          ? (null as number | null)
          : (null as string | null),
      matchMode: col.matchMode ?? "contains",
    };
  });
  return filters;
}

/**
 * Updates Input of InputNumebr immidiatly
 *
 * @param event is a {@link InputNumberInputEvent}
 */
export function onNumberInput(event: InputNumberInputEvent): void {
  //refocus the input to update it
  const target = event.originalEvent.target as HTMLElement;
  target.blur();
  target.focus();
}

export function getSelectionOptions(
  creatures: Creature[],
  keyField: string, // Single field name, but values inside are string[]
): SelectionOption[] {
  const options = selectionOptionsFromKeyAndValue(creatures, keyField);

  console.log(options);

  return options.sort((a, b) => a.label.localeCompare(b.label));
}

function selectionOptionsFromKeyAndValue(
  creatures: Creature[],
  keyField: string, // Single field name
): SelectionOption[] {
  const uniqueKeys = new Set<string>();

  creatures.forEach((creature) => {
    const values = creature[keyField as keyof Creature];

    if (Array.isArray(values)) {
      values.forEach((value) => uniqueKeys.add(value));
    }
  });

  return Array.from(uniqueKeys).map((value) => ({
    label: value,
    value: value,
  }));
}
