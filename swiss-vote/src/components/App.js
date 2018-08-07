import React, { Component } from "react";

import "../css/App.css";

import Autocomplete from "./Autocomplete";
import { Map } from "./Map";

class App extends Component {
  state = {
    selection: "",
    allResults: []
  };

  componentDidMount() {
    fetch(
      "https://gist.githubusercontent.com/epfl-exts-react/63181e2beb4f813d9988734e93026b0c/raw/e9c7ef1cea83434f867b69fe8cc73ccdc02ff667/swiss-vote-results-sample.json"
    )
      .then(function(response) {
        return response.json();
      })
      .then(responseJSON => this.setState({ allResults: responseJSON }))
      .catch(error => console.error("FetchError:", error));
  }

  handleChange = event => {
    this.setState({ selection: event.target.value });
  };

  render() {
    return (
      <div>
        <select
          ref={selector => (this.selector = selector)}
          onChange={this.handleChange}
          value={this.state.selection}
        >
          <option />
          {this.state.allResults.map((resultSet, i) => (
            <option key={i} value={i}>
              {resultSet.description.en}
            </option>
          ))}
        </select>
        <figure>
          <Map {...this.state.allResults[this.state.selection]} />
        </figure>
      </div>
    );
  }
}

export default App;