import type { InputNumberInputEvent } from "primevue/inputnumber";
import type { Column, SelectionOption } from "~/models/column";
import type { Creature } from "~/models/creature";

/**
 * generates Filters from column config
 * @param columns of column config
 * @returns filters with value and matchMode
 */
export function generateFilters(columns: Column[]) {
  const filters: {
    [key: string]: {
      value: string | number | null;
      matchMode: string;
    };
  } = {
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
export function onNumberInput(event: InputNumberInputEvent) {
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
) {
  //TODO use value field

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

function selectionOptionsFromMarkdown(creatures: Creature[], keyField: string) {
  const uniqueMap = new Map<string, SelectionOption>();

  creatures?.forEach((creature) => {
    const option = parseOneMarkdownAsSelectionOption(
      String(creature[keyField as keyof Creature]),
    );

    if (!uniqueMap.has(option.value)) {
      uniqueMap.set(option.value, option); // Store only unique values
    }
  });

  return Array.from(uniqueMap.values());
}
