import { describe, it, expect, vi } from "vitest";
import { useExperiencePoints } from "./experiencePoints";
import { useEncounterState } from "./encounterState";
import * as thresholdsComposable from "./thresholds";
import type { InputNumberInputEvent } from "primevue/inputnumber";
import type { Creature } from "~/models/creature";

describe("Description", () => {
  const { adjustXPGained } = useExperiencePoints();
  const { encounter } = useEncounterState();

  describe("adjustXPGained", () => {
    it("should adjust thresholds and recalculate the encounter xp", () => {
      const thresholdSpy = vi.spyOn(thresholdsComposable, "useThresholds");

      encounter.value.set("test", { name: "Test", count: 1 } as Creature);

      const event: InputNumberInputEvent = {
        originalEvent: {
          target: {
            blur: () => "",
            focus: () => "",
          },
        } as unknown as Event,
        value: undefined,
        formattedValue: "",
      };

      adjustXPGained(event);

      expect(thresholdSpy).toHaveBeenCalled();
    });
  });
});
