import React from 'react';
import { Adventurer } from '../models/adventurer/adventurer.type';
import { AdventurerClass } from '../models/adventurer-class/adventurer-class.type';
import { calcAdventurerClasses, calcAdventurerClassString, calcAdventurerHealth } from './calc-adventurer-stats';
import { Dictionary } from '../../utils/dictionary.type';
import memoizeOne from 'memoize-one';

interface Props {
  adventurer: Adventurer;
  classDict: Dictionary<AdventurerClass>;
  onLevelUp(adventurer: Adventurer): void;
  onDelete(adventurer: Adventurer): void;
}

interface State {}

export class AdventurerRow extends React.PureComponent<Props, State> {

  calcAdventurerClasses = memoizeOne(calcAdventurerClasses);
  calcAdventurerClassString = memoizeOne(calcAdventurerClassString);
  calcAdventurerHealth = memoizeOne(calcAdventurerHealth);

  render(): React.ReactNode {

    const classes = this.calcAdventurerClasses(this.props.adventurer.classes, this.props.classDict);
    const classString = this.calcAdventurerClassString(classes);
    const health = this.calcAdventurerHealth(classes, this.props.adventurer.level);

    return (
      <div className="adventurer-row">
        <div>
          {this.props.adventurer.name} {this.props.adventurer.level}
        </div>
        <div>
          {classString}
        </div>
        <div>
          {health} HP
        </div>
        <button onClick={() => this.props.onLevelUp(this.props.adventurer)}>
          Level Up
        </button>
        <button onClick={() => this.props.onDelete(this.props.adventurer)}>
          x
        </button>
      </div>
    );
  }
}
