import { ref, onMounted, computed } from "vue";
import type { Creature } from "../types/creature";
import { columns } from "../config/columnConfig";
import { addLinkToName, convertMarkdownToLinks } from "../utils/tableUtils";

const selectedColumns = ref([...columns]);

export const baseUrl = "https://2e.aonprd.com";

export function loadData() {
  const rows = ref<Creature[]>([]);
  const loading = ref(true);
  const filterQuery = ref("");

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
                // Assuming "name" is the key you want to make clickable and "url" contains the link
                filteredItem[key] = addLinkToName(
                  item[key],
                  item["url"],
                  baseUrl,
                );
              } else if (column?.isArray && Array.isArray(item[key])) {
                filteredItem[key] = item[key]
                  .map((element: string) => {
                    if (column.containsMarkdown) {
                      return convertMarkdownToLinks(element, baseUrl);
                    }
                    return element;
                  })
                  .join(", ");
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
