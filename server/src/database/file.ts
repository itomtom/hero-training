import { DatabaseStatus, IDatabaseClient } from "./database";
import JSONdb from "simple-json-db";
import { realpathSync } from "fs";
import { v4 as uuid } from "uuid";

const SPACE_SYMBOL_REGEX = /[\s-\.,]+/g;

export class FileDatabase implements IDatabaseClient {
  private readonly db;
  private readonly key = "heroes";

  constructor() {
    this.db = new JSONdb(realpathSync("database.json"));
  }

  public async getHeroes() {
    let result = [];
    const heroes = this.db.get(this.key);
    if (heroes !== undefined) {
      result = Object.values(heroes);
    }
    return result;
  }

  public async createHero(heroName: string) {
    const nameWithoutSpace = heroName
      .replace(SPACE_SYMBOL_REGEX, "")
      .toLowerCase();
    const heroes = await this.getHeroes();
    if (
      !heroes.some(
        ({ name }) =>
          name.replace(SPACE_SYMBOL_REGEX, "").toLowerCase() ===
          nameWithoutSpace
      )
    ) {
      const id = uuid();
      heroes.push({
        id,
        name: heroName,
      });
      this.db.set(this.key, heroes);
      return id;
    }

    return DatabaseStatus.Exist;
  }

  public async deleteHero(heroId: string) {
    const heroes = await this.getHeroes();
    const result = heroes.filter(({ id }) => id !== heroId);
    this.db.set(this.key, result);
  }
}
