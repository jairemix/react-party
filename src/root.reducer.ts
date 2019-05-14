// Import reducers and state type
import { partyReducer } from './party-management/reducers/party-reducer';
import { PartyState } from './party-management/state/party.state';
import { combineReducers } from 'redux';

// Create an interface for the application state
export interface AppState {
  partyState: PartyState;
}

// Create the root reducer
export const rootReducer = combineReducers<AppState>({
  partyState: partyReducer,
});
