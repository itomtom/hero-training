export enum DatabaseStatus {
  Exist,
}

export interface IDatabaseClient {
  getHeroes(): Promise<{ id: string; name: string }[]>;
  createHero(id: string): Promise<string | DatabaseStatus>;
  deleteHero(id: string): Promise<void>;
}
