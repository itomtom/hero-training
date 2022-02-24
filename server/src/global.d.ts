import { FakeDatabaseClient } from "./test-setup/fakeDatabaseClient";

export interface global {}
declare global {
  var FakeDatabaseClient: typeof FakeDatabaseClient;
}
