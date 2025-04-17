import { ref, onBeforeMount } from "vue";
import { repositoryUrl } from "~/constants/fetch.constants";
import type { Creature } from "~/models/creature";

export const useCreatures = () => {
  const creatures = ref<Creature[]>([]);
  const isLoaded = ref(false);

  // Fetch creatures from remote
  const loadCreaturesFromRemote = async () => {
    try {
      const { data, status } = await useLazyAsyncData<Creature[]>(
        "creatures",
        () => $fetch(repositoryUrl),
      );
      creatures.value = data.value ?? [];
      isLoaded.value = true;
      return { creatures, status };
    } catch (error) {
      console.log(error);
      isLoaded.value = true;
      return { creatures, status: "error" };
    }
  };

  // Fetch creatures from the local public folder
  const loadCreaturesFromLocal = async () => {
    try {
      const response = await fetch("/output.json");
      if (response.ok) {
        const data = await response.json();
        creatures.value = data;
        isLoaded.value = true;
        return { creatures: data, status: "success" };
      } else {
        console.error("Failed to fetch from local:", response.statusText);
        isLoaded.value = true;
        return { creatures: [], status: "failed" };
      }
    } catch (error) {
      console.log(error);
      isLoaded.value = true;
      return { creatures: [], status: "error" };
    }
  };

  // On the initial page load, ensure creatures are loaded before rendering
  onBeforeMount(() => {
    loadCreaturesFromLocal();
  });

  return {
    creatures,
    loadCreaturesFromRemote,
    loadCreaturesFromLocal,
    isLoaded,
  };
};
