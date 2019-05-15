import { Reducer } from 'redux';
import { PartyState } from '../state/party.state';
import { PartyAction, PartyActionsEnum } from '../actions/party.actions';
import { filter, findIndex } from 'lodash-es';

const initialPartyState: PartyState = {
  adventurers: [],
  nextID: 1,
  loaded: false,
};

export const partyReducer: Reducer<PartyState, PartyAction> = (
  state = initialPartyState,
  action: PartyAction,
) => {
  switch (action.type) {

    case PartyActionsEnum.LoadParty: {
      return {
        ...state,
        loading: true,
      };
    }

    case PartyActionsEnum.LoadPartySuccess: {
      return {
        ...action.party,
        loaded: true,
        loading: false,
        loadError: null,
        persisted: true,
        persisting: false,
        persistError: null,
      };
    }

    case PartyActionsEnum.LoadPartyError: {
      return {
        ...state,
        loadError: action.error,
        loading: false,
        loaded: false,
      };
    }

    case PartyActionsEnum.PersistParty: {
      return {
        ...state,
        persistError: null,
        persisting: true,
      };
    }

    case PartyActionsEnum.PersistPartySuccess: {
      return {
        ...state,
        loaded: true,
        persisting: false,
        persisted: true,
        persistError: null,
      };
    }

    case PartyActionsEnum.PersistPartyError: {
      return {
        ...state,
        persistError: action.error,
        persisting: false,
        persisted: false,
      };
    }

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
        persisted: false,
      };
    }

    case PartyActionsEnum.DeleteAdventurer: {
      const adventurerID = action.adventurer.id;
      return {
        ...state,
        adventurers: filter(state.adventurers, adventurer => adventurer.id !== adventurerID),
        persisted: false,
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
        persisted: false,
      };
    }
    
    default:
      return state;
  }
};
