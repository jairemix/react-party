import React from 'react';
import { AdventurerForm } from '../adventurer-form/adventurer-form';
import { adventurerClasses } from '../models/adventurer-class/adventurer-classes.const';
import { AdventurerRow } from '../adventurer-row/adventurer-row';
import { Adventurer } from '../models/adventurer/adventurer.type';
import { map, keyBy } from 'lodash-es';
import { AdventurerClass } from '../models/adventurer-class/adventurer-class.type';
import { Dictionary } from '../../utils/dictionary.type';
import { connect } from 'react-redux';
import { AppState } from '../../root.reducer';
import { createAdventurer, deleteAdventurer, updateAdventurer } from '../actions/party.actions';

interface Props {
  adventurers: Adventurer[];
  createAdventurer: typeof createAdventurer;
  deleteAdventurer: typeof deleteAdventurer;
  updateAdventurer: typeof updateAdventurer;
}

interface State {
  adventurerClasses: AdventurerClass[];
  classDict: Dictionary<AdventurerClass>;
}

class _PartyManagementPage extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      adventurerClasses: adventurerClasses, // TODO: get from store
      classDict: keyBy(adventurerClasses, 'id'), // TODO: get from store
    };
  }

  levelUpAdventurer = (adventurer: Adventurer) => {
    this.props.updateAdventurer({
      ...adventurer,
      level: adventurer.level + 1,
    });
  }

  render(): React.ReactNode {
    const rows = map(this.props.adventurers, (adventurer) => {
      return <AdventurerRow
        adventurer={adventurer}
        classDict={this.state.classDict}
        key={adventurer.id}
        onDelete={this.props.deleteAdventurer}
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
          <AdventurerForm adventurerClasses={adventurerClasses} onSubmit={this.props.createAdventurer} />
        </section>
      </div>
    );
  }
}

const mapStateToProps = ({ partyState }: AppState) => {
  return {
    adventurers: partyState.adventurers,
  };
};

/*
 * There is also a function form that allows for more customisation
 */
const mapDispatchToProps = {
  createAdventurer,
  deleteAdventurer,
  updateAdventurer,
};

/*
 * connect is an alternative to passing down the store as prop,
 * if null is passed instead of mapDispatchToProps, props will contain dispatch function
 */
export const PartyManagementPage = connect(mapStateToProps, mapDispatchToProps)(_PartyManagementPage);
