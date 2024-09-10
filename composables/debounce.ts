import { ref, watch } from "vue";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounce(value: any, delay: number) {
  const debouncedValue = ref(value.value);

  let timeout: NodeJS.Timeout | null = null;

  watch(value, (newValue) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      debouncedValue.value = newValue;
    }, delay);
  });

  return debouncedValue;
}
