import type { Filters } from "~/models/filters";

import { filterConfig } from "~/config/filters.config";
import type { Filter } from "~/models/filter";

export const useFilters = () => {
  const filters = useState<Filters>("filters", () =>
    generateFilters(filterConfig),
  );

  // Function to generate filters from columns configuration
  function generateFilters(filterArray: Filter[]): Filters {
    const filters: Filters = {
      global: { value: null, matchMode: "contains" },
    };
    filterArray.forEach((filter) => {
      filters[filter.key] = {
        value:
          filter.type === "number"
            ? (null as number | null)
            : (null as string | null),
        matchMode: filter.matchMode ?? "contains",
        containsMultipleValues: filter.containsMultipleValues ?? false,
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
