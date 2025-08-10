import { describe, it, expect, vi, beforeEach } from "vitest";
import { useCreatures } from "./loadCreatures";

const mockCreatures = [
  { name: "Goblin", level: 1 },
  { name: "Orc", level: 3 },
];

describe("useCreatures composable", () => {
  let fetchMock: any;

  beforeEach(() => {
    fetchMock = vi.fn();
    global.fetch = fetchMock;
  });

  it("loads creatures from remote successfully", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCreatures,
    });

    const { loadCreaturesFromRemote, creatures, isLoading } = useCreatures();

    const promise = loadCreaturesFromRemote();
    expect(isLoading.value).toStrictEqual(true);

    const result = await promise;
    expect(isLoading.value).toStrictEqual(false);
    expect(creatures.value).toEqual(mockCreatures);
    expect(result.status).toStrictEqual("success");
  });

  it("handles failed response from remote", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      statusText: "Not Found",
    });

    const { loadCreaturesFromRemote, creatures, isLoading } = useCreatures();

    const result = await loadCreaturesFromRemote();
    expect(isLoading.value).toStrictEqual(false);
    expect(creatures.value).toEqual([]);
    expect(result.status).toStrictEqual("failed");
  });

  it("handles error thrown during remote fetch", async () => {
    fetchMock.mockRejectedValueOnce(new Error("Network error"));

    const { loadCreaturesFromRemote, creatures, isLoading } = useCreatures();

    const result = await loadCreaturesFromRemote();
    expect(isLoading.value).toStrictEqual(false);
    expect(creatures.value).toEqual([]);
    expect(result.status).toStrictEqual("error");
  });

  it("loads creatures from local successfully", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCreatures,
    });

    const { loadCreaturesFromLocal, creatures, isLoading } = useCreatures();

    const result = await loadCreaturesFromLocal();
    expect(isLoading.value).toStrictEqual(false);
    expect(creatures.value).toEqual(mockCreatures);
    expect(result.status).toStrictEqual("success");
  });

  it("handles failed response from local", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      statusText: "Not Found",
    });

    const { loadCreaturesFromLocal, creatures, isLoading } = useCreatures();

    const result = await loadCreaturesFromLocal();
    expect(isLoading.value).toStrictEqual(false);
    expect(creatures.value).toEqual([]);
    expect(result.status).toStrictEqual("failed");
  });

  it("handles error thrown during local fetch", async () => {
    fetchMock.mockRejectedValueOnce(new Error("Network error"));

    const { loadCreaturesFromLocal, creatures, isLoading } = useCreatures();

    const result = await loadCreaturesFromLocal();
    expect(isLoading.value).toStrictEqual(false);
    expect(creatures.value).toEqual([]);
    expect(result.status).toStrictEqual("error");
  });

  it("manually calls loadCreaturesFromRemote", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockCreatures,
    });

    const { loadCreaturesFromRemote, creatures, isLoading } = useCreatures();

    const result = await loadCreaturesFromRemote();

    expect(creatures.value).toStrictEqual(mockCreatures);
    expect(isLoading.value).toStrictEqual(false);
    expect(result.status).toStrictEqual("success");
  });
});
