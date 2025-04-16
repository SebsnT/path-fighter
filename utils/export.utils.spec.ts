import { vi, expect, describe, it } from "vitest";
import { exportJSON } from "./export.utils";
import type { Creature } from "~/models/creature";

// Mocking browser APIs
global.URL.createObjectURL = vi.fn().mockReturnValue("mocked-url");

describe("Export Utils", () => {
  it("export", () => {
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
      { name: "Gnoll", level: 3 } as Creature,
      { name: "Goblin", level: 1 } as Creature,
    ]; // Example creature objects

    // Call the exportJSON function with a sample input
    exportJSON(creatures);

    // Check that createObjectURL was called with the correct argument (the Blob)
    expect(global.URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));

    // Check that the anchor element was created
    expect(createElementSpy).toHaveBeenCalledWith("a");

    // Check that the download attribute of the link was set
    const link = global.document.createElement("a");
    expect(link.download).toBe("pathfighter-encounter.json");

    // Check that the click method was called to trigger the download
    expect(clickSpy).toHaveBeenCalled();
  });
});
