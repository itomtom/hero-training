import { Heroes } from "./Hero";
import fetch from "jest-fetch-mock";

describe("Hero", () => {
  let hero: Heroes;
  beforeEach(() => {
    hero = new Heroes();
  });

  test("should return list of heroes with get request", async () => {
    const HEROES = [{ id: "hiro", name: "Time Traveller" }];
    fetch.mockResponseOnce(JSON.stringify(HEROES));
    const result = await hero.getAll();
    expect(result).toEqual(HEROES);
  });

  test("should return ID of create response", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        id: "save the cheerleader, save the world",
      })
    );
    const result = await hero.create("Hiro");
    expect(result).toBe("save the cheerleader, save the world");
  });

  test("should throw messsage error if POST request fails", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        message: "computer says no",
      }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      }
    );

    try {
      await hero.create("Hiro");
    } catch ({ message }) {
      expect(message).toBe("computer says no");
    }
  });

  test("should return message for successful delete request", async () => {
    fetch.mockOnceIf(
      new RegExp(/\/heroes\/hiro/),
      JSON.stringify({
        message: "Yatta",
      })
    );
    const result = await hero.remove("hiro");
    expect(result).toBe("Yatta");
  });
});
