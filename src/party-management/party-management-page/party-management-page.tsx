import React from 'react';
import { AdventurerForm } from '../adventurer-form/adventurer-form';
import { adventurerClasses } from '../models/adventurer-class/adventurer-classes.const';
import { AdventurerRow } from '../adventurer-row/adventurer-row';
import { Adventurer } from '../models/adventurer/adventurer.type';
import { map, keyBy } from 'lodash-es';
import { AdventurerClass } from '../models/adventurer-class/adventurer-class.type';
import { connect } from 'react-redux';
import { AppState } from '../../root.reducer';
import { createAdventurerAndPersist, deleteAdventurerAndPersist, updateAdventurerAndPersist, loadParty } from '../actions/party.actions';
import memoizeOne from 'memoize-one';

interface Props {
  adventurers: Adventurer[];
  adventurerClasses: AdventurerClass[];

  loadParty: typeof loadParty;
  createAdventurerAndPersist: typeof createAdventurerAndPersist;
  deleteAdventurerAndPersist: typeof deleteAdventurerAndPersist;
  updateAdventurerAndPersist: typeof updateAdventurerAndPersist;
}

interface State {
}

class _PartyManagementPage extends React.PureComponent<Props, State> {

  indexClasses = memoizeOne((classes: AdventurerClass[]) => keyBy(classes, 'id'));

  constructor(props: Props) {
    super(props);

    this.props.loadParty();
  }

  levelUpAdventurer = (adventurer: Adventurer) => {
    this.props.updateAdventurerAndPersist({
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
        onDelete={this.props.deleteAdventurerAndPersist}
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
          <AdventurerForm adventurerClasses={adventurerClasses} onSubmit={this.props.createAdventurerAndPersist} />
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
 * NOTE: This is is the simpler object form 
 * There is a function form that allows for more customisation
 */
const mapDispatchToProps = {
  loadParty,
  createAdventurerAndPersist,
  deleteAdventurerAndPersist,
  updateAdventurerAndPersist,
};

/*
 * connect is an alternative to passing down the store as prop,
 * if null is passed instead of mapDispatchToProps, props will contain dispatch function
 */
export const PartyManagementPage = connect(mapStateToProps, mapDispatchToProps)(_PartyManagementPage as any);
