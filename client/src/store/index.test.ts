const heroList = [{ id: "bruce", name: "Batman" }];
const mockGet = jest.fn().mockResolvedValue(heroList);
const mockCreate = jest.fn().mockResolvedValue("dick");
const mockRemove = jest.fn();

jest.mock("../core/Hero.ts", () => {
  return {
    Heroes: jest.fn().mockImplementation(() => {
      return {
        getAll: mockGet,
        create: mockCreate,
        remove: mockRemove,
      };
    }),
  };
});

describe("Store", () => {
  afterEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  test("should set heroes state when getAllHeroes is dispatched", async () => {
    const store = (await import("./index")).default;
    await store.dispatch("getAllHeroes");
    expect(mockGet).toBeCalled();
    expect(store.state.heroes).toEqual(heroList);
  });

  test("should add new hero to state when createHero is dispatched", async () => {
    const store = (await import("./index")).default;
    await store.dispatch("createHero", "Robin");
    expect(mockCreate).toBeCalledWith("Robin");
    expect(store.state.heroes).toEqual(
      expect.arrayContaining([{ id: "dick", name: "Robin" }])
    );
  });

  test("should remove hero from state when removeHero is dispatched", async () => {
    const store = (await import("./index")).default;
    await store.dispatch("removeHero", "bruce");
    expect(mockRemove).toBeCalledWith("bruce");
    expect(store.state.heroes).toEqual([]);
  });

  test("should exclude Iron Man when counting heroes", async () => {
    const store = (await import("./index")).default;
    store.commit("setHeroes", [
      { id: "tony", name: "Iron Man" },
      { id: "pete", name: "Spider-Man" },
    ]);
    expect(store.getters.countHeroes).toBe(1);
  });
});
