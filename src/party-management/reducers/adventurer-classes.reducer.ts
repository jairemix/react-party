import { Reducer } from 'redux';
import { AdventurerClassesState } from '../state/adventurer-classes.state';
import { adventurerClasses } from '../models/adventurer-class/adventurer-classes.const';
import { AdventurerClassesAction } from '../actions/adventurer-classes.actions';

const initialState: AdventurerClassesState = {
  classes: adventurerClasses,
};

export const adventurerClassesReducer: Reducer<AdventurerClassesState, AdventurerClassesAction> = (
  state = initialState,
  action: AdventurerClassesAction,
) => {
  switch (action.type) {
    default:
      return state;
  }
};
