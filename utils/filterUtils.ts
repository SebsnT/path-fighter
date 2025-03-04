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
  keyField: string,
  valueField?: string,
  isMarkdown: boolean = false,
): SelectionOption[] {
  const options = isMarkdown
    ? selectionOptionsFromMarkdown(creatures, keyField)
    : selectionOptionsFromKeyAndValue(creatures, keyField, valueField);

  return options.sort((a, b) => a.label.localeCompare(b.label));
}

function selectionOptionsFromKeyAndValue(
  creatures: Creature[],
  keyField: string,
  valueField?: string,
): SelectionOption[] {
  //TODO use value field
  console.log(valueField);

  const uniqueKeys = [
    ...new Set(
      creatures?.map((creature) => {
        return creature[keyField as keyof Creature];
      }),
    ),
  ];
  return uniqueKeys.map((value) => ({
    label: value?.toString() || "Unknown",
    value: value?.toString() || "Unknown",
  }));
}

function selectionOptionsFromMarkdown(
  creatures: Creature[],
  keyField: string,
): SelectionOption[] {
  const uniqueMap = new Map<string, SelectionOption>();

  creatures?.forEach((creature) => {
    const option = parseOneMarkdownAsSelectionOption(
      String(creature[keyField as keyof Creature]),
    );

    if (!uniqueMap.has(option.value)) {
      uniqueMap.set(option.value, option);
    }
  });

  return Array.from(uniqueMap.values());
}
