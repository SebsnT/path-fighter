import { ref, onMounted, computed, watch } from "vue";
import type { Creature } from "../types/creature";
import type { Column } from "../config/columnConfig";
import { columns } from "../config/columnConfig";
import { addLinkToName, convertMarkdownToLinks } from "../utils/tableUtils";

const selectedColumns = ref([...columns]);

export const baseUrl = "https://2e.aonprd.com";

export function loadData() {
  const rows = ref<Creature[]>([]);
  const loading = ref(true);
  const filterQuery = ref("");
  // pagination
  const page = ref(1);
  const pageCount = 300;
  // debounce
  const debouncedFilterQuery = ref("");
  const debounceDelay = 300;

  const loadJsonData = async () => {
    try {
      const response = await fetch("/output.json");
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

              // Apply the addLinkToName function where needed
              if (key === "name" && item["url"]) {
                // Make name a link
                filteredItem[key] = addLinkToName(
                  item[key],
                  item["url"],
                  baseUrl,
                );
              } else if (column?.isArray && Array.isArray(item[key])) {
                filteredItem[key] = processArray(item, key, column);
              } else if (
                column?.containsMarkdown &&
                typeof item[key] === "string"
              ) {
                filteredItem[key] = convertMarkdownToLinks(item[key], baseUrl);
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

  // Debounce filter input

  let timeout: NodeJS.Timeout | null = null;

  watch(filterQuery, (newValue) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      debouncedFilterQuery.value = newValue;
    }, debounceDelay);
  });

  // Use a computed property to filter rows based on debounced filterQuery
  const filteredRows = computed(() => {
    if (!debouncedFilterQuery.value) {
      return rows.value;
    }
    const query = debouncedFilterQuery.value.toLowerCase();
    return rows.value.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(query),
      ),
    );
  });

  const paginatedRows = computed(() => {
    const start = (page.value - 1) * pageCount;
    const end = page.value * pageCount;

    return filteredRows.value.slice(start, end);
  });

  return {
    filteredRows,
    paginatedRows,
    columns,
    selectedColumns,
    filterQuery,
    loading,
    page,
    pageCount,
  };
}

function processArray(
  item: { [x: string]: string[] },
  key: keyof Creature,
  column: Column,
) {
  return item[key]
    .map((element: string) => {
      if (column.containsMarkdown) {
        return convertMarkdownToLinks(element, baseUrl);
      }
      return element;
    })
    .join(", ");
}
