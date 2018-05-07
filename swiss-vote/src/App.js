import React, { Component } from 'react';

import data from './results.json';
import Select from 'react-select';
import Gradient from './Gradient';
import Cartogram from './Cartogram';
import CanvasChart from './CanvasChart';

import './css/select.css';
import './css/App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMap: true,
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
      isMap: value
    });
  }

  handleChange = (selectedOption) => {
    this.setState(
      { selectedOption }
    );
  }

  render() {
    const { selectedOption } = this.state ? this.state : '',
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
        <div className="cartogram-container">
          <div className="grain"></div>
          <h4>Strength of yes and no votes by canton</h4>
          <figure>
            <Cartogram map={this.state.isMap} description={description} results={results} />
            <figcaption className="sr-only">Cartogram: {description}</figcaption>
          </figure>
          <figure>
            <Gradient />
            <figcaption className="sr-only">Legend for color-gradient</figcaption>
          </figure>
          <figure>
            <CanvasChart results={results} />
            <figcaption className="sr-only">Chart: {description}</figcaption>
          </figure>
        </div>    
      </div>
    );
  }
}

export default App;
