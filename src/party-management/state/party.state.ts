import { Adventurer } from "../models/adventurer/adventurer.type";

export interface PartyState {
  adventurers: Adventurer[];
  nextID: number;

  // not persisted
  loaded?: boolean;
  loadError?: any;
  persistError?: any;
}
