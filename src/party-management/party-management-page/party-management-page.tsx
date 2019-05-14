import React from 'react';
import { AdventurerForm } from '../adventurer-form/adventurer-form';
import { adventurerClasses } from '../models/adventurer-class/adventurer-classes.const';
import { AdventurerRow } from '../adventurer-row/adventurer-row';
import { Adventurer, AdventurerFormData } from '../models/adventurer/adventurer.type';
import { map, keyBy, filter, findIndex } from 'lodash-es';
import { AdventurerClass } from '../models/adventurer-class/adventurer-class.type';
import { defaultAdventurers } from '../models/adventurer/default-adventurers';
import { Dictionary } from '../../utils/dictionary.type';

interface Props {

}

interface State {
  adventurers: Adventurer[];
  nextID: number;

  adventurerClasses: AdventurerClass[];
  classDict: Dictionary<AdventurerClass>;
}

export class PartyManagementPage extends React.PureComponent<Props, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      adventurers: defaultAdventurers, // TODO: get from store
      nextID: defaultAdventurers.length + 1,
      adventurerClasses: adventurerClasses, // TODO: get from store
      classDict: keyBy(adventurerClasses, 'id'), // TODO: get from store
    };

  }

  addAdventurer = (adventurerData: AdventurerFormData) => {
    console.log('should add adventurer', adventurerData);
    const adventurer: Adventurer = {
      ...adventurerData,
      id: this.state.nextID,
    };
    this.setState({
      adventurers: [
        ...this.state.adventurers,
        adventurer,
      ],
      nextID: this.state.nextID + 1,
    });
  }

  deleteAdventurer = (adventurer: Adventurer) => {
    const adventurerID = adventurer.id;
    this.setState({
      adventurers: filter(this.state.adventurers, adventurer => adventurer.id !== adventurerID),
    });
  }

  levelUpAdventurer = (adventurer: Adventurer) => {
    this._updateAdventurer({
      ...adventurer,
      level: adventurer.level + 1,
    });
  }

  private _updateAdventurer(adventurer: Adventurer) {
    const adventurerID = adventurer.id;
    const index = findIndex(this.state.adventurers, a => a.id === adventurerID);
    const newAdventurers = [ ...this.state.adventurers ];
    newAdventurers[index] = adventurer;
    this.setState({
      adventurers: newAdventurers,
    });
  }

  render(): React.ReactNode {
    const rows = map(this.state.adventurers, (adventurer) => {
      return <AdventurerRow
        adventurer={adventurer}
        classDict={this.state.classDict}
        key={adventurer.id}
        onDelete={this.deleteAdventurer}
        onLevelUp={this.levelUpAdventurer}
        />;
    });
    return (
      <div>
        
        <section>
          <h2>Party Management</h2>
          {rows}
        </section>

        <section>
          <h2>Add a Party Member</h2>
          <AdventurerForm adventurerClasses={adventurerClasses} onSubmit={this.addAdventurer} />
        </section>
      </div>
    );
  }
}
