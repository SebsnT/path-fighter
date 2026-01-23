import type { InputNumberInputEvent } from "primevue/inputnumber";
import type { Creature } from "~/models/creature";
import type { FilterValue } from "~/models/filterValue";
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

/**
 * Gets selection options for {@link keyField} of given {@link creatures}
 *
 * @param creatures
 * @param keyField
 * @returns
 */
export function getSelectionOptions(
  creatures: Creature[],
  keyField: string, // Single field name, but values inside are string[]
): SelectionOption[] {
  const options = selectionOptionsFromKeyAndValue(creatures, keyField);

  return options
    .sort((a, b) => {
      // Ensure that both labels are strings, fallback to empty string if undefined or null
      const labelA = a.label ? String(a.label) : ""; // Convert to string or default to ''
      const labelB = b.label ? String(b.label) : ""; // Convert to string or default to ''

      return labelA.localeCompare(labelB);
    })
    .filter((filterValue) => filterValue.label ?? filterValue.value);
}

/**
 *
 * @param creatures
 * @param key
 * @returns
 */
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

/**
 * Filter for array fields that checks if the array contains the value.
 *
 * @param field
 * @param filterValue
 * @param fieldValue
 *
 * @returns true if the fieldValue is in the filterValue array, false otherwise
 */
export function inFilter(
  filterValue: FilterValue,
  fieldValue: string,
): boolean {
  // Custom filter logic for multiple values in one column
  if (Array.isArray(filterValue)) {
    return filterValue.some((filterItem: string) =>
      fieldValue.includes(filterItem.toLowerCase()),
    );
  } else {
    return false;
  }
}

/**
 * Filter for fields that contain this value
 *
 * @param filterValue
 * @param fieldValue
 */
export function containsFilter(
  filterValue: FilterValue,
  fieldValue: string,
): boolean {
  if (typeof filterValue === "string") {
    return fieldValue.includes(filterValue.toLowerCase());
  }
  return false;
}

/**
 * Filter for fields that contain exactly this value
 *
 * @param filterValue
 * @param fieldValue
 */
export function exactFilter(
  filterValue: FilterValue,
  fieldValue: string,
): boolean {
  if (typeof filterValue === "string") {
    return fieldValue.toLowerCase() === filterValue.toLowerCase();
  }

  if (Array.isArray(filterValue) && filterValue.length > 0) {
    return filterValue.some(
      (filterItem: string) =>
        filterItem.toLowerCase() === fieldValue.toLowerCase(),
    );
  }

  return false;
}

/**
 * Filter for fields that are greater than or equal to this value
 *
 * @param filterValue
 * @param fieldValue
 */
export function gteFilter(
  filterValue: FilterValue,
  fieldValue: string,
): boolean {
  if (typeof filterValue === "number") {
    return Number(fieldValue) >= filterValue;
  }
  return false;
}

/**
 * Filter for fields that are less than or equal to this value
 *
 * @param filterValue
 * @param fieldValue
 */
export function lteFilter(
  filterValue: FilterValue,
  fieldValue: string,
): boolean {
  if (typeof filterValue === "number") {
    return Number(fieldValue) <= filterValue;
  }
  return false;
}
