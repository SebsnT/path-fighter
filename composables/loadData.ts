import { ref, onMounted, computed } from "vue";
import type { Creature } from "../types/creature";
import { columns } from "../config/columnConfig";

const selectedColumns = ref([...columns]);

export function loadData() {
  const rows = ref<Creature[]>([]);
  const loading = ref(true);
  const filterQuery = ref("");

  const loadJsonData = async () => {
    try {
      const response = await fetch("/creature.json");
      if (!response.ok) {
        throw new Error("Failed to load JSON");
      }
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        // Extract keys from the columns array
        const columnKeys = columns.map((column) => column.key);

        // Filter the data based on these keys
        rows.value = data.map((item) => {
          const filteredItem: Creature = {} as Creature;
          columnKeys.forEach((key) => {
            if (Object.prototype.hasOwnProperty.call(item, key)) {
              const column = columns.find((col) => col.key === key);
              if (column.isArray && Array.isArray(item[key])) {
                filteredItem[key] = item[key].join(", ");
              } else {
                filteredItem[key] = item[key];
              }
            }
          });

          return filteredItem;
        });
      } else {
        rows.value = [];
      }
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  onMounted(loadJsonData);

  // Computed property for filtered rows based on filterQuery
  const filteredRows = computed(() => {
    if (!filterQuery.value) {
      return rows.value;
    }

    return rows.value.filter((item) => {
      return Object.values(item).some((value) => {
        return String(value)
          .toLowerCase()
          .includes(filterQuery.value.toLowerCase());
      });
    });
  });

  return {
    filteredRows,
    columns,
    selectedColumns,
    filterQuery,
    loading,
  };
}
