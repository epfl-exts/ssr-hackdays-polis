import React, { Component } from "react";

import "../css/App.css";

import { Provider } from "../context-app";
import Autocomplete from "./Autocomplete";
import Map from "./Map";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      selection: null,
      voteResults: []
    };
  }

  componentDidMount() {
    fetch(
      "https://gist.githubusercontent.com/spiritual-machine/bb75db17a9febb5a9a3571e6e3cfcf30/raw/41d1297884e6ab0cc8fe56c396bdfafc56a35d74/swiss-vote-results.json"
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            voteResults: result
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  handleSelectorChange = selection => {
    this.setState({ selection });
  };

  render() {
    const selection = this.state.selection;
    return (
      <React.Fragment>
        <div className="grain" />
        <Autocomplete
          onSelectorChange={this.handleSelectorChange}
          voteResults={this.state.voteResults}
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
