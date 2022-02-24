import { DatabaseStatus } from ".";
import { FileDatabase } from "./file";

const heroList = [{ id: "brucebanner", name: "Hulk" }];
const mockGet = jest.fn().mockReturnValue(heroList);
const mockSet = jest.fn();

jest.mock("simple-json-db", () =>
  jest.fn(() => {
    return {
      get: mockGet,
      set: mockSet,
    };
  })
);

describe("FileDatabase", () => {
  const database = new FileDatabase();

  afterEach(() => {
    mockGet.mockClear();
    mockSet.mockClear();
    jest.restoreAllMocks();
  });

  test("should return heroes from database", async () => {
    const result = await database.getHeroes();
    expect(mockGet).toBeCalledWith("heroes");
    expect(result).toEqual(heroList);
  });

  test("should add new hero to database", async () => {
    const result = await database.createHero("Hawkeye");
    expect(mockSet).toBeCalledWith(
      "heroes",
      expect.arrayContaining([expect.objectContaining({ name: "Hawkeye" })])
    );
    expect(result).toEqual(expect.any(String));
  });

  test("should delete hero from database", async () => {
    await database.deleteHero("brucebanner");
    expect(mockSet).toBeCalledWith("heroes", []);
  });

  test("should return existing status if hero exist", async () => {
    const result = await database.createHero("hulk");
    expect(mockSet).not.toHaveBeenCalled();
    expect(result).toEqual(DatabaseStatus.Exist);
  });
});
