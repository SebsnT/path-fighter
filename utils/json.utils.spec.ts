import { vi, expect, describe, it } from "vitest";
import type { Creature } from "~/models/creature";
import { exportJSON } from "~/utils/json.utils";

global.URL.createObjectURL = vi.fn().mockReturnValue("mocked-url");
global.document.createElement = vi.fn();

describe("Json Utils", () => {
  const clickSpy = vi.fn();
  const linkMock = {
    href: "",
    download: "",
    click: clickSpy,
  } as unknown as HTMLAnchorElement;

  const createElementSpy = vi
    .spyOn(document, "createElement")
    .mockReturnValue(linkMock);

  const creatures: Creature[] = [
    {
      name: "Gnoll",
      level: 3,
      reactions: [{}],
      attacks: ["attack1", "attack2"],
      unique_abilities: [{}],
      size: ["Large"],
    } as Creature,
    {
      name: "Goblin",
      level: 1,
      reactions: [{}],
      attacks: ["attack3", "attack4"],
      unique_abilities: [{}],
      size: ["Medium"],
    } as Creature,
  ]; // Example creature objects

  describe("exportJSON", () => {
    it("should export correctly with default filename", () => {
      exportJSON(creatures);

      expect(global.URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
      expect(createElementSpy).toHaveBeenCalledWith("a");
      expect(linkMock.download).toBe("pathfighter-encounter.json");
      expect(clickSpy).toHaveBeenCalled();
    });

    it("should export correctly with changed filename", () => {
      exportJSON(creatures, "test-file-name");

      expect(global.URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
      expect(createElementSpy).toHaveBeenCalledWith("a");
      expect(linkMock.download).toBe("test-file-name.json");
      expect(clickSpy).toHaveBeenCalled();
    });

    it("should export correctly with empty filename", () => {
      exportJSON(creatures, "");

      expect(global.URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
      expect(createElementSpy).toHaveBeenCalledWith("a");
      expect(linkMock.download).toBe("pathfighter-encounter.json");
      expect(clickSpy).toHaveBeenCalled();
    });

    it("should export correctly when no filename is provided", () => {
      exportJSON(creatures);

      expect(global.URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
      expect(createElementSpy).toHaveBeenCalledWith("a");
      expect(linkMock.download).toBe("pathfighter-encounter.json");
      expect(clickSpy).toHaveBeenCalled();
    });
  });
});
