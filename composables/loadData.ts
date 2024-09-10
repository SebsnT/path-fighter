export async function loadCreatures() {
  try {
    const { data: creatures, status } = await useLazyAsyncData(
      "creatures",
      () => $fetch("https://sebsnt.github.io/creature.json"),
    );
    return { creatures, status };
  } catch (error) {
    console.log(error);
  }
}
