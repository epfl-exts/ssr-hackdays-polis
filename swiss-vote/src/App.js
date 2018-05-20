import React, { Component } from 'react';

import './css/App.css';
import data from './results.json';

import { Provider } from './context-app';
import Autocomplete from './Autocomplete';
import CartogramContainer from './CartogramContainer';
import Graph from './Graph';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: 'map',
      selection: null,
      colors: {
        blue: '#2677bb',
        green: '#007500',
        grey: '#a5a6a9',
        red: '#db2f27',
        orange: '#f67944',
        darkGrey: '#0b3536',
        white: '#ffffff'
      }
    };
  }

  handleDisplayChange = display => {
    this.setState({ display });
  }

  handleSelectorChange = selector => {
    const selection = this.getResultsFromSelection(selector);
    this.setState({ selection });
  }

  getResultsFromSelection = selector => {
    return data.find(x => x.vote === selector);
  }

  render() {
    if (this.state.selection) {
      return (
        <Provider value={this.state}>
          <Autocomplete onSelectorChange={this.handleSelectorChange} data={data} />
          <CartogramContainer onDisplayChange={this.handleDisplayChange} />
          <Graph />
        </Provider>
      );
    } else {
      return (
        <Provider value={this.state}>
          <Autocomplete onSelectorChange={this.handleSelectorChange} data={data} />
          <CartogramContainer onDisplayChange={this.handleDisplayChange} />
        </Provider>
      );      
    }
  }
}

export default App;