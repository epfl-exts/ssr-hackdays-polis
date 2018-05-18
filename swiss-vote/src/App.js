import React, { Component } from 'react';

import './css/App.css';
import data from './results.json';

import { Provider } from './context-app';
import Autocomplete from './Autocomplete';
import CartogramContainer from './CartogramContainer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: 'map',
      selection: null
    };
  }

  getResultsFromSelection = selector => {
    return data.find(x => x.vote === selector);
  }

  handleSelectorChange = selector => {
    const selection = this.getResultsFromSelection(selector);
    this.setState({selection});
  }

  render() {
    return (
      <Provider value={this.state.selection}>
        <Autocomplete onSelectorChange={this.handleSelectorChange} data={data} />
        <CartogramContainer />
      </Provider>
    );
  }
}

export default App;