import React, { Component } from 'react';

import data from './results.json';
import Select from 'react-select';
import Cartogram from './Cartogram';

import './css/select.css';
import './css/App.css';

import cartogram from './cartogram.svg';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: ''
    };

    this.resultDescriptions = [];
    this.allResults = [];
  }

  componentWillMount() {
    this.processData();
  }

  processData() {
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

    this.resultDescriptions = resultDescriptions;
    this.allResults = allResults;
  }

  handleChange = (selectedOption) => {
    this.setState(
      { selectedOption }
    );
  }

  render() {
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;

    const description = this.state.selectedOption.label;
    const results = this.allResults[this.state.selectedOption.value];

    return (
      <div className="App">
        <Select
          name="form-field-name"
          value={value}
          onChange={this.handleChange}
          options={this.resultDescriptions}
          placeholder="Search here for a vote."
          clearable={false}
        />
        <div className="cartogram-container">
          <div className="cartogram-frame">
            <Cartogram cartogram={cartogram} description={description} results={results} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
