import { AdventurerClass } from '../models/adventurer-class/adventurer-class.type';
import { reduce, map } from 'lodash-es';
import { Dictionary } from '../../utils/dictionary.type';

export const calcAdventurerHealth = (classes: AdventurerClass[], level: number) => {
  return Math.round(reduce(classes, (total, adventurerClass) => {
    return total + adventurerClass.calculateHealth(level);
  }, 0) / classes.length);
}

export const calcAdventurerClasses = (classIDs: string[], classDict: Dictionary<AdventurerClass>) => {
  return map(classIDs, id => classDict[id]);
}

export const calcAdventurerClassString = (classes: AdventurerClass[]) => map(classes, 'title').join(' | ');