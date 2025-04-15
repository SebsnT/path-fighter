import type { InputNumberInputEvent } from "primevue/inputnumber";
import type { Creature } from "~/models/creature";
import type { SelectionOption } from "~/models/selectionOptions";

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

  return options.sort((a, b) => {
    // Ensure that both labels are strings, fallback to empty string if undefined or null
    const labelA = a.label != null ? String(a.label) : ""; // Convert to string or default to ''
    const labelB = b.label != null ? String(b.label) : ""; // Convert to string or default to ''

    return labelA.localeCompare(labelB);
  });
}

function selectionOptionsFromKeyAndValue(
  creatures: Creature[],
  key: string,
): SelectionOption[] {
  const uniqueKeys = new Map<string, string>();

  for (let i = 0; i < creatures.length; i++) {
    const values = creatures[i][key as keyof Creature];

    if (Array.isArray(values)) {
      for (let j = 0; j < values.length; j++) {
        uniqueKeys.set(values[j], values[j]);
      }
    } else {
      uniqueKeys.set(values as string, values as string);
    }
  }

  return Array.from(uniqueKeys, ([value]) => ({ label: value, value }));
}
