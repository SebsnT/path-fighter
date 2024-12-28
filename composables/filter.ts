import type { Column } from "~/config/columnConfig";
import type { Creature } from "~/types/creature";

export function generateFilters(columns: Column<Creature>[]) {
  const filters: { [key: string]: { value: unknown; matchMode: string } } = {
    global: { value: null, matchMode: "contains" },
  };
  columns.forEach((col) => {
    filters[col.key] = { value: null, matchMode: "contains" };
  });
  return filters;
}
