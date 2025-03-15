import type { Column } from "~/models/column";
import type { Filters } from "~/models/filters";

import { columns } from "~/config/columnConfig";

export const useFilters = () => {
  const filters = useState<Filters>("filters", () => generateFilters(columns));

  // Function to generate filters from columns configuration
  function generateFilters(columns: Column[]): Filters {
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

  // Function to clear all filters
  const clearFilters = () => {
    Object.keys(filters.value).forEach((key) => {
      filters.value[key].value = null;
    });
  };

  return {
    filters,
    clearFilters,
  };
};
