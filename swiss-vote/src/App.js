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
      canvasStyle: null, // or 'rough'
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

  setStyle(event) {
    this.setState({
      canvasStyle: event.target.value
    });
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
      <div>
        <div className="filter">
          <Select
            name="vote-select"
            value={value}
            onChange={this.handleChange}
            options={this.resultDescriptions}
            placeholder="Click here."
            clearable={false}
          />
        </div>
        <div className="cartogram-container">
          <div className="grain"></div>
          <Cartogram canvas={this.state.canvasStyle} description={description} results={results} />
        </div>
      </div>
    );
  }
}

export default App;
