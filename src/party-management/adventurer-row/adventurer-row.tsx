import React from 'react';
import { Adventurer } from '../models/adventurer/adventurer.type';
import { AdventurerClass } from '../models/adventurer-class/adventurer-class.type';
import { calcAdventurerClasses, calcAdventurerClassString, calcAdventurerHealth } from './calc-adventurer-stats';
import { Dictionary } from '../../utils/dictionary.type';

interface Props {
  adventurer: Adventurer;
  classDict: Dictionary<AdventurerClass>;
  onLevelUp(adventurer: Adventurer): void;
  onDelete(adventurer: Adventurer): void;
}

interface State {}

export class AdventurerRow extends React.PureComponent<Props, State> {

  render(): React.ReactNode {

    const classes = calcAdventurerClasses(this.props.adventurer.classes, this.props.classDict);
    const classString = calcAdventurerClassString(classes);
    const health = calcAdventurerHealth(classes, this.props.adventurer.level);

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
