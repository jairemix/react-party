import { Reducer } from 'redux';
import { PartyState } from '../state/party.state';
import { PartyAction, PartyActionsEnum } from '../actions/party.actions';
import { defaultAdventurers } from '../models/adventurer/default-adventurers';
import { filter, findIndex } from 'lodash-es';

const initialPartyState: PartyState = {
  adventurers: defaultAdventurers,
  nextID: defaultAdventurers.length + 1,
  loaded: false,
};

export const partyReducer: Reducer<PartyState, PartyAction> = (
  state = initialPartyState,
  action: PartyAction,
) => {
  console.log('✔️ got action', action);
  switch (action.type) {

    case PartyActionsEnum.CreateAdventurer: {
      const adventurer = {
        ...action.adventurerFormData,
        id: state.nextID,
      };
      return {
        ...state,
        adventurers: [
          ...state.adventurers,
          adventurer,
        ],
        nextID: state.nextID + 1,
      };
    }

    case PartyActionsEnum.DeleteAdventurer: {
      const adventurerID = action.adventurer.id;
      return {
        ...state,
        adventurers: filter(state.adventurers, adventurer => adventurer.id !== adventurerID),
      };
    }

    case PartyActionsEnum.UpdateAdventurer: {
      const adventurerID = action.adventurer.id;
      const index = findIndex(state.adventurers, a => a.id === adventurerID);
      const newAdventurers = [ ...state.adventurers ];
      newAdventurers[index] = action.adventurer;
      return {
        ...state,
        adventurers: newAdventurers,
      };
    }
    
    default:
      return state;
  }
};
