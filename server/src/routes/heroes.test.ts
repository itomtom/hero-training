import HeroesController from "./heroes";
import { DatabaseStatus, IDatabaseClient } from "../database";
import express, { Express } from "express";
import request from "supertest";

declare interface FakeDatabaseClient extends IDatabaseClient {}
declare class FakeDatabaseClient {}

describe("HeroesController", () => {
  let app: Express;
  let fakeDatabase: IDatabaseClient;
  const fakeHeroList = [{ id: "3000", name: "Iron Man" }];

  beforeAll(() => {
    app = express();
    fakeDatabase = new FakeDatabaseClient();
    const heroes = new HeroesController(fakeDatabase);
    app.use(express.json());
    app.use("/", heroes.router);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should return hero list", async () => {
    jest.spyOn(fakeDatabase, "getHeroes").mockResolvedValue(fakeHeroList);
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.body).toEqual(fakeHeroList);
  });

  test("should throw error when fetching hero list", async () => {
    jest.spyOn(fakeDatabase, "getHeroes").mockImplementation(() => {
      throw new Error("I am Iron Man");
    });
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(500);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.body.message).toEqual("I am Iron Man");
  });

  test("should create a hero", async () => {
    jest.spyOn(fakeDatabase, "createHero").mockResolvedValue(5000);
    const res = await request(app).post("/").send({ name: "Spider-Man" });
    expect(res.statusCode).toBe(201);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.body.id).toEqual(5000);
  });

  test("should fail creating a hero if createHero throws an error", async () => {
    jest.spyOn(fakeDatabase, "createHero").mockImplementation(() => {
      throw new Error("Can't touch this");
    });
    const res = await request(app).post("/").send({ name: "Spider-Man" });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Can't touch this");
  });

  test("should return conflict is hero already exist", async () => {
    jest
      .spyOn(fakeDatabase, "createHero")
      .mockResolvedValue(DatabaseStatus.Exist);
    const res = await request(app).post("/").send({ name: "Spider-Man" });
    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe("Spider-Man already exist");
  });

  test("should return 422 status if name is not provided", async () => {
    const res = await request(app).post("/").send({ identity: "Spider-Man" });
    expect(res.statusCode).toBe(422);
    expect(res.body.message).toBe("Missing name in body");
  });

  test("should delete hero successfully", async () => {
    jest.spyOn(fakeDatabase, "deleteHero").mockResolvedValue();
    const res = await request(app).delete("/peterparker");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Removed hero peterparker");
  });
});
