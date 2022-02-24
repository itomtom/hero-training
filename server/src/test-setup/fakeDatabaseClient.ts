import { DatabaseStatus, IDatabaseClient } from "../database";

declare global {
  namespace NodeJS {
    interface Global {
      FakeDatabaseClient: typeof FakeDatabaseClient;
    }
  }
}

export class FakeDatabaseClient implements IDatabaseClient {
  public async getHeroes(): Promise<{ id: string; name: string }[]> {
    return [];
  }

  public async createHero(id: string): Promise<string | DatabaseStatus> {
    return "";
  }

  public async deleteHero(id: string): Promise<void> {
    return;
  }
}

global.FakeDatabaseClient = FakeDatabaseClient;
