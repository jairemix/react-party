import React from 'react';
import { AdventurerClass } from '../models/adventurer-class/adventurer-class.type';
import { map } from 'lodash-es';
import { AdventurerFormData } from '../models/adventurer/adventurer.type';

interface Props {
  adventurerClasses: AdventurerClass[];
  onSubmit(adventurer: AdventurerFormData): void; // should we return a promise????
}

interface State {
  name: string;
  adventurerClass: string;
  level: number;
}

export class AdventurerForm extends React.PureComponent<Props, State> {

  state = {
    name: '',
    adventurerClass: '',
    level: 1,
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State): Partial<State> | null {
    if (!prevState.adventurerClass) {
      return {
        adventurerClass: nextProps.adventurerClasses[0].id,
      };
    }
    return null;
  }

  submit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: validation
    this.props.onSubmit({
      name: this.state.name,
      classes: [this.state.adventurerClass],
      level: this.state.level,
    });
    this.clear();
  }

  private clear() {
    this.setState({
      name: '',
      adventurerClass: this.props.adventurerClasses[0].id,
      level: 1,
    });
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = event.target;
    const value = target.value; // checkboxes are different
    const name = target.name;
    this.setState({
      [name]: value,
    } as any);
  }

  render(): React.ReactNode {
    const options = map(this.props.adventurerClasses, c => {
      return <option value={c.id} key={c.id}>{c.title}</option>;
    });
    return (
      <form onSubmit={this.submit}>
        <label>
          Name
          <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
        </label>
        <label>
          Class
          <select name="adventurerClass" value={this.state.adventurerClass} onChange={this.handleInputChange}>
            {options}
          </select>
        </label>
        <label>
          Level
          <input type="number" name="level" value={this.state.level} onChange={this.handleInputChange} />
        </label>

        <button type="submit">Add Adventurer</button>
      </form>
    );
  }
}
