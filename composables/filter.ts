import { columns } from "~/config/columnConfig";

const filters = ref(generateFilters(columns));

export const useFilters = () => {
  // Function to clear all filters
  function clearFilters(): void {
    // Reset the filters to their initial state
    for (const key in filters?.value) {
      filters.value[key].value = null;
    }
  }

  return {
    filters,
    clearFilters,
  };
};
