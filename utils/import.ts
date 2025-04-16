import type { FileUploadSelectEvent } from "primevue/fileupload";
import { useEncounter } from "@/composables/encounter";
import { useDifficulty } from "@/composables/difficulty";

const { addMultipleToEncounter, clearEncounter } = useEncounter();
const { resetDifficulty } = useDifficulty();

export function importJSON(event: FileUploadSelectEvent): Promise<void> {
  return new Promise((resolve, reject) => {
    // Get the selected file
    const file = event.files[0]; // Assuming only one file is selected

    // Check if the file is a JSON file
    if (file && file.type === "application/json") {
      const reader = new FileReader();

      // Define the onload callback to handle the file once it's read
      reader.onload = (e) => {
        try {
          if (e.target && typeof e.target.result === "string") {
            const jsonContent = JSON.parse(e.target.result); // Parse the JSON content
            clearEncounter(); // Clear the current encounter
            resetDifficulty(); // Reset the difficulty
            addMultipleToEncounter(jsonContent); // Add the creatures to the encounter
            resolve();
          } else {
            console.error("File reading error or result is not a string.");
            reject();
          }
        } catch (error) {
          console.error("Invalid JSON file:", error);
          reject(error);
        }
      };

      reader.onerror = reject;

      // Start reading the file as text
      reader.readAsText(file);
    }
  });
}
