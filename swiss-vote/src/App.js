import React, { Component } from 'react';

import data from './results.json';
import Select from 'react-select';
import Cartogram from './Cartogram';

import './css/select.css';
import './css/App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: true,
      rough: false,
      selectedOption: '',
      resultDescriptions: [],
      allResults: []
    };
  }

  componentDidMount() {
    let resultDescriptions = [];
    let allResults = [];

    for (let i = 0; i < data.length; i++) {
      const description = {
        value: i,
        label: data[i].vote
      };
      resultDescriptions.push(description);
      allResults.push(data[i].results);
    }

    this.setState({
      resultDescriptions: resultDescriptions,
      allResults: allResults
    });
  }

  handleOptionChange(changeEvent) {
    const value = (changeEvent.target.value === 'true');

    this.setState({
      map: value
    });
  }

  handleChange = (selectedOption) => {
    this.setState(
      { selectedOption }
    );
  }

  render() {
    const { selectedOption } = this.state,
          value = selectedOption && selectedOption.value,
          description = this.state.selectedOption.label,
          results = this.state.allResults[this.state.selectedOption.value];

    return (
      <div>
        <div className="filter">
          <Select
            name="vote-select"
            value={value}
            onChange={this.handleChange}
            options={this.state.resultDescriptions}
            placeholder="Click here."
            clearable={false}
          />
        </div>
        <div>
          <fieldset>
            <legend>Options</legend>
            <div className="option-group" onChange={this.handleOptionChange.bind(this)}>
              <label>
                Map
                <input
                  name="map"
                  type="radio"
                  value={true}
                  defaultChecked
                />
              </label>
              <label>
                Cartogram
                <input
                  name="map"
                  type="radio"
                  value={false}
                />
              </label>
            </div>
          </fieldset>
        </div>
        <figure className="cartogram-container">
          <div className="grain"></div>
          <Cartogram map={this.state.map} description={description} results={results} />
          <figcaption className="sr-only">{description}</figcaption>
        </figure>
      </div>
    );
  }
}

export default App;
