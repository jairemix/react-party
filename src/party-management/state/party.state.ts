import { Adventurer } from "../models/adventurer/adventurer.type";
import { defaultAdventurers } from "../models/adventurer/default-adventurers";

export interface PersistedPartyState {
  adventurers: Adventurer[];
  nextID: number;
}

export interface PartyState extends PersistedPartyState {
  // not persisted
  loading?: boolean;
  loaded?: boolean;
  loadError?: any;
  persisting?: boolean;
  persisted?: boolean;
  persistError?: any;
}

export const defaultPartyState = {
  adventurers: defaultAdventurers,
  nextID: defaultAdventurers.length + 1,
}

export const nonPersistedKeys: ['loading', 'loaded', 'loadError', 'persisting', 'persisted', 'persistError']
                             = ['loading', 'loaded', 'loadError', 'persisting', 'persisted', 'persistError'];
