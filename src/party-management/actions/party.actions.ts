import { PartyState, defaultPartyState, nonPersistedKeys } from '../state/party.state';
import { Adventurer, AdventurerFormData } from '../models/adventurer/adventurer.type';
import { partyService } from '../services/party-service.instance';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../root.reducer';
import { omit } from 'lodash-es';
import { Action } from 'redux';

/* Actions */

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

export type PartyAction = LoadPartyAction | LoadPartySuccessAction | LoadPartyErrorAction |
  PersistPartyAction | PersistPartySuccessAction | PersistPartyErrorAction |
  CreateAdventurerAction | UpdateAdventurerAction | DeleteAdventurerAction;

/* Action Creators */

export function loadParty(): ThunkAction<Promise<void>, AppState, void, PartyAction> { // uses thunk middlware
  return async function (dispatch) {
    try {
      dispatch({
        type: PartyActionsEnum.LoadParty,
      });
      const response = (await partyService.getParty().toPromise()) || defaultPartyState;
      dispatch({
        type: PartyActionsEnum.LoadPartySuccess,
        party: response,
      });
    } catch (error) {
      console.log('error', error);
      dispatch({
        type: PartyActionsEnum.LoadPartyError,
        error,
      });
    }
  };
}

export function persistParty(): ThunkAction<Promise<void>, AppState, void, PartyAction> {
  return async function (dispatch, getState) {
    try {
      dispatch({
        type: PartyActionsEnum.PersistParty,
      });
      const toPersist = omit(getState().party, ...nonPersistedKeys);
      await partyService.setParty(toPersist).toPromise();
      dispatch({
        type: PartyActionsEnum.PersistPartySuccess,
      });
    } catch (error) {
      dispatch({
        type: PartyActionsEnum.PersistPartyError,
        error,
      });
    }
  };
}

/**
 * wraps action creator to add persist party call
 */
export function wrapActionCreatorToPersist<A extends Action, P extends any[]>(
  actionCreator: (...params: P) => A,
): (...params: P) => ThunkAction<Promise<void>, AppState, void, A> {
  return function (...args: P) {
    const action = actionCreator(...args)
    const persistPartyThunk = persistParty();
    return async function (dispatch, getState) {
      dispatch(action);
      return persistPartyThunk(dispatch, getState);
    };
  };
}

export function createAdventurer(adventurerFormData: AdventurerFormData): PartyAction {
  return {
    type: PartyActionsEnum.CreateAdventurer,
    adventurerFormData,
  };
}

export const createAdventurerAndPersist = wrapActionCreatorToPersist(createAdventurer);

export function deleteAdventurer(adventurer: Adventurer): DeleteAdventurerAction {
  return {
    type: PartyActionsEnum.DeleteAdventurer,
    adventurer,
  };
}

export const deleteAdventurerAndPersist = wrapActionCreatorToPersist(deleteAdventurer);

export function updateAdventurer(adventurer: Adventurer): UpdateAdventurerAction {
  return {
    type: PartyActionsEnum.UpdateAdventurer,
    adventurer,
  };
}

export const updateAdventurerAndPersist = wrapActionCreatorToPersist(updateAdventurer);
