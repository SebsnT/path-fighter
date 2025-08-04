import { ref, onBeforeMount } from "vue";
import { repositoryUrl } from "~/constants/fetch.constants";
import type { Creature } from "~/models/creature";

export const useCreatures = () => {
  const creatures = ref<Creature[]>([]);
  const isLoading = ref(false);

  // Fetch creatures from remote
  const loadCreaturesFromRemote = async () => {
    isLoading.value = true;
    try {
      const response = await fetch(repositoryUrl);
      if (response.ok) {
        const data = await response.json();
        creatures.value = data;
        isLoading.value = false;
        return { creatures, status: "success" };
      } else {
        console.error("Failed to fetch from remote:", response.statusText);
        return { creatures: [], status: "failed" };
      }
    } catch (error) {
      console.log(error);
      isLoading.value = false;
      return { creatures: [], status: "error" };
    } finally {
      isLoading.value = false;
    }
  };

  // Fetch creatures from the local public folder
  const loadCreaturesFromLocal = async () => {
    isLoading.value = true;
    try {
      const response = await fetch("data/output.json");
      if (response.ok) {
        const data = await response.json();
        creatures.value = data;
        isLoading.value = false;
        return { creatures: data, status: "success" };
      } else {
        console.error("Failed to fetch from local:", response.statusText);
        return { creatures: [], status: "failed" };
      }
    } catch (error) {
      console.log(error);
      isLoading.value = false;
      return { creatures: [], status: "error" };
    } finally {
      isLoading.value = false;
    }
  };

  // On the initial page load, ensure creatures are loaded before rendering
  onBeforeMount(() => {
    loadCreaturesFromRemote();
  });

  return {
    creatures,
    loadCreaturesFromRemote,
    loadCreaturesFromLocal,
    isLoading,
  };
};
