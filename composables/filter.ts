import { ref, computed } from "vue";
import { useDebounce } from "./debounce";
import type { Creature } from "~/types/creature";

// Accept rows as a Ref containing an array of RowData objects
export function useFilter(rows: Ref<Creature[]>) {
  const filterQuery = ref("");
  const debouncedFilterQuery = useDebounce(filterQuery, 300);

  const filteredRows = computed(() => {
    if (!debouncedFilterQuery.value) {
      return rows.value; // Access the value property of the Ref
    }
    const query = debouncedFilterQuery.value.toLowerCase();
    return rows.value.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(query),
      ),
    );
  });

  return {
    filterQuery,
    filteredRows,
  };
}
