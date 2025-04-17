import { expect, describe, it } from "vitest";
import { useFilters } from "./filter";

describe("useFilters", () => {
  describe("filters", () => {
    const { filters } = useFilters();
    it("should contain only Filter-like objects", () => {
      expect(typeof filters.value).toBe("object");
      expect(filters.value).not.toBeNull();

      for (const [key, filter] of Object.entries(filters.value)) {
        expect(filter).toMatchObject({
          matchMode: expect.any(String),
        });

        if ("value" in filter) {
          const val = filter.value;
          const isValid =
            typeof val === "string" || typeof val === "number" || val === null;

          expect(isValid).toBe(true);
        }

        if ("containsMultipleValues" in filter) {
          expect(typeof filter.containsMultipleValues).toBe("boolean");
        }
      }
    });
  });

  describe("clearFilter", () => {
    const { filters, clearFilters } = useFilters();

    const filterOverwrite = {
      name: {
        value: "123",
        matchMode: "contains",
        containsMultipleValues: false,
      },
      level: {
        value: "456",
        matchMode: "gte",
        containsMultipleValues: false,
      },
    };

    it("clear filter", () => {
      filters.value = filterOverwrite;

      expect(filterOverwrite.name.value).toStrictEqual("123");
      expect(filterOverwrite.level.value).toStrictEqual("456");

      clearFilters();

      expect(filterOverwrite.name.value).toStrictEqual(null);
      expect(filterOverwrite.level.value).toStrictEqual(null);
    });
  });
});
