import { PartyState } from "../state/party.state";
import { Adventurer, AdventurerFormData } from "../models/adventurer/adventurer.type";

export enum PartyActionsEnum {
  LoadParty = '[Party Management] Load Party',
  LoadPartySuccess = '[Party Management] Load Party Success',
  LoadPartyError = '[Party Management] Load Party Error',
  PersistParty = '[Party Management] Persist Party',
  PersistPartySuccess = '[Party Management] Persist Party Success',
  PersistPartyError = '[Party Management] Persist Party Error',
  // also need LoadPartySuccess, LoadPartyError, etc...
  CreateAdventurer = '[Party Management] Create Adventurer',
  UpdateAdventurer = '[Party Management] Update Adventurer',
  DeleteAdventurer = '[Party Management] Delete Adventurer',
}

export interface LoadPartyAction {
  type: PartyActionsEnum.LoadParty;
}

export interface LoadPartySuccessAction {
  type: PartyActionsEnum.LoadPartySuccess;
  party: PartyState;
}

export interface LoadPartyErrorAction {
  type: PartyActionsEnum.LoadPartyError;
  error: any;
}

export interface PersistPartyAction {
  type: PartyActionsEnum.PersistParty;
}

export interface PersistPartySuccessAction {
  type: PartyActionsEnum.PersistPartySuccess;
}

export interface PersistPartyErrorAction {
  type: PartyActionsEnum.PersistPartyError;
  error: any;
}

export interface CreateAdventurerAction {
  type: PartyActionsEnum.CreateAdventurer;
  adventurerFormData: AdventurerFormData;
}

export interface UpdateAdventurerAction {
  type: PartyActionsEnum.UpdateAdventurer;
  adventurer: Adventurer;
}

export interface DeleteAdventurerAction {
  type: PartyActionsEnum.DeleteAdventurer;
  adventurer: Adventurer;
}

export function createAdventurer(adventurerFormData: AdventurerFormData): CreateAdventurerAction {
  return {
    type: PartyActionsEnum.CreateAdventurer,
    adventurerFormData,
  };
}

export function deleteAdventurer(adventurer: Adventurer): DeleteAdventurerAction {
  return {
    type: PartyActionsEnum.DeleteAdventurer,
    adventurer,
  };
}

export function updateAdventurer(adventurer: Adventurer): UpdateAdventurerAction {
  return {
    type: PartyActionsEnum.UpdateAdventurer,
    adventurer,
  };
}

export type PartyAction = LoadPartyAction | LoadPartySuccessAction | LoadPartyErrorAction |
  PersistPartyAction | PersistPartySuccessAction | PersistPartyErrorAction |
  CreateAdventurerAction | UpdateAdventurerAction | DeleteAdventurerAction;
