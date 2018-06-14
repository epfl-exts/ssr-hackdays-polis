import React, { Component } from "react";

import "./css/App.css";
import votingData from "./results.json";

import { Provider } from "./context-app";
import Autocomplete from "./Autocomplete";
import Map from "./Map";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selection: null
    };
  }

  handleSelectorChange = selector => {
    const selection = this.getResultsFromSelection(selector);
    this.setState({ selection });
  };

  getResultsFromSelection = selector => {
    return votingData.find(x => x.vote === selector);
  };

  render() {
    const selection = this.state.selection;
    return (
      <React.Fragment>
        <Autocomplete
          onSelectorChange={this.handleSelectorChange}
          data={votingData}
        />
        <figure>
          <Provider value={selection}>
            <Map selection={selection ? selection.results : null} />
          </Provider>
        </figure>
      </React.Fragment>
    );
  }
}

export default App;
