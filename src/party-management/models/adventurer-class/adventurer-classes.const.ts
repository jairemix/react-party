import { AdventurerClass } from './adventurer-class.type';

export const adventurerClasses: AdventurerClass[] = [
  {
    id: 'druid',
    title: 'Druid',
    calculateHealth: l => 41 + l * 11,
  },
  {
    id: 'wizard',
    title: 'Wizard',
    calculateHealth: l => 38 + l * 8,
  },
  {
    id: 'priest',
    title: 'Priest',
    calculateHealth: l => 40 + l * 10,
  },
  {
    id: 'rogue',
    title: 'Rogue',
    calculateHealth: l => 42 + l * 13,
  },
  {
    id: 'fighter',
    title: 'Fighter',
    calculateHealth: l => 50 + l * 15,
  },
];
