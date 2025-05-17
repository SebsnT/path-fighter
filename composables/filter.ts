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

  /**
   *  Remove filters with empty, null, or empty array values
   */
  function cleanFilters() {
    return Object.fromEntries(
      Object.entries(filters.value).filter(([_, filter]) => {
        const filterValue = filter.value;
        return (
          (filterValue &&
            (Array.isArray(filterValue) ? filterValue.length > 0 : true)) ||
          filterValue == 0
        );
      }),
    );
  }

  return {
    filters,
    clearFilters,
    cleanFilters,
  };
};
