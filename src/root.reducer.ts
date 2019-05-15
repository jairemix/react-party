// Import reducers and state type
import { partyReducer } from './party-management/reducers/party.reducer';
import { PartyState } from './party-management/state/party.state';
import { combineReducers } from 'redux';
import { adventurerClassesReducer } from './party-management/reducers/adventurer-classes.reducer';
import { AdventurerClassesState } from './party-management/state/adventurer-classes.state';
import { reducerLogger } from './utils/reducer-logger';
import { PartyActionsEnum } from './party-management/actions/party.actions';

// Create an interface for the application state
export interface AppState {
  party: PartyState;
  adventurerClasses: AdventurerClassesState;
}

// Create the root reducer
export const rootReducer = combineReducers<AppState>({
  party: reducerLogger(partyReducer, PartyActionsEnum as any),
  adventurerClasses: adventurerClassesReducer,
});
