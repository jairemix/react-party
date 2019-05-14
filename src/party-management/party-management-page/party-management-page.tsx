import React from 'react';
import { AdventurerForm } from '../adventurer-form/adventurer-form';
import { adventurerClasses } from '../models/adventurer-class/adventurer-classes.const';
import { AdventurerRow } from '../adventurer-row/adventurer-row';
import { Adventurer } from '../models/adventurer/adventurer.type';
import { map, keyBy } from 'lodash-es';
import { AdventurerClass } from '../models/adventurer-class/adventurer-class.type';
import { connect } from 'react-redux';
import { AppState } from '../../root.reducer';
import { createAdventurer, deleteAdventurer, updateAdventurer } from '../actions/party.actions';
import memoizeOne from 'memoize-one';

interface Props {
  adventurers: Adventurer[];
  adventurerClasses: AdventurerClass[];

  createAdventurer: typeof createAdventurer;
  deleteAdventurer: typeof deleteAdventurer;
  updateAdventurer: typeof updateAdventurer;
}

interface State {
}

class _PartyManagementPage extends React.PureComponent<Props, State> {

  indexClasses = memoizeOne((classes: AdventurerClass[]) => keyBy(classes, 'id'));

  levelUpAdventurer = (adventurer: Adventurer) => {
    this.props.updateAdventurer({
      ...adventurer,
      level: adventurer.level + 1,
    });
  }

  render(): React.ReactNode {
    const classDict = this.indexClasses(this.props.adventurerClasses);
    const rows = map(this.props.adventurers, (adventurer) => {
      return <AdventurerRow
        adventurer={adventurer}
        classDict={classDict}
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

const mapStateToProps = ({ party, adventurerClasses }: AppState) => {
  return {
    adventurers: party.adventurers,
    adventurerClasses: adventurerClasses.classes,
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
