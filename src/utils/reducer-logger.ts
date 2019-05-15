import { Reducer, Action } from 'redux';
import { Dictionary } from './dictionary.type';
import { toArray, isArray } from 'lodash-es';

/**
 * wrapper function for a reducer that logs action, prevState and nextState
 * @param reducer
 * @param actionTypes optional array or dictionary of action type strings for which to use the logger. if undefined, logs all actions
 */
export function reducerLogger<S, A extends Action>(
  reducer: Reducer<S, A>,
  actionTypes?: string[] | Dictionary<string>,
): Reducer<S, A> {
  const actionSet = actionTypes && new Set(isArray(actionTypes) ? actionTypes : toArray(actionTypes));
  return function (prevState, action) {
    const nextState = reducer(prevState, action);
    if (!actionSet || actionSet.has(action.type)) {
      console.groupCollapsed('✅ got action', action.type);
      console.log('action', action);
      console.log('prevState', prevState);
      console.log('nextState', nextState);
    }
    console.groupEnd();
    return nextState;
  };
}
