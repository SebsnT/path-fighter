export const page = ref(1);
export const pageCount = 10;

export function usePagination<Creature>(cretures: Creature[]) {
  // Computed property to get the current page's items
  const paginatedCreatures = computed(() => {
    const start = (page.value - 1) * pageCount;
    const end = page.value * pageCount;
    return cretures.slice(start, end);
  });

  return paginatedCreatures;
}
