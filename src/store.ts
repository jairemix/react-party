import { applyMiddleware, createStore, Store } from 'redux';
import { rootReducer, AppState } from './root.reducer';
/*  Thunk
Redux Thunk middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods dispatch and getState as parameters.
*/
import thunk from 'redux-thunk';

// Create a configure store function of type `AppState`
export function configureAppStore(): Store<AppState> {
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
  return store;
}

export type AppStore = Store<AppState>;
